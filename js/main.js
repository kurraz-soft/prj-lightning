requirejs.config({
    "paths": {
        //"jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min"
        "jquery": "lib/jquery-1.11.1.min"
    }
});

define(['jquery','lib/Lightning','lib/Point'],function($, Lightning, Point){
    $(function(){
        var intervalHandle = null;

        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var stop = false;

        $('#canvas').click(function(){
            if(intervalHandle !== null){
                //clearInterval(intervalHandle);
                cancelAnimationFrame(intervalHandle);
                intervalHandle = null;
                stop = true;
            }else{
                stop = false;
                ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );

                var iterator = 0;

                var lastTime = 0;
                var vendors = ['webkit', 'moz'];
                for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                    window.cancelAnimationFrame =
                        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
                }

                if (!window.requestAnimationFrame)
                    window.requestAnimationFrame = function(callback, element) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                            timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    };

                if (!window.cancelAnimationFrame)
                    window.cancelAnimationFrame = function(id) {
                        clearTimeout(id);
                    };

                var PARTIAL_OPACITY = 0.3;

                var lightningList = [
                    {lightning: new Lightning(), opacity: 0},
                    {lightning: new Lightning(), opacity: 0}
                ];
                var startPoint = new Point(50,200);
                var endPoint = new Point(600,200);

                function render(time)
                {
                    if(iterator == 0)
                    {
                        lightningList[0].lightning.prepare(startPoint,endPoint);
                        lightningList[0].opacity = 1;
                    }
                    if(iterator == 10){
                        lightningList[0].opacity = 0.5;
                        lightningList[1].lightning.prepare(startPoint,endPoint);
                        lightningList[1].opacity = 1;
                    }
                    if(iterator == 20){
                        lightningList[1].opacity = 0.5;
                        lightningList[0].lightning.prepare(startPoint,endPoint);
                        lightningList[0].opacity = 1;
                    }
                    if(iterator == 30)
                    {
                        lightningList[0].opacity = 0.5;
                        lightningList[1].lightning.prepare(startPoint,endPoint);
                        lightningList[1].opacity = 1;
                    }
                    if(iterator == 40){
                        lightningList[1].opacity = 0.5;
                        lightningList[0].lightning.prepare(startPoint,endPoint);
                        lightningList[0].opacity = 1;
                    }
                    if(iterator == 50){
                        lightningList[0].opacity = 0.5;
                        lightningList[1].lightning.prepare(startPoint,endPoint);
                        lightningList[1].opacity = 1;
                    }

                    ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );

                    for(var i in lightningList){
                        if(lightningList[i].opacity > 0)
                        {
                            lightningList[i].lightning.draw(ctx,lightningList[i].opacity);
                            lightningList[i].opacity -= 1 / 30;
                        }
                    }

                    //console.log(lightningList);

                    iterator++;
                    if(iterator > 60) iterator = 0;
                }

                var fps = 60;
                (function animloop(time){
                    setTimeout(function(){
                        if(stop) return;
                        intervalHandle = requestAnimationFrame(animloop);
                        render(time);
                    },1000 / fps);
                })();
            }
        });

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                stop = true;
            }
        });
    });
});