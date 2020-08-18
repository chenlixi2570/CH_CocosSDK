let RecordMgr = require('tt_record').getInstance();
let SkinTTGiveUp = require('skinTTGiveUp');
let TTShareVideo = cc.Class({
   extends: cc.Component,
   properties: {
      _isAuto: true,
      _first: 0,
      toggIcon: cc.Node,
      autoShare: cc.Node,
      cTTSkin: {
         default: null,
         type: SkinTTGiveUp
      },
      cTTSkin1: {
         default: null,
         type: SkinTTGiveUp
      },
   },
   shareSucc() {
      if (!this.cTTSkin || !this.cTTSkin1) return;
      let isSkin = this.cTTSkin && this.cTTSkin._isSkin;
      let skinId = this.cTTSkin && this.cTTSkin._skinId;
      if (isSkin && Number.isInteger(skinId) && skinId !== -1) {
         G_chInfo.setUnlockSkin(skinId);
         G_UIManager.showUI('skinUnlock', () => {
            G_chInfo.setCurrSkin(skinId);
            this.cTTSkin && this.cTTSkin.updateInfo();
            this.cTTSkin1 && this.cTTSkin1.updateInfo();
         }, skinId);
      }
      else {
         let coinCount = +G_chInfo.getCfgByKey('SHARE_COIN');
         if (G_chSdk.isNumber(coinCount)) {
            G_chInfo.plusCoin(coinCount);
            let str = '恭喜获得' + coinCount + '金币';
            G_UIManager.showUI('showToast', str);
         }
      }
   },
   onEnable() {
      return;
      let isSwitch = G_chInfo.getCfgByKey('switch_auto');
      if (isSwitch != '1' || G_Const.IssuePlat !== 'tt') {
         // 后端关闭自动分享
         this._isAuto = false;
         this.hideThatNode(this.autoShare);
      }
      else {
         this.toggleIcon();
      }
      this._first = 0;
   },
   toggleAutoNode(isShow) {
      if (G_Const.IssuePlat !== 'tt') return;
      let isSwitch = G_chInfo.getCfgByKey('switch_auto');
      if (isShow && isSwitch == '1') {
         this.showThatNode(this.autoShare);
      }
      else {
         this.hideThatNode(this.autoShare);
      }
   },
   doShare() {
      // 游戏是否为音乐正常播放完成后结束的
      console.log('是否自动分享', this._first, this._isAuto);
      if (this._isAuto && this._first === 0) {
         this._first += 1;
         this.onShare();
         return true;
      }
      return false;
   },
   onShare() {
      RecordMgr.share(() => {
         // 分享成功
         this.shareSucc();
      });
   },
   toggleAuto() {
      this._isAuto = !this._isAuto;
      this.toggleIcon();
   },
   toggleIcon() {
      if (this._isAuto) {
         this.showThatNode(this.toggIcon);
      }
      else {
         this.hideThatNode(this.toggIcon);
      }
   },
   showThatNode(node) {
      if (node instanceof cc.Node && !node.active) {
         node.active = true;
      }
   },
   hideThatNode(node) {
      if (node instanceof cc.Node && node.active) {
         node.active = false;
      }
   },
});