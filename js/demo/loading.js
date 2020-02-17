
    //example();
    var step = 2;

    var generatorBallMotion = function(x0, t0, dom) {
		//r 28 68 28 
		return [{
			dom: dom,
			frames: [{
				attr: {
					fill: '#875AE0'
				},
				time: t0
			},{
				attr: {
					fill: '#C7A5FA'
				},
				time: t0 + 8 * step
			},{
				attr: {
					fill: '#875AE0'
				},
				time: t0 + 16 * step
			}]
		},{
			dom: dom,
			frames: [{
				attr: {
                    r:'14.0',
                    cx: x0
				},
				time: t0
			},{
				attr: {
					r:'28.0',
                    cx: x0 + 17
				},
				time: t0 + 8 * step
			},{
				attr: {
					r:'14.0',
                    cx: x0
				},
				time: t0 + 32 * step
			}]
		}];
	};

	var step2 = 3,
		endtime = [20,20,28,38],
		COLORT =[[16,18],[16,25],[18,25],[13,25]],
		SCALET = [[0,17,17,40],[0,17,25,40],[0,17,30,40],[0,17,17,40]];

	var spinner = function(index) {
		let ball = document.getElementById('s'+index),
			idx =index-1,
			ret =[{
	    	dom : ball, 
	    	frames: [{
	    		attr: {
					fill: '#875AE0'
				},
				time: 0
	    	},{
	    		attr: {
					fill: '#C7A5FA'
				},
				time: COLORT[idx][0]
	    	},{
	    		attr: {
					fill: '#875AE0'
				},
				time: COLORT[idx][1]
	    	}]
	    },{
	    	dom : ball, 
	    	frames: [{
	    		attr: {
					r: '28.0'
				},
				time: SCALET[idx][0]
	    	},{
	    		attr: {
					r: '13.0'
				},
				time: SCALET[idx][1]
	    	},{
	    		attr: {
					r: '13.0'
				},
				time: SCALET[idx][2]
	    	},{
	    		attr: {
					r: '28.0'
				},
				time: SCALET[idx][3]
	    	}]
	    }];

	    if(index>1) {
	    	ret.push({
		        dom: document.getElementById('svgSpinner'+index),
		        frames: [{
		            css: {
		                transform: 'rotate(0deg)'
		            },
		            time: 0 * step2
		        },{
		            css: {
		                transform: 'rotate(-360deg)'
		            },
		            time: endtime[idx] * step2,
		            tween:'easeInOut'
		        }]
		    });
	    }

		return ret;
	};

	var animation1 = function() {
	    var b1 = generatorBallMotion(136, 0, document.getElementById('c1')),
	        b2 = generatorBallMotion(200, 8, document.getElementById('c2')),
	        b3 = generatorBallMotion(264, 16, document.getElementById('c3'));

		var motion = new MM([{
	        dom: document.getElementById('svgLoading'),
	        frames: [{
	            css: {
	                transform: 'translateX(0px)'
	            },
	            time: 5 * step
	        },{
	            css: {
	                transform: 'translateX(8px)'
	            },
	            time: 20 * step
	        },{
	            css: {
	                transform: 'translateX(-8px)'
	            },
	            time: 35 * step
	        },{
	            css: {
	                transform: 'translateX(0px)'
	            },
	            time: 50 * step
	        }]
	    }].concat(b1).concat(b2).concat(b3));
		motion.repeat(Infinity);
	},
	animation2 =function() {
		let s1 = spinner(1),
			s2 = spinner(2),
			s3 = spinner(3),
			s4 = spinner(4),
			outer = [{
	        dom: document.getElementById('scon'),
	        frames: [{
	            css: {
	                transform: 'rotate(0deg)'
	            },
	            time: 0 * step2
	        },{
	            css: {
	                transform: 'rotate(-360px)'
	            },
	            time: 48 * step2
	        }]
	    }];
		var motion = new MM(outer.concat(s1).concat(s2).concat(s3).concat(s4));
		motion.repeat(Infinity);
	};

window.onload = function() {
	animation1();
	animation2();
};