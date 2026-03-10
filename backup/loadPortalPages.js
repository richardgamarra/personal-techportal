import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "public", "pages");

const FOLDER_CONFIG = {
  ai: {
    label: "AI",
    category: "AI",
    section: "AI",
    icon: "Cpu",
  },
  certification: {
    label: "Certification",
    category: "Certification",
    section: "Certification",
    icon: "Shield",
  },
  enterprise: {
    label: "Enterprise",
    category: "Enterprise",
    section: "Enterprise",
    icon: "Server",
  },
  office365: {
    label: "Office 365",
    category: "Office 365",
    section: "Office 365",
    icon: "Cloud",
  },
  projects: {
    label: "Projects",
    category: "Projects",
    section: "Projects",
    icon: "FolderKanban",
  },
  resources: {
    label: "Resources",
    category: "Resources",
    section: "Resources",
    icon: "BookOpen",
  },
};

const ROOT_DEFAULTS = {
  label: "Project Pages",
  category: "Project Pages",
  section: "Project Pages",
  icon: "FileText",
};

function slugToTitle(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugifyHeading(text, fallback = "section") {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || fallback
  );
}

function extractHeadings(content) {
  const headingRegex = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = Number(match[1]);
    const attrs = match[2] || "";
    const innerHtml = match[3] || "";

    const text = innerHtml
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) continue;

    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const id =
      idMatch?.[1] || slugifyHeading(text, `section-${headings.length + 1}`);

    headings.push({ id, text, level });
  }

  return headings;
}

function parsePortalMeta(content, fallbackSlug, folderName = null) {
  const metaMatch = content.match(/PORTAL_META\s*([\s\S]*?)PORTAL_META_END/);

  const defaults = folderName
    ? FOLDER_CONFIG[folderName] || {
        label: slugToTitle(folderName),
        category: slugToTitle(folderName),
        section: slugToTitle(folderName),
        icon: "FolderKanban",
      }
    : ROOT_DEFAULTS;

  const basePath = folderName
    ? `/pages/${folderName}/${fallbackSlug}.html`
    : `/pages/${fallbackSlug}.html`;

  const meta = {
    id: folderName ? `${folderName}-${fallbackSlug}` : `root-${fallbackSlug}`,
    title: slugToTitle(fallbackSlug),
    description: "Portal documentation page.",
    category: defaults.category,
    section: defaults.section,
    subcategory: defaults.label,
    icon: defaults.icon,
    thumbnail: "",
    tags: [],
    order: 999,
    path: basePath,
    href: basePath,
    newTab: true,
    featured: false,
    source: "html",
    folder: folderName || "root",
    headings: extractHeadings(content),
  };

  if (!metaMatch) return meta;

  const lines = metaMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const [rawKey, ...rawValue] = line.split(":");
    if (!rawKey || rawValue.length === 0) continue;

    const key = rawKey.trim();
    const value = rawValue.join(":").trim();

    if (key === "title") meta.title = value;
    if (key === "description") meta.description = value;
    if (key === "category") meta.category = value;
    if (key === "section") meta.section = value;
    if (key === "subcategory") meta.subcategory = value;
    if (key === "icon") meta.icon = value;
    if (key === "thumbnail") meta.thumbnail = value;
    if (key === "featured") meta.featured = value.toLowerCase() === "true";
    if (key === "newTab") meta.newTab = value.toLowerCase() !== "false";
    if (key === "tags") {
      meta.tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    if (key === "order") meta.order = Number(value) || 999;
  }

  return meta;
}

export function loadPortalHtmlPages() {
  if (!fs.existsSync(PAGES_DIR)) return [];

  const results = [];

  const rootFiles = fs
    .readdirSync(PAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
    .map((entry) => entry.name);

  for (const file of rootFiles) {
    const fullPath = path.join(PAGES_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const slug = file.replace(/\.html$/i, "");
    results.push(parsePortalMeta(content, slug, null));
  }

  for (const folderName of Object.keys(FOLDER_CONFIG)) {
    const folderPath = path.join(PAGES_DIR, folderName);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.toLowerCase().endsWith(".html"));

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const content = fs.readFileSync(fullPath, "utf8");
      const slug = file.replace(/\.html$/i, "");
      results.push(parsePortalMeta(content, slug, folderName));
    }
  }

  return results.sort(
    (a, b) =>
      a.section.localeCompare(b.section) ||
      a.order - b.order ||
      a.title.localeCompare(b.title)
  );
}