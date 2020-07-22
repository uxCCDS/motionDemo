(function () {
    var STR = ['Choose your audio option before join.',
        'Connect to a Cisco video device or a Cisco Webex Share device.',
        'Mute your microphone or turn off your video before joining.',
        'If everything looks good, join here.'];
        
    var f = function (num) {
        var str = '' + num;
        return str.indexOf('.') !== -1 ? str : num.toFixed(1);
    },
    el= function(id){
        return document.getElementById(id);
    };

    var TextHelp = function (testDom, text, maxWidth) {
        this.Text = text;
        this.Max = maxWidth || 240;
        this.TestDom = testDom;
        this._IfBuilt = false;
        this.init();
    };
    TextHelp.prototype = {
        init: function () {
            this.Txt = this._test(this.Text, ' ');
        },
        build: function ( dom, x0, y0, yPlus) {
            if(this._IfBuilt) {
                return;
            }
            this._IfBuilt = true;
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
        _lessThen: function (str) {
            this.TestDom.innerHTML = str;
            this.TestDom.textContent = str;
            return this.TestDom.getComputedTextLength() <= this.Max;
        }
    };

    var Motion = function () {
        this.initDom();
        this.initMotion();
    };
    Motion.prototype = {
        initDom: function () {
            this.Dom_Screen_Bg = el('screen_bg');
            this.Dom_Screen_Inner_Bg = el('screen_inner_bg');
            this.Dom_Screen_Button1 = el('screen_button1');
            this.Dom_Screen_Button2 = el('screen_button2');
            this.Dom_Screen_Button3 = el('screen_button3');
            this.Dom_Human = el('human');
            this.Dom_Human_Up = el('humam_up');
            this.Dom_Human_Mouch = el('human_mouch');
            this.Dom_Human_Eye_Left = el('human_eye_left');
            this.Dom_Human_Eye_Right = el('human_eye_right');
            this.Dom_Headphone = el('headphone');
            this.Dom_Phone = el('phone');
            this.Dom_Phone_Wave1 = el('phone_wave1');
            this.Dom_Phone_Wave2 = el('phone_wave2');
        },
        initMotion: function () {
            this._initAppear();
            this._initHeadPhone();
            this._initPhone();
            this._initUser();
        },
        _init_screen_button: function (dom, x, w) {
            this.M.add([{
                dom: dom,
                frames: [
                    { time: 22, attr: { x: f(x + w / 2), width: '0.0' } },
                    { time: 34, attr: { x: f(x), width: f(w) } }
                ]
            }]);
        },
        _init_eye: function(x, moveLeft, moveRight, open, close) {
            var  frames = [],i,
                x1 = f(x),
                x2 = f(x+3),
                h1 = f(4),
                h2 = f(0);
            for(i=0;i<moveRight.length;i++) {
                frames.push({
                    time: moveRight[i],
                    attr: { x: x2 } 
                });
            }
            for(i=0;i<moveLeft.length;i++) {
                frames.push({
                    time: moveLeft[i],
                    attr: { x: x1 } 
                });
            }
            for(i=0;i<close.length;i++) {
                frames.push({
                    time: close[i],
                    attr: { height: h2, y:'141.0'  } 
                });
            }
            for(i=0;i<open.length;i++) {
                frames.push({
                    time: open[i],
                    attr: { height: h1, y:'139.0' } 
                });
            }
            return frames;
        },
        _mouch: function(open, close) {
            var frames = [],i=0;
            for(i=0;i<open.length;i++) {
                frames.push({
                    time: open[i],
                    attr: { transform: "translate(0.0, 0.0)" } 
                });
            }
            for(i=0;i<close.length;i++) {
                frames.push({
                    time: close[i],
                    attr: { transform: "translate(3.0, -5.0)" } 
                });
            }
            return frames;
        },
        _initUser: function () {
            this.M.add([{
                dom: this.Dom_Human,
                frames: [
                    { time: 35, attr: { transform: "translate(0,187.0)" } },
                    { time: 63, attr: { transform: "translate(0,-4.0)" }, tween: 'easeInOut' },
                    { time: 71, attr: { transform: "translate(0,0.0)" }, tween: 'easeInOut' }
                ]
            }, {
                dom: this.Dom_Human_Up,
                frames: [
                    { time: 74, attr: { transform: "rotate(0.0, 228 222)" } },
                    { time: 84, attr: { transform: "rotate(10.0, 228 222)" }, tween: 'easeInOut' },
                    { time: 94, attr: { transform: "rotate(0.0, 228 222)" }, tween: 'easeInOut' },
                    { time: 500, attr: { transform: "rotate(0.0, 228 222)" } },
                    { time: 510, attr: { transform: "rotate(-10.0, 228 222)" }, tween: 'easeInOut' },
                    { time: 520, attr: { transform: "rotate(0.0, 228 222)" }, tween: 'easeInOut' }
                ]
            }, {
                dom: this.Dom_Human_Mouch,
                frames: this._mouch([90,135,255,315],[110,270,300])
            }, {
                dom: this.Dom_Human_Eye_Left,
                frames: this._init_eye(221, [300,480],[310,470],[325,345],[335])
            }, {
                dom: this.Dom_Human_Eye_Right,
                frames: this._init_eye(247, [300,480],[310,470],[325,345],[335])
            }]);
        },
        _initAppear: function () {
            this.M = mframe([{
                dom: this.Dom_Screen_Bg,
                frames: [
                    { time: 0, attr: { x: '230.0', y: '214.0', width: '0.0', height: '0.0' } },
                    { time: 25, attr: { x: '20.0', y: '61.0', width: '420.0', height: '306.0' }, tween: 'easeInOut' },
                    { time: 30, attr: { x: '40.0', y: '76.0', width: '380.0', height: '276.0' }, tween: 'easeInOut' }
                ]
            }, {
                dom: this.Dom_Screen_Inner_Bg,
                frames: [
                    { time: 14, attr: { x: '230.0', y: '184.5', width: '0.0', height: '0.0' } },
                    { time: 35, attr: { x: '56.0', y: '92.0', width: '348.0', height: '185.0' }, tween: 'easeInOut' }
                ]
            }]);
            this._init_screen_button(this.Dom_Screen_Button1, 72, 40);
            this._init_screen_button(this.Dom_Screen_Button2, 180, 100);
            this._init_screen_button(this.Dom_Screen_Button3, 348, 40);
        },
        _initHeadPhone: function() {
            this.M.add([{
                dom: this.Dom_Screen_Button2,
                frames: [
                    { time: 120, attr: { x: '180.0', y: '287.0', width: '100.0', height: '5.0', rx:'2.5', ry: '2.5' } },
                    { time: 140, attr: { x: '149.0', y: '273.0', width: '162.0', height: '33.0', rx:'16.0', ry: '16.0' }, tween: 'easeInOut' },
                    { time: 145, attr: { x: '155.0', y: '279.0', width: '150.0', height: '21.0', rx:'10.0', ry: '10.0' }, tween: 'easeInOut' },
                    { time: 165, attr: { fill:'#EDEDED' } },
                    { time: 180, attr: { fill:'#F9D584' } },
                    { time: 275, attr: { x: '155.0', y: '279.0', width: '150.0', height: '21.0', rx:'10.0', ry: '10.0', fill:'#F9D584'  }, tween: 'easeInOut' },
                    { time: 287, attr: { x: '149.0', y: '273.0', width: '162.0', height: '33.0', rx:'16.0', ry: '16.0' }, tween: 'easeInOut' },
                    { time: 290, attr: { x: '155.0', y: '279.0', width: '150.0', height: '21.0',  rx:'10.0', ry: '10.0',fill:'#F3CEF8'  }, tween: 'easeInOut' },
                ]
            },{
                dom: this.Dom_Headphone,
                frames: [
                    { time: 175, attr: { transform: "translate(0,-200.0) rotate(10.0, 235 84)" } },
                    { time: 195, attr: { transform: "translate(0,0.0) rotate(10.0, 235 84)" }, tween: 'easeInOut' },
                    { time: 202, attr: { transform: "translate(0,0.0) rotate(-10.0, 235 84)" }, tween: 'easeInOut' },
                    { time: 210, attr: { transform: "translate(0,0.0) rotate(0.0, 235 84)" }, tween: 'easeInOut' },
                    { time: 280, attr: { transform: "translate(0,0.0) rotate(0.0, 235 84)" }, tween: 'easeInOut' },
                    { time: 285, attr: { transform: "translate(0,8.0) rotate(0.0, 235 84)" }, tween: 'easeInOut' },
                    { time: 296, attr: { transform: "translate(0,-200.0) rotate(0.0, 235 84)" }, tween: 'easeInOut' }
                ]
            }]);
        },
        _initPhone:function() {
            this.M.add([{
                dom: this.Dom_Phone,
                frames: [
                    { time: 305, attr: { transform: "rotate(-120.0, 313.5 76)" } },
                    { time: 365, attr: { transform: "rotate(0.0, 313.5 76)" }, tween: 'easeOutBounce' },
                ]
            },{
                dom: this.Dom_Phone_Wave1,
                frames: [
                    { time: 335, attr: { opacity:'0.0'} },
                    { time: 355, attr: { opacity:'1.0'}, tween: 'easeIn' },
                    { time: 383, attr: { opacity:'1.0'}, tween: 'linear' },
                    { time: 402, attr: { opacity:'0.0'}, tween: 'easeOut' }
                ]
            },{
                dom: this.Dom_Phone_Wave2,
                frames: [
                    { time: 360, attr: { opacity:'0.0)'} },
                    { time: 380, attr: { opacity:'1.0'}, tween: 'easeIn' },
                    { time: 408, attr: { opacity:'1.0'}, tween: 'linear' },
                    { time: 423, attr: { opacity:'0.0'}, tween: 'easeOut' }
                ]
            }]);
        }
    };

    window.onload = function () {
        var m = new Motion();
        m.M.play();
    };

})();
