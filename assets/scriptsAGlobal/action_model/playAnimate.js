// 帧动画节点
let withClip = require('animate_module')();

let PlayAnimate = cc.Class({
   extends: cc.Component,
   properties: {
      cSprite: cc.Sprite,
      cAnimate: cc.Animation,
      aniName: 'speedFF',
      _hasAni: false,
      _stopCb: null,
   },
   onLoad() {
      this.initAnimate();
   },
   initAnimate() {
      withClip.getClipByName(clip => {
         // console.log('获得帧动画', clip._name);
         if (clip instanceof cc.AnimationClip && this.cAnimate) {
            this.cAnimate.addClip(clip, this.aniName);
            this._hasAni = true;
            this.cAnimate.on('stop', () => {
               if (this.cSprite instanceof cc.Sprite) {
                  this.cSprite.spriteFrame = null;
               }
               typeof this._stopCb === 'function' && this._stopCb();
            }, this);
         }
      }, this.aniName);
   },
   playAni(cb) {
      this.cAnimate.play(this.aniName);
      this._stopCb = cb;
   },
   stopAni() {
      this.cAnimate.stop(this.aniName);
      if (this.cSprite instanceof cc.Sprite) {
         this.cSprite.spriteFrame = null;
      }
   }

});