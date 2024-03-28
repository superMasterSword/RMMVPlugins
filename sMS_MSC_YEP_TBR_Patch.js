//=============================================================================
// sMS_MSC_YEP_TBR_Patch.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.1 A patch to fix MoreSkillCurrencies to work with Yanfly's
 * TickBasedRegen
 * @author superMasterSword
 * 
 * @param manualControl
 * @text Insane Mode
 * @desc If this is enabled, the original regen formula will be
 * eval'ed as is. You must perform all checks yourself.
 * @type boolean
 * @on Manual Control
 * @off Auto Fix
 * 
 * @param cancelOnNoRegen
 * @text Ignore when no traits?
 * @desc If Insane Mode is off, should the regen formula be evaluated
 * when a state has no regen traits?
 * @type boolean
 * @on Don't Eval
 * @off Eval
 * @default true
 * 
 * @help
 * Makes MoreSkillCurrencies regen set on states work again.
 * Plug and Play.
 * 
 * If you have other sources add regen in your Custom Stat regen formula,
 * Insane Mode is disabled, and the Ignore parameter is false, it could cause
 * states that shouldn't have regen to incorrectly regenerate.
 * 
 * Even if the Ignore parameter is true, states with regen could gain more than
 * they should. To fix this, you can add checks in your formula.
 * When $gameTemp._tickBasedTraits is true, this is standard (turn) regeneration,
 * otherwise it is a state's regeneration.
 * BattleManager.timeBasedStates() will be true if the player is currently in
 * battle and the battle system is tick based.
 * 
 * 
 * Insane Mode:
 * 
 * Normally, this plugin attempts to automatically fix the formula by replacing
 * the regen stat in the formula with the state's regen value. However, if this
 * is enabled, the formula will be ran as is, meaning it is up to you to add
 * in checks and make sure it works as intended. ONLY USE THIS IF YOU KNOW
 * WHAT YOU'RE DOING!!!!!! During standard regeneration, the value variable
 * starts at 0, however this will make the value variable begin as the stateId
 * during state regeneration. This can be used to get the state's regen value,
 * or with other plugins *cough* Moogle_X Traits Extension Bundle Extension
 * *cough*
 * this.getStateTickTraits(state, traitCode, dataId) can be used to get the
 * regen value from the state (or any numeric trait which uses traitSum).
 * Where traitCode is the trait's code (Game_BattlerBase.TRAIT_XPARAM for
 * regeneration), and dataId is the id of the regeneration stat.
 * The stat's regen stat id can be determined by one of two ways.
 * 1. Add the number by the stat in the parameter list to the extra param
 *    start id parameter, and subtract 1. Or,
 * 2. call $sMSskillStats.stat.regenId
 * 
 * ===========================================================================
 * Changelog
 * ===========================================================================
 * 
 * 1.1 - Added Insane Mode so I can be lazy and don't have to figure some way
 *       to make my Extension for Moogle_X's Traits Extension Bundle work with
 *       this.
 * 
 * 1.0 - Finished plugin.
*/

if (Imported.sMS_MoreSkillCurrencies && Imported.YEP_X_TickBasedRegen) {

Imported.sMS_MSC_YEP_TBR_Patch = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MSC_YEP_TBR = superMasterSword.MSC_YEP_TBR || {};

(function($) {

$.MSC_YEP_TBR.params = PluginManager.parameters('sMS_MSC_YEP_TBR_Patch');
$.MSC_YEP_TBR.manualControl = eval($.MSC_YEP_TBR.params.manualControl);
$.MSC_YEP_TBR.cancelOnNoRegen = eval($.MSC_YEP_TBR.params.cancelOnNoRegen);

//=============================================================================
// Game_Battler
//=============================================================================

$.MSC_YEP_TBR.GameBattler_regularRegenMSC = Game_Battler.prototype.regularRegenMSC;
Game_Battler.prototype.regularRegenMSC = function(stat) {
	if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
	var value = $.MSC_YEP_TBR.GameBattler_regularRegenMSC.call(this, stat);
	$gameTemp._tickBasedTraits = undefined;
	return value;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

$.MSC_YEP_TBR.GameBattlerBase_regenerateTpTick = Game_BattlerBase.prototype.regenerateTpTick;
Game_BattlerBase.prototype.regenerateTpTick = function(state) {
	$.MSC_YEP_TBR.GameBattlerBase_regenerateTpTick.call(this, state);
	this.regenerateMSCtick(state);
};

Game_BattlerBase.prototype.regenerateMSCtick = function(state) {
	if (!state) return;
	$.forEachMSCstat(this.MSCregenerateTick, this, state);
};

Game_BattlerBase.prototype.MSCregenerateTick = function(stat, state) {
	if (!sMSskillStats[stat] || !state) return;
	if ($.MSC_YEP_TBR.manualControl) {
		var formula = $sMSskillStats[stat].regen;
		var value = this.skillStatEval(formula, this, this, state.id);
	} else {
		var id = $sMSskillStats[stat].regenId;
		var rate = this.getStateTickTraits(state, Game_BattlerBase.TRAIT_XPARAM, id);
		if (rate === 0 && $.MSC_YEP_TBR.cancelOnNoRegen) return;
		var regenStat = $.MSC.regenFormat.format(stat);
		var regex = new RegExp('this.' + regenStat, 'g');
		var formula = $sMSskillStats[stat].regen.replace(regex, String(rate));
		var value = this.skillStatEval(formula, this, this, 0);
	}
	if (value !== 0) {
		this.clearResult();
		this.gainMSC(stat, value);
		this.startDamagePopup();
		this.clearResult();
	}
};

})(superMasterSword);

}