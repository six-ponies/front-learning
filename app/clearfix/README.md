# front-test
This is a collection of cleafix tricks
在这个文件夹里包含了各种用于清除浮动的前端样式
[可以参见张大神的这篇文章](http://www.zhangxinxu.com/wordpress/2010/01/%E5%AF%B9overflow%E4%B8%8Ezoom%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E7%9A%84%E4%B8%80%E4%BA%9B%E8%AE%A4%E8%AF%86/）

# 清除浮动的方法大致可以分为两类：一类是通过clear属性清除，另一类是通过“包裹”这个特性清除
1、通过clear清除的方法可以参见clearfix.html文件中中的第一种和第二种方法
2、“包裹”这一特性让我们联想到 “浮动定位”、 “绝对定位”、 “inline-block”、 “overflow”等，clearfix.html中的后几个就是用的这种方法清除浮动