function MeSpacecraft()
{
    this.width  = 128 / 3;
    this.height = 157 / 3;
    this.x      = ( ( canvas.width ) - ( this.width / 2 ) ) / 2;
    this.y      = canvas.height - this.height - 50;
    this.img    = document.getElementById("mePic");
    this.speed  = 8;
    this.life   = 5;
}

MeSpacecraft.prototype.draw = function( context )
{
    context.save();
    context.drawImage( this.img, this.x, this.y, this.width, this.height );
    context.restore();
}