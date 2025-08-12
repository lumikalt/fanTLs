// Remove all tooltip markup, keeping only the plain text (including inside tooltips)
export function eraseTooltip(text: string): string {
  return text.replace(/\{\{([^}]+)\}([cpf])?(?:\s*([^}]+))?\}/g, "$1");
}
/// Scan for {{text}c? soomething?} and replace with TooltipText component (c and something are optional)
export default function parseTooltip(text: string) {
  const regex = /\{\{([^}]+)\}([cpf])?(?:\s*([^}]+))?\}/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "tooltip", text: match[1], tooltip: match[3] || "" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }
  return parts;
}
