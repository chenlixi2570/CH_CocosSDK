/**
 * 网络功能
 * 不要在页面头部引用，在函数内引用
 */
let _instance = null;
let _initedCbs = [];
let _netType = 'wifi';

class _Network_Helper {
   constructor() {
      return _instance || (_instance = this);
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   onNetWorkChange(netType) {
      // console.log('==监听网络状态改变', netType);

      _netType = netType;
   }
   initNetwork(netType) {
      // console.log('==初始网络状态', netType);

      _netType = netType;
      for (let i = 0; i < _initedCbs.length; i++) {
         _initedCbs[i](_netType);
      }
      _initedCbs = [];
   }

   /**
    * 是否联网
    * @param {function} cb 
    */
   isConnected(cb) {
      if (_netType !== null) {
         typeof cb === 'function' && cb(_netType !== 'none');
      }
      else {
         _initedCbs.push(function () {
            cb(_netType !== 'none');
         });
      }
   }

}

module.exports = _Network_Helper;