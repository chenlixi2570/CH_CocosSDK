let _instance = null;
let _allPropData = null;
class _PropMgr {
   constructor() {
      if (!_instance) {
         _instance = this;
      }
      return _instance;
   }
   initPropData(_lvData) {
      _allPropData = {};
      let propD = JSON.parse(_lvData.prop);
      Array.isArray(propD) && propD.forEach(item => {
         let data = G_chSdk.checkString(item.prop) && JSON.parse(item.prop);
         if (G_chSdk.isObject(data)) {
            Object.assign(_allPropData, data);
         }
      });
      console.log('所有道具数据', _allPropData);
   }
   getPropDataByName(name) {
      if (_allPropData[name]) {
         return _allPropData[name];
      }
      else {
         return null;
      }
   }
   getNodePtORSz(data) {
      let result = [0, 0];
      if (G_chSdk.checkString(data)) {
         let arr = data.split(',');
         arr = arr.map(it => {
            let val = parseFloat(it);
            return Number.isNaN(val) ? 0 : val;
         });
         if (arr.length > 2) {
            arr.length = 2;
         }
         else if (arr.length === 0) {
            arr = result;
         }
         else if (arr.length === 1) {
            arr[1] = 0;
         }

         result = arr;
      }

      return result;
   }
}

module.exports = new _PropMgr;