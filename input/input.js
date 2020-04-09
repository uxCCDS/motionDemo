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
            left0 = (16 + w) / 2 >> 0,
            left1 = 12,
            w2 = w + 4 * 2;
        this.Motion = mframe([{
            dom: this._BorderBc,
            frames: [
                { css: { left: left0 + 'px', width: '0px' }, time: 0 },
                { css: { left: left1 + '.0px', width: w2 + '.0px' }, time: 6, tween: 'easeOut' }
            ]
        }, {
            dom: this.Dom,
            frames: [
                { css: { 'border-color': '#CCCCCC' }, time: 0 },
                { css: { 'border-color': '#007AA3' }, time: 6 }
            ]
        }, {
            dom: this._Hint,
            frames: [
                { css: { color: '#545454' }, time: 0 },
                { css: { color: '#007AA3', top: '8px', transform: 'scale(1.0)' }, time: 6 },
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