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
            w = this._Hint.clientWidth * 0.7 >> 0,
            h = (-this._Hint.clientHeight / 2) >> 0,
            t = parseInt(mframe.Cpu.Cores.css.get(this._Hint, 'top')),
            left = parseInt(mframe.Cpu.Cores.css.get(this._Hint, 'left')),
            left0 = left + w / 2 >> 0;

        this.Motion = mframe([{
            dom: this._BorderBc,
            frames: [
                { css: { left: left0 + 'px', width: '0px' }, time: 0 },
                { css: { left: left + '.0px', width: w + '.0px' }, time: 6, tween: 'easeOut' }
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
    },
    isEmpty: function () {
        return this.Input.value.replace(/\r\n\t\s/g, '') === '';
    },
    focus: function () {
        if (this.isEmpty()) {
            this.Motion.pause();
            this.Motion.play();
        }
    },
    keyup: function() {
        var c = this.Dom.className;
        if(this.isEmpty()) {
            this.Dom.className = c.replace(' md_input_typed', '');
        } else if(c.indexOf(' md_input_typed') === -1){
            this.Dom.className += ' md_input_typed';
        }
    },
    blur: function () {
        if (this.isEmpty()) {
            this.Motion.pause();
            this.Motion.reverse();
        }
    }
};

window.onload = function () {
    new Input(document.getElementById('md_input'));
};