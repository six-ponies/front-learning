'use strict';

var colourIndex = 0;
var colours = ['#EE1C25', '#F37022', '#B9BD17', '#72BF44'];

// load the mindmap
// change the colours
$(document).ready(function() {
  var timer = setInterval(function() {
    colourIndex = (colourIndex + 1) % colours.length;
    $('body').css({
      'background-color': colours[colourIndex]
    });
    // $('p,ul').animate({
    //   'color': colours[colourIndex]
    // }, 3000);
  }, 5000);
});

$(document).ready(function() {
  // 从dataBase/struct.json获取文档节点
  $.getJSON('dataBase/struct.json', function(data) {
    var node = data;
    var str = '';

    // 递归遍历所有节点
    function recursive(data) {
      var i = 0;
      str += '<ul>';
      for (var key in data) {
        if (typeof(data[key]) !== 'object') {
          str += ('<li><a href="' + data[key] + '">' + key + '</a>');
        } else {
          str += ('<li><a href="">' + key + '</a>');
          recursive(data[key]);
        }
        str += '</li>';
      }
      str += '</ul>';
    }
    recursive(data);
    $('body').prepend(str);

    // enable the mindmap in the body
    $('body').mindmap();

    // add the data to the mindmap
    var root = $('body>ul>li').get(0).mynode = $('body').addRootNode($('body>ul>li>a').text(), {
      href: '/',
      url: '/',
      onclick: function(node) {
        $(node.obj.activeNode.content).each(function() {
          this.hide();
        });
      }
    });
    $('body>ul>li').hide();

    var addLI = function() {
      var parentnode = $(this).parents('li').get(0);
      if (typeof(parentnode) === 'undefined') {
        parentnode = root;
      } else {
        parentnode = parentnode.mynode;
      }

      this.mynode = $('body').addNode(parentnode, $('a:eq(0)', this).text(), {
        //          href:$('a:eq(0)',this).text().toLowerCase(),
        href: $('a:eq(0)', this).attr('href'),
        onclick: function(node) {
          $(node.obj.activeNode.content).each(function() {
            this.hide();
          });
          $(node.content).each(function() {
            this.show();
          });
          console.log(node.name);
        }
      });
      $(this).hide();
      $('>ul>li', this).each(addLI);
    };

    $('body>ul>li>ul').each(function() {
      $('>li', this).each(addLI);
    });
    $('a').dblclick(function(event) {
      var url = $(event.target).attr('href');
      console.log(url);
      if (url && url.length && url !== '/')
        window.open(url, '_blank');
    });
  });

});