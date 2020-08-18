/*
 * @Author: Chen Li Xi
 * @Description: 
 */

let _instance = null;
let _Base_Plat = require('base_plat');

class _VIVO_Plat extends _Base_Plat {
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
      if (!G_chSdk.isVIVO()) {
         console.log('---toast提示失败', title);
         return;
      }
      qg.showToast({
         message: title,
         duration: 1500
      });
   }
   /**
    * 模态框
    */
   showModal(title) {
      if (!G_chSdk.isVIVO()) {
         console.log('---modal提示失败', title);
         return;
      }
      qg.showModal({
         title: '提示',
         message: title,
         success(res) {
            console.log('用户点击确定');
         }
      });
   }
   /**
    * 小游戏创建桌面快捷图标
    */
   createShortcut() {
      return;
      if (!G_chSdk.isVIVO) return null;
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
      if (!G_chSdk.isVIVO()) return null;
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

module.exports = _VIVO_Plat;