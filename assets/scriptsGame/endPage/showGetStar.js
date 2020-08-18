let ShowGetStar = cc.Class({
   extends: cc.Component,
   properties: {},
   /**
    * 显示获得的星星数，要有动画
    * 参数为得到的星星数，0 为第一个
    */
   showStar(starCount) {
      this.node.children.forEach((item, i) => {
         let nStarGet = G_chSdk.seekNodeByName(item, 'starGet');
         if (nStarGet instanceof cc.Node) {
            nStarGet.active = false;
            if (i <= starCount) {
               this.scheduleOnce(() => {
                  nStarGet.active = true;
                  this.moveRun(nStarGet);
               }, 0.25 * (i + 1));
            }
         }
      });
   },
   moveRun(nStarGet) {
      nStarGet.stopAllActions();
      nStarGet.runAction(
         cc.sequence(
            cc.scaleTo(0.1, 1.5),
            cc.scaleTo(0.3, 0.8),
            cc.scaleTo(0.1, 1.1),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.1, 1)
         )
      );
   }
});