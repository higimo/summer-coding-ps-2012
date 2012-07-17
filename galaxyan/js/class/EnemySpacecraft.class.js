function EnemySpacecraft( x,y, width, height )
{
    this.width  = 50 / 2;
    this.height = 32 / 2;
    this.x      = 150;
    this.y      = 50
    this.img    = document.getElementById( "enemyPic" );
    this.dead   = false;
}

EnemySpacecraft.prototype.draw = function( context )
{
    context.save();
    context.drawImage( this.img, this.x, this.y, this.width, this.height );
    context.restore();
}

function enemyCreate()
{
    var enemy = new Array(
                    new Array(
                        new EnemySpacecraft( 150, 50, 25, 16 ), //0
                        new EnemySpacecraft( 150, 50, 25, 16 ), //1
                        new EnemySpacecraft( 150, 50, 25, 16 ), //2
                        new EnemySpacecraft( 150, 50, 25, 16 ), //3
                        new EnemySpacecraft( 150, 50, 25, 16 ), //4
                        new EnemySpacecraft( 150, 50, 25, 16 ), //5
                        new EnemySpacecraft( 150, 50, 25, 16 ), //6
                        new EnemySpacecraft( 150, 50, 25, 16 ), //7
                        new EnemySpacecraft( 150, 50, 25, 16 ), //8
                        new EnemySpacecraft( 150, 50, 25, 16 )  //9
                    ),
                    new Array(
                        new EnemySpacecraft( 150, 50, 25, 16 ), //0
                        new EnemySpacecraft( 150, 50, 25, 16 ), //1
                        new EnemySpacecraft( 150, 50, 25, 16 ), //2
                        new EnemySpacecraft( 150, 50, 25, 16 ), //3
                        new EnemySpacecraft( 150, 50, 25, 16 ), //4
                        new EnemySpacecraft( 150, 50, 25, 16 ), //5
                        new EnemySpacecraft( 150, 50, 25, 16 ), //6
                        new EnemySpacecraft( 150, 50, 25, 16 ), //7
                        new EnemySpacecraft( 150, 50, 25, 16 ), //8
                        new EnemySpacecraft( 150, 50, 25, 16 )  //9
                    ),
                    new Array(
                        new EnemySpacecraft( 150, 50, 25, 16 ), //0
                        new EnemySpacecraft( 150, 50, 25, 16 ), //1
                        new EnemySpacecraft( 150, 50, 25, 16 ), //2
                        new EnemySpacecraft( 150, 50, 25, 16 ), //3
                        new EnemySpacecraft( 150, 50, 25, 16 ), //4
                        new EnemySpacecraft( 150, 50, 25, 16 ), //5
                        new EnemySpacecraft( 150, 50, 25, 16 ), //6
                        new EnemySpacecraft( 150, 50, 25, 16 ), //7
                        new EnemySpacecraft( 150, 50, 25, 16 ), //8
                        new EnemySpacecraft( 150, 50, 25, 16 )  //9
                    ),
                    new Array(
                        new EnemySpacecraft( 150, 50, 25, 16 ), //0
                        new EnemySpacecraft( 150, 50, 25, 16 ), //1
                        new EnemySpacecraft( 150, 50, 25, 16 ), //2
                        new EnemySpacecraft( 150, 50, 25, 16 ), //3
                        new EnemySpacecraft( 150, 50, 25, 16 ), //4
                        new EnemySpacecraft( 150, 50, 25, 16 ), //5
                        new EnemySpacecraft( 150, 50, 25, 16 ), //6
                        new EnemySpacecraft( 150, 50, 25, 16 ), //7
                        new EnemySpacecraft( 150, 50, 25, 16 ), //8
                        new EnemySpacecraft( 150, 50, 25, 16 )  //9
                    )
    );
    return enemy;
}

function animationEnemy( enemy, context, blaster, score )
{
    for( var i = 0; i < enemy.length; i++ )
    {
        for( var j = 0; j < enemy[i].length; j++)
        {
            if ( hitTheTarget( blaster, enemy, i, j ) )
            {
                enemy[i][j].dead = true;
                enemy[i][j].x = 0;
                enemy[i][j].y = 0;
                score.score  += 20;
                blaster.y     = 0;
            }
        }
    }
    
    // Организует движение всех врагов
    if ( route == 'left' )
    {
        enemy[0][0].x -= 2;
        route = ( enemy[0][0].x < 0 ) ? "right" : "left";
    }
    else if ( route == "right" )
    {
        enemy[0][0].x += 2;
        route = ( enemy[0][9].x > canvas.width - enemy[0][9].width ) ? "left" : "right";
    }

    //Смещение по х у каждого корабля
    for( var i = 0; i < enemy.length; i++ )
    {
        for( var j = 1; j < enemy[i].length; j++)
        {
            enemy[i][j].x = enemy[i][j - 1].x + enemy[i][j - 1].width + 10;
        }
    }
    enemy[1][0].x = enemy[0][0].x;
    enemy[2][0].x = enemy[0][0].x;
    enemy[3][0].x = enemy[0][0].x;
    
    //Отрисовка всех кораблей
    for( var i = 0; i < enemy.length; i++ )
    {
        for( var j = 0; j < enemy[i].length; j++)
        {
            if ( !enemy[i][j].dead )
            {
                enemy[i][j].draw( context );
            }
        }
    }
}

function shiftDownEnemy( enemy )
{
    for( var i = 0; i < enemy.length; i++ )
    {
        for( var j = 0; j < enemy[i].length; j++)
        {
            enemy[i][j].y += 20* i;
        }
    }
}