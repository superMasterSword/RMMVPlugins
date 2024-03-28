//=============================================================================
// sMS_MSC_VE_DmgPop_Ext.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Allows you to give your custom Skill Currency stats custom
 * popups
 * @author superMasterSword
 * 
 * @param popups
 * @text Stat Popups
 * @desc Define the popups for your custom stats here
 * @type struct<DmgPop>[]
 * @default []
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This plugin allows you to create custom popups to show up for your stats
 * created with sMS_MoreSkillCurrencies, if you're using Victor Engine's Damage
 * Popup script.
 * 
 * ============================================================================
 * Setup
 * ============================================================================
 * 
 * Not much needs to be done except set up the plugin parameters corresponding
 * to the stats you added with the core plugin, although if you're using a json
 * you'll just have to add the settings to that file instead, the setup will be
 * documented here, if you're using the parameters, just refer to Victor's
 * original plugin.
*/

/*~struct~DmgPop:
 * 
 * @param stat
 * @text Stat Name
 * @desc Enter the name of the stat exactly as it appears in the
 * corresponding parameter/json entry.
 * @type string
 * 
 * @param damage
 * @text Damage Popup
 * @desc This defines the popup for taking damage to this stat.
 * @type struct<popup>
 * @default {"text":"%1","font":"this.standardFontFace()","size":"this.standardFontSize()","color":"#000000","roll":"false","delay":"0","x":"0","y":"0","list":"[\"pop high\",\"fall high\",\"pop low\",\"fall low\",\"wait\",\"wait\"]"}
 * 
 * @param recovery
 * @text Recovery Popup
 * @desc This defines the popup for recovering this stat.
 * @type struct<popup>
 * @default {"text":"%1","font":"this.standardFontFace()","size":"this.standardFontSize()","color":"#000000","roll":"false","delay":"0","x":"0","y":"0","list":"[\"zoom\",\"move up\",\"move up\",\"move up\",\"move up\"]"}
*/

/*~struct~popup:
 * 
 * @param text
 * @text Display Text
 * @desc Text display for Popup. (Leave blank for no text)
 * %1 = Damage/Recovery value.
 * @type string
 * 
 * @param font
 * @text Font
 * @desc Text font name.
 * Default: this.standardFontFace() (allows script code)
 * @type string
 * 
 * @param size
 * @text Font Size
 * @desc Text font size.
 * Default: this.standardFontSize() (allows script code)
 * @type string
 * 
 * @param color
 * @text Font Color
 * @desc Font color.
 * Default: #000000 (allows script code)
 * @type string
 * 
 * @param roll
 * @text Digit Roll
 * @desc Roulette effect for digits.
 * true - ON     false - OFF
 * @type boolean
 * @on ON
 * @off OFF
 * 
 * @param delay
 * @text Digit Delay
 * @desc Delay for each digit display.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * 
 * @param x
 * @text Offset X
 * @desc Popup display offset X.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * 
 * @param y
 * @text Offset Y
 * @desc Popup display offset Y.
 * Default: 0 (Numeric, can be negative)
 * @type number
 * @min -999
 * 
 * @param list
 * @text Motion
 * @desc Motion for the popup.
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
*/

if (Imported.sMS_MoreSkillCurrencies && Imported['VE - Damge Popup'] !== undefined) {

Imported.sMS_MSC_DmgPop_Ext = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MSC_DmgPop = superMasterSword.MSC_DmgPop || {};

(function($) {
	//=========================================================================
	// Setting up Stats
	//=========================================================================
	if (!$.MSC.json) {
		$.MSC_DmgPop.params = PluginManager.parameters('sMS_MSC_VE_DmgPop_Ext');
		var popupList = JSON.parse($.MSC_DmgPop.params.popups);
		for (var i = 0; i < popupList.length; i++) {
			popupList[i] = JSON.parse(popupList[i]);
			if (!$sMSskillStats[popupList[i].stat]) continue;
			var popups = {};
			popups.damage = JSON.parse(popupList[i].damage);
			popups.recovery = JSON.parse(popupList[i].recovery);
			var types = ['damage', 'recovery'];
			for (var j = 0; j < types.length; j++) {
				popups[types[j].roll = eval(popups[types[j]].roll);
				popups[types[j]].delay = parseInt(popups[types[j]].delay);
				popups[types[j]].x = parseInt(popups[types[j]].x);
				popups[types[j]].y = parseInt(popups[types[j]].y);
				popups[types[j]].list = JSON.parse(popups[types[j]].list);
			}
			$sMSskillStats[popupList[i].stat].popups = popups;
		}
	}
	
	//=========================================================================
	// superMasterSword
	//=========================================================================
	
	$.MSC_DmgPop.defineSkillStats = $.defineSkillStats;
	$.defineSkillStats = function() {
		$.MSC_DmgPop.defineSkillStats.call(this);
		$.forEachMSCstat($.defineSkillStatPopups);
	};
	
	$.defineSkillStatPopups = function(stat) {
		if ($sMSskillStats[stat].popups) {
			VictorEngine.DamgePopup.popup[stat + ' Damage'] =
				$sMSskillStats[stat].popups.damage;
			VictorEngine.DamgePopup.popup[stat + ' Recover'] =
				$sMSskillStats[stat].popups.recovery;
		}
	};
	
	//=========================================================================
	// Sprite_Battler
	//=========================================================================
	
	$.MSC_DmgPop.SpriteBattler_setupDamagePopupSprites = Sprite_Battler.prototype.setupDamagePopupSprites;
	Sprite_Battler.prototype.setupDamagePopupSprites = function() {
		var result = this._battler.result();
		$.forEachMSCstat(this.MSCDamagePopup, this, result);
		$.MSC_DmgPop.SpriteBattler_setupDamagePopupSprites.call(this);
	};
	
	Sprite_Battler.prototype.MSCDamagePopup = function(stat, result) {
		if (result[stat + 'Affected']) {
			var damage = result[stat + 'Damage'];
			var type = damage < 0 ? stat + ' Recover' : stat + ' Damage';
			var value = {
				damage: damage
			};
			this.damagePopupSprite(type, value);
		}
	};
	
	//=========================================================================
	// Sprite_CustomDamage
	//=========================================================================
	
	$.MSC_DmgPop.SpriteCustomDmg_dmgDigits = Sprite_CustomDamage.prototype.damageDigits;
	Sprite_CustomDamage.prototype.damageDigits = function(type) {
		if ($.MSC_DmgPop.SpriteCustomDmg_dmgDigits.call(this, type)) return true;
		var dmgIndex = type.indexOf(' Damage');
		var recIndex = type.indexOf(' Recover');
		if (dmgIndex > -1) {
			var stat = type.substring(0, dmgIndex);
			return !!$sMSskillStats[stat];
		else if (recIndex > -1) {
			var stat = type.substring(0, recIndex);
			return !!$sMSskillStats[stat];
		} else {
			return false;
		}
	};
	
})(superMasterSword);

}