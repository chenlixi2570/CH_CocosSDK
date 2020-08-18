/*
 * @Author: Chen Li Xi
 * @Description: 平台基础类，微信，oppo，vivo平台实现都先继承基础类
 * 相当于其他语言中的接口类概念
 * 在测试模拟器在的默认行为在此定义
 * 其他平台继承后不实现同名方法使用默认行为
 */

let _instance = null;
let _shortStatu = false; // 当前是否在短振动中
// 默认失败
let _defaultFail = function () {
   let args = arguments[0];
   if (
      args &&
      typeof args === 'object' &&
      typeof args.fail === 'function'
   ) {
      args.fail();
   }
};
// 默认成功, 第一参是成功回调默认参数值
let _defaultSucc = function () {
   let args = [...arguments];
   let succArg = args.shift();
   if (
      args[0] &&
      typeof args[0] === 'object' &&
      typeof args[0].success === 'function'
   ) {
      args[0].success(succArg);
   }
};

class _Base_Plat {
   constructor() {
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * 监听网络状态改变
    * 默认不监听
    * @param {function} 
    */
   onNetworkStatus(cb) { }
   /**
    * 获取当前网络状态
    * 默认状态是 wifi
    */
   getNetworkType() {
      console.log('==使用默认网络状态 wifi');
      _defaultSucc('wifi', ...arguments);
   }

   /**
    * toast 提示
    * @param {*} title 
    */
   showToast(title) {
      console.log('==toast提示', title);
   }
   /**
    * 模态框
    */
   showModal(title) {
      console.log('==modal提示', title);
   }
   /**
    * 获取胶囊按钮信息
    */
   getMenuBtnRect() {
      return {
         bottom: 40,
         height: 32,
         left: 278,
         right: 365,
         top: 8,
         width: 87
      };
   }
   /**
    * 屏蔽IP与场景值
    * 是否正常显示广告，默认true
    * True代表允许误触 False代表不允许误触
    * 只在微信端有该功能
    */
   isAdvStateNormal(cb) {
      return new Promise((resolve, reject) => {
         typeof cb === 'function' && cb(true);
         resolve(true);
      });
   }
   /**
    * 导出商业广告是否可用，默认 true  false则要屏蔽广点通
    */
   isExportAdvEnabled() {
      console.log('==默认不屏蔽广点通');
      return true;
   }
   /**
    * 小游戏创建桌面快捷图标
    */
   createShortcut() {
      // console.log('==默认成功 createShortcut...');
   }

   /**
    * 短时间的振动（15 ms）
    */
   vibrateShort(succ, fail) {
      _shortStatu = true;
      G_Scheduler.schedule('vibrate_short_open', () => {
         _shortStatu = false;
      }, 15 / 1000, 1);
      if (_shortStatu) {
         console.log('==短振动触发');
         typeof this.vibrateShortRun === 'function'
            && this.vibrateShortRun(succ, fail);
      }
   }
}

module.exports = _Base_Plat;
