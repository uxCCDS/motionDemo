(function () {

    var M = function() {
        this.init();
    };
    M.prototype = {
        init: function() {
            this.Dom = document.getElementById('DomPath');
            this.Stops = document.getElementById('a').querySelectorAll('stop');
            console.log(this.Dom);
            this.Motion = mframe([{
                dom: this.Dom,
                frames: [
                    { 
                        time: 0,
                        attr: { 
                            d: 'm91.1 76.38 6.1 101.52-61.23-29.17L263.75 5.83a38.1 38.1 0 0 1 40.96 64.3L78.95 216.2a39.8 39.8 0 0 1-60.79-26.52l-0.44-2.65L0.65 86.77A45.59 45.59 0 1 1 91.1 76.38a100 100 0 0 1 0 0Z'
                        }
                    },
                    { 
                        time: 60,
                        tween: 'easeInOut', 
                        attr: { 
                            d: 'm89.56 33.87 46.39 174.88-68.25-15.12L222.88 21.58a38.1 38.1 0 0 1 57.02 50.6L127.54 246.73a39.8 39.8 0 0 1-67.72-13.48l-0.54-1.64L2.33 59.88A45.52 45.52 0 0 1 31.21 2.33a45.55 45.55 0 0 1 58.35 31.54Z'
                        }
                    }
                ]
            },{
                dom: document.getElementById('a'),
                frames: [
                    { 
                        time: 0,
                        attr: { 
                            x1:'0.36',
                            x2:'329.75',
                            y1:'111.3',
                            y2:'111.3'
                        }
                    },
                    { 
                        time: 60,
                        tween: 'easeInOut', 
                        attr: { 
                            x1:'0.43',
                            x2:'296.91',
                            y1:'130.18',
                            y2:'130.18'
                        }
                    }
                ]
            },{
                dom: this.Stops[0],
                frames: [
                    { time: 0, attr: { offset:'0.08', 'stop-color':'#B59880' }},
                    { time: 60, tween: 'easeInOut',  attr: { offset:'0', 'stop-color':'#4787C7' }}
                ]
            },{
                dom: this.Stops[1],
                frames: [
                    { time: 0, attr: { offset:'0.65', 'stop-color':'#92929F' }},
                    { time: 60, tween: 'easeInOut',  attr: { offset:'0.48', 'stop-color':'#92929F' }}
                ]
            },{
                dom: this.Stops[2],
                frames: [
                    { time: 0, attr: { offset:'1', 'stop-color':'#4787C7' }},
                    { time: 60, tween: 'easeInOut',  attr: { offset:'0.95', 'stop-color':'#B59880' }}
                ]
            }]); 
        },
        play: function() {
            //this.Motion.state(1, true);
            this.Motion.play();
        },
        repeat: function() {
            console.log(this.Motion);
            this.Motion.repeat(Infinity);
        }
    };

    window.onload = function(){
        let motion = new M();
        motion.play();
    };

})();