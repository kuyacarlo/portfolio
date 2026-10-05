/** Shared portfolio content — keep site + resume + profile README in sync. */

export const TAGLINE = "Iterate fast, think deep, ship meaning.";
export const REPO_COUNT = 69;
export const HOMELAB_SERVICE_COUNT = 12;
export const NOW_UPDATED = "2026-10";

export type ProjectType = "Solo" | "Team" | "Lead";

export type Project = {
  name: string;
  emoji: string;
  category: string;
  desc: string;
  tech: string[];
  url: string | null;
  live: string | null;
  demo: string | null;
  writeup: string | null;
  img: string | null;
  screenshots: string[];
  private: boolean;
  type?: ProjectType;
  role?: string;
  team?: string;
  award?: string;
  architecture?: string;
};

/** Featured homepage order: ComplyAIgent → Git Profile → WorkSight → Kasigla → awesome-freestack → BetterBulakan */
export const projects: Project[] = [
  {
    name: "ComplyAIgent (FerretOPS)",
    emoji: "⚖️",
    category: "AMD Hackathon 2026",
    desc: "Agentic DevSecOps compliance engine compiling regulatory text into fail-closed pre-push git guardrails.",
    tech: ["Go", "LangGraph", "FastAPI", "Next.js", "Gitleaks"],
    url: "https://github.com/liitkud/complyaigent",
    live: "https://ferretops.kuyacarlo.workers.dev/",
    demo: null,
    writeup: null,
    img: "/screenshots/ferretops.png",
    screenshots: [],
    private: false,
    type: "Team",
    role: "Backend + Agent Eng",
    team: "Hackathon team",
    award: "AMD Hackathon 2026",
    architecture: "Regulatory text → Go CLI gate + LangGraph HIL → FastAPI",
  },
  {
    name: "git-profile & ssh-profile",
    emoji: "🔑",
    category: "Developer Tooling",
    desc: "Production Go CLI suite for seamlessly switching multiple Git identities, GPG signing keys, and scoped SSH URLs per repository.",
    tech: ["Go", "Git", "SSH", "Linux CLI"],
    url: "https://github.com/kuyacarlo/git-profile",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
    role: "Author",
    architecture: "Lightweight Go binary manipulating git config and SSH host aliases",
  },
  {
    name: "WorkSight",
    emoji: "📊",
    category: "BPI DataWave 2025",
    desc: "Agentic engine turning fragmented enterprise metadata into predictive burnout and productivity insights. Top 3 out of 100+ teams.",
    tech: ["Python", "LangGraph", "Next.js", "Analytics"],
    url: "https://github.com/4sightorg/worksight",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Team",
    role: "Builder",
    team: "Hackathon team",
    award: "Top 3 Finalist",
    architecture: "Enterprise metadata pipeline → LangGraph reasoning → Predictive dashboard",
  },
  {
    name: "Kasigla (PhasmaFrame)",
    emoji: "🩺",
    category: "Health Telemetry",
    desc: "Offline-first hypertension follow-up MVP for community healthcare, enabling patient-to-BHW protocol-buffered record handoffs.",
    tech: ["Astro", "React", "Hono", "SQLite", "Protocol Buffers"],
    url: "https://github.com/Phasmanastasis/PhasmaFrame",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Team",
    role: "Architecture & Backend",
    architecture: "Offline patient capture → Protobuf device handoff → BHW SQLite review",
  },
  {
    name: "awesome-freestack",
    emoji: "🎒",
    category: "Community",
    desc: "Curated free developer tools and student/startup unlocks — with limits, eligibility criteria, and commercial terms.",
    tech: ["TypeScript", "Markdown", "Cloudflare Workers"],
    url: "https://github.com/kuyacarlo/awesome-freestack",
    live: "https://freestack.kuyacarlo.dev",
    demo: null,
    writeup: null,
    img: "/screenshots/awesome-freestack.png",
    screenshots: [],
    private: false,
    type: "Solo",
    role: "Creator & Maintainer",
  },
  {
    name: "BetterBulakan",
    emoji: "🏛️",
    category: "Civic Tech",
    desc: "Community-powered digital public utility portal and transparency hub for the Municipality of Bulakan, Bulacan.",
    tech: ["TypeScript", "Next.js", "Civic Tech"],
    url: "https://github.com/kuyacarlo/betterbulakan",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
    role: "Maintainer",
  },
  {
    name: "room-tba",
    emoji: "🏫",
    category: "Civic Tooling",
    desc: "Automated schedule, room-finding, and vacancy tracker for BulSU students under the BulSUTools initiative.",
    tech: ["Svelte", "TypeScript", "OpenStreetMap"],
    url: "https://github.com/kuyacarlo/room-tba",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
  },
  {
    name: "v4l2loopback-fedora",
    emoji: "📹",
    category: "Linux Packaging",
    desc: "Fedora package scripts and DKMS module automation for Video4Linux loopback virtual camera devices (OBS).",
    tech: ["DKMS", "Bash", "GitHub Actions"],
    url: "https://github.com/kuyacarlo/v4l2loopback-fedora",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
  },
  {
    name: "nutrition-api",
    emoji: "🥗",
    category: "Microservice API",
    desc: "High-throughput FastAPI service serving structured nutritional datasets with containerized SQLite.",
    tech: ["FastAPI", "Docker", "SQLite"],
    url: "https://github.com/kuyacarlo/nutrition-api",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
  },
];

export const PROOF_OF_WORK_URL = "/resume";

export const hackathons = [
  {
    place: "Top 3 Finalist",
    name: "BPI DataWave 2025",
    proj: "WorkSight",
    desc: "Architected an agentic engine that transforms fragmented enterprise metadata into predictive burnout insights. Top 3 out of 100+ teams.",
    podium: true,
    url: "https://github.com/4sightorg/worksight",
  },
  {
    place: "First Runner Up",
    name: "LPU Innoverse 2025",
    proj: "BetterTranspo",
    desc: "Crafted a decentralized platform for BEEP™ and Card payments with LoRaWAN — real-time transport routes, fare estimation, and a fullness meter for passengers.",
    podium: true,
    url: null,
  },
  {
    place: "Participant",
    name: "AMD Developer Hackathon 2026",
    proj: "ComplyAIgent (FerretOPS)",
    desc: "Agentic DevSecOps engine that compiles regulatory text into fail-closed pre-push guardrails — a Go CLI pairing Gitleaks with entropy scoring, and LangGraph human-in-the-loop routing.",
    podium: false,
    url: "https://github.com/liitkud/complyaigent",
  },
  {
    place: "Participant",
    name: "PJDSC 2025 · UP Data Science Society & Eskwelabs",
    proj: "KLIMA",
    desc: "Designed a Bronze→Silver→Gold ETL pipeline transforming raw environmental data into localized LGU disaster risk alerts; engineered API interconnectivity and containerized ML inference microservices, piloted in Calumpit, Bulacan.",
    podium: false,
    url: "https://github.com/Signal-No-5/klima",
  },
  {
    place: "Participant",
    name: "MLH Notion MCP Challenge 2026",
    proj: "SAGE",
    desc: "Autonomous academic co-pilot using Model Context Protocol (MCP) to ingest CHED-verified university curricula and scaffold tailored semester workspaces in Notion.",
    podium: false,
    url: "https://github.com/kuyacarlo/sage-mcp",
  },
  {
    place: "Participant",
    name: "Auth0 for AI Agents 2026",
    proj: "Bantay",
    desc: "Two-layer pre-push git security hook pairing local secret scanning with asynchronous Auth0 CIBA push notifications for smartphone approvals.",
    podium: false,
    url: "https://github.com/kuyacarlo/bantay",
  },
  {
    place: "Participant",
    name: "UPLB · The Innovation Lab & UP Data Science Society",
    proj: "SARAI-SABI",
    desc: "Designed and built a multi-platform tracker for Market Prices, Land Ownership, and Pest Prevention for farmers and cooperatives.",
    podium: false,
    url: null,
  },
  {
    place: "Participant",
    name: "Healthcare Telemetry Hackathon 2026",
    proj: "Kasigla (PhasmaFrame)",
    desc: "Offline-first hypertension follow-up platform enabling patients to record blood pressure readings offline and execute protocol-buffered device-to-device handoffs to BHWs.",
    podium: false,
    url: "https://github.com/Phasmanastasis/PhasmaFrame",
  },
];

export const experience = [
  {
    org: "Seekers Guild",
    roles: [
      {
        title: "Chief Technology Officer (CTO)",
        dates: "May 2025 — present",
        bullets: [
          "Direct organizational technical infrastructure, centralized authentication architecture, and developer mentorship pipelines impacting active student builder communities.",
          "Standardize organization-wide developer tooling, CI/CD quality gates, and git profile security conventions.",
        ],
      },
    ],
  },
  {
    org: "Millia Labs Pte. Ltd.",
    roles: [
      {
        title: "Junior Developer (Independent Contractor)",
        dates: "Jul 2026 — Sep 2026",
        bullets: [
          "Engineered and maintained backend microservices and LangGraph agent orchestration workflows in Python/FastAPI against PostgreSQL.",
          "Developed mobile and web features across Flutter and React/TypeScript applications for operational scheduling and real-time messaging.",
          "Improved developer tooling and CI throughput by standing up self-hosted runner infrastructure and strict type-check/linting gates.",
          "Sustained high merge throughput with code review rigor, branch hygiene, and test-suite isolation.",
        ],
      },
    ],
  },
  {
    org: "Mercatan",
    roles: [
      {
        title: "Developer Intern",
        dates: "May 2021 — May 2021",
        bullets: [
          "Customized WordPress layouts and optimized frontend asset delivery for improved web performance.",
        ],
      },
    ],
  },
  {
    org: "Computer Science Society BulSU",
    roles: [
      {
        title: "Cybersecurity Associate",
        dates: "2026 — present",
        bullets: [
          "Support society security education and workshops for CompE / CS peers.",
        ],
      },
      {
        title: "External Officer",
        dates: "2025",
        bullets: [],
      },
    ],
  },
  {
    org: "BulSU Microsoft Student Community",
    roles: [
      {
        title: "Creatives Officer",
        dates: "2024",
        bullets: [
          "Led design and media output for community events and campaigns.",
        ],
      },
      {
        title: "Member",
        dates: "2025 — present",
        bullets: [],
      },
    ],
  },
  {
    org: "Google Cloud & NVIDIA Communities",
    roles: [
      {
        title: "Google Cloud Innovator & Community Member · NVIDIA Developer Community Member",
        dates: "2025 — present",
        bullets: [],
      },
    ],
  },
];

export const talks = [
  { title: "Git & GitHub Fundamentals", org: "Computer Science Society BulSU" },
  { title: "Web Development Basics (HTML & CSS)", org: "Seekers Guild" },
];

export const aboutBlurb = [
  "I'm Karlo (John Carlo Santos) — a Software & Systems Engineer and CTO of Seekers Guild. BS Computer Engineering at Bulacan State University ('28).",
  "My work bridges low-level infrastructure (Linux hardening, rootless Podman Quadlets, Go CLI tools) with autonomous agentic AI pipelines (LangGraph, FastMCP, Model Context Protocol).",
  "Actively open to full-time engineering, data, and DevOps roles, contract work, and hackathon teams.",
];

export const certifications = [
  { name: "Azure Data Fundamentals", issuer: "Microsoft", date: "May 2025" },
  { name: "Azure AI Services Workshop", issuer: "Microsoft", date: "May 2025" },
  { name: "Intro to Cybersecurity", issuer: "Cisco NetAcad", date: "2025" },
  { name: "Cybersecurity Simulation", issuer: "Mastercard (Forage)", date: "Apr 2025" },
  { name: "Google Cloud Developer Program — BigLake Qwik Start Lab", issuer: "Cloud Skills Boost", date: "2025" },
];

/** Resume featured projects — from CV "Projects" section. */
export const resumeWork: {
  name: string;
  category: string;
  desc: string;
  meta?: string;
}[] = [
  {
    name: "git-profile & ssh-profile",
    category: "Go · Linux CLI · Git",
    desc: "CLI suite for seamlessly switching multiple Git identities, GPG signing keys, and scoped SSH URLs per repository.",
    meta: "Solo",
  },
  {
    name: "ComplyAIgent (FerretOPS)",
    category: "Go · LangGraph · FastAPI · Next.js",
    desc: "Agentic DevSecOps engine that compiles regulatory text into fail-closed pre-push guardrails.",
    meta: "AMD Hackathon",
  },
  {
    name: "Kasigla (PhasmaFrame)",
    category: "Astro · React · Hono · SQLite · Protobuf",
    desc: "Offline-first hypertension follow-up platform for community healthcare with BHW handoffs.",
    meta: "Hackathon",
  },
  {
    name: "room-tba",
    category: "Svelte · TypeScript · Web",
    desc: "Automated campus schedule and room vacancy finder for BulSU students under BulSUTools.",
    meta: "Solo",
  },
  {
    name: "BetterBulakan",
    category: "TypeScript · Next.js · Civic Tech",
    desc: "Municipal public utility portal and transparency hub for Bulakan, Bulacan.",
    meta: "Civic Tech",
  },
  {
    name: "awesome-freestack",
    category: "TypeScript · Markdown",
    desc: "Curated free tools and student/startup unlocks, with limits and commercial notes.",
    meta: "Maintainer",
  },
  {
    name: "v4l2loopback-fedora",
    category: "DKMS · GitHub Actions · Shell",
    desc: "Fedora package for Video4Linux loopback (OBS Virtual Camera).",
    meta: "Solo",
  },
  {
    name: "nutrition-api",
    category: "FastAPI · Docker · SQLite",
    desc: "Nutrition facts API for downstream devices.",
    meta: "Solo",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Dart", "Go", "SQL", "Bash", "C"],
  },
  {
    label: "Data Engineering",
    items: ["DuckDB", "PostgreSQL", "SQLite", "Pandas/NumPy", "ETL (Bronze-Silver-Gold)", "Web Scraping"],
  },
  {
    label: "Backend & AI",
    items: ["FastAPI", "LangGraph", "Agentic AI", "MCP", "FastMCP", "pytest", "WebSocket"],
  },
  {
    label: "Infra & DevOps",
    items: ["Podman (Rootless/Quadlets)", "Docker", "GitHub/Forgejo Actions", "Ansible", "Linux Hardening", "GPG"],
  },
  {
    label: "Cloud Architecture",
    items: ["GCP (Cloud Run, GCE)", "AWS (Lambda, S3)", "Supabase", "Cloudflare Workers/Pages"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React", "Next.js (App Router)", "TailwindCSS", "Flutter"],
  },
];

export const nowItems = [
  {
    key: "building",
    label: "building",
    text: "Developer tooling, agent harnesses & open-source projects",
    href: "/notes",
  },
  {
    key: "learning",
    label: "learning",
    text: "Low-level systems & edge telemetry",
    href: null,
  },
  {
    key: "exploring",
    label: "exploring",
    text: "Autonomous agent harnesses + MCP tooling",
    href: null,
  },
];

/** Drop 4–6 images in public/proof/ then set `enabled: true` and fill `photos`. */
export const socialProof = {
  enabled: false,
  photos: [] as { src: string; caption: string }[],
};

export const counts = {
  featured: projects.length,
  repos: REPO_COUNT,
  comps: hackathons.length,
  podiums: hackathons.filter((h) => h.podium).length,
  services: HOMELAB_SERVICE_COUNT,
  certs: certifications.length,
};

/** Homelab catalog — shared by /homelab and the `~` CLI's `homelab` command. */
export type HomelabService = { name: string; desc: string; url: string | null };

export const homelabServices: HomelabService[] = [
  { name: "Forgejo", desc: "Self-hosted Git on port 2222. Mirrors to GitHub.", url: "https://forge.kuyacarlo.dev" },
  { name: "Authentik", desc: "Identity provider — SSO for all services.", url: null },
  { name: "Vaultwarden", desc: "Bitwarden-compatible password server.", url: "https://vault.kuyacarlo.dev" },
  { name: "Traefik", desc: "Reverse proxy + auto TLS via Let's Encrypt.", url: null },
  { name: "Portainer", desc: "Container management UI.", url: null },
  { name: "Grafana", desc: "Monitoring dashboard — Prometheus + Loki.", url: null },
  { name: "Prometheus", desc: "Metrics scraping from all containers.", url: null },
  { name: "Loki", desc: "Log aggregation. Tailed by Promtail.", url: null },
  { name: "n8n", desc: "Workflow automation — webhooks, notifications.", url: null },
  { name: "Uptime Kuma", desc: "Public status page for hosted services.", url: "https://status.kuyacarlo.dev" },
  { name: "Forgejo CI", desc: "Self-hosted CI runner. Mostly linting + tests.", url: null },
  { name: "Netbird", desc: "Mesh VPN — connect lab hosts from anywhere.", url: null },
];

export const homelabHardware: [string, string][] = [
  ["Machine", "ThinkCentre M710q-N000"],
  ["Storage", "512 GB SSD OS · 2 TB HDD data (1×1 TB + 2×500 GB)"],
  ["OS", "Fedora Server"],
  ["VPN", "Netbird"],
];

export const homelabStack: [string, string][] = [
  ["Container runtime", "Podman (rootless)"],
  ["Secrets", "Vaultwarden + env files"],
  ["DNS", "Pi-hole for ad blocking"],
  ["Monitoring", "Grafana + Prometheus + Loki + Uptime Kuma"],
  ["CI/CD", "Forgejo Actions"],
  ["Auth", "Authentik SSO — OAuth2 proxy in front of services"],
];
