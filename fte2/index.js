(function () {

    var getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        return r != null ? decodeURI(r[2]) : null;
    };

    var STR = ['Choose your audio option before join.',
        'Connect to a Cisco video device or a Cisco Webex Share device.',
        'Mute your microphone or turn off your video before joining.',
        'If everything looks good, join here.'];

    var TextHelp = function (testDom, text, maxWidth) {
        this.Text = text;
        this.Max = maxWidth || 240;
        this.TestDom = testDom;
        this.init();
    };
    TextHelp.prototype = {
        init: function () {
            this.Txt = this.test(this.Text, ' ');
        },
        build: function ( dom, x0, y0, yPlus) {
            var txt = this.Txt;
            for (var i = 0, l = txt.length; i < l; i++) {
                var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                tspan.setAttribute('x', x0);
                tspan.setAttribute('y', y0 + i * yPlus);
                tspan.textContent =  txt[i];
                tspan.innerHTML =  txt[i];
                dom.appendChild(tspan);
            }
        },
        test: function (str, signal) {
            var arr = str.split(signal),
                ret = [],
                str,
                temp = [];

            while (arr.length > 0) {
                str = arr.shift();
                if (this.lessThen(temp.join(signal) + signal + str)) {
                    temp.push(str);
                } else if (temp.length === 0 && signal !== '') {
                    var _ret = this.test(str, '');
                    temp = [_ret.pop()];
                    ret = ret.concat(_ret);
                } else {
                    ret.push(temp.join(signal));
                    temp = [str];
                }
            }
            ret.push(temp.join(signal));
            return ret;
        },
        lessThen: function (str) {
            this.TestDom.innerHTML = str;
            this.TestDom.textContent = str;
            return this.TestDom.getComputedTextLength() <= this.Max;
        }
    };

    var motion = function () {
        this.TestDom = document.getElementById('testText');
        this.Config = [
            { x: 196, y: 221, w: 210,  cy: 221 }, 
            { x: 34, y: 221, w: 240,  cy: 221 },
            { x: 137, y: 262, w: 240,  cy: 262 },
            { x: 267, y: 266, w: 183,  cy: 266 }
        ];
        this.init();
    };
    motion.prototype = {
        init: function () {
            var t0 = 0,
                t1 = 330,
                t2 = 700,
                t3 = 1030;
            var m = mframe(this.button(0, t0), {
                end: function() {
                    console.log('end');
                }
            });
            m.add(this.button(1, t1));
            m.add(this.appear(0, t0));
            m.add(this.appear(1, t1));
            m.add(this.appear(2, t2));
            m.add(this.appear(3, t3));
            m.add(this.controls(t2 - 20));
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
                frames.push({ attr: { 'fill-opacity': '0.16' }, time: t2 + 120 });
            }
            return [{
                dom: document.getElementById('controls'),
                frames: frames
            }, {
                dom: [document.getElementById('btnVideo'), document.getElementById('btnMute')],
                frames: [
                    { css: { 'opacity': '0.0' }, time: t0 + 20 },
                    { css: { 'opacity': '1.0' }, time: t0 + 30 },
                    { css: { 'opacity': '1.0' }, time: t0 + 310 },
                    { css: { 'opacity': '0.0' }, time: t0 + 320 }
                ]
            }, {
                dom: [document.getElementById('btnVideoIn'), document.getElementById('btnMuteIn')],
                frames: [
                    { css: { 'fill': '#EDEDED' }, time: t0 + 20 },
                    { css: { 'fill': '#FFFFFF' }, time: t0 + 30 },
                    { css: { 'fill': '#FFFFFF' }, time: t0 + 310 },
                    { css: { 'fill': '#EDEDED' }, time: t0 + 320 }
                ]
            }];
        },
        button: function (index, t0) {
            var outer = document.getElementById('buttonOuter' + index),
                inner = document.getElementById('buttonInner' + index);
            var innerFrames = [
                { attr: { fill: '#EDEDED', height: '5.0', rx: '2.5', y: 245, 'stroke-width': '0.0' }, time: t0 },
                { attr: { fill: '#FFFFFF', height: '16.0', rx: '8.0', y: 237.5, 'stroke-width': '1.0' }, time: t0 + 10 },
                { attr: { fill: '#FFFFFF', height: '16.0', rx: '8.0', y: 237.5, 'stroke-width': '1.0' }, time: t0 + 290 },
                { attr: { fill: '#EDEDED', height: '5.0', rx: '2.5', y: 245, 'stroke-width': '0.0' }, time: t0 + 300 }
            ],
                outerFrames = [
                    { attr: { height: '5.0', rx: '2.5', y: 245, 'stroke-width': '0.0' }, time: t0 },
                    { attr: { height: '19.0', rx: '9.5', y: 236, 'stroke-width': '4.0' }, time: t0 + 10 },
                    { attr: { height: '19.0', rx: '9.5', y: 236, 'stroke-width': '4.0' }, time: t0 + 290 },
                    { attr: { height: '5.0', rx: '2.5', y: 245, 'stroke-width': '0.0' }, time: t0 + 300 }
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
                rect = document.getElementById('popRect' + index),
                text = document.getElementById('popText' + index);

            var lineheight = 20,
                paddingY = 18,
                paddingX= 20,
                adjust = 6,
                config = this.Config[index],
                help = new TextHelp(this.TestDom, STR[index], config.w),
                lines = help.Txt.length;

            help.build(text, config.x, config.y - paddingY - adjust - lineheight * (lines-1), lineheight);

            config.h = paddingY * 2 + lineheight * lines;
            config.cy2 = config.y - config.h;
            config.cx2 = config.x - paddingX;
            config.cy1 = config.cy;
            config.cx1= config.cx2 + paddingX + config.w/2>>0;
            config.w2 = config.w + paddingX*2;

            var conFrames = [
                { css: { opacity: '1.0' }, time: t0 + 290 },
                { css: { opacity: '0.0' }, time: t0 + 300 }
            ];
            for (var i = 0; i < 5; i++) {
                conFrames.push({ attr: { transform: 'translate(0,0.0)' }, time: t0 + i * 60, tween: 'easeInOut' });
                conFrames.push({ attr: { transform: 'translate(0,8.0)' }, time: t0 + i * 60 + 30, tween: 'easeInOut' });
                conFrames.push({ attr: { transform: 'translate(0,0.0)' }, time: t0 + i * 60 + 60, tween: 'easeInOut' });
            }
            var conArg = { dom: con, frames: conFrames };
            return [
                conArg,
                {
                    dom: tri,
                    frames: [
                        { css: { opacity: '0' }, time: t0 },
                        { css: { opacity: '1.0' }, time: t0 + 6 }
                    ]
                }, {
                    dom: rect,
                    frames: [
                        { attr: { x: config.cx1, y: config.cy1, width:0, height:0 }, time: t0 + 5 },
                        { attr: { x: config.cx2, y: config.cy2, width:config.w2, height:config.h }, tween: 'easeInOut', time: t0 + 20 }
                    ]
                }, {
                    dom: text,
                    frames: [
                        { css: { opacity: '0' }, time: t0 + 17 },
                        { css: { opacity: '1.0' }, time: t0 + 20 },
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
