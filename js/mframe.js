!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mframe=e():t.mframe=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";n.r(e);var r={guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))},access:function(t,e,n,r){var i=t.length;if("number"==typeof i)for(var s=0;s<i;s++)r(t[s],e,n);else r(t,e,n)},each:function(t,e,n){var r=t.length;if("number"==typeof r)for(var i=0;i<r;i++)t[i][e].apply(t[i],n);else t[e].apply(t,n)},toArray:function(t){return Array.prototype.slice.call(t)},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},int:function(t,e){var n,r=e||0;return"number"==typeof t&&(n=t>>0)>=0?n:r}},i={_regConfig:{Chrome:{Reg:/.*(chrome)\/([\w.]+).*/,CssPrefixes:"Webkit"},Firefox:{Reg:/.*(firefox)\/([\w.]+).*/,CssPrefixes:"Moz"},Opera:{Reg:/(opera).+version\/([\w.]+)/,CssPrefixes:"O"},Safari:{Reg:/.*version\/([\w.]+).*(safari).*/,CssPrefixes:"Webkit"},IE:{Reg:/.*(msie) ([\w.]+).*/,CssPrefixes:"ms"}},CssPrefixes:"",init:function(){var t=this._regConfig,e=navigator.userAgent.toLowerCase();for(var n in t){if(null!=t[n].Reg.exec(e)){this.CssPrefixes=t[n].CssPrefixes;break}}}};navigator&&navigator.userAgent&&i.init();var s=i,o={support:{},regMsPrefix:/^-ms-/,regDashAlpha:/-([\da-z])/gi,cssProps:{},camelCase:function(t){return t.replace(this.regMsPrefix,"ms-").replace(this.regDashAlpha,this.fcamelCase)},fcamelCase:function(t,e){return e.toUpperCase()},upper1st:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},vendorPropName:function(t,e){if(e in t)return e;var n=this.upper1st(e),r=e;return(e=s.CssPrefixes+n)in t?e:r},test:function(){var t,e,n;(t=document.createElement("div")).innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",(n=(e=t.getElementsByTagName("a")[0])&&e.style)&&(n.cssText="float:left;opacity:.5",this.support.cssFloat=!!n.cssFloat,this.support.clearCloneStyle="content-box"===t.style.backgroundClip,this.cssProps.float=this.support.cssFloat?"cssFloat":"styleFloat",this.getComputedStyle="function"==typeof window.getComputedStyle?window.getComputedStyle:document.defaultView.getComputedStyle)},getPropName:function(t,e){return this.cssProps[e]||(this.cssProps[e]=this.vendorPropName(t,e))},css:function(t,e,n){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var r=this.camelCase(e),i=t.style,s=this.getPropName(i,r);if(void 0===n){var o,a=i[s];if(void 0===a||""===a){try{o=document.defaultView.getComputedStyle(t)[s]}catch(t){return""}return o}return i[s]}if(null!=n&&n==n)try{i[s]=n}catch(t){}}}};o.test();var a={Cores:{css:{_set:function(t,e,n){o.css(t,e,n)},set:function(t,e,n){r.access(t,e,n,this._set)},_get:function(t,e){return o.css(t,e)},get:function(t,e){return this._get("number"==typeof t.length?t[0]:t,e)}},attr:{_set:function(t,e,n){t.setAttribute(e,n)},set:function(t,e,n){r.access(t,e,n,this._set)},_get:function(t,e){return t.getAttribute(e)},get:function(t,e){return this._get("number"==typeof t.length?t[0]:t,e)}},prop:{_set:function(t,e,n){t[e]=n},set:function(t,e,n){r.access(t,e,n,this._set)},_get:function(t,e){return t[e]},get:function(t,e){return this._get("number"==typeof t.length?t[0]:t,e)}},arg:{set:function(t,e,n){return""},get:function(t,e){return""}}},install:function(t,e){this.Cores[t]=e},uninstall:function(t){delete this.Cores[t]},createStorage:function(){var t={};for(var e in this.Cores)t[e]={};return t},core:function(t){return this.Cores[t]}},u={RegNum:/(-?\d+)(\.\d+)?/g,toRgbaArr:function(t){var e,n,r,i=1;if("#"===t[0]){var s=4===t.length?1:2;e=parseInt(t.slice(1,1+s),16),n=parseInt(t.slice(1+s,1+2*s),16),r=parseInt(t.slice(1+2*s,1+3*s),16)}else{var o=t.match(this.RegNum);e=+o[0],n=+o[1],r=+o[2],i=o.length>3?+o[3]:1}return[e,n,r,i]},toRgba:function(t){return"rgba("+t.join(",")+")"},toHex:function(t){return"#"+t[0].toString(16)+t[1].toString(16)+t[2].toString(16)}},c={add:function(t,e){this[t]=e},linear:function(t,e,n,r){return n*t/r+e},easeIn:function(t,e,n,r){return n*(t/=r)*t+e},easeOut:function(t,e,n,r){return-n*(t/=r)*(t-2)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return n*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return n*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return n*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-n*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return n*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return n*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){return-n*Math.cos(t/r*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,r){return n*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-n/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:n*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){return t==r?e+n:n*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){return 0==t?e:t==r?e+n:(t/=r/2)<1?n/2*Math.pow(2,10*(t-1))+e:n/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-n*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return n*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){return(t/=r/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInBounce:function(t,e,n,r){return n-tween.bounceEaseOut(r-t,0,n,r)+e},easeOutBounce:function(t,e,n,r){return(t/=r)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,r){return t<r/2?.5*tween.bounceEaseIn(2*t,0,n,r)+e:.5*tween.bounceEaseOut(2*t-r,0,n,r)+.5*n+e}},f=function(t,e,n){this.Keys={},this.Timing=[],this._LaterComplie={},this.Frames={},this.Dom=t,this.CpuCore=a.core(e),this.PropName=n};f.prototype={RegList:[/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/,/^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/,/(-?\d+)(\.\d+)?/],Reg:/(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))|(([rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}))|((-?\d+)(\.\d+)?)/g,RegFloat:/\./g,_sort:function(t,e){return t-e},add:function(t,e,n){-1===this.Timing.indexOf(e)&&(this.Timing.push(e),this.Timing.sort(this._sort)),this.Keys[e]={value:t,tween:n}},complie:function(){var t,e,n,r,i=this.Keys,s=this.Timing;for(var o in this._LaterComplie)t=s[+o],e=s[+o+1],n=i[t],r=i[e],this._patch(t,e,this.val(n.value),this.val(r.value),r.tween)},preComplie:function(){var t,e,n,r,i=this.Timing,s=this.Keys;this._LaterComplie={};for(var o=0,a=i.length-1;o<a;o++)t=i[o],e=i[o+1],n=s[t],r=s[e],this._ifLaterComplie(n.value)||this._ifLaterComplie(r.value)?this._LaterComplie[o]=!0:this._patch(t,e,n.value,r.value,r.tween)},val:function(t){return"function"==typeof t?t():null===t?this.CpuCore.get(this.Dom,this.PropName):t},render:function(t){void 0!==this.Frames[t]&&this.CpuCore.set(this.Dom,this.PropName,this.Frames[t])},_patch:function(t,e,n,r,i){var s="number"==typeof n&&"number"==typeof r,o=n.toString(),a=r.toString(),u=this._match(o),f=this._match(a),h=e-t,p=c[i]||c.linear;if(h>1&&n!==r){var l=this._analyzeMatch(u,f);if(l)if(s)for(var m=t+1;m<e;m++)this.Frames[m]=+this._patchProp(o,l,m-t,h,p);else for(m=t+1;m<e;m++)this.Frames[m]=this._patchProp(o,l,m-t,h,p)}this.Frames[t]=n,this.Frames[e]=r},_number:function(t,e){return e?parseInt(t):+t},_patchProp:function(t,e,n,r,i){var s=e.start,o=e.end,a=e.int,c=this._number,f=0;return t.replace(this.Reg,(function(t){var e,h=s[f],p=o[f];if("number"==typeof h)e=c(i(n,+h,+p-h,r),a[f]);else{for(var l=[],m=0,v=h.length;m<v;m++){var g=i(n,+h[m],+p[m]-h[m],r);l.push(m<3?parseInt(g):g)}e="#"===t[0]?u.toHex(l):u.toRgba(l)}return f++,e}))},_analyzeMatch:function(t,e){var n=t.typeLike,r=e.typeLike,i=t.match,s=e.match,o=n.length,a={start:[],end:[],int:[]};if(o!==r.length||0===o||0===r.length)return!1;for(var c=0;c<o;c++){if(n[c]!==r[c])return!1;1===n[c]?(a.start.push(+i[c]),a.end.push(+s[c]),a.int.push(this._needConvertInt(i[c],s[c]))):(a.start.push(u.toRgbaArr(i[c])),a.end.push(u.toRgbaArr(s[c])),a.int.push([!0,!0,!0,!1]))}return a},_needConvertInt:function(t,e){return!(this.RegFloat.test(t)||this.RegFloat.test(e))},_match:function(t){for(var e=t.match(this.Reg)||[],n=[],r=[],i=0;i<e.length;i++){var s=this._matchType(e[i]);n.push(s),r.push(2===s?1:0)}return{match:e,type:n,typeLike:r}},_matchType:function(t){for(var e=this.RegList,n=0,r=e.length;n<r;n++)if(e[n].test(t))return n},_ifLaterComplie:function(t){return"function"==typeof t||null===t}};var h=f,p=function(){this.Events={}};p.prototype={RegInt:/^[1-9]\d*$/,bind:function(t,e){return void 0===e._$EventGuid&&(e._$EventGuid=r.guid()),void 0===this.Events[t]&&(this.Events[t]={}),this.Events[t][e._$EventGuid]=e,e._$EventGuid},binds:function(t,e){if(t){var n,r="number"==typeof e;for(var i in t)n=r&&this.RegInt.test(i)?e+i:i,this.bind(n,t[i])}},emit:function(t,e,n){var r=this.Events[t];if(r)for(var i in r)r[i].apply(n,e)},fire:function(t,e,n){var r=this.Events[t];if(r)for(var i in r)r[i].call(n,e)},unbind:function(t,e){if(this.Events[t]){var n="string"==typeof e?e:e._$EventGuid;delete this.Events[t][n]}}};var l=p,m=function(t,e){this.Dom=t.dom,this.Frames=t.frames,this.Storage=a.createStorage(),this.Events=new l,this.Events.binds(t.events),this.ZeroFrame=e||0,this._scan()};m.prototype={_store:function(t,e,n,r){if(void 0!==e){var i=this.Storage[t],s=this.Dom;for(var o in e)void 0===i[o]&&(i[o]=new h(s,t,o)),i[o].add(e[o],n,r)}},_scan:function(){for(var t,e,n,r=this.Frames,i=this.Storage,s=0,o=0,a=r.length;o<a;o++){for(var u in n=(t=r[o]).time||0,e=t.tween||"linear",i)this._store(u,t[u],n,e);s=Math.max(n,s)}this.LastFrame=s,this._excuteStorage("preComplie")},getArgs:function(t){var e,n=this.Storage.arg,r={};for(var i in n)void 0!==(e=n[i].Frames[t])&&(r[i]=e);return r},render:function(t){if(t>=this.ZeroFrame&&t<=this.LastFrame){let e=t-this.ZeroFrame;this.Events.emit("beforeEach",[e]),this._excuteStorage("render",e),this.Events.emit("each",[e,this.getArgs(e)]),this.Events.emit(e)}},_excuteStorage:function(t,e){var n,r=this.Storage;for(var i in r)for(var s in n=r[i])n[s][t](e)},complie:function(){this._excuteStorage("complie")}};var v=m,g=function(t,e){this.Timelines=[],this.LastFrame=0,this._AnimationID,this.CurrentFrame=0,this.Repeat=1,this.Events=new l,this.Events.binds(e),this.add(t)};g.prototype={add:function(t,e){for(var n=r.isArray(t)?t:[t],i=0,s=e?this.LastFrame:0,o=0,a=n.length;o<a;o++){var u=new v(n[o],s);this.Timelines.push(u),i=Math.max(i,u.LastFrame)}return this.LastFrame=Math.max(this.LastFrame,i),this},append:function(t){return this.add(t,!0),this},bind:function(t,e){return this.Events.bind(t,e),this},run:function(t,e){if(this._AnimationID)return this;var n,i,s=r.int(t,this.CurrentFrame),o=r.int(e,this.LastFrame),a=s,u=this;s<=o?(n=1,i=function(){return a<=o}):(n=-1,i=function(){return a>=o});var c=function(){u.Events.emit("start"),i()?(u.render(a),u._AnimationID=requestAnimationFrame(c),a+=n):(u.Repeat--,u.Repeat<=0?(u._AnimationID=null,u.Events.emit("end"),u.Repeat=1):(a=s,u.render(a),u._AnimationID=requestAnimationFrame(c)))};return this._complie(),c(),this},_complie:function(){r.each(this.Timelines,"complie")},render:function(t){this.Events.emit("beforeEach",[t]),r.each(this.Timelines,"render",[t]),this.Events.emit("each",[t]),this.Events.emit(t),this.CurrentFrame=t},reverse:function(){return this.run(this.CurrentFrame>0?this.CurrentFrame:this.LastFrame,0),this},repeat:function(t){this.Repeat=t,this.play()},play:function(){return this.run(),this},stop:function(){return cancelAnimationFrame(this._AnimationID),this._AnimationID=null,this.CurrentFrame=0,this.Events.emit("stop"),this},pause:function(){return cancelAnimationFrame(this._AnimationID),this._AnimationID=null,this.Events.emit("pause"),this}};var d=g,y=function(t,e){return new d(t,e)};y.Cpu=a,y.Tween=c;var x=function(t,e){"undefined"!=typeof window&&void 0===window[t]&&(window[t]=e)};x("mf",y),x("mframe",y);e.default=y}]).default}));
//# sourceMappingURL=mframe.js.map