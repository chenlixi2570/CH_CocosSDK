/*
 * @Description: 游戏入口
 */
let { PersistNodeTags } = require('global_const');
let SDK = require("init_sdk");

cc.Class({
   extends: cc.Component,

   properties: {
      _isServerCheckFinished: {
         default: false,
         visible: false
      },
      _serverCheckFinishedCb: {
         default: null,
         visible: false
      },
   },

   onLoad() {
      // 初始化SDK...
      SDK.init(() => {
         // 注册全局App节点
         G_chSdk.registerGlobalNode(
            PersistNodeTags.PNT_FOREVER,
            this.node
         );
         this._isServerCheckFinished = true;
         this._doServerCheckFinishedCb();
      });
      // 注册系统事件
      this._onGlobalEvent();
   },

   onDestroy() {
      // 注销全局App节点
      G_chSdk.unregisterGlobalNode(PersistNodeTags.PNT_FOREVER);
   },
   onServerCheckFinished(cb) {
      if (this._isServerCheckFinished) {
         typeof cb === 'function' && cb();
      } else {
         this._serverCheckFinishedCb = cb;
      }
   },

   _doServerCheckFinishedCb: function () {
      typeof this._serverCheckFinishedCb === "function" &&
         this._serverCheckFinishedCb();
   },
   // 监听全局事件
   _onGlobalEvent() {
      G_chSdk.addEventOnce(
         G_Const.EventName.GAME_INDEX, // 首页显示完成
         this.onIndexStart,
         this
      );
      G_chSdk.addEventOnce(
         'today_count_of_one',
         this.onFirstGameEnd,
         this
      );
   },
   // 首页显示完成逻辑
   onIndexStart() {
      /**
       * 尝试创建桌面图标
       * oppo 平台有效
       */
      G_Strategy.doPlatform('createShortcut'); 
      G_Strategy.doAdvMgr('init'); // 平台广告初始化
      /**
       * 启动体力底于上限时倒计时增加
       * global_const 文件中开启 hasPhysical 开关
       */
      require('phys_module').getInstance().init() 
      /**
       * 自动显示签到界面
       */
      // this.autoShowSign(); 
      
      // G_chSdk.open_rigid(); // 开启物理系统
      G_chSdk.open_collider(); // 开启碰撞系统

   },
   // 第一局游戏完成
   onFirstGameEnd() {
      G_Strategy.doPlatform('addColorSign');
   },
   // 自动显示签到界面
   autoShowSign() {
      // 看今天有没有签到，如无则弹出签到窗
      if (!G_chInfo.todayIsSign()) {
         G_UIManager.showUI("sign");
      }
   },
   

   /**** 未使用 ****/
   // 事件注册
   _onEventRegistered: function () {
      // body...
      // 系统错误（严重错误）事件
      G_chSdk.addEventListener(
         G_Const.EventName.EN_SYSTEM_ERROR,
         function () {
            G_Strategy.doPlatform('showModal', {
               title: '提示',
               content: '网络错误',
               showCancel: true,
               success(res) {
                  if (res.confirm) {
                     // do global clean
                     G_Scheduler.unscheduleAll();
                     G_chSdk.removeAllEventListerners();

                     // restart
                     G_chSdk.restartApp();
                  }
                  else {
                     // exit
                     G_chSdk.exitApp();
                  }
               },
            });
         });
   },

});
