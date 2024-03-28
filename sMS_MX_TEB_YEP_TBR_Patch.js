//=============================================================================
// sMS_MX_TEB_YEP_TBR_Patch.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Makes Moogle_X's static regen work with Yanfly's Tick
 * Based Regen
 * @author superMasterSword
 * 
 * @help
 * Makes static regen added in Moogle_X's Traits Extension Bundle work with
 * Yanfly's Tick Based Regen
 * Plug and Play.
 * 
 * Requires my edited version of Moogle_X's Traits Extension Bundle
*/

if (Imported.Moogle_X_TEB && Imported.YEP_X_TickBasedRegen) {

Imported.sMS_MX_TEB_YEP_TBR_Patch = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MXTEB_YTBR = superMasterSword.MXTEB_YTBR || {};

(function($) {

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.regenerateHpTick = function(state) {
	var code = Game_BattlerBase.TRAIT_XPARAM;
	var rate = this.stateTickTraits(state, code, 7);
	var value = Math.floor(this.mhp * rate);
	code = Game_BattlerBase.TRAIT_TEB_STATIC_REGEN;
	value += this.stateTickTraits(state, code, 0);
	value = Math.max(value, -this.maxSlipDamage());
	if (value !== 0) {
		this.clearResult();
		this.gainHp(value);
		this.startDamagePopup();
		this.clearResult();
	}
};

Game_BattlerBase.prototype.regenerateMpTick = function(state) {
	var code = Game_BattlerBase.TRAIT_XPARAM;
	var rate = this.stateTickTraits(state, code, 8);
	var value = Math.floor(this.mmp * rate);
	code = Game_BattlerBase.TRAIT_TEB_STATIC_REGEN;
	value += this.stateTickTraits(state, code, 1);
	if (value !== 0) {
		this.clearResult();
		this.gainMp(value);
		this.startDamagePopup();
		this.clearResult();
	}
};

})(superMasterSword);

}