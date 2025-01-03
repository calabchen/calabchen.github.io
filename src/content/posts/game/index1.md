---
title: Unity2D游戏项目：Slime Adventure
published: 2025-01-03
description: Make a simple unity2D game for college lesson
tags:
  - Unity
category: 软件
draft: false
---
# Unity WebGL to bulid game

制作完游戏后在Unity选择WebGL编译游戏，将游戏网页版的整个目录放到了我这个静态博客的 `public` 文件夹下，在 Astro 框架中，`public` 目录下的文件会被直接映射到网站的根路径，而不是 `/public/` 路径。在本地调试博客和正式网页的访问路径应该是 `/SlimeAdventure_for_WebGL/index.html`

示例：
> \[点击这里玩 Slime Adventure\](/SlimeAdventure_for_WebGL/index.html) 
  - 这个markdown方法会直接在当前的标签页刷新，会造成当前页面被破坏的bug，**不推荐使用**
> `<a href="/SlimeAdventure_for_WebGL/index.html" target="_blank">点击这里玩 Slime Adventure</a>` 
  - 直接在markdown中写html语法，这个语句会跳转到新的标签页打开游戏，**推荐使用**

:::caution
在网页版的游戏中请不要点击“退出游戏”，那是专门为PC平台(Windows, Mac, Linux)退出程序准备的。网页版的游戏请直接关闭标签页来退出游戏<br>
> **重要提示**  
> 本项目仅用于 Unity 课程学习，禁止用于商业用途或其他未经授权的用途。
:::

<a href="/SlimeAdventure_for_WebGL/index.html" target="_blank">👉点击这里玩 Slime Adventure👈</a>