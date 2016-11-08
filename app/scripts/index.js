'use strict';

// var colourIndex = 0;
// var colours = ['#EE1C25', '#F37022', '#B9BD17', '#72BF44'];

// $(document).ready(function() {
//   var timer = setInterval(function() {
//     colourIndex = (colourIndex + 1) % colours.length;
//     $('body').css({
//       'background-color': colours[colourIndex]
//     });
//   }, 5000);
// });

$(document).ready(function() {
  // 从dataBase/struct.json获取文档节点
  // var data = {
  //   name: 'frontend',
  //   href: '/',
  //   content: '根目录',
  //   children: [{
  //     name: 'html',
  //     href: '/html',
  //     content: 'html',
  //     children: [{
  //       name: 'HTML',
  //       href: 'http//:www.baidu.com'
  //     }, {
  //       name: 'HTML5',
  //       HTML5: 'http//:www.baidu.com'
  //     }]
  //   }, {
  //     name: 'js',
  //     href: '/js',
  //     content: 'js',
  //     children: [{
  //       name: 'css',
  //       href: '',
  //       children: [{
  //         name: 'clearfix',
  //         href: 'css-basis/clearfix/clearfix.html'
  //       }, {
  //         name: 'Line-height and vertical-align',
  //         href: 'css-basis/line-height&vertical-align/line-height&vertical-align.html'
  //       }, {
  //         name: 'display:table-cell',
  //         children: [{
  //           name: '布局神器display:table-cell',
  //           href: 'http://www.520ued.com/article/table-cell'
  //         }, {
  //           name: '我所知道的几种display:table-cell的应用',
  //           href: 'http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/'
  //         }]
  //       }, {
  //         name: 'FlexBox',
  //         children: [{
  //           name: 'A Complete Guide to Flexbox',
  //           href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
  //         }, {
  //           name: 'MDN CSS Flexible Box Layout',
  //           href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout'
  //         }]
  //       }]
  //     }]
  //   }, {
  //     name: 'JavaScript',
  //     children: [{
  //       name: 'JS作用域',
  //       href: 'js-basis/js-scope/js-scope.html'
  //     }, {
  //       name: 'JS最大安全整数',
  //       href: 'https://segmentfault.com/a/1190000002608050'
  //     }, {
  //       name: 'JS == 运算',
  //       href: 'https://zhuanlan.zhihu.com/p/21650547'
  //     }, {
  //       name: 'JavaScript定时器与执行机制解析',
  //       href: 'http://www.alloyteam.com/2016/05/javascript-timer/'
  //     }, {
  //       name: '作用域和上下文',
  //       children: [{
  //         name: 'Understanding Scope and Context in JavaScript',
  //         href: 'http://ryanmorr.com/understanding-scope-and-context-in-javascript/'
  //       }, {
  //         name: '图解Javascript上下文与作用域',
  //         href: 'http://blog.rainy.im/2015/07/04/scope-chain-and-prototype-chain-in-js/'
  //       }, {
  //         name: 'JavaScript. The core',
  //         href: 'http://dmitrysoshnikov.com/ecmascript/javascript-the-core/'
  //       }]
  //     }, {
  //       name: '赋值策略',
  //       children: [{
  //         name: 'ECMA-262-3 in detail. Chapter 8. Evaluation strategy.',
  //         href: 'http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/'
  //       }, {
  //         name: '深入理解JavaScript系列（19）：求值策略(Evaluation strategy)',
  //         href: 'http://www.cnblogs.com/TomXu/archive/2012/02/08/2341439.html'
  //       }]
  //     }]
  //   }, {
  //     name: '前端框架',
  //     children: [{
  //       name: 'AngularJS',
  //       children: [{
  //         name: '理解scope',
  //         children: [{
  //           name: 'Notes On AngularJS Scope Life-Cycle',
  //           href: 'http://onehungrymind.com/notes-on-angularjs-scope-life-cycle/'
  //         }, {
  //           name: '官方文档--Scopes',
  //           href: 'https://docs.angularjs.org/guide/scope'
  //         }, {
  //           name: 'Angle Brackets, Rifle Scopes',
  //           href: 'https://ponyfoo.com/articles/angle-brackets-rifle-scopes'
  //         }, {
  //           name: 'Using scope.$watch and scope.$apply in AngularJS',
  //           href: 'http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply-in-angularjs/15113029#15113029'
  //         }, {
  //           name: 'Authentication in AngularJS (or similar) based application',
  //           href: 'http://espeo.eu/blog/authentication-in-angularjs-or-similar-based-application/'
  //         }]
  //       }, {
  //         name: '理解directive',
  //         children: [{
  //           name: 'Understanding Directives',
  //           href: 'https://github.com/angular/angular.js/wiki/Understanding-Directives'
  //         }, {
  //           name: 'AngularJS内幕详解之 Directive',
  //           href: 'http://www.w3ctech.com/topic/1612'
  //         }, {
  //           name: 'Angular directives - when and how to use compile, controller, pre-link and post-link',
  //           href: 'http://stackoverflow.com/questions/24615103/angular-directives-when-and-how-to-use-compile-controller-pre-link-and-post'
  //         }]
  //       }, {
  //         name: '理解watch',
  //         children: [{
  //           name: 'AngularJS $watch vs $watchCollection',
  //           href: 'http://stackoverflow.com/questions/26535415/angularjs-watch-vs-watchcollection-which-is-better-for-performance'
  //         }]
  //       }]
  //     }, {
  //       name: 'jQuery',
  //       children: [{
  //         name: '回调函数(Callbacks)',
  //         href: 'js-advanced/jquery/callbacks.html'
  //       }, {
  //         name: 'Deferred对象',
  //         href: 'js-advanced/jquery/deferred.html'
  //       }]
  //     }]
  //   }]
  // };
  // var data = {
  //   name: '根目录',
  //   children: [{
  //     name: '二级目录1',
  //     children: [{
  //       name: '三级目录'
  //     }]
  //   }, {
  //     name: '二级目录2'
  //   }]
  // }

  var $body = $('body');

  function createNode(data, parent) {
    var node;
    if (parent) {
      node = $body.addNode(parent, data.name, {
        href: data.href
      });
    } else {
      node = $body.addRootNode(data.name, {
        href: data.href,
      })
    }
    if (data.children && data.children.length > 0) {
      for (var i = 0; i < data.children.length; i++)
        createNode(data.children[i], node);
    }
  }
  $.getJSON('dataBase/1.json', function(data) {

    $('body').mindmap();
    createNode(data);
    $('a').dblclick(function(event) {
      var url = $(event.target).attr('href');
      console.log(url);
      if (url && url.length && url !== '/')
        window.open(url, '_blank');
    });
  });



  // $.getJSON('dataBase/struct.json', function(data) {
  //   var node = data;
  //   var str = '';

  //   // 递归遍历所有节点
  //   function recursive(data) {
  //     var i = 0;
  //     str += '<ul>';
  //     for (var key in data) {
  //       if (typeof(data[key]) !== 'object') {
  //         str += ('<li><a href="' + data[key] + '">' + key + '</a>');
  //       } else {
  //         str += ('<li><a href="">' + key + '</a>');
  //         recursive(data[key]);
  //       }
  //       str += '</li>';
  //     }
  //     str += '</ul>';
  //   }
  //   recursive(data);
  //   $('body').prepend(str);

  //   // enable the mindmap in the body
  //   $('body').mindmap();

  //   // add the data to the mindmap
  //   var root = $('body>ul>li').get(0).mynode = $('body').addRootNode($('body>ul>li>a').text(), {
  //     href: '/',
  //     url: '/',
  //     onclick: function(node) {
  //       $(node.obj.activeNode.content).each(function() {
  //         this.hide();
  //       });
  //     }
  //   });
  //   $('body>ul>li').hide();

  //   var addLI = function() {
  //     var parentnode = $(this).parents('li').get(0);
  //     if (typeof(parentnode) === 'undefined') {
  //       parentnode = root;
  //     } else {
  //       parentnode = parentnode.mynode;
  //     }

  //     this.mynode = $('body').addNode(parentnode, $('a:eq(0)', this).text(), {
  //       //          href:$('a:eq(0)',this).text().toLowerCase(),
  //       href: $('a:eq(0)', this).attr('href'),
  //       onclick: function(node) {
  //         $(node.obj.activeNode.content).each(function() {
  //           this.hide();
  //         });
  //         $(node.content).each(function() {
  //           this.show();
  //         });
  //         console.log(node.name);
  //       }
  //     });
  //     $(this).hide();
  //     $('>ul>li', this).each(addLI);
  //   };

  //   $('body>ul>li>ul').each(function() {
  //     $('>li', this).each(addLI);
  //   });
  //   $('a').dblclick(function(event) {
  //     var url = $(event.target).attr('href');
  //     console.log(url);
  //     if (url && url.length && url !== '/')
  //       window.open(url, '_blank');
  //   });
  // });

});