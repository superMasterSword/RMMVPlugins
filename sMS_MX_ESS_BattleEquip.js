//=============================================================================
// sMS_MX_ESS_BattleEquip.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Allows you to change equipped skills during battle
 * @author superMasterSword
 * 
 * @param changeEquipSkill
 * @text Skill Change Skill
 * @desc This skill will be used when a character tries to change
 * their equipped skills. They must be able to use this skill.
 * @type skill
 * @default 0
 * 
 * @param limitWin
 * @text Limit Window
 * @desc This window is made before the others.
 * Set the x, y, width and height.
 * @type note
 * @default "x = 0;\ny = this._helpWindow.y + this._helpWindow.height;\nwidth = Graphics.boxWidth / 2;\nheight = this._helpWindow.fittingHeight(1);"
 * 
 * @param costWin
 * @text Cost Window
 * @desc This window is made after the Limit Window.
 * Set the x, y, width, and height.
 * @type note
 * @default "x = this._eqsLimitWindow.x + this._eqsLimitWindow.width;\ny = this._eqsLimitWindow.y;\nwidth = Graphics.boxWidth - x;\nheight = this._eqsLimitWindow.height;"
 * 
 * @param slotWin
 * @text Slot Window
 * @desc This window is made after the Cost Window.
 * Set the x, y, width and height
 * @type note
 * @default "x = 0;\ny = this._eqsLimitWindow.y + this._eqsLimitWindow.height;\nwidth = Graphics.boxWidth / 2;\nheight = this._statusWindow.y - y;"
 * 
 * @param poolWin
 * @text Pool Window
 * @desc This window is made last
 * Set the x, y, width and height
 * @type note
 * @default "x = this._eqsSlotWindow.x + this._eqsSlotWindow.width;\ny = this._eqsSlotWindow.y;\nwidth = Graphics.boxWidth - x;\nheight = this._eqsSlotWindow.height;"
 * 
 * @help The user will use the skill defined in the parameter whenever they
 * try to switch their Equipped Skills in Battle, you can put any restrictions
 * on this skill, such as cooldowns, costs, what have you. You can even make it
 * an instant skill! (Kinda defeats the purpose unless you have a cooldown, but
 * you already have this plugin so... meh)
 * 
 * The required skill's name will appear on the actor's command window.
 * 
 * Place below Moogle_X's Equip Skill System
 * Place below Bobstah's Battle Command List if you're using it.
*/

if (Imported.Moogle_X_EQS) {

Imported.sMS_MX_ESS_BE = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MX_ESS_BE = superMasterSword.MX_ESS_BE || {};

function Window_BattleEqsSlot() {
	this.initialize.apply(this, arguments);
}

function Window_BattleEqsPool() {
	this.initialize.apply(this, arguments);
}

(function($) {

$.MX_ESS_BE.params = PluginManager.parameters("sMS_MX_ESS_BattleEquip");
$.MX_ESS_BE.changeEquipSkill = parseInt($.MX_ESS_BE.params.changeEquipSkill);
$.MX_ESS_BE.limitWin = JSON.parse($.MX_ESS_BE.params.limitWin);
$.MX_ESS_BE.costWin = JSON.parse($.MX_ESS_BE.params.costWin);
$.MX_ESS_BE.slotWin = JSON.parse($.MX_ESS_BE.params.slotWin);
$.MX_ESS_BE.poolWin = JSON.parse($.MX_ESS_BE.params.poolWin);

//=============================================================================
// Window_ActorCommand
//=============================================================================

if (Imported.BOB_BattleCommandList) {
	$.MX_ESS_BE.WinActorCmd_processCmdEntry = Window_ActorCommand.prototype.processCommandEntry;
	Window_ActorCommand.prototype.processCommandEntry = function(cmd) {
		if (cmd.command.toLowercase() === "changeskills") {
			return this.addChangeEquipSkills();
		} else {
			return $.MX_ESS_BE.WinActorCmd_processCmdEntry.call(this, cmd);
		}
	};
} else {
	$.MX_ESS_BE.WinActorCmd_makeCmdList = Window_ActorCommand.prototype.makeCommandList;
	Window_ActorCommand.prototype.makeCommandList = function() {
		$.MX_ESS_BE.WinActorCmd_makeCmdList.call(this);
		if (this._actor) {
			this.addChangeEquipSkills();
		}
	};
}

Window_ActorCommand.prototype.addChangeEquipSkills = function() {
	var skill = $dataSkills[$.MX_ESS_BE.changeEquipSkill];
	var canChange = this._actor.canUse(skill);
	
	if (!Imported.BOB_BattleCommandList || !this._cmdContext) {
		this.addCommand(skill.name, 'changeSkills', canChange);
		return;
	}
	
	var condition = true;
	
	if (this._cmdContext._evalCondition) {
		try {
			var a = this._actor;
			var user = this._actor;
			var subject = this._actor;
			var s = $gameSwitches._data;
			var v = $gameVariables._data;
			var p = $gameParty;
			condition = eval(this._cmdContext._condition);
		} catch (e) {
			var text = "Bobstah Command Condition Error on command: ";
			throw Error(text + this._cmdContext.command);
		}
	}
	
	if (this._cmdContext.hide) {
		if (!canChange || !condition) {
			return false;
		}
	}
	
	var icon = this._cmdContext.iconOverride || skill.iconIndex || null;
	var name = this._cmdContext.params || skill.name || "???";
	
	this.addCommand(name, 'changeSkills', canChange && condition, null, icon);
	return true;
};

//=============================================================================
// Window_BattleEqsSlot
//=============================================================================

Window_BattleEqsSlot.prototype = Object.create(Window_EquipSkillSlot.prototype);
Window_BattleEqsSlot.prototype.constructor = Window_BattleEqsSlot;

Window_BattleEqsSlot.prototype.initialize = function(x, y, width, height) {
	Window_EquipSkillSlot.prototype.initialize.call(this, x, y, width, height);
};

Window_BattleEqsSlot.prototype.itemHeight = function() {
	return Window_EquipSkillSlot.prototype.itemHeight.call(this) * 2;
};

//=============================================================================
// Scene_Battle
//=============================================================================

$.MX_ESS_BE.SceneBattle_isAnyInputWinActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
	if ($.MX_ESS_BE.SceneBattle_isAnyInputWinActive.call(this)) {
		return true;
	}
	return (this._eqsSlotWindow.active || this._eqsPoolWindow.active);
};

$.MX_ESS_BE.SceneBattle_createAllWins = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	$.MX_ESS_BE.SceneBattle_createAllWins.call(this);
	// Create equip skill windows
	this.createEquipLimitWindow();
	this.createEquipCostWindow();
	this.createEquipSkillWindow();
	this.createEquipSkillPool();
};

$.MX_ESS_BE.SceneBattle_createActorCmdWin = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
	$.MX_ESS_BE.SceneBattle_createActorCmdWin.call(this);
	this._actorCommandWindow.setHandler('changeSkills', this.commandChangeSkills.bind(this));
};

Scene_Battle.prototype.createEquipLimitWindow = function() {
	var x, y, width, height;
	try {
		eval($.MX_ESS_BE.limitWin);
	} catch (e) {
		console.log('Battle Eqs Limit Window Eval Error');
		console.log($.MX_ESS_BE.limitWin);
		console.error(e);
		x = 0;
		y = this._helpWindow.y + this._helpWindow.height;
		width = Graphics.boxWidth / 2;
		height = this._helpWindow.fittingHeight(1);
	}
	this._eqsLimitWindow = new Window_EqsLimit(x, y, width, height);
	this.addWindow(this._eqsLimitWindow);
};

Scene_Battle.prototype.createEquipCostWindow = function() {
	var x, y, width, height;
	try {
		eval($.MX_ESS_BE.costWin);
	} catch (e) {
		console.log('Battle Eqs Cost Window Eval Error');
		console.log($.MX_ESS_BE.costWin);
		console.error(e);
		x = this._eqsLimitWindow.x + this._eqsLimitWindow.width;
		y = this._eqsLimitWindow.y;
		width = Graphics.boxWidth - x;
		height = this._eqsLimitWindow.height;
	}
	this._eqsCostWindow = new Window_EqsCost(x, y, width, height);
	this.addWindow(this._eqsCostWindow);
}

Scene_Battle.prototype.createEquipSkillWindow = function() {
	var x, y, width, height;
	try {
		eval($.MX_ESS_BE.slotWin);
	} catch (e) {
		console.log('Battle Eqs Slot Window Eval Error');
		console.log($.MX_ESS_BE.slotWin);
		console.error(e);
		x = 0;
		y = this._eqsLimitWindow.y + this._eqsLimitWindow.height;
		width = Graphics.boxWidth / 2;
		height = this._statusWindow.y - y;
	}
	this._eqsSlotWindow = new Window_BattleEqsSlot(x, y, width, height);
	this._eqsSlotWindow.setHelpWindow(this._helpWindow);
	this._eqsSlotWindow.setHandler('ok',     this.onEqsSlotOk.bind(this));
	this._eqsSlotWindow.setHandler('cancel', this.onEqsSlotCancel.bind(this));
	this.addWindow(this._eqsSlotWindow);
};

Scene_Battle.prototype.createEquipSkillPool = function() {
	var x, y, width, height;
	try {
		eval($.MX_ESS_BE.poolWin);
	} catch (e) {
		console.log('Battle Eqs Pool Window Eval Error');
		console.log($.MX_ESS_BE.poolWin);
		console.error(e);
		x = this._eqsSlotWindow.x + this._eqsSlotWindow.width;
		y = this._eqsSlotWindow.y;
		width = Graphics.boxWidth - x;
		height = this._eqsSlotWindow.height;
	}
	this._eqsPoolWindow = new Window_BattleEqsPool(x, y, width, height);
	this._eqsPoolWindow.setHelpWindow(this._helpWindow);
	this._eqsPoolWindow.setHandler('ok',     this.onEqsItemOk.bind(this));
	this._eqsPoolWindow.setHandler('cancel', this.onEqsItemCancel.bind(this));
	this._eqsSlotWindow.setItemWindow(this._eqsPoolWindow);
	this.addWindow(this._eqsPoolWindow);
}

Scene_Battle.prototype.commandChangeSkills = function() {
	var actor = BattleManager.actor();
	
	this._eqsSlotWindow.setActor(actor);
	this._eqsPoolWindow.setActor(actor);
	this._eqsLimitWindow.setActor(actor);
	this._eqsCostWindow.setActor(actor);
	
	this._eqsSlotWindow.show();
	this._eqsPoolWindow.show();
	this._eqsLimitWindow.show();
	this._eqsCostWindow.show();
	
	this._eqsSlotWindow.activate();
	this._skillsChanged = false;
};

Scene_Battle.protoype.onEqsSlotOk = function() {
	this._eqsPoolWindow.activate();
	this._eqsPoolWindow.select(0);
}

Scene_Battle.prototype.onEqsSlotCancel = function() {
	this._eqsSlotWindow.hide();
	this._eqsPoolWindow.hide();
	this._eqsLimitWindow.hide();
	this._eqsCostWindow.hide();
	
	if (this._skillsChanged) {
		var skill = $dataSkills[$.MX_ESS_BE.changeEquipSkill];
		var action = BattleManager.inputtingAction();
		action.setSkill(skill.id);
		BattleManager.actor().setLastBattleSkill(skill);
		this.onSelectAction();
	} else {
		this._actorCommandWindow.activate();
	}
}

Scene_Battle.prototype.onEqsItemOk = function() {
	// FINISH THIS
	AudioManager.playStaticSe(this._eqsPoolWindow._equipSound);
	var slotData = this._eqsSlotWindow.item(this._eqsSlotWindow.index());
	BattleManager.actor().setSkillToEquip(this._eqsPoolWindow.item(), item.typeId, item.slotId);
	// ADD SKILL CHANGE CHECK
	
	this._eqsSlotWindow.activate();
	this._eqsSlotWindow.refresh();
	this._eqsPoolWindow.deselect();
	this._eqsPoolWindow.refresh();
	this._eqsLimitWindow.refresh();
	this._statusWindow.refresh();
}

Scene_Battle.prototype.onEqsItemCancel = function() {
	this._eqsSlotWindow.activate();
	this._eqsPoolWindow.deselect();
}

})(superMasterSword);

}