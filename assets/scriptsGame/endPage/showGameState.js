// 根据游戏完成成功与否更换标题

let ToggleTit = cc.Class({
   extends: cc.Component,
   properties: {
      succTit: cc.SpriteFrame,
      failTit: cc.SpriteFrame,
      cSprite: cc.Sprite
   },
   onEnable() {
      this.toggleFrame();
   },
   /**
    * 根据游戏流程中状态来确定应该显示成功还是失败的图标
    * 需要在进入页面时更新流程控制中的状态
    */
   toggleFrame() {
      if (
         !this.succTit ||
         !this.failTit ||
         !this.cSprite
      ) return;

      if (G_GameFlow.isGameFail()) {
         this.cSprite.spriteFrame = this.failTit;
      } else if (G_GameFlow.isGameSuccess()) {
         this.cSprite.spriteFrame = this.succTit;
      }

   }
});