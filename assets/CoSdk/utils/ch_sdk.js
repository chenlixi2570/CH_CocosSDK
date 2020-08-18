let _CH_SDK = (function () {
   function _getBaseSingle() {
      let base_single = [];

      base_single.push(require('cc_request')());
      base_single.push(require('cc_sysInfo')());
      base_single.push(require('event')());
      base_single.push(require('qy_server')());
      base_single.push(require('frame_mgr')());
      base_single.push(require('js_utils').getInstance());
      base_single.push(require('date_utils').getInstance());
      base_single.push(require('geom_utils').getInstance());
      base_single.push(require('rely_utils').getInstance());
      base_single.push(require('phys_utils').getInstance());
      base_single.push(require('cc_utils').getInstance());
      base_single.push(require('loader_mgr')());
      base_single.push(require('animate_module')());
      base_single.push(require('sound_mgr')());
      base_single.push(require('vibrate_mgr')());

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
   // console.log('==G_chSdk', _instance);
   return () => {
      return _instance;
   };
})();

module.exports = _CH_SDK;