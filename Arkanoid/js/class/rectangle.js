// Rectangle

function Rectangle( x, y, src )
{
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 40;
    this.brick = new Image();
    this.brick.src = src;
}

Rectangle.prototype.draw = function ( context )
{   
    context.drawImage(this.brick, this.x, this.y, this.width, this.height );
}
