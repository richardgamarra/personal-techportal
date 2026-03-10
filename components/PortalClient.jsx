"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Search,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Shield,
  Server,
  Cloud,
  Cpu,
  FolderKanban,
  FileText,
  Star,
  X,
  Sun,
  Home,
  Mail,
} from "lucide-react";

const ICON_MAP = {
  LayoutDashboard,
  Search,
  BookOpen,
  Shield,
  Server,
  Cloud,
  Cpu,
  FolderKanban,
  FileText,
  Star,
  Home,
  Mail,
};

const SECTION_META = {
  Projects: {
    icon: FolderKanban,
    description: "Hands-on technical guides, labs, and implementation notes.",
    label: "Projects",
  },
  Resources: {
    icon: BookOpen,
    description: "Reference materials, curated links, and reusable documentation.",
    label: "Resources",
  },
  "Learning & Certifications": {
    icon: Shield,
    description: "Study pages, certification material, and learning content.",
    label: "Learning & Certifications",
  },
  Enterprise: {
    icon: Server,
    description: "Enterprise support, Windows administration, troubleshooting, and operational content.",
    label: "Operations",
  },
  AI: {
    icon: Cpu,
    description: "Experiments, workflows, model notes, and automation ideas.",
    label: "AI / Automation",
  },
  Cloud: {
    icon: Cloud,
    description: "Cloud notes, platform services, architecture, and operational references.",
    label: "Cloud",
  },
  Certification: {
    icon: Shield,
    description: "Study pages, certification material, and learning content.",
    label: "Certification",
  },
  "Office 365": {
    icon: Cloud,
    description: "Microsoft 365 and collaboration platform notes and references.",
    label: "Office 365",
  },
  "Project Pages": {
    icon: FileText,
    description: "Standalone portal pages and supporting story content.",
    label: "Project Pages",
  },
};

const PRIORITY_SECTION_ORDER = [
  "Projects",
  "Resources",
  "Learning & Certifications",
  "Enterprise",
  "AI",
  "Cloud",
  "Office 365",
  "Project Pages",
  "Certification",
];

const INTERNET_FALLBACKS = {
  ai: "https://images.pexels.com/photos/18069697/pexels-photo-18069697.png?cs=srgb&dl=pexels-googledeepmind-18069697.jpg&fm=jpg",
  infra:
    "https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg?cs=srgb&dl=pexels-cookiecutter-17323801.jpg&fm=jpg",
  abstract:
    "https://images.pexels.com/photos/17486100/pexels-photo-17486100.png?cs=srgb&dl=pexels-googledeepmind-17486100.jpg&fm=jpg",
  cloud:
    "https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

function normalizeText(value) {
  return (value || "").toString().trim();
}

function getItemHref(item) {
  return item?.href || item?.path || "#";
}

function getItemSection(item) {
  return normalizeText(item?.section) || normalizeText(item?.category) || "Other";
}

function getItemCategory(item) {
  return normalizeText(item?.category) || getItemSection(item);
}

function getItemIcon(item) {
  const iconName = normalizeText(item?.icon);
  return ICON_MAP[iconName] || FileText;
}

function sortSections(a, b) {
  const aIndex = PRIORITY_SECTION_ORDER.indexOf(a);
  const bIndex = PRIORITY_SECTION_ORDER.indexOf(b);

  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return a.localeCompare(b);
}

function sortItems(a, b) {
  return (
    (Number(a?.order) || 999) - (Number(b?.order) || 999) ||
    normalizeText(a?.title).localeCompare(normalizeText(b?.title))
  );
}

function SectionIcon({ section, className = "h-4 w-4" }) {
  const Icon = SECTION_META[section]?.icon || FileText;
  return <Icon className={className} />;
}

function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-[28px] border border-white/10 bg-[#0b1220]/92 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function PortalClient({ initialContent = [] }) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("home");
  const [selectedSection, setSelectedSection] = useState(null);

  const allItems = useMemo(() => {
    return [...initialContent]
      .filter((item) => normalizeText(item?.title))
      .sort((a, b) => sortSections(getItemSection(a), getItemSection(b)) || sortItems(a, b));
  }, [initialContent]);

  const groupedSections = useMemo(() => {
    const groups = new Map();
    for (const item of allItems) {
      const section = getItemSection(item);
      if (!groups.has(section)) groups.set(section, []);
      groups.get(section).push(item);
    }
    return Array.from(groups.entries())
      .sort((a, b) => sortSections(a[0], b[0]))
      .map(([section, items]) => ({ section, items: [...items].sort(sortItems) }));
  }, [allItems]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchesSection = activeSection === "All" || getItemSection(item) === activeSection;
      if (!matchesSection) return false;
      if (!q) return true;
      const haystack = [
        item.title,
        item.description,
        item.section,
        item.category,
        item.subcategory,
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allItems, activeSection, query]);

  const filteredGroupedSections = useMemo(() => {
    const ids = new Set(filteredItems.map((item) => item.id));
    return groupedSections
      .map((group) => ({ ...group, items: group.items.filter((item) => ids.has(item.id)) }))
      .filter((group) => group.items.length > 0);
  }, [groupedSections, filteredItems]);

  const featuredItems = useMemo(() => {
    const featured = allItems.filter((item) => item.featured);
    return (featured.length ? featured : allItems.slice(0, 6)).slice(0, 6);
  }, [allItems]);

  const selectedItem = useMemo(() => {
    if (!allItems.length) return null;
    return allItems.find((item) => item.id === selectedItemId) || null;
  }, [allItems, selectedItemId]);

  useEffect(() => {
    if (!allItems.length) {
      setSelectedItemId(null);
      return;
    }
    const stillExists = allItems.some((item) => item.id === selectedItemId);
    if (!selectedItemId || !stillExists) {
      setSelectedItemId(allItems[0].id);
    }
  }, [allItems, selectedItemId]);

  const visibleSelectedItem = useMemo(() => {
    if (!selectedItem) return filteredItems[0] || allItems[0] || null;
    const inFilteredSet = filteredItems.some((item) => item.id === selectedItem.id);
    return inFilteredSet ? selectedItem : filteredItems[0] || selectedItem;
  }, [allItems, filteredItems, selectedItem]);

  const quickSections = useMemo(() => {
    return PRIORITY_SECTION_ORDER.filter((section) =>
      groupedSections.some((group) => group.section === section)
    ).map((section) => ({
      section,
      count: groupedSections.find((group) => group.section === section)?.items.length || 0,
    }));
  }, [groupedSections]);

  function getItemsForSection(section) {
    return groupedSections.find((g) => g.section === section)?.items || [];
  }

  function getAutoImage(item, index = 0) {
    if (item?.thumbnail) return item.thumbnail;
    const title = (item?.title || "").toLowerCase();
    const section = (item?.section || item?.category || "").toLowerCase();

    if (
      title.includes("security") ||
      title.includes("comptia") ||
      section.includes("learning") ||
      section.includes("certification")
    ) return INTERNET_FALLBACKS.abstract;

    if (section.includes("cloud") || title.includes("azure") || title.includes("aws")) {
      return INTERNET_FALLBACKS.cloud;
    }

    if (
      title.includes("windows") ||
      title.includes("troubleshooting") ||
      title.includes("server") ||
      section.includes("enterprise")
    ) return INTERNET_FALLBACKS.infra;

    if (
      title.includes("ai") ||
      title.includes("automation") ||
      title.includes("llm") ||
      section.includes("ai")
    ) return INTERNET_FALLBACKS.ai;

    if (
      title.includes("network") ||
      title.includes("lab") ||
      title.includes("infrastructure") ||
      section.includes("projects")
    ) return INTERNET_FALLBACKS.infra;

    if (section.includes("resources")) return INTERNET_FALLBACKS.abstract;

    const fallbacks = [
      INTERNET_FALLBACKS.ai,
      INTERNET_FALLBACKS.infra,
      INTERNET_FALLBACKS.abstract,
      INTERNET_FALLBACKS.cloud,
    ];
    return fallbacks[index % fallbacks.length];
  }

  function handleOpenPage(item) {
    setSelectedItemId(item.id);
    setViewMode("page");
    setMobileMenuOpen(false);
  }

  function handleOpenSection(section) {
    setSelectedSection(section);
    setViewMode("section");
    setMobileMenuOpen(false);
  }

  function goHome() {
    setViewMode("home");
    setSelectedSection(null);
    setMobileMenuOpen(false);
  }

  function handleOpenContact() {
    setViewMode("contact");
    setSelectedSection(null);
    setMobileMenuOpen(false);
  }

  function openStoryPage() {
    const storyItem = allItems.find(
      (item) =>
        item.title?.toLowerCase().includes("story") ||
        item.title?.toLowerCase().includes("journey")
    );
    if (storyItem) {
      handleOpenPage(storyItem);
      setActiveSection("All");
    }
  }

  function SidebarContent() {
    return (
      <div className="flex h-full flex-col bg-[#050d1b] text-slate-100">
        <div className="border-b border-white/10 p-5">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            className="flex items-start gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/20 bg-[#0d1930] text-sky-300">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight text-white">Richard Gamarra</p>
              <p className="text-sm text-slate-400">Enterprise Technology Portal</p>
            </div>
          </a>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources, pages, topics..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400/40 focus:bg-white/10"
            />
          </div>
        </div>

        <div className="border-b border-white/10 p-4">
          <button
            type="button"
            onClick={goHome}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
              viewMode === "home"
                ? "bg-sky-500 text-white shadow-[0_10px_30px_rgba(14,165,233,0.22)]"
                : "text-slate-200 hover:bg-white/7"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Home</span>
          </button>
        </div>

        <div className="border-b border-white/10 p-4">
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.26em] text-sky-200/80">
            Sections
          </p>
          <div className="space-y-2">
            {quickSections.map(({ section }) => {
              const isSectionView = viewMode === "section" && selectedSection === section;
              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleOpenSection(section)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    isSectionView
                      ? "bg-sky-500 text-white shadow-[0_10px_30px_rgba(14,165,233,0.22)]"
                      : "text-slate-200 hover:bg-white/7"
                  }`}
                >
                  <SectionIcon section={section} className="h-4 w-4" />
                  <span className="text-sm font-medium">{section}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {filteredGroupedSections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              No pages matched your search.
            </div>
          ) : (
            <div className="space-y-5">
              {filteredGroupedSections.map((group) => (
                <div key={group.section}>
                  <div className="mb-2 flex items-center gap-2 px-2">
                    <SectionIcon section={group.section} className="h-4 w-4 text-sky-300" />
                    <button
                      type="button"
                      onClick={() => handleOpenSection(group.section)}
                      className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/80 hover:text-white"
                    >
                      {group.section}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const Icon = getItemIcon(item);
                      const isActive = viewMode === "page" && visibleSelectedItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleOpenPage(item)}
                          className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
                            isActive
                              ? "bg-sky-500/90 text-white shadow-[0_10px_30px_rgba(14,165,233,0.22)]"
                              : "text-slate-200 hover:bg-white/7"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                              isActive ? "bg-white/15" : "bg-white/5"
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-300"}`} />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{item.title}</div>
                            <div className={`truncate text-xs ${isActive ? "text-sky-100/80" : "text-slate-400"}`}>
                              {item.subcategory || item.category || item.section}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.26em] text-sky-200/80">
            Contact
          </p>
          <button
            type="button"
            onClick={handleOpenContact}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
              viewMode === "contact"
                ? "bg-sky-500 text-white shadow-[0_10px_30px_rgba(14,165,233,0.22)]"
                : "text-slate-200 hover:bg-white/7"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">Contact</span>
          </button>
        </div>
      </div>
    );
  }

  function FeaturedCard({ item, index = 0, compact = false }) {
    const Icon = getItemIcon(item);
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleOpenPage(item)}
        className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#161616]/95 text-left shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition hover:border-sky-400/30 hover:bg-[#1a1a1a]"
      >
        <div className={`relative overflow-hidden ${compact ? "h-[220px]" : "h-[280px]"}`}>
          <img
            src={getAutoImage(item, index)}
            alt={item.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1930] text-sky-300">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-bold text-white">{item.title}</div>
              <div className="mt-1 text-sm text-slate-400">{item.section} • {item.subcategory || item.category}</div>
            </div>
            {item.featured ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-900">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-5 text-sm leading-8 text-slate-300">{item.description || "Portal section page."}</p>
          <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">
            Open Page
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
      </button>
    );
  }

  function HomeView() {
    return (
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#071225]/88 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:px-6">
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
                className="block"
              >
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  Richard Gamarra | Enterprise Technology Portal
                </h1>
              </a>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
                className="mt-1 block text-sm text-slate-400 hover:text-slate-300"
              >
                Infrastructure, systems, automation, and practical technology leadership.
              </a>
            </div>
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10"
              aria-label="Theme toggle"
            >
              <Sun className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1.65fr)_420px] lg:p-6">
            <div className="rounded-[32px] border border-sky-400/10 bg-[linear-gradient(135deg,#13213c_0%,#1d3150_60%,#0f5f8f_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] lg:p-10">
              <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_260px]">
                <div>
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    Personal Homepage + Resource Portal
                  </span>
                  <h2 className="mt-6 max-w-[540px] text-5xl font-bold leading-[0.95] tracking-tight text-white lg:text-7xl">
                    Enterprise IT Experience, Modern Technology Thinking
                  </h2>
                  <p className="mt-6 max-w-[560px] text-lg leading-9 text-slate-200">
                    A professional portal that brings together my IT journey, curated resources,
                    practical tools, and the pages I build along the way.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenSection("Resources")}
                      className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Explore Resources
                    </button>
                    <button
                      type="button"
                      onClick={openStoryPage}
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Read My Journey
                    </button>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { label: "Resources", value: groupedSections.find((g) => g.section === "Resources")?.items.length || 0 },
                      { label: "Learning & Certs", value: groupedSections.find((g) => g.section === "Learning & Certifications")?.items.length || 0 },
                      { label: "Enterprise", value: groupedSections.find((g) => g.section === "Enterprise")?.items.length || 0 },
                      { label: "Projects", value: groupedSections.find((g) => g.section === "Projects")?.items.length || 0 },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-[22px] bg-white/10 px-4 py-5 text-white backdrop-blur-sm">
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="mt-2 text-sm text-slate-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 min-h-[520px]">
                  <img
                    src={INTERNET_FALLBACKS.infra}
                    alt="Portal hero"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/10 bg-[#0f172a]/65 p-5 backdrop-blur-md">
                    <p className="text-lg font-semibold text-white">Professional Focus</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">
                      Enterprise systems, support operations, infrastructure, automation,
                      and continuous growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="h-full bg-[#151515]/88">
              <div className="p-6">
                <h3 className="text-3xl font-bold text-white">Why I Built This Portal</h3>
                <p className="mt-2 text-base text-slate-300">A short first-person motivation story.</p>
                <div className="mt-8 space-y-5 text-base leading-9 text-slate-300">
                  <p>
                    I created this portal to organize the things that matter most in my professional
                    journey: knowledge, experience, useful references, and the constant evolution of technology.
                  </p>
                  <p>
                    Over the years I have worked across enterprise systems, infrastructure, support
                    operations, troubleshooting, and modernization efforts.
                  </p>
                  <p>
                    I wanted one professional space where I could connect that experience with what
                    I am learning now in automation, AI tools, and modern platforms.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Knowledge Hub", "Professional Profile", "Curated Resources", "Expandable Architecture"].map((tag) => (
                    <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={openStoryPage}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Read Full Story
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="px-2 pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">Highlights</p>
          <h2 className="mt-3 text-4xl font-bold text-white">Explore Key Areas</h2>
          <p className="mt-2 text-base text-slate-300">Quick entry points into the main sections of the portal.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickSections.slice(0, 6).map(({ section, count }) => {
            const Icon = SECTION_META[section]?.icon || FileText;
            return (
              <button
                key={section}
                type="button"
                onClick={() => handleOpenSection(section)}
                className="rounded-[28px] border border-white/10 bg-[#121212]/92 p-6 text-left shadow-[0_10px_35px_rgba(0,0,0,0.24)] transition hover:border-sky-400/30 hover:bg-[#171717]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1930] text-sky-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">{section}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{SECTION_META[section]?.description || "Organized documentation pages."}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white">
                  <span>Open Section</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">{count} page{count === 1 ? "" : "s"}</div>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">Featured Pages</p>
          <h2 className="mt-3 text-4xl font-bold text-white">Highlighted Portal Content</h2>
          <p className="mt-2 text-base text-slate-300">Featured HTML pages from across resources, learning, enterprise, and project sections.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} compact />
          ))}
        </div>
      </div>
    );
  }

  function SectionView() {
    const sectionItems = getItemsForSection(selectedSection);
    return (
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#071225]/88 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">{SECTION_META[selectedSection]?.label || "Section"}</p>
            <h1 className="mt-3 text-5xl font-bold text-white">{selectedSection}</h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{SECTION_META[selectedSection]?.description || "Portal section overview."}</p>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
            {sectionItems.map((item, index) => (
              <FeaturedCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ContactView() {
    return (
      <Card className="overflow-hidden">
        <div className="border-b border-white/10 px-5 py-5 lg:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">Contact</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Richard Gamarra</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Get in touch for professional inquiries, collaboration, and technology consulting discussions.
          </p>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-[#151515]/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Profile</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Richard Gamarra</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Enterprise Technology Portal</p>
          </div>
          <a
            href="mailto:contact@richardgamarra.com"
            className="rounded-[28px] border border-white/10 bg-[#151515]/90 p-6 transition hover:border-sky-400/30 hover:bg-[#1a1a1a]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Email</p>
            <h2 className="mt-4 break-all text-2xl font-bold text-white">contact@richardgamarra.com</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Send an email directly.</p>
          </a>
          <a
            href="https://linkedin.com/richardgamarra/"
            target="_blank"
            rel="noreferrer"
            className="rounded-[28px] border border-white/10 bg-[#151515]/90 p-6 transition hover:border-sky-400/30 hover:bg-[#1a1a1a]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">LinkedIn</p>
            <h2 className="mt-4 break-all text-2xl font-bold text-white">linkedin.com/richardgamarra/</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Open the professional LinkedIn profile.</p>
          </a>
        </div>
      </Card>
    );
  }

  function PageView() {
    return (
      <Card className="overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">{visibleSelectedItem?.title}</h1>
              {visibleSelectedItem?.description ? (
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{visibleSelectedItem.description}</p>
              ) : null}
            </div>
            {visibleSelectedItem ? (
              <a
                href={getItemHref(visibleSelectedItem)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                Open raw HTML
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
        <div className="bg-[#06111f]">
          {visibleSelectedItem ? (
            <iframe
              key={getItemHref(visibleSelectedItem)}
              name="portal-content-frame"
              title={visibleSelectedItem.title}
              src={getItemHref(visibleSelectedItem)}
              className="w-full min-h-[1800px] rounded-b-[28px] border-0 bg-[#06111f]"
            />
          ) : (
            <div className="flex min-h-[900px] items-center justify-center p-10 text-center text-sm text-slate-400">
              No page selected.
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-[#030817] text-slate-100">
      <div className="bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#020817_0%,#041028_100%)]">
        <div className="mx-auto flex min-h-screen max-w-[1850px] gap-5 p-3 lg:p-4">
          <aside className="hidden w-[320px] shrink-0 overflow-hidden rounded-[30px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:block">
            <SidebarContent />
          </aside>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
              <div className="h-full w-[88vw] max-w-[340px] bg-[#050d1b] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <p className="font-semibold text-white">Navigation</p>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          <main className="min-w-0 flex-1 space-y-5">
            {viewMode === "home" && <HomeView />}
            {viewMode === "section" && <SectionView />}
            {viewMode === "page" && <PageView />}
            {viewMode === "contact" && <ContactView />}
          </main>
        </div>
      </div>
    </div>
  );
}
