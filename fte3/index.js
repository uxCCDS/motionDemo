(function () {
    var GOLBAL_POINT;
    var STR = ['Choose your audio option before join.',
        'Mute yourself or turn off your video.',
        'Connect to a Cisco video device or a Cisco Webex Share device.',
        'If everything looks good, join here.'];

    var f = function (num) {
        var str = '' + num;
        return str.indexOf('.') !== -1 ? str : num.toFixed(1);
    },
        el = function (id) {
            return document.getElementById(id);
        };

    var reset = function() {
        GOLBAL_POINT.M.state(0,false);
        GOLBAL_POINT.Dom_Button_Join_Bg.setAttribute('width','0');
        GOLBAL_POINT.Dom_Headphone.setAttribute('transform',"translate(0, -1200)");
        GOLBAL_POINT.Dom_Screen_Button1.setAttribute('width',"0");
        GOLBAL_POINT.Dom_Screen_Button2.setAttribute('width',"0");
        GOLBAL_POINT.Dom_Screen_Button3.setAttribute('width',"0");
        GOLBAL_POINT.M.play();
    };

    var callbackEnd = function() {

        reset();
        console.log('end');
    };

    var TextHelp = function (id, text, max, mx, my, start, end, x0) {
        this.TestDom = el('testText');
        this.Text = text;
        this.W = max - 40;
        this.Y0 = 7 + 20;
        this.X0 = x0 || -this.W / 2;
        this.Mx = mx;
        this.My = my;
        this.Dom = el(id);
        this.TextDom = el(id + '_text');
        this.Rect = el(id + '_rect');
        this._IfBuilt = false;
        this.Start = start;
        this.End = end;
        this.init();
    };
    TextHelp.prototype = {
        init: function () {
            this.Txt = this._test(this.Text, ' ');
        },
        _s: function (x, y, scale) {
            return ['translate(', f(x), ', ', f(y), ') scale(', f(scale), ')'].join('');
        },
        g: function () {
            this._build();
            var t = 20,
                tHalf = 15,
                stepHalf = 2,
                s1 = this.Start,
                s2 = s1 + t,
                e2 = this.End,
                e1 = e2 - t,
                _s = this._s,
                mx = this.Mx,
                my = this.My,
                frames = [
                    { time: s1, attr: { transform: _s(mx, my, 0), opacity: '0.0' }, tween: 'easeInOut' },
                    { time: s2, attr: { transform: _s(mx, my, 1), opacity: '1.0' }, tween: 'easeInOut' },
                    { time: e1, attr: { transform: _s(mx, my, 1), opacity: '1.0' }, tween: 'easeInOut' },
                    { time: e2, attr: { transform: _s(mx, my, 0), opacity: '0.0' }, tween: 'easeInOut' }
                ];
            var current = s2 + t,
                i = 0,
                _temp,
                _plus;
            for (; current < e1 - 5; current += tHalf) {
                _temp = i % 4,
                    _plus = _temp === 3 ? 0 : _temp - 1;
                frames.push({ time: current, attr: { transform: _s(mx, my + _plus * stepHalf, 1) } });
                i++;
            }
            return [{
                dom: this.Dom,
                frames: frames
            }];

        },
        _build: function () {
            if (this._IfBuilt) {
                return;
            }
            this._IfBuilt = true;
            var x0 = this.X0,
                y0 = this.Y0,
                dom = this.TextDom,
                yPlus = 21,
                txt = this.Txt;
            for (var i = 0, l = txt.length; i < l; i++) {
                var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                tspan.setAttribute('x', x0);
                tspan.setAttribute('y', y0 + i * yPlus+15);
                tspan.textContent = txt[i];
                tspan.innerHTML = txt[i];
                dom.appendChild(tspan);
            }
            this.Rect.setAttribute('height', 40 + l * yPlus);
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
            return this.TestDom.getComputedTextLength() <= this.W;
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
            this.Dom_Button_Join = el('button_join');
            this.Dom_Button_Audio = el('button_audo');
            this.Dom_Button_video = el('button_video');
            this.Dom_Button_Bg = el('button_bg');
            this.Dom_Button_Join_Bg = el('button_join_bg');
        },
        _initStep2: function() {
            this.M.add([{
                dom: this.Dom_Human,
                frames: [
                    { time: 615, attr: {opacity: '1.0'} },
                    { time: 625, attr: {opacity: '0.0'} }
                ]
            },{
                dom: el('avatar'),
                frames: [
                    { time: 615, attr: {opacity: '0.0', transform: "translate(253.5,161.5) scale(1.8) translate(-253.5,-161.5) "} },
                    { time: 635, attr: {opacity: '1.0', transform: "translate(253.5,161.5) scale(1.0) translate(-253.5,-161.5) "}, tween: 'easeInOut' },
                    { time: 765, attr: {opacity: '1.0', transform: "translate(253.5,161.5) scale(1.0) translate(-253.5,-161.5) "}, tween: 'easeInOut' },
                    { time: 775, attr: {opacity: '0.0', transform: "translate(253.5,161.5) scale(1.8) translate(-253.5,-161.5) "}, tween: 'easeInOut' }
                ]
            },{
                dom: el('clipPath_avatar_rect'),
                frames: [
                    { time: 615, attr: {r: '85.0'} },
                    { time: 635, attr: {r: '57.5'}, tween: 'easeInOut' },
                    { time: 765, attr: {r: '57.5'}, tween: 'easeInOut' },
                    { time: 775, attr: {r: '85.0'}, tween: 'easeInOut' }
                ]
            },{
                dom: this.Dom_Screen_Inner_Bg,
                frames: [
                    { time: 615, attr: {fill: '#B2E0FC'} },
                    { time: 635, attr: {fill: '#F7F7F7'} }
                ]
            }]);
        },
        init_step3: function() {
            this.M.add([{
                dom: el('con_step3_bg'),
                frames: [
                    { time: 765, attr: {transform: "translate(0,-175.0)"} },
                    { time: 775, attr: {transform: "translate(0,0.0)" } , tween: 'easeInOut'},
                    { time: 875, attr: {fill: "#EAEAEA"} },
                    { time: 880, attr: {fill: "#F9D783"} }
                ]
            },{
                dom: [el('board_y1'),el('board_y2'),el('board_y3')],
                frames: [
                    { time: 870, attr: {fill: "#EAEAEA"} },
                    { time: 880, attr: {fill: "#F9D783"} }
                ]
            },{
                dom: el('board_in_bg'),
                frames: [
                    { time: 870, attr: {fill: "#F5F5F5"} },
                    { time: 875, attr: {fill: "#FBE9BA"} }
                ]
            },{
                dom: el('board_bg'),
                frames: [
                    { time: 870, attr: {fill: "#FFFFFF"} },
                    { time: 875, attr: {fill: "#FDF6E9"} }
                ]
            },{
                dom: el('board'),
                frames: [
                    { time: 765, attr: {transform: "translate(251,146.5) scale(0.0) translate(-251, -146.5)"} },
                    { time: 800, attr: {transform: "translate(251,146.5) scale(1.0) translate(-251, -146.5)" } , tween: 'easeInOutBounce'},
                    { time: 855, attr: {transform: "translate(251,146.5) scale(1.0) translate(-251, -146.5)" } , tween: 'easeInOutBounce'},
                    { time: 870, attr: {transform: "translate(251,146.5) scale(0.9) translate(-251, -146.5)" } , tween: 'easeInBounce'},
                    { time: 880, attr: {transform: "translate(251,146.5) scale(1.2) translate(-251, -146.5)" } , tween: 'easeInOut'},
                    { time: 890, attr: {transform: "translate(251,146.5) scale(1.0) translate(-251, -146.5)" } , tween: 'easeOutBounce'}
                ]
            },{
                dom: el('desk'),
                frames: [
                    { time: 780, attr: {transform: "translate(0,60.0)"} },
                    { time: 790, attr: {transform: "translate(0,0.0)" } , tween: 'easeInOut'},
                    { time: 875, attr: {fill: "#F5F5F5"} },
                    { time: 880, attr: {fill: "#FBE9BA"} }
                ]
            },{
                dom: el('loading'),
                frames: [
                    { time: 790, attr: { opacity: '0.0', transform: "rotate(0.0, 251 147)"} },
                    { time: 800, attr: { opacity: '1.0' } },
                    { time: 840, attr: { opacity: '1.0' } },
                    { time: 850, attr: { opacity: '0.0', transform: "rotate(360.0, 251 147)"}, tween:'easeInOut' }
                ]
            },{
                dom: el('check_circle'),
                frames: [
                    { time: 875, attr: { r :'0.0'}},
                    { time: 895, attr: { r :'20.0'}, tween: 'easeInOut' }
                ]
            },{
                dom: el('check_right'),
                frames: [
                    { time: 880, attr: {'stroke-dashoffset':'25.0'} },
                    { time: 895, attr: {'stroke-dashoffset':'0.0'}, tween: 'easeInOut' }
                ]
            },{
                dom: el('device'),
                frames: [
                    { time: 930, attr: {opacity: '1.0',transform: "translate(0.0,0)"} },
                    { time: 950, attr: {opacity: '0.0'} },
                    { time: 950, attr: {transform: "translate(-400,0)"}, tween: 'easeInOutBounce' }
                ]
            },{
                dom: el('human2'),
                frames: [
                    { time: 945, attr: {transform: "translate(0,190.0)"} },
                    { time: 965, attr: {transform: "translate(0,0.0)"}, tween: 'easeInOutBounce' }
                ]
            }]);
        },
        initMotion: function () {
            this._initAppear();
            this._init_button();
            this._initHeadPhone();
            this._initPhone();
            this._initUser();
            this._initPop();
            this._initStep2();
            this.init_step3();
            this.M.add([{
                dom: el('almost_all'),
                frames: [ 
                    { time: 1235, attr: { opacity:'1.0', transform: "translate(251.0,202.0) scale(1.0) translate(-251.0,-202.0) "} }, 
                    { time: 1275, attr: { opacity:'0.0', transform: "translate(251.0,202.0) scale(0.0) translate(-251.0,-202.0) "}, tween: 'easeInOut' }
                ]
            }]);
        },
        _init_screen_button: function (dom, x, w) {
            this.M.add([{
                dom: dom,
                frames: [
                    { time: 22, attr: { x: f(x + w / 2), width: '0.0' } },
                    { time: 34, attr: { x: f(x), width: f(w) } },
                    { time: 1215, attr: { x: f(x), width: f(w) } },
                    { time: 1230, attr: { x: f(x + w / 2), width: '0.0' } }
                ]
            }]);
        },
        _button_state: function(config) {
            var x = config.x,
                y = config.y,
                w = config.w,
                h = config.h,
                r = config.r,
                plus = config.plus;
            return {
                min: {
                    width: f(0),
                    height: f(0),
                    x: f(x+w/2),
                    y: f(y+h/2),
                    rx: f(0)
                },
                max: {
                    width: f(w+plus*2),
                    height: f(h+plus*2),
                    x: f(x-plus),
                    y: f(y-plus),
                    rx: f(r+plus)
                },
                fit: {
                    width: f(w),
                    height: f(h),
                    x: f(x),
                    y: f(y),
                    rx: f(r)
                }
            }
        },
        _buildFrame: function(times,config) {
            var frames = [];
            for(var i=0,l=times.length;i<l;i++) {
                var attr = {};
                for(var name in config) {
                    attr[name] = config[name];
                }
                frames.push({
                    time: times[i],
                    attr: attr,
                    tween: 'easeInOut'
                });
            }
            return frames;
        },
        _init_button_frames: function(dom, config, min, fit, max, color1, color2) {
            var cfg = this._button_state(config);
            var frames = [];
            frames = frames.concat(this._buildFrame(min, cfg.min));
            frames = frames.concat(this._buildFrame(fit, cfg.fit));
            frames = frames.concat(this._buildFrame(max, cfg.max));
            frames = frames.concat(this._buildFrame(color1, { fill: config.fill1}));
            frames = frames.concat(this._buildFrame(color2, { fill: config.fill2}));
            this.M.add([{
                dom: dom,
                frames: frames
            }]);
        },
        _initPop: function () {
            //var TextHelp = function (id, text, max, mx, my, start, end, x0) {
            var t1 = new TextHelp('pop1', STR[0], 250, 250, 292, 140, 450),
                t2 = new TextHelp('pop2', STR[1], 250, 212, 330, 510, 760),
                t3 = new TextHelp('pop3', STR[2], 280, 111, 291, 770, 970, -68),
                t4 = new TextHelp('pop4', STR[3], 223, 310, 330, 980, 1250, -91);
            this.M.add(t1.g());
            this.M.add(t2.g());
            this.M.add(t3.g());
            this.M.add(t4.g());
        },
        _button_breathe: function(s, e) {
            var c= s,
                last = e - 50,
                fit = [],
                max = [];

            for(;c<last;c+=60) {
                fit.push(c);
                fit.push(c+50);
                max.push(c+20);
            }
            
            return {
                fit:fit,
                max: max
            };
        },
        _audio_vol: function() {
            this.M.add([{
                dom: el('icon_audio_vol'),
                frames: [
                    { time: 530,  attr: {y: '309.0', height: '6.0'}},
                    { time: 560,  attr: { y: '303.0', height: '12.0'}, tween: 'easeInOut'},
                    { time: 580,  attr: { y: '307.0', height: '8.0'}, tween: 'easeInOut'},
                    { time: 590,  attr: { y: '303.0', height: '12.0'}, tween: 'easeInOut'},
                    { time: 610,  attr: { y: '312.0', height: '3.0'}, tween: 'easeInOut'}
                ]
            }]);
        },
        _init_button_icon: function() {
            var icon_video = el('icon_video'),
                icon_audio = el('icon_audio');
            this.M.add([{
                dom: icon_audio,
                frames: [
                    { time: 520, attr: { opacity: '0.0'} },
                    { time: 540, attr: { opacity: '1.0'}, tween: 'easeInOut'},
                    { time: 740, attr: { opacity: '1.0'}, tween: 'easeInOut'},
                    { time: 760, attr: { opacity: '0.0'}, tween: 'easeInOut'}
                ]
            },{
                dom: icon_video,
                frames: [
                    { time: 530, attr: { opacity: '0.0'} },
                    { time: 550, attr: { opacity: '1.0'}, tween: 'easeInOut'},
                    { time: 740, attr: { opacity: '1.0'}, tween: 'easeInOut'},
                    { time: 760, attr: { opacity: '0.0'}, tween: 'easeInOut'}
                ]
            }, {
                dom: el('icon_video_dot'),
                frames: [
                    { time: 610, attr: { opacity: '1.0'}},
                    { time: 630, attr: {opacity: '0.0'}}
                ]
            },{
                dom: el('icon_audio_vol_group'),
                frames: [
                    { time: 610, attr: {opacity: '1.0'}},
                    { time: 630, attr: {opacity: '0.0'}}
                ]
            },{
                dom: el('icon_video_main'),
                frames: [
                    { time: 610, attr: {fill: '#121212'}},
                    { time: 620, attr: {fill: '#D4371C'}}
                ]
            },{
                dom: el('icon_audio_main'),
                frames: [
                    { time: 610, attr: {fill: '#121212'}},
                    { time: 620, attr: {fill: '#D4371C'}}
                ]
            },{
                dom: el('icon_video_line'),
                frames: [
                    { time: 610, attr: {'stroke-dashoffset': '17.0'}},
                    { time: 620, attr: {'stroke-dashoffset': '0.0'}}
                ]
            },{
                dom: el('icon_audio_line'),
                frames: [
                    { time: 610, attr: {'stroke-dashoffset': '16.0'}},
                    { time: 620, attr: {'stroke-dashoffset': '0.0'}}
                ]
            }]);
            this._audio_vol();
        },
        _init_button: function () {
            this._init_screen_button(this.Dom_Screen_Button1, 93, 40);
            this._init_screen_button(this.Dom_Screen_Button2, 201, 100);
            this._init_screen_button(this.Dom_Screen_Button3, 369, 40);
            this.M.add({
                dom: this.Dom_Screen_Button2,
                frames: [
                    { time: 120, attr: { x: '201.0', y: '275.0', width: '100.0', height: '5.0', rx: '2.5', ry: '2.5' } },
                    { time: 140, attr: { x: '161.0', y: '261.0', width: '180.0', height: '33.0', rx: '16.0', ry: '16.0' }, tween: 'easeInOut' },
                    { time: 145, attr: { x: '176.0', y: '267.0', width: '150.0', height: '21.0', rx: '10.0', ry: '10.0' }, tween: 'easeInOut' },
                    { time: 430, attr: { x: '176.0', y: '267.0', width: '150.0', height: '21.0', rx: '10.0', ry: '10.0' }, tween: 'easeInOut' },
                    { time: 435, attr: { x: '161.0', y: '261.0', width: '180.0', height: '33.0', rx: '16.0', ry: '16.0' }, tween: 'easeInOut' },
                    { time: 455, attr: { x: '201.0', y: '275.0', width: '100.0', height: '5.0', rx: '2.5', ry: '2.5' }, tween: 'easeInOut' }
                ]
            });
            this.M.add({
                dom: this.Dom_Screen_Button1,
                frames: [
                    { time: 740, attr: { x: '93.0', y: '275.0', width: '40.0', height: '5.0', rx: '2.5', fill:'#EDEDED' } },
                    { time: 780, attr: { x: '77.0', y: '267.0', width: '70.0', height: '21.0', rx: '10.5', fill:'#F9D783', tween: 'easeInOut' } },
                    { time: 940, attr: { x: '77.0', y: '267.0', width: '70.0', height: '21.0', rx: '10.5', fill:'#F9D783', tween: 'easeInOut' } },
                    { time: 980, attr: { x: '93.0', y: '275.0', width: '40.0', height: '5.0', rx: '2.5', fill:'#EDEDED', tween: 'easeInOut' } }
                ]
            });
            this._init_button_frames(this.Dom_Button_Audio, {
                x: 158, y: 298, w: 50, h:24, r:12, plus: 4, fill1:'#E5E5E5', fill2:'#FFFFFF'
            },[460,1240], [480,510,530,610,630,740,760,1210] ,[470,520, 620,750,1220],[510,760],[530,740]);

            this._init_button_frames(this.Dom_Button_video, {
                x: 216, y: 298, w: 50, h:24, r:12, plus: 4, fill1:'#E5E5E5', fill2:'#FFFFFF'
            },[470,1240], [490,520,540,620,640,750,770,1210] ,[480,530, 630,760,1220],[520,770],[540,750]);
            // min fit max
            this._init_button_frames(this.Dom_Button_Bg, {
                x: 154, y: 294, w: 116, h:32, r:16, plus: 4
            },[460,770], [490,510,540,610,640,740] ,[475,525, 625,755],[],[]);

            var breathe = this._button_breathe(980,1210);

            this._init_button_frames(this.Dom_Button_Join, {
                x: 274, y: 298, w: 70, h:24, r:12, plus: 4, fill1:'#BCF7BF', fill2:'#7FEB86'
            },[470,1240], [500,1210].concat(breathe.fit) ,[490,1220].concat(breathe.max),[970],[980]);

            this._init_button_frames(this.Dom_Button_Join_Bg, {
                x: 270, y: 294, w: 78, h:32, r:12, plus: 4
            },[1250], [1210].concat(breathe.fit) ,[1220].concat(breathe.max),[],[]);

            this._init_button_icon();
        },
        _init_eye: function (x, moveLeft, moveRight, open, close) {
            var frames = [], i,
                x1 = f(x),
                x2 = f(x + 3),
                h1 = f(4),
                h2 = f(0);
            for (i = 0; i < moveRight.length; i++) {
                frames.push({
                    time: moveRight[i],
                    attr: { x: x2 }
                });
            }
            for (i = 0; i < moveLeft.length; i++) {
                frames.push({
                    time: moveLeft[i],
                    attr: { x: x1 }
                });
            }
            for (i = 0; i < close.length; i++) {
                frames.push({
                    time: close[i],
                    attr: { height: h2, y: '129.0' }
                });
            }
            for (i = 0; i < open.length; i++) {
                frames.push({
                    time: open[i],
                    attr: { height: h1, y: '127.0' }
                });
            }
            return frames;
        },
        _mouch: function (open, close) {
            var frames = [], i = 0;
            for (i = 0; i < open.length; i++) {
                frames.push({
                    time: open[i],
                    attr: { transform: "translate(254,154) scale(1.0)" }
                });
            }
            for (i = 0; i < close.length; i++) {
                frames.push({
                    time: close[i],
                    attr: { transform: "translate(254,154) scale(0.1)" }
                });
            }
            return frames;
        },
        _sh: function(opens) {
            var frames = [];
            for(var i=0;i<opens.length;i++) {
                frames = frames.concat([
                    { time: opens[i][0]-1, attr: { opacity: 0}},
                    { time: opens[i][0], attr: { opacity: 1}},
                    { time: opens[i][1], attr: { opacity: 1}},
                    { time: opens[i][1]+1, attr: { opacity: 0}}
                ]);
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
                    { time: 74, attr: { transform: "rotate(0.0, 250 210)" } },
                    { time: 84, attr: { transform: "rotate(10.0, 250 210)" }, tween: 'easeInOut' },
                    { time: 94, attr: { transform: "rotate(0.0, 250 210)" }, tween: 'easeInOut' },
                    { time: 500, attr: { transform: "rotate(0.0, 250 210)" } },
                    { time: 510, attr: { transform: "rotate(-10.0, 250 210)" }, tween: 'easeInOut' },
                    { time: 520, attr: { transform: "rotate(0.0, 250 210)" }, tween: 'easeInOut' }
                ]
            }, {
                dom: this.Dom_Human_Mouch,
                frames: this._mouch([90, 135, 255, 315], [110, 270, 300])
            }, {
                dom: this.Dom_Human_Eye_Left,
                frames: this._init_eye(242, [300, 480], [310, 470], [325, 345], [335])
            }, {
                dom: this.Dom_Human_Eye_Right,
                frames: this._init_eye(268, [300, 480], [310, 470], [325, 345], [335])
            }, {
                dom: el('mouch_big2'),
                frames: this._sh([
                    [527,533],[570,576]
                ]) 
            }, {
                dom: el('mouch_big'),
                frames: this._sh([
                    [541,554],[562,568],[584,597],[605,611]
                ]) 
            }, {
                dom: el('sound'),
                frames: this._sh([
                    [541,554],[559,577],[593,611]
                ]) 
            }, {
                dom: el('hand'),
                frames: [
                    { time: 570, attr: { transform: "rotate(90.0, 370 300)" }},
                    { time: 595, attr: { transform: "rotate(0.0, 370 300)" }},
                    { time: 570, attr: { transform: "rotate(0.0, 370 300)" }},
                    { time: 570, attr: { transform: "rotate(90.0, 370 300)" }},
                ]
            }]);
        },
        _initAppear: function () {
            this.M = mframe([{
                dom: this.Dom_Screen_Bg,
                frames: [
                    { time: 0, attr: { x: '251.0', y: '202.0', width: '0.0', height: '0.0' } },
                    { time: 25, attr: { x: '41.0', y: '44.0', width: '420.0', height: '306.0' }, tween: 'easeInOut' },
                    { time: 30, attr: { x: '61.0', y: '64.0', width: '380.0', height: '276.0' }, tween: 'easeInOut' }
                ]
            }, {
                dom: this.Dom_Screen_Inner_Bg,
                frames: [
                    { time: 10, attr: { x: '251.0', y: '172.5', width: '0.0', height: '0.0' } },
                    { time: 25, attr: { x: '72.0', y: '75.0', width: '358.0', height: '195.0' } },
                    { time: 30, attr: { x: '77.0', y: '80.0', width: '348.0', height: '185.0' }, tween: 'easeInOut' }
                ]
            }], {
                end: callbackEnd
            });
        },
        _initHeadPhone: function () {
            this.M.add([{
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
        _initPhone: function () {
            this.M.add([{
                dom: this.Dom_Phone,
                frames: [
                    { time: 305, attr: { transform: "rotate(-120.0, 314.5 80)" } },
                    { time: 365, attr: { transform: "rotate(0.0, 314.5 80)" }, tween: 'easeOutBounce' },
                    { time: 440, attr: { transform: "translate(0,0.0) rotate(0.0, 314.5 80)" }, tween: 'easeInBounce' },
                    { time: 460, attr: { transform: "translate(0,-120.0) rotate(0.0, 314.5 80)" }, tween: 'easeInBounce' },
                ]
            }, {
                dom: this.Dom_Phone_Wave1,
                frames: [
                    { time: 335, attr: { opacity: '0.0' } },
                    { time: 355, attr: { opacity: '1.0' }, tween: 'easeIn' },
                    { time: 383, attr: { opacity: '1.0' }, tween: 'linear' },
                    { time: 402, attr: { opacity: '0.0' }, tween: 'easeOut' }
                ]
            }, {
                dom: this.Dom_Phone_Wave2,
                frames: [
                    { time: 360, attr: { opacity: '0.0)' } },
                    { time: 380, attr: { opacity: '1.0' }, tween: 'easeIn' },
                    { time: 408, attr: { opacity: '1.0' }, tween: 'linear' },
                    { time: 423, attr: { opacity: '0.0' }, tween: 'easeOut' }
                ]
            }]);
        }
    };

    window.onload = function () {
        var m = new Motion();
        GOLBAL_POINT = m;
        m.M.play();
    };

})();
