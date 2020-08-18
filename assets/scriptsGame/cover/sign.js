/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      listNode: cc.Node,
      doubleBtn: cc.Node,
      btn: cc.Button,
      _clickLock: false,
   },

   onLoad() {
      this._initData();
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
   },

   onEnable() {
      this.btnStatus();
   },
   onClose() {
      G_UIManager.hideUI('sign');
   },
   setLabelString(node, name, str) {
      let nLabel = G_chSdk.seekNodeByName(node, name);
      let cLabel = nLabel.getComponent(cc.Label);
      if (str.indexOf(',') !== -1) {
         let arr = str.split(',');
         let isUnlock = G_chInfo.includeSkin(+arr[0]);
         if (isUnlock) {
            cLabel.string = arr[1];
         } else {
            cLabel.string = '';
         }
      } else {
         cLabel.string = str;
      }
   },
   _initData() {
      let data = G_GameDB.getAllSignConfigs();
      console.log('签到配置数据', data);

      if (!data || !this.listNode) return;

      this.listNode.children.forEach((item, i) => {
         if (item.name != 'sign_item') return;
         let info = data[i];
         item.sign_type = info.type;
         item.sign_count = info.count;
         if (i <= 5) {
            this.setLabelString(item, 'finishNum', info.count);
            this.setLabelString(item, 'normalNum', info.count);
         } else if (i == 6) {
            let count = info.count.split(',');
            // 第七天神秘皮肤
            /*
            this.setLabelString(item, 'finishNum1', count[0]);
            this.setLabelString(item, 'normalNum1', count[0]);
            this.setLabelString(item, 'finishNum2', count[1]);
            this.setLabelString(item, 'normalNum2', count[1]);
            */
         }
         this.receiveStatus(item, i);
      });
   },
   // 是否已经签到完成
   btnStatus() {
      if (this.canReceive()) {
         this.doubleBtn.active = true;
         this.btn.node.active = true;
         this._clickLock = false;
      } else {
         this.doubleBtn.active = false;
         this.btn.node.active = false;
         this._clickLock = true;
         G_UIManager.showUI('showToast', '今天已领取奖励，明天再来哦！！');
      }
   },
   // 领取状态
   receiveStatus(node, i) {
      let finishNode = G_chSdk.seekNodeByName(node, 'finish');
      if (!(finishNode instanceof cc.Node)) return;
      let finishIdx = G_chInfo.getSevenLen();
      if (i < finishIdx) {

         finishNode.active = true;
      } else {
         finishNode.active = false;
      }
   },
   // 当天是否有机会领取奖励
   canReceive() {
      return !G_chInfo.todayIsSign();
   },
   // 保存当日领取状态
   saveReceive() {
      G_chInfo.setSignInfo();
   },
   // 领取按钮被点击
   onSignClick() {
      if (this._clickLock) return;
      this._clickLock = true;
      // 直接领取奖励
      if (this.canReceive()) {
         this.receiveSuccess(1);
      } else {
         G_UIManager.showUI('showToast', '今天已领取奖励，明天再来哦！！');
      }
   },
   // 双倍按钮被点击
   onDoubleClick() {
      if (this.canReceive()) {
         this.receiveSuccess(2);
      } else {
         G_UIManager.showUI('showToast', '今天已领取奖励，明天再来哦！！');
      }
   },
   // 领取奖励成功
   receiveSuccess(n = 1) {
      let data = G_GameDB.getAllSignConfigs();
      let finishIdx = G_chInfo.getSevenLen();
      let info = data[finishIdx];
      if (!info) return;
      // 先保存签到状态
      this.saveReceive();
      // 然后更新页面显示
      this.receiveStatus(this.listNode.children[finishIdx], finishIdx);

      if (info.type == 0) {
         // 保存钻石
         let total = +(info.count * n);
         if (Number.isNaN(total)) return;
         G_chInfo.plusGem(total);
         let str = '恭喜获得' + total + '钻石';
         G_UIManager.showUI('showToast', str);
      }
      else if (info.type == 1) {
         // 保存体力
         let total = +(info.count * n);
         if (Number.isNaN(total)) return;
         G_chInfo.plusPhysical(total);
         let str = '恭喜获得' + total + '体力';
         G_UIManager.showUI('showToast', str);
      }
      else if (info.type == 2) {
         // 保存 钻石和体力
         let count = info.count.split(',');
         let phys = count[0] * n;
         let gem = count[1] * n;
         if (Number.isNaN(gem) || Number.isNaN(phys)) return;
         G_chInfo.plusGem(gem);
         G_chInfo.plusPhysical(phys);
         let str = `恭喜获得${phys}体力和${gem}钻石`;
         G_UIManager.showUI('showToast', str);
      }
      else if (info.type == 3) {
         // 保存金币
         let total = +(info.count * n);
         if (Number.isNaN(total)) return;
         G_chInfo.plusCoin(total);
         let str = '恭喜获得' + total + '金币';
         G_UIManager.showUI('showToast', str);
      }
      else if (info.type == 4) {
         // 获得皮肤
         let str = info.count;
         if (str.indexOf(',') !== -1) {
            let arr = str.split(',');
            let isUnlock = G_chInfo.includeSkin(+arr[0]);
            if (isUnlock) {
               // 皮肤已解锁得金币
               let total = +(arr[1] * n);
               if (Number.isNaN(total)) return;
               G_chInfo.plusCoin(total);
               let str = '恭喜获得' + total + '金币';
               G_UIManager.showUI('showToast', str);
            } else {
               G_chInfo.setUnlockSkin(+arr[0]);
               G_UIManager.showUI('skinUnlock', () => {
                  G_chInfo.setCurrSkin(+arr[0]);
               }, +arr[0]);
            }
         }
      }
      // 最后关闭签到页面
      this.scheduleOnce(() => {
         this.onClose();
      }, 0.5);
   },
   addGem(total) {
      total = parseFloat(total);
      if (Number.isNaN(total)) return;
      G_chInfo.plusGem(total);
   },
   addPhys(total) {
      total = parseFloat(total);
      if (Number.isNaN(total)) return;
      G_chInfo.plusPhysical(total);
   }
});
