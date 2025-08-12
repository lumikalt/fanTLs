import { visit } from "unist-util-visit";
import type { Root, Text } from "hast";

const IDENT_REGEX = /\{([^}]+)\}/g;

const rehypeIdent = () => (tree: Root) => {
  visit(tree, "text", (node: Text, index, parent) => {
    if (!node.value.match(IDENT_REGEX) || !parent || typeof index !== "number")
      return;

    const parts: any[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = IDENT_REGEX.exec(node.value))) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          value: node.value.slice(lastIndex, match.index)
        });
      }
      parts.push({
        type: "element",
        tagName: "span",
        properties: { className: ["ident"] },
        children: [{ type: "text", value: match[1] }]
      });
      lastIndex = IDENT_REGEX.lastIndex;
    }
    if (lastIndex < node.value.length) {
      parts.push({ type: "text", value: node.value.slice(lastIndex) });
    }
    // Replace the original text node with the new nodes
    parent.children.splice(index, 1, ...parts);
    // Skip over the newly inserted nodes
    return index + parts.length;
  });
};

export default rehypeIdent;
