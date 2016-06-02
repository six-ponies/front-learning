##JS事件代理
大家或多或少得听说过，或者见过“事件代理”这个名词，但是未必知道“事件代理”真正的意义。就拿我自己来说，我在自学JS事件的时候，碰到过无数次，但是每次都被我忽视掉了。赶巧，今天在复习前段时间写的Zepto event 注释又看到了这个陌生的老朋友。这次我多了一个心眼（看来学技术还是多点“小心眼”啊）：这个“事件代理”究竟是何方神圣，为什么人们一次次的提到它？

为了理清楚这个问题，我们首先来看如下代码：
(例子借鉴了[David Walsh](https://davidwalsh.name/event-delegate)的文章，英文好的可以看看）
```
<ul class="no-delegation">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<button id="no-delegation-adder">add li to no-delegation</button>

<ul class="delegation">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<button id="delegation-adder">add li to delegation</button>

```
假设我们有上述一段html代码，现在我们需要给每个li标签添加一个点击事件，代码如下：

```
var noDelegation = document.getElementsByClassName('no-delegation'),
    noDelegationChildren = noDelegation[0].getElementsByTagName('li');
for(var i = 0; i < noDelegationChildren.length; i ++) {
    noDelegationChildren[i].addEventListener('click', function (event) {
        console.log('No-delegation list item ' + event.target.innerText + ' was clicked!');
    })
}
// 当点击“add li to no-delegation”按钮时，给no-delegation内添加li元素
noDelegationAdder.addEventListener('click', function(event) {
    ++noDelegationLength;
    var liString = '<li id="list-' + noDelegationLength + '">' + noDelegationLength + '</li>';
    // 如果只是添加了li元素而没有重新绑定事件，新的li元素将不会有点击效果
    noDelegation[0].insertAdjacentHTML('beforeend', liString);

    // 为了使新加的标签同样具有点击效果，我们需要重新给新添加的绑定事件
    document.getElementById('list-' + noDelegationLength).addEventListener('click', function(event) {
        console.log('No-delegation list item ' + event.target.innerText + ' was clicked!');
    })
})

```
看起来没有什么问题，对不对？不对！
万一我要动态地、频繁的增加li标签或者减少li标签，该怎么办？
是不是需要频繁的绑定是件或者移除事件？是的，就像上面的代码中写的：每次添加一个LI元素，就必须再给这个新的元素绑定一次事件。这是不是很麻烦？有没有更简便的办法？？ 有，当然有！使用“事件代理”！！

最简单的解决办法就是：当li元素事件冒泡到其的父元素ul时，我们执行事件处理函数，但是在事件处理函数中，我们首先判断下事件的来源是不是li元素，代码如下：

```
var Delegation = document.getElementsByClassName('delegation'),
    DelegationChildren = Delegation[0].getElementsByTagName('li'),
    DelegationLength = DelegationChildren.length,
    DelegationAdder = document.getElementById('delegation-adder');
// 给父元素添加事件
Delegation[0].addEventListener('click', function(event) {
    // 判断被事件源是否是 “LI” 标签
    if(event.target && event.target.nodeName == "LI") {
        console.log('Delegation list item ' + event.target.innerText + ' was clicked!');
    } 
}, false)

DelegationAdder.addEventListener('click', function(event) {
    ++noDelegationLength;
    var liString = '<li id="list-' + noDelegationLength + '">' + noDelegationLength + '</li>';
    // 此处只需要添加了li元素，而不需要重新绑定事件，新的li元素都会有点击效果
    Delegation[0].insertAdjacentHTML('beforeend', liString);
})

```
与之前的代码不同，此处我们只是给“LI”元素的父元素添加了事件，但是我们在事件处理函数中判断了该事件触发时的事件源是否是我们需要“LI”元素，如果正好能匹配的上，则相应接下来的代码，否则就什么都不做。例子很简单，但是通过了这个简单的例子，我们简化了事件绑定时繁琐操作，尤其是在需要动态操作DOM结构的时候。（以上例子在chrome浏览器上测试过，可以直接使用。也可以直接拷贝event-delegation.html中的代码测试）

#Zepto中的“事件代理”
看过了简单的“事件代理”，我们再来看看Zepto是如何实现“事件代理”的。

```
$.fn.on = function(event, selector, data, callback, one) {
    var autoRemove, delegator, $this = this

    /* 此处省略若干行代码 */

    return $this.each(function(_, element) {
        // 如果是一次性事件，则先删除该事件，然后执行一次该事件
        if (one) autoRemove = function(e) {
            remove(element, e.type, callback)
            return callback.apply(this, arguments)
        }

        /* 如果定义了选择器，则定义一个代理，保证了事件在匹配该selector选择器的元素内的子元素上被触发时才会执行事件处理函数。事件冒泡到element的时候，判断离事件源最近的能匹配selector的父辈元素（这个元素必须是element的后代元素)是否存在，如果存在，则对事件进行一定的封装后执行事件处理函数，否则什么都不干 */
        if (selector) delegator = function(e) {
            // 以element为界限,以该事件源为起点，找到最近的能匹配selector的父辈元素
            // closest(selector, [context]) 从元素本身开始，逐级向上级元素匹配，并返回最先匹配selector的元素。
            // 如果给定context节点参数，那么只匹配该节点的后代元素
            var evt, match = $(e.target).closest(selector, element).get(0)
                // 如果找到了match，并且不等于element
            if (match && match !== element) {
                // 创建一个代理事件，并为该事件对象扩展currentTarget和liveFired属性
                evt = $.extend(createProxy(e), {
                    currentTarget: match,
                    liveFired: element
                })

                // slice.call(arguments, 1)就是Array.prototype.slice.call(arguments, 1)，
                // 其作用就是将arguments这个Array-like对象转换成真正的Array对象
                return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
            }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
    })
}
```
上述是Zepto事件绑定函数on的部分代码，因为我们只关注“事件代理”这部分，因此我们把焦点移动到if(selector)这段代码块中。
当我们使用on方法给某个DOM对象绑定事件时，我们可以考虑是否传入selector参数，如果传入该参数，则表明我们需要事件代理，因此if(selector)这段代码会生成一个特殊的事件响应函数delegator。这个delegator会保证我们传入的处理函数在特定的情况下才会被执行。
例如，我们给document这个对象绑定一个click事件：
```
function handler(e){
    console.log(e.target);
}
$(document).on('click', '.test', handler(e))。
```
当我们在文档的任何地方点击鼠标后，事件通过不断的传递，并最终冒泡到document对象上，此时，之前生成的特殊的事件响应函数delegator会被执行。在这个delegator中，它会进行一系列的判断（详情请见代码注解），如果在document与事件源（e.target）存在某个匹配'.test'的元素，则执行我们给定的handler处理函数，否则，什么都不干。需要注意的是，此时出入的参数已经不再是原生的事件对象，而是经过一层包装后的对象。