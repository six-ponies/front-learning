'use strict';
// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    // Bounds for smallest/largest possible scale to apply to content
    width: "100%",
    height: "100%",
    margin: 0.2,
    minScale: 1,
    maxScale: 1,
    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || "linear", // default/cube/page/concave/zoom/linear/fade/none

    // Parallax scrolling
    // parallaxBackgroundImage: "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg",
    // parallaxBackgroundSize: "2100px 900px",

    // Optional libraries used to extend on reveal.js
    dependencies: [{
        src: "../../bower_components/reveal.js/lib/js/classList.js",
        condition: function() {
            return !document.body.classList;
        }
    }, {
        src: "../../bower_components/reveal.js/plugin/markdown/marked.js",
        condition: function() {
            return !!document.querySelector("[data-markdown]");
        }
    }, {
        src: "../../bower_components/reveal.js/plugin/markdown/markdown.js",
        condition: function() {
            return !!document.querySelector("[data-markdown]");
        }
    }, {
        src: "../../bower_components/reveal.js/plugin/highlight/highlight.js",
        async: true,
        callback: function() {
            hljs.initHighlightingOnLoad();
        }
    }, {
        src: "../../bower_components/reveal.js/plugin/zoom-js/zoom.js",
        async: true,
        condition: function() {
            return !!document.body.classList;
        }
    }, {
        src: "../../bower_components/reveal.js/plugin/notes/notes.js",
        async: true,
        condition: function() {
            return !!document.body.classList;
        }
    }]
});

$.fn.rdo = function() {

    return $(this).each(function(k, v) {

        var $this = $(v);
        if ($this.is(':radio') && !$this.data('radio-replaced')) {

            // add some data to this checkbox so we can avoid re-replacing it.
            $this.data('radio-replaced', true);


            // create HTML for the new checkbox.
            var $l = $('<label for="' + $this.attr('id') + '" class="radio"></label>');
            var $p = $('<span class="pip"></span>');

            // insert the HTML in before the checkbox.
            $l.append($p).insertBefore($this);
            $this.addClass('replaced');

            // check if the radio is checked, apply styling. trigger focus.
            $this.on('change', function() {

                $('label.radio').each(function(k, v) {

                    var $v = $(v);
                    if ($('#' + $v.attr('for')).is(':checked')) {
                        $v.addClass('on');
                    } else {
                        $v.removeClass('on');
                    }

                });

                $this.trigger('focus');

            });

            $this.on('focus', function() {
                $l.addClass('focus');
            });
            $this.on('blur', function() {
                $l.removeClass('focus');
            });



            // check if the radio is checked on init.
            $('label.radio').each(function(k, v) {

                var $v = $(v);
                if ($('#' + $v.attr('for')).is(':checked')) {
                    $v.addClass('on');
                } else {
                    $v.removeClass('on');
                }

            });

        }

    });

};


$(function() {
    $(':radio').rdo();
    $('label.radio').click(function() {
        var target = $(this).attr('for');
        var alignType = $('#' + target).val();
        var variable = $('#variableMonkey');
        variable.css('vertical-align', alignType);
        $('#alignType').text('vertical-align: ' + alignType);
    })
    $('#lineHeightRange').on('change', function() {
        var lineHeight = $(this).val(),
            container = $(this).parent(),
            ghostPadding = container.children('.ghost-padding');
        $('#lineHeightValue').text(lineHeight);
        ghostPadding.css('line-height', lineHeight + 'px');
        console.log(ghostPadding.css('font-size'));
    })
})