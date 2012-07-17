function Space()
{
    this.x      = 0;
    this.y      = -canvas.height;
    this.radius = 20;
    this.width  = canvas.width;
    this.height = canvas.height * 2;
    this.img    = document.getElementById("space");
    this.img2    = document.getElementById("spaceSteroid");
}

Space.prototype.draw = function( context )
{
    context.save(); 
    context.fillRect( 0, 0, this.width, this.height );
    context.restore();
}

Space.prototype.nightStar = function( context )
{
    context.save(); 

    this.y += 0.1;
    if ( this.y > 0 )
    {
        this.y = -canvas.height;
    }
    context.drawImage( this.img, this.x, this.y, this.width, this.height );
    context.restore();
}

Space.prototype.planet = function( context )
{
    context.save(); 

    this.y += 0.1;
    if ( this.y > 0 )
    {
        this.y = -canvas.height;
    }
    context.drawImage( this.img2, this.x, this.y, this.width, this.height );
    context.restore();
}

