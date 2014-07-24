define(['lib/Point'],function(Point){

    var Segment = function(start, end, rudiment){
        this.start = start;
        this.end = end;
        if(typeof rudiment === 'undefined'){
            rudiment = false;
        }
        this.rudiment = rudiment;

        this.x = this.end.x - this.start.x;
        this.y = this.end.y - this.end.y;
    };

    Segment.prototype.average = function(){
        var x = (this.start.x + this.end.x) / 2;
        var y = (this.start.y + this.end.y) /2;
        return new Point(x,y);
    };

    return Segment;
});