(function () {
    var DASH = 305;
    var GOLBAL_POINT;
    var STR = [
        'Privacy',
        'Location, camera',
        'Windows Settings',
        'Camera',
        'Allow apps to access your camera',
        'Microphone',
        'Allow apps to access your microphone'
    ];

    var f = function (num) {
        var str = '' + num;
        return str.indexOf('.') !== -1 ? str : num.toFixed(1);
    },
        el = function (id) {
            return document.getElementById(id);
        };

    var callbackEnd = function () {
        console.log('end');
    };

    var localization = function(elem, txt) {
        var l = Math.min(elem.length, txt.length);
        for(var i=0;i<l;i++) {
            elem[i].textContent = txt[i];
            elem[i].innerHTML = txt[i];
        }
    };

    var TextHelper = function(txt, txtDom, txtDoms, graphDoms) {
        this.TestDom = el('testText');
        this.Txt = txt;
        this.TDom = txtDom;
        this.DomTexts = txtDoms;
        this.DomGraph = graphDoms;
        this.W = 280;
        this.init();
    };
    TextHelper.prototype = {
        init: function() {
            var arr = this._test(this.Txt, ' '),
                txtDoms = this.DomTexts,
                graphDoms = this.DomGraph;
            switch (arr.length) {
                case 0:
                case 1:
                    this.setText(this.TDom, arr.join(''));
                    //
                    this.hide(txtDoms[0]);
                    this.show(graphDoms[0]);
                    //
                    this.hide(txtDoms[1]);
                    this.show(graphDoms[1]);
                    break;
                case 2:
                    this.setText(this.TDom, arr[0]);
                    //
                    this.hide(graphDoms[0]);
                    this.show(txtDoms[0]);
                    this.setText(txtDoms[0], arr[1]);
                    //
                    this.hide(txtDoms[1]);
                    this.show(graphDoms[1]);
                    break;  
                default:
                    this.setText(this.TDom, arr[0]);
                    //
                    this.hide(graphDoms[0]);
                    this.show(txtDoms[0]);
                    this.setText(txtDoms[0], arr[1]);
                    //
                    this.hide(graphDoms[1]);
                    this.show(txtDoms[1]);
                    this.setText(txtDoms[1], arr[2]);
                    break;
            }
        },
        setText: function(dom, txt) {
            dom.textContent = txt;
            dom.innerHTML = txt;
        },
        show:function (dom) {
            dom.style.display = '';
        },
        hide:function (dom) {
            dom.style.display = 'none';
        },
        _test: function (str, signal) {
            var arr = str.split(signal),
                ret = [],
                str,
                temp = [];

            while (arr.length > 0) {
                str = arr.shift();
                if (this._lessThen(temp.join(signal) + signal + str)) {
                    temp.push(str);
                } else if (temp.length === 0 && signal !== '') {
                    var _ret = this._test(str, '');
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
        _lessThen: function (str) {
            this.TestDom.innerHTML = str;
            this.TestDom.textContent = str;
            return this.TestDom.getComputedTextLength() <= this.W;
        }
    };
    var Motion = function () {
        this.loc();
        this.init();
    };

    Motion.prototype = {
        loc: function() {
            localization([
                el('txt_privacy'),
                el('txt_location'),
                el('txt_settings'),
                el('txt_camera'),
                el('txt_camera_desc'),
                el('txt_mic'),
                el('txt_mic_desc')
            ], STR);

            new TextHelper(STR[4], el('txt_camera_desc'), [el('txt_camera_desc1'),el('txt_camera_desc2')], [el('txt_camera_gh1'),el('txt_camera_gh2')]);
            new TextHelper(STR[6], el('txt_mic_desc'), [el('txt_mic_desc1'),el('txt_mic_desc2')], [el('txt_mic_gh1'),el('txt_mic_gh2')]);
            
            var l1 = Math.ceil(el('txt_privacy').getComputedTextLength()) ,
                l2 = Math.ceil(el('txt_location').getComputedTextLength()),
                edge = 68,
                maxl = Math.max(l1,l2),
                bg = el('btn_lock_bg'),
                bgW = +bg.getAttribute('width'),
                plus = maxl-edge;

            if(plus>0) {
                bg.setAttribute('width', plus+bgW);
                DASH = DASH + plus * 2;
                bg.setAttribute('stroke-dasharray', DASH+' '+DASH);
                bg.setAttribute('stroke-dashoffset', DASH);
            }
        },
        init: function () {
            this.initMouse();
            this.initScreen1();
            this.initScreen2();
        },
        initScreen1: function () {
            this.M.add([{
                dom: [el('btn_lock1'),el('btn_lock2')],
                frames: [
                    { time: 80, attr: { stroke: "#3B3B3B" } },
                    { time: 100, attr: { stroke: "#0078D7" }, tween: 'easeInOut' },
                    { time: 400, attr: { stroke: "#0078D7" }, tween: 'easeInOut' },
                    { time: 401, attr: { stroke: "#3B3B3B" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('btn_lock3'),
                frames: [
                    { time: 80, attr: { fill: "#121212" } },
                    { time: 100, attr: { fill: "#0078D7" }, tween: 'easeInOut' },
                    { time: 400, attr: { fill: "#0078D7" }, tween: 'easeInOut' },
                    { time: 401, attr: { fill: "#121212" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('btn_lock4'),
                frames: [
                    { time: 80, attr: { fill: "#545454" } },
                    { time: 100, attr: { fill: "#3393DF" }, tween: 'easeInOut' },
                    { time: 400, attr: { fill: "#3393DF" }, tween: 'easeInOut' },
                    { time: 401, attr: { fill: "#545454" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('btn_lock_bg'),
                frames: [
                    { time: 80, attr: { 'stroke-dashoffset': f(DASH) } },
                    { time: 100, attr: { 'stroke-dashoffset': "0.0" }, tween: 'easeInOut' },
                    { time: 400, attr: { 'stroke-dashoffset': "0.0" }, tween: 'easeInOut' },
                    { time: 401, attr: { 'stroke-dashoffset': f(DASH) }, tween: 'easeInOut' }
                ]
            },{
                dom: el('btn_lock'),
                frames: [
                    { time: 120, attr: { transform: "translate(200.0, 200.0) scale(1.0) translate(-200.0, -200.0)" } },
                    { time: 135, attr: { transform: "translate(200.0, 200.0) scale(0.8) translate(-200.0, -200.0)" }, tween: 'easeInOut' },
                    { time: 145, attr: { transform: "translate(200.0, 200.0) scale(1.0) translate(-200.0, -200.0)" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen1'),
                frames: [
                    { time: 150, attr: { 'opacity': "1.0" } },
                    { time: 170, attr: { 'opacity': "0.0" }, tween: 'easeInOut' },
                    { time: 490, attr: { 'opacity': "0.0" }, tween: 'easeInOut' },
                    { time: 510, attr: { 'opacity': "1.0" }, tween: 'easeInOut' }
                ]
            }]);
        },
        initScreen2: function () {
            this.M.add([{
                dom: el('screen2'),
                frames: [
                    { time: 156, attr: { 'opacity': "0.0" } },
                    { time: 170, attr: { 'opacity': "1.0" }, tween: 'easeInOut' },
                    { time: 490, attr: { 'opacity': "1.0" }, tween: 'easeInOut' },
                    { time: 510, attr: { 'opacity': "0.0" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen2_left'),
                frames: [
                    { time: 0, attr: { transform: "translate(-140.0,0.0)" } },
                    { time: 155, attr: { transform: "translate(-140.0,0.0)" } },
                    { time: 180, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 470, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 495, attr: { transform: "translate(-140.0,0.0)" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen2_left_part2'),
                frames: [
                    { time: 0, attr: { transform: "translate(-70.0,0.0)" } },
                    { time: 175, attr: { transform: "translate(-70.0,0.0)" } },
                    { time: 190, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 460, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 475, attr: { transform: "translate(-70.0,0.0)" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen2_right'),
                frames: [
                    { time: 0, attr: { transform: "translate(240.0,0.0)" } },
                    { time: 165, attr: { transform: "translate(240.0,0.0)" } },
                    { time: 190, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 0, attr: { 'opacity': "1.0" } },
                    { time: 370, attr: { 'opacity': "1.0" } },
                    { time: 380, attr: { 'opacity': "0.0" } }
                ]
            },{
                dom: el('screen2_right_button'),
                frames: [
                    { time: 0, attr: { opacity: "0.0" } },
                    { time: 190, attr: { opacity: "0.0" } },
                    { time: 200, attr: { opacity: "1.0" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen2_right_part2'),
                frames: [
                    { time: 0, attr: { transform: "translate(30.0,0.0)" } },
                    { time: 180, attr: { transform: "translate(30.0,0.0)" } },
                    { time: 195, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' }
                ]
            }]);

            this.M.add([{
                dom: el('screen2_right_mic'),
                frames: [
                    { time: 0, attr: { transform: "translate(240.0,0.0)" } },
                    { time: 370, attr: { transform: "translate(240.0,0.0)" } },
                    { time: 385, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 485, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 510, attr: { transform: "translate(240.0,0.0)" }, tween: 'easeInOut' },
                    { time: 0, attr: { 'opacity': "0.0" } },
                    { time: 370, attr: { 'opacity': "0.0" } },
                    { time: 380, attr: { 'opacity': "1.0" } }
                ]
            },{
                dom: el('screen2_right_mic_button'),
                frames: [
                    { time: 380, attr: { opacity: "0.0" } },
                    { time: 390, attr: { opacity: "1.0" }, tween: 'easeInOut' },
                    { time: 475, attr: { opacity: "1.0" }, tween: 'easeInOut' },
                    { time: 485, attr: { opacity: "0.0" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('screen2_right_mic_part2'),
                frames: [
                    { time: 380, attr: { transform: "translate(30.0,0.0)" } },
                    { time: 390, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 475, attr: { transform: "translate(0.0,0.0)" }, tween: 'easeInOut' },
                    { time: 510, attr: { transform: "translate(30.0,0.0)" }, tween: 'easeInOut' },
                    { time: 540, attr: { transform: "translate(30.0,0.0)" }, tween: 'easeInOut' }
                ]
            }]);

            this.M.add([{
                dom: el('screen2_right_button_bg'),
                frames: [
                    { time: 0, attr: { fill: "#E5E5E5" } },
                    { time: 225, attr: { fill: "#E5E5E5" } },
                    { time: 226, attr: { fill: "#CCCCCC" } },
                    { time: 260, attr: { fill: "#CCCCCC" } },
                    { time: 270, attr: { fill: "#949494" } },
                    { time: 285, attr: { fill: "#017AA3" } },
                    { time: 315, attr: { fill: "#017AA3" } },
                    { time: 316, attr: { fill: "#00A0D1" } }
                ]
            },{
                dom: el('screen2_right_button_circle'),
                frames: [
                    { time: 0, attr: { cx: "175.0" } },
                    { time: 270, attr: { cx: "175.0" } },
                    { time: 285, attr: { cx: "197.0" } }
                ]
            },{
                dom: el('screen2_right_mic_button_bg'),
                frames: [
                    { time: 0, attr: { fill: "#E5E5E5" } },
                    { time: 400, attr: { fill: "#E5E5E5" } },
                    { time: 401, attr: { fill: "#CCCCCC" } },
                    { time: 425, attr: { fill: "#CCCCCC" } },
                    { time: 435, attr: { fill: "#949494" } },
                    { time: 450, attr: { fill: "#017AA3" } },
                    { time: 470, attr: { fill: "#017AA3" } },
                    { time: 471, attr: { fill: "#00A0D1" } }
                ]
            },{
                dom: el('screen2_right_mic_button_circle'),
                frames: [
                    { time: 0, attr: { cx: "175.0" } },
                    { time: 435, attr: { cx: "175.0" } },
                    { time: 450, attr: { cx: "197.0" } }
                ]
            }]);

            this.M.add([{
                dom: el('l-slider'),
                frames: [
                    { time: 0, attr: { y: "114.0" } },
                    { time: 355, attr: { y: "114.0" } },
                    { time: 360, attr: { y: "137.0" } }
                ]
            },{
                dom: [el('l-camera1'),el('l-camera2'),el('l-camera3'),el('l-camera4')],
                frames: [
                    { time: 0, attr: { stroke: "#0078D7" } },
                    { time: 360, attr: { stroke: "#0078D7" } },
                    { time: 365, attr: { stroke: "#3B3B3B" } }
                ]
            },{
                dom: el('l-camera-btn'),
                frames: [
                    { time: 0, attr: { fill: "#0078D7" } },
                    { time: 360, attr: { fill: "#0078D7" } },
                    { time: 365, attr: { fill: "#EDEDED" } }
                ]
            },{
                dom: [el('l-microphone1'),el('l-microphone2'),el('l-microphone3'),el('l-microphone4')],
                frames: [
                    { time: 0, attr: { stroke: "#3B3B3B" } },
                    { time: 355, attr: { stroke: "#3B3B3B" } },
                    { time: 360, attr: { stroke: "#0078D7" } }
                ]
            },{
                dom: el('l-microphone-btn'),
                frames: [
                    { time: 0, attr: { fill: "#EDEDED" } },
                    { time: 355, attr: { fill: "#EDEDED" } },
                    { time: 360, attr: { fill: "#0078D7" } }
                ]
            },{
                dom: el('l-microphone'),
                frames: [
                    { time: 360, attr: { transform: "translate(28.0, 143.0) scale(1.0) translate(-28.0, -143.0)" } },
                    { time: 365, attr: { transform: "translate(28.0, 143.0) scale(1.5) translate(-28.0, -143.0)" } },
                    { time: 370, attr: { transform: "translate(28.0, 143.0) scale(1.0) translate(-28.0, -143.0)" } }
                ]
            }]);
            
        },
        initMouse: function () {

            var _click = function(time) {
                return [
                    { time: time, attr: { transform: "scale(1.0)" }, tween: 'easeInOut' },
                    { time: time+10, attr: { transform: "scale(0.95)" }, tween: 'easeInOut' },
                    { time: time+15, attr: { transform: "scale(1.0)" }, tween: 'easeInOut' }
                ];
            },
            _clickMotion = [];
            _clickMotion = _clickMotion.concat(_click(115));
            _clickMotion = _clickMotion.concat(_click(260));
            _clickMotion = _clickMotion.concat(_click(345));
            _clickMotion = _clickMotion.concat(_click(425));

            this.M = mframe([{
                dom: el('mouse'),
                frames: [
                    { time: 0, attr: { transform: "translate(290.0,50.0)" } },
                    { time: 70, attr: { transform: "translate(190.0,206.0)" }, tween: 'easeInOut' },
                    { time: 200, attr: { transform: "translate(190.0,206.0)" }, tween: 'easeInOut' },
                    { time: 230, attr: { transform: "translate(186.0,165.0)" }, tween: 'easeInOut' },
                    { time: 310, attr: { transform: "translate(186.0,165.0)" }, tween: 'easeInOut' },
                    { time: 340, attr: { transform: "translate(64.0,142.0)" }, tween: 'easeInOut' },
                    { time: 370, attr: { transform: "translate(64.0,142.0)" }, tween: 'easeInOut' },
                    { time: 410, attr: { transform: "translate(186.0,165.0)" }, tween: 'easeInOut' },
                    { time: 450, attr: { transform: "translate(186.0,165.0)" }, tween: 'easeInOut' },
                    { time: 500, attr: { transform: "translate(290.0,50.0)" }, tween: 'easeInOut' }
                ]
            },{
                dom: el('mouseInner'),
                frames: _clickMotion
            }], {
                end: callbackEnd
            });
        }
    };

    window.onload = function () {
        var m = new Motion();
        GOLBAL_POINT = m;
        m.M.repeat(Infinity);
    };

})();
