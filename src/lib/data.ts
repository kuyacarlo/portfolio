import type { Project, Hackathon, HomelabService } from './schema';

export const projects: Project[] = [
  { name: "tanggol-saka", desc: "Decentralized land-ownership system for indigenous Filipino farmers. USSD proof-of-occupation, offline-first, Tagalog UI, digital land certificates.", tech: ["TypeScript", "Next.js", "Decentralized"], url: "https://github.com/kuyacarlo/tanggol-saka", live: "https://tanggol-saka.vercel.app", img: null },
  { name: "bantay",       desc: "Pre-push hook catching secrets + entropy anomalies. Regex + LLM two-layer detection. Auth0 CIBA human-in-the-loop for medium-risk pushes. Fail-closed.", tech: ["TypeScript", "LLM", "Auth0", "Git Hooks"], url: "https://github.com/kuyacarlo/bantay", live: null, img: null },
  { name: "ComplyAIgent", desc: "Agentic DevSecOps compliance engine for AMD Hackathon. Ingests regulatory text, enforces pre-push policies. LangGraph HIL, Go CLI, Next.js dashboard.", tech: ["Go", "LangGraph", "FastAPI", "Next.js"], url: "https://github.com/kuyacarlo/bantay", live: null, img: null },
  { name: "forgesure",    desc: "All-in-one dashboard for equipment cost and maintenance tracking. For construction teams tired of spreadsheets.", tech: ["Python", "FastAPI", "Next.js"], url: "https://github.com/kuyacarlo/forgesure", live: "https://forgesure.vercel.app", img: null },
  { name: "sage-mcp",     desc: "SAGE — Notion MCP-powered academic co-pilot for Filipino students. Builds semester workspace from CHED-verified curriculum via agentic orchestration.", tech: ["Python", "LangGraph", "MCP", "Notion"], url: "https://github.com/kuyacarlo/sage-mcp", live: null, img: null },
  { name: "pub-routes",   desc: "ETL pipeline transforming raw LTFRB transport data into clean, public CSV datasets. Open data for Filipino commuters.", tech: ["Python", "BeautifulSoup", "Pandas", "ETL"], url: "https://github.com/kuyacarlo/pub-routes", live: null, img: null },
];

export const hackathons: Hackathon[] = [
  { place: "Top 3 Finalist",  name: "BPI DataWave 2025",      proj: "WorkSight",    desc: "Agentic engine transforming enterprise metadata into predictive burnout insights. Top 3 / 100+ teams.", url: "https://github.com/kuyacarlo/WorkSight" },
  { place: "1st Runner Up",   name: "LPU Innoverse 2025",     proj: "BetterTranspo",desc: "Decentralized platform for BEEP™ payments with LoraWAN — real-time routes, fare estimation, fullness meter.", url: "https://github.com/kuyacarlo/BetterTranspo" },
  { place: "MLH GHW 2026",    name: "Notion MCP Challenge",   proj: "SAGE",         desc: "Autonomous academic orchestrator. MCP bridges LLM reasoning to production Notion APIs.", url: "https://github.com/kuyacarlo/sage-mcp" },
  { place: "UP PJDSC 2025",   name: "Data Science Competition",proj: "KLIMA",       desc: "Bronze→Silver→Gold ETL pipeline for localized LGU disaster risk alerts. Piloted in Calumpit, Bulacan.", url: "https://github.com/kuyacarlo/KLIMA" },
  { place: "AMD Hackathon 2026",name: "Developer Challenge",  proj: "ComplyAIgent", desc: "Agentic DevSecOps compliance engine. Three-tier comparator, human-in-the-loop, Go CLI.", url: "https://github.com/kuyacarlo/bantay" },
];

export const services: HomelabService[] = [
  { name: "Forgejo",     desc: "Self-hosted Git. Mirrors to GitHub.", up: true  },
  { name: "Authentik",   desc: "Identity provider — SSO for all services.", up: true  },
  { name: "Vaultwarden", desc: "Bitwarden-compatible password server.", up: true  },
  { name: "Traefik",     desc: "Reverse proxy + auto TLS via Let's Encrypt.", up: true  },
  { name: "Portainer",   desc: "Docker management UI.", up: true  },
  { name: "Grafana",     desc: "Monitoring dashboard — Prometheus + Loki.", up: true  },
  { name: "Prometheus",  desc: "Metrics scraping from all containers.", up: true  },
  { name: "Loki",        desc: "Log aggregation. Tailed by Promtail.", up: true  },
  { name: "n8n",         desc: "Workflow automation — webhooks, notifications.", up: false },
  { name: "Uptime Kuma", desc: "Public status page for hosted services.", up: true  },
  { name: "Forgejo CI",  desc: "Self-hosted CI runner. Mostly linting + tests.", up: true  },
  { name: "Headscale",   desc: "Self-hosted Tailscale control server for mesh VPN.", up: true  },
];

export const hardware = [
  ["Machine",  "Old Lenovo ThinkCentre M93p (i5-4590, 16 GB RAM)"],
  ["Storage",  "500 GB SSD OS + 2 TB HDD data"],
  ["OS",       "Fedora Server 41"],
  ["Network",  "Unifi AP AC Lite · pfSense router"],
  ["VPN",      "Headscale (Tailscale-compatible) mesh"],
  ["Power",    "APC UPS 650VA"],
  ["Uptime",   "~95% (reboots for kernel updates)"],
  ["Domain",   "*.lab.kuyacarlo.dev (internal) via split DNS"],
];

export const stack = [
  ["Container runtime", "Docker + Compose"],
  ["Orchestration",     "Portainer CE (no k8s — overkill for one box)"],
  ["Secrets",           "Vaultwarden + env files, no hardcoded creds"],
  ["Backups",           "rsync to external HDD nightly + Rclone to R2"],
  ["DNS",               "Pi-hole for ad blocking + pfSense for split-DNS"],
  ["Monitoring",        "Grafana + Prometheus + Loki + Uptime Kuma"],
  ["CI/CD",             "Forgejo Actions — push triggers linting + deploy"],
  ["Auth",              "Authentik SSO — OAuth2 proxy in front of services"],
];
