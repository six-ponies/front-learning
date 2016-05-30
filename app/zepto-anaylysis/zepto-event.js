//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;
(function($) {
    var _zid = 1,
        undefined,
        slice = Array.prototype.slice,
        isFunction = $.isFunction,
        isString = function(obj) {
            return typeof obj == 'string'
        },
        handlers = {},
        specialEvents = {},
        focusinSupported = 'onfocusin' in window,
        focus = {
            focus: 'focusin',
            blur: 'focusout'
        },
        hover = {
            mouseenter: 'mouseover',
            mouseleave: 'mouseout'
        }

    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

    function zid(element) {
        return element._zid || (element._zid = _zid++)
    }
    /*
     * 查找元素上事件响应函数集合
     * @param element
     * @param event
     * @param fn
     * @param selector
     * @returns  {Array}
     */
    function findHandlers(element, event, fn, selector) {
        event = parse(event)
        if (event.ns) var matcher = matcherFor(event.ns)
        return (handlers[zid(element)] || []).filter(function(handler) {
            // 判断事件类型是否匹配
            // 判断名称空间是否匹配
            // 判断fn的_zid是否匹配  TODO： 为什么可以这样用？？？
            // 判断选择器是否匹配
            return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector)
        })
    }

    /*
     * 解析事件类型
     * @param event
     * @return {{e:事件类型, ns:名称空间}}
     */
    function parse(event) {
        var parts = ('' + event).split('.')
        return {
            e: parts[0],
            ns: parts.slice(1).sort().join(' ')
        }
    }

    function matcherFor(ns) {
        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
    }
    /*
     * 事件捕获
     * @param handler
     * @param catureSetting
     * @returns boolean
     */
    function eventCapture(handler, captureSetting) {
        return handler.del &&
            (!focusinSupported && (handler.e in focus)) ||
            !!captureSetting
    }

    /*
     * 获取真实事件类型 'mouseenter' => 'mouseover', 'mouseleave' => 'mouseout','focus' => 'focusin',
            'blur' => 'focusout'
     * @param type
     * @returns 
     */
    function realEvent(type) {
        return hover[type] || (focusinSupported && focus[type]) || type
    }

    /*
     * 添加事件方法
     * @param element 需要添加事件的dom对象
     * @param events 需要添加的事件名称
     * @param fn 事件触发后执行的回调函数
     * @param data 事件触发是传入的data属性
     * @param selector 选择器
     * @param delegator 代理 
     * @param capture 捕获阶段还是冒泡阶段触发
     */
    function add(element, events, fn, data, selector, delegator, capture) {
        // 获取唯一id以及与该id关联的处理函数集合
        var id = zid(element),
            set = (handlers[id] || (handlers[id] = []))
        events.split(/\s/).forEach(function(event) {
            // 如果事件是ready，则直接为文档document绑定ready事件
            if (event == 'ready') return $(document).ready(fn)

            // 将event事件名和名称空间分离， 如'click.myc' => {e:'click', ns:'myc'}
            var handler = parse(event)

            handler.fn = fn
            handler.sel = selector

            // TODO: 为什么要模拟鼠标进入和鼠标离开事件？？？
            // emulate mouseenter, mouseleave
            if (handler.e in hover) fn = function(e) {
                var related = e.relatedTarget
                if (!related || (related !== this && !$.contains(this, related)))
                    return handler.fn.apply(this, arguments)
            }

            // 如果代理存在，则将代理做为回调函数
            handler.del = delegator
            var callback = delegator || fn

            handler.proxy = function(e) {
                // 修正event
                e = compatible(e)

                // 如果是阻止事件发生，则之间返回 
                if (e.isImmediatePropagationStopped()) return
                e.data = data

                // 执行回调，context=element, arguments=[e] 或者 [e,e.args] 
                var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))

                // 如果执行结果为false，则阻止事件的默认行为，并阻止事件进一步传播
                if (result === false) e.preventDefault(), e.stopPropagation()
                return result
            }

            // TODO：这一步的作用是为删除事件用？？ (done)
            // 标记这个handler位于数组的什么位置以便于删除
            handler.i = set.length
            set.push(handler)

            // 绑定事件
            // realEvent(handler.e)真实事件类型， handler.proxy代理事件响应函数，eventCapture（handler，capture）默认为false，冒泡
            if ('addEventListener' in element)
                element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
    }

    /*
     * 删除事件
     * @param element 
     * @param events
     * @param fn
     * @param selector
     * @param capture
     */
    function remove(element, events, fn, selector, capture) {
        // 获取对应dom对象上的唯一id
        var id = zid(element);
        (events || '').split(/\s/).forEach(function(event) {
            // 查找相应的事件处理函数，并遍历这个数组
            findHandlers(element, event, fn, selector).forEach(function(handler) {
                // 删除对应的处理函数
                delete handlers[id][handler.i]

                // 解除事件绑定
                if ('removeEventListener' in element)
                    element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
            })
        })
    }

    $.event = {
        add: add,
        remove: remove
    }

    $.proxy = function(fn, context) {
        var args = (2 in arguments) && slice.call(arguments, 2)
        if (isFunction(fn)) {
            var proxyFn = function() {
                return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments)
            }
            proxyFn._zid = zid(fn)
            return proxyFn
        } else if (isString(context)) {
            if (args) {
                args.unshift(fn[context], fn)
                return $.proxy.apply(null, args)
            } else {
                return $.proxy(fn[context], fn)
            }
        } else {
            throw new TypeError("expected function")
        }
    }

    $.fn.bind = function(event, data, callback) {
        return this.on(event, data, callback)
    }
    $.fn.unbind = function(event, callback) {
        return this.off(event, callback)
    }
    $.fn.one = function(event, selector, data, callback) {
        return this.on(event, selector, data, callback, 1)
    }

    var returnTrue = function() {
            return true
        },
        returnFalse = function() {
            return false
        },
        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
        eventMethods = {
            preventDefault: 'isDefaultPrevented',
            stopImmediatePropagation: 'isImmediatePropagationStopped',
            stopPropagation: 'isPropagationStopped'
        }

    /*
     * 修正event对象
     * @params 代理的event对象，原始的event对象
     * @returns 代理的event对象
     */

    function compatible(event, source) {
        // 如果原始event对象不为空，或代理event对象不具有isDefaultPrevented属性，则进行修正
        // TODO：为什么需要做这个修正？？
        if (source || !event.isDefaultPrevented) {
            source || (source = event)

            // 重写preventDefault， stopImmediatePropagation， stopPropagation方法
            // 并为event对象添加isDefaultPrevented，isImmediatePropagationStopped，isPropagationStopped方法
            $.each(eventMethods, function(name, predicate) {
                var sourceMethod = source[name]
                event[name] = function() {
                    this[predicate] = returnTrue
                    return sourceMethod && sourceMethod.apply(source, arguments)
                }
                event[predicate] = returnFalse
            })

            // 如果事件本身被阻止，则让event.isDefaultPrevented能返回true
            // returnValue 已经从web标准中移除，但是有部分浏览器仍然具有该属性
            if (source.defaultPrevented !== undefined ? source.defaultPrevented :
                'returnValue' in source ? source.returnValue === false :
                source.getPreventDefault && source.getPreventDefault())
                event.isDefaultPrevented = returnTrue
        }
        return event
    }

    /*
     * 创建事件代理
     * @param event Event对象
     * @returns {*}
     */

    function createProxy(event) {
        // 存储原始event对象
        var key, proxy = {
            originalEvent: event
        }

        // 复制event对象中的属性到proxy中，ignoreProperties命中的除外
        for (key in event)
            if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

        return compatible(proxy, event)
    }

    $.fn.delegate = function(selector, event, callback) {
        return this.on(event, selector, callback)
    }
    $.fn.undelegate = function(selector, event, callback) {
        return this.off(event, selector, callback)
    }

    $.fn.live = function(event, callback) {
        $(document.body).delegate(this.selector, event, callback)
        return this
    }
    $.fn.die = function(event, callback) {
        $(document.body).undelegate(this.selector, event, callback)
        return this
    }

    /*
     * 扩展Zepto原型方法 on监听事件方法
     * 元素上绑定一个或多个事件
     * @param event事件集 字符串
     * @param selector 代理子选择
     * @param data 需要绑定到事件对象上的参数
     * @param callback 回调函数
     * @param one 用于标记一次性事件
     */
    $.fn.on = function(event, selector, data, callback, one) {
        var autoRemove, delegator, $this = this

        // event是对象{click:fn}
        if (event && !isString(event)) {
            // 遍历event，并继续调用on这个函数
            $.each(event, function(type, fn) {
                $this.on(type, selector, data, fn, one)
            })
            return $this
        }

        // 选择器非字符串， callback非方法，
        // on('click', function(){console.log('yes')},)
        if (!isString(selector) && !isFunction(callback) && callback !== false)
            callback = data, data = selector, selector = undefined
        if (callback === undefined || data === false)
            callback = data, data = undefined

        if (callback === false) callback = returnFalse


        return $this.each(function(_, element) {
            // 如果是一次性事件，则先删除该事件，然后执行一次该事件
            if (one) autoRemove = function(e) {
                remove(element, e.type, callback)
                return callback.apply(this, arguments)
            }

            // 如果定义了选择器，则定义一个代理，保证了事件在匹配该selector选择器的元素内的子元素上被触发时才会执行事件处理函数
            // 事件冒泡到element的时候，判断离事件源最近的能匹配selector的父辈元素（这个元素必须是element的后代元素)是否存在，
            // 如果存在，则对事件进行一定的封装后执行事件处理函数，否则什么都不干
            if (selector) delegator = function(e) {
                // 以element为界限,以该事件源元素为起点，找到最近的能匹配selector的父辈元素
                // closest(selector, [context]) 从元素本身开始，逐级向上级元素匹配，并返回最先匹配selector的元素。
                // 如果给定context节点参数，那么只匹配该节点的后代元素
                var evt, match = $(e.target).closest(selector, element).get(0)
                    // 如果找到了match，并且不等于element
                if (match && match !== element) {
                    // 创建一个代理事件，并为该事件对象扩展currentTarget和liveFired属性，伪装事件的currentTarget就是当前的匹配的父元素
                    // 实际的currentTarget是element所指向的那个元素，也就是这里的liveFired
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

    /*
     * 解除事件绑定
     * @param event
     * @param selector
     * @param callback
     */
    $.fn.off = function(event, selector, callback) {
        var $this = this
        if (event && !isString(event)) {
            $.each(event, function(type, fn) {
                $this.off(type, selector, fn)
            })
            return $this
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false)
            callback = selector, selector = undefined

        if (callback === false) callback = returnFalse

        return $this.each(function() {
            remove(this, event, callback, selector)
        })
    }

    /*
     * 触发事件
     * @param event
     * @param args
     */
    $.fn.trigger = function(event, args) {
        // 修正event对象
        event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)

        // 传递参数
        event._args = args
        return this.each(function() {
            // handle focus(), blur() by calling them directly
            if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
                // items in the collection might not be DOM elements
            else if ('dispatchEvent' in this) this.dispatchEvent(event)
            else $(this).triggerHandler(event, args)
        })
    }

    /*
     * 触发模拟事件，不能冒泡
     * @param event
     * @param args
     */
    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function(event, args) {
        var e, result
        this.each(function(i, element) {
            e = createProxy(isString(event) ? $.Event(event) : event)
            e._args = args
            e.target = element
            $.each(findHandlers(element, event.type || event), function(i, handler) {
                result = handler.proxy(e)
                if (e.isImmediatePropagationStopped()) return false
            })
        })
        return result
    }

    // shortcut methods for `.bind(event, fn)` for each event type
    ;
    ('focusin focusout focus blur load resize scroll unload click dblclick ' +
        'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
        'change select keydown keypress keyup error').split(' ').forEach(function(event) {
        $.fn[event] = function(callback) {
            return (0 in arguments) ?
                this.bind(event, callback) :
                this.trigger(event)
        }
    })

    $.Event = function(type, props) {
        //当type时一个对象时
        if (!isString(type)) props = type, type = props.type

        //创建event对象，bubbles设置为允许冒泡；当type为click，mousedown，mouseup，mousemove时，创建MouseEvents对象
        //TODO: 这里为什么需要单独拎出来？？？    
        var event = document.createEvent(specialEvents[type] || 'Events'),
            bubbles = true

        // 将props对象属性扩展到刚创建的event对象上
        // !!props[name]) 的意思是如果存在props[name]属性，则用该属性（属性值为布尔值，如果不是布尔值则返回true），否则为false
        if (props)
            for (var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])

        // 初始化event事件
        // Event.prototype.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) {};
        event.initEvent(type, bubbles, true)

        return compatible(event)
    }

})(Zepto)