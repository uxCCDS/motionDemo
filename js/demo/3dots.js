window.onload = function() {
    var svg = document.getElementById('svgLoading');
    var generatorBallMotion = function(x0, t0, dom) {
		//r 28 68 28 
		return [{
			dom: dom,
			frames: [
				{ attr: { fill: '#875AE0' }, time: t0 },
				{ attr: { fill: '#C7A5FA' }, time: t0 + 15, tween:'easeInOut' },
				{ attr: { fill: '#875AE0' }, time: t0 + 30, tween:'easeInOut'},
				{ attr: { r:'12.0', cx: x0 }, time: t0 },
                { attr: { r:'28.8', cx: x0 + 17 }, time: t0 + 15, tween:'easeInOut'},
				{ attr: { r:'12.0', cx: x0 }, time: t0 + 65, tween:'easeOut'}
			]
		}];
    };
    
    var b1 = generatorBallMotion(60, 0, document.getElementById('c1')),
        b2 = generatorBallMotion(100, 15, document.getElementById('c2')),
        b3 = generatorBallMotion(140, 30, document.getElementById('c3'));

    let motion = mframe([{
        dom: svg,
        frames: [
            { css: {transform: 'rotateY(0deg)' },  time: 10 },
            { css: {transform: 'rotateY(1.0deg)' },  time: 40 },
            { css: {transform: 'rotateY(-1.0deg)' },  time: 70 },
            { css: {transform: 'rotateY(0.0deg)' },  time: 100 }
        ]
    }].concat(b1).concat(b2).concat(b3));

    motion.repeat(Infinity);
}