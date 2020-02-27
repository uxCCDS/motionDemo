
    //example();
    var generatorBallMotion = function(x0, t0, dom) {
		//r 28 68 28 
		return [{
			dom: dom,
			frames: [
				{ attr: { fill: '#875AE0' }, time: t0 },
				{ attr: { fill: '#C7A5FA' }, time: t0 + 15, tween:'easeInOut' },
				{ attr: { fill: '#875AE0' }, time: t0 + 30, tween:'easeInOut'},
				{ attr: { r:'14.0', cx: x0 }, time: t0 },
				{ attr: { r:'33.6', cx: x0 + 17 }, time: t0 + 15, tween:'easeInOutSine'},
				{ attr: { r:'14.0', cx: x0 }, time: t0 + 65, tween:'easeInCubic'}
			]
		}];
	};

	var endtime = [0,76,58,41],
		COLORT =[[32,35],[26,50],[35,50],[31,50]],
		SCALET = [[35,35,80],[35,35,80],[35,60,80],[35,50,80]],
		OPACITY = {
			0:[25,26,35,45],
			2:[22,23,50,70],
			3:[36,37,45,60]
		};

	var spinner = function(index) {
		let ball = document.getElementById('s'+index),
			idx =index-1,
			ret =[{
	    	dom : ball, 
	    	frames: [
	    		{ attr: { fill: '#875AE0' }, time: 0 },
	    		{ attr: { fill: '#C7A5FA' }, time: COLORT[idx][0] },
	    		{ attr: { fill: '#875AE0' }, time: COLORT[idx][1] },
	    		{ attr: { r: '28.0' }, time: 0 },
	    		{ attr: { r: '13.0' }, time: SCALET[idx][0], tween:'easeInOut' },
	    		{ attr: { r: '13.0' }, time: SCALET[idx][1] },
	    		{ attr: { r: '28.0' }, time: SCALET[idx][2], tween:'easeInOut' }
	    	]
	    }];

	    if(OPACITY[idx]) {
	    	ret.push({
		    	dom : ball, 
		    	frames: [
		    		{ css: { opacity: '1.0' }, time: OPACITY[idx][0]},
		    		{ css: { opacity: '0.0' }, time: OPACITY[idx][1]},
		    		{ css: { opacity: '0.0' }, time: OPACITY[idx][2]},
		    		{ css: { opacity: '1.0' }, time: OPACITY[idx][3]}
		    	]
		    });
		}

	    if(index>1) {
	    	ret.push({
		        dom: document.getElementById('svgSpinner'+index),
		        frames: [{
		            css: {
		                transform: 'rotate(0deg)'
		            },
		            time: 0
		        },{
		            css: {
		                transform: 'rotate(-360deg)'
		            },
		            time: endtime[idx],
		            tween:'easeInOut'
		        }]
		    });
	    }

		return ret;
	};

	var animation1 = function() {
	    var b1 = generatorBallMotion(136, 0, document.getElementById('c1')),
	        b2 = generatorBallMotion(200, 15, document.getElementById('c2')),
	        b3 = generatorBallMotion(264, 30, document.getElementById('c3'));

		var motion = mframe([{
	        dom: document.getElementById('svgLoading'),
	        frames: [{
	            css: {
	                transform: 'translateX(0px)'
	            },
	            time: 10
	        },{
	            css: {
	                transform: 'translateX(30px)'
	            },
	            time: 40
	        },{
	            css: {
	                transform: 'translateX(-30px)'
	            },
	            time: 70
	        },{
	            css: {
	                transform: 'translateX(0px)'
	            },
	            time: 100
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
	            time: 0
	        },{
	            css: {
	                transform: 'rotate(-360px)'
	            },
	            time: 100
	        }]
	    }];
		var motion = mframe(outer.concat(s1).concat(s2).concat(s3).concat(s4));
		console.log(motion);
		motion.repeat(Infinity);
	};

window.onload = function() {
	animation1();
	animation2();
};