function Platform()
{
    this.x = 315;
    this.y = 580;
    this.width = 70;
    this.height = 20;
    this.g_platform = new Image();
    this.g_platform.src = "./images/platform.png";
}

Platform.prototype.draw = function(context)
{
    context.drawImage( this.g_platform, this.x, this.y, this.width, this.height );
}

Platform.prototype.changePosition = function()
{        
    g_vx = (g_vx + g_thrust) * 0.97;
    if (g_platform.x + g_vx >= 630)
    {
        for (var x = 630; x >= 625; x--)
        {
            g_platform.x = x;
        }
    }
    if (g_platform.x + g_vx <= 0)
    {
        for (var x = 0; x <= 5; x++)
        {
            g_platform.x = x;
        }
    }
    if (g_firstPress)
    {                                                                 
        g_platform.x += g_vx;
        g_ball.x = g_platform.x + g_platform.width / 2;
    }
    else
    {
        g_platform.x += g_vx;    
    }
}
