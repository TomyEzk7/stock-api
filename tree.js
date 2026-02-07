#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.argv[2] || process.cwd();

const IGNORED = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".env"
]);

function printTree(dir, prefix = "") {
  const items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(d => !IGNORED.has(d.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");

    console.log(prefix + pointer + item.name);

    if (item.isDirectory()) {
      printTree(path.join(dir, item.name), nextPrefix);
    }
  });
}

console.log(path.basename(root));
printTree(root);
