//=============================================================================
// sMS_Jay_Dualtech_Ext.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.1 Allows various aspects of attacks to be affected by all
 * members of a dualtech.
 * @author superMasterSword
 * 
 * @param gPriority
 * @text Icon Priority
 * @desc Changes order of tag checks.
 * @type select[]
 * @option actor
 * @option class
 * @option equipment
 * @option states
 * @option variable
 * @default ["variable","states","equipment","class","actor"]
 * 
 * @param ePriority
 * @text Equip Priority
 * @parent gPriority
 * @desc Determines the priority that equipment icon changes apply
 * Top to Bottom and arranged by Equipment Types in database
 * @type number[]
 * @min 0
 * @default ["3","5","4","1","2"]
 * 
 * @param DefCriMode
 * @text Dualtech Crit Rate
 * @desc This is the default method that will be used to
 * calculate the crit rate for dualtechs.
 * @type combo
 * @option Lowest
 * @option Highest
 * @option Average
 * @option Sum
 * @default Sum
 * 
 * @param DefMultBostNAEOp
 * @text Dual Multi Boost NAE
 * @desc Default calculation method to use for boosted Normal
 * Attack Elements in Dualtechs. Check help file for more info.
 * @type select
 * @option Simple
 * @value 0
 * @option Ridiculously Complicated
 * @value 1
 * @default 0
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This is a plugin that allows things like crit rate and Attack Elements
 * inflicted to take into account all fighters in a dual tech.
 * If you have Yanfly's Battle Engine Core installed, you can specify certain
 * fighters if not all strike at the same time or for some other reason should
 * not be taken into account for these purposes.
 * 
 * ============================================================================
 * Icons
 * ============================================================================
 * 
 * Just put <icon: #> in the notebox of your actor, replacing
 * # with the icon number.
 * You can also put a tag in classes, equipment, and states, but it's
 * a bit more complicated.
 * <icon: actorId, iconID> is the format to use for classes, equipment,
 * and states (since multiple people can share those)
 * actorID and iconID are both numerical IDs that can be found in the
 * database.
 * It will show that iconID if the actor specified is that class, has that item 
 * equipped, or inflicted with that state (will change with priority, explained
 * in detail below)
 * 
 * By default the priority order is (from greatest to least):
 * variable, states, equipment, class, actor
 * Equipment is then further divided into:
 * helmet, accessory, body armor, weapon, shield
 * Effects in that order by default, however that can also be changed
 * with parameters, any custom equipment types you add can also be added
 * because it uses the Equipment Type numbers set up in the database. (Just
 * don't forget to add them here for them to take effect, on the contrary,
 * if you never want that type to change the icon, just leave it out, this
 * goes for the non-equipment options as well)
 * I recommend always leaving actor at the end as a static icon to revert to when
 * there is nothing else special to change it.
 *
 * If you want to change the actor's icon mid-game from more  than just the
 * methods provided by default use the <iconVar: #> tag (only usable in the
 * Actor's notetag) Whenever you set the variable to 0 it will be skipped.
 * This is for developers who want more customization than the default methods
 * provided while still having easy access to the ones provided.
 * 
 * ============================================================================
 * Crit Chance
 * ============================================================================
 * 
 * If a dualtech can crit, you can choose whether it uses the lowest crit rate,
 * the highest, their average, or adds the crit rates of the attackers
 * together. By default, it will use the setting specified in the parameter.
 * However, if you wish to change this per skill, use these notetags:
 * <Crit Mode: Lowest>
 * <Crit Mode: Highest>
 * <Crit Mode: Average>
 * <Crit Mode: Sum>
 * 
 * ============================================================================
 * Attack States
 * ============================================================================
 * 
 * If multiple attackers have the same Attack State (and the attack inflicts
 * Normal Attack States), the odds of that Attack State being applied will be
 * added together for each person.
 * 
 * For example, if A and B are doing a dualtech, and A has a 10% chance of
 * inflicting poison, and B has a 20% chance of inflicting poison, the attack
 * will have a 30% chance of inflicting poison.
 * However, if A also has a 30% chance of inflicting blind, and B has no chance
 * of inflicting blind, the attack will have a 30% chance of inflicting blind.
 * 
 * ============================================================================
 * Multiple Elements & Moogle_X's Element Booster Features
 * ============================================================================
 * 
 * You thought we were done? You thought wrong! If Moogle_X's Element Booster
 * and Multiple Elements are installed along with this, they'll perform a
 * quadtech! When Multiple Elements is installed it takes into account the
 * Normal Attack Elements from all actors currently attacking (which is assumed
 * to be all involved in the tech unless they are specified with the Action
 * Sequence). When Moogle_X's Element Booster is also installed it will multiply
 * the Element Boosts of all the actors currently attacking together for each
 * element (assuming you have enabled Change Element Booster).
 * 
 * Dual Multi Boost NAE parameter:
 *   When set to "Simple" Element Booster will multiply the Element Boosts of
 *   all actors currently attacking for every Normal Attack Element regardless
 *   of who actually had that Attack Element. If set to "Ridiculously
 *   Complicated" however, only the Element Boosts of actors who have that
 *   Attack Element will be multiplied together.
 * 
 * This parameter is the default setting for skills. You can however alter the
 * mode per skill by using the notetags:
 * <Dual Multi Boost NAE: Simple>
 * <Dual Multi Boost NAE: Complicated>
 * 
 * ============================================================================
 * Action Sequences
 * ============================================================================
 * 
 * If you're using both this and Yanfly's Battle Engine Core you can use a new
 * action sequence to control whose considered to be currently attacking. This
 * will affect the settings above as well, instead of using everyone defined
 * in the dualtech (and the user even if they're not defined) they will only
 * check whoever has been specified in the last Action Sequence until reset.
 * 
 * ============================================================================
 * DUAL ATTACKER: x
 * DUAL ATTACKER: x, x, x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * x is a number from 0 to 10. 1 would be the first person defined in the dual
 * tag, 2 the second, and so on. 0 is whoever initiated the dualtech.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: dual attacker: 2
 *                dual attacker: 1, 3
 * ============================================================================
 * 
 * ============================================================================
 * RESET ATTACKER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will reset the Normal Attack Elements to how it behaves before using
 * the above action sequence, it will take the Attack Elements from all members
 * of the tech (including the user even if they are not defined in the tech)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset attacker
 * ============================================================================
 * 
 * ============================================================================
 * Compatibility
 * ============================================================================
 * 
 * Jay's Dualtechs is required to use this plugin, place this underneath it.
 * 
 * Place this plugin below Yanfly's Battle Engine Core and Critical Control,
 * Moogle_X's Element Booster and my Multiple Elements plugin.
 * 
 * If you're using Yanfly's Critical Control replace 'user.cri' in Critical
 * Control's formula with 'this.combinedCri()' for the setting in this plugin
 * to take effect.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * 1.1 - Merged my Dualtech icons plugin with this one because I forgot I had
 *       made it and found it redundant to have two plugins solely as an
 *       extension of the same plugin XD.
 * 
 * 1.0 - Moved code from Multiple Elements plugin to this because I ended up
 *       adding too many Dualtech features that didn't have to do with
 *       elements. Now you can get those features without the Multiple Elements
 *       formula and they can still work together to get the same effect.
*/

if (Imported.Jay_Dualtechs) {

Imported.sMS_Jay_DualtechExt = true;

var superMasterSword = superMasterSword || {};
superMasterSword.Jay_DE = superMasterSword.Jay_DE || {};

(function($) {

$.Jay_DE.params = PluginManager.parameters("sMS_Jay_Dualtech_Ext");
$.Jay_DE.gPriority = JSON.parse($.Jay_DE.params.gPriority);
$.Jay_DE.ePriority = JSON.parse($.Jay_DE.params.ePriority);
for (var i = 0; i < $.Jay_DE.ePriority.length; i++) {
	$.Jay_DE.ePriority[i] = Number($.Jay_DE.ePriority[i]);
}
$.Jay_DE.DefCriMode = $.Jay_DE.params.DefCriMode;
$.Jay_DE.DefMultBostNAEOp = Number($.Jay_DE.params.DefMultBostNAEOp);

//=============================================================================
// DataManager
//=============================================================================

$.Jay_DE.DM_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!$.Jay_DE.DM_isDatabaseLoaded.call(this)) return false;
	if (!$.Jay_DE._loaded) {
		$.processDualtechExtNotetags1($dataActors, true);
		$.processDualtechExtNotetags1($dataClasses, false);
		$.processDualtechExtNotetags1($dataWeapons, false);
		$.processDualtechExtNotetags1($dataArmors, false);
		$.processDualtechExtNotetags1($dataStates, false);
		$.processDualtechExtNotetags2($dataSkills);
		$.Jay_DE._loaded = true;
	}
	return true;
};

//=============================================================================
// superMasterSword
//=============================================================================

$.processDualtechExtNotetags1 = function(group, isActor) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		if (!isActor) {
			obj.icons = [];
		}
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			
			if (isActor) {
				if (line.match(/<\s*icon\s*:\s*(\d+)\s*>/i)) {
					obj.icon = parseInt(RegExp.$1);
				} else if (line.match(/<\s*iconVar\s*:\s*(\d+)\s*>/i)) {
					obj.iconVar = parseInt(RegExp.$1);
				}
			} else {
				if (line.match(/<\s*icon\s*:\s*(\d+)\s*,?\s*(\d+)\s*>/i)) {
					obj.icons[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
				}
			}
		}
	}
};

$.processDualtechExtNotetags2 = function(group) {
	var note1 = /<Crit[ ]Mode:[ ](.*)>/i;
	var note2 = /<Dual[ ]Multi[ ]Boost[ ]NAE:[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.criMode = $.Jay_DE.DefCriMode;
		if (Imported.sMS_MultipleElements && Imported.Moogle_X_EleBost) {
			obj.dualBoostNAE = $.ME.DefMultBostNAEOp;
		}
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var mode = RegExp.$1.toLowerCase();
				if (mode === 'lowest') {
					obj.criMode = 'Lowest';
				} else if (mode === 'highest') {
					obj.criMode = 'Highest';
				} else if (mode === 'average') {
					obj.criMode = 'Average';
				} else if (mode === 'sum') {
					obj.criMode = 'Sum';
				}
			} else if (Imported.sMS_MultipleElements && Imported.Moogle_X_EleBost && line.match(note2)) {
				var mode = RegExp.$1.toLowerCase();
				if (['simple', 's', '0'].contains(mode)) {
					obj.dualBoostNAE = 0;
				} else if (['ridiculously complicated', 'complicated', 'comp',
						'ridiculous', 'not simple', 'rc', '1'].contains(mode)) {
					obj.dualBoostNAE = 1;
				}
			}
		}
	}
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.iconProcessing = function(item) {
	switch (item) {
		
	case "actor" :
		if (this.actor().icon) {
			return this.actor().icon;
		}
		break;
		
	case "class" :
		var aClass = this.currentClass();
		if (aClass.icons && aClass.icons[this.actorId()]) {
			return aClass.icons[this.actorId()];
		}
		break;
			
	case "equipment" :
		var equipTypeSort = $.Jay_DE.ePriority;
		var equips = this.equips().filter(function(equip) {
			return equip; // Filters out slots with nothing in them
		});
		equips.sort(function(a,b) { // sorts equipment from highest to lowest
			return equipTypeSort.indexOf(a.etypeId) - equipTypeSort.indexOf(b.etypeId);
		});
		for (var i = 0; i < equips.length; i++) {
			if (equips[i].icons && equips[i].icons[this.actorId()]) {
				return equips[i].icons[this.actorId()];
			}
		}
		break;
		
	case "states" :
		var states = this.states();
		for (var i = 0; i < states.length; i++) {
			if (states[i].icons && states[i].icons[this.actorId()]) {
				return states[i].icons[this.actorId()];
			}
		}
		break;
		
	case "variable" :
		var iconV = this.actor().iconVar;
		if (iconV) {
			var iconID = $gameVariables.value(iconV);
			if (iconID > 0) {
				return iconID;
			}
		}
		break;
		
	}
	return;
};
	
Game_Actor.prototype.icon = function() {
	for (var i = 0; i < $.Jay_DE.gPriority.length; i++) {
		icon = this.iconProcessing($.Jay_DE.gPriority[i]);
		if (icon) return icon;
	};
	return 0;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.attackers = function() {
	if (this.item().meta.Dual && this.subject().isActor()) {
		var dualData = Jay.Dualtechs.dualSkillData(this.item().meta.Dual);
		var dualActors = dualData.actors.map(function(id) {
			return $gameActors.actor(id);
		});
		if (Imported.YEP_BattleEngineCore && this._attackers !== undefined) {
			var array = [];
			for (var i = 0; i < this._attackers.length; i++) {
				if (this._attackers[i] < 1) {
					array.push(this.subject());
				} else if (dualActors[this._attackers[i] - 1]) {
					array.push(dualActors[this._attackers[i] - 1]);
				}
			}
			return array;
		}
		if (!dualActors.contains(this.subject())) dualActors.push(this.subject());
		return dualActors;
	}
	return [this.subject()];
};

Game_Action.prototype.totalAtkStateRate = function(attackers, stateId) {
	return attackers.reduce(function(r, attacker) {
		return r + attacker.attackStatesRate(stateId);
	}, 0);
};

Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
	this.attackers().reduce(function(r, attacker) {
		return r.concat(attacker.attackStates());
	}, []).filter(function(stateId, i, array) {
		return array.indexOf(stateId) === i;
	}).forEach(function(stateId) {
		var chance = effect.value1;
		chance *= target.stateRate(stateId);
		chance *= this.totalAtkStateRate(this.attackers(), stateId);
		chance *= this.lukEffectRate(target);
		if (Math.random() < chance) {
			if (Imported.YEP_BattleEngineCore && stateId === this.deathStateId() &&
				target.isImmortal()) target.removeImmortal();
			target.addState(stateId);
			this.makeSuccess(target);
		}
	}.bind(this), target);
};

Game_Action.prototype.criArray = function() {
	return this.attackers().map(function(attacker) {
		return attacker.cri;
	});
};

Game_Action.prototype.combinedCri = function() {
	var criArray = this.criArray();
	switch (this.item().criMode) {
	case 'Lowest':
		return Math.min.apply(null, criArray);
	case 'Highest':
		return Math.max.apply(null, criArray);
	case 'Average':
		return criArray.reduce(function(r, newCri) {
			return r + newCri;
		}, 0) / criArray.length;
	case 'Sum':
		return criArray.reduce(function(r, newCri) {
			return r + newCri;
		}, 0);
	default:
		return this.subject().cri;
	}
};

if (!Imported.YEP_X_CriticalControl) {
	Game_Action.prototype.itemCri = function(target) {
		if (!this.item().damage.critical) return 0;
		return this.combinedCri() * (1 - target.cev);
	};
} else {
	Game_Action.prototype.combYEPCritBonus = function(bonus) {
		var func = '';
		switch (bonus) {
		case 0:
			func = 'criticalMultiplierBonus';
			break;
		case 1:
			func = 'flatCritBonus';
			break;
		case 2:
			func = 'certainCritRateBonus';
			break;
		case 3:
			func = 'physicalCritRateBonus';
			break;
		case 4:
			func = 'magicalCritRateBonus';
			break;
		}
		var rate = 0;
		var attackers = this.attackers();
		if (attackers.contains(this.subject())) {
			attackers.splice(attackers.indexOf(this.subject()), 1);
		} else {
			rate = -this.subject()[func]();
		}
		return attackers.map(function(attacker) {
			return attacker[func]();
		}).reduce(function(r, bonus) {
			return r + bonus;
		}, rate);
	};
	
	$.Jay_DE.GameAction_itemCri = Game_Action.prototype.itemCri;
	Game_Action.prototype.itemCri = function(target) {
		var rate = $.Jay_DE.GameAction_itemCri.call(this, target);
		if (!this.item().damage.critical) return rate;
		if (this.isCertainHit()) rate += this.combYEPCritBonus(2);
		if (this.isPhysical()) rate += this.combYEPCritBonus(3);
		if (this.isMagical()) rate += this.combYEPCritBonus(4);
		return rate;
	};
} // (!Imported.YEP_X_CriticalControl)

if (Imported.sMS_MultipleElements && Imported.Moogle_X_EleBost && $.ME.EleBoost) {
	$.Jay_DE.GameAction_canInsertNAE = Game_Action.prototype.canInsertNAE;
	Game_Action.prototype.canInsertNAE = function() {
		if (this.item().meta.Dual && this.subject().isActor() && this.item().dualBoostNAE === 1) {
			return false;
		}
		return $.Jay_DE.GameAction_canInsertNAE.call(this);
	};
	
	$.Jay_DE.GameAction_boostNAE = Game_Action.prototype.boostNAE;
	Game_Action.prototype.boostNAE = function(attackers, dmgPercent) {
		if (this.item().meta.Dual && this.subject().isActor()) {
			switch (this.item().dualBoostNAE) {
			case 0:
				return this.elementsMaxBoostRate(attackers, this.attackElements(), dmgPercent);
			case 1:
				return this.complicatedBoostRate(attackers, this.elements(false)) * dmgPercent;
			default:
				return dmgPercent;
			}
		}
		return $.Jay_DE.GameAction_boostNAE.call(this, attackers, dmgPercent);
	};
	
	Game_Action.prototype.complicatedBoostRate = function(attackers, elements) {
		if (!Array.isArray(attackers)) attackers = this.attackers();
		var atkElems = attackers.map(function(attacker) {
			return attacker.attackElements();
		});
		for (var i = 0; i < atkElems.length; i++) {
			atkElems[i] = atkElems[i].filter(function(id) {
				return !elements.contains(id);
			});
		}
		var array = [];
		atkElems.forEach(function(arr) {
			arr.forEach(function(id) {
				if (!array.contains(id)) array.push(id);
			});
		});
		var dmgPercent = 1 / array.length;
		var rate = 0;
		for (var i = 0; i < array.length; i++) {
			rate += this.combinedElementBoost(attackers.filter(function(attacker, j) {
				return atkElems[j].contains(array[i]);
			}), array[i]) * dmgPercent;
		}
		return rate;
	};

} // (Imported.sMS_MultipleElements && Imported.Moogle_X_EleBost && $.ME.EleBoost)

if (Imported.YEP_BattleEngineCore) {
	$.Jay_DE.Game_Action_clear = Game_Action.prototype.clear;
	Game_Action.prototype.clear = function() {
		$.Jay_DE.Game_Action_clear.call(this);
		this.resetAttackers();
	};
	
	Game_Action.prototype.setAttackers = function(array) {
		if (array) this._attackers = array;
	};
	
	Game_Action.prototype.resetAttackers = function() {
		this._attackers = undefined;
	};
}

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
	$.Jay_DE.BM_processActionSequence = BattleManager.processActionSequence;
	BattleManager.processActionSequence = function(actionName, actionArgs) {
		if (this._action.item().meta.Dual && this._subject.isActor()) {
			if (actionName === "DUAL ATTACKER") {
				return this.actionSetAttacker(actionArgs);
			}
			if (actionName === "RESET ATTACKER") {
				return this.actionResetAttacker();
			}
		}
		return $.Jay_DE.BM_processActionSequence.call(this, actionName, actionArgs);
	};
	
	BattleManager.actionSetAttacker = function(actionArgs) {
		var action = this._action;
		if (!action.item().meta.Dual) return;
		if (!this._subject.isActor()) return;
		if (!actionArgs) return;
		var attackers = [];
		for (var i = 0; i < actionArgs.length; i++) {
			var attacker = parseInt(actionArgs[i]);
			if (!attacker) continue;
			attackers.push(attacker);
		}
		action.setAttackers(attackers);
		return true;
	};
	
	BattleManager.actionResetAttacker = function() {
		var action = this._action;
		if (!action.item().meta.Dual) return;
		if (!this._subject.isActor()) return;
		action.resetAttackers();
		return true;
	};
}

//=============================================================================
// Game_Battler
//=============================================================================

if (Imported.YEP_BuffsStatesCore) {
	$.Jay_DE.GameBattler_addState = Game_Battler.prototype.addState;
	Game_Battler.prototype.addState = function(stateId) {
		$.Jay_DE.GameBattler_addState.call(this, stateId);
		if (this._stateOrigin && this._stateOrigin[stateId]) {
			var action = BattleManager._action;
			if (!(action && action.item().meta.Dual && action.subject().isActor())) {
				return;
			}
			var a = action.attackers();
			this.setStateOrigin(stateId, a[0]);
			if (attackers.length > 1) {
				var arr = this._stateOrigin[stateId].concat(a.slice(1).map(function(b) {
					return b.actorId();
				}));
				this._stateOrigin[stateId] = arr;
			}
		}
	};
}

})(superMasterSword);

} // (Imported.Jay_Dualtechs)