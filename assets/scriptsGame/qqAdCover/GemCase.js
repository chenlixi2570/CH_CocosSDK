/*
 * @Description: 宝箱误触
 */
let Cls_BasePopup = require("base_popup");
let qqAdvMgr = require('qq_adv_mgr').getInstance();
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      prog: cc.ProgressBar,
      nBtn: cc.Node,
      clickArea: cc.Node,
      hasAward: cc.Node,
      notAward: cc.Node,
      nHand: cc.Node,
      _dTm: 0,
      _minusProg: false, // 能否减进度条
      _isShowAdv: false, // 是否显示广告盒子
      _showAdvCount: 0, // 显示广告盒子次数，前5点有奖励，之后没有了
      _moveStop: true,
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'boxBtnArea', this.onFastClick);
      this.handMove();
      this.listenerEv();
   },

   onEnable() {
      if (this.prog) {
         this.prog.progress = 0;
      }
      this._minusProg = false;
      this._isShowAdv = false;
      this.clickArea.active = true;
      this.hasAward.active = false;
      this.notAward.active = false;
      this.showAdvTime = 0;
   },
   update(dt) {
      // this.delayFinish(dt);
      this._dTm += dt;
      if (this._dTm < 0.1) return;
      this._dTm = 0;
      this.minusProgress();
   },

   delayFinish(dt) {
      if (this._isShowAdv) {
         this.showAdvTime += dt;
         if (this.showAdvTime >= 3) {
            this.showAdvTime = 0;
            this._isShowAdv = false;
            this.onClickAdvFinish();
         }
      }
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
      G_UIManager.hideUI('GemCase');
   },
   onFastClick() {
      if (this._moveStop) {
         this._moveStop = false;
         this.clickMove();
      }
      if (!this.prog || this._isShowAdv) return;
      this.prog.progress += 0.12;
      this.canShowAdv();
   },
   // 广告显示成功之后按钮
   onClickAdvFinish() {
      // 有奖励
      if (this.hasAward.active) {
         G_chInfo.plusGem(5);
         G_UIManager.showUI('showToast', '恭喜获得5个钻石');
      }
      this.onClose();
   },
   listenerEv() {
      this.nBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
         this._minusProg = false;
      }, this);

      this.nBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
         this._minusProg = true;
      }, this);
   },
   // 能否显示广告盒子
   canShowAdv() {
      if (this.prog.progress > 0.9) {
         this._isShowAdv = true;
         this._showAdvCount += 1;
         this.clickArea.active = false;
         qqAdvMgr.showBoxAd(() => {
            this.onClose();
         });
         console.log('显示领取钻石界面');
         return;
         if (this._showAdvCount <= 5) {
            console.log('小于5次有钻石');
            this.hasAward.active = true;
         }
         else {
            console.log('大于5次不再有钻石');
            this.notAward.active = true;
         }
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
         cc.game.once(cc.game.EVENT_SHOW, cb, call_target);
      });
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

   clickMove() {
      if (!this.nBtn) return;
      this.nBtn.stopAllActions();
      this.nBtn.runAction(
         cc.sequence(
            cc.scaleTo(0.1, 0.85),
            cc.scaleTo(0.1, 1),
            cc.callFunc(() => {
               this._moveStop = true;
            })
         )
      );
   },
});
