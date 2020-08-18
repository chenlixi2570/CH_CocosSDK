let { FreeGetWay, ShareScene } = require('global_const');
let FreeGetMgr = require('free_get_mgr').getInstance();

cc.Class({
   extends: cc.Component,

   properties: {
      succCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '视频广告任务成功回调'
      },
      failCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '视频广告任务失败回调'
      },
      clickCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '点击按钮立即执行,不需要等待广告类型明确的回调'
      },
      notAdvCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '没有广告或分享时调用'
      },
      videoIcon: cc.SpriteFrame,
      shareIcon: cc.SpriteFrame,
      statuSprite: cc.Sprite,
      _clickLock: false, // 连续点击锁
   },
   editor: CC_EDITOR && {
      requireComponent: cc.Button,
   },
   onLoad() {
      this.advType = '';
      this.add_click();
   },
   onEnable() {
      this.getAdvStatus();
   },
   add_click() {
      this.node.on('click', this.loadVideoAdv, this);
   },
   getAdvStatus() {
      if (G_chInfo.isShowAdvOfVIVO()) {
         this.node.active = false;
         return;
      }
      FreeGetMgr.getNextFreeGetWay((status) => {
         // console.log('==广告任务类型', status);
         this.advType = status;
         if (status === FreeGetWay.FGW_NONE) { // 无机会
            this.notAdvCB.forEach(item => {
               item.emit();
            });
            this.node.active = false; // 隐藏按钮
         } else if (status === FreeGetWay.FGW_ADV) { // 广告
            this.toggleStatusIcon(true);
         } else if (status === FreeGetWay.FGW_SHARE) { // 分享
            this.toggleStatusIcon(false);
         }
      });
   },
   // 点击回调
   loadVideoAdv() {
      if (this._clickLock) {
         G_UIManager.showUI('showToast', '加载中，请勿重复点击！');
         return;
      }
      this._clickLock = true;

      this.clickCB.forEach(item => {
         item.emit();
      });
      if (this.advType === FreeGetWay.FGW_ADV) { // 广告
         G_Strategy.doAdvMgr('createVideoAdv', statu => {
            // G_Strategy.doPlatform('视频播放状态', statu);
            if (statu) {
               this.succCB.forEach(item => {
                  item.emit();
               });
            } else {
               G_UIManager.showUI('showToast', '观看完整视频才有奖励哦！');
               this.failCB.forEach(item => {
                  item.emit();
               });
            }
            this._clickLock = false;
         }, () => {
            // 视频加载出错
            this.failToast();
            this.failCB.forEach(item => {
               item.emit();
            });
            this._clickLock = false;
         });
      } else if (this.advType === FreeGetWay.FGW_SHARE) { // 分享
         G_Strategy.doAdvMgr(
            'share',
            ShareScene.SS_SYSTEM_MENU,
            null,
            true,
            (statu) => {
               // console.log('==分享状态', statu);
               if (statu) {
                  this.succCB.forEach(item => {
                     item.emit();
                  });
               } else {
                  this.failCB.forEach(item => {
                     item.emit();
                  });
               }
            });
         this._clickLock = false;
      } else {
         this._clickLock = false;
      }
   },

   failToast() {
      G_UIManager.showUI('showToast', '视频未加载成功，请稍后再次尝试！');
   },
   // 切换状态图标
   toggleStatusIcon(isVideo) {
      if (!this.statuSprite) return;
      if (isVideo) {
         this.statuSprite.spriteFrame = this.videoIcon;
      } else {
         this.statuSprite.spriteFrame = this.shareIcon;
      }
   }
});