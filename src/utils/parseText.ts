import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export async function formatText(input: string): Promise<string> {
  const dirty = await marked.parse(input);
  return sanitizeHtml(dirty, {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
    allowedAttributes: { a: ["href"] }
  });
}
