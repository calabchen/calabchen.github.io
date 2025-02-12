---
title: Fuwari修改支持文章嵌入mermaid语法
published: 2025-01-22
description: Fuwari修改支持文章嵌入mermaid语法
tags:
  - Fuwari
category: Guides
draft: false
---
这个主题的默认不支持mermaid语法，但是mermaid语法可以替代一部分图片，节省空间占用，故我从网上搜索出解决方案。

# Step 1: 安装 Mermaid
```js
pnpm install remark-mermaidjs
pnpm add playwright
pnpm exec playwright install
```

# Step 2: 在 astro.config.mjs 文件中初始化 Mermaid 
在头文件中的最后一行声明引用remarkMermaid插件，添加 remarkMermaid 插件到remarkPlugins列表的最后一行。
```js
import remarkMermaid from "remark-mermaidjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [
    ...,
    remarkMermaid,
    ],
  },
});
```

# 附录
参考自[这篇文章](https://www.kalanakt.cc/posts/add-mermaid-diagrams-to-astro-js-website)