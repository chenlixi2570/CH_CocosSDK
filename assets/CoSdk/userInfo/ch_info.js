let _CH_INFO = (function () {
   function _getBaseSingle() {
      let base_single = [];

      base_single.push(require('user_info').getInstance());
      base_single.push(require('cfg_info').getInstance());
      base_single.push(require('coin_info').getInstance());
      base_single.push(require('free_info').getInstance());
      base_single.push(require('level_info').getInstance());
      base_single.push(require('sign_info').getInstance());
      base_single.push(require('skin_info').getInstance());

      return base_single;
   }

   let _instance = {};

   let base_single = _getBaseSingle();

   base_single.forEach(single => {
      let keys = Object.keys(single);
      for (const fnName of keys) {
         if (typeof single[fnName] === 'function') {
            _instance[fnName] = function (...args) {
               return single[fnName].call(single, ...args);
            };
         }
         else {
            _instance[fnName] = single[fnName];
         }
      }
   });
   // console.log('==G_chInfo', _instance);
   return () => {
      return _instance;
   };
})();

module.exports = _CH_INFO;