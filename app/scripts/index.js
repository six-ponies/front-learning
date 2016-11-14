'use strict';
$(document).ready(function() {
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
});