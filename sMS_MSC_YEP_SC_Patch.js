//=============================================================================
// sMS_MSC_YEP_SC_Patch.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Allows superMasterSword's More Skill Currencies and Yanfly's
 * Skill Core to work together.
 * 
 * @help This patch fixes the More Skill Currencies skill costs disappearing
 * with Yanfly's Skill Core, and also provides support for drawing gauges via
 * Yanfly's Gauge swap notetags.
 * 
 * <Swap Gauge x: stat>
 * By default, Yanfly's plugins will just display nothing if 'stat' is
 * something they don't recognize. This plugin will check if 'stat' matches the
 * name of a stat defined in the main plugin, and if so, will display a Gauge
 * for that stat in Gauge x's place.
 * 
 * Place this plugin underneath both More Skill Currencies and Skill Core.
*/

if (Imported.sMS_MoreSkillCurrencies && Imported.YEP_SkillCore) {

Imported.sMS_MSC_YEP_SC_Patch = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MSC_YEP_SC = superMasterSword.MSC_YEP_SC || {};

(function($) {
	//=========================================================================
	// superMasterSword
	//=========================================================================
	
	$.processMSCnotetagsSC = function(group) {
		for (var j = 1; j < group.length; j++) {
			var obj = group[j];
			var notedata = obj.note.split(/[\r\n]+/);
			
			for (var l = 0; l < notedata.length; l++) {
				var line = notedata[l];
				if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
					var gauge = parseInt(RegExp.$1);
					var stat = RegExp.$2;
					if (!$sMSskillStats[stat]) continue;
					if (gauge === 1) obj.gauge1 = stat;
					if (gauge === 2) obj.gauge2 = stat;
					if (gauge === 3) obj.gauge3 = stat;
				}
			}
		}
	};
	
	//=========================================================================
	// DataManager
	//=========================================================================
	
	$.MSC_YEP_SC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if (!$.MSC_YEP_SC.DataManager_isDatabaseLoaded.call(this)) return false;
		if (!$.MSC_YEP_SC._loaded) {
			$.processMSCnotetagsSC($dataClasses);
			$.processMSCnotetagsSC($dataEnemies);
			$.processMSCnotetagsSC($dataWeapons);
			$.processMSCnotetagsSC($dataArmors);
			$.processMSCnotetagsSC($dataStates);
			$.MSC_YEP_SC._loaded = true;
		}
		return true;
	};
	
	//=========================================================================
	// Window_Base
	//=========================================================================
	
	$.MSC_YEP_SC.WindowBase_drawActorHp = Window_Base.prototype.drawActorHp;
	Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
		var stat = actor.gauge1();
		if ($sMSskillStats[stat]) {
			this.drawActorMSC(stat, actor, x, y, width);
		} else {
			$.MSC_YEP_SC.WindowBase_drawActorHp.call(this, actor, x, y, width);
		}
	};
	
	$.MSC_YEP_SC.WindowBase_drawActorMp = Window_Base.prototype.drawActorMp;
	Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
		var stat = actor.gauge2();
		if ($sMSskillStats[stat]) {
			this.drawActorMSC(stat, actor, x, y, width);
		} else {
			$.MSC_YEP_SC.WindowBase_drawActorMp.call(this, actor, x, y, width);
		}
	};
	
	$.MSC_YEP_SC.WindowBase_drawActorTp = Window_Base.prototype.drawActorTp;
	Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
		var stat = actor.gauge3();
		if ($sMSskillStats[stat]) {
			this.drawActorMSC(stat, actor, x, y, width);
		} else {
			$.MSC_YEP_SC.WindowBase_drawActorTp.call(this, actor, x, y, width);
		}
	};
	
	//=========================================================================
	// Window_SkillList
	//=========================================================================
	
	$.MSC_YEP_SC.WindowSkillList_drawTpCost = Window_SkillList.prototype.drawTpCost;
	Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
		dw = this.drawMSCcost(skill, wx, wy, dw);
		return $.MSC_YEP_SC.WindowSkillList_drawTpCost.call(this, skill, wx, wy, dw);
	};
	
})(superMasterSword);

}