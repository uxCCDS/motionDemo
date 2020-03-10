(function () {
    var getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        return r != null ? decodeURI(r[2]) : null;
    };

    var motion = function () {
        this.init();
    };
    motion.prototype = {
        init: function () {
            var t0 = 0,
                t1 = 330,
                t2 = 700,
                t3 = 1030;
            var m = mframe(this.button(0, t0));
            m.add(this.button(1, t1));
            m.add(this.appear(0, t0));
            m.add(this.appear(1, t1));
            m.add(this.appear(2, t2));
            m.add(this.appear(3, t3));
            m.add(this.controls(t2-20));
            this.M = m;
        },
        controls: function (t0) {
            var frames = [
                    { attr: { 'stroke-dashoffset': '190' }, time: t0 },
                    { attr: { 'fill-opacity': '0.0' }, time: t0 + 20 },
                    { attr: { 'fill-opacity': '0.16' }, time: t0 + 30 },
                    { attr: { 'stroke-dashoffset': '0' }, tween: 'easeInOut', time: t0 + 30 },
                    { css: { 'opacity': '1.0' }, time: t0 + 290 },
                    { css: { 'opacity': '0.0' }, time: t0 + 320 }
                ],
                t2;
            for (var i = 0; i < 2; i++) {
                t2 = t0 + 30 + 60 * i;
                frames.push({ attr: { 'fill-opacity': '0.32' }, time: t2 + 60 });
                frames.push({ attr: { 'fill-opacity': '0.16' }, time: t2 + 120});
            }
            return [{
                dom: document.getElementById('controls'),
                frames: frames
            }, {
                dom: [document.getElementById('btnVideo'),document.getElementById('btnMute')],
                frames: [
                    { css: { 'opacity': '0.0' }, time: t0 + 20 },
                    { css: { 'opacity': '1.0' }, time: t0 + 30 },
                    { css: { 'opacity': '1.0' }, time: t0 + 310 },
                    { css: { 'opacity': '0.0' }, time: t0 + 320 }
                ]
            }];
        },
        button: function (index, t0) {
            var outer = document.getElementById('buttonOuter' + index),
                inner = document.getElementById('buttonInner' + index);
            var innerFrames = [
                { attr: { fill: '#D2D5D6', height: '5.0', rx: '2.5', y: 219, 'stroke-width': '0.0' }, time: t0 },
                { attr: { fill: '#F2F4F5', height: '16.0', rx: '8.0', y: 211.5, 'stroke-width': '1.0' }, time: t0 + 10 },
                { attr: { fill: '#F2F4F5', height: '16.0', rx: '8.0', y: 211.5, 'stroke-width': '1.0' }, time: t0 + 290 },
                { attr: { fill: '#D2D5D6', height: '5.0', rx: '2.5', y: 219, 'stroke-width': '0.0' }, time: t0 + 300 }
            ],
                outerFrames = [
                    { attr: { height: '5.0', rx: '2.5', y: 219, 'stroke-width': '0.0' }, time: t0 },
                    { attr: { height: '19.0', rx: '9.5', y: 210, 'stroke-width': '4.0' }, time: t0 + 10 },
                    { attr: { height: '19.0', rx: '9.5', y: 210, 'stroke-width': '4.0' }, time: t0 + 290 },
                    { attr: { height: '5.0', rx: '2.5', y: 219, 'stroke-width': '0.0' }, time: t0 + 300 }
                ],
                t2;
            for (var i = 0; i < 3; i++) {
                t2 = t0 + 10 + i * 96;
                outerFrames.push({ attr: { 'stroke-width': '4.0' }, css: { opacity: '0.5' }, time: t2 });
                outerFrames.push({ attr: { 'stroke-width': '8.0' }, css: { opacity: '0.8' }, tween: 'easeInOut', time: t2 + 40 });
                outerFrames.push({ attr: { 'stroke-width': '8.0' }, css: { opacity: '0.8' }, tween: 'easeInOut', time: t2 + 56 });
                outerFrames.push({ attr: { 'stroke-width': '4.0' }, css: { opacity: '0.5' }, tween: 'easeInOut', time: t2 + 96 });
            }
            return [{
                dom: inner,
                frames: innerFrames
            }, {
                dom: outer,
                frames: outerFrames
            }];

        },
        appear: function (index, t0) {
            var con = document.getElementById('pop' + index),
                tri = document.getElementById('popTri' + index),
                p = document.getElementById('popP' + index);
            var conFrames = [
                { css: { opacity: '1.0' }, time: t0 + 290 },
                { css: { opacity: '0.0' }, time: t0 + 300 }
            ];
            for (var i = 0; i < 5; i++) {
                conFrames.push({ css: { transform: 'translateY(0.0px)' }, time: t0 + i * 60, tween: 'easeInOut' });
                conFrames.push({ css: { transform: 'translateY(8.0px)' }, time: t0 + i * 60 + 30, tween: 'easeInOut' });
                conFrames.push({ css: { transform: 'translateY(0.0px)' }, time: t0 + i * 60 + 60, tween: 'easeInOut' });
            }
            var conArg = { dom: con, frames: conFrames };
            return [
                conArg,
                {
                    dom: tri,
                    frames: [
                        { css: { opacity: '0' }, attr: { transform: 'scale(1,0)' }, time: t0 },
                        { css: { opacity: '1.0' }, time: t0 + 6 },
                        { attr: { transform: 'scale(1,1.0)' }, tween: 'easeInOut', time: t0 + 6 }
                    ]
                }, {
                    dom: p,
                    frames: [
                        { css: { transform: 'scale(0.0)' }, time: t0 + 5 },
                        { css: { transform: 'scale(1.0)' }, tween: 'easeInOut', time: t0 + 20 },
                        { css: { color: 'rgba(255,255,255,0)' }, time: t0 + 17 },
                        { css: { color: 'rgba(255,255,255,1)' }, time: t0 + 20 },
                    ]
                }];
        }
    };

    // get args -> render text

    // animation 

    window.onload = function () {
        var m = new motion();
        m.M.play();
    };

})();
