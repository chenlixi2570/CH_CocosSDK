/*
 * @Author: Chen Li Xi
 * @Description: 服务器配置参数信息对象
 */

let _cfgs = {}; // 所有配置数据
let _shareCfgs = {}; // 分享配置数据
let _appVersion = -1; // 代码包中的版本号，用于区分线上与提审
let _isGetAldStatus = false; // 是否计算过一次阿拉丁上报开关
let _enableQyReport = true; // 是否开启qy上报
let _enableAldReport = null; // 是否开启ald上报

let _Cfg_Info = (function () {
   let _instance = {
      initAllCfgs() {
         if (Object.keys(_cfgs).length === 0) {
            // 默认配置参数，更新在 online_config.js 文件中修改
            let Dft_Cfg = require('online_config');
            // 防止默认覆盖最新配置
            Object.assign(
               _cfgs,
               Dft_Cfg.base,
               Dft_Cfg.custom,
            );
            _shareCfgs = Dft_Cfg.sense;
            console.log('==默认配置参数是:', _cfgs);
         }
      },
      setAllCfgs(data) {
         if (data && typeof data === 'object') {
            Object.assign(
               _cfgs,
               data.config.base,
               data.config.custom,
            );
            _cfgs.flowAd = data.config.flowAd ? data.config.flowAd : [];
            _shareCfgs = data.config.sense;
            console.log('==最终配置参数是:', _cfgs);
         }
      },
      getAllCfgs() {
         return _cfgs;
      },
      /**
       * 微信分享配置
       */
      getShareCfgs() {
         return _shareCfgs;
      },
      getCfgByKey(key) {
         if (typeof key === 'string') {
            return _cfgs[key];
         } else {
            return null;
         }
      },
      /**
       * 获取配置属性值，返回值必定是数字，默认返回 0
       * @param {string} key 属性名
       */
      getCfgInt(key) {
         if (typeof key === 'string') {
            let res = parseFloat(_cfgs[key]);
            res = Number.isNaN(res) ? 0 : res;
            return res;
         }
         else {
            return 0;
         }
      },
      /**
       * 获取代码包中的版本号，设置在 TBBaseConfig.xlsx 中
       */
      getAppVersion() {
         if (_appVersion === -1) {
            let id = db.BaseConfigIDs["BC_APP_VERSION"];
            _appVersion = G_GameDB.getBaseConfigByID(id).num;
         }
         return _appVersion;
      },
      /**
       * 当前代码包是线上版本还是提审版本
       * 代码包中的版本号与请求取得的版本号不相等则属于线上状态
       */
      isOnline() {
         let bool = _cfgs.commitVersion != this.getAppVersion();
         console.log(
            '==是否线上版本', bool,
            '线上=', _cfgs.commitVersion,
            '代码包', this.getAppVersion()
         );

         return bool;
      },
      /**
       * 每天最大领奖次数，默认50
       */
      getRewardTimesOfEachDay() {
         let n = parseInt(_cfgs.reward_times_of_each_day, 10);
         return Number.isNaN(n) ? 50 : n;
      },
      /**
       * 分享概率，默认100
       */
      getRateOfShare() {
         let n = parseInt(_cfgs.rate_of_share, 10);
         return Number.isNaN(n) ? 100 : n;
      },
      /**
       * 开启分享前的广告次数，默认10
       */
      getAdvTimesBeforeShare() {
         let n = parseInt(_cfgs.adv_times_before_share, 10);
         return Number.isNaN(n) ? 10 : n;
      },
      /**
       * 获取上报到Ald的百分比，默认100
       */
      getPercentOfReportToAld() {
         let n = parseInt(_cfgs.percent_of_report_to_ald, 10);
         return Number.isNaN(n) ? 100 : n;
      },
      /**
       * 是否上报到阿拉丁
       * 阿拉丁上报还受后端上报比例的影响
       * 开关要打开，且生命周期内只计算一次概率
       */
      isAldReportEnabled() {
         let percent = this.getPercentOfReportToAld();
         if (!_isGetAldStatus) {
            _isGetAldStatus = true; // 只计算一次
            if (G_chSdk.randomInt(1, 100) <= percent && G_chSdk.isWX()) {
               _enableAldReport = true;
            } else {
               _enableAldReport = false;
            }
         }
         return _enableAldReport;
      },
      /**
       * 是否开启趣游上报
       */
      isQyReportEnabled() {
         return _enableQyReport;
      },
      /**
       * 分享成功的最小间隔时间，默认3000
       */
      getMinDurationBetweenShare() {
         let n = parseInt(_cfgs.min_duration_between_share, 10);
         return Number.isNaN(n) ? 3000 : n;
      },
      /**
       * 是否正在提审，默认false
       * 线上版本号与代码包版本号相同且后台方案配置的提审开关打开
       * commitVersionStatus 的值为1
       */
      isPublishing() {
         return !this.isOnline() && _cfgs.commitVersionStatus == '1';
      },
      /**
       * 快速点击误触是否可用
       * */
      isClickMistakeEnabled() {
         if (this.isOnline()) {
            return _cfgs.onlineMistakeStatusOfClick == '1';
         } else {
            return _cfgs.commitMistakeStatusOfClick == '1';
         }
      },
      /**
       * 移动误触是否可用
       */
      isMoveMistakeEnabled() {
         if (this.isOnline()) {
            return _cfgs.onlineMistakeStatusOfMove == '1';
         } else {
            return _cfgs.commitMistakeStatusOfMove == '1';
         }
      },
      /**
       * 按钮误触是否可用
       */
      isBtnMistakeEnabled() {
         if (this.isOnline()) {
            return _cfgs.onlineMistakeStatusOfBtn == '1';
         } else {
            return _cfgs.commitMistakeStatusOfBtn == '1';
         }
      },
      /**
       * 退出页是否可用
       */
      isExitMistakeEnabled() {
         if (this.isOnline()) {
            return _cfgs.onlineMistakeStatusOfExit == '1';
         } else {
            return _cfgs.commitMistakeStatusOfExit == '1';
         }
      },
      /**
       * 开局强制看视频是否可用
       */
      isStatusMistakeEnabled() {
         if (this.isOnline()) {
            return _cfgs.onlineMistakeStatusOfStart == '1';
         } else {
            return _cfgs.commitMistakeStatusOfStart == '1';
         }
      },
      /**
       * 当日最大可误触数量
       * 参数为误触类型，不传参数默认为快速点击
       * 可传入的参数值为：click move btn exit
       */
      getTodayMaxMistakeCount(type = 'click') {
         let data = 100;
         if (_cfgs.todayMaxMistakeCounts && _cfgs.todayMaxMistakeCounts.includes('||')) {
            let result = _cfgs.todayMaxMistakeCounts.split('||');
            let resObj = {};
            result.forEach(item => {
               if (typeof item === 'string' && item !== '' && item.includes(':')) {
                  let arr = item.split(':');
                  resObj[arr[0]] = arr[1];
               }
            });
            data = resObj[type];
         }
         else {
            data = _cfgs.todayMaxMistakeCounts;
         }
         let n = parseInt(data, 10);
         n = Number.isNaN(n) ? 100 : n;
         return n;
      },
      /**
       * 误触触发概率, 默认100
       */
      getInvokeMistakeRate() {
         let n = parseInt(_cfgs.invokeMistakeRate, 10);
         n = Number.isNaN(n) ? 100 : n;
         return n;
      },
      /**
       * 触发关卡间隔，默认1
       * 参数为误触类型，不传参数默认为快速点击
       * 可传入的参数值为：click move btn exit
       */
      getIntervalOfMistakes(type = 'click') {
         let data = 1;
         if (_cfgs.intervalOfMistakes &&
            _cfgs.intervalOfMistakes.includes('||')) {
            let result = _cfgs.intervalOfMistakes.split('||');
            let resObj = {};
            result.forEach(item => {
               if (typeof item === 'string' && item !== '' && item.includes(':')) {
                  let arr = item.split(':');
                  resObj[arr[0]] = arr[1];
               }
            });
            data = resObj[type];
         }
         else {
            data = _cfgs.intervalOfMistakes;
         }
         let n = parseInt(data, 10);
         n = Number.isNaN(n) || n === 0 ? 1 : n;
         return n;
      },
      /**
       * 获取需要屏蔽的广点通列表
       */
      getExportAdv() {
         let s = _cfgs.disable_export_adv_chids;
         s = typeof s === 'string' ? s : '';
         return s;
      },
      /**
       * 获取管理后台配置的平台广告数据
       * @param {string} type banner native insert video recommend box
       */
      getFlowAd(type = 'banner') {
         let res = '';
         Array.isArray(_cfgs.flowAd) && _cfgs.flowAd.forEach(item => {
            if (
               G_chSdk.isObject(item)
               && item.flows_type === type
               && G_chSdk.checkString(item.flows_id)
            ) {
               res = item.flows_id;
            }
         });
         return res;
      },
      /**
       * vivo平台是否显示广告
       * 
       */

      isShowAdvOfVIVO() {
         return G_chInfo.getCfgByKey('switch_adv') == '0';
      }
   };

   _instance.initAllCfgs(); // 设置默认值
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Cfg_Info;