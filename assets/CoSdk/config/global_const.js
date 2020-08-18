/*
 * @Author: Chen Li Xi
 * @Description: 全局常量值
 */
let G_Const = {};
G_Const.hasPhysical = true; // 是否开启体力系统
G_Const.IS_Test_Cfg = true; // 浏览器模式下是否使用线上配置数据
G_Const.IS_ClearStorage = true; // 是否清除缓存，会判定为新用户
G_Const.IS_TEST = true; // 是否打印日志 log
// 在浏览器中测试多平台，值: pc wx oppo vivo tt qq
G_Const.IssuePlat = 'tt';
G_Const.AppId = {
   name: '电音枪手',
   // 小游戏标识key
   token: 'gunMusic',
   pc: '',
   // 微信小游戏ID
   wx: 'wxfefa3484a8432cdc',
   oppo: '',
   qq: '',
   tt: '',
   vivo: '',
   // 阿拉丁appkey
   ald: '3a4e336304afd0a5800335dc7a4cb144'
};

// 全局事件名，务必保证键和值相等且全局唯一
G_Const.EventName = {
   // 系统错误（严重错误）
   EN_SYSTEM_ERROR: "EN_SYSTEM_ERROR",
   // 网络连接丢失
   EN_NET_CONNECTION_LOST: "EN_NET_CONNECTION_LOST",
   // 网络连接恢复
   EN_NET_CONNECTION_RECOVER: "EN_NET_CONNECTION_RECOVER",
   // 退出前
   EN_WILL_EXIT: "EN_WILL_EXIT",
   // App进入前台后
   EN_APP_AFTER_ONSHOW: "EN_APP_AFTER_ONSHOW",
   // App进入后台前
   EN_APP_BEFORE_ONHIDE: "EN_APP_BEFORE_ONHIDE",
   // 金币发生改变
   CH_COIN_CHANGED: "CH_COIN_CHANGED",
   // 音效设置发生改变
   EN_SOUND_SETTING_CHANGED: "EN_SOUND_SETTING_CHANGED",

   // 玩家解锁新关卡
   CH_CURRLEVEL_ADD: 'CH_CURRLEVEL_ADD',
   // 玩家体力值发生改变
   CH_PHYS_CHANGED: 'CH_PHYS_CHANGED',
   // 玩家更换皮肤
   CH_SKIN_UPDATE: 'CH_SKIN_UPDATE',
   // 用户解锁新皮肤
   CH_SKIN_NEW: 'CH_SKIN_NEW',
   // 用户签到完成
   CH_SIGN_SUCC: 'CH_SIGN_SUCC',

   // 体力倒计时每秒执行
   EN_SECOND_RUN: 'EN_SECOND_RUN',
   // 体力倒计时隐藏
   EN_PHYSICAL_TIMEDOWN_END: 'EN_PHYSICAL_TIMEDOWN_END',
   // 钻石改变时执行
   EN_GEM_CHANGE: 'EN_GEM_CHANGE',
   // 准星更换时执行
   EN_GUN_UPDATE: 'EN_GUN_UPDATE',
   // 解锁新准星
   EN_GUN_NEW: 'EN_GUN_NEW',
   // 增减动画 体力 金币 钻石
   EN_ADD_MOVE: 'EN_ADD_MOVE',
   EN_SUB_MOVE: 'EN_SUB_MOVE',
   CH_TOUCHEND: 'CH_TOUCHEND', //玩家手机触摸离开
   CH_TOUCHSTART: 'CH_TOUCHSTART', //玩家手机触摸开始
   CH_TOUCHMOVE: 'CH_TOUCHMOVE', //玩家手机触摸移动

   CH_LOGIN_FINISH: 'CH_LOGIN_FINISH', // 登陆完成
   CH_USERINFO_FINISH: 'CH_USERINFO_FINISH', // 用户信息对象创建完成
   GAME_INDEX: 'GAME_INDEX', // 首页第一次显示完成
   GAME_ING: 'GAME_ING', // 游戏场景准备完毕，游戏开始
   GAME_FINISH: 'GAME_FINISH',// 游戏完成，成功或失败都会触发
   GAME_DIE: 'GAME_DIE',// 游戏中途失败，等待复活
   EASTER_FAIL: 'EASTER_FAIL',// 未复活游戏失败
   GAME_AGAIN: 'GAME_AGAIN',// 复活成功继续游戏
   GAME_RESET: 'GAME_RESET', // 游戏场景重置
};

// 注册取 GameDB 的函数
G_Const.GameDBConfigs = [
   {
      // 关键字
      key: "BaseConfig",
      // 若为true，则会创建get{*}ByID的方法，参数为id(其中{*}代表key值)
      getFunc: true,
      // 若为true，则会创建getAll{*}s的方法，无参数(其中{*}代表key值)
      getAllFunc: true
   },
   {
      key: "UIWord",
      getFunc: true,
      getAllFunc: true
   },
   {
      key: "NetError",
      getFunc: true,
      getAllFunc: true
   },
   {
      key: "LevelConfig",
      getFunc: true,
      getAllFunc: true
   },
   {
      key: "SignConfig",
      getFunc: true,
      getAllFunc: true
   },
   {
      key: "SkinConfig",
      getFunc: true,
      getAllFunc: true
   },
   {
      key: "AtlasConfig",
      getFunc: true,
      getAllFunc: true
   },
];
// 网络请求配置
G_Const.HttpConf = {
   baseUrl: 'https://config.game.hnquyou.com/quyou-api/api', // 数据服务器
   assetsUrl: `https://image.game.hnquyou.com/chenlixiProject/${G_Const.AppId.token}/`, // 资源oss服务器
   timeout: 5000, // 请求延迟时间
   max_times: 3, // 失败重联次数
};
// SDK使用缓存键名配置，
G_Const.StorageKey = {
   // 缓存用户信息
   SK_USER_INFO: `storage_key_of_player_info_${G_Const.AppId.token}_{0}`,
   // 缓存用户sessID & openID
   SK_OPENID_SESSID: `storage_key_of_openid_and_sessid_by_${G_Const.AppId.token}`,
   // 缓存用户音频设置状态
   SK_SOUND_SETTING: 'SK_KEY_OF_SOUND_SETTING',
   // 缓存用户已经跳转过的小游戏AppID
   SK_SKIP_APPID: `st_hou_yi_adv_skip_count_by_${G_Const.AppId.token}`
};
// 全局永驻节点标记
G_Const.PersistNodeTags = {
   PNT_FOREVER: "PNT_FOREVER"
};

// 免费获取方式
G_Const.FreeGetWay = {
   // 都不支持
   FGW_NONE: "none",
   // 分享
   FGW_SHARE: "share",
   // 广告
   FGW_ADV: "adv",
};

G_Const.ShareScene = {
   // 系统菜单
   SS_SYSTEM_MENU: "ShareList",
   // 客服服务
   SS_CUSTOMER_SERVER: "ShareList",
};

// 开放域操作命令
// 此处变量名定义必须与开放域内的定义完全相同
G_Const.OpenDataOperation = {
   ODO_PRELOAD: "preload",
   ODO_SHOW_RANK: "show_rank"
};
// 上报事件名
G_Const._ReportEventName = {
   REN_NAVIGATE_SUCC_ON_TT_PLAT: "navigate_succ_on_tt_plat",
   REN_NAVIGATION_TO_MINIPROGRAM: "navigation_to_miniprogram",
   REN_NAVIGATION_TO_MINIPROGRAM_SUCCESS: "navigation_to_miniprogram_success",
   REN_NAVIGATION_TO_MINIPROGRAM_CANCEL: "navigation_to_miniprogram_cancel",
   REN_NAVIGATION_TO_MINIPROGRAM_ERROR: "navigation_to_miniprogram_error",
   REN_RECEIVED_MEMORY_WARNING: "received_memory_warning"
};

// export
module.exports = G_Const;
