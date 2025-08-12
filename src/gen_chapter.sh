#!/usr/bin/env bash
set -euo pipefail

# Usage: ./gen_chapter.sh N
# Creates N.md with front matter for an empty chapter.

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 N" >&2
  exit 1
fi

n="$1"
if ! [[ "$n" =~ ^[0-9]+$ ]]; then
  echo "Error: N must be a non-negative integer." >&2
  exit 1
fi

file="${n}.md"
if [[ -e "$file" ]]; then
  echo "Error: File already exists: $file" >&2
  exit 1
fi

today="$(date +%Y-%m-%d)"

cat > "$file" <<EOF
---
name: "Chapter $n"
chapter: $n
date: "$today"
author: auto
---

EOF

echo "Created $file"
