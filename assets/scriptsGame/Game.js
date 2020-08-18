/*
 * @Description: 
 */
// 全局常驻节点标志
let { PersistNodeTags } = require('global_const');
let TestArea = require('gameTestArea');
let GameMove = require('moveParent');
cc.Class({
   extends: cc.Component,

   properties: {
      app: {
         default: null,
         visible: false,
      },
      UiRoot: cc.Node, // 各种弹出页面父级层
      pGameLoad: { // 加载进度条
         default: null,
         type: cc.Prefab,
      },
      moveParent: cc.Node,
      gameTest: {
         default: null,
         type: TestArea,
      },
      gameMove: {
         default: null,
         type: GameMove
      }
   },

   onLoad() {
      this.showGameLoad(); // 显示加载进度条 CHEN
      G_chSdk.registerMoveParent('moveParent', this.moveParent);
      window.G_GameTest = this.gameTest;
      window.G_GameMove = this.gameMove;

      // init ui
      this._initUI();
      // wait app inited
      this._tryToGetApp(() => {
         this.app &&
            this.app.onServerCheckFinished(
               () => {
                  // 此时登陆完成
                  this._onLogined();
               }
            );
      });
   },
   // 网络加载成功
   _onLogined() {
      // G_UIManager.preloadUI("Rank", function () {
      //    // body...
      //    console.log("preload all uis...");
      // });
   },

   onDestroy() {
      // unregister ui root
      G_UIManager.unregisterUIRoot();
   },

   _initUI: function () {
      // register ui root
      if (this.UiRoot instanceof cc.Node) {
         G_UIManager.registerUIRoot(this.UiRoot);
      }
   },

   _tryToGetApp: function (cb) {
      // body...
      let name = "Try_To_Get_App";
      if (!this.app) {
         G_Scheduler.schedule(name, () => {
            // body...
            let globalNode = G_chSdk.getGlobalNode(PersistNodeTags.PNT_FOREVER);
            if (globalNode) {
               this.app = globalNode.getComponent("App");

               if (this.app) {
                  typeof cb === "function" && cb();
                  G_Scheduler.unschedule(name);
               }
            }
         }, 0.2);
      }
      else {
         typeof cb === "function" && cb();
      }
   },
   //  显示加载进度条节点 CHEN
   showGameLoad() {
      if (!this.pGameLoad) return;
      let nGameLoad = cc.instantiate(this.pGameLoad);
      nGameLoad.parent = this.node;
   },


});
