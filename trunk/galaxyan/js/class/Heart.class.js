function Heart( indent )
{
    this.x      = 20 + indent;
    this.y      = canvas.height - 30; 
    this.width  = 60 / 3;
    this.height = 50 / 3;
    this.img    = document.getElementById("heart");
    this.dead   = false;
}

Heart.prototype.draw = function( context )
{
    context.save(); 
    context.drawImage( this.img, this.x, this.y, this.width, this.height );
    context.restore();
}

function drawHeart( context, heart )
{
    for( var i = 0; i < heart.length; i++)
    {
        if ( !heart[i].dead )
        {
            heart[i].draw( context );
        }
    }
}