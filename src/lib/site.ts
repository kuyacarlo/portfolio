/** Public site links — set via `.env` (`PUBLIC_*`). Inlined at build time. */

function requirePublic(name: string, fallback: string): string {
  const value = import.meta.env[name];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export const site = {
  bookingUrl: requirePublic("PUBLIC_BOOKING_URL", "https://cal.com/kuyacarlo"),
  email: requirePublic("PUBLIC_EMAIL", "santos.karlo@outlook.com"),
  linkedinUrl: requirePublic(
    "PUBLIC_LINKEDIN_URL",
    "https://linkedin.com/in/kuyacarlo",
  ),
  githubUrl: requirePublic("PUBLIC_GITHUB_URL", "https://github.com/kuyacarlo"),
  devtoUrl: requirePublic("PUBLIC_DEVTO_URL", "https://dev.to/kuyacarlo"),
  statusUrl: requirePublic(
    "PUBLIC_STATUS_URL",
    "https://status.kuyacarlo.dev",
  ),
} as const;

export function displayHost(url: string): string {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}
