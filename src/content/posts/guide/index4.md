---
title: Fuwari修改创建新文章的命令
published: 2024-12-30
description: Enable custom subdirectories within (./src/content/posts) for organized article creation.
tags:
  - Fuwari
category: Guides
draft: false
---
这个主题的创建文章的默认方法是`pnpm new-post <filename>`，这样的坏处是只能在 `src/content/posts/` 下创建文章，但是子目录的归档很麻烦。通过运行创建文章的命令发现对应的代码在` scripts/new-post.js `之中。于是本人自行修改了对应的代码：
```js
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
```
## 关键更改点解释

1. **解析命令行参数**：
    - `subDirArg` 被用作 `src/content/posts` 下的子目录名称，而不是项目的根目录下的目录。
2. **构建目标目录路径**：
    - 使用 `path.join(defaultTargetDir, subDirArg)` 来构建完整的目标目录路径，这样可以确保所有文件都保存在 `src/content/posts` 下面。
3. **确保目标目录存在**：
    - 如果提供了 `subDirArg`，那么会检查并创建 `src/content/posts` 下的相应子目录。

## 如何使用修改后的脚本

- **默认目录**：如果你只提供文件名而不指定子目录，文章将保存在默认的 `./src/content/posts/` 目录下。
```js
pnpm new-post "helloIndex"
```

- **自定义子目录**：如果你想在 `src/content/posts` 目录下创建一个名为 `NAS` 的子目录，并在其中创建文章，你可以这样做：
```js
pnpm new-post "index1" "NAS"
```
这会在 `src/content/posts/NAS/` 目录下创建名为 `index1.md` 的文件。如果 `NAS` 子目录不存在，脚本会自动创建它。

不需要每次都输入引号（`"`）。在命令行中，只有当参数包含空格或其他特殊字符时，才需要使用引号来确保整个字符串被视为一个单独的参数。如果你的文件名或目录名不包含空格或其他特殊字符，你可以直接输入它们，而不需要引号。

### 示例

#### 不需要引号的情况：

- 文件名和子目录名都不包含空格或其他特殊字符：
```js
pnpm new-post index1 NAS
```

#### 需要引号的情况：
- 文件名或子目录名包含空格或其他特殊字符：
```js
pnpm new-post "index with spaces" "NAS Directory"
```


