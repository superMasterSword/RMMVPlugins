//=============================================================================
// sMS_YEP_DoT_TBR_Patch.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc Makes Yanfly's Extended DoTs and Tick Based regen work together
 * @author superMasterSword
 * 
 * @help Plug and Play! No plugin commands are added with this plugin.
*/

if (Imported.YEP_X_ExtDoT && YEP_X_TickBasedRegen) {

Imported.sMS_YEP_DoT_TBR_Patch = true;

var superMasterSword = superMasterSword || {};
superMasterSword.YEP_DoT_TBR = superMasterSword.YEP_DoT_TBR || {};

(function($) {

$.YEP_DoT_TBR.GameBattlerBase_updStateTickRegen =
	Game_BattlerBase.prototype.updateStateTickRegen;
Game_BattlerBase.prototype.updateStateTickRegen = function(state) {
	$.YEP_DoT_TBR.GameBattlerBase_updStateTickRegen.call(this, state);
	this.processDamageOverTimeStateEffect(state);
};

Game_Battler.prototype.processDamageOverTimeStates = function() {
};

})(superMasterSword);

}