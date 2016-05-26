## JavaScript作用域及提升
原文：[JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
你知道以下的JavaScript代码运行结束后alert出什么值吗？

```
var foo = 1;
function bar() {
    if(!foo) {
        var foo = 10;
    }
    alert(foo);
}
bar();

```
如果‘10’这个答案让你吃惊，那么接下来的这个会让你大跌眼镜：

```
var a = 1;
function b() {
    a();
    a = 10;
    return;
    function a(){console.log('yes')}
}
b();
alert(a);

```
这里，浏览器自然会alert “1”。究竟是为什么呢？？尽管这看起来很奇怪，很危险，也很让人困扰，但这实际上去这么语言一个强大的特性。我不知道对这一行为有没有官方的名字，但是我自己想了一个名字：“提升”。这篇文章将会详细讲解这一特性。在开始之前，我们首先来了解下JavaScript的作用域。

#作用域

大部分初学者对JavaScript的作用域都会感到困惑，原因就是它看起来有点像C以及类似C的语言。考虑下面这段C语言代码：

```
#include <stdio.h>
int main() {
    int x = 1;
    printf("%d", x); // 1
    if(1) {
        int x = 2;
        printf("%d", x); // 2
    }
    printf("%d", x); // 1
}

```
上面这段代码会输出 1， 2， 1，这是因为C语言以及类C语言有一个块级作用域（block-level scope）的概念，但是在JavaScript中，情况就不一样了。考虑下面这段代码：

```
var x = 1;
console.log(x);// 1
if(true) {
    var x = 2; 
    console.log(x); // 2
}
console.log(x); // 2

```
上述代码将会输出 1 ，2 ，2，这是因为JavaScript拥有的是函数水平的作用域（Function-level scope），只有当定义了新的函数，才会创造新的作用域，而像if{}这样的块级，是不会带来新的作用域的。
当然，如果变量定义时用的let关键字，情况又有所变化：
```
var x = 1;
console.log(x);// 1
if(true) {
    let x = 2; 
    console.log(x); // 2
}
console.log(x); // 1

```
所以，原文中提到的js具有函数水平的作用域需要加一个限定，那就是针对用var关键字定义的变量。这一点很重要

#声明，变量和提升

变量声明提升：

```
function foo() {
    bar();
    var x = 1;
}

```
上面的代码会被解释成如下：

```
function() {
    var x;
    bar();
    x = 1;
}

```

实际上，无论声明的那行会不会被执行，变量声明都会被提升，下面的两段代码是等价的

```
function foo() {
    if(false) {
        var x = 1;
    }
    return;
    var y = 1;
}

function foo() {
    var x, y;
    if(false){
        x = 1;
    }
    return;
    y = 1;
}

```

我们可以注意到，变量声明提升时，变量赋值并没有被提升。但是在函数声明时，情况并不是这样的。考虑如下代码：

```
function test() {
    foo(); // TypeError "foo is not a function"
    bar(); // "this will run"
    var foo = function() { // function expression assigned to a local variable 'foo'
        alert("this won't run!");
    }
    function bar() {
        alert("this will run!");
    }
}
test();

```
上面代码等效于：

```
function test() {
    var foo;
    function bar() {
        alert("this will run!");
    }
    foo();
    bar();
    foo = funtion(){
        alert("this won't run!");
    }
}

```
foo 和 bar的差别在于foo是先声明的一个变量，然后给它赋值了一个函数，而bar纯粹是一个函数声明，而纯粹的函数声明是会被提升的。这一点很重要。需要注意如下情况:

```
var baz = function spam() {console.log('yes')}; // named function expression (only 'baz' gets hoisted)
baz(); // valid
spam(); // Uncaught ReferenceError: "spam is not defined"

```

