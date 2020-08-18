let TimeDown = cc.Class({
   extends: cc.Component,

   properties: {
      timeOutCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '倒计时到达时的回调'
      },
      tdSprite: cc.Sprite,
      timeLab: cc.Label,
   },

   onLoad() {
      this.totalTime = 10;
      this.isPluse = true;
   },
   onEnable() {
      this.tdSprite.fillRange = 0;
      this.secTime = this.totalTime;
      this.cTime = 0;

      this.setSecTime();
      this.timedownMove();
   },
   update(dt) {
      if (this.isPluse) return;
      this._updateFillRange(this.tdSprite, 1, dt);
      this.timedownTime(dt);
   },
   // 刷新倒计时数字
   setSecTime() {
      if (!this.timeLab) return;
      this.timeLab.string = this.secTime;
   },
   // 圆环动画
   timedownMove() {
      // this._updateFillRange(this.tdSprite, 1, dt);
      this.isPluse = false;
   },
   // 一秒执行一次，为0时倒计时结束，跳转到游戏结果页
   timedownTime(dt) {
      this.cTime += dt;
      if (this.cTime < 1) return;
      this.cTime = 0;

      this.secTime -= 1;
      this.setSecTime();
   },
   // 暂停倒计时
   pluseTime() {
      this.isPluse = true;
   },
   // 继续倒计时
   continueTime() {
      this.isPluse = false;
   },
   _updateFillRange(sprite, range, dt) {
      var fillRange = sprite.fillRange;
      fillRange -= dt / this.totalTime;
      if (fillRange <= -1) {
         fillRange = -1;
         this.isPluse = true;
         this.timeOutCB.forEach(item => {
            item instanceof cc.Component.EventHandler && item.emit();
         });
      }
      sprite.fillRange = fillRange;
   }
   // 




});
