---
title: WordPress网站安装wp-statistic插件以及汉化
published: 2024-09-20
description: ""
tags:
  - wordpress
category: wordpress
draft: false
---
:::caution
随着时间的推移，文章内容可能过期，请关注网上其他文章的最新动态
:::
## 安装插件

进入“管理后台”，点击“插件”，点击左上角的“安装新插件”

搜索插件“wp-statistic”，点击安装。

## 汉化插件

官方默认的插件只汉化了整体的16%，悲！😢

但是在博主浏览了多篇网上的文章后，结合AI大模型的解答，解决了这个问题！100%是当今最有效的方案！

首先，wordpress汉化文本是通过.po文件格式编译成的.mo文件来实现，官网的汉化包根本不行，所以我们需要自己通过最新下载的插件里的.pot文件来翻译。

:::warning
以下文字节选自其他博文，仅作与学习交流!
:::

---

说明:  
.po文件,.mo文件,.pot文件是由gettext程序生成或者使用的源代码和编译结果。  
1、.pot文件  
是一种模板文件,其实质与.po文件一样,其中包含了从源代码中提取所有的翻译字符串的列表,主要提供给翻译人员使用。  
从源码中扫描得到的翻译模版文件,原始语言取决于源码字符串中使用的自然语言,建议使用英文。纯文本格式;

2、.po文件  
根据POT文件建立的各种语言版本的待翻译文件,其中包含原始语言和被翻译的目标语言。纯文本格式;  
(1)用程序msginit来分析pot文件,生成各语言对应的po文件,比如中文就是zh_CN.po,法语就是fr.po文件。  
(2)PO是Portable Object(可移植对象)的缩写形式,它是面向翻译人员的、提取于源代码的一种资源文件。  
(3).po文件可以用任何编辑器如poEdit,vi,Emacs,editplus打开,交给翻译人员来将其中的文字翻译成本国语言。  
在我们系统中,直接新建.po文件修改即可。在诊断模式下:/usr/share/locale/zh_CN/LC_MESSAGES路劲下存放了对应的mo.po文件。  
目前仅支持中英文!

3、.mo文件  
供最终软件实际使用的文件,使用PO编译而成。二进制格式。  
(1)用msgfmt将.po文件编译成mo文件,这是一个二进制文件,不能直接编辑。  
(2)MO是Machine Object(机器对象)的缩写形式,它是面向计算机的、由.po文件通过GNU gettext工具包编译而成的二进制文件,应  
用程序通过读取.mo文件使自身的界面转换成用户使用的语言,如简体中文。  
(3)可以用工具如msgunfmt命令将.mo文件反编译为.po文件。

---

回到正题，当然，有自动翻译工具来帮助我们，不用一个一个单词自己翻译(什么时代了！学会使用强大的互联网！) [[wp-statistic官网汉化链接点这里](https://translate.wordpress.org/projects/wp-plugins/wp-statistics/stable/zh-cn/default)]

- 下载软件 **Poedit** ：帮助我们翻译.po文件为.mo文件 [[官网链接](https://poedit.net/)]
- 下载软件 **PoTranslator** ：帮助我们自动把英文翻译为简体中文 [[github链接](https://github.com/anbangli/PoTranslator)] 点击release下载zip最新版解压即用😊

[collapse title="在你的网站的根目录下找到以下路径"]

通常，你只需要将 `.mo` 文件放在以下两个目录中的一个：

- ...`/wp-content/languages/plugins/`
- ...`/wp-content/plugins/wp-statistics/languages/`

WordPress会首先在插件的 `languages` 子目录中查找翻译文件，如果没有找到，它会在 `/wp-content/languages/plugins/` 目录中查找。因此，你只需要在其中一个位置放置 `.mo` 文件。

[/collapse]

根据博主实测：

新版的wordpress和里头下载的插件的汉化文件都在_.../wp-content/languages/plugins/_里面，并且wp-statistics插件会优先使用_wp-statistics-zh_CN.l10n.php_文件，我们需要删除这个文件，添加_wp-statistics-zh_CN.po_和_wp-statistics-zh_CN.mo_。那po和mo怎么来那？☝️🤓

### 打开**Poedit**

把_.../wp-content/plugins/wp-statistics/languages/wp-statistics.pot_文件用**Poedit**打开，点击“创建新的翻译”，重命名文件为_wp-statistics-zh_CN.po_并保存。

### 记事本打开**PoTranslator**

用记事本打开**PoTranslator**文件夹里的PoTranslator.ahk文件。找到最下面的几行：

```
;选择翻译引擎：下面四行代码分别代表四个翻译引擎（百度，搜狗，有道，DeepL），
;只能选择其中一个为有效语句（行首不写分号），其它的设为注释（行首写英文分号）。
;#Include <BaiduTranslator>	;百度
;#Include <SogouTranslator>   	;搜狗
;#Include <YoudaoTranslator>	;有道
;#Include <DeepLTranslator>   	;DeepL
```

比如说博主要使用**DeepL翻译**，那博主就删掉对应行的“;”

```
;选择翻译引擎：下面四行代码分别代表四个翻译引擎（百度，搜狗，有道，DeepL），
;只能选择其中一个为有效语句（行首不写分号），其它的设为注释（行首写英文分号）。
;#Include <BaiduTranslator>	;百度
;#Include <SogouTranslator>   	;搜狗
;#Include <YoudaoTranslator>	;有道
#Include <DeepLTranslator>   	;DeepL
```

### 自动翻译

点击**Poedit**里的“查看”选项里的“未翻译条目优先“。然后运行”PoTranslator运行.cmd“使用**PoTranslator**自动翻译_wp-statistics-zh_CN.po_文件。翻译完成之后，ctrl+A选择所有文本，点击**Poedit**左上角的“编辑”选项，选择“翻译需要处理”，取消所有显示为黄色警告的翻译。然后点击左上角的“文件”选项，选择“编译为MO”，保存文件名为_wp-statistics-zh_CN.mo_。

### 上传文件

进入...`/wp-content/languages/plugins/`里面上传_wp-statistics-zh_CN.po_和_wp-statistics-zh_CN._mo。刷新后台页面就大功告成😊