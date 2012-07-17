function Blaster( x, y, width, height )
{
    this.width  = width;
    this.height = height;
    this.x      = x;
    this.y      = y;
    this.speed  = 15;
}

Blaster.prototype.draw = function( context )
{
    context.save();
    context.fillStyle = "rgb( 20, 200, 100 )";
    context.fillRect( this.x, this.y, this.width, this.height );
    context.restore();
}

Blaster.prototype.drawAnimateBlaster = function( context )
{
    context.save();
    context.fillStyle = "rgba( 20, 200, 100, 0.7 )";
    context.fillRect( this.x, this.y, this.width, this.height );
    context.restore();
}

Blaster.prototype.getBlasterPosition = function( x, y )
{
    this.x = x;
    this.y = y;
}