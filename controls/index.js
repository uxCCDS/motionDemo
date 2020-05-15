var Voice = function() {
    this.init();
};
Voice.prototype = {
    init: function() {
        this.initM1();
        this.initM2();
    },
    initM1: function() {
        var motion = mframe([{
            dom: document.getElementById('m_rectBackground'),
            frames: [
                //2-17（15）
                { attr: {y:'8'} , time:0 },
                { attr: {y:'15.0'} , time:24, tween: 'easeInOut' },
                { attr: {y:'9.0'} , time:42, tween: 'easeInOut' },
                { attr: {y:'11.0'} , time:44, tween: 'easeInOut' },
                { attr: {y:'13.0'} , time:62, tween: 'easeInOut' },
                { attr: {y:'2.0'} , time:86, tween: 'easeInOut' },
                { attr: {y:'8.0'} , time:112, tween: 'easeInOut' },
                { attr: {y:'15.0'} , time:134, tween: 'easeInOut' },
                { attr: {y:'9.0'} , time:158, tween: 'easeInOut' },
                { attr: {y:'11.0'} , time:178, tween: 'easeInOut' },
                { attr: {y:'8.0'} , time:204, tween: 'easeInOut' }
            ]
        }]);
        motion.repeat(Infinity);
        this.M1 = motion;
    },
    initM2: function() {
        var btn = document.getElementById('btnMute'),
            rect = document.getElementById('m_rectBackground'),
            line = document.getElementById('m_mute_path_line'),
            path = document.getElementById('m_mute_path'),
            t=10;
        btn.Events.bind('initMotion', function() {
            btn.Motion[btn._key(0,1)].add([{
                dom: rect,
                frames: [
                    { time: 0, css: {opacity: '1.0'} },
                    { time: t, css: {opacity: '0.0'} }
                ]
            },{
                dom: path,
                frames: [
                    { time: 0, attr: {fill: '#ffffff'} },
                    { time: t, attr: {fill: '#FF5C4A'} }
                ]
            },{
                dom: line,
                frames: [
                    { time: 0, attr: {'stroke-dashoffset': '23.0'} },
                    { time: t, attr: {'stroke-dashoffset': '0.0'} }
                ]
            }]);

            btn.Motion[btn._key(1,0)].add([{
                dom: rect,
                frames: [
                    { time: 0, css: {opacity: '0.0'} },
                    { time: t, css: {opacity: '1.0'} }
                ]
            },{
                dom: path,
                frames: [
                    { time: 0, attr: {fill: '#FF5C4A'} },
                    { time: t, attr: {fill: '#ffffff'} }
                ]
            },{
                dom: line,
                frames: [
                    { time: 0, attr: {'stroke-dashoffset': '0.0'} },
                    { time: t, attr: {'stroke-dashoffset': '23.0'} }
                ]
            }]);
        });
        btn.Events.emit('initMotion');
    }
}

var Vd = function() {
    this.init();
};
Vd.prototype = {
    init() {
        var btn = document.getElementById('btn_video'),
            dot = document.getElementById('video_dot'),
            line = document.getElementById('video_line'),
            path = document.getElementById('video_path'),
            t=10;
        btn.Events.bind('initMotion', function() {
            btn.Motion[btn._key(0,1)].add([{
                dom: dot,
                frames: [
                    { time: 0, css: {opacity: '1.0'} },
                    { time: t, css: {opacity: '0.0'} }
                ]
            },{
                dom: path,
                frames: [
                    { time: 0, attr: {fill: '#ffffff'} },
                    { time: t, attr: {fill: '#FF5C4A'} }
                ]
            },{
                dom: line,
                frames: [
                    { time: 0, attr: {'stroke-dashoffset': '22.0'} },
                    { time: t, attr: {'stroke-dashoffset': '0.0'} }
                ]
            }]);

            btn.Motion[btn._key(1,0)].add([{
                dom: dot,
                frames: [
                    { time: 0, css: {opacity: '0.0'} },
                    { time: t, css: {opacity: '1.0'} }
                ]
            },{
                dom: path,
                frames: [
                    { time: 0, attr: {fill: '#FF5C4A'} },
                    { time: t, attr: {fill: '#ffffff'} }
                ]
            },{
                dom: line,
                frames: [
                    { time: 0, attr: {'stroke-dashoffset': '0.0'} },
                    { time: t, attr: {'stroke-dashoffset': '22.0'} }
                ]
            }]);
        });
        btn.Events.emit('initMotion');
    }
};

window.onload = function() {
    new Voice();
    new Vd();
    var motion2 = mframe([{
        dom: document.getElementById('m_recording'),
        frames: [
            { attr: {fill:'#D93829', r: '4'} , time:0 },
            { attr: {fill:'#F7644A', r: '5.4'} , time:60, tween: 'easeInOut' },
            { attr: {fill:'#D93829', r: '4.0'} , time:120, tween: 'easeInOut' }
        ]
    }]);
    motion2.repeat(Infinity);
}