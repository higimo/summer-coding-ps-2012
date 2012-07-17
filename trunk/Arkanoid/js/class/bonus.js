function Bonus( src )
{
    this.x = 0;
    this.y = 0;
    this.width = 17;
    this.height = 17;
    this.speedBall = new Image();
    this.speedBall.src = src;
}

Bonus.prototype.draw = function(context)
{
    context.drawImage( this.speedBall, this.x, this.y, this.width, this.height );
}