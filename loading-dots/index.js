document.addEventListener('DOMContentLoaded',function(){
    var dots = document.getElementById('loading_dots'),
        tabs = document.getElementById('tab_select');
    var speed = [0.5, 0.75, 1, 2];
    tabs.Events.bind('onSelect', function(index) {
        dots.setAttribute('speed',speed[index]);
    });
});