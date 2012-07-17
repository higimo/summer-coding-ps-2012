function Score()
{
    this.x      = canvas.width  - 130;
    this.y      = canvas.height - 20;
    this.width  = 50;
    this.height = 20;
    this.score  = 0
}

Score.prototype.draw = function( context )
{
    context.save(); 
    context.fillStyle = "rgb( 200, 200, 100 )";
    context.font = "normal 18px sans-serif";
    context.fillText( "SCORE: " + this.score, this.x, this.y );
    //context.fillRect( 20, 20, 20, 20 );
    context.restore();
}