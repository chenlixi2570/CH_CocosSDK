/*
 * @Author: Chen Li Xi
 * @Description: oppo 平台视频广告，banner广告，插屏广告
 * 次数控制，线上版本与提审版本控制广告，是否误触都在父类中实现
 */
let _instance;
let _mistake_count = {
   moveCount: {}, // 上移点击
   clickCount: {}, // 快速点击
   btnCount: {},
   exitCount: {}
}; // 记录误触次数
let _today_str = '20200101'; // 当日字符
let _storage_key = 'sk_adv_skip_count'; // 缓存误触次数，用对象存在多个数据

let _save_count = function (type = 'moveCount', number = 0) {
   if (number === 0) { // 此时无值，设默认值
      _mistake_count[type][_today_str] = 0;
   } else {
      // 此时有值，在原值上自加1
      _mistake_count[type][_today_str] += 1;
   }
   let countData = JSON.stringify(_mistake_count);
   G_chSdk.setStorage(_storage_key, countData);
};
let _get_count = function (type = 'moveCount') {
   // 如果没有该误触类型的缓存或当日无缓存，则重置为0
   if (!_mistake_count[type]
      || _mistake_count[type][_today_str] === undefined) {
      _mistake_count[type] = {
         [_today_str]: 0
      };
   } else {
      let count = parseInt(_mistake_count[type][_today_str]);
      if (Number.isInteger(count)) {
         _mistake_count[type][_today_str] = count;
      } else {
         _mistake_count[type][_today_str] = 0;
      }
   }
};
// 初始化时得到缓存中的误触次数
let _initStorage = function () {
   _today_str = G_chSdk.getTodayStr();

   let storage_count = G_chSdk.getStorage(_storage_key);
   let skipType = ['moveCount', 'clickCount', 'btnCount', 'exitCount'];
   if (G_chSdk.checkString(storage_count)) {
      _mistake_count = JSON.parse(storage_count);
      // console.log('==缓存中的误触数据', _mistake_count);
      skipType.forEach(item => {
         _get_count(item);
      });
   } else {
      // console.log('==第一次缓存误触数据');
      skipType.forEach(item => {
         _save_count(item, 0);
      });
   }
};

/**
 * 误触类型是否开启
 * 已经开启要满足的条件，所有条件同时满足可以开启误触
 * 1、处于线上状态，提审状态不开启
 * 2、管理后台的该类型开关已经手动开启
 * 3、触发随机概率在管理后台设置的概率内
 * 4、触发间隔在管理后台设置的间隔区间中
 * 5、IP与场景值是否后羿后台设置所屏蔽
 * @param {string} type move click btn exit
 * @param {function} cb 
 * @returns {Promise} 
 */

let _mistakeIsOpen = function (type = 'move', cb) {
   // 今天已玩多少局
   let round = G_chInfo.getTodayCount();
   // 间隔多少局开启
   let inter = G_chInfo.getIntervalOfMistakes(type);
   // 当前概率
   let scale = G_chSdk.random(1, 100);
   // 后台设置的概率范围
   let misRate = G_chInfo.getInvokeMistakeRate();
   // 今日已经开启误触次数
   let skipCount = _mistake_count[type + 'Count'][_today_str];
   // 今日最大可误触数量
   let misCount = G_chInfo.getTodayMaxMistakeCount(type);
   // 是否为线上状态并且后台开关已经打开
   let upType = type[0].toUpperCase() + type.slice(1);
   let onOff = G_chInfo['is' + upType + 'MistakeEnabled']();

   return new Promise((resolve, reject) => {
      // 屏蔽IP与场景值 True代表允许误触 False代表不允许误触
      G_Strategy.doPlatform('isAdvStateNormal', (isNormal) => {
         console.log(`==误触类型${type}是否开启：开关:${onOff}，概率:${scale} < ${misRate}，今日次数:${skipCount} < ${misCount}，当前间隔:${round} % ${inter} == 0，IP与场景值:${isNormal}`);
         if (
            // 是否线上状态且开关开启
            !onOff ||
            // IP与场景值是否未被屏蔽
            !isNormal ||
            // 次数达到上限不显示
            skipCount > misCount ||
            // 每隔几局出现, 第一局必定出现
            round % inter !== 0 ||
            // 在概率范围外不显示
            scale > misRate
         ) {
            typeof cb === 'function' && cb(false);
            resolve(false);
         } else {
            typeof cb === 'function' && cb(true);
            resolve(true);
         }
      });
   });
};

class _Base_Adv_Mgr {
   constructor() { }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   init() {
      console.log('==平台广告 init...');
      // 初始化时即查看是否被屏蔽
      G_Strategy.doPlatform('isAdvStateNormal');
      _initStorage();
   }
   showBanner(succ, fail) {
      console.log('==default showBanner...');
      typeof fail === 'function' && fail();
   }
   hideBanner() {
      console.log('==default hideBanner...');
      G_UIManager.hideUI("likeWxBanner");
   }
   createIns() {
      console.log('==default createIns...');
   }
   createVideoAdv(cb) {
      console.log('==视频广告默认成功 createVideoAdv...');
      typeof cb === 'function' && cb(true);
   }
   share(...args) {
      console.log('==default share...', ...args);
   }
   createFloatNative() {
      console.log('==默认原生浮动广告返回 null');
      return null;
   }
   naOnLoad(cb) {
      console.log('==默认原生广告返回null');
      typeof cb === 'function' && cb(null);
   }
   getNaInfo() {
      return null;
   }

   /* ********    误触控制   ********* */
   /** 
    * 是否显示按钮上移误触广告
    */
   isShowMoveUp(cb) {
      _mistakeIsOpen('move', isShow => {
         typeof cb === 'function' && cb(isShow);
      });
   }
   showMoveUpBanner(moveBtns, succ, fail) {
      console.log('==default 上移误触 showMoveUpBanner...');
      this.moveBtnToDown(moveBtns);
      G_Scheduler.schedule('btn_up_tkip_banner', () => {
         G_UIManager.showUI("likeWxBanner");
         this.saveCount('moveCount', 1);
         typeof succ === 'function' && succ(true);
         G_Scheduler.schedule('to_up_btns', () => {
            this.moveBtnToUp(moveBtns);
            G_UIManager.hideUI('likeWxBanner');
         }, 1, 1);
         G_Scheduler.unschedule("btn_up_tkip_banner");
      }, 1.2, 1);
   }
   moveBtnToDown(moveBtns) {
      Array.isArray(moveBtns) &&
         moveBtns.forEach(nBtn => {
            if (nBtn instanceof cc.Node && nBtn.active) {
               let downPosi = G_chSdk.getWidgetPosition(nBtn, -1, -60);
               nBtn.initPosi = nBtn.getPosition();
               nBtn.y = downPosi.y;
            }
         });
   }
   moveBtnToUp(moveBtns) {
      Array.isArray(moveBtns) &&
         moveBtns.forEach((node, i) => {
            if (
               node instanceof cc.Node &&
               node.active &&
               node.initPosi instanceof cc.Vec2
            ) {
               node.stopAllActions();
               node.runAction(
                  cc.sequence(
                     cc.moveTo(.2, node.initPosi),
                     cc.callFunc(() => {

                     })
                  )
               );

            };
         });
   }
   /**
    * 是否显示快速点击广告
    */
   isShowFastClick(cb) {
      _mistakeIsOpen('click', isShow => {
         typeof cb === 'function' && cb(isShow);
      });
   }
   showFastClickBanner() {
      console.log('==default 快速点击误触 showFastClickBanner...');
   }
   /**
    * 能否显示退出页广告
    * @param {function} cb 
    */
   canShowExit(cb) {
      // IP与场景是否被屏蔽
      _mistakeIsOpen('exit', isShow => {
         if (isShow) {
            this.saveCount('exitCount', 1);
         }
         typeof cb === 'function' && cb(isShow);
      });
   }
   /**
    * 是否显示按钮误触广告
    */
   isShowBtn(cb) {
      _mistakeIsOpen('btn', isShow => {
         typeof cb === 'function' && cb(isShow);
      });
   }
   canShowBtn(cb) {
      _mistakeIsOpen('btn', isShow => {
         typeof cb === 'function' && cb(isShow);
      });
   }
   showBtnBanner(cb) {
      console.log('==default 按钮误触 showBtnBanner...');
      this.isShowBtn(isShow => {
         if (isShow) {
            G_UIManager.showUI("likeWxBanner");
            typeof cb === 'function' && cb(true);
         }
         else {
            typeof cb === 'function' && cb(false);
         }
      });
   }
   /**
    * 保存显示一次误触到缓存
    * @param {string} type  moveCount clickCount
    * @param {number} number 0 1
    */
   saveCount(type = 'moveCount', number = 1) {
      _save_count(type, number);
   }
}


module.exports = _Base_Adv_Mgr;

/**
 isShowMoveUp(cb) {

      let round = G_chInfo.getTodayCount(); // 今天已玩多少局
      let scale = G_chSdk.random(1, 100);
      let tkip_count = _mistake_count.moveCount[_today_str];
      let onOff = G_chInfo.isMoveMistakeEnabled();
      let misRate = G_chInfo.getInvokeMistakeRate('move');
      let misCount = G_chInfo.getTodayMaxMistakeCount('move');
      let inter = G_chInfo.getIntervalOfMistakes();
      console.log(
         '==上移开关', onOff, '\n',
         '==上移概率', scale, misRate, '\n',
         '==已上移次数', tkip_count, misCount, '\n',
         '==今日多少局', round, inter, '\n'
      );
      if (
         // 快速点击误触是否可用
         !onOff ||
         // 次数达到上限不显示
         tkip_count > misCount ||
         // 每隔几局出现, 第一局必定出现
         round % inter != 0 ||
         // 在概率范围外不显示
         scale > misRate
      ) {
         return false;
      } else {
         return true;
      }
   }

   isShowFastClick() {
      let round = G_chInfo.getTodayCount();
      let scale = G_chSdk.random(1, 100);
      let fast_count = _mistake_count.clickCount[_today_str];
      let onOff = G_chInfo.isClickMistakeEnabled();
      let misRate = G_chInfo.getInvokeMistakeRate('click');
      let misCount = G_chInfo.getTodayMaxMistakeCount('click');
      let inter = G_chInfo.getIntervalOfMistakes();
      console.log(
         '==快速点击开关', onOff, '\n',
         '==上移概率', scale, misRate, '\n',
         '==已上移次数', fast_count, misCount, '\n',
         '==今日多少局', round, inter, '\n'
      );
      if (
         // 快速误触是否可用
         !onOff ||
         // 次数达到上限不显示
         fast_count > misCount ||
         // 每隔几局出现,
         round % inter != 0 ||
         // 在概率范围外不显示
         scale > misRate
      ) {
         return false;
      } else {
         return true;
      }
   }

   canShowExit(cb) {
      // IP与场景是否被屏蔽
      let isNormal = G_Strategy.doPlatform('isAdvStateNormal');
      if (isNormal instanceof Promise) {
         isNormal.then(statu => {
            let isExit = G_chInfo.isExitMistakeEnabled();
            console.log('==可以出退出页否', statu, isExit);
            if (statu && isExit) {
               typeof cb === 'function' && cb(true);
            }
            else {
               typeof cb === 'function' && cb(false);
            }
         });
      }
      else {
         typeof cb === 'function' && cb(false);
      }
   }

 */