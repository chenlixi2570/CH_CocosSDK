/*
 * @Author: Chen Li Xi
 * @Description: 后羿广告方案B基类
 */
let G_ADVManager = require('adv_manager').getInstance();
let { IssuePlat } = require('global_const');
let { QY } = require('adv_const');
if (IssuePlat === 'oppo') {
   QY = require('adv_const').QY_OPPO;
}
if (IssuePlat === 'tt') {
   QY = require('adv_const').QY_TT;
}
// 广告位置
let ADV_locat = QY.locatEnum;
let ADV_appkey = QY.locatA;

let BaseAdvB = cc.Class({
   extends: cc.Component,
   properties: {
      advLocat: {
         type: ADV_locat,
         default: ADV_locat.index,
         tooltip: '对应广告位置 advkey,值是数组'
      },
      btnPrefab: {
         default: null,
         type: cc.Prefab,
         tooltip: '广告按钮预制件'
      },
      btnPadding: {
         default: cc.v2(0, 0),
         tooltip: 'x: 按钮X轴间隔，y: 按钮Y轴间隔'
      },
      cancelCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '跳转广告时用户点击取消后的回调'
      },
      successCB: {
         default: [],
         type: cc.Component.EventHandler,
         tooltip: '跳转广告成功的回调'
      },
      _allAdvInfo: [],
      _baseBtnWH: null
   },
   _getAdv(cb) {
      let isExport = G_Strategy.doPlatform('isExportAdvEnabled');
      let advKey = ADV_appkey.join();
      console.log(`==后羿广告位置${advKey}, 广点通屏蔽${isExport} `);
      if (!advKey || !isExport) {
         typeof cb === 'function' && cb(null);
         return;
      };

      if (CC_DEBUG) {
         this._allAdvInfo = this.getTestArr();
         typeof cb === 'function' && cb(this._allAdvInfo);
         console.log('==后羿广告测试数组', this._allAdvInfo);
      } else {
         G_ADVManager.getIconButtons(
            advKey,
            infos => {
               let key = ADV_appkey[this.advLocat];
               let infoList = infos[key];
               if (Array.isArray(infoList) && infoList.length > 0) {
                  this._allAdvInfo = infoList;
                  console.log('==后羿系统返回的广告数据', this._allAdvInfo);
                  typeof cb === 'function' && cb(infoList);
               } else {
                  typeof cb === 'function' && cb(null);
               }
            }
         );
      }
   },

   /**
    * 获取广告按钮宽高
    */
   _getBtnWH() {
      let result = cc.size(0, 0);
      if (this._baseBtnWH instanceof cc.Size) {
         result = this._baseBtnWH;
      } else if (this.btnPrefab instanceof cc.Prefab) {
         result = this._baseBtnWH = cc.instantiate(this.btnPrefab).getContentSize();
      }
      return result;
   },
   _createBtn(advInfo, index = -1) {
      if (!(this.btnPrefab instanceof cc.Prefab)) return null;
      let result = cc.instantiate(this.btnPrefab);
      result._clickSuccess = this.successCB;
      result._clickFail = this.cancelCB;
      result.allAdvInfo = this._allAdvInfo;
      result.btnPadding = this.btnPadding;
      result.advInfo = advInfo;
      result.indexBtn = index; // 用于广告标题背景

      return result;
   },
   _createAllBtns() {
      let result = this._allAdvInfo.map((info, i) => {
         let node = this._createBtn(info, i);
         return node;
      });

      let nodes = result.filter(node => node instanceof cc.Node);
      // console.log('所有广告按钮', nodes);

      return nodes;
   },
   // 绘制广告
   getTestArr() {
      let result = [
         {
            adv_id: "2367",
            appid: "wxa74c4ea773cdb9a6",
            effect_type: 1,
            flag_type: "1",
            logo_url: "adv_pic/advicon",
            path: "?cp_id=177",
            title: "人人当枪神"
         },
         {
            adv_id: "2366",
            appid: "wx51cd8ce8f6aae78b",
            effect_type: 1,
            flag_type: "2",
            logo_url: "adv_pic/advicon",
            path: "",
            title: "王者坦克手",
         },
         {
            adv_id: "2365",
            appid: "wxccad312b6eb6d15f",
            effect_type: 0,
            flag_type: "1",
            logo_url: "adv_pic/advicon",
            path: "?key=a1ca4dfd78",
            title: "赛车对决"
         },
         {
            adv_id: "2364",
            appid: "wxeee627401171c2a3",
            effect_type: 0,
            flag_type: "2",
            logo_url: "adv_pic/advicon",
            path: "pages/index/index?channe=csfl&ald_media_id=24492&ald_link_key=d3b3fb7ab736e034",
            title: "更多好玩"
         }
      ];
      return result;
      // return [...result, ...result, ...result];
   }
});
   // 获取广告列表 函数改写，弃用
/*
_getAdvOld(cb) {
   let str = ADV_appkey[this.advLocat];
   if (!str) return;
   if (IssuePlat === 'wx') {
      let G_Strategy = require('strategy').getInstance();
      let isExport = G_Strategy.doPlatform('isExportAdvEnabled');
      if (isExport) {
         console.log('后羿广告请求数据key ', str);
         G_ADVManager.getIconButtons(str, (data) => {
            console.log('后羿广告返回数据', data);
            let infos = data[str];
            this.requestDataSucc(infos, cb);
         });
      }
   } else if (IssuePlat === 'oppo' && window.qg) {
      console.log('后羿广告请求数据key ', str);
      qg.h_GetAdvListPlat && qg.h_GetAdvListPlat({
         adv_key: str,
         success: res => {
            console.log('请求结果', res);
            if (res.Status == 200) {
               let infos = res.Result.Info[str];
               this.requestDataSucc(infos, cb);
            }
         },
         fail: res => {
            console.warn('广告数据请求失败', res);
            typeof cb === 'function' && cb(null);
         }
      });
   } else {
      console.log('---非微信与pc下不显示后羿导出广告');
      typeof cb === 'function' && cb(null);
   }
},
requestDataSucc(infos, cb) {
   let advArr = infos;

   let len = Array.isArray(advArr) ? advArr.length : 0;
   if (len > 0) {
      this._allAdvInfo = advArr;
      typeof cb === 'function' && cb(advArr);
   }
},

*/