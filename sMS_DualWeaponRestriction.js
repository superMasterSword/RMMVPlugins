//=============================================================================
// sMS_DualWeaponRestriction.js
//=============================================================================

var Imported = Imported || {};
Imported.DualWeaponRestriction = true;

var superMasterSword = superMasterSword || {};
superMasterSword.DWR = superMasterSword.DWR || {};
/*:
 * @plugindesc Version 1.0
 * Allows a skill to require two weapons to be used
 * @author superMasterSword
 * @help
 * This is my first plugin, so please forgive me if I make noob mistakes
 * To use this plugin:
 *  -Put it in the Plugin Manager (like you already have)
 *  -Put the <Dual Required> tag in the notebox of the skill you want to restrict.
 *  -Set the two required weapon types to the types you want
 *  -You're done! The plugin will do the rest of the work for you
 */
 
superMasterSword.DWR.dualRequired = function(skill) {
	tag = /<Dual[ ]*Required>/i;
	return (tag.test(skill.note) === true);
}

superMasterSword.DWR.GameActor_isSkillWtypeOk = Game_Actor.prototype.isSkillWtypeOk;
Game_Actor.prototype.isSkillWtypeOk = function(skill) {
	if (superMasterSword.DWR.dualRequired(skill)) {
		var wtypeId1 = skill.requiredWtypeId1;
		var wtypeId2 = skill.requiredWtypeId2;
		if (this.isDualWield() && 
				((superMasterSword.DWR.isWtypeInSlot.call(this, wtypeId1, 0) && 
				superMasterSword.DWR.isWtypeInSlot.call(this, wtypeId2, 1)) || 
				(superMasterSword.DWR.isWtypeInSlot.call(this, wtypeId1, 1) && 
				superMasterSword.DWR.isWtypeInSlot.call(this, wtypeId2, 0)))) {
			return true;
		} else {return false;}
	} else {return superMasterSword.DWR.GameActor_isSkillWtypeOk.call(this, skill);}
}

superMasterSword.DWR.isWtypeInSlot = function(wTypeId, slot) {
    if (this.weapons()[slot]) {
		return this.weapons()[slot].wtypeId === wTypeId;
    } else {return this.equips()[slot] === null && wTypeId === 0;}
}