/**
 * let str1 = '9a656e834f6b502d39b5c89f72542f39,7523283d26df79d81f00ffee26628a92';
 * 改取后羿广告方式，简化参数，不再支持数组与对象方式，多个广告位置用英文逗号分开
 */
let _instance = null;
let _allInfo = {};

let _checkString = function (str) {
   return typeof str === 'string' && str !== '';
};
let _getDataType = function (data) {
   return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};
let _request = function (requstKey, resInfo, cb) {
   let adv_key = requstKey.join();
   G_Strategy.doAdvMgr('getAdvListPlat', {
      adv_key,
      success: res => {
         if (res.Status === 200) {
            console.log('==后端返回的后羿数据', res);

            let infos = res.Result.Info;
            if (_getDataType(infos) === 'object') {
               Object.assign(_allInfo, infos);
               requstKey.forEach(key => {
                  resInfo[key] = infos[key];
               });
               typeof cb === 'function' && cb(resInfo);
            }
         } else {
            console.warn('**后羿广告数据请求失败', res);
            typeof cb === 'function' && cb({});
         }
      },
      fail: err => {
         console.warn('**后羿广告数据请求失败', err);
         typeof cb === 'function' && cb({});
      }
   });
};

class _ADVManager {
   constructor() { }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   getIconButtons(advKey, cb) {
      if (_checkString(advKey)) {
         let resInfo = {};
         let requstKey = [];
         let arr = advKey.split(',');
         arr.forEach(key => {
            if (_checkString(key)) {
               if (Array.isArray(_allInfo[key])) {
                  resInfo[key] = _allInfo[key];
               } else {
                  resInfo[key] = null;
                  requstKey.push(key);
               }
            }
         });
         // console.log(
         //    '---内存中有保存好的后羿广告数据否：', '\n',
         //    JSON.stringify(resInfo),
         // );

         if (requstKey.length > 0) {
            _request(requstKey, resInfo, cb);
         } else {
            typeof cb === 'function' && cb(resInfo);
         }
      } else {
         console.warn('**请求后羿数据广告位置参数错误');
         typeof cb === 'function' && cb({});
      }

   }
}


// export
module.exports = _ADVManager;