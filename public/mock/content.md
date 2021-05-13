# SVG制作蒙层图片应用教程
SVG是一种图像文件格式，英文全称Scalable Vector Graphics，意思为可缩放的矢量图形。它是基于XML，W3C联盟进行开发的。严格来说应该是一种开放标准的矢量图形语言，可让你设计激动人心的、高分辨率的Web图形页面。用户可以直接用代码来描绘图像，可以用任何文字处理工具打开SVG图像，通过改变部分代码来使图像具有交互功能，并可以随时插入到HTML中通过浏览器来观看。

如果对svg不了解的话建议先访问以下两个链接学习:
[W3school SVG](https://www.w3school.com.cn/svg/index.asp)
[MDN SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg)

svg蒙层图片，效果很简单，就如本博客列表页左侧栏显示的图标:

<img src="https://s1.ax1x.com/2020/06/23/NN8onJ.png">

具体思路步骤:
1、一个容器放入svg，指定svg画布大小
2、svg以一张图片作为底图
3、svg中的图片加上一层mask作为蒙层
4、类似ps一样，蒙层占满画布，最后把中间掏成需要的形状就OK

## 具体实现例子

第一步：指定一个w124 h100的容器，然后设置svg画布，插入我们的image图片，svg中的image不能用src引入所以这里使用href形式，而这里引入的是本地静态资源图片于是乎要用require导入。

所以href的参数是require('@/assets/images/' + imageName + '.jpg')


```
<svg width="100%" height="100%" viewBox="0 0 124 100">
 <image x="0" y="0" height="100%" width="100%"
   :href="require('@/assets/images/' + imageName + '.jpg')"/>
</svg>
```


第二步：接下来就是我们的蒙层mask了，svg中使用他需要在<defs>中定义<mask>并且设定id，蒙层中黑色区域为不可视，白色区域为可视。

所以接下来我们需要一个矩形区域填充为黑色，圆形定义好圆心半径后将区域填充为白色。

最后在需要蒙版的image元素上添加mask="url(#id)"就完成了


```
<svg width="100%" height="100%" viewBox="0 0 124 100">
 <defs>
<mask id="mask_test">
     <rect x="0" y="0" width="100" height="124" fill="#000">
     </rect>
     <circle cx="62" cy="50" r="50" fill="#fff">
     </circle>
   </mask>
 </defs>
 <image x="0" y="0" height="100%" width="100%"
   :href="imageSrc" mask="url(#mask_test)"/>
</svg>
```


## 引用列表
> 引用1
> 引用2
快捷键：Ctrl+Alt+Shift+.
智能双击：双击>号可选中整段引用列表
智能回车：行尾回车或行中Ctrl+Enter强制换行后会自动续列表；连续按回车会清除列表符；在列表符后回车或行尾Shift+回车，上一行留出列表符

## 文字样式语法
**加粗** 【快捷键：Ctrl+B，支持多光标；Emmet：b后敲Tab】
__加粗2__
_倾斜_【Emmet：i后敲Tab；前后包围：选中文字按Ctrl+\是在选区两侧添加光标，可以继续输入_】
*倾斜*
~~删除线~~
``` 单行代码 ```
包围插入：先选中文字内容，然后按_*~`等符号，会自动在2侧加包围
智能双击：双击语法区前面的定义符号，选中包含定义符的整段文字
去包围：选中整段文字后，按Ctrl+Shift+]，可去除2侧包围符号

引号括号虽然不属于markdown语法，但也支持相同的包围、选择、去包围操作。
引号括号智能双击选择时略特殊的是：双击引号括号内侧，选中引号括号里的内容(不含引号括号)；按下Alt+双击引号括号内侧，则选中包含符号的整段文字

HBuilderX还支持以下对2侧文本高效处理的手段
1. 选中文字按Ctrl+\是在选区两侧添加光标，可以继续输入~~，会在2侧同时输入
2. 向2侧扩大选择：【Win:Alt+Shit+→ 、Mac:Ctrl++Shit+→】；由2侧向内减少选择：【Win:Alt+Shit+← 、Mac:Ctrl++Shit+←】

[链接文字](http://dcloud.io)
1. Emmet：a后敲Tab
2. 打开链接：Alt+鼠标单击；如果是本地文件，可通过Shift+Alt+单击，在另一分栏打开文件
3. 智能粘贴：粘贴URL会自动变成超链接格式；粘贴本地文件进来也会自动创建引用链接
4. 智能双击：双击语法区开头，即[左侧，选中包含定义符的整段文字

1. Emmet：img后敲Tab
2. 智能粘贴：粘贴剪切板里的图形时会自动保存为本md文档的附件；删除文档中的图片语法，保存md文档时会自动删除对应的图片附件；粘贴图片文件时自动变成链接引用格式；
3. 悬浮预览：鼠标移到图片语法上，本地图片会自动显示出来
4. 智能双击：双击语法区开头，即!左侧，选中包含定义符的整段文字

## 表格

|		|		|		|
|--	|--	|--	|
|		|		|		|
|		|		|		|

1. Emmet：table3*3后敲Tab，表示生成3行3列的表格，行首生效
2. md表格对齐是传统md的痛点，按下Ctrl+K可以自动整理表格格式（暂未兼容不同缩放模式和字体的情况）
3. 支持从excel、wps、word、number的表格中复制粘贴表格进来（不支持合并单元格和单元格换行）

## 分割线
------------- 【Emmet：hr后敲Tab】
*************
=============

## 代码区
### test
### test
### test
### test
``` javascript
  var a = document
```
Emmet：code后敲Tab，行首生效
智能双击：双击语法区开头，即!左侧，选中包含定义符的整段文字
支持代码直接高亮着色，这应该是只有HBuilderX才有的功能。注意需要在代码区开头指定语言类型

## 注释
<!--注释-->
快捷键：Ctrl+/
智能双击：双击注释首尾的定义符，选中整段注释

## 其他emmet快捷输入
day后敲Tab，当前日期。注意day需在行首或前面有空格
time后敲Tab，当前时间。注意time需在行首或前面有空格

## 文档结构图
文章很长时，word里有文档结构图，HBuilderX也有。
菜单视图-文档结构图，快捷键Alt+W(mac是ctrl+W)，轻松管理长文档

## 运行、预览和打印PDF
对md文件点工具栏或菜单里的浏览器运行，可以使用外部浏览器预览此md文件，会自动渲染为HTML。
点右上角的预览【快捷键Alt+p】，可在HBuilderX右侧预览该md文档的HTML渲染结果。
在浏览器中点打印，选择打印到PDF，可将md输出为PDF格式。（注意在打印选项里去掉页眉页脚）

## 其他常用但你可能不知道的快捷操作技巧
- Ctrl+鼠标左键添加多光标，然后敲字或粘贴，可批量处理。Ctrl+鼠标左键拖选，可选中多个选区。
- Ctrl+鼠标右键删除多光标
- 不选内容按Ctrl+C或X可复制或剪切整行
- 选中2个选区后，按Ctrl+Shift+X，可互换选区内容。如无选区，只是2个光标，则互换2行
- Ctrl+上下键可上下移动行
- Ctrl+Insert可重复插入当前行，如果有选中内容，可重复插入选中内容
- Ctrl+Shift+K可合并多行（是格式化Ctrl+K的反操作）
- 删除
  * 按Ctrl+D可删除选中行，支持多光标
  * Shift+Del删除到行尾
  * Shift+Backspace删除到行首
- 选择
  * Ctrl+E选相同词(mac是Command+D)，连续按可选中多词进一步操作，比替换更方便
  * Ctrl+L可连选多行，Ctrl+Shift+L也是选择行，但不选行首尾的空白字符
  * Ctrl+=可逐级放大选区
  * 双击标题、列表符可选中相应段落
  * 双击英文引号、括号内侧，可选中内部内容
  * 双击缩进符，可选中同缩进段落
  * 双击连字符比如-或_，可选中相连的词，比如双击这里试试，uni-app
- 查找
  * Ctrl+P查找文件
  * Ctrl+Alt+F可在当前目录的所有文档中搜索指定关键字(mac是Command+Shift+f)
  * 选中文字按F3，查找下一个，Shift+F3找上一个
- 云同步：HBuilderX+markdown用于云同步笔记的技巧，请参考[http://ask.dcloud.net.cn/article/13097](http://ask.dcloud.net.cn/article/13097)

都学会了吗？
markdown语法其实很简单，认真学半小时就能掌握。
HBuilderX的极客操作则需要不停反复练习，熟练掌握这些技巧，你将成为高效极客！
