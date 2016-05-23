## 'var' VS 'let'
原问题： [“let” keyword vs “var” keyword](http://stackoverflow.com/questions/762011/let-keyword-vs-var-keyword)
最近在使用React webpack generator的时候， 发现他们的代码里面用的比较多一个关键字是let，但是我之前一直使用的是var关键字。借这个机会好好总结下 'var' 和 'let'

# 全局

```
// 在全局作用域中，两者是类似的，但是通过var定义的变量会给全局对象（例如window对象）添加一个相应的属性，而通过let定义的不会
let x = 'global';     // 全局作用域
var y = 'global';     // 全局作用域
console.log(this.x);  // global
console.log(this.y);  // undefined

```
# 函数

```
// 在整个函数的最外层，两者的作用域是一致的
function do_something() {
    let x = '1'; // 作用于整个函数
    var y = '2'; // 作用于整个函数
    if(true){
        console.log(x); // 1
        console.log(y); // 2
    }
    console.log(x);     // 1
    console.log(y);     // 2
}
// 在var定义前使用变量会显示未定义
function do_something_var() {
    console.log(y); // undefined
    var y = 2;
}
// 在let定义前使用变量会抛出语法错误
function do_something_let() {
    console.log(x); // SyntaxError thrown
    let x = 1;
}
    
```

# 块级作用域:

```
function varTest() {
  var x = 31;
  if (true) {
    var x = 71;  // same variable!
    console.log(x);  // 71
  }
  console.log(x);  // 71
}

function letTest() {
  let x = 31;
  if (true) {
    let x = 71;  // different variable
    console.log(x);  // 71
  }
  console.log(x);  // 31
}

```

# for 循环

```
// for循环内定义的变量在for循环外无法访问
for (let i = 0; i < 10; i++) {
    console.log(i); // 0, 1, 2, 3 ... 9
}
console.log(i); // i is not defined

// 匿名函数内部的i指向同一块内存对象
for(var i = 0; i < 10; i++) {
    setTimeout(function(){console.log(i)}, 1000); // 10, 10, 10, 10, 10 ... 10
}
// 匿名函数内部的i指向了不同的内存对象
for(let i = 0; i < 10; i++) {
    setTimeout(function(){console.log(i)}, 1000); // 0, 1, 2, 3, 4 ... 9
}

```