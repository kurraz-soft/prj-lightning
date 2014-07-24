define(['lib/Point','lib/Segment'],function(Point,Segment){
    var Lightning = function(){ this.segmentList = null; this.startPoint = null; this.endPoint = null; };

    Lightning.prototype.prepare = function(startPoint,endPoint){
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        var offsetAmount = 70;
        var segmentList = [];

        //var startPoint = new Point(50,200);
        //var endPoint = new Point(500,200);

        segmentList.push(new Segment(startPoint,endPoint));

        var N = 6;
        var BRANCH_MAX_ANGLE = 10;
        var BRANCH_LENGTH_SCALE = 0.7;
        var BRANCH_RATE = 0.3;

        for(var i=0; i<N; i++)
        {
            var newSegmentList = [];
            for(var j=0;j<segmentList.length;j++)
            {
                var segment = segmentList[j];
                var midPoint = segment.average();
                midPoint = midPoint.plus((new Point(segment.x,segment.y).normalize().perpendicular().multiple(Math.random() * (-offsetAmount - offsetAmount) + offsetAmount)));
                newSegmentList.push(new Segment(segment.start,midPoint,segment.rudiment));
                newSegmentList.push(new Segment(midPoint,segment.end,segment.rudiment));

                //Отклонение
                if(Math.random() < BRANCH_RATE){
                    var direction = midPoint.minus(segment.start);
                    var angle = Math.random() * (0 - BRANCH_MAX_ANGLE) + BRANCH_MAX_ANGLE;
                    var splitEnd = direction.rotate(angle).multiple(BRANCH_LENGTH_SCALE).plus(midPoint);
                    newSegmentList.push(new Segment(midPoint,splitEnd,true));
                }
            }
            segmentList = newSegmentList;
            offsetAmount /= 2;
        }

        segmentList = newSegmentList;

        this.segmentList = segmentList;
    };

    Lightning.prototype.draw = function(ctx,opacity,lineWidth){

        if(typeof opacity === 'undefined'){
            opacity = 1;
        }

        if(typeof lineWidth === 'undefined'){
            ctx.lineWidth = 1;
        }else
        {
            ctx.lineWidth = lineWidth;
        }

        ctx.strokeStyle = 'rgba(255,69,0,' + opacity + ')';
        ctx.fillStyle = 'rgba(255,69,0,' + opacity + ')';

        ctx.shadowColor = "#FFFFFF"; // string
        //Цвет тени. Поддерживаются стандарты RGB, RGBA, HSL, HEX и некоторые другие.
        ctx.shadowOffsetX = 0; // integer
        //Горизонтальная длина тени относительно текста.
        ctx.shadowOffsetY = 0; // integer
        //Высота тени относительно текста.
        ctx.shadowBlur = 10; // integer
        ctx.save();

        ctx.beginPath();
        for(var i = 0;i< this.segmentList.length; i++)
        {
            var segment = this.segmentList[i];
            /*
            if(segment.rudiment){
                ctx.lineWidth = 1;
            }
            */
            ctx.moveTo(segment.start.x,segment.start.y);
            ctx.lineTo(segment.end.x,segment.end.y);
            /*
            if(segment.rudiment){
                ctx.restore();
            }
            */
        }
        ctx.stroke();
        ctx.fill();

        ctx.shadowColor = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();
        /*

        ctx.save();

        var gradient = ctx.createLinearGradient(0, 0, this.endPoint.x - this.startPoint.x, 0);
        gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
        gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
        gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
        gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
        gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
        gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 1)");

        ctx.fillStyle = gradient;

        ctx.globalCompositeOperation = "lighter";
        //ctx.drawImage(ctx.canvas,0,0);
        //ctx.drawImage(ctx.canvas,0,0);
        ctx.restore();
        */
    };

    return Lightning;
});
