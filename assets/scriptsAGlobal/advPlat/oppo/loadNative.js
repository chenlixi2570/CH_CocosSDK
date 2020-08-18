// 加载oppo 原生广告
cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      // console.log('==准备oppo原生广告数据');
      if (cc.sys.platform === cc.sys.OPPO_GAME) {
         
         G_Strategy.doAdvMgr('destroyNative');
         G_Strategy.doAdvMgr('naOnLoad');
      }
   }
});