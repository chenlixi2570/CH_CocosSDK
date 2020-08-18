/** 
G_Const 主要命名空间
 */
declare namespace G_Const {
   /** 平台appid 浏览器下取微信appid*/
   export let platAppId: string;
   /** 平台标识符 pc wx qq vivo oppo tt */
   export let IssuePlat: string;
   /** 是否开启体力系统 */
   export let hasPhysical: boolean;

   export class EventName {
      /**系统错误（严重错误） */
      static EN_SYSTEM_ERROR: string;
      /**网络连接丢失 */
      static EN_NET_CONNECTION_LOST: string;
      /**网络连接恢复 */
      static EN_NET_CONNECTION_RECOVER: string;
      /**退出前 */
      static EN_WILL_EXIT: string;
      /**App进入前台后 */
      static EN_APP_AFTER_ONSHOW: string;
      /**App进入后台前 */
      static EN_APP_BEFORE_ONHIDE: string;
      /**金币发生改变 */
      static CH_COIN_CHANGED: string;
      /**音效设置发生改变 */
      static EN_SOUND_SETTING_CHANGED: string;
      /**玩家解锁新关卡 */
      static CH_CURRLEVEL_ADD: string;
      /**玩家体力值发生改变 */
      static CH_PHYS_CHANGED: string;
      /**玩家更换皮肤 */
      static CH_SKIN_UPDATE: string;
      /**用户解锁新皮肤 */
      static CH_SKIN_NEW: string;
      /**用户签到完成 */
      static CH_SIGN_SUCC: string;
      /**体力倒计时每秒执行 */
      static EN_SECOND_RUN: string;
      /**体力倒计时隐藏 */
      static EN_PHYSICAL_TIMEDOWN_END: string;
      /**钻石改变时执行 */
      static EN_GEM_CHANGE: string;
      /**准星更换时执行 */
      static EN_GUN_UPDATE: string;
      /**解锁新准星 */
      static EN_GUN_NEW: string;
      /** 减动画 体力 金币 钻石  */
      static EN_ADD_MOVE: string;
      /** 减动画 体力 金币 钻石  */
      static EN_SUB_MOVE: string;
      /** 登陆完成 */
      static CH_LOGIN_FINISH: string;
      /** 用户信息对象创建完成 */
      static CH_USERINFO_FINISH: string;
      /**游戏场景准备完毕，游戏开始 */
      static GAME_ING: string;
      /** 游戏完成，成功或失败都会触发 */
      static GAME_FINISH: String;
      /** 游戏中途失败，等待复活*/
      static GAME_DIE: string;
      /*未复活游戏失败*/
      static EASTER_FAIL: string;
      /**复活成功继续游戏 */
      static GAME_AGAIN: string;
      /*首页第一次显示完成*/
      static GAME_INDEX: string;
      /**玩家手机触摸离开 */
      static CH_TOUCHEND: string;
      /**玩家手机触摸开始 */
      static CH_TOUCHSTART: string;
      /**玩家手机触摸移动 */
      static CH_TOUCHMOVE: string;
      /**炸弹开始爆炸 */
      static CH_TNT_BOMB: string;
      /**清除一个divide路径 */
      static CH_DIVIDE_DEL: string;
      /**滚石开始推铁箱 */
      static CH_STONE_IRONBOX: string;
      /**用户没有授权摄像头权限 */
      static CH_NOT_CAMERA: string;
      /**用户点头 */
      static CH_HEAD_PITCH: string;
      /**用户眨眼 */
      static CH_BLINK: string;
   }
}

declare namespace G_ReportEventName {
   /** 头条平台跳转小程序成功*/
   export let REN_NAVIGATE_SUCC_ON_TT_PLAT: string;
   export let REN_NAVIGATION_TO_MINIPROGRAM: string;
   export let REN_NAVIGATION_TO_MINIPROGRAM_SUCCESS: string;
   export let REN_NAVIGATION_TO_MINIPROGRAM_CANCEL: string;
   export let REN_NAVIGATION_TO_MINIPROGRAM_ERROR: string;
   export let REN_RECEIVED_MEMORY_WARNING: string;
}

declare namespace G_Strategy {
   /**    * 执行平台功能    */
   export function doPlatform();
   /**    * 执行平台广告    */
   export function doAdvMgr();
}

declare namespace G_Scheduler {
   /**    * 创建定时器    */
   export function schedule(key, cb, interval, repeat, delay, paused);
   /**    * 取消定时器    */
   export function unschedule(key);
   /**    * 是否存在此定时器    */
   export function isScheduled();
   export function unscheduleAll();
}

declare namespace G_UIManager {
   /** 注册UI根节点 一般一个场景注册一次，离开场景反注册    */
   export function registerUIRoot(root);
   /**    * 反注册UI根节点    */
   export function unregisterUIRoot();
   /**
    * 
    */
   export function registerUI();
   export function unregisterUI();
   export function showUI(clsName, ...args);
   export function hideUI(clsName);
   export function preloadUI(clsNames, cb);
}


declare namespace G_Reportor {
   /**    * 上报关卡开始    */
   export function reportLevelStart();
   /*
   * 上报关卡结束
   * @param {string} isPass fail | complete
   * @param {string} desc 描述
   */
   export function reportLevelEnd(isPass = 'complete', desc = '');
}

declare namespace G_GameFlow {
   /**    * 进度条进1    */
   export function addLoading();
   /**    * 进度条是否完成    */
   export function isLoadSuccess();
   /**    * 进度比例    */
   export function getLoadScale();
   /**    * 游戏成功    */
   export function gameSuccess();
   /**    * 游戏失败    */
   export function gameFail();
   /**    * 游戏中    */
   export function gameing();
   /**    * 游戏暂停    */
   export function gamePause();
   /**    * 当前游戏状态    */
   export function getGameStatus();
   /**    * 是否在游戏中    */
   export function isGameing();
   /**    * 游戏是否成功    */
   export function isGameSuccess();
   /**    * 游戏是否失败    */
   export function isGameFail();
   /**    * 游戏开始    */
   export function gameStart();
   /** 游戏结束 参数为游戏是否成功，true 表示成功    */
   export function gameEnd(isSucc: boolean);
}

/**
 * 测试渲染
 */
declare namespace G_GameTest {
   export function drawCricleByWorld();
   export function drawCricleByNodeSpace();
   export function drawLineByNodeSpace();
   export function drawLineByWorld();
   export function clearArea();
}