/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");

cc.Class({
   extends: Cls_BasePopup,

   properties: {
      _canClose: false,
      _isFirst: true, // 是否第一次点击
   },
   onLoad() {
      G_chSdk.registerBtnClick(this, 'close', this.onCloseFullAdv);
   },
   onEnable() {
      this._canClose = false;
      this._isFirst = true;
      // 不是微信平台或测试条件下直接关闭
      if (G_Const.IssuePlat !== 'wx') {
         this._canClose = true;
         this.onCloseFullAdv();
      }
      else {
         G_Strategy.doAdvMgr('canShowBtn', isShow => {
            this._canClose = !isShow;
            // console.log('==是否显示按钮误触', this._canClose, isShow);
         });
      }
   },
   onShowFinished(scene) {
      console.log('==哪个场景打开了全屏广告', scene);
   },
   onCloseFullAdv() {
      if (this._canClose) {
         G_UIManager.hideUI('fullAdvB');
      } else if (this._isFirst) {
         this._isFirst = false;
         this.scheduleOnce(() => {
            G_Strategy.doAdvMgr(
               'showBtnBanner',
               status => {
                  if (status) {
                     // 按钮点击显示banner成功
                     console.log('按钮点击显示banner成功');
                     this.advShowSucc();
                  }
                  else {
                     // 按钮点击显示banner失败
                     this.advShowFail();
                  }
               });
         }, 1);
      }
   },
   advShowSucc() {
      this.scheduleOnce(() => {
         this._canClose = true;
         G_Strategy.doAdvMgr('hideBanner');
      }, 1);
   },
   advShowFail() {
      this._canClose = true;
      return;
      G_Strategy.doAdvMgr('isShowBtn', isShow => {
         if (isShow) {
            this.scheduleOnce(() => {
               this._canClose = true;
            }, 1);
         } else {
            this._canClose = true;
         }
      });
   }
});
