var key = {
    space: 32,
    left: 37,
    right: 39,
    a: 65,
    d: 68
}
/* 
Делаю:

Планы:
    -при смерти корабли должны всегда до краев канваса двигаться
    -Много астероидов.
    -Враги должны стрелять
    -при убийстве всех кораблей восстановить жизни кораблей
    -множество бластеров одновременно
    -враг свободно летающий по полю
    -корабли двигаются вниз, постепенно.
    -конец игры нормальный сделать
    -разные жизни у разных кораблей
    -бонус каждые 1000 очков - жизнь. Очки минусуются
    -фон сделать в три слоя с разной скоростью, чтоб без косяков.
    -Жизни должны функционировать
    -взрывы астероидов и космолетов
 */

var g_route = "left";
var g_fire    = false;
var route   = "left";
var contact = false;
var g_menu    = 1;

function drawFrame( context, canvas, spaceCraft, space, enemy,
                    blaster, heart, asteroid, score )
{
    context.clearRect( 0, 0, canvas.width, canvas.height );
    space.draw( context );
    space.nightStar( context );
    space.planet( context );
    spaceCraft.draw( context );
    animateAsteroid( context, asteroid, blaster, spaceCraft, heart, score );
    drawHeart( context, heart );
    animationEnemy( enemy, context, blaster, score );
    score.draw( context );
    if ( g_fire )
    {
        animationBlaster( blaster, context, asteroid );
    }
}

window.onload = function()
{
    var canvas     = document.getElementById( 'canvas' );
    var context    = canvas.getContext( '2d' );
    var spaceCraft = new MeSpacecraft();
    var space      = new Space();
    var blaster    = new Blaster( 0, 0, 3, 7 );
    var asteroid   = new Asteroid( Math.floor( ( Math.random() * ( canvas.width - ( 214 * 2 / 5 ) ) ) + 0 ), -( 154 * 2 / 5 ) * 5, 154 * 2 / 5, 154 * 2 / 5 );
    var heart      = [ new Heart( 0 ), new Heart( 25 ), new Heart( 50 ), new Heart( 75 ), new Heart( 100 ) ];
    var enemy      = enemyCreate();
    var score      = new Score();
    var sound      = new Sound();
    var newGame    = new Button( 230, 200, 150, 30 );
    var about      = new Button( 230, 250, 150, 30);

    shiftDownEnemy( enemy );
    
    if ( !context )
    {
        return;
    }
    
    sound.backgroundMusic.play();
    
    document.onkeydown = function keyDown( event )
    {
        
        alert(event.keyDown);
        switch ( event.keyCode )
        {
            case key.left:
            case key.a:  //left
                spaceCraft.x = ( spaceCraft.x > 7 ) ? spaceCraft.x - spaceCraft.speed : spaceCraft.x;
                break;
            case key.d:
            case key.right:  //right
                spaceCraft.x = ( spaceCraft.x < canvas.width - spaceCraft.width - 7 ) ? spaceCraft.x + spaceCraft.speed : spaceCraft.x;
                break;
            case key.space:
                g_fire = true;
                sound.shot.play();
                setTimeout( sound.shot.currentTime = 0, 1 );
                blaster.y = spaceCraft.y + 4;
                blaster.x = spaceCraft.x + 20;
                break;
            /* case key.tab:
                g_menu = 0; */
        }
    }

    function animate()
    {
        requestAnimationFrame( animate );
        switch( g_menu )
        {
            case 0:
                drawFrame( context, canvas, spaceCraft, space, enemy, blaster, heart, asteroid, score );
            break;
            case 1:
                drawMenu( context, canvas, space, newGame, about );
            break;
            case 2:
                drawAbout( context, canvas, space, newGame )
            break;
        }
    }
    
    animate();
}