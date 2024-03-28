//=============================================================================
// ChangeGraphic_YEP_APS_Patch.js
//=============================================================================

/*:
 * @plugindesc A simple patch that might also be useful for other 
 * incompatibilities.
 * @author superMasterSword
 * 
 * @help Why are you reading this? There's nothing you need to do. Just plug
 * and enjoy crash free auto-changing images.
*/

Game_BattlerBase.prototype.refresh = function() {
    this.stateResistSet().forEach(function(stateId) {
        if (this.isStateAffected(stateId)) {
			this.eraseState(stateId);
		}
    }, this);
    this._hp = this._hp.clamp(0, this.mhp);
    this._mp = this._mp.clamp(0, this.mmp);
    this._tp = this._tp.clamp(0, this.maxTp());
};