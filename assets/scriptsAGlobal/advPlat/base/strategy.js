/*
 * @Author: Chen Li Xi
 * @Description: 策略类，用于适配不同的功能平台
 */

let _instance = null;
let Platform = null;
let AdvMgr = null;

class _Strategy {
   constructor() {
      return _instance || (_instance = this);
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   _init() {
      // let platStr = G_chSdk.getPlatStr(); // 测试 base_adv_mgr
      let platStr = G_Const.IssuePlat;
      if (platStr === 'wx') {
         Platform = require('wx_plat').getInstance();
         AdvMgr = require('wx_adv_mgr').getInstance();
      }
      else if (platStr === 'oppo') {
         Platform = require('oppo_plat').getInstance();
         AdvMgr = require('oppo_adv_mgr').getInstance();
      }
      else if (platStr === 'qq') {
         Platform = require('qq_plat').getInstance();
         AdvMgr = require('qq_adv_mgr').getInstance();
      }
      else if (platStr === 'tt') {
         Platform = require('tt_plat').getInstance();
         AdvMgr = require('tt_adv_mgr').getInstance();
      }
      else if (platStr === 'vivo') {
         Platform = require('vivo_plat').getInstance();
         AdvMgr = require('vivo_adv_mgr').getInstance();
      }
      else {
         Platform = require('base_plat').getInstance();
         AdvMgr = require('base_adv_mgr').getInstance();
      }
   }
   /**
    * 执行平台功能
    */
   doPlatform() {
      let args = [...arguments];
      // console.log('==策略类传入参数', args);
      let fnName = args.shift();
      if (
         typeof fnName === 'string' &&
         fnName !== '' &&
         typeof Platform[fnName] === 'function'
      ) {
         return Platform[fnName](...args);
      }
      return null;
   }
   /**
    * 执行平台广告
    */
   doAdvMgr() {
      let args = [...arguments];
      // console.log('==策略类传入参数', args);
      let fnName = args.shift();
      if (
         typeof fnName === 'string' &&
         fnName !== '' &&
         typeof AdvMgr[fnName] === 'function'
      ) {
         return AdvMgr[fnName](...args);
      }
      return null;
   }
}

module.exports = _Strategy;