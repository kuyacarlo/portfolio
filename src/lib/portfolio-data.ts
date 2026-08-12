/** Shared portfolio content — keep site + resume + profile README in sync. */

export const TAGLINE = "Iterate fast, think deep, ship meaning.";
export const REPO_COUNT = 37;
export const HOMELAB_SERVICE_COUNT = 12;
export const NOW_UPDATED = "2026-07";

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

/** Featured homepage order: ComplyAIgent → WorkSight → tanggol-saka → bantay → SAGE → forgesure */
export const projects: Project[] = [
  {
    name: "ComplyAIgent",
    emoji: "⚖️",
    category: "AMD Hackathon Submission",
    desc: "Agentic DevSecOps compliance engine — ingests regulatory text, enforces pre-push policies with LangGraph HIL, Go CLI, and Next.js dashboard. Built for AMD Developer Challenge 2026.",
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
    architecture: "LangGraph HIL → Go CLI policy gate → Next.js dashboard",
  },
  {
    name: "WorkSight",
    emoji: "📊",
    category: "BPI DataWave 2025",
    desc: "Agentic engine transforming enterprise metadata into predictive burnout insights. Top 3 / 100+ teams.",
    tech: ["Python", "LangGraph", "Data"],
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
    name: "tanggol-saka",
    emoji: "🌾",
    category: "Civic Tech / Decentralized",
    desc: "Decentralized land-ownership system for indigenous Filipino farmers. USSD proof-of-occupation, offline-first, Tagalog UI, digital land certificates.",
    tech: ["TypeScript", "Next.js", "Decentralized"],
    url: "https://github.com/kuyacarlo/tanggol-saka",
    live: "https://tanggol-saka.vercel.app",
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Lead",
    role: "Lead builder",
    architecture: "Offline-first USSD + web certificates",
  },
  {
    name: "bantay",
    emoji: "🛡️",
    category: "DevSecOps Tooling",
    desc: "Pre-push hook catching secrets + entropy anomalies. Regex + LLM two-layer detection. Auth0 CIBA human-in-the-loop for medium-risk pushes. Fail-closed.",
    tech: ["TypeScript", "LLM", "Auth0", "Git Hooks"],
    url: "https://github.com/kuyacarlo/bantay",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Solo",
    architecture: "Regex + LLM detectors → CIBA gate → fail-closed push",
  },
  {
    name: "SAGE",
    emoji: "🎓",
    category: "EdTech / Agents",
    desc: "Notion MCP-powered academic co-pilot for Filipino students. Builds semester workspace from CHED-verified curriculum via agentic orchestration. MLH GHW 2026 Notion MCP Challenge.",
    tech: ["Python", "LangGraph", "MCP", "Notion"],
    url: "https://github.com/kuyacarlo/sage-mcp",
    live: null,
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Team",
    role: "Agent / MCP eng",
    team: "Hackathon team",
    award: "MLH GHW 2026 · Notion MCP",
    architecture: "LLM reasoning ↔ MCP ↔ Notion APIs",
  },
  {
    name: "ForgeSure",
    emoji: "🔧",
    category: "SaaS / Construction Ops",
    desc: "All-in-one dashboard for equipment cost and maintenance tracking — for construction teams tired of spreadsheets.",
    tech: ["Python", "FastAPI", "Next.js"],
    url: "https://github.com/kuyacarlo/forgesure",
    live: "https://forgesure.vercel.app",
    demo: null,
    writeup: null,
    img: null,
    screenshots: [],
    private: false,
    type: "Lead",
    role: "Full-stack",
  },
];

export const PROOF_OF_WORK_URL = "https://delatorre.axonenjin.com/";

export const hackathons = [
  {
    place: "Top 3 Finalist",
    name: "BPI DataWave 2025",
    proj: "WorkSight",
    desc: "Agentic engine transforming enterprise metadata into predictive burnout insights. Top 3 / 100+ teams.",
    podium: true,
    url: "https://github.com/kuyacarlo/WorkSight",
  },
  {
    place: "1st Runner Up",
    name: "LPU Innoverse 2025",
    proj: "BetterTranspo",
    desc: "Decentralized platform for BEEP™ payments with LoraWAN — real-time routes, fare estimation, fullness meter.",
    podium: true,
    url: "https://github.com/kuyacarlo/BetterTranspo",
  },
  {
    place: "MLH GHW 2026",
    name: "Notion MCP Challenge",
    proj: "SAGE",
    desc: "Autonomous academic orchestrator. MCP bridges LLM reasoning to production Notion APIs.",
    podium: false,
    url: "https://github.com/kuyacarlo/sage-mcp",
  },
  {
    place: "UP PJDSC 2025",
    name: "Data Science Competition",
    proj: "KLIMA",
    desc: "Bronze→Silver→Gold ETL pipeline for localized LGU disaster risk alerts. Piloted in Calumpit, Bulacan.",
    podium: true,
    url: "https://github.com/Signal-No-5/klima",
  },
  {
    place: "AMD Hackathon 2026",
    name: "Developer Challenge",
    proj: "ComplyAIgent",
    desc: "Agentic DevSecOps compliance engine. Three-tier comparator, human-in-the-loop, Go CLI.",
    podium: false,
    url: "https://github.com/liitkud/complyaigent",
  },
];

export const experience = [
  {
    org: "Millia Labs",
    roles: [
      {
        title: "Software Engineering Intern",
        dates: "Jun 2026 — present",
        bullets: [
          "GCP infrastructure, CI/CD pipeline maintenance, and MCP backend integrations.",
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
        dates: "2025 — present",
        bullets: [
          "Support society security education and workshops for CompE / CS peers.",
        ],
      },
    ],
  },
  {
    org: "BulSU — The Otaku Philippines",
    roles: [
      {
        title: "Vice President for Internal Affairs",
        dates: "2024 — 2025",
        bullets: [
          "Ran internal ops and member coordination for the campus anime / creative org.",
        ],
      },
      {
        title: "Multimedia Head",
        dates: "2023 — 2024",
        bullets: [
          "Led design and media output for events and org campaigns.",
        ],
      },
    ],
  },
];

export const talks = [
  {
    title: "Quality Checks for Devs and Data Pros",
    org: "Data Engineering Pilipinas",
  },
  { title: "Git & GitHub Fundamentals", org: "Computer Science Society BulSU" },
  { title: "Web Dev Basics", org: "Seekers Guild" },
];

export const aboutBlurb = [
  "I'm Karlo — a generalist software engineer and student. My work spans ETL pipelines, containerized microservices, FastAPI backends, and agentic AI systems built with LangGraph + MCP.",
  "I gravitate toward tools that make other developers faster and projects that solve real problems for real Filipinos — pre-push security hooks, land-ownership systems for indigenous farmers, disaster-risk pipelines for LGUs.",
  "Currently CTO of Seekers Guild and Cybersecurity Associate at Computer Science Society BulSU. Running Fedora Linux, learning Go, tinkering with a homelab.",
];

export const certifications = [
  { name: "Associate Python Developer", issuer: "DataCamp", date: "Jun 2025" },
  { name: "Azure Data Fundamentals", issuer: "Microsoft", date: "May 2025" },
  { name: "Azure AI Services Workshop", issuer: "Microsoft", date: "May 2025" },
  { name: "Intro to Cybersecurity", issuer: "Cisco", date: "2025" },
  { name: "Cybersecurity Simulation", issuer: "Mastercard", date: "Apr 2025" },
];

/** Resume featured builds — WorkSight, ComplyAIgent, SAGE */
export const resumeWork: {
  name: string;
  category: string;
  desc: string;
  meta?: string;
}[] = [
  {
    name: "WorkSight",
    category: "BPI DataWave 2025",
    desc: "Agentic engine transforming enterprise metadata into predictive burnout insights. Top 3 / 100+ teams.",
    meta: "Top 3 Finalist",
  },
  {
    name: "ComplyAIgent",
    category: "AMD Hackathon 2026",
    desc: "Agentic DevSecOps compliance engine — regulatory text to pre-push policy enforcement. LangGraph HIL, Go CLI, Next.js dashboard.",
    meta: "Backend + agent eng · Team",
  },
  {
    name: "SAGE",
    category: "MLH GHW 2026 · Notion MCP",
    desc: "Notion MCP academic co-pilot for Filipino students. Builds semester workspaces from CHED-verified curriculum via agentic orchestration.",
    meta: "Agent / MCP eng · Team",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Data & Backend",
    items: ["Python", "Go", "FastAPI", "DuckDB", "PostgreSQL", "Supabase"],
  },
  {
    label: "DevOps & Infra",
    items: ["Podman", "GitHub Actions", "Ansible", "Linux", "GCP", "AWS", "Bash"],
  },
  {
    label: "AI / Agents",
    items: ["LangGraph", "MCP"],
  },
  {
    label: "Frontend",
    items: ["TypeScript", "Next.js"],
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
