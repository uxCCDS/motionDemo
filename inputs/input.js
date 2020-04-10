var Input = function (dom) {
    this.Dom = dom;
    this._BorderBc = dom.getElementsByTagName('I')[0];
    this._Hint = dom.getElementsByTagName('LABEL')[0];
    this.Input = dom.getElementsByTagName('INPUT')[0];
    this.init();
};
Input.prototype = {
    init: function () {
        var me = this,
            w = (this._Hint.clientWidth * 0.7 +8)>> 0 ,
            h2 = this._Hint.clientHeight* 0.7 >> 0,
            h = (-this._Hint.clientHeight / 2) >> 0,
            t = parseInt(mframe.Cpu.Cores.css.get(this._Hint, 'top')),
            left = parseInt(mframe.Cpu.Cores.css.get(this._Hint, 'left')),
            left0 = left + w / 2 >> 0,
            left1 = left - 4;

        this.Motion = mframe([{
            dom: this._BorderBc,
            frames: [
                { css: { left: left0 + 'px', width: '0px' }, time: 0 },
                { css: { left: left1 + '.0px', width: w + '.0px', height:'1px', top:'-1px' }, time: 6, tween: 'easeOut' },
                { css: { height: h2 + '.0px', top: h + '.0px' }, time: 12, tween: 'easeOut' }
            ]
        }, {
            dom: this._Hint,
            frames: [
                { css: { top: t + 'px', transform: 'scale(1.0)' }, time: 6 },
                { css: { top: h + '.0px', transform: 'scale(0.7)' }, time: 12, tween: 'easeOut' }
            ]
        }], {
            each: function (i) {
                // console.log(i);
            }
        });

        this.Input.addEventListener('focus', function (e) {
            me.focus(e);
        });
        this.Input.addEventListener('blur', function (e) {
            me.blur(e);
        });
        this.Input.addEventListener('keyup', function (e) {
            me.keyup(e);
        });
        this.Input.addEventListener('mouseup', function (e) {
            me.mouseup(e);
        });
        this.Input.addEventListener('mousedown', function (e) {
            me.mousedown(e);
        });
    },
    isEmpty: function () {
        return this.Input.value.replace(/\r\n\t\s/g, '') === '';
    },
    focus: function () {
        this.addClass(this.Dom, 'md_input_focus');
        if (this.isEmpty()) {
            this.Motion.pause();
            this.Motion.play();
        }
    },
    removeClass: function(dom, className) {
        dom.className = dom.className.replace(' '+className, '');
    },
    addClass: function(dom, className) {
        if(dom.className.indexOf(' '+className)===-1) {
            dom.className += ' '+ className;
        }
    },
    mouseup: function() {
        this.removeClass(this.Dom, 'md_input_press');
    },
    mousedown: function() {
        this.addClass(this.Dom, 'md_input_press');
    },
    keyup: function() {
        var c = this.Dom.className;
        if(this.isEmpty()) {
            this.removeClass(this.Dom, 'md_input_typed');
        } else if(c.indexOf(' md_input_typed') === -1){
            this.addClass(this.Dom, 'md_input_typed');
        }
    },
    blur: function () {
        this.removeClass(this.Dom, 'md_input_focus');
        if (this.isEmpty()) {
            this.Motion.pause();
            this.Motion.reverse();
        }
    }
};

window.onload = function () {
    new Input(document.getElementById('md_input'));
};