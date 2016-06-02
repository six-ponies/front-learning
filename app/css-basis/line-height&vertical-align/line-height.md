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
<style type="text/css">
    .text{
            font-size: 20px;
        }
        .text > div{
            display: inline-block;
            width: 30%;
            
        }
        .text > .tall-height{
            line-height:2;
            margin: 0 2.5%;
        }
        .text > .normal-height{
            line-height:1;
            margin-right: 2.5%;
        }
        .text > .short-height{
            line-height:0.5;
            margin-left: 2.5%;
        }
        .line{
            position: relative;
            z-index: 10;
            display: inline-block;
            width: 100%;
            margin-right: -100%;
            border: 0;
            border-top: 1px solid #fff;
        }
        .line.dotted{
            border-style: dotted; 
        }
        .line.red{
            border-color: red;
        }
        .line.green{
            border-color: #32cd32;
        }
        .line.blue{
            border-color: blue;
        }

        .text .top{
            vertical-align: top;
        }
        .text .bottom{
            vertical-align: bottom;
        }
        .text .text-top{
            vertical-align: text-top;
        }
        .text .text-bottom{
            vertical-align: text-bottom;
        }
        .text .middle{
            display: inline-block;
            vertical-align: middle;
        }
        .text .baseline{
            vertical-align: baseline;
        }
        .center{
            display: inline-block;
            width: 100%;
            text-align: center;
        }
</style>
<div class="text">
    <div class="normal-height">
        <span class="line dotted red top"></span><!-- 
        --><span class="line dotted red bottom"></span><!-- 
        --><span class="line dotted green text-top"></span><!-- 
        --><span class="line dotted green text-bottom"></span><!-- 
        --><span class="line dotted blue baseline"></span><!-- 
        --><span class="center">aAÄ qQ</span>
    </div><!-- 
    --><div class="tall-height">
        <span class="line dotted red top"></span><!-- 
        --><span class="line dotted red bottom"></span><!-- 
        --><span class="line dotted green text-top"></span><!-- 
        --><span class="line dotted green text-bottom"></span><!--
        --><span class="line dotted blue baseline"></span><!--  
        --><span class="center">aAÄ qQ</span>
    </div><!-- 
    --><div class="short-height">
        <span class="inline-overlay">
            <span class="line dotted red top"></span><!-- 
            --><span class="line dotted red bottom"></span>
        </span><!-- 
        --><span class="line dotted green text-top"></span><!-- 
        --><span class="line dotted green text-bottom"></span><!-- 
        --><span class="line dotted blue baseline"></span><!-- 
        --><span class="center">aAÄ qQ</span>
    </div>
</div>
