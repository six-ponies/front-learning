##行高 (line-height) 定义
上下文本行的基线之间的垂直距离。

##行内格式化上下文 (inline formatting contexts)
```
<p>Several <em>emphasized words</em> appear<strong>in this</strong> sentence, dear.</p>
```
上面这段代码包含了4种盒子：
1、内容区域 (content area)：一种围绕文字看不见的盒子。其大小与文字字体和字体大小有关。
2、内联盒子 (inline boxes)：文字外部包含inline水平标签的盒子为内联盒子，没有包含任何标签的为匿名内联盒子，如“Several”、“appear”、“sentence, dear.”就是匿名内联盒子。
3、行框盒子 (line boxes)：内联盒子排成一行组成一个行框盒子（行框盒子是由内联盒子组成的）如果上述文字能在一行排下，就是一个行框盒子，如果排成两行，就是两个行框盒子，以此类推。
4、包含盒子 (containing box)：包含盒子中包含了一行一行的行框盒子。上面的p标签就是一个包含盒子。
更详细的定义可以参见[W3C Recommendation](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)

##高度计算

###行高（line-height）
行高(line-height) = 内容区域(content-area)高度 +  行间距(leading)
需要注意的是：*内容区域(content-area)不一定等于字体大小(font-size)。据我所知，"STHeiti"，"simsun"字体的大小与内容区域一致。*

###行框（line box）高度
行框盒子(line box)的高度由如下决定：
1、首先，计算行框盒子(line box)内的每个内联水平(inline-level)盒子（包括了内联盒子和内联块）的高度。对于可替换元素(replaced elements, such as "img")，内联块(inline-block)和内嵌表格(inline-table)，他们的高度就是他们的边框盒（margin box）的高度。对于内联盒子（inline boxes），高度就是他们的行高（line-height）。
*有一点需要注意，对于内联盒子来说，它的行高在浏览器中是看不见的，有时候我们会忽略它的存在*
2、其次，内联水平盒子会根据各个“vertical-align”属性被垂直对齐起来。由于CSS2.1并没有规定行框盒子（line box）基线（baseline）的位置，因此，如果只是简单的按照将内联水平盒子垂直对齐起来，将会有很多种不同的表现形式，所以这里的对齐需要满足一个条件，那就是所有内联水平盒子对齐后，包含他们的行框盒子的高度必须是所有情况中最小的高度。
3、最后，行框盒子的高度就是所有盒子中最高上边框与最低下边框之间的距离。

可以参见[W3C Recommendation Line height calculations: the 'line-height' and 'vertical-align' properties](https://www.w3.org/TR/CSS2/visudet.html#line-height)

##行高（line-height）属性

###normal
默认属性值，告诉浏览器自己来决定行高，与元素字体关联。

###number
用数值作为行高值。计算方法：当前元素字体大小（font-size） * number
假设当前元素样式为：style="font-size: 20px;line-height: 1.5"，
则其行高line-height = 1.5 * 20px = 30px;

###length
使用具体长度值作为行高值。如：
line-height: 1.5em;
line-height: 1.5rem;
line-height: 30px;
line-height: 30pt; 

###percentage
使用百分比作为行高值。如：
line-height: 150%;
假设当前元素样式为：style="font-size: 150%;line-height: 1.5"，
则其行高line-height = 150% * 20px = 30px;

###inherit
行高可以继承。

###line-height:1.5,line-height:150%,line-height:1.5em的区别？？
line-height: 1.5， 所有可继承元素根据当前元素的font-size重新计算行高；
line-height: 150%/1.5em，当前元素根据font-size计算行高，后代元素如果继承行高，则就是此时的行高。



