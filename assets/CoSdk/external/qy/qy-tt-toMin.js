/**
 * 头条实现跳转小游戏的接口
 */
if (typeof window.tt === 'object') {
   let _onNavigateSuccCb = null;
   let _onNavigateFailCb = null;
   let _onMoreGamesModalCloseCb = null;

   window.tt.navigateToMiniGame = function (advInfo, touchCb, closeCb) {
      if (cc.sys.os === cc.sys.OS_IOS) {
         tt.showToast({
            title: 'iOS 不支持打开更多游戏！！'
         });
         return;
      }
      _onNavigateSuccCb = advInfo.success;
      _onNavigateFailCb = advInfo.fail;
      _onMoreGamesModalCloseCb = closeCb;

      // 监听小游戏跳转
      if (tt.onNavigateToMiniProgram) {
         tt.onNavigateToMiniProgram(function (res) {
            // console.log("跳转结果", res);
            if (res.errCode === 0) {
               G_Reportor.report(G_ReportEventName.REN_NAVIGATE_SUCC_ON_TT_PLAT);
               
               typeof _onNavigateSuccCb === 'function' &&
                  _onNavigateSuccCb(res);
            }
            else if (res.errCode === 1) {
               typeof _onNavigateFailCb === 'function' &&
                  _onNavigateFailCb(res);
            }
            else if (res.errCode === 1) {
               res.errMsg = 'navigateToMiniProgram:fail cancel';
               typeof _onNavigateFailCb === 'function' &&
                  _onNavigateFailCb(res);
            }
         });
      }
      // 监听用户关闭更多小游戏
      if (tt.onMoreGamesModalClose) {
         tt.onMoreGamesModalClose(function () {
            // console.log("用户关闭更多小游戏");
            typeof _onMoreGamesModalCloseCb === 'function' &&
               _onMoreGamesModalCloseCb();
         });
      }
      // 显示更多小游戏
      if (tt.showMoreGamesModal) {
         tt.showMoreGamesModal({
            appLaunchOptions: [],
            success(res) {
               // console.log("success", res.errMsg);
               if (typeof touchCb === "function") {
                  touchCb(true);
               }
            },
            fail(res) {
               // console.log("fail", res.errMsg);
               if (typeof touchCb === "function") {
                  touchCb(false);
               }
            }
         });
      }
   };
}
