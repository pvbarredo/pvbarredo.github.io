import React, { useEffect, useState } from 'react'
import profilePhoto from './assets/profile.jpg'
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Copy,
  Check,
  Server,
  LayoutGrid,
  BrainCircuit,
  Database,
  Briefcase,
  GraduationCap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Profile data — edit the values below to update site content.
// ---------------------------------------------------------------------------
const PROFILE = {
  name: 'Peter Barredo',
  badge: '{ Pobreng Programmer }',
  roles: ['Computer Engineer', 'Senior Full-Stack Software Engineer', 'Technical Assistant Manager', 'AI Engineering Lead'],
  title: 'Technical Assistant Manager / Full-Stack & AI Engineering Lead',
  tagline:
    "I design and build the systems behind the work — leading teams while shipping full-stack applications and AI-driven automation that scale.",
  github: 'https://github.com/pvbarredo',
  linkedin: 'https://ph.linkedin.com/in/peter-barredo',
  email: 'pvbarredo@gmail.com',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`, // place your PDF at /public/resume.pdf
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

// TODO: Update dates/details here as your role continues to evolve.
const EXPERIENCE = [
  {
    period: 'March 2015 — Present',
    role: 'Technical Assistant Manager / Full-Stack & AI Engineering Lead',
    company: 'Orient Overseas Container Lines (OOCL)',
    summary:
      "One of the world's largest integrated international container transportation, logistics, and terminal companies. Grew from Software Engineer into a technical leadership role, including overseas training and project assignments.",
    points: [
      'Pioneered "Mode 2" delivery — full-stack projects built with modern tech (React, Spring Boot) — for the Philippines team.',
      "Supported the Booking & Shipment module, the core module of the company's enterprise platform, serving a large active user base.",
      'Built and maintained an internal employee recognition platform (Spring Boot + React) used company-wide.',
      'Spearheading AI adoption for the department, including a 6-week AI knowledge-building program (2025).',
      'Pioneered an internal Tech Community and served as an ITA Bootcamp mentor — with overseas assignments in Hong Kong, Zhuhai (China), and the California, USA branch for training and project work.',
    ],
  },
  {
    period: 'June 2014 — January 2015',
    role: 'Tech Support & System Developer (Intern)',
    company: 'SM Prime Holdings, Inc.',
    summary: "Parent company of the SM Group's shopping malls in the Philippines.",
    points: [
      'Started in technical support before transitioning into systems development.',
      'Developed web applications in PHP for internal systems.',
    ],
  },
]

// TODO: Update with any further education/certifications.
const EDUCATION = [
  {
    school: 'Asia Pacific College',
    degree: 'Bachelor of Science in Computer Engineering',
    period: 'May 2015',
    notes: "Dean's Lister (2011) · SM Foundation Scholar — Full Scholarship",
  },
  {
    school: 'Paranaque National Highschool (DOST)',
    degree: 'Science Highschool',
    period: '2010',
    notes: null,
  },
]

const SKILL_GROUPS = [
  {
    key: 'backend',
    label: 'Backend & Architecture',
    icon: Server,
    items: ['Java', 'Spring Boot', 'Python', 'REST APIs', 'Microservices'],
  },
  {
    key: 'frontend',
    label: 'Frontend & UI',
    icon: LayoutGrid,
    items: ['React JS', 'JavaScript', 'Tailwind CSS', 'HTML5/CSS3'],
  },
  {
    key: 'ai',
    label: 'AI & Agentic Systems',
    icon: BrainCircuit,
    items: ['LLMs', 'MCP Framework', 'Ollama', 'OpenClaw', 'Prompt Engineering'],
  },
  {
    key: 'infra',
    label: 'Databases, DevOps & Tools',
    icon: Database,
    items: ['MySQL', 'Oracle DB', 'Docker', 'Linux', 'Git', 'CI/CD'],
  },
]

const PROJECTS = [
  {
    title: 'Weather Agent',
    description:
      'An AI-powered weather assistant built with Google ADK (Agent Development Kit), using the Model Context Protocol (MCP) to connect a conversational Gemini agent to a custom weather data server. Deployed as a single container on Cloud Run.',
    tags: ['Python', 'Google ADK', 'MCP', 'Gemini', 'Cloud Run'],
    github: 'https://github.com/pvbarredo/weather_agent',
    demo: null,
  },
  {
    title: 'Website Generator',
    description:
      'A Claude API-powered tool that generates full websites from a text prompt — split-view UI with live Server-Sent Events progress streaming, an in-app iframe preview, and generation history.',
    tags: ['Node.js', 'Express', 'Claude API', 'SSE'],
    github: null,
    codeNote: 'Private repo',
    demo: null,
  },
  {
    title: 'JavaFX-AutoUpdater',
    description:
      'An open-source JavaFX library that auto-updates Java desktop applications without needing FXLauncher — complete with CI (Travis), code coverage, and contribution guidelines.',
    tags: ['Java', 'JavaFX', 'CI/CD', 'Open Source'],
    github: 'https://github.com/pvbarredo/JavaFX-AutoUpdater',
    demo: null,
  },
  {
    title: 'PaaS — Payroll-as-a-Service',
    description:
      "Pentacode Inc.'s first product: a cost-effective HRIS + payroll solution built to cut HR manpower overhead. Node.js backend, MongoDB, Docker, with 440+ commits and 28 releases shipped over the product's lifetime.",
    tags: ['Node.js', 'MongoDB', 'Docker', 'HRIS', 'SaaS'],
    github: 'https://gitlab.com/pentacode/paas',
    demo: null,
  },
  {
    title: 'Stikwel',
    description:
      'A platform built from scratch (2021) for hosting photos, videos, and video tutorials — React + Redux on a Firebase backend, in active development for 4+ years with 499 commits across 70 releases.',
    tags: ['React', 'Redux', 'Firebase'],
    github: null,
    codeNote: 'Code available on request',
    demo: null,
  },
  {
    title: 'HRIS Platform',
    description:
      'A full-stack Human Resource Information System built for a client — Flutter mobile app, NestJS backend, React frontend, and end-to-end test coverage with Nightwatch.js.',
    tags: ['Flutter', 'NestJS', 'React', 'E2E Testing'],
    github: null,
    codeNote: 'Client project',
    demo: null,
  },
  {
    title: 'Bolero Detector',
    description:
      'A computer vision tool that detects the basketball ring in video frames, tracks it across the timeline, and determines when the ball passes through the ring to automatically detect scoring events — with an Electron desktop front-end.',
    tags: ['Python', 'Computer Vision', 'Electron'],
    github: 'https://gitlab.com/bolero-detector/python-bolero-detector',
    demo: null,
  },
]

// ---------------------------------------------------------------------------
// Theme hook
// ---------------------------------------------------------------------------
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore storage errors (e.g. private browsing) */
    }
  }, [theme])

  return [theme, setTheme]
}

// ---------------------------------------------------------------------------
// Reusable bits
// ---------------------------------------------------------------------------
function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

function GlowCard({ children, className = '' }) {
  return (
    <div
      className={`group relative rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-400/40 ${className}`}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  const [theme, setTheme] = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState(SKILL_GROUPS[0].key)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — ignore silently */
    }
  }

  const activeGroup = SKILL_GROUPS.find((g) => g.key === activeSkill) ?? SKILL_GROUPS[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/10" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-lg transition-colors dark:border-slate-800/80 dark:bg-slate-950/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
            PETER<span className="text-cyan-500">.</span>BARREDO
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="rounded-full border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300 md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-200/70 bg-white/95 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section className="flex min-h-[85vh] flex-col-reverse items-center justify-center gap-12 py-20 text-center lg:flex-row lg:justify-between lg:gap-16 lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <p className="mb-4 animate-fadeUp font-serif text-lg italic text-cyan-600 dark:text-cyan-300">
              {PROFILE.badge}
            </p>
            <h1 className="animate-fadeUp text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              I'm {PROFILE.name}
            </h1>
            <p
              className="mt-5 flex max-w-2xl animate-fadeUp flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-base lg:justify-start"
              style={{ animationDelay: '0.1s' }}
            >
              {PROFILE.roles.map((role, idx) => (
                <React.Fragment key={role}>
                  {idx > 0 && <span className="text-cyan-500">•</span>}
                  <span>{role}</span>
                </React.Fragment>
              ))}
            </p>
            <p
              className="mt-6 max-w-2xl animate-fadeUp text-base text-slate-600 dark:text-slate-400"
              style={{ animationDelay: '0.2s' }}
            >
              {PROFILE.tagline}
            </p>

            <div
              className="mt-8 flex animate-fadeUp flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: '0.3s' }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400"
              >
                Explore Work <ArrowRight size={16} />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
              >
                Download Resume <Download size={16} />
              </a>
            </div>

            <div
              className="mt-10 flex animate-fadeUp items-center justify-center gap-5 lg:justify-start"
              style={{ animationDelay: '0.4s' }}
            >
              <IconLink href={PROFILE.github} label="GitHub">
                <Github size={20} />
              </IconLink>
              <IconLink href={PROFILE.linkedin} label="LinkedIn">
                <Linkedin size={20} />
              </IconLink>
              <IconLink href={`mailto:${PROFILE.email}`} label="Email">
                <Mail size={20} />
              </IconLink>
            </div>
          </div>

          <div className="relative flex-shrink-0 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -inset-3 rounded-[2rem] bg-cyan-400/25 blur-2xl dark:bg-cyan-400/30" />
            <img
              src={profilePhoto}
              alt={PROFILE.name}
              className="relative h-48 w-48 rounded-[2rem] border-2 border-white/80 object-cover shadow-xl shadow-cyan-500/20 sm:h-60 sm:w-60 dark:border-slate-800"
            />
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-20">
          <SectionHeading eyebrow="About Me" title="Engineering leadership, built on deep technical roots" />
          <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">Tech-savvy engineer</span> who is
            always hungry to learn new programming tools and techniques, and well-versed in all phases of
            the software development lifecycle — with a strong working knowledge of algorithms and data
            structures. Currently {PROFILE.title}.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <GlowCard>
              <Briefcase className="mb-4 text-cyan-500" size={28} />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Leadership</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Grew from individual contributor into a Technical Assistant Manager, leading teams while
                staying hands-on with architecture and code.
              </p>
            </GlowCard>
            <GlowCard>
              <Server className="mb-4 text-cyan-500" size={28} />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Full-Stack Depth</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Comfortable across the stack — Java and Spring Boot services, React interfaces, and the
                databases and infrastructure that tie them together.
              </p>
            </GlowCard>
            <GlowCard>
              <BrainCircuit className="mb-4 text-cyan-500" size={28} />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">AI Engineering</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Recently focused on agentic systems — building automation with MCP, local LLMs via Ollama,
                and OpenClaw to streamline real engineering work.
              </p>
            </GlowCard>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-24 py-20">
          <SectionHeading eyebrow="Career Path" title="Experience & Education" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-slate-300 to-transparent dark:via-slate-700 sm:left-1/2" />
            <div className="space-y-10">
              {EXPERIENCE.map((item, idx) => (
                <div
                  key={item.role}
                  className={`relative flex flex-col gap-4 sm:flex-row ${
                    idx % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <div className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-slate-50 dark:bg-slate-950 sm:left-1/2" />
                  <div className="w-full pl-10 sm:w-1/2 sm:pl-0" />
                  <div className={`w-full pl-10 sm:w-1/2 ${idx % 2 === 1 ? 'sm:pl-0 sm:pr-10' : 'sm:pl-10'}`}>
                    <GlowCard>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                        {item.period}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.company}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.summary}</p>
                      <ul className="mt-3 space-y-1.5 text-left text-sm text-slate-600 dark:text-slate-400">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              <GraduationCap size={16} className="text-cyan-500" /> Education
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {EDUCATION.map((edu) => (
                <GlowCard key={edu.school}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">{edu.period}</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{edu.school}</h4>
                  <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">{edu.degree}</p>
                  {edu.notes && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{edu.notes}</p>
                  )}
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 py-20">
          <SectionHeading eyebrow="Tech Stack" title="Capabilities & Tools" />

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon
              const isActive = group.key === activeSkill
              return (
                <button
                  key={group.key}
                  onClick={() => setActiveSkill(group.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-600 shadow-sm shadow-cyan-500/20 dark:text-cyan-300'
                      : 'border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-cyan-400'
                  }`}
                >
                  <Icon size={16} />
                  {group.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {activeGroup.items.map((item) => (
              <span
                key={item}
                className="animate-fadeUp rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 py-20">
          <SectionHeading eyebrow="Featured Work" title="Projects" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <GlowCard key={project.title} className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 border-t border-slate-200/70 pt-4 dark:border-slate-800">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                    >
                      <Github size={15} /> Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 dark:text-slate-600">
                      <Github size={15} /> {project.codeNote || 'Code unavailable'}
                    </span>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-20">
          <SectionHeading eyebrow="Get In Touch" title="Let's build something" />
          <div className="mx-auto max-w-xl">
            <GlowCard className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Open to conversations about engineering leadership, full-stack projects, and AI
                automation. Reach out anytime.
              </p>

              <button
                onClick={handleCopyEmail}
                className="mt-6 inline-flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-cyan-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-500" />
                  {PROFILE.email}
                </span>
                {copied ? (
                  <Check size={16} className="text-emerald-500" />
                ) : (
                  <Copy size={16} className="text-slate-400" />
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-4">
                <IconLink href={PROFILE.github} label="GitHub">
                  <Github size={20} />
                </IconLink>
                <IconLink href={PROFILE.linkedin} label="LinkedIn">
                  <Linkedin size={20} />
                </IconLink>
              </div>
            </GlowCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/70 py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind CSS.
      </footer>
    </div>
  )
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={label}
      className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
    >
      {children}
    </a>
  )
}
