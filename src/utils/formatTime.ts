// Import polyfill only if Temporal is not available
let TemporalRef: typeof Temporal;

if ("Temporal" in globalThis) {
  TemporalRef = Temporal;
} else {
  // polyfill dynamically
  // @ts-ignore
  TemporalRef = (await import("@js-temporal/polyfill")).Temporal;
}

export default function formatRelativeTime(date: Date | string): string {
  const instant = TemporalRef.Instant.from(
    typeof date === "string" ? date : date.toISOString()
  );
  const now = TemporalRef.Now.instant();

  // duration in seconds
  const diffSec =
    Math.round(now.epochMilliseconds - instant.epochMilliseconds) / 1000;
  const abs = Math.abs(diffSec);

  const plural = (value: number) => (value !== 1 ? "s" : "");

  if (abs < 60) return `${Math.round(abs)} second${plural(abs)} ago`;

  const minutes = Math.floor(abs / 60);
  if (minutes < 60) return `${minutes} minute${plural(minutes)} ago`;

  const hours = Math.floor(abs / 3600);
  if (hours < 24) return `${hours} hour${plural(hours)} ago`;

  const days = Math.floor(abs / 86400);
  if (days < 7) return `${days} day${plural(days)} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${plural(weeks)} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${plural(months)} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${plural(years)} ago`;
}
