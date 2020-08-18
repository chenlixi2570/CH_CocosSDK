/*
 * @Author: Chen Li Xi
 * @Description: SDK 入口，当初始化完成时，用户信息、配置信息都已经生成
 */
let global_const = require('global_const');

function createGConst() {
   let G_Const = {};
   let platStr = G_chSdk.getPlatStr();

   G_Const.EventName = global_const.EventName;
   Object.assign(G_Const.EventName, require('project_const').EventName);

   G_Const.IssuePlat = platStr === 'pc' ? global_const.IssuePlat : platStr;

   G_Const.platAppId = global_const.AppId[G_Const.IssuePlat];

   return G_Const;
}

/**
 * 创建全局变量
 */
function addGlobalVar() {
   // 工具方法全局命名空间
   window.G_chSdk = require('ch_sdk')();
   // 用户数据相关的命名空间
   window.G_chInfo = require('ch_info')();
   // 动作动画实现
   window.G_chAction = require('ch_action');
   // 仿CSS动画库实现动作序列
   window.G_CSSAnimate = require('css_animate');
   // 策略类
   window.G_Strategy = require('strategy').getInstance();;

   // Schedule
   window.G_Scheduler = require("scheduler").getInstance();

   // UIManager
   window.G_UIManager = require("ui_manager").getInstance();

   // 上报模块事件名
   window.G_ReportEventName = require('project_const')._ReportEventName;

   // 上报管理模块
   window.G_Reportor = require('reportor').getInstance();

   // 游戏流程
   window.G_GameFlow = require('game_flow').getInstance();


   // 登陆模块
   let newLogin = null;
   if (G_chSdk.isWX()) {
      newLogin = require('new_login_wx').getInstance();
   }
   else if (G_chSdk.isQQ()) {
      newLogin = require('new_login_qq').getInstance();
   }
   else {
      newLogin = require('new_login').getInstance();
   }
   window.newLogin = newLogin;

   /** 全局常量要在最后计算 */
   window.G_Const = createGConst();
}

function _initRequest() {
   // 监听网络状态改变，获取网络状态类型
   let Network = require('network_helper').getInstance();

   G_Strategy.doPlatform('onNetworkStatus', Network.onNetWorkChange);

   G_Strategy.doPlatform('getNetworkType', {
      success: netType => {
         Network.initNetwork(netType);
      },
      fail: netType => {
         Network.initNetwork(netType);
      }
   });
   // 
   G_Strategy.doPlatform('onAudio');

   // 初始时间管理工具，使用服务器时间
   G_chSdk.initServerTime();
};

function _clearStorage() {
   let { IS_ClearStorage } = require('global_const');
   if (IS_ClearStorage) {
      cc.sys.localStorage.clear();
      // console.log('==全局缓存数据', cc.sys.localStorage);
   }
}

// 用户登陆 用户信息请求 配置参数请求
function login(loginFinish) {
   window.newLogin && newLogin.login(() => {
      /**
       * 此时登陆流程已完成，配置参数已保存到内存
       */

      G_Reportor.registerAllEvents(); // 在登陆完成之后再引入上报文件
      G_Reportor.init(); // 在登陆完成之后再引入上报文件

      // 在微信环境下才初始化分享
      G_chSdk.isWX() && require('wx_share_mgr').getInstance().init();

      // 初始读取缓存中的用户设置
      G_chSdk.initSoundMgr();

      G_chInfo.updateInitCfg();  //  使用后端设置的值更新新用户初始数值
      G_chSdk.dispatchOnce(G_Const.EventName.CH_LOGIN_FINISH);

      G_GameFlow.addLoading();
      typeof loginFinish === 'function' && loginFinish();
   });
}

let init = function (initFinish) {
   // console.log("==开始初始化 CoSDK...");
   addGlobalVar(); // 添加全局变量

   G_Strategy._init(); // 平台策略类
   // 注册所有UI界面
   G_UIManager.registerAllUIs(() => {
      G_GameFlow.addLoading();
   });

   _clearStorage(); // 清除所有缓存

   _initRequest(); // 初始请求
   // GameDB
   let gameDB = require("game_db");
   window.db = gameDB.db;
   window.G_GameDB = gameDB.ins.getInstance();
   // GameDB 注册取数据的函数
   let { GameDBConfigs } = global_const;
   G_GameDB.registerAll(GameDBConfigs);
   G_GameDB.onLoad(() => {
      G_GameFlow.addLoading();
      let allLevel = G_GameDB.getAllLevelConfigs();
      G_chInfo.setAllLevelData(allLevel); // 所有关卡数据
      console.log(
         // "==所有配置文件数据", G_GameDB.getAllCfgs(), '\n',
         '==所有关卡数据', allLevel, '\n',
         // '==db对象', db, '\n',
         // '==window对象', window, '\n'
      );
      login(initFinish); // 执行登陆模块
   });
};

// export
module.exports = { init: init };