function winRequestAnimFrame()
{
    if (!window.requestAnimationFrame) 
    {
        window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
                                    function (callback) 
                                    {
                                        return window.setTimeout(callback, 17);
                                    }
                                  );
    }
    return window.requestAnimationFrame;
}

function captureMouse()
{
    var offsetLeft = canvas.offsetLeft;
    var offsetTop = canvas.offsetTop;
    var mouse = { x : 0, y : 0 }; 
    if( event.pageX || event.pageY ) 
    {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }
    else 
    {
        mouse.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        mouse.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    } 
    mouse.x -= offsetLeft;
    mouse.y -= offsetTop;
    return mouse;
}