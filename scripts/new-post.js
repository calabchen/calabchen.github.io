import fs from "fs";
import path from "path";

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

// 解析命令行参数，第一个参数为文件名，第二个参数为子目录（可选）
let [fileNameArg, subDirArg] = args;

if (!fileNameArg) {
  console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename> [subdirectory]`);
  process.exit(1);
}

// 设置默认的目标目录
const defaultTargetDir = "./src/content/posts/";

// 构建完整的目标目录路径
const targetDir = subDirArg ? path.join(defaultTargetDir, subDirArg) : defaultTargetDir;

// 确保目标目录存在，如果不存在则创建
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileNameArg)) {
  fileNameArg += ".md";
}

// 构建完整的文件路径
const fullPath = path.join(targetDir, fileNameArg);

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists`);
  process.exit(1);
}

const content = `---
title: ${path.parse(fileNameArg).name}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(fullPath, content);

console.log(`Post ${fullPath} created`);