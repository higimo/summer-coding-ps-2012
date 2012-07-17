const TOPOFF = 0;
const BOTTOM = 600;
const RIGHT = 700;
const LEFT = 0;
const REVERSE = -1;

function Circle()
{
    this.color = "#ffd700";
    this.x = 0;
    this.y = 0;
    this.radius = 10;
    this.rotation = 0;
    this.scaleX = 1;       
    this.scaleY = 1;
    this.lineWidth = 1;
}

Circle.prototype.draw = function (context) 
{
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.radius = this.radius;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true);  
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}

Circle.prototype.changePosition = function( firstPress, positionCircleX, positionCircleY )
{
    if ( !firstPress )
    {
        this.x += positionCircleX;
        this.y += positionCircleY;
    }            
}

Circle.prototype.reversePositionChange = function( platform )
{
    if ( this.x + this.radius > RIGHT ) 
    {
        g_sound.play();
        setTimeout( g_sound.currentTime = 0,1 );
        this.x = RIGHT - this.radius;
        g_centerCircleX *= REVERSE;
    }    
    if ( this.x - this.radius < LEFT ) 
    {
        g_sound.play();
        setTimeout( g_sound.currentTime = 0,1 );
        this.x = LEFT + this.radius;
        g_centerCircleX *= REVERSE;
    }
    if ( this.y - this.radius < TOPOFF ) 
    {
        g_sound.play();
        setTimeout( g_sound.currentTime = 0,1 );
        this.y = TOPOFF + this.radius;
        g_centerCircleY *= REVERSE;
    }
    if ( ( this.y + this.radius >= platform.y ) && ( this.x >= platform.x ) && ( this.x <= platform.x + platform.width ) )
    {
        this.y = platform.y - this.radius;
        g_centerCircleY *= REVERSE;
        if ( !g_firstPress )
        {       
            g_sound.play();
            setTimeout( g_sound.currentTime = 0,1 );
        }
    } 
}

Circle.prototype.compression = function()
{
    for (var i = 1; i >= 0.6; i -= 0.0001)
    {
        this.scaleY = i;
        this.draw;
    }
    for (var i = 0.6; i <= 1; i += 0.0001)
    {
        this.scaleY = i;
        this.draw;
    }    
}
