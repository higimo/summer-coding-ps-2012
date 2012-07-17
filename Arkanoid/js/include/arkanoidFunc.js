const REVERSE = -1;
function drawBrick( brick, i )
{
    var disapearRect = false, disappearance = false;     
    var square = { x : g_ball.x - g_ball.radius, y : g_ball.y - g_ball.radius, width : g_ball.radius * 2, height : g_ball.radius * 2 };
    
    // м€ч летит слево направо
    if ( ( g_centerCircleX > 0 ) &&
          (
            ( ( square.y <= brick.y ) && ( square.y + square.height >= brick.y )&&( square.x + square.width + g_centerCircleX >= brick.x ) && ( square.x + square.width <= brick.x ) ) ||
            ( ( square.y == brick.y ) && ( square.y + square.height == brick.y + brick.height )&&(square.x + square.width + g_centerCircleX >= brick.x ) && ( square.x + square.width <= brick.x ) ) ||
            ( ( square.y <= brick.y + brick.height ) && ( square.y + square.height > brick.y + brick.height ) && ( square.x + square.width + g_centerCircleX >= brick.x ) && ( square.x + square.width <= brick.x ) )
          )
      )
        {
            g_sound.play();
            setTimeout( g_sound.currentTime = 0,1 );
            g_centerCircleX *= REVERSE;                          
            disappearance = changeColor( brick, disapearRect );   
        }
    
    // м€ч летит справа налево
    if ( ( g_centerCircleX < 0 ) &&
          (
            ( ( square.y <= brick.y ) && ( square.y + square.height >= brick.y ) && ( brick.x + brick.width >= square.x + g_centerCircleX )&&( brick.x + brick.width <= square.x ) ) ||
            ( ( square.y == brick.y ) && ( square.y + square.height == brick.y + brick.height ) && ( brick.x + brick.width >= square.x + g_centerCircleX ) && ( brick.x + brick.width <= square.x ) ) ||
            ( ( square.y <= brick.y + brick.height ) && ( square.y + square.height > brick.y + brick.height ) && ( brick.x + brick.width >= square.x + g_centerCircleX ) && ( brick.x + brick.width <= square.x ) )
          )
       )
            {
                g_sound.play();
                setTimeout( g_sound.currentTime = 0,1 );
                g_centerCircleX *= REVERSE;                          
                disappearance = changeColor( brick, disapearRect );               
            }                                                  
   
    // м€ч летит сверху вниз
    if ( ( g_centerCircleY > 0 ) &&
            (
                ( ( square.x < brick.x ) && ( square.x + square.width >= brick.x ) && ( square.y + square.height + g_centerCircleY >= brick.y ) && ( square.y + square.height <= brick.y ) ) ||
                ( ( square.x >= brick.x ) && ( square.x + square.width <= brick.x + brick.width ) && ( square.y + square.height + g_centerCircleY >= brick.y ) && ( square.y + square.height <= brick.y ) ) ||
                ( ( square.x <= brick.x + brick.width ) && (square.x + square.width > brick.x ) && ( square.y + square.height + g_centerCircleY >= brick.y ) && ( square.y + square.height <= brick.y ) )
            )
       )
        {
            g_sound.play();
            setTimeout( g_sound.currentTime = 0,1 );
            g_centerCircleY *= REVERSE;                          
            disappearance = changeColor( brick, disapearRect );
        }
   
    // м€ч летит снизу вверх
    if ( ( g_centerCircleY < 0 ) &&
            (
                ( ( square.x < brick.x ) && ( square.x + square.width >= brick.x ) && ( square.y + g_centerCircleY <= brick.y + brick.height ) && ( square.y >= brick.y + brick.height ) ) ||
                ( ( square.x >= brick.x ) && ( square.x + square.width <= brick.x + brick.width ) && ( square.y + g_centerCircleY <= brick.y + brick.height ) && ( square.y >= brick.y + brick.height ) ) ||
                ( ( square.x <= brick.x + brick.width ) && ( square.x + square.width > brick.x ) && ( square.y + g_centerCircleY <= brick.y + brick.height ) && ( square.y >= brick.y + brick.height ) )
            )
       )
        {
            g_sound.play();
            setTimeout( g_sound.currentTime = 0,1 );
            g_centerCircleY *= REVERSE;                          
            disappearance = changeColor( brick, disapearRect );
        }
     
    if (disappearance)
    {
        g_context.clearRect( brick.x, brick.y, brick.width, brick.height ); 
        disapearRect = false;
        g_count += 1;
        g_countBricks.innerHTML = g_count;
        g_scoreNum += 50;
        var randomBrick = "brick" + '' + Math.floor( Math.random( ) * (29+1) );
        if (brick.id == randomBrick)
        {
            speedBall = new Bonus( "./images/speed.png" );
            speedBall.x = brick.x;
            speedBall.y = brick.y;
            drawBall = true;
            bonus = 0;
        }   
        randomBrick = "brick" + '' + Math.floor( Math.random( ) * (29+1) );
        if (brick.id == randomBrick)
        {
            heart = new Bonus( "./images/heart.png" );
            heart.x = brick.x;
            heart.y = brick.y;
            drawBall = true;
            bonus = 1;
        }   
        
        g_score.innerHTML = g_scoreNum;
        g_bricks.splice( i, 1 );
    }
    else
    {
        brick.draw( g_context );
    }
}
