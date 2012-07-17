function Asteroid( x, y, width, height )
{
    this.width  = width;
    this.height = height;
    this.x      = x;
    this.y      = y;
    this.img    = document.getElementById("asteroid");
    this.dead   = false;
}

Asteroid.prototype.draw = function( context )
{
    context.save();
    this.y += 2;
    if ( this.y > canvas.height )
    {
        this.y = -this.height * 8;
    }
    context.drawImage( this.img, this.x, this.y, this.width, this.height );
    context.restore();
}

function animateAsteroid( context, asteroid, blaster, spaceCraft, heart, score )
{
    if ( !asteroid.dead )
    {
        asteroid.draw( context );
    }
    
    if ( intersectionOfSquaresObjct( blaster, asteroid ) && 
         !asteroid.dead )
    {
        asteroid.dead = true;
        asteroid.y    = -100;
        score.score  += 100;
    }
    
    if ( intersectionOfSquaresObjct( asteroid, spaceCraft ) )
    {
        var point     = true;
        var contact   = true;
        asteroid.dead = true;
        asteroid.x    = 0;
        asteroid.y    = 0;
        spaceCraft.life -= 1;
        
        for( var i = 4; i > -1; i-- )
        {
            if ( point && !heart[i].dead ) 
            {
                heart[i].dead = true;
                point         = false;
            }
        }
    }
}