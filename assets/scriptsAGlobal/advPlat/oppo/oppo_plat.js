/*
 * @Author: Chen Li Xi
 * @Description: 
 */

let _instance = null;
let _Base_Plat = require('base_plat');

class _OPPO_Plat extends _Base_Plat {
   constructor() {
      super();
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * toast 提示
    * @param {*} title 
    */
   showToast(title, icon = 'none') {
      if (!G_chSdk.isOPPO()) {
         console.log('---toast提示失败', title);
         return;
      }
      qg.showToast({
         title,
         icon,
         duration: 1500
      });
   }
   /**
    * 模态框
    */
   showModal(title) {
      if (!G_chSdk.isOPPO()) {
         console.log('---modal提示失败', title);
         return;
      }
      qg.showModal({
         title: '提示',
         content: title,
         success(res) {
            if (res.confirm) {
               console.log('用户点击确定');
            } else if (res.cancel) {
               console.log('用户点击取消');
            }
         }
      });
   }
   /**
    * 小游戏创建桌面快捷图标
    */
   createShortcut() {
      if (!G_chSdk.isOPPO()) return null;
      console.log('---尝试创建桌面图标');

      qg.hasShortcutInstalled({
         success: function (res) {
            // 判断图标未存在时，创建图标
            console.log('有桌面图标吗', res);

            if (res == false) {
               qg.installShortcut({
                  success: function () {
                     // 执行用户创建图标奖励
                     console.log('创建图标成功');

                  },
                  fail: function (err) { },
                  complete: function () { }
               });
            }
         },
         fail: function (err) { },
         complete: function () { }
      });
   }
   /**
    * 短时间的振动
    */
   vibrateShortRun(success, fail, complete) {
      if (!G_chSdk.isOPPO()) return null;
      qg.vibrateShort({
         success: (res) => {
            typeof success === 'function' && success(res);
         },
         fail: (res) => {
            typeof fail === 'function' && fail(res);
         },
         complete: (res) => {
            typeof complete === 'function' && complete(res);
         }
      });
   }
}

module.exports = _OPPO_Plat;