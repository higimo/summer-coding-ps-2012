const CENTERCIRCLEX = 350;
const CENTERCIRCLEY = 570;
const INITPLATFORMX = 315;
const INITPLATFORMY = 580;
const ZERO = 0;
const BUTTONLEFT = 37;
const BUTTONRIGHT = 39;
const BUTTONA = 65;
const BUTTOND = 68;
const BUTTONSPACE = 32;
const STEP = 0.2;
const DELETEX = 88;

var g_canvas;
var g_context;
var g_platform;
var g_ball;
var g_score;
var g_life;
var g_countBricks;
var g_centerCircleX;
var g_centerCircleY;
var g_thrust = 0;
var g_vx = 0;
var g_firstPress;
var g_bricks;
var g_sound;
var g_backAudio;
var g_count = 0;
var g_scoreNum = 0;
var g_draw = true;

var drawBall = false;
var speedBall;
var flag = true;
var mainMenu;
var lastHitedKey = -1;
var pressedCount = 0;
var bonus = -1;
var life = 0;


function drawFrame ()
{
    if ( g_draw )
    {
        var winReq = winRequestAnimFrame();
        winReq( drawFrame, g_canvas );
        g_context.clearRect( ZERO, ZERO, g_canvas.width, g_canvas.height );

        g_ball.changePosition( g_firstPress, g_centerCircleX, g_centerCircleY );
        g_platform.changePosition();
        g_ball.reversePositionChange( g_platform );

        drawPrepareBricks();
        bonusSpeed();
        g_ball.draw( g_context ); 
        g_platform.draw( g_context );
        isFinish();

    }
}

function bonusSpeed()
{
    if (drawBall)
    {
        switch (bonus)
        {
            case 0:
            {
                    speedBall.draw(g_context);
                    speedBall.y += 2;
                    
                    if ((speedBall.y >= g_canvas.height - g_platform.height) && (g_platform.x <= speedBall.x) && (g_platform.x + g_platform.width >= speedBall.x) && (speedBall.y <= g_canvas.height - g_platform.height) )
                    {
                        g_centerCircleX *= 2;
                        g_centerCircleY *= 2;
                        setTimeout(clear, 5000);
               //         bonus = -1;
                    }

                    if ( speedBall.y > g_canvas.height ) 
                    {
                        drawBall = false;
                    }
                    break;
            }
            case 1:
                    heart.draw(g_context);
                    heart.y += 2;
                    if ((heart.y >= g_canvas.height - g_platform.height) && (g_platform.x <= heart.x) && (g_platform.x + g_platform.width >= heart.x) && (heart.y <= g_canvas.height - g_platform.height) )
                    {
                        life = parseInt(g_life.innerHTML) + 1;
                        g_life.innerHTML = life;
              //          bonus = -1;
                    }
                    if ( heart.y > canvas.height)
                    {
                        drawBall = false;
                    }

                    break;
        }                  
    }    

}

function clear()
{
    g_centerCircleX /= 2;
    g_centerCircleY /= 2;
}

function onKeyboardEvent( event )
{
    flag = false;
    var currHited = -1;
    var isArrowPressed = false;
    switch ( event.keyCode )
    {
        case BUTTONLEFT:
        case BUTTONA:
                g_thrust = -STEP;                
                currHited = BUTTONLEFT;
                isArrowPressed = true;
                break;
        case BUTTONRIGHT:
        case BUTTOND:
                currHited = BUTTONRIGHT;
                isArrowPressed = true;
                g_thrust = STEP;
                break;
        case BUTTONSPACE:
                if ( g_firstPress )  
                {    
                    g_ball.x += 1;
                    g_ball.y += 1;              
                    g_firstPress = false;
                }
                break;
        case DELETEX:
                g_bricks.splice(ZERO, 60);
                break;
    }
    if( isArrowPressed )
    {
        if( currHited != lastHitedKey )
        {
            lastHitedKey = currHited;
            pressedCount++;
        }
    }           
}

                     
function onKeyUp( event )
{
    var isArrowPressed = false;
    switch ( event.keyCode )
    {
        case BUTTONLEFT:
        case BUTTONA:
                g_vx = STEP;
                isArrowPressed = true;
                break;
        case BUTTONRIGHT:
        case BUTTOND:
                g_vx = -STEP;
                isArrowPressed = true;
                break;
    }
    if( isArrowPressed )
    {
        pressedCount--;
        if ( pressedCount == ZERO )
        {
            lastHitedKey = -1;
            g_vx = ZERO;
            g_thrust = ZERO;
        }
    }
}

function drawPrepareBricks()
{

    var i = g_bricks.length - 1;
    while ( i >= 20)
    {
        drawBrick( g_bricks[i], i );        
        i--;
    }    
    while ( i >= 10)
    {
        drawBrick( g_bricks[i], i );        
        i--;
    }    
    while ( i >= 0)
    {
        drawBrick( g_bricks[i], i );        
        i--;
    }    
}

function isFinish()
{
    if (g_ball.y + g_ball.radius > g_canvas.height)  
    {
        g_ball.x = CENTERCIRCLEX;
        g_ball.y = CENTERCIRCLEY;
        g_platform.x = INITPLATFORMX;
        g_platform.y = INITPLATFORMY;
        g_firstPress = true;        
        if ( g_life.innerHTML > 0 )
        {
            g_life.innerHTML -= 1;
        }
        else
        {
            g_draw = false;                            
            g_context.fillStyle = "#00ff00";
            g_context.font = "30px Times New Roman";
                g_context.fillText( "Lose!!!", 330, 300 );
            g_backAudio.pause();
            var sad = new Audio("./sounds/sad.mp3");
            sad.play();
        }
    }
    if  ( g_bricks.length === 0 )
    { 
        draw = false;
        g_context.fillStyle = "#00ff00";
        g_context.font = "30px Times New Roman";
        g_context.fillText( "WIN!!!", 330, 300 );
        g_backAudio.pause();
        var clap = new Audio("./sounds/clap.mp3");
        clap.play();
    }    
}

function changeColor ( brick, disapearRect )
{
    switch ( brick.counter )
    {
        case 0:
                disapearRect = true;
                g_scoreNum += 5;
                g_score.innerHTML = g_scoreNum;
                break;
        case 1:
                brick.counter -= 1;
                brick.brick.src = "./images/white.png";
                disapearRect = false;
                g_scoreNum += 10;
                g_score.innerHTML = g_scoreNum;
                break;
        case 2:
                brick.counter -= 1;
                brick.brick.src = "./images/lightblue.png";
                disapearRect = false;
                g_scoreNum += 20;
                g_score.innerHTML = g_scoreNum;
                break;
    }
    return disapearRect;
}

function createArrOfRect()
{
    pushArrOfBricks( 30, 60, 250, 300, "./images/white.png", 0, 0, 10 );
    pushArrOfBricks( 60, 60, 150, 200, "./images/lightblue.png", 1, 10, 20 );
    pushArrOfBricks( 30, 60, 50, 100, "./images/blue.png", 2, 20, 30 );
}

function pushArrOfBricks( x1, x2, y1, y2, src, counter, id, maxBrick )
{
    for ( var x,  y = y1; y <= y2; y += 50 )
    {
        x = x1;
        for ( var brick, i = id; i < maxBrick; i++ )
        {
            brick = new Rectangle( x, y, src );
            brick.id = "brick" + i;
            brick.counter = counter;
            x += x2;
            g_bricks.push( brick );
        }       
    }
}

function init()
{
    g_canvas = document.getElementById( 'canvas' );
    g_context = g_canvas.getContext( '2d' );
    g_ball = new Circle();
    g_platform = new Platform();
    g_bricks = [];
    g_centerCircleX = 2.5; //Math.random() * 10 - 5;
    g_centerCircleY = -3; //Math.random() * 10 - 5;
    g_firstPress = true;
    g_ball.x = CENTERCIRCLEX;
    g_ball.y = CENTERCIRCLEY;

    g_sound = document.getElementById( 'audio' );
    g_backAudio = new Audio("./sounds/rekviem.mp3");                            
    g_backAudio.play();
    g_backAudio.loop = true;
    
    g_score = document.getElementById("scoreBricks");    
    g_score.innerHTML = 0;  
    g_life = document.getElementById("life");
    g_life.innerHTML = 3;
    g_countBricks = document.getElementById("bricks");
    g_countBricks.innerHTML = 0;

}


function hide()
{
    var intro = document.getElementById("intro");
    intro.style.display = "none";
    var scoreLife = document.getElementById("score");
    scoreLife.style.display = "inline";   
}

function onloadHandler()
{
    hide();
    init();
    
    createArrOfRect();    
    window.addEventListener('keydown', onKeyboardEvent, false);
    window.addEventListener('keyup', onKeyUp, false);

    drawFrame();    
}

function onloadPlay()
{
    var play = document.getElementById("play");
    play.onclick = onloadHandler;
}

window.onload = onloadPlay;