// 管理后羿广告只允许玩家跳转成功一次，
// 当玩家成功跳转一次之后就不再跳转该小游戏，而是随机更换其他小游戏

let _Adv_Once_Mgr = (function () {
   let _storage_key = require('global_const').StorageKey.SK_SKIP_APPID;
   let _alreadySkip = []; // 玩家已经跳转成功的广告ID列表
   /**
    * 获取本地数据
    * @param {String} key 键名(全局唯一)，不能为空
    * @param {any} def 默认值，当取值不成功时返回
    */
   function getStorage(key, def) {
      let ret = cc.sys.localStorage.getItem(key);

      if ((ret === null || ret === '') && typeof def !== "undefined") {
         return def;
      }
      else {
         return ret;
      }
   }

   /**
    * 存储本地数据
    * @param {String} key 键名(全局唯一)，不能为空
    * @param {Any} data 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
    */
   function setStorage(key, data) {
      if (data && typeof data === 'object') {
         data = JSON.stringify(data);
      }
      cc.sys.localStorage.setItem(key, data);
   }
   function _init() {
      let storageData = getStorage(_storage_key, '');
      _alreadySkip = storageData.split(',');
      _alreadySkip = _alreadySkip.filter(item => {
         return !!item;
      });
      // console.log('==玩家已跳转成功的AppId列表', _alreadySkip);
   }
   function _save() {
      let storageData = _alreadySkip.join();
      setStorage(_storage_key, storageData);
   }
   cc.game.on(cc.game.EVENT_GAME_INITED, () => {
      _init();
   });
   
   let _instance = {
      /**
       * 保存跳转成功的Appid到缓存中
       * @param {string} appid 微信跳转的appid
       */
      saveSkipAppid(appid) {
         if (G_Const.IssuePlat !== 'wx') return;
         if (typeof appid === 'string' && appid !== '') {
            _alreadySkip.push(appid);
            _alreadySkip = [...new Set(_alreadySkip)]; // 去重
            _save();
         }
      },
      /**
       * 取玩家未跳转成功过的广告
       * @param {object} curInfo 一条广告数据结构
       * @param {array} allInfo 当前广告位置所有广告数据
       */
      getNotSkipAdvInfo(curInfo, allInfo) {
         if (G_Const.IssuePlat !== 'wx') return curInfo;
         if (!curInfo || !Array.isArray(allInfo)) return curInfo;
         if (G_Const.IssuePlat !== 'wx') return curInfo;
         console.log('取玩家未跳转成功过的广告', curInfo, allInfo);
         let curAppid = curInfo.appid;
         if (_alreadySkip.includes(curAppid)) {
            let otherInfo = null;
            for (const advInfo of allInfo) {
               if (!_alreadySkip.includes(advInfo.appid)) {
                  otherInfo = advInfo;
                  break;
               }
            }
            if (typeof otherInfo === 'object' && otherInfo !== null) {
               return otherInfo;
            }
            else {
               return curInfo;
            }
         }
         else {
            return curInfo;
         }
      }
   };
   return () => {
      return _instance;
   };
})();

module.exports = _Adv_Once_Mgr;