//=============================================================================
// sMS_LoopFix.js
// by superMasterSword
//=============================================================================

/*:
 * @plugindesc Fixes MV event loops
 * @author superMasterSword
 * 
 * @help
 * ◆Loop
 *   . . .
 *   ◆If：Exit Loop is ON
 *     ◆Break Loop
 *     ◆
 *   ：End
 *   . . .
 *   ◆Loop
 *     ◆Loop
 *       ◆ . . .
 *     ：Repeat Above
 *     ◆ . . .
 *   ：Repeat Above
 *   ◆ . . .
 * ：Repeat Above
 * 
 * By default, if you set up an event like this,
 * it would either skip to the end of the event, or to the end of a loop
 * later in the event.
 * 
 * This plugin fixes that behavior so it works as expected.
*/

Game_Interpreter.prototype.command113 = function () {
    var depth = 0;
    while (this._index < this._list.length - 1) {
        this._index++;
        var command = this.currentCommand();

        if (command.code === 112)
            depth++;

        if (command.code === 413) {
            if (depth > 0)
                depth--;
            else
                break;
        }
    }
    return true;
};