/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let testInfo = {
   adId: "5382e0ad-6652-422f-8dfe-a6fb84773f29",
   clickBtnTxt: "点击查看",
   creativeType: 7,
   desc: "拼多多拼着买才便宜",
   icon: "adv_pic/advicon",
   interactionType: 1,
   logoUrl: "",
   title: "拼多多",
   imgUrlList: [
      "adv_pic/advicon"
   ]
};
cc.Class({
   extends: cc.Component,

   properties: {
      sImg: cc.Sprite, // 广告图片精灵
      lTitle: cc.Label, // 广告标题
      lDesc: cc.Label // 广告描述
   },

   onLoad() {
      this.nativeAd = null; // 原生广告对象
      this.advInfo = {};
      G_chSdk.registerBtnClick(this, this.node.name, this.advClick);
   },
   onEnable() {
      // console.log("==尝试显示浮动原生广告");
      if (CC_DEBUG) {
         this.loadTestNat();
         return;
      }

      this.loadNat();
   },
   loadNat() {
      this.onClose();
      G_Strategy.doAdvMgr('destroyNative');
      G_Strategy.doAdvMgr('naOnLoad', advInfo => {
         if (G_chSdk.isObject(advInfo)) {
            this.advInfo = advInfo;
            G_Strategy.doAdvMgr('reportAdShow');
            this.updateNode();
         }
      });
      return;
      this.nativeAd = G_Strategy.doAdvMgr('createFloatNative');
      if (this.nativeAd) {
         // 有广告对象尝试加载广告数据
         this.nativeAd.onLoad((res) => {
            // console.log('==浮动原生广告加载', res.adList);
            if (res.adList.length > 0) {
               this.advInfo = res.adList[0];
               this.reportAdShow();
               this.updateNode();
            }
         });
         this.nativeAd.onError(function (err) {
            // console.log('==浮动原生广告err', err);
         });
         this.nativeAd.load();
      }

   },
   onClose(isShow = false) {
      let child = this.node.children;
      Array.isArray(child) && child.forEach(node => {
         if (node instanceof cc.Node && node.active == !isShow) {
            node.active = isShow;
         }
      });
   },
   updateNode() {
      if (this.lTitle instanceof cc.Label) {
         this.lTitle.string = this.advInfo.title ? this.advInfo.title : '';
      }
      if (this.lDesc instanceof cc.Label) {
         this.lDesc.string = this.advInfo.desc ? this.advInfo.desc : '';
      }
      let imgUrl = this.advInfo.imgUrlList[0];
      if (G_chSdk.checkString(imgUrl))
         cc.loader.load(imgUrl, (err, texture) => {
            this.loadImgSucc(err, texture);
         });
   },
   loadImgSucc(err, texture) {
      if (err) {
         // console.log('==oppo原生广告图未加载', err);
      } else {
         // 成功时显示广告
         // console.log('==oppo原生广告图加载成功', texture);
         let advFrame = new cc.SpriteFrame(texture);
         this.onClose(true);
         if (this.sImg instanceof cc.Sprite) {
            this.sImg.spriteFrame = advFrame;
            G_chAction.tadaAction(this.node);
         }
      }
   },
   advClick() {
      // console.log('==开始上报浮动原生广告');
      //先上报点击 上报成功后再次更新广告对象
      G_Strategy.doAdvMgr('reportAdClick', () => {
         // 最后再更新广告数据
         G_Strategy.doAdvMgr('destroyNative');
         G_Strategy.doAdvMgr('createNativeAsync');
      });
   },
   /**
    * 上报广告曝光
    */
   reportAdShow() {
      let adId = this.advInfo.adId;
      // console.log('==浮动原生上报曝光', adId);
      if (typeof adId === 'string' && adId !== '') {
         this.nativeAd && this.nativeAd.reportAdShow({ adId });
      }
   },
   /**
    * 上报广告点击
    */
   reportAdClick() {
      let adId = this.advInfo.adId;
      // console.log('==浮动原生上报点击', adId);
      if (typeof adId === 'string' && adId !== '') {
         this.nativeAd && this.nativeAd.reportAdClick({ adId });
         // 再更新广告数据
         // this.loadNat();
      }
   },
   // 测试函数
   loadTestNat() {
      if (this.lTitle instanceof cc.Label) {
         this.lTitle.string = testInfo.title;
      }
      if (this.lDesc instanceof cc.Label) {
         this.lDesc.string = testInfo.desc;
      }
      let imgUrl = testInfo.icon;
      cc.loader.loadRes(imgUrl, (err, texture) => {
         this.loadImgSucc(err, texture);
      });
   },
});
