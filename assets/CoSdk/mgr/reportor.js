/*
* 全局上报
* 支持多种后台同时上报
*/
let _instance;
let _eventNames = {};
let _reportors = [];

class _Reportor {
   constructor() {
      return _instance || (_instance = this);
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   // eventNames 为字符串对象
   registerAllEvents(eventNames) {
      if (eventNames && typeof eventNames === 'object') {
         _eventNames = eventNames;
      }
   }

   init() {
      if (G_chInfo.isAldReportEnabled()) {
         this.enable("ald");
         if (G_chSdk.getPlat() && typeof G_chSdk.getPlat().aldSendOpenid === "function") {
            // load ald sdk succ
            let open_id = G_chSdk.getOpenId();
            G_chSdk.getPlat().aldSendOpenid(open_id);
         }
      }
      G_chInfo.isQyReportEnabled() && this.enable("qy");
   }

   // 启用对应的上报, 趣游始终上报，ald 按后台比例上报
   enable(type) {
      if (type === "ald") {
         G_chSdk.isWX() && require('ald-game')(); // 阿拉丁上报看概率打开
         G_chSdk.isQQ() && require('ald-qq-game').init();

         if (G_chSdk.getPlat() && G_chSdk.getPlat().aldSendEvent) {
            _reportors.push({
               type: type,
               sender: G_chSdk.getPlat().aldSendEvent
            });
         }
      } else if (type === "qy") {
         // 趣游上报默认打开
         if (G_chSdk.isWX()) {
            require('qy')();
         }
         else {
            require('qy-plat').init();
         }

         if (G_chSdk.getPlat() && G_chSdk.getPlat().h_SendEvent) {
            _reportors.push({
               type: type,
               sender: G_chSdk.getPlat().h_SendEvent
            });
         }
      }
   }

   /**
    * 上报
    * jsonObj 参数格式必须为{'参数key' : '参数value'}
    * @param {*} eventName 
    * @param {*} jsonObj  参数格式必须为{'参数key' : '参数value'}
    */
   report(eventName, jsonObj) {
      if (jsonObj && !(jsonObj instanceof Object)) {
         console.warn("A Valid Param Must Be A Type Of Json Object.");
         return;
      }

      if (!jsonObj) {
         jsonObj = undefined;
      }

      this._doReport(eventName, jsonObj);
   }

   _doReport(eventName, jsonObj) {
      // body...
      for (let i = 0; i < _reportors.length; i++) {
         let reportor = _reportors[i];

         if (typeof reportor.sender === "function") {
            reportor.sender(eventName, jsonObj);
         }
      }

      console.log(`Report Event ${eventName} Succ!`);
   }

   _checkEventName(eventName) {
      // body...
      for (let key in _eventNames) {
         if (_eventNames[key] === eventName) {
            return true;
         }
      }

      if (eventName) {
         console.warn("Do Not Support Event Which Is Not Defined In Register EventNames, Event Name: {0}.".format(eventName));
      }
      else {
         console.warn("Do Not Support Event Which Is Not Defined In Register EventNames, Event Name: undefined.");
      }

      return false;
   }
   /**
    * 上报关卡开始
    */
   reportLevelStart() {
      if (G_chSdk.isWX()) {
         let levelId = G_chInfo.getCurrLevel() + 1;
         let userId = G_chInfo.getOpenId();
         // console.log(`==阿拉丁上报用户${userId}第${levelId}关开始`);
         wx.aldStage.onStart({
            stageId: levelId,
            stageName: '第' + levelId + '关',
            userId: userId,
         });
      }
   }
   /**
    * 上报关卡结束
    * @param {string} isPass fail | complete
    * @param {string} desc 描述
    */
   reportLevelEnd(isPass = 'complete', desc = '') {
      if (G_chSdk.isWX()) {
         let levelId = G_chInfo.getCurrLevel() + 1;
         let userId = G_chInfo.getOpenId();
         // console.log(`==阿拉丁上报用户${userId}第${levelId}关结束状态${isPass}`);
         wx.aldStage.onEnd({
            stageId: levelId,    //关卡ID 该字段必传
            stageName: "第" + levelId + "关", //关卡名称  该字段必传
            userId: userId,  //用户ID 可选
            event: isPass,   //关卡完成  
            params: {
               desc    //描述
            }
         });
      }
   }
};


// export
module.exports = _Reportor;