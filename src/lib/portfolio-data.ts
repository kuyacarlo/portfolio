/** Shared portfolio content — keep site + resume + profile README in sync. */

export const TAGLINE = "Iterate fast, think deep, ship meaning.";
export const REPO_COUNT = 37;
export const HOMELAB_SERVICE_COUNT = 12;
export const NOW_UPDATED = "2026-08";

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

/** Featured homepage order: ComplyAIgent → WorkSight → awesome-freestack → nutrition-api → pub-routes → v4l2loopback-fedora */
export const projects: Project[] = [
  {
    name: "ComplyAIgent",
    emoji: "⚖️",
    category: "AMD Hackathon 2026",
    desc: "Agentic DevSecOps engine that compiles regulatory text (PDF / Markdown / scraped) into fail-closed pre-push guardrails — a Go CLI pairing Gitleaks with entropy scoring, and a LangGraph human-in-the-loop interrupt routing approvals through a FastAPI backend.",
    tech: ["Go", "LangGraph", "FastAPI", "Next.js"],
    url: "https://github.com/liitkud/complyaigent",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Team",
    role: "Backend + agent eng",
    team: "Hackathon team",
    award: "AMD Hackathon 2026",
    architecture: "Regulatory text → Go CLI gate + LangGraph HIL → FastAPI",
  },
  {
    name: "WorkSight",
    emoji: "📊",
    category: "BPI DataWave 2025",
    desc: "Agentic engine that transforms fragmented enterprise metadata into predictive burnout insights. Top 3 out of 100+ teams.",
    tech: ["Python", "LangGraph", "Next.js"],
    url: null,
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: true,
    type: "Team",
    role: "Builder",
    team: "Hackathon team",
    award: "Top 3 Finalist",
  },
  {
    name: "awesome-freestack",
    emoji: "🎒",
    category: "Community",
    desc: "Curated assortment of free resources for students, hobbyists, and startup builders.",
    tech: [],
    url: "https://github.com/kuyacarlo/awesome-freestack",
    live: null,
    demo: null,
    writeup: null,
    img: "/screenshots/awesome-freestack.png",
    screenshots: [],
    private: false,
    type: "Solo",
  },
  {
    name: "nutrition-api",
    emoji: "🥗",
    category: "Side Project",
    desc: "API for serving nutritional facts from various sources onto downstream devices.",
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
  {
    name: "pub-routes",
    emoji: "🚌",
    category: "Side Project",
    desc: "ETL pipeline transforming LTFRB transport routes into a CSV file.",
    tech: ["BeautifulSoup", "Pandas", "urllib3"],
    url: "https://github.com/kuyacarlo/pub-routes",
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
    category: "Side Project",
    desc: "Fedora package script for Video4Linux loopback devices (OBS Virtual Camera).",
    tech: ["dkms", "GitHub Actions"],
    url: "https://github.com/kuyacarlo/v4l2loopback-fedora",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
  },
];

export const PROOF_OF_WORK_URL = "https://delatorre.axonenjin.com/";

export const hackathons = [
  {
    place: "Top 3 Finalist",
    name: "BPI DataWave 2025",
    proj: "WorkSight",
    desc: "Architected an agentic engine that transforms fragmented enterprise metadata into predictive burnout insights. Top 3 out of 100+ teams.",
    podium: true,
    url: null,
  },
  {
    place: "First Runner Up",
    name: "LPU Innoverse 2025",
    proj: "BetterTranspo",
    desc: "Crafted a decentralized platform for BEEP™ and Card payments with LoraWAN — real-time transport routes, fare estimation, and a fullness meter for passengers.",
    podium: true,
    url: null,
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
    name: "UPLB · The Innovation Lab & UP Data Science Society",
    proj: "SARAI-SABI",
    desc: "Designed and built a multi-platform tracker for Market Prices, Land Ownership, and Pest Prevention for farmers and cooperatives.",
    podium: false,
    url: null,
  },
  {
    place: "Participant",
    name: "AMD Developer Hackathon 2026",
    proj: "ComplyAIgent",
    desc: "Agentic DevSecOps engine that compiles regulatory text into fail-closed pre-push guardrails — a Go CLI pairing Gitleaks with entropy scoring, and LangGraph human-in-the-loop routing for medium-risk approvals.",
    podium: false,
    url: "https://github.com/liitkud/complyaigent",
  },
];

export const experience = [
  {
    org: "Millia Labs Pte. Ltd.",
    roles: [
      {
        title: "Junior Developer",
        dates: "Jul 2026 — present",
        bullets: [
          "Build and maintain features across a property-operations web dashboard and companion Flutter mobile app — task management, turnover scheduling, inspections, and guest communications.",
          "Develop backend services and agent orchestration workflows in Python / FastAPI against a PostgreSQL database.",
          "Improve CI/CD reliability and developer tooling through self-hosted runner infrastructure, automated lint and type-check gates, and test-suite isolation.",
          "Operate an AI-agent-assisted development workflow across parallel workstreams.",
        ],
      },
    ],
  },
  {
    org: "Seekers Guild",
    roles: [
      {
        title: "CTO",
        dates: "2025 — present",
        bullets: [
          "Lead technical direction for student builder community projects and talks.",
          "Shipped internal tooling and mentored members on Git, web, and shipping habits.",
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
  "I'm Karlo — a generalist software engineer and student. My work spans ETL pipelines, FastAPI backends, React/Flutter apps, and agentic AI systems built with LangGraph + MCP.",
  "Recent projects: a nutrition facts API, an ETL pipeline for LTFRB transport routes, and a curated free-resources list. Hackathon work spans burnout-prediction and DevSecOps-compliance agents.",
  "Currently a Junior Developer at Millia Labs, CTO of Seekers Guild, and Cybersecurity Associate at Computer Science Society BulSU. Running Fedora Linux, learning Go, tinkering with a homelab.",
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
    name: "nutrition-api",
    category: "FastAPI · Docker · SQLite",
    desc: "API for serving nutritional facts from various sources onto downstream devices.",
    meta: "Solo",
  },
  {
    name: "pub-routes",
    category: "BeautifulSoup · Pandas · urllib3",
    desc: "ETL pipeline transforming LTFRB transport routes into a CSV file.",
    meta: "Solo",
  },
  {
    name: "v4l2loopback-fedora",
    category: "dkms · GitHub Actions",
    desc: "Fedora package script for Video4Linux loopback devices (OBS Virtual Camera).",
    meta: "Solo",
  },
  {
    name: "awesome-freestack",
    category: "Community resources",
    desc: "Curated assortment of free resources for students, hobbyists, and startup builders.",
    meta: "Curator",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Dart", "Go", "SQL", "Bash"],
  },
  {
    label: "Data Engineering",
    items: ["Pandas/NumPy", "PostgreSQL", "DuckDB", "ETL", "Web Scraping", "JSON/YAML"],
  },
  {
    label: "Backend & AI",
    items: ["FastAPI", "LangGraph", "Agentic AI", "MCP", "FastMCP", "pytest"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React / Next.js", "Flutter"],
  },
  {
    label: "Infra & DevOps",
    items: ["Docker", "Podman", "GitHub/Forgejo Actions", "Ansible", "Linux Hardening", "Git"],
  },
  {
    label: "Cloud Architecture",
    items: ["GCP", "AWS", "Supabase"],
  },
];

export const nowItems = [
  {
    key: "building",
    label: "building",
    text: "Homelab services + portfolio polish",
    href: "/homelab",
  },
  {
    key: "learning",
    label: "learning",
    text: "Go",
    href: null,
  },
  {
    key: "exploring",
    label: "exploring",
    text: "Agentic DevSecOps + MCP tooling",
    href: null,
  },
];

/** Drop 4–6 images in public/proof/ then set `enabled: true` and fill `photos`. */
export const socialProof = {
  enabled: false,
  // photos: [{ src: "/proof/example.jpg", caption: "Event · YYYY-MM" }]
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
  { name: "Forgejo", desc: "Self-hosted Git. Mirrors to GitHub.", url: "https://forge.kuyacarlo.dev" },
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
