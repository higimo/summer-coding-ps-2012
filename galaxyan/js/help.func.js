/* Запись в лог */
function toLog( string )
{
    console.log( string );
}

/* Препарирование объектов */
function showMethod( obj )
{
    result = "";
    for ( i in obj )
    {
        result += "Obj." + i + " = " + obj[i] + "\n";
    }
    toLog( result );
}

function getMousePosition()
{
    return {
                x : window.event.x,
                y : window.event.y
    };
}

function isArray( array ) 
{
    return ( array instanceof Array );
}