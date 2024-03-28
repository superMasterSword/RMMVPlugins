//=============================================================================
// sMS_MSC_MX_TEB_Ext.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Allows you to use Traits Extension Bundle regen options
 * with Skill Currencies
 * @author superMasterSword
 * 
 * @help
 * ============================================================================
 * Introdouction
 * ============================================================================
 * -Requires my edited version of Traits Extension Bundle-
 * 
 * This provides an easy way to implement static regeneration values or
 * regeneration that takes place at the end of a battle. 
 * 
 * ============================================================================
 * Usage
 * ============================================================================
 * 
 * Just use Traits Extension Bundle's static regen or battle end regeneration
 * notetags but insert your custom stat instead of HP, MP or TP.
 * 
 * Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *   <TEB SR stat: x>
 *   <TEB SR stat: -x>
 *   This will add a flat (static) amount of regen.
 * 
 * Actor, Class, Weapon, Armor, State Notetags:
 *   <TEB BER stat: x%>
 *   <TEB BER stat: -x%>
 *   This will add or subtract x% stat to the actor at the end of battle.
 *   
 *   <TEB BER stat: x>
 *   <TEB BER stat: -x>
 *   This will add or subtract x stat to the actor at the end of battle.
 * 
 * =============================================================================
 * Script calls
 * =============================================================================
 * 
 * What's this about script calls? So, I kind of lied earlier. The notetags
 * themselves by default won't cause regen. Because I allowed formulas for all
 * of these situations, all I did was provide a basic framework to easily track
 * regen from various sources. On the bright side, this means all you have to
 * do is use these script calls in your formulas.
 * 
 * this.tebStaticMSCregen( stat[, stateId] )
 *   This returns the value of the static regen. Just add it to the value.
 *   In addition, if Yanfly's Tick Based Traits is installed, you can pass the
 *   stateId as an additional argument to get that state's regen value instead.
 * 
 * this.tebBerMSCpercentage( stat )
 *   This returns the value of the percent of the stat to regenerate at the end
 *   of battle. Just multiply it by the stat's max stat (or however much you
 *   want the battler to gain at 100%) and add to the value.
 * 
 * this.tebBerMSCstatic( stat )
 *   This returns the flat value to regenerate at the end of battle. Just add it
 *   to the value.
*/

if (Imported.sMS_MoreSkillCurrencies && Imported.Moogle_X_TEB) {

Imported.sMS_MSC_MX_TEB_Ext = true;

var superMasterSword = superMasterSword || {}:
superMasterSword.MSC_MX_TEB = superMasterSword.MSC_MX_TEB || {};

(function($) {

//=============================================================================
// superMasterSword
//=============================================================================

$.processMSCnotetagsTEB = function(group) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<TEB SR (.*):[ ]*([+\-]?\d+)>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var value = parseInt(RegExp.$2);
				var code = Game_BattlerBase.TRAIT_TEB_STATIC_REGEN;
				obj.traits.push({"code":code,"dataId":stat,"value":value});
			} else if (line.match(/<TEB BER (.*):[ ]*([+\-]?\d+)%>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var value = parseInt(RegExp.$2) * 0.01;
				var code = Game_BattlerBase.TRAIT_TEB_BER_PERCENTAGE;
				obj.traits.push({"code":code,"dataId":stat,"value":value});
			} else if (line.match(/<TEB BER (.*):[ ]*([+\-]?\d+)>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var value = parseInt(RegExp.$2);
				var code = Game_BattlerBase.TRAIT_TEB_BER_STATIC;
				obj.traits.push({"code":code,"dataId":stat,"value":value});
			}
		}
	}
};

//=============================================================================
// DataManager
//=============================================================================

$.MSC_MX_TEB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!$.MSC_MX_TEB.DataManager_isDatabaseLoaded.call(this)) return false;
	if ($.MSC_MX_TEB._loaded) {
		$.processMSCnotetagsTEB($dataActors);
		$.processMSCnotetagsTEB($dataClasses);
		$.processMSCnotetagsTEB($dataEnemies);
		$.processMSCnotetagsTEB($dataWeapons);
		$.processMSCnotetagsTEB($dataArmors);
		$.processMSCnotetagsTEB($dataStates);
		$.MSC_MX_TEB._loaded = true;
	}
	return true;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.tebStaticMSCregen = function(stat, stateId) {
	if (!$sMSskillStats[stat]) return 0;
	if (Imported.YEP_X_TickBasedRegen && BattleManager.timeBasedStates() &&
	!$gameTemp._tickBasedTraits) {
		if (stateId) {
			var code = Game_BattlerBase.TRAIT_TEB_STATIC_REGEN;
			return this.getStateTickTraits($dataStates[stateId], code, stat);
		}
		return 0;
	}
	return this.traitsSum(Game_BattlerBase.TRAIT_TEB_STATIC_REGEN, stat);
};

Game_BattlerBase.prototype.tebBerMSCstatic = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	return this.traitsSum(Game_BattlerBase.TRAIT_TEB_BER_STATIC, stat);
};

Game_BattlerBase.prototype.tebBerMSCpercentage = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	return this.traitsSum(Game_BattlerBase.TRAIT_TEB_BER_PERCENTAGE, stat);
};

})(superMasterSword);

}