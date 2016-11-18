(function($) {
    $.fn.mindmap = function(options) {
        options = $.extend({
            attract: 15,
            repulse: 6,
            damping: 0.55,
            timeperiod: 10,
            wallrepulse: 0.4,
            mapArea: {
                x: -1,
                y: -1
            },
            canvasError: 'alert',
            minSpeed: 0.05,
            maxForce: 0.1,
            showSublines: false,
            updateIterationCount: 20,
            showProgressive: true,
            centreOffset: 100,
            timer: 0
        }, options);
        return this.each(function() {
            this.nodes = [];
            this.lines = [];
            this.options = options;
            // initial canvas size
            if (options.mapArea.x === -1) {
                options.mapArea.x = $(this).width();
            }
            if (options.mapArea.y === -1) {
                options.mapArea.y = $(this).height();
            }
            var canvas = $('<canvas width="' + options.mapArea.x + '" height="' + options.mapArea.y + '"></canvas>');
            $(this).prepend(canvas);
            this.canvas = canvas[0];
            // canvas.width = options.mapArea.x;
            // canvas.height = options.mapArea.y;
            // $(this).append(canvas);
            // this.canvas = canvas;
        })

    }
})(jQuery);