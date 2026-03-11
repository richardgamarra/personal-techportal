import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "public", "pages");

const SECTION_LABELS = {
  projects: "Projects",
  resources: "Resources",
  certification: "Learning & Certifications",
  enterprise: "Enterprise",
  ai: "AI",
  cloud: "Cloud",
  office365: "Office 365",
  root: "Project Pages",
};

function slugToTitle(slug = "") {
  return slug
    .replace(/\.html?$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseBool(value) {
  return /^(true|yes|1)$/i.test(String(value || "").trim());
}

function parseTags(value) {
  return String(value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parsePortalMeta(fileContent) {
  const match = fileContent.match(/PORTAL_META([\s\S]*?)PORTAL_META_END/i);
  if (!match) return {};

  const block = match[1];
  const meta = {};

  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(":")) continue;
    const idx = trimmed.indexOf(":");
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    meta[key] = value;
  }

  return {
    title: meta.title || "",
    description: meta.description || "",
    category: meta.category || "",
    section: meta.section || "",
    subcategory: meta.subcategory || "",
    icon: meta.icon || "FileText",
    thumbnail: meta.thumbnail || "",
    featured: parseBool(meta.featured),
    tags: parseTags(meta.tags),
    order: Number(meta.order || 999),
  };
}

function getHtmlFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getHtmlFilesRecursive(fullPath));
      continue;
    }

    if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getRelativeWebPath(fullPath) {
  const relative = path.relative(path.join(process.cwd(), "public"), fullPath);
  return "/" + relative.replace(/\\/g, "/");
}

function inferSectionFromPath(fullPath) {
  const relative = path.relative(PAGES_DIR, fullPath);
  const parts = relative.split(path.sep).filter(Boolean);

  if (parts.length <= 1) return "root";
  return parts[0].toLowerCase();
}

function inferSubcategoryFromPath(fullPath) {
  const relative = path.relative(PAGES_DIR, fullPath);
  const parts = relative.split(path.sep).filter(Boolean);

  if (parts.length >= 3) {
    return slugToTitle(parts[1]);
  }

  return "";
}

export async function loadPortalPages() {
  const htmlFiles = getHtmlFilesRecursive(PAGES_DIR);

  const pages = htmlFiles.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const stats = fs.statSync(filePath);
    const meta = parsePortalMeta(raw);

    const fileName = path.basename(filePath);
    const sectionKey = (meta.section || inferSectionFromPath(filePath) || "root").toLowerCase();
    const section = SECTION_LABELS[sectionKey] || slugToTitle(sectionKey);
    const subcategory =
      meta.subcategory || inferSubcategoryFromPath(filePath) || section;

    const title = meta.title || slugToTitle(fileName);
    const description =
      meta.description || `${title} portal page.`;

    const href = getRelativeWebPath(filePath);

    return {
      id: href,
      title,
      description,
      href,
      path: href,
      section,
      category: section,
      subcategory,
      icon: meta.icon || "FileText",
      thumbnail: meta.thumbnail || "",
      featured: Boolean(meta.featured),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      order: Number.isFinite(meta.order) ? meta.order : 999,
      source: "html",
      modifiedAt: stats.mtime.toISOString(),
      createdAt: stats.birthtime.toISOString(),
      fileName,
      filePath,
      sectionKey,
    };
  });

  return pages.sort((a, b) => {
    const aTime = new Date(a.modifiedAt).getTime();
    const bTime = new Date(b.modifiedAt).getTime();

    if (bTime !== aTime) return bTime - aTime;
    return a.title.localeCompare(b.title);
  });
}