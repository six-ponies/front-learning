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

##行高 (line-height) 高度机制
<p style="background-color:red">yes</p>
