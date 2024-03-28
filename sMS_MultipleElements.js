//=============================================================================
// sMS_MultipleElements.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};
Imported.sMS_MultipleElements = true;

var superMasterSword = superMasterSword || {};
superMasterSword.ME = superMasterSword.ME || {};

/*:
 * @plugindesc v1.2 Allows your skills to have multiple elements
 * @author superMasterSword
 * 
 * @param NormAtkEle
 * @text Normal Attack Elements
 * @desc Check help file for more info.
 * @type boolean
 * @on Include then Average
 * @off Equal 1 Element
 * @default true
 * 
 * @param AtkEleLimit
 * @text Limit Attack Elements
 * @desc Check help file for more info.
 * Default = Don't Limit
 * @type boolean
 * @on Limit
 * @off Don't Limit
 * @default false
 * 
 * @param EleBoost
 * @text Change Element Booster
 * @desc If using Moogle_X's Element Booster plugin,
 * change it to work more like this plugin?
 * @type boolean
 * @on Patch
 * @off Don't Patch
 * @default true
 * 
 * @help 
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This plugin allows you to have multiple elements on a single skill without
 * relying on Normal Attack Elements. It also lets you set what percent of the
 * damage is considered to be that element.
 * 
 * In a way it acts like the effect of calculating the average element rate,
 * except with more flexibility since you can specify the percentages if you
 * so desire.
 * 
 * ============================================================================
 * Adding Elements
 * ============================================================================
 * 
 * <Extra Elements: x, x, x>
 * This will add all the listed element ids to the action. The percentage will
 * be automatically calculated based on however many elements there are.
 * 
 * <Extra Elements: x/y%>
 * <Extra Elements: x/y%, x/y%, x/y%>
 * This adds element x with a percent of y. The percent sign is not optional.
 * Y should be a whole number. It also works with listing multiple elements.
 * 
 * <Extra Elements: x/y%, x/y%, x, x, x/y%, x>
 * They can also be combined into a single notetag.
 * 
 * 
 * Note: with any of these you can also put -1 for Normal Attack Elements set
 * with the native traits. If you specify a percent then all of the Normal
 * Attack Elements combined will make only make up that percentage.
 * Also, the element set in the editor is still taken into account even when
 * using these notetags, however its percentage will be automatically
 * calculated since there is no way to set a percentage for it. If you want to
 * specify percentages for all the elements you add, simply set the element in
 * the editor to none.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * Normal Attack Elements:
 *   If true Normal Attack Elements will be added to the list of elements
 *   and then averaged out after that. If false, the relative percentages of
 *   each will be calculated with all of the Normal Attack Elements counting
 *   as only 1 element.
 *   *Note: This behavior will only matter if you do not specify a percentage
 *          for the Normal Attack Elements.
 * 
 * Limit Attack Elements:
 *   I'd recommend only activating this if you have a LOT of stuff that adds
 *   Attack Elements in your game. If set to true, this will limit Attack
 *   Elements to ones found from states, if none are found, it will check for
 *   equipment, if none are found, it will check Actor and Classes (I may
 *   change the order it checks later, but for now this is it)
 *   If false, it will take the default behavior and simply get all Attack
 *   Elements from all sources providing them.
 * 
 * Change Element Booster:
 *   If you're using Moogle_X's Element Booster plugin and this parameter is
 *   enabled, this will make their plugin use calculations similar to this
 *   plugin, basically getting the average. In addition, it will also take
 *   whichever method was specified in the Normal Attack Elements parameter
 *   when calculating the boost for a skill factoring in Normal Attack
 *   Elements.
 * 
 * ============================================================================
 * New Function
 * ============================================================================
 * 
 * If you want to check what elements the next hit of an action will have
 * (assuming no more changes are applied before then) you can call
 * "action.elements()" where "action" is a Game_Action object. This will return
 * an array of elements that the next hit will be.
 * 
 * ============================================================================
 * Action Sequences
 * ============================================================================
 * 
 * If you're using Yanfly's Battle Engine Core, an additional feature will be
 * unlocked. And that is the ability to set what element individual hits are
 * (every time the Action Effect action sequence is called is one hit)
 * 
 * ============================================================================
 * ADD ELEMENT: x, (y.z%)
 * ADD ELEMENT: x, (y.z%), x, (y.z%), x, (y.z%)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will add element(s) x to the elements used in damage calculations if
 * they're not already included. Optionally specify a percent with a percent
 * sign.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: add element: 9
 *                add element: 8, 9%
 *                add element: 4, 6, 3
 *                add element: 2, 20%, 7, 18%, 5, 16%
 *                add element: -1, 50%, 4, 6
 * ============================================================================
 * 
 * ============================================================================
 * ELEMENT: x
 * ELEMENT: x, (y.z%) x, (y.z%), x, (y.z%)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will make all proceeding hits considered to be solely of elements
 * specified in this tag. Putting -1 will include Normal Attack Elements.
 * All hits after this will be these elements until reset.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: element: 2
 *                element: 4
 *                element: 8, 40%, 9, 50%, 3
 * ============================================================================
 * 
 * ============================================================================
 * RESET ELEMENTS
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will reset the elements back to normal after specifying an element so
 * all the other elements you set up can also be used.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset elements
 * ============================================================================
 * 
 * ============================================================================
 * Compatibility
 * ============================================================================
 * 
 * Place this plugin below Yanfly's Battle Engine Core and Moogle_X's Element
 * Booster plugin.
 * Place above Victor Engine or SumRndmDde's Damage Popups plugins.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * 1.2 - Moved Jay's Dualtech compatibility to a separate plugin because too
 *       many features unrelated to elements ended up getting added.
 * 
 * 1.1 - Added "Add Element" Action Sequence and element function to enable
 *       checking elements in a skill. Added Jay's Dualtech compatibility.
 *       Updated parameters to MV 1.5 update.
 * 
 * 1.0 - Finished plugin!
*/

(function($) {

$.ME.params = PluginManager.parameters("sMS_MultipleElements");
$.ME.NormAtkEle = eval(String($.ME.params.NormAtkEle));
$.ME.AtkEleLimit = eval(String($.ME.params.AtkEleLimit));
$.ME.EleBoost = eval(String($.ME.params.EleBoost));

//=============================================================================
// DataManager
//=============================================================================

$.ME.DM_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!$.ME.DM_isDatabaseLoaded.call(this)) return false;
	if (!$.ME._loaded) {
		$.processMultiElementNotetags($dataSkills);
		$.processMultiElementNotetags($dataItems);
		$.ME._loaded = true;
	}
	return true;
};

//=============================================================================
// superMasterSword
//=============================================================================

$.processMultiElementNotetags = function(group) {
	var note = /<Extra[ ]Elements?:[ ]((?:-?\d+\/\d+[%％],?[ ]*|-?\d+,?[ ]*)+)>/i;
	var percent = /(-?\d+)\/(\d+)[%％]/g;
	var ele = /(-?\d+)(?!\/|[%％])/g;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.extraElements = [];
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			var match = line.match(note);
			if (match) {
				do {
					var elements = percent.exec(match[1]);
					if (elements) {
						obj.extraElements.push([parseInt(elements[1]), parseInt(elements[2]) * 0.01]);
					}
				} while (elements);
				do {
					elements = ele.exec(match[1]);
					if (elements) {
						obj.extraElements.push(parseInt(elements[1]));
					}
				} while (elements);
			}
		}
	}
};

$.uniqueEle = function(orig) {
	elements = orig.slice();
	elements.forEach(function(ele, i) {
		if (Array.isArray(ele)) elements[i] = ele[0];
	});
	return orig.filter(function(ele, i) {
		return elements.indexOf(elements[i]) === i;
	});
};

//=============================================================================
// Game_Action
//=============================================================================

if (!Game_Action.prototype.attackers) {
	Game_Action.prototype.attackers = function() {
		return [this.subject()];
	};
}

Game_Action.prototype.attackElements = function() {
	return $.uniqueEle(this.attackers().reduce(function(r, actor) {
		return r.concat(actor.attackElements());
	}, []));
};

Game_Action.prototype.elements = function(includePercents) {
	if (Imported.YEP_BattleEngineCore && this._element !== undefined) {
		if (includePercents) return this._element;
		return this._element.map(function(id) {
			return Array.isArray(id) ? id[0] : id;
		});
	}
	var elementId = this.item().damage.elementId;
	var elements = elementId === 0 ? [] : [elementId];
	elements = elements.concat(this.item().extraElements);
	if (Imported.YEP_BattleEngineCore && this._addedElements !== undefined) {
		elements = elements.concat(this._addedElements);
	}
	elements = $.uniqueEle(elements);
	if (includePercents) return elements;
	return elements.map(function(id) {
		return Array.isArray(id) ? id[0] : id;
	});
};

Game_Action.prototype.calcElementRate = function(target) {
	var dmgPercent = 1;
	var elements = this.elements(true);
	var percentSet = elements.filter(function(id) {
		return Array.isArray(id);
	});
	var rate = 0;
	for (var i = 0; i < percentSet.length; i++) {
		if (percentSet[i][0] < 0) {
			rate += this.elementsMaxRate(target, this.attackElements(), percentSet[i][1]);
		} else {
			rate += target.elementRate(percentSet[i][0]) * percentSet[i][1];
		}
		dmgPercent -= percentSet[i][1];
	}
	if (dmgPercent < 0) dmgPercent = 0;
	var noPercent = elements.filter(function(id) {
		return typeof id === "number";
	});
	rate += this.elementsMaxRate(target, noPercent, dmgPercent);
	return rate;
};

Game_Action.prototype.elementsMaxRate = function(target, elements, dmgPercent) {
	if (!dmgPercent) dmgPercent = 1;
	if (elements.length > 0) {
		if (elements.indexOf(-1) >= 0 && this.canInsertNAE()) {
			elements = elements.filter(function(ele) {
				return ele !== -1;
			});
			elements = elements.concat(this.attackElements());
		}
		elements = $.uniqueEle(elements);
		dmgPercent /= elements.length;
		var rate = 0;
		for (var i = 0; i < elements.length; i++) {
			if (elements[i] < 0) {
				rate += this.elementsMaxRate(target, this.attackElements(), dmgPercent);
			} else {
				rate += target.elementRate(elements[i]) * dmgPercent;
			}
		}
		return rate;
	}
	return dmgPercent; // 1 (neutral) * dmgPercent (% of damage). Anything times 1 is itself.
};

Game_Action.prototype.canInsertNAE = function() {
	return $.ME.NormAtkEle;
};

if (Imported.Moogle_X_EleBost && $.ME.EleBoost) {
	Game_Action.prototype.calcElementBoost = function(subject) {
		if (!Array.isArray(subject)) subject = this.attackers();
		var dmgPercent = 1;
		var elements = this.elements(true);
		var percentSet = elements.filter(function(id) {
			return Array.isArray(id);
		});
		var rate = 0;
		for (var i = 0; i < percentSet.length; i++) {
			if (percentSet[i][0] < 0) {
				rate += this.boostNAE(subject, percentSet[i][1]);
			} else {
				rate += this.combEleBoost(subject, percentSet[i][0]) * percentSet[i][1];
			}
			dmgPercent -= percentSet[i][1];
		}
		if (dmgPercent < 0) dmgPercent = 0;
		var noPercent = elements.filter(function(id) {
			return typeof id === "number";
		});
		rate += this.elementsMaxBoostRate(subject, noPercent, dmgPercent);
		return rate;
	};
	
	Game_Action.prototype.elementsMaxBoostRate = function(subject, elements, dmgPercent) {
		if (!dmgPercent) dmgPercent = 1;
		if (elements.length > 0) {
			if (!Array.isArray(subject)) subject = this.attackers();
			if (elements.indexOf(-1) >= 0 && this.canInsertNAE()) {
				elements = elements.filter(function(ele) {
					return ele !== -1;
				});
				elements = elements.concat(this.attackElements());
			}
			elements = $.uniqueEle(elements);
			dmgPercent /= elements.length;
			var rate = 0;
			for (var i = 0; i < elements.length; i++) {
				if (elements[i] < 0) {
					rate += this.boostNAE(subject, dmgPercent);
				} else {
					rate += this.combEleBoost(subject, elements[i]) * dmgPercent;
				}
			};
			return rate;
		}
		return dmgPercent;
	};
	
	Game_Action.prototype.combEleBoost = function(attackers, element) {
		return attackers.map(function(attacker) {
			return attacker.elementBoost(element);
		}).reduce(function(r, boost) {
			return r * boost;
		}, 1);
	};
	
	Game_Action.prototype.boostNAE = function(attackers, dmgPercent) {
		return this.elementsMaxBoostRate(attackers, this.attackElements(), dmgPercent);
	};
} // (Imported.Moogle_X_EleBost && $.ME.EleBoost)

if (Imported.YEP_BattleEngineCore) {
	$.ME.Game_Action_clear = Game_Action.prototype.clear;
	Game_Action.prototype.clear = function() {
		$.ME.Game_Action_clear.call(this);
		this.clearElement();
	};
	
	Game_Action.prototype.addElement = function(array) {
		if (array) this._addedElements = $.uniqueEle(array);
	};
	
	Game_Action.prototype.setElement = function(array) {
		if (array) this._element = $.uniqueEle(array);
	};
	
	Game_Action.prototype.clearElement = function() {
		this._addedElements = undefined;
		this._element = undefined;
	};
}

//=============================================================================
// Game_BattlerBase
//=============================================================================

if ($.ME.AtkEleLimit) {
	Game_BattlerBase.prototype.attackElements = function() {
		// states
		traits = this.states().slice();
		traits.reduce(function(r, obj) {
			return r.concat(obj.traits);
		}, []).filter(function(trait) {
			return trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
		}).reduce(function(r, trait) {
			return r.concat(trait.dataId);
		}, []);
		if (traits.length > 0) return traits;
		// actor/enemy
		if (this.isActor()) {
			//equips
			traits = this.equips().filter(function(equip) {
				return equip;
			}).reduce(function(r, obj) {
				return r.concat(obj.traits);
			}, []).filter(function(trait) {
				return trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
			}).reduce(function(r, trait) {
				return r.concat(trait.dataId);
			}, []);
			if (traits.length > 0) return traits;
			// actor/class
			return [this.actor(), this.currentClass()].reduce(function(r, obj) {
				return r.concat(obj.traits);
			}, []).filter(function(trait) {
				return trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
			}).reduce(function(r, trait) {
				return r.concat(trait.dataId);
			}, []);
		} else if (this.isEnemy()) {
			// enemy
			return this.enemy().traits.filter(function(trait) {
				return trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
			}).reduce(function(r, trait) {
				return r.concat(trait.dataId);
			}, []);
		}
	};
} // ($.ME.AtkEleLimit)

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
	$.ME.BM_processActionSequence = BattleManager.processActionSequence;
	BattleManager.processActionSequence = function(actionName, actionArgs) {
		if (actionName === "ADD ELEMENT") {
			return this.actionAddElement(actionArgs);
		}
		if (actionName === "ELEMENT") {
			return this.actionSetElement(actionArgs);
		}
		if (actionName === "RESET ELEMENTS") {
			return this.actionResetElement();
		}
		return $.ME.BM_processActionSequence.call(this, actionName, actionArgs);
	};
	
	BattleManager.actionAddElement = function(actionArgs) {
		if (!actionArgs) return;
		var elements = [];
		for (var i = 0; i < actionArgs.length; i++) {
			var element = parseInt(actionArgs[i]);
			if (!element) continue;
			if (actionArgs[i+1] && actionArgs[i+1].indexOf('%') > -1) {
				i++;
				var percent = parseFloat(actionArgs[i]) * 0.01;
				if (percent) {
					element = [element, percent];
				}
			}
			elements.push(element);
		}
		this._action.addElement(elements);
		return true;
	};
	
	BattleManager.actionSetElement = function(actionArgs) {
		if (!actionArgs) return;
		var elements = [];
		for (var i = 0; i < actionArgs.length; i++) {
			var element = parseInt(actionArgs[i]);
			if (!element) continue;
			if (actionArgs[i+1] && actionArgs[i+1].indexOf('%') > -1) {
				i++;
				var percent = parseFloat(actionArgs[i]) * 0.01;
				if (percent) {
					element = [element, percent];
				}
			}
			elements.push(element);
		}
		this._action.setElement(elements);
		return true;
	};
	
	BattleManager.actionResetElement = function() {
		this._action.clearElement();
		return true;
	};
} // (Imported.YEP_BattleEngineCore)

})(superMasterSword);