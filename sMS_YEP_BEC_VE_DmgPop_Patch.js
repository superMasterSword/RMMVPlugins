//=============================================================================
// sMS_YEP_BEC_VE_DmgPop_Patch.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Make Yanfly's Battle Engine Core and Victor's Damage Popups
 * play nice with each other
 * @author superMasterSword
 * 
 * @param ABText
 * @text Absorption Barrier Text
 * @desc Text display for Absorption Barrier popup. (Leave blank for no text)
 * %1 = Damage value.
 * @default %1
 * 
 * @param ABFont
 * @text Absorption Barrier Fontface
 * @desc Absorption Barrier text font name.
 * Default: this.standardFontFace() (allows script code)
 * @default this.standardFontFace()
 * 
 * @param ABSize
 * @text Absorption Barrier Fontsize
 * @desc Absorption Barrier text font size.
 * Default: this.standardFontSize() (allows script code)
 * @default this.standardFontSize()
 * 
 * @param ABColor
 * @text Absorption Barrier Color
 * @desc Absorption Barrier text color.
 * Default: #FF7DFF (allows script code)
 * @default #FF7DFF
 * 
 * @param ABRoll
 * @text Absorption Barrier Roll
 * @desc Roulette effect for Absorption Barrier digits.
 * true - ON     false - OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 * 
 * @param ABDelay
 * @text Absorption Barrier Delay
 * @desc Delay for each Absorption Barrier digit display.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * @default 0
 * 
 * @param ABX
 * @text Absorption Barrier Offset X
 * @desc Absorption Barrier popup display offset x.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * @default 0
 * 
 * @param ABY
 * @text Absorption Barrier Offset Y
 * @desc Absorption Barrier popup display offset y.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * @default 0
 * 
 * @param ABList
 * @text Absorption Barrier Motion
 * @desc Motion for the Absorption Barrier popup.
 * @type combo[]
 * @option wait
 * @option move down
 * @option move up
 * @option move left
 * @option move right
 * @option zoom
 * @option stretch
 * @option melt
 * @option pop high
 * @option fall high
 * @option pop low
 * @option fall low
 * @option custom 1
 * @option custom 2
 * @option custom 3
 * @option custom 4
 * @option custom 5
 * @option custom 6
 * @option custom 7
 * @option custom 8
 * @option custom 9
 * @option custom 10
 * @option custom 11
 * @option custom 12
 * @option custom 13
 * @option custom 14
 * @option custom 15
 * @option custom 16
 * @option custom 17
 * @option custom 18
 * @option custom 19
 * @option custom 20
 * @default ["pop high","fall high","pop low","fall low","wait","wait"]
 * 
 * @help Plug and Play, simple as that.
 * 
 * Place below Yanfly's Battle Engine Core, VictorEngine's Damage Popups,
 * and my MoreSkillCurrencies+DamagePopup Patch if you're using that.
*/

if (Imported.YEP_BattleEngineCore && Imported['VE - Damge Popup'] !== undefined) {

Imported.sMS_YEP_BEC_VE_DmgPop_Patch = true;

var superMasterSword = superMasterSword || {};
superMasterSword.YBVDP = superMasterSword.YBVDP || {};

(function($) {

//=============================================================================
// Parameters
//=============================================================================
var params = PluginManager.parameters('sMS_YEP_BEC_VE_DmgPop_Patch');
var popup = {};
popup.text = params.ABText;
popup.font = params.ABFont;
popup.size = params.ABSize;
popup.color = params.ABColor;
popup.roll = eval(params.ABRoll);
popup.delay = parseInt(params.ABDelay);
popup.x = parseInt(params.ABX);
popup.y = parseInt(params.ABY);
popup.list = JSON.parse(params.ABList);
VictorEngine.DamgePopup.popup['Absorption Barrier'] = popup;

//=============================================================================
// Game_Battler
//=============================================================================

/*
 * Don't need Yanfly's result manipulation with Victor's Damage Popups.
 * However, being able to have a queue of popups does still have its
 * advantages. Also, it would be way tougher to completely undo Yanfly's popup
 * timing changes.
*/
Game_Batttler.prototype.startDamagePopup = function() {
	this._damagePopup.push(JsonEx.makeDeepCopy(this.result()));
};

//=============================================================================
// Sprite_Battler
//=============================================================================

/*
 * A bit of a workaround to make Victor's popups use Yanfly's queue.
 * A bit awkward, but better to not completely overwrite the function if we
 * don't absolutely have to.
*/
$.YBVDP.SpriteBattler_setupDmgPopSprites = Sprite_Battler.prototype.setupDamagePopupSprites;
Sprite_Battler.prototype.setupDamagePopupSprites = function() {
	var origResult = JsonEx.makeDeepCopy(this._battler.result());
	while (this._battler.isDamagePopupRequested()) {
		this._battler._result = this._battler.shiftDamagePopup();
		$.YBVDP.SpriteBattler_setupDmgPopSprites.call(this);
	}
	this._battler._result = origResult;
};

$.YBVDP.SpriteBattler_damagePopupSprite = Sprite_Battler.prototype.damagePopupSprite;
Sprite_Battler.prototype.damagePopupSprite = function(type, value) {
	//Absorption Barrier Fix
	var result = this._battler.result();
	if (result._barrierAffected && type === 'HP Damage') {
		type = 'Absorption Barrier';
	}
	//Delay Adjustment fix
	if (this._damageDelay === 0 && this._damageSprites > 0) {
		this._damageDelay = VictorEngine.Parameters.DamgePopup.DelayAdjust * this._damageSprites;
	}
	$.YBVDP.SpriteBattler_damagePopupSprite.call(this, type, value);
};

//=============================================================================
// Sprite_CustomDamage
//=============================================================================

$.YBVDP.SpriteCstmDmg_damageDigits = Sprite_CustomDamage.prototype.damageDigits;
Sprite_CustomDamage.prototype.damageDigits = function(type) {
	return type === 'Absorption Barrier' ||
		$.YBVDP.SpriteCstmDmg_damageDigits.call(this, type);
};

})(superMasterSword);

}