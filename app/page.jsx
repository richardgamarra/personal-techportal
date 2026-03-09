"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contentIndex } from "@/data/contentIndex";
import {
  User,
  BookOpen,
  Award,
  Mail,
  Search,
  ExternalLink,
  Server,
  Moon,
  Sun,
  Menu,
  Home,
  FolderKanban,
  X,
  ChevronRight,
  Link as LinkIcon,
  Shield,
  Network,
  Cpu,
  Cloud,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const siteContent = {
  site: {
    title: "Richard Gamarra | Enterprise Technology Portal",
    tagline: "Infrastructure, systems, automation, and practical technology leadership.",
    theme: "dark",
    contactEmail: "contact@richardgamarra.com",
    linkedIn: "https://www.linkedin.com/",
  },
  hero: {
    headline: "Enterprise IT Experience, Modern Technology Thinking",
    summary:
      "A professional portal that brings together my IT journey, curated resources, practical tools, and the pages I build along the way.",
    ctaPrimary: "Explore Resources",
    ctaSecondary: "Read My Journey",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  story:
    "I created this portal to organize the things that matter most in my professional journey: knowledge, experience, useful references, and the constant evolution of technology. Over the years I have worked across enterprise systems, infrastructure, support operations, troubleshooting, and modernization efforts. I wanted one professional space where I could connect that experience with what I am learning now in automation, AI tools, and modern platforms.",
};

const iconMap = {
  Home,
  User,
  BookOpen,
  Award,
  Mail,
  Shield,
  Server,
  Network,
  Cpu,
  Cloud,
  GraduationCap,
  FolderKanban,
  LinkIcon,
};

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "journey", label: "My IT Journey", icon: User },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "certs", label: "Learning & Certifications", icon: Award },
  { id: "enterprise", label: "Enterprise", icon: Server },
  { id: "projects", label: "Project Pages", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-500">
        {eyebrow}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

function ResourceIcon({ name, className = "h-5 w-5" }) {
  const Comp = iconMap[name] || LinkIcon;
  return <Comp className={className} />;
}

function getSectionCards(cards, sectionName) {
  return cards.filter(
    (card) => (card.section || "").toLowerCase() === sectionName.toLowerCase()
  );
}

function filterCards(cards, search) {
  const q = search.trim().toLowerCase();
  if (!q) return cards;

  return cards.filter((card) =>
    [card.title, card.description, card.category, card.subcategory, card.section]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(q))
  );
}

function CardGrid({ cards }) {
  if (!cards.length) {
    return (
      <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
        No pages in this section yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {cards.map((page) => (
        <Card
          key={page.id}
          className="overflow-hidden rounded-[24px] transition hover:-translate-y-1 hover:shadow-xl"
        >
          <img
            src={page.thumbnail}
            alt={page.title}
            className="h-48 w-full object-cover"
          />
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                  <ResourceIcon name={page.icon} />
                </div>
                <div>
                  <div className="font-semibold">{page.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {[page.category, page.subcategory].filter(Boolean).join(" • ")}
                  </div>
                </div>
              </div>
              {page.featured ? <Badge>Featured</Badge> : null}
            </div>

            <p className="text-sm text-muted-foreground">{page.description}</p>

            <a
              href={page.href}
              target={page.newTab === false ? "_self" : "_blank"}
              rel={page.newTab === false ? undefined : "noopener noreferrer"}
              className="block"
            >
              <Button className="w-full rounded-2xl">
                Open Page <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function PersonalTechnologyPortal() {
  const [active, setActive] = useState("home");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(siteContent.site.theme);

  const allCards = contentIndex || [];

  const resourceCards = useMemo(
    () => filterCards(getSectionCards(allCards, "Resources"), search),
    [allCards, search]
  );

  const certCards = useMemo(
    () => filterCards(getSectionCards(allCards, "Learning & Certifications"), search),
    [allCards, search]
  );

  const enterpriseCards = useMemo(
    () => filterCards(getSectionCards(allCards, "Enterprise"), search),
    [allCards, search]
  );

  const projectCards = useMemo(
    () => filterCards(getSectionCards(allCards, "Project Pages"), search),
    [allCards, search]
  );

  const featuredCards = useMemo(
    () => allCards.filter((card) => card.featured),
    [allCards]
  );

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <div className="flex min-h-screen">
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:static lg:block ${
              sidebarOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                  <div className="text-lg font-semibold tracking-tight">Richard Gamarra</div>
                  <div className="text-sm text-muted-foreground">Enterprise Technology Portal</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search resources, pages, topics..."
                    className="pl-9"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1 px-3">
                <nav className="space-y-1 pb-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                          active === item.id
                            ? "bg-slate-900 text-white dark:bg-sky-600"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <Separator className="my-4" />

                <div className="space-y-3 px-1 pb-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Featured Linked Pages
                  </div>
                  {featuredCards.slice(0, 6).map((page) => (
                    <a
                      key={page.id}
                      href={page.href}
                      target={page.newTab === false ? "_self" : "_blank"}
                      rel={page.newTab === false ? undefined : "noopener noreferrer"}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 transition hover:border-sky-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-900">
                          <ResourceIcon name={page.icon} className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{page.title}</div>
                          <div className="text-xs text-muted-foreground">{page.section}</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div>
                    <div className="text-lg font-semibold tracking-tight">
                      {siteContent.site.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {siteContent.site.tagline}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
              {active === "home" && (
                <div className="space-y-10">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]"
                    >
                      <Card className="overflow-hidden rounded-[28px] border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white shadow-2xl">
                        <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
                          <div className="space-y-6">
                            <Badge className="w-fit rounded-full bg-white/15 text-white hover:bg-white/15">
                              Personal Homepage + Resource Portal
                            </Badge>

                            <div className="space-y-3">
                              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                                {siteContent.hero.headline}
                              </h1>
                              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                                {siteContent.hero.summary}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <Button
                                className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100"
                                onClick={() => setActive("resources")}
                              >
                                {siteContent.hero.ctaPrimary}
                              </Button>
                              <Button
                                variant="outline"
                                className="rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10"
                                onClick={() => setActive("journey")}
                              >
                                {siteContent.hero.ctaSecondary}
                              </Button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-4">
                              {[
                                ["Resources", String(resourceCards.length)],
                                ["Learning & Certs", String(certCards.length)],
                                ["Enterprise", String(enterpriseCards.length)],
                                ["Projects", String(projectCards.length)],
                              ].map(([label, value]) => (
                                <div key={label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                  <div className="text-2xl font-semibold">{value}</div>
                                  <div className="text-sm text-slate-300">{label}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative">
                            <img
                              src={siteContent.hero.image}
                              alt="Professional technology workspace"
                              className="h-full min-h-[280px] w-full rounded-[24px] object-cover shadow-xl"
                            />
                            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-slate-950/55 p-4 backdrop-blur">
                              <div className="text-sm font-medium">Professional Focus</div>
                              <div className="mt-1 text-sm text-slate-300">
                                Enterprise systems, support operations, infrastructure,
                                automation, and continuous growth.
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="rounded-[28px] shadow-lg">
                        <CardHeader>
                          <CardTitle>Why I Built This Portal</CardTitle>
                          <CardDescription>A short first-person motivation story.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm leading-7 text-muted-foreground">
                            {siteContent.story}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Knowledge Hub</Badge>
                            <Badge variant="secondary">Professional Profile</Badge>
                            <Badge variant="secondary">Curated Resources</Badge>
                            <Badge variant="secondary">Expandable Architecture</Badge>
                          </div>
                          <a href="/pages/about-story.html" target="_blank" rel="noopener noreferrer">
                            <Button className="mt-2 rounded-2xl">
                              Read Full Story
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </section>

                  <section className="space-y-5">
                    <SectionTitle
                      eyebrow="Highlights"
                      title="Explore Key Areas"
                      description="Quick entry points into the main sections of the portal."
                    />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {[
                        ["My IT Journey", "Background, experience, and professional perspective.", User, "journey"],
                        ["Resources", "Curated reference pages and practical tools.", BookOpen, "resources"],
                        ["Learning & Certifications", "Study pages, certification material, and learning content.", Award, "certs"],
                        ["Enterprise", "Enterprise support, Windows, systems, and troubleshooting pages.", Server, "enterprise"],
                        ["Project Pages", "Temporary holding area for pages not yet classified.", FolderKanban, "projects"],
                        ["Contact", "Professional contact information and next steps.", Mail, "contact"],
                      ].map(([title, description, Icon, target]) => (
                        <Card
                          key={title}
                          className="rounded-[24px] transition hover:-translate-y-1 hover:shadow-xl"
                        >
                          <CardContent className="space-y-4 p-6">
                            <div className="w-fit rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{title}</div>
                              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                            </div>
                            <Button variant="ghost" className="px-0" onClick={() => setActive(target)}>
                              Open Section <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-5">
                    <SectionTitle
                      eyebrow="Featured Pages"
                      title="Highlighted Portal Content"
                      description="Featured HTML pages from across resources, learning, enterprise, and project sections."
                    />
                    <CardGrid cards={featuredCards} />
                  </section>

                  <section className="space-y-5">
                    <SectionTitle
                      eyebrow="All Portal Pages"
                      title="Card-Based Content Sections"
                      description="Pages are organized into Resources, Learning & Certifications, Enterprise, and Project Pages."
                    />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {[
                        ["Resources", resourceCards.length],
                        ["Learning & Certifications", certCards.length],
                        ["Enterprise", enterpriseCards.length],
                        ["Project Pages", projectCards.length],
                      ].map(([label, count]) => (
                        <Card key={label} className="rounded-[24px]">
                          <CardContent className="space-y-2 p-6">
                            <div className="text-lg font-semibold">{label}</div>
                            <div className="text-3xl font-bold">{count}</div>
                            <div className="text-sm text-muted-foreground">Linked pages in this section</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {active === "journey" && (
                <div className="flex w-full flex-col items-center space-y-6">
                  <div className="flex w-full max-w-5xl items-center justify-between">
                    <SectionTitle
                      eyebrow="About Me"
                      title="My IT Journey"
                      description="A personal account of enterprise technology experience and growth."
                    />
                    <a href="/pages/about-story.html" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="shrink-0 rounded-2xl">
                        Open Full Page <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                  <div
                    className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 shadow-lg dark:border-slate-800"
                    style={{ height: "80vh" }}
                  >
                    <iframe
                      src="/pages/about-story.html"
                      title="My IT Journey"
                      className="h-full w-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {active === "resources" && (
                <div className="space-y-6">
                  <SectionTitle
                    eyebrow="Curated Resources"
                    title="Resources"
                    description="Reference pages, tools, guides, and curated technical material."
                  />
                  <CardGrid cards={resourceCards} />
                </div>
              )}

              {active === "certs" && (
                <div className="space-y-6">
                  <SectionTitle
                    eyebrow="Development"
                    title="Learning & Certifications"
                    description="Certification pages, study portals, and professional development content."
                  />
                  <CardGrid cards={certCards} />
                </div>
              )}

              {active === "enterprise" && (
                <div className="space-y-6">
                  <SectionTitle
                    eyebrow="Operations"
                    title="Enterprise"
                    description="Enterprise support, Windows administration, troubleshooting, and operational content."
                  />
                  <CardGrid cards={enterpriseCards} />
                </div>
              )}

              {active === "projects" && (
                <div className="space-y-6">
                  <SectionTitle
                    eyebrow="Unclassified Pages"
                    title="Project Pages"
                    description="Temporary card section for pages not yet moved into Resources, Learning & Certifications, or Enterprise."
                  />
                  <CardGrid cards={projectCards} />
                </div>
              )}

              {active === "contact" && (
                <div className="space-y-6">
                  <SectionTitle
                    eyebrow="Connect"
                    title="Contact"
                    description="A professional contact section suitable for portfolio and portal use."
                  />
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                    <Card className="rounded-[28px]">
                      <CardContent className="space-y-4 p-8">
                        <div>
                          <div className="text-lg font-semibold">Professional Contact</div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Use this area for email, LinkedIn, resume links, or a contact form later.
                          </p>
                        </div>
                        <div className="rounded-2xl border p-4 text-sm">
                          <div className="font-medium">Email</div>
                          <a
                            href={`mailto:${siteContent.site.contactEmail}`}
                            className="text-sky-600 underline underline-offset-4"
                          >
                            {siteContent.site.contactEmail}
                          </a>
                        </div>
                        <div className="rounded-2xl border p-4 text-sm">
                          <div className="font-medium">LinkedIn</div>
                          <a
                            href={siteContent.site.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 underline underline-offset-4"
                          >
                            Professional profile link
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-[28px]">
                      <CardHeader>
                        <CardTitle>Recommended Extensions</CardTitle>
                        <CardDescription>Easy next additions for a production deployment.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="rounded-2xl border p-4">
                          Contact form backed by serverless function or Supabase.
                        </div>
                        <div className="rounded-2xl border p-4">
                          Analytics via Plausible or Vercel Analytics.
                        </div>
                        <div className="rounded-2xl border p-4">
                          Resume download and downloadable documents section.
                        </div>
                        <div className="rounded-2xl border p-4">
                          Optional protected admin later, only if you truly need CMS features.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}