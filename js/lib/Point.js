define(function(){
    var Point = function(x,y){
        this.x = x;
        this.y = y;
    };

    Point.prototype.plus = function(point){
        var x = this.x + point.x;
        var y = this.y + point.y;
        return new Point(x,y);
    };

    Point.prototype.minus = function(point){
        var x = this.x - point.x;
        var y = this.y - point.y;
        return new Point(x,y);
    };

    Point.prototype.perpendicular = function(){
        return new Point(-this.y,this.x);
    };

    Point.prototype.normalize = function(){
        var length = Math.sqrt(this.x*this.x + this.y*this.y);
        return new Point(this.x/length,this.y/length);
    };

    Point.prototype.multiple = function(val){
        var x = this.x * val;
        var y = this.y * val;
        return new Point(x,y);
    };

    Point.prototype.rotate = function(angle){
        angle = angle * (Math.PI / 180);
        var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        var y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Point(x,y);
    };
    return Point;
});