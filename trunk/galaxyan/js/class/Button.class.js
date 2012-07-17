/* 
Объект кнопки. Рисует разные кнопочки
 */
function Button( x, y, width, height )
{
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
}

Button.prototype.draw = function( context, text, x, fontHeight )
{
    var centerY       = this.y + fontHeight + 4;
    context.save();
    context.fillStyle = "#00a8ff";
    context.fillRect( this.x, this.y, this.width, this.height );
    context.fillStyle = "#fff";
    context.font      = "bold " + fontHeight + "px sans-serif";
    context.fillText( text, this.x + x, centerY );
    context.restore();
}