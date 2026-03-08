"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Briefcase,
  Award,
  Mail,
  Search,
  ExternalLink,
  Settings,
  Image as ImageIcon,
  Link as LinkIcon,
  Pencil,
  Plus,
  Trash2,
  Shield,
  Server,
  Network,
  Cpu,
  Cloud,
  GraduationCap,
  Moon,
  Sun,
  Menu,
  Home,
  FolderKanban,
  Save,
  Eye,
  Star,
  X,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const defaultContent = {
  site: {
    title: "Rick Gamarra | Enterprise Technology Portal",
    tagline: "Infrastructure, systems, automation, and practical technology leadership.",
    theme: "dark",
    contactEmail: "rick@example.com",
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
  story: `I created this portal to organize the things that matter most in my professional journey: knowledge, experience, useful references, and the constant evolution of technology. Over the years I have worked across enterprise systems, infrastructure, support operations, troubleshooting, and modernization efforts. I wanted one professional space where I could connect that experience with what I am learning now in automation, AI tools, and modern platforms. This site is designed to be both a personal home page and a practical technology hub that I can continue expanding over time.`,
  journey: {
    title: "My IT Journey",
    subtitle: "A practical career shaped by enterprise operations, support, and continuous improvement.",
    body: `I am an experienced IT professional with a background in enterprise systems, infrastructure support, systems administration, troubleshooting, and modernization initiatives. My work has focused on keeping business-critical technology reliable while helping users and teams navigate complex operational environments. Over time, that foundation expanded into broader interests in automation, AI-enabled workflows, and modern technology platforms.

What defines my approach is a practical engineering mindset: identify the issue clearly, understand the environment, stabilize the problem, and build a repeatable solution. I value service, responsiveness, strong documentation, and continuous learning. This portal reflects that same mindset by bringing together resources, projects, and reference pages in one organized place.`,
    highlights: [
      "Enterprise systems and infrastructure support",
      "Windows administration and troubleshooting",
      "Networking, virtualization, and endpoint operations",
      "AI, automation, and modern tooling exploration",
      "Professional growth, mentorship, and continuous learning",
    ],
  },
  certifications: [
    { title: "Cloud & Microsoft Learning", status: "Active", note: "Continuing development in modern infrastructure and platform tools." },
    { title: "AI & Automation Exploration", status: "Ongoing", note: "Hands-on work with local models, Docker, automation workflows, and agentic tools." },
    { title: "Enterprise Systems Practice", status: "Established", note: "Broad operational experience in systems, support, troubleshooting, and modernization." },
  ],
  resources: [
    {
      id: 1,
      name: "Networking",
      icon: "Network",
      description: "VPN, routing, remote access, firewalling, and connectivity resources.",
      featured: true,
      items: [
        { title: "Remote Access Design Notes", type: "internal", href: "#", description: "Approaches for secure access to home and remote environments." },
        { title: "WireGuard Documentation", type: "external", href: "https://www.wireguard.com/", description: "Official documentation and implementation guidance." },
      ],
    },
    {
      id: 2,
      name: "Cybersecurity",
      icon: "Shield",
      description: "Identity, endpoint hygiene, risk reduction, and security operations references.",
      featured: true,
      items: [
        { title: "Security+ Learning Hub", type: "external", href: "/pages/CompTIASecurity.html", description: "Certification and learning reference point." },
      ],
    },
    {
      id: 3,
      name: "Systems Administration",
      icon: "Server",
      description: "Windows, services, troubleshooting, deployment, and operational support content.",
      featured: false,
      items: [
        { title: "Windows Troubleshooting Notes", type: "internal", href: "#", description: "Collected operational patterns and recovery steps." },
      ],
    },
    {
      id: 4,
      name: "AI / Automation",
      icon: "Cpu",
      description: "Local LLMs, Dockerized workflows, agentic platforms, and operational automation.",
      featured: true,
      items: [
        { title: "Ollama", type: "external", href: "https://ollama.com/", description: "Run local LLM workloads and experiments." },
      ],
    },
    {
      id: 5,
      name: "Cloud",
      icon: "Cloud",
      description: "Cloud architecture, identity, hosting, and hybrid environment references.",
      featured: false,
      items: [],
    },
    {
      id: 6,
      name: "Learning Resources",
      icon: "GraduationCap",
      description: "Study guides, labs, notes, and curated professional development material.",
      featured: true,
      items: [],
    },
  ],
  projectPages: [
    {
      id: 1,
      title: "CompTIA Security+ Resource Portal",
      description: "A curated study page with official links, free resources, videos, and exam prep material.",
      icon: "Shield",
      thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
      href: "/pages/pages/CompTIASecurity.html",
      newTab: true,
      featured: true,
      category: "Certifications",
    },
    {
      id: 2,
      title: "AI Tools Reference Page",
      description: "A structured page for AI utilities, local models, and workflow tools used in lab and learning environments.",
      icon: "Cpu",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      href: "ai-tools.html",
      newTab: true,
      featured: false,
      category: "Tools",
    },
    {
      id: 3,
      title: "Networking Lab Library",
      description: "A collection of practical networking, VPN, and remote access pages linked from the portal.",
      icon: "Network",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      href: "networking-lab.html",
      newTab: true,
      featured: true,
      category: "Lab Pages",
    },
  ],
};

const iconMap = {
  Home,
  User,
  BookOpen,
  Briefcase,
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
  { id: "projects", label: "Project Pages", icon: FolderKanban },
  { id: "certs", label: "Learning & Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "admin", label: "Admin", icon: Settings },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-500">{eyebrow}</div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{description}</p> : null}
    </div>
  );
}

function ResourceIcon({ name, className = "h-5 w-5" }) {
  const Comp = iconMap[name] || LinkIcon;
  return <Comp className={className} />;
}

export default function PersonalTechnologyPortal() {
  const [content, setContent] = useState(defaultContent);
  const [active, setActive] = useState("home");
  const [search, setSearch] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [adminUser, setAdminUser] = useState("admin");
  const [adminPass, setAdminPass] = useState("demo123");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(defaultContent.site.theme);
  const [toast, setToast] = useState("");

  const filteredResources = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return content.resources;
    return content.resources
      .map((r) => ({
        ...r,
        items: r.items.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q)
        ),
      }))
      .filter((r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.items.length > 0);
  }, [search, content.resources]);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return content.projectPages;
    return content.projectPages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search, content.projectPages]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const handleLogin = () => {
    if (adminUser === "admin" && adminPass === "demo123") {
      setIsAuthed(true);
      showToast("Admin access enabled.");
    } else {
      showToast("Invalid demo credentials. Use admin / demo123.");
    }
  };

  const updateStory = (value) => {
    setContent((prev) => ({ ...prev, story: value }));
    showToast("Motivation story updated.");
  };

  const updateJourney = (field, value) => {
    setContent((prev) => ({ ...prev, journey: { ...prev.journey, [field]: value } }));
    showToast("Journey page updated.");
  };

  const updateHero = (field, value) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
    showToast("Homepage hero updated.");
  };

  const addResourceCategory = () => {
    const nextId = Math.max(...content.resources.map((r) => r.id)) + 1;
    setContent((prev) => ({
      ...prev,
      resources: [
        ...prev.resources,
        {
          id: nextId,
          name: `New Category ${nextId}`,
          icon: "BookOpen",
          description: "Add description here.",
          featured: false,
          items: [],
        },
      ],
    }));
    showToast("New resource category added.");
  };

  const addProjectPage = () => {
    const nextId = Math.max(...content.projectPages.map((p) => p.id)) + 1;
    setContent((prev) => ({
      ...prev,
      projectPages: [
        ...prev.projectPages,
        {
          id: nextId,
          title: `New Project Page ${nextId}`,
          description: "Describe this linked HTML page.",
          icon: "FolderKanban",
          thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
          href: `page-${nextId}.html`,
          newTab: true,
          featured: false,
          category: "Project Pages",
        },
      ],
    }));
    showToast("Linked project page added.");
  };

  const removeProjectPage = (id) => {
    setContent((prev) => ({ ...prev, projectPages: prev.projectPages.filter((p) => p.id !== id) }));
    showToast("Linked page removed.");
  };

  const featuredResources = content.resources.filter((r) => r.featured);
  const featuredProjects = content.projectPages.filter((p) => p.featured);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <div className="flex min-h-screen">
          <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:static lg:block ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                  <div className="text-lg font-semibold tracking-tight">Rick Gamarra</div>
                  <div className="text-sm text-muted-foreground">Enterprise Technology Portal</div>
                </div>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources, pages, topics..." className="pl-9" />
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
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Featured Linked Pages</div>
                  {featuredProjects.map((page) => (
                    <a
                      key={page.id}
                      href={page.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 transition hover:border-sky-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-900">
                          <ResourceIcon name={page.icon} className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{page.title}</div>
                          <div className="text-xs text-muted-foreground">{page.category}</div>
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
                  <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{content.site.title}</div>
                    <div className="text-sm text-muted-foreground">{content.site.tagline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-2xl">Admin Access</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Admin Login</DialogTitle>
                        <DialogDescription>Demo authentication for content management preview.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <div className="space-y-2">
                          <Label>Username</Label>
                          <Input value={adminUser} onChange={(e) => setAdminUser(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Password</Label>
                          <Input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} />
                        </div>
                        <div className="rounded-2xl border border-dashed p-3 text-sm text-muted-foreground">
                          Demo credentials: <span className="font-medium">admin / demo123</span>
                        </div>
                        <Button className="w-full" onClick={() => { handleLogin(); setAdminOpen(false); }}>
                          Sign In
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
              {active === "home" && (
                <div className="space-y-10">
                  <section>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                      <Card className="overflow-hidden rounded-[28px] border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white shadow-2xl">
                        <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
                          <div className="space-y-6">
                            <Badge className="w-fit rounded-full bg-white/15 text-white hover:bg-white/15">Personal Homepage + Resource Portal</Badge>
                            <div className="space-y-3">
                              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{content.hero.headline}</h1>
                              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">{content.hero.summary}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100" onClick={() => setActive("resources")}>{content.hero.ctaPrimary}</Button>
                              <Button variant="outline" className="rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10" onClick={() => setActive("journey")}>{content.hero.ctaSecondary}</Button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                              {[
                                ["Resource Categories", String(content.resources.length)],
                                ["Linked Project Pages", String(content.projectPages.length)],
                                ["Editable Sections", "Site-wide"],
                              ].map(([label, value]) => (
                                <div key={label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                  <div className="text-2xl font-semibold">{value}</div>
                                  <div className="text-sm text-slate-300">{label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="relative">
                            <img src={content.hero.image} alt="Professional technology workspace" className="h-full min-h-[280px] w-full rounded-[24px] object-cover shadow-xl" />
                            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-slate-950/55 p-4 backdrop-blur">
                              <div className="text-sm font-medium">Professional Focus</div>
                              <div className="mt-1 text-sm text-slate-300">Enterprise systems, support operations, infrastructure, automation, and continuous growth.</div>
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
                          <p className="text-sm leading-7 text-muted-foreground">{content.story}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Knowledge Hub</Badge>
                            <Badge variant="secondary">Professional Profile</Badge>
                            <Badge variant="secondary">Curated Resources</Badge>
                            <Badge variant="secondary">Expandable Architecture</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </section>

                  <section className="space-y-5">
                    <SectionTitle eyebrow="Highlights" title="Explore Key Areas" description="Quick entry points into the main sections of the portal." />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {[
                        ["My IT Journey", "Background, experience, and professional perspective.", User, "journey"],
                        ["Resources", "Curated links, references, and study material.", BookOpen, "resources"],
                        ["Project Pages", "Previously built HTML pages that open in new tabs.", FolderKanban, "projects"],
                        ["Learning & Certifications", "Current areas of study and development.", Award, "certs"],
                        ["Contact", "Professional contact information and next steps.", Mail, "contact"],
                        ["Admin", "Editable content controls and management experience.", Settings, "admin"],
                      ].map(([title, description, Icon, target]) => (
                        <Card key={title} className="rounded-[24px] transition hover:-translate-y-1 hover:shadow-xl">
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
                    <SectionTitle eyebrow="Featured Resources" title="Curated Categories" description="Priority categories surfaced on the homepage for faster access." />
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                      {featuredResources.map((resource) => (
                        <Card key={resource.id} className="rounded-[24px]">
                          <CardContent className="space-y-4 p-6">
                            <div className="flex items-center justify-between">
                              <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                                <ResourceIcon name={resource.icon} />
                              </div>
                              <Star className="h-4 w-4 text-amber-500" />
                            </div>
                            <div>
                              <div className="font-semibold">{resource.name}</div>
                              <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                            <Button variant="outline" className="w-full rounded-2xl" onClick={() => setActive("resources")}>View Category</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-5">
                    <SectionTitle eyebrow="Related Pages" title="Existing HTML Pages from This Project" description="These linked pages are presented as professional modules and always open in separate browser tabs." />
                    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                      {content.projectPages.map((page) => (
                        <Card key={page.id} className="overflow-hidden rounded-[24px] transition hover:-translate-y-1 hover:shadow-xl">
                          <img src={page.thumbnail} alt={page.title} className="h-44 w-full object-cover" />
                          <CardContent className="space-y-4 p-6">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                                  <ResourceIcon name={page.icon} />
                                </div>
                                <div>
                                  <div className="font-semibold">{page.title}</div>
                                  <div className="text-xs text-muted-foreground">{page.category}</div>
                                </div>
                              </div>
                              {page.featured ? <Badge>Featured</Badge> : null}
                            </div>
                            <p className="text-sm text-muted-foreground">{page.description}</p>
                            <a href={page.href} target="_blank" rel="noopener noreferrer" className="block">
                              <Button className="w-full rounded-2xl">Open Page <ExternalLink className="ml-2 h-4 w-4" /></Button>
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {active === "journey" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Professional Profile" title={content.journey.title} description={content.journey.subtitle} />
                  <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <Card className="rounded-[28px]">
                      <CardContent className="space-y-6 p-8">
                        <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">{content.journey.body}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-[28px]">
                      <CardHeader>
                        <CardTitle>Core Themes</CardTitle>
                        <CardDescription>Editable from the admin dashboard.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {content.journey.highlights.map((item) => (
                          <div key={item} className="rounded-2xl border p-4 text-sm">{item}</div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {active === "resources" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Curated Resources" title="Resource Categories" description="Categories support internal pages, external links, descriptions, icons, and featured placement." />
                  <div className="grid gap-6 xl:grid-cols-2">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="rounded-[28px]">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                                <ResourceIcon name={resource.icon} />
                              </div>
                              <div>
                                <CardTitle>{resource.name}</CardTitle>
                                <CardDescription>{resource.description}</CardDescription>
                              </div>
                            </div>
                            {resource.featured ? <Badge>Featured</Badge> : null}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {resource.items.length ? (
                            resource.items.map((item) => (
                              <div key={item.title} className="flex items-start justify-between gap-4 rounded-2xl border p-4">
                                <div>
                                  <div className="font-medium">{item.title}</div>
                                  <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                                </div>
                                {item.type === "external" ? (
                                  <a href={item.href} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm">Open</Button></a>
                                ) : (
                                  <Button variant="outline" size="sm">View</Button>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">No items yet. Add links and content from the admin area.</div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {active === "projects" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Linked HTML Library" title="Project Pages" description="Previously created HTML pages are surfaced as managed cards and configured to open in new tabs." />
                  <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredProjects.map((page) => (
                      <Card key={page.id} className="overflow-hidden rounded-[24px]">
                        <img src={page.thumbnail} alt={page.title} className="h-48 w-full object-cover" />
                        <CardContent className="space-y-4 p-6">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                              <ResourceIcon name={page.icon} />
                            </div>
                            <div>
                              <div className="font-semibold">{page.title}</div>
                              <div className="text-xs text-muted-foreground">{page.category}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{page.description}</p>
                          <div className="flex items-center justify-between rounded-2xl border p-3 text-sm">
                            <span>Open behavior</span>
                            <Badge variant="secondary">{page.newTab ? "New Tab" : "Same Tab"}</Badge>
                          </div>
                          <a href={page.href} target={page.newTab ? "_blank" : "_self"} rel={page.newTab ? "noopener noreferrer" : undefined}>
                            <Button className="w-full rounded-2xl">Open Page <ExternalLink className="ml-2 h-4 w-4" /></Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {active === "certs" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Development" title="Learning & Certifications" description="An expandable section for certifications, training priorities, and learning milestones." />
                  <div className="grid gap-5 lg:grid-cols-3">
                    {content.certifications.map((item) => (
                      <Card key={item.title} className="rounded-[24px]">
                        <CardContent className="space-y-4 p-6">
                          <div className="flex items-center justify-between">
                            <Award className="h-5 w-5" />
                            <Badge>{item.status}</Badge>
                          </div>
                          <div>
                            <div className="font-semibold">{item.title}</div>
                            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {active === "contact" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Connect" title="Contact" description="A professional contact section suitable for portfolio and portal use." />
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                    <Card className="rounded-[28px]">
                      <CardContent className="space-y-4 p-8">
                        <div>
                          <div className="text-lg font-semibold">Professional Contact</div>
                          <p className="mt-2 text-sm text-muted-foreground">Use this area for email, LinkedIn, downloadable resume links, or a contact form integration later.</p>
                        </div>
                        <div className="rounded-2xl border p-4 text-sm">
                          <div className="font-medium">Email</div>
                          <div className="text-muted-foreground">{content.site.contactEmail}</div>
                        </div>
                        <div className="rounded-2xl border p-4 text-sm">
                          <div className="font-medium">LinkedIn</div>
                          <a href={content.site.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline underline-offset-4">Professional profile link</a>
                        </div>
                        <Button className="rounded-2xl">Download Resume</Button>
                      </CardContent>
                    </Card>
                    <Card className="rounded-[28px]">
                      <CardHeader>
                        <CardTitle>Recommended Extensions</CardTitle>
                        <CardDescription>Easy next additions for a production deployment.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="rounded-2xl border p-4">Contact form backed by serverless function or Supabase.</div>
                        <div className="rounded-2xl border p-4">Analytics via Plausible or Vercel Analytics.</div>
                        <div className="rounded-2xl border p-4">Protected admin authentication with NextAuth or Supabase Auth.</div>
                        <div className="rounded-2xl border p-4">Upload media to object storage and persist content to database.</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {active === "admin" && (
                <div className="space-y-6">
                  <SectionTitle eyebrow="Admin Panel" title="Content Management Dashboard" description="This preview demonstrates editable sections, linked project page control, and portal configuration." />

                  {!isAuthed ? (
                    <Card className="rounded-[28px]">
                      <CardContent className="space-y-4 p-8">
                        <div className="text-lg font-semibold">Admin authentication required</div>
                        <p className="text-sm text-muted-foreground">Use the Admin Access button in the header. Demo credentials: admin / demo123</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <Tabs defaultValue="hero" className="space-y-6">
                      <TabsList className="flex h-auto flex-wrap gap-2 rounded-2xl bg-transparent p-0">
                        <TabsTrigger value="hero" className="rounded-2xl border px-4 py-2">Homepage</TabsTrigger>
                        <TabsTrigger value="journey" className="rounded-2xl border px-4 py-2">Journey Page</TabsTrigger>
                        <TabsTrigger value="resources" className="rounded-2xl border px-4 py-2">Resources</TabsTrigger>
                        <TabsTrigger value="linked" className="rounded-2xl border px-4 py-2">Linked Pages</TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-2xl border px-4 py-2">Settings</TabsTrigger>
                      </TabsList>

                      <TabsContent value="hero">
                        <Card className="rounded-[28px]">
                          <CardHeader>
                            <CardTitle>Edit Homepage</CardTitle>
                            <CardDescription>Update hero content and motivation story.</CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Headline</Label>
                                <Input value={content.hero.headline} onChange={(e) => updateHero("headline", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Summary</Label>
                                <Textarea value={content.hero.summary} onChange={(e) => updateHero("summary", e.target.value)} rows={5} />
                              </div>
                              <div className="space-y-2">
                                <Label>Hero Image URL</Label>
                                <Input value={content.hero.image} onChange={(e) => updateHero("image", e.target.value)} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Motivation Story</Label>
                              <Textarea value={content.story} onChange={(e) => updateStory(e.target.value)} rows={12} />
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="journey">
                        <Card className="rounded-[28px]">
                          <CardHeader>
                            <CardTitle>Edit My IT Journey</CardTitle>
                            <CardDescription>Manage the biography page content.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label>Page Title</Label>
                              <Input value={content.journey.title} onChange={(e) => updateJourney("title", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>Subtitle</Label>
                              <Input value={content.journey.subtitle} onChange={(e) => updateJourney("subtitle", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>Body</Label>
                              <Textarea value={content.journey.body} onChange={(e) => updateJourney("body", e.target.value)} rows={10} />
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="resources">
                        <Card className="rounded-[28px]">
                          <CardHeader>
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <CardTitle>Manage Resource Categories</CardTitle>
                                <CardDescription>Add, organize, and extend categories.</CardDescription>
                              </div>
                              <Button onClick={addResourceCategory}><Plus className="mr-2 h-4 w-4" />Add Category</Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {content.resources.map((resource) => (
                              <div key={resource.id} className="grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_1fr_auto]">
                                <Input value={resource.name} onChange={(e) => setContent((prev) => ({ ...prev, resources: prev.resources.map((r) => r.id === resource.id ? { ...r, name: e.target.value } : r) }))} />
                                <Input value={resource.description} onChange={(e) => setContent((prev) => ({ ...prev, resources: prev.resources.map((r) => r.id === resource.id ? { ...r, description: e.target.value } : r) }))} />
                                <div className="flex items-center gap-3">
                                  <Label className="text-sm">Featured</Label>
                                  <Switch checked={resource.featured} onCheckedChange={(checked) => setContent((prev) => ({ ...prev, resources: prev.resources.map((r) => r.id === resource.id ? { ...r, featured: checked } : r) }))} />
                                </div>
                              </div>
                            ))}
                            <Button variant="outline"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="linked">
                        <Card className="rounded-[28px]">
                          <CardHeader>
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <CardTitle>Manage Linked HTML Pages</CardTitle>
                                <CardDescription>These links are configured to open project pages in new tabs.</CardDescription>
                              </div>
                              <Button onClick={addProjectPage}><Plus className="mr-2 h-4 w-4" />Add Linked Page</Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {content.projectPages.map((page) => (
                              <div key={page.id} className="space-y-4 rounded-2xl border p-4">
                                <div className="grid gap-4 lg:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={page.title} onChange={(e) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, title: e.target.value } : p) }))} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input value={page.category} onChange={(e) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, category: e.target.value } : p) }))} />
                                  </div>
                                  <div className="space-y-2 lg:col-span-2">
                                    <Label>Description</Label>
                                    <Textarea value={page.description} onChange={(e) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, description: e.target.value } : p) }))} rows={3} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Destination URL / Path</Label>
                                    <Input value={page.href} onChange={(e) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, href: e.target.value } : p) }))} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Thumbnail URL</Label>
                                    <Input value={page.thumbnail} onChange={(e) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, thumbnail: e.target.value } : p) }))} />
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-6">
                                  <div className="flex items-center gap-3">
                                    <Label>Open in new tab</Label>
                                    <Switch checked={page.newTab} onCheckedChange={(checked) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, newTab: checked } : p) }))} />
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Label>Featured</Label>
                                    <Switch checked={page.featured} onCheckedChange={(checked) => setContent((prev) => ({ ...prev, projectPages: prev.projectPages.map((p) => p.id === page.id ? { ...p, featured: checked } : p) }))} />
                                  </div>
                                  <Button variant="outline"><Eye className="mr-2 h-4 w-4" />Preview Link</Button>
                                  <Button variant="destructive" onClick={() => removeProjectPage(page.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="settings">
                        <Card className="rounded-[28px]">
                          <CardHeader>
                            <CardTitle>Portal Settings</CardTitle>
                            <CardDescription>Branding, contact info, and visual preferences.</CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Site Title</Label>
                              <Input value={content.site.title} onChange={(e) => setContent((prev) => ({ ...prev, site: { ...prev.site, title: e.target.value } }))} />
                            </div>
                            <div className="space-y-2">
                              <Label>Tagline</Label>
                              <Input value={content.site.tagline} onChange={(e) => setContent((prev) => ({ ...prev, site: { ...prev.site, tagline: e.target.value } }))} />
                            </div>
                            <div className="space-y-2">
                              <Label>Contact Email</Label>
                              <Input value={content.site.contactEmail} onChange={(e) => setContent((prev) => ({ ...prev, site: { ...prev.site, contactEmail: e.target.value } }))} />
                            </div>
                            <div className="space-y-2">
                              <Label>LinkedIn URL</Label>
                              <Input value={content.site.linkedIn} onChange={(e) => setContent((prev) => ({ ...prev, site: { ...prev.site, linkedIn: e.target.value } }))} />
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border p-4">
                              <Label>Dark mode default</Label>
                              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border p-4">
                              <ImageIcon className="h-4 w-4" />
                              <div className="text-sm text-muted-foreground">Media upload would connect to storage in production.</div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>

        {toast ? (
          <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-2xl dark:bg-sky-600">
            {toast}
          </div>
        ) : null}
      </div>
    </div>
  );
}
