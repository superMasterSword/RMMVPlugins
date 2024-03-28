//=============================================================================
// More YEP Action Sequence Target Types
// Version 1.0
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Adds target groups for action sequences
 * 
 * <More Target Types>
 * @author superMasterSword
 * 
 * @param targetTypes
 * @text Custom Target Groups
 * @desc Define your custom Target Groups here
 * @type struct<targetType>[]
 * @default ["{\"id\":\"[\\\"OPPONENTS NOT TARGET\\\",\\\"OPPONENTS NOT TARGETS\\\",\\\"/(?:RIVALS|FOES) NOT TARGET[S]?/i\\\"]\",\"desc\":\"\\\"Affects opponents not targeted by the user's current skill\\\"\",\"code\":\"\\\"var group = this._action.opponentsUnit().aliveMembers();\\\\nfor (var i = 0; i < group.length; i++) {\\\\n  var target = group[i];\\\\n  if (target) {\\\\n    if (this._targets.contains(target)) continue;\\\\n    targets.push(target);\\\\n  }\\\\n}\\\"\"}"]
 * 
 * @help This allows you to make new target groups for action sequences, as long as
 * you have some basic coding knowledge.
*/

/*~struct~targetType:
 * 
 * @param id
 * @text Name(s)
 * @desc Either type the name as you want it to be written, or a
 * Regular Expression to match against.
 * @type string[]
 * 
 * @param desc
 * @text Description
 * @desc This is just to help you remember who/what this is intended
 * for.
 * @type note
 * 
 * @param code
 * @text Code
 * @desc Code that will be run when this group is chosen/used.
 * Fill targets array with chosen battlers.
 * @type note
*/

if (Imported.YEP_BattleEngineCore) {

Imported.sMS_YEP_MTT = true;
var superMasterSword = superMasterSword || {};
superMasterSword.YEP_MTT = superMasterSword.YEP_MTT || {};

(function($) {

$.YEP_MTT.params = $plugins.filter(function(p) {
	return p.description.contains("<More Target Types>");
})[0].parameters;
$.YEP_MTT.targetTypes = JSON.parse($.YEP_MTT.params.targetTypes);
for (var i = 0; i < $.YEP_MTT.targetTypes.length; i++) {
	var type = JSON.parse($.YEP_MTT.targetTypes[i]);
	type.id = JSON.parse(type.id);
	for (var j = 0; j < type.id.length; j++) {
		if (type.id[j].match(/^\/.*\/\w*$/i)) {
			type.id[j] = eval(type.id[j]);
		} else {
			type.id[j] = type.id[j].toUpperCase();
		}
	}
	type.code = JSON.parse(type.code);
	$.YEP_MTT.targetTypes[i] = type;
}

$.YEP_MTT.BM_makeActionTargets = BattleManager.makeActionTargets;
BattleManager.makeActionTargets = function(string) {
	var targets = [];
	string = string.toUpperCase();
	var targetTypes = $.YEP_MTT.targetTypes;
	for (var i = 0; i < targetTypes.length; i++) {
		var type = targetTypes[i];
		for (var j = 0; j < type.id.length; j++) {
			if ((type.id[j] instanceof RegExp && string.match(type.id[j])) ||
			type.id[j] === string) {
				eval(type.code);
				if (targets.length > 0) return targets;
				break;
			}
		}
	}
	return $.YEP_MTT.BM_makeActionTargets.call(this, string);
};

})(superMasterSword);

};