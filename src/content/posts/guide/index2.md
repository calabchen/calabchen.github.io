---
title: Fuwari添加giscus评论
published: 2024-12-19
description: How to add a commenting system which is provided from giscus.
tags:
  - Fuwari
category: Guides
draft: false
---

:::caution
随着时间的推移，文章内容可能过期，请关注网上其他文章的最新动态。<br>
本文参考了其他博主的文章，仅供学习参考。<br>
该方案的实现有一些bug，并不完美。
:::

# giscus配置

首先，确保你的仓库设置为`public`；
然后，打开`discussion`功能(在你的github仓库上方的导航栏可以找到)；
接着，对仓库进行giscus初始化配置。打开[giscus官网](https://giscus.app/zh-CN)，对某一仓库进行配置，生成的配置文件应如下所示：

```js
<script src="https://giscus.app/client.js"
        data-repo="YOUR_REPO_NAME"
        data-repo-id="REPO_ID"
        data-category="General"
        data-category-id="CATEGORY_ID"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

保持网页不关闭，进入下一环节。

# Astro配置

## 创建评论系统脚本

在文件夹中找到`src`下的`components`目录，接着在该目录下新建文件`CommentSection.astro`(名字任意) 。然后通过VS Code或者别的代码编辑器打开它。

```html
/
├── ...
└── src
    ├── components
    └── ...
...
```

:::tip
在 `.astro` 文件中，你可以添加一个或多个 `<script>` 标签来添加客户端 JavaScript。<br>
Astro 默认处理 `<script>` 标签。
:::

将刚才的giscus配置填入文件中，就是直接把包含`<script>...</script>`的内容直接复制粘贴，记得查看`repo`，`repo-id`，`category-id`是否和你的仓库一样，`theme`请选择`lighr` or `dark` 其中之一，最后保存文件。

## 修改文章页面

找到负责渲染文章的astro文件，其应该在`pages`目录下(其他框架是类似的)

在Fuwari主题中，其应该在`src`->`pages`->`posts`->`[...slug].astro`，对其进行修改：

```js
---
import CommentSection from '@components/CommentSection.astro'
---
...
	<!-- 文章渲染主元素 -->
	<div>
		...
		<!-- 最后一个元素 -->
		<div>
			...
		</div>
		<CommentSection />
	</div>
...
```

以Fuwari主题为例，其应该放置在版权信息下:

```js
<div>
	<div>
		...
	
		{licenseConfig.enable && <License ...></License>}
		<CommentSection />
	</div>
</div>
```

至此，你应该成功在Astro框架的博客上实现giscus评论系统

:::important
由于Astro的js是独立渲染的，所以在这个主题中，giscus的背景色不会随着主题切换深色/浅色模式而改变背景色，暂时没有找到改进方法😭，只能指定是`light`或者`dark`
:::