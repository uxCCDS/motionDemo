(function () {

    var f = function(num) {
        var str = '' + num;
        return str.indexOf('.')!==-1 ? str : num.toFixed(1);
    };

    var Motion = function () {
        this.initDom();
        this.initMotion();
    };
    Motion.prototype = {
        initDom: function () {
            this.Dom_Screen_Bg = document.getElementById('screen_bg');
            this.Dom_Screen_Inner_Bg = document.getElementById('screen_inner_bg');
            this.Dom_Screen_Button1 = document.getElementById('screen_button1');
            this.Dom_Screen_Button2 = document.getElementById('screen_button2');
            this.Dom_Screen_Button3 = document.getElementById('screen_button3');
            this.Dom_Human = document.getElementById('human');
        },
        initMotion: function() {
            this._initAppear();
        },
        _init_screen_button: function(dom, x, w) {
            this.M.add([{
                dom: dom,
                frames: [
                    { time: 22, attr: { x: f(x+w/2), width: '0.0'}},
                    { time: 34, attr: { x: f(x), width: f(w)}}
                ]
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
            }, {
                dom: this.Dom_Human,
                frames: [
                    { time: 35, attr: { transform: "translate(0,187.0)" } },
                    { time: 63, attr: { transform: "translate(0,-4.0)" }, tween: 'easeInOut' },
                    { time: 71, attr: { transform: "translate(0,0.0)" }, tween: 'easeInOut' }
                ]
            }]);
            this._init_screen_button(this.Dom_Screen_Button1, 72, 40);
            this._init_screen_button(this.Dom_Screen_Button2, 180, 100);
            this._init_screen_button(this.Dom_Screen_Button3, 348, 40);
        }
    };

    window.onload = function () {
        var m = new Motion();
        m.M.play();
    };

})();
