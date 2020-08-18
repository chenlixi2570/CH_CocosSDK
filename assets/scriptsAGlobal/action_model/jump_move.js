let MoveType = cc.Enum({
   jumpMove: 0, // 跳动
   delayShow: 1, // 延迟显示
   pulse: 2,  // 呼吸动作
   flow: 3, // 多图片切换动作
   shake: 4, // 左右抖动
   rotate: 5, // 旋转
});

cc.Class({
   extends: cc.Component,

   properties: {
      moveType: {
         default: MoveType.jumpMove,
         type: MoveType,
         tooltip: 'jumpMove: 跳动，delayShow: 延迟显示，pulse: 呼吸动作，flow: 多图片切换'
      },
      flowFrame: {
         default: [],
         type: cc.SpriteFrame
      },
      flowSpeed: {
         default: 0.4,
         tooltip: '多图片切换时两个图片间隔时间'
      }
   },

   onEnable() {
      switch (this.moveType) {
         case MoveType.delayShow:
            this.delayShowRun();
            break;
         case MoveType.pulse:
            this._runPulseAction();
            break;
      }
   },
   onDisable() {
      switch (this.moveType) {
         case MoveType.delayShow:
            this.node.opacity = 0;
            break;
         case MoveType.pulse:
            this._removePulseAction();
            break;
      }
   },
   onLoad() {
      switch (this.moveType) {
         case MoveType.jumpMove:
            this.jumpInit();
            break;
         case MoveType.flow:
            this.flowInit();
            break;
         case MoveType.shake:
            this.shakeInit();
            break;
      }
   },
   update(dt) {
      switch (this.moveType) {
         case MoveType.jumpMove:
            this.jumpRun(dt);
            break;
         case MoveType.flow:
            this.flowRun(dt);
            break;
         case MoveType.rotate:
            this.rotateRun(dt);
            break;
      }
   },
   // 跳动动画
   jumpInit() {
      this.initSpeed = 1.5;
      this.originY = this.node.y;
      this.speed = this.initSpeed;
   },
   jumpRun(dt) {
      this.speed -= dt * 1.8;
      this.node.y += this.speed;
      if (this.node.y < this.originY) {
         this.speed = this.initSpeed;
      }
   },
   // 多图片切换
   flowInit() {
      this.frameIndex = 0;
      this.frameLen = this.flowFrame.length;
      this.frameDelay = this.flowSpeed; // 多长时间更换一次图片
      this.frameNow = 0;
      this.spriteNode = this.node.getComponent(cc.Sprite);
      this.flowSetFrame();
   },
   flowRun(dt) {
      this.frameNow += dt;
      if (this.frameNow < this.frameDelay) return;
      this.frameNow = 0;
      this.frameIndex += 1;
      this.frameIndex %= this.frameLen;
      this.flowSetFrame();
   },
   flowSetFrame() {
      if (!(this.spriteNode instanceof cc.Sprite) || this.frameLen == 0) return;
      this.spriteNode.spriteFrame = this.flowFrame[this.frameIndex];

   },
   // 延迟显示
   delayShowRun() {
      let dTime = 2;
      this.node.stopAllActions();
      this.node.opacity = 0;
      this.node.runAction(
         cc.sequence(
            cc.delayTime(dTime),
            cc.fadeIn(0.4)
         )
      );
   },
   // 呼吸动效
   _runPulseAction() {
      this.scheduleOnce(() => {
         this.node.stopAllActions();
         this.node.runAction(
            cc.repeatForever(
               cc.sequence(
                  cc.scaleTo(0.5, 1.1),
                  cc.scaleTo(0.5, 1),
                  cc.delayTime(0.1)
               )
            )
         );
      }, 0.8);
   },
   // 删除呼吸动效
   _removePulseAction() {
      this.node.stopAllActions();
   },
   // 左右抖动
   shakeInit() {
      let time = 0.5;
      this.node.stopAllActions();
      this.node.runAction(
         cc.repeatForever(
            cc.sequence(
               cc.moveBy(time * 0.1, -10, 0),
               cc.moveBy(time * 0.1, 10, 0),
               cc.moveBy(time * 0.1, -9, 0),
               cc.moveBy(time * 0.1, 9, 0),
               cc.moveBy(time * 0.1, -8, 0),
               cc.moveBy(time * 0.1, 8, 0),
               cc.moveBy(time * 0.1, -7, 0),
               cc.moveBy(time * 0.1, 7, 0),
               cc.moveBy(time * 0.1, -6, 0),
               cc.moveBy(time * 0.1, 6, 0),
               cc.delayTime(0.1)
            )
         )
      );
   },
   // 旋转
   rotateRun(dt) {
      this.node.rotation += 0.5;
      this.node.rotation %= 360;
   }

});