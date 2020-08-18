/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
let qqAdvMgr = require('qq_adv_mgr').getInstance();
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      nGun: cc.Node,
      prog: cc.ProgressBar,
      nHand: cc.Node,
      _moveStop: true,
      _dTm: 0,
      _minusProg: false, // 能否减进度条
      _isShowAdv: false, // 是否显示广告盒子
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'clickBtn', this.onClick);
      this.handMove();
   },
   onEnable() {
      if (this.prog) {
         this.prog.progress = 0;
      }
      this._minusProg = true;
      this._isShowAdv = false;
   },

   update(dt) {
      this._dTm += dt;
      if (this._dTm < 0.1) return;
      this._dTm = 0;
      this.minusProgress();
   },
   onShowFinished() {
      console.log('==QQ快速点击界面');
   },

   minusProgress() {
      if (!this.prog) return;
      if (!this._isShowAdv && this._minusProg && this.prog.progress > 0) {
         this.prog.progress -= 0.005;
         if (this.prog.progress < 0) {
            this.prog.progress = 0;
         }
      }
   },
   onClose() {
      qqAdvMgr.hideBanner();
      G_UIManager.hideUI('fastClick');
   },

   onClick() {
      if (this._moveStop) {
         this._moveStop = false;
         this.clickMove();
      }
      if (!this.prog || this._isShowAdv) return;
      this.prog.progress += 0.12;
      this.canShowAdv();
   },
   // 能否显示banner广告
   canShowAdv() {
      if (this.prog.progress > 0.7) {
         // 开始显示广告
         this._isShowAdv = true;
         qqAdvMgr._showOnceBanner(() => {
            qqAdvMgr.saveCount('clickCount', 1);
         });
         this.scheduleOnce(() => {
            this.onClose();
         }, 1.5);
      }
   },
   /**
   * 应用切后台之后返回触发
   * 本方法使用的是只触发一次接口，可以多次注册
   * @param {function} cb 
   * @param  {function} call_target 回调函数调用域
   */
   onHideAfterShow(cb, call_target) {
      cc.game.once(cc.game.EVENT_HIDE, () => {
         console.log('==监听到看广告切后台');
         this._isClickAd = true;
         cc.game.once(cc.game.EVENT_SHOW, cb, call_target);
      });
   },

   clickMove() {
      if (!this.nGun) return;
      this.nGun.stopAllActions();
      this.nGun.runAction(
         cc.sequence(
            cc.scaleTo(0.1, 0.85),
            cc.scaleTo(0.1, 1),
            cc.callFunc(() => {
               this._moveStop = true;
            })
         )
      );
   },

   // 手动画
   handMove() {
      if (!this.nHand) return;

      this.nHand.stopAllActions();
      this.nHand.runAction(
         cc.repeatForever(
            cc.sequence(
               cc.spawn(
                  cc.moveBy(0.35, -40, 30),
                  cc.scaleTo(0.35, 0.65)
               ),
               cc.delayTime(0.2),
               cc.spawn(
                  cc.moveBy(0.35, 40, -30),
                  cc.scaleTo(0.35, 1)
               ),
               cc.delayTime(0.8)
            )
         )
      );
   },
});
