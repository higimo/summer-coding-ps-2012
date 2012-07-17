if ( !window.requestAnimationFrame )
{
    window.requestAnimationFrame = ( function()
    {
        return  window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( callback, element )
                {
                    window.setTimeout( callback, 1000 / 60 );
                };
    })();
}

function intersectionOfSquaresObjct( first, second )
{
    return ( ( first.x < second.x + second.width  ) && ( first.x + first.width  > second.x ) && 
             ( first.y < second.y + second.height ) && ( first.y + first.height > second.y ) )
}

function drawMenu( context, canvas, space, newGame, about )
{
    space.nightStar( context );
    space.planet( context );
    newGame.draw( context, "Новая игра", 30, 14);
    about.draw( context, "О игре", 45, 14);
    
    document.onmousedown = function()
    {
        var mouse = getMousePosition();
        if ( mouseOnObject( mouse, newGame.x, newGame.y, newGame.width, newGame.height ) )
        {
            g_menu = 0;
        }
        if ( mouseOnObject( mouse, about.x, about.y, about.width, about.height ) )
        {
            space.nightStar( context );
            space.planet( context );
            drawText( "Привет", 20, 30, context );
            g_menu = 2;
        }
        
    }
}

function drawAbout( context, canvas, space, newGame )
{
    space.nightStar( context );
    space.planet( context );
    drawText( "© higimo 2012",     20,  30, context );
    drawText( "Кураторы проекта:", 20,  50, context );
    drawText( "Ильин Андрей",      220, 50, context );
    drawText( "Шайхутдинов Ринат", 220, 70, context );
    drawText( "Приятной игры",     20,  90, context );
    newGame.x = 20;
    newGame.y = 100;
    newGame.draw( context, "Начать игру", 30, 14 );
}

function animationBlaster( blaster, context, asteroid )
{
    g_fire     = ( blaster.y < 0 ) ? false : true;
    g_fire     = ( intersectionOfSquaresObjct( blaster, asteroid ) ) ?  false : true;
    blaster.y -= blaster.speed;
    blaster.draw( context );
}

function hitTheTarget( blaster, enemy, i, j )
{
    return ( ( ( blaster.x < enemy[i][j].x + enemy[i][j].width ) && ( blaster.x + blaster.width >  enemy[i][j].x ) ) &&
             ( ( blaster.y < enemy[i][j].y + enemy[i][j].height) && ( blaster.y + blaster.height > enemy[i][j].y ) ) );
}

function drawText( text, x, y, context )
{
    context.save();
    context.fillStyle = "#fff";
    context.font      = "bold 18px sans-serif";
    context.fillText( text, x, y );
    context.restore();
}

function mouseOnObject( mouse, x, y, width, height )
{
    x = x + canvas.offsetLeft;
    y = y + canvas.offsetTop;
    return ( ( x < mouse.x ) && ( x + width > mouse.x ) && ( y < mouse.y ) && ( y + height > mouse.y ) )
}