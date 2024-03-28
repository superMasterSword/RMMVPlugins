//=============================================================================
// sMS_YEP_ItemCore_Ext.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};

/*:
 * @plugindesc v1.0 Changes Item Scene to look more like context (right-click)
 * menus
 * @author superMasterSword
 * 
 * @param itemListCols
 * @text Item List Columns
 * @desc Change how many columns the item list window has.
 * @type number
 * @min 1
 * @default 1
 * 
 * @param xIndent
 * @text Window X Indent
 * @desc Set how much to the right each sub-window is shifted.
 * @type number
 * @default 9
 * 
 * @param fullItems
 * @text Show Max Items?
 * @desc If the window's height exceeds space between item and
 * border, should the window be moved or become scrollable?
 * @type boolean
 * @on Move Window
 * @off Become Scrollable
 * @default true
 * 
 * @help Changes Yanfly's Item Core's sub-windows (the windows that pop up after
 * selecting an item or options added with extension plugins) to look more like
 * dropdown menus, specifically, the Windows menu when you right-click (called
 * the context menu)
 * 
 * Also lets you change the number of columns the item list has.
 * 
 * This plugin tries to make the sub-window appear below or above the option
 * that caused the window to appear, and will not overlap with the help or info
 * windows (info window is to the right of the item list). If the Show Max Items
 * parameter is set to true/Move Window and there are too many items, the window
 * will overlap with the previous option. Otherwise the window will appear
 * wherever there is more space and will be scrollable.
 * (If there are more items than can fit on screen and Show Max Items is enabled
 * the window will be scrollable and be as tall as possible)
 * 
 * 
 * Compatibility
 * 
 * Place directly below Yanfly's Item Core and any extensions.
 * 
 * 
 * Changelog
 * 
 * 1.0 - Created plugin.
*/

if (Imported.YEP_ItemCore && Yanfly.Param.ItemSceneItem) {

Imported.sMS_YEP_ItemCore_Ext = true;

var superMasterSword = superMasterSword || {};
superMasterSword.YEP_IE = superMasterSword.YEP_IE || {};

(function($) {

$.YEP_IE.params = PluginManager.parameters('sMS_YEP_ItemCore_Ext');
$.YEP_IE.itemListCols = parseInt($.YEP_IE.params.itemListCols);
$.YEP_IE.xIndent = parseInt($.YEP_IE.params.xIndent);
$.YEP_IE.fullItems = eval($.YEP_IE.params.fullItems);

//=============================================================================
// Window_ItemList
//=============================================================================

$.YEP_IE.WindowItemList_maxCols = Window_ItemList.prototype.maxCols;
Window_ItemList.prototype.maxCols = function() {
	if (SceneManager._scene instanceof Scene_Item &&
	this.constructor === Window_ItemList) {
		return $.YEP_IE.itemListCols;
	}
	return $.YEP_IE.WindowItemList_maxCols.call(this);
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

$.YEP_IE.WinItemActionCmd_setItem = Window_ItemActionCommand.prototype.setItem;
Window_ItemActionCommand.prototype.setItem = function(item) {
	this._windowHeight = undefined;
	$.YEP_IE.WinItemActionCmd_setItem.call(this, item);
};

Window_ItemActionCommand.prototype.windowHeight = function() {
	if (this._windowHeight) return this._windowHeight;
	return Window_Command.prototype.windowHeight.call(this);
};

//=============================================================================
// Scene_Item
//=============================================================================

Scene_Item.prototype.calcItemWinOffset = function(subWin, parentWin, itemIndex) {
	var outer = this.subWinBounds();
	var itemRect = parentWin.itemRect(itemIndex);
	this.convertToRealCoords(itemRect, parentWin);
	var winRect = new Rectangle();
	winRect.x = itemRect.x + $.YEP_IE.xIndent;
	winRect.width = outer.width - (winRect.x - outer.x);
	
	if (subWin instanceof Window_Command) {
		winRect.height = subWin.windowHeight();
	} else {
		var rows = Math.ceil(subWin.maxItems() / subWin.maxCols());
		winRect.height = subWin.fittingHeight(rows);
	}
	
	// Normally move window but window height exceeds maximum
	if ($.YEP_IE.fullItems && winRect.height > outer.height) {
		var tempHeight = outer.height - subWin.standardPadding() * 2;
		var rows = Math.floor(tempHeight / subWin.lineHeight());
		winRect.height = subWin.fittingHeight(rows);
	}
	
	var aboveHeight = itemRect.y - outer.y;
	var belowHeight = (outer.y + outer.height);
	belowHeight -= (itemRect.y + itemRect.height);
	if (belowHeight >= winRect.height) {
		winRect.y = itemRect.y + itemRect.height;
	} else if (aboveHeight >= winRect.height) {
		winRect.y = itemRect.y - winRect.height;
	} else if ($.YEP_IE.fullItems) { // Adjust window to show all items
		winRect.y = (outer.y + outer.height) - winRect.height;
	} else { // Move window wherever there's more room
		if (belowHeight >= aboveHeight) {
			var tempHeight = belowHeight - subWin.standardPadding() * 2;
			rows = Math.floor(tempHeight / subWin.lineHeight());
			winRect.height = subWin.fittingHeight(rows);
			winRect.y = itemRect.y + itemRect.height;
		} else {
			var tempHeight = aboveHeight - subWin.standardPadding() * 2;
			rows = Math.floor(tempHeight / subWin.lineHeight());
			winRect.height = subWin.fittingHeight(rows);
			winRect.y = itemRect.y - winRect.height;
		}
	}
	return winRect;
};

/* This is the absolute limit any of our sub windows can ever go, by default
   this prevents it from covering the help window or the info window (to the
   right of the item list). I would recommend not covering the help window,
   since sub windows tend to update it, but if you want to change the outer
   boundaries, change or overwrite this function */
Scene_Item.prototype.subWinBounds = function() {
	var rect = new Rectangle();
	rect.x = this._itemWindow.x;
	rect.width = this._itemWindow.width;
	
	rect.y = this._helpWindow.y + this._helpWindow.height;
	rect.height = Graphics.boxHeight - rect.y;
	
	return rect;
};

/* Item Rectangles are relative to their window. But we need global
   coordinates */
Scene_Item.prototype.convertToRealCoords = function(rect, win) {
	rect.x += win.x + win.standardPadding();
	rect.y += win.y + win.standardPadding();
};

$.YEP_IE.SceneItem_onItemOk = Scene_Item.prototype.onItemOk;
Scene_Item.prototype.onItemOk = function() {
	$.YEP_IE.SceneItem_onItemOk.call(this);
	var rect = this.calcItemWinOffset(this._itemActionWindow, this._itemWindow,
		this._itemWindow.index());
	this._itemActionWindow._windowHeight = rect.height;
	this._itemActionWindow.move(rect.x, rect.y, rect.width, rect.height);
	this._itemActionWindow.refresh();
};

if (Imported.YEP_X_AttachAugments) {
	Scene_Item.prototype.onActionAugment = function() {
		this._itemActionWindow.deactivate();
		this._augmentListWindow.show();
		this._augmentListWindow.activate();
		var slotId = this._itemActionWindow.currentExt();
		this._augmentListWindow.setItem(this.item(), slotId);
		
		var rect = this.calcItemWinOffset(this._augmentListWindow,
			this._itemActionWindow, this._itemActionWindow.index());
		this._augmentListWindow.move(rect.x, rect.y, rect.width, rect.height);
		this._augmentListWindow.refresh();
	};
}

if (Imported.YEP_X_ItemDisassemble) {
	Scene_Item.prototype.onActionDisassemble = function() {
		this._itemActionWindow.deactivate();
		this._disassemblerListWindow.show();
		this._disassemblerListWindow.activate();
		this._disassemblerListWindow.setItem(this.item());
		this._disassemblerListWindow.select(0);
		this._disassemblerListWindow.updatePool();
		this._disassemblePoolWindow.refresh();
		
		var rect = this.calcItemWinOffset(this._disassemblerListWindow,
			this._itemActionWindow, this._itemActionWindow.index());
		this._disassemblerListWindow.move(rect.x, rect.y, rect.width,
			rect.height);
		this._disassemblerListWindow.refresh();
	};
}

if (Imported.YEP_X_ItemDurability) {
	Scene_Item.prototype.onActionRepair = function() {
		this._itemActionWindow.deactivate();
		this._repairListWindow.show();
		this._repairListWindow.activate();
		this._repairListWindow.setItem(this.item());
		
		var rect = this.calcItemWinOffset(this._repairListWindow,
			this._itemActionWindow, this._itemActionWindow.index());
		this._repairListWindow.move(rect.x, rect.y, rect.width, rect.height);
		this._repairListWindow.refresh();
	};
}

if (Imported.YEP_X_ItemUpgrades) {
	Scene_Item.prototype.onActionUpgrade = function() {
		this._itemActionWindow.deactivate();
		this._upgradeListWindow.show();
		this._upgradeListWindow.activate();
		this._upgradeItem = this.item();
		this._upgradeListWindow.setItem(this.item());
		
		var rect = this.calcItemWinOffset(this._upgradeListWindow,
			this._itemActionWindow, this._itemActionWindow.index());
		this._upgradeListWindow.move(rect.x, rect.y, rect.width,
			rect.height);
		this._upgradeListWindow.refresh();
	};
}

})(superMasterSword);

}