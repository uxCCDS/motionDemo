var round = (num)=>{
    var int = num>>0;
    return int % 2 === 0 ? int : int+1;
};

var ceil = (num)=>{
    var int = num>>0;
    var float = num-int;
    var plus = int % 2 === 0 ? 2 : 1;
    return float > 0 ? int+ plus : int;
};

var floor =(num)=> {
    var int = num>>0;
    return int % 2 ===0 ? int : int -1;
};

var linear = function(base, rate, max) {
    var arr = {
        round:[base],
        ceil:[base],
        floor:[base]
    };
    for(let i=0;i<max;i++) {
        arr.round.push(round(arr.round[i]*rate));
        arr.ceil.push(ceil(arr.ceil[i]*rate));
        arr.floor.push(floor(arr.floor[i]*rate));
    }
    console.log(`>>>>>>>>>>>>>>>>base: ${base} rate: ${rate} `); 
    console.log(`round: ${arr.round}`); 
    console.log(`ceil: ${arr.ceil}`); 
    console.log(`floor: ${arr.floor}`); 
};

(function () {
    const funcs = mframe.Tween;
    const begin = 12;
    const change = 120-12;
    const duration = 9; 
    /*
        * Tween
        * @Author:     yulianghuang
        * @CreateDate  2020/2/7
        * @param t {num} current time（当前时间）
        * @param b {num} beginning value（初始值）
        * @param c {num} change in value（变化量）
        * @param d {num} duration（持续时间）
    */
    Object.keys(funcs).forEach((key)=>{
        if(key!=='add' && key.indexOf('easeIn')!==-1 && key.indexOf('easeInOut')==-1) {
            let arr=[];
            for(let i=0;i<=duration;i++) {
                arr.push(+funcs[key](i,begin,change,duration).toFixed(2));
            }
            console.log(key);
            console.log(arr);
        }
    });

    const duration2 = 15; 
    linear(begin, 1.15, duration2);
    linear(begin, 1.16, duration2);
    linear(begin, 1.17, duration2);
    linear(begin, 1.18, duration2);
    linear(begin, 1.19, duration2);
    linear(begin, 1.2, duration2);
    linear(begin, 1.21, duration2);
    linear(begin, 1.22, duration2);
    linear(begin, 1.23, duration2);
    linear(begin, 1.24, duration2);
    linear(begin, 1.25, duration2);
})();
