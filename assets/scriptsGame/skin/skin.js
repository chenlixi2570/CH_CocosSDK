/*
 * @Author: Chen Li Xi
 * @Description: 皮肤界面
 */
let Cls_BasePopup = require("base_popup");
let _allSkinData = null;
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      taskBtn: cc.Node, // 广告获得按钮
      buyBtn: cc.Node, // 金币购买按钮
      notBtn: cc.Node, // 已选择不可点击按钮
      giveTip: cc.Node, // 只赠送提示
      taskLable: cc.Label,
      buyLable: cc.Label,
      _skinId: 0,
      _skinData: null, // 当前选中的皮肤数据
   },

   onLoad() {
      this.setAllSkinData();
      this.listenerEv();
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      G_chSdk.registerBtnClick(this, 'buyBtn', this.onBuy);
   },
   setAllSkinData() {
      if (!_allSkinData) {
         _allSkinData = G_GameDB.getAllSkinConfigs();
         console.log('==所有皮肤数据', _allSkinData);
         Array.isArray(_allSkinData) && G_chInfo.setAllSkin(_allSkinData);
      }
   },

   onEnable() {
      G_chSdk.dispatchEvent('click_skin_select', G_chInfo.getCurrSkin());
   },
   onClose() {
      G_UIManager.hideUI('skin');
   },
   totalCb() {
      let total = G_chInfo.getAllSkinLen() / 6; // 皮肤一页放几个
      return {
         total: Math.ceil(total),
         curr: 0
      };
   },
   // 解锁当前选定的皮肤
   unlockSkin() {
      let isUnlock = G_chInfo.includeSkin(this._skinId);
      if (!isUnlock && Number.isInteger(this._skinId)) {
         G_chInfo.setUnlockSkin(this._skinId);
         G_UIManager.showUI('skinUnlock', () => {
            this.setCurrSkinUse(); // 更新正在使用的皮肤
         }, this._skinId);
      }
   },
   // 金币购买得到皮肤
   buySkinByCoin() {
      let buy = +this._skinData.buy;
      if (G_chInfo.canMinusCoin(buy)) {
         G_chInfo.minusCoin(buy);
         this.unlockSkin();
      } else {
         G_UIManager.showUI('showToast', () => {
            // console.log('showToast 关闭');

            G_UIManager.showUI('gainCoin');
         }, '金币不足！！');
      }
   },
   // 金币购买按钮点击
   onBuy() {
      this.buySkinByCoin();
   },
   // 广告任务得到皮肤
   taskSkinByAdv() {
      let count = G_chInfo.getSkinTaskCount(this._skinData.flag);
      count = G_chSdk.isNumber(count) ? count : 0;
      let task = this._skinData.task - count;
      if (task <= 0) {
         // 可以解锁
         this.unlockSkin();
      }
      else {
         let str = '还需要完成' + task + '次任务才可获得皮肤哦！！';
         G_UIManager.showUI('showToast', str);
      }
   },
   // 广告任务成功
   onTaskSucc() {
      G_chInfo.saveSkinTaskCount(this._skinData.flag);
      this.updateTaskLabel(); //更新按钮信息
      this.taskSkinByAdv(); // 查询是否可以解锁皮肤
   },
   // 广告任务失败
   onTaskFail() { },

   // 更新按钮信息
   updateBtnInfo() {

      let isUnlock = G_chInfo.includeSkin(this._skinId);
      if (isUnlock) {
         // 解锁只显示已选择按钮
         G_chSdk.hideThatNode(this.buyBtn);
         G_chSdk.hideThatNode(this.taskBtn);
         G_chSdk.hideThatNode(this.giveTip);
         G_chSdk.showThatNode(this.notBtn);
      } else {
         G_chSdk.hideThatNode(this.notBtn);
         if (this._skinData && this._skinData.onlyGive == 1) {
            // 未解锁只赠送显示赠送提示
            G_chSdk.showThatNode(this.giveTip);
            G_chSdk.hideThatNode(this.buyBtn);
            G_chSdk.hideThatNode(this.taskBtn);
         }
         else {
            // 未解锁只能购买显示购买按钮
            G_chSdk.showThatNode(this.buyBtn);
            G_chSdk.showThatNode(this.taskBtn);
            G_chSdk.hideThatNode(this.giveTip);

            if (this.buyLable instanceof cc.Label && this._skinData) {
               this.buyLable.string = this._skinData.buy;
            }
            this.updateTaskLabel();

         }

      }
   },
   // 广告任务次数信息更新
   updateTaskLabel() {
      if (this.taskLable instanceof cc.Label && this._skinData) {
         let count = G_chInfo.getSkinTaskCount(this._skinData.flag);
         count = G_chSdk.isNumber(count) ? count : 0;
         let task = this._skinData.task - count;
         task = task < 0 ? 0 : task;
         this.taskLable.string = task;
      }
   },
   selectSkin(skinId) {
      this._skinId = skinId;
      this._skinData = G_chInfo.getSkinDataByIndex(this._skinId);

      console.log('当前选择的皮肤数据', this._skinId, this._skinData);
      this.updateBtnInfo();
      // 如果当前皮肤是已经解锁的，则立即选择当前皮肤为正在使用的皮肤
      this.setCurrSkinUse();
   },
   setCurrSkinUse() {
      if (G_chInfo.includeSkin(this._skinId)) {
         G_chInfo.setCurrSkin(this._skinId);
         G_chSdk.dispatchEvent('update_curr_use_skin');// 更新正在使用的皮肤
      }
   },
   listenerEv() {
      G_chSdk.addEventListener(
         'click_skin_select',
         this.selectSkin,
         this
      );
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         'click_skin_select',
         this.selectSkin,
         this
      );
   },
});
