/*
 * @Author: Chen Li Xi
 * @Description: 后羿广告按钮组件方案B
 */
let Downloader = require("downloader").getInstance();
let onceMgr = require('adv_once_mgr')();
let _titBgFrames = null; // 保存标题背景

cc.Class({
   extends: cc.Component,
   properties: {
      iconSprite: cc.Sprite,
      titBg: cc.Sprite, // 广告标题背景节点
      titLabel: cc.Label, // 广告标题文字节点
   },
   onLoad() {
      this.node.updateNode = this.updateNode.bind(this);
      if (!this.node.advInfo) return;
      this.clickAdLock = false; // 防止重复点击
      G_chSdk.registerBtnClick(this, this.node.name, this.clickAd);
      this._setAdInfo();
      this.updateNode();
   },
   updateNode() {
      this.advInfo = this.node.advInfo;
      this.loadImg();
      this.updateTit();
   },
   /**
    * 第二版广告数据传递方式采用节点对象传输
    */
   _setAdInfo() {
      this._clickSuccess = this.node._clickSuccess;
      this._clickFail = this.node._clickFail;
      this.allAdvInfo = this.node.allAdvInfo;
   },
   // 点击事件
   clickAd(e) {
      console.log('==后羿广告被点击');
      if (this.clickAdLock) return;
      this.clickAdLock = true;

      // let advInfo = this.advInfo;
      let advInfo = onceMgr.getNotSkipAdvInfo(this.advInfo, this.allAdvInfo);
      console.log('==原广告数据', this.advInfo);
      console.log('==查询是否跳转过后的广告数据', advInfo);
      if (CC_DEBUG) {
         let eventHandlerArr = this._clickFail;
         console.log(eventHandlerArr, 656565);

         Array.isArray(eventHandlerArr)
            && eventHandlerArr.forEach(item => {
               item instanceof cc.Component.EventHandler
                  && item.emit();
            });
         // 取消 切换广告
         onceMgr.saveSkipAppid(advInfo.appid);
         // this.toggerAdv();
         this.clickAdLock = false;
      }
      if (advInfo && !CC_DEBUG) {
         let toMin = {
            adv_id: advInfo.adv_id || '',
            appId: advInfo.appid || '',
            path: advInfo.path || '',
            pkgName: advInfo.appid,
            success: res => {
               // console.log('用户跳转成功后的返回值：', res);
               onceMgr.saveSkipAppid(advInfo.appid);
               let eventHandlerArr = this._clickSuccess;
               Array.isArray(eventHandlerArr)
                  && eventHandlerArr.forEach(item => {
                     item instanceof cc.Component.EventHandler
                        && item.emit();
                  });
            },
            fail: err => {
               // console.log('用户取消跳转后微信返回的信息是：', err);
               if (err.errMsg == 'navigateToMiniProgram:fail cancel') {
                  let eventHandlerArr = this._clickFail;
                  Array.isArray(eventHandlerArr)
                     && eventHandlerArr.forEach(item => {
                        item instanceof cc.Component.EventHandler
                           && item.emit();
                     });
                  // 切换广告
                  // this.toggerAdv();
               }
            },
            complete: () => {
               this.clickAdLock = false;
            }
         };
         // window.wx && wx.h_ToMinProgram && wx.h_ToMinProgram(toMin);
         let plat = {};
         if (G_chSdk.isQQ()) {
            plat = window.qq;
         }
         else if (G_chSdk.isTT()) {
            plat = window.tt;
         }
         else if (typeof window.qg !== "undefined") {
            plat = window.qg;
         }
         else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            plat = window.wx;
         }
         plat.h_ToMinProgram && plat.h_ToMinProgram(toMin);
      }
   },
   /**
    * 切换广告
    * 随机取得一份新的广告数据，然后更新图片与标题
    */
   toggerAdv() {
      let allAdv = this.allAdvInfo;
      if (!Array.isArray(allAdv) || allAdv.length === 0) return;
      let max = allAdv.length - 1;
      let index = G_chSdk.random(0, max);
      let advInfo = allAdv[index];

      if (advInfo) {
         this.advInfo = advInfo;
         this.updateNode();
         console.log('切换广告成功', index, advInfo.adv_id);
      }
   },

   // 加载远程图片
   loadImg() {
      let logo_url = this.getLogoUrl();
      if (!G_chSdk.checkString(logo_url)) return;

      if (CC_DEBUG) { // 测试使用本地图片
         cc.loader.loadRes(logo_url, (err, texture) => {
            this.loadSucc(err, texture);
         });
      } else {
         // cc.loader.load(logo_url, (err, texture) => {
         //    this.loadSucc(err, texture);
         // });
         Downloader.download(
            null,
            logo_url,
            (statusCode, progress, relativePath) => {
               // console.log('下载图片', statusCode, relativePath);
               statusCode == 1 &&
                  cc.loader.load(
                     relativePath,
                     (err, texture) => {
                        this.loadSucc(err, texture);
                     }
                  );
            }
         );
      }
   },
   loadSucc(err, texture) {
      if (err) {
         console.warn('广告图片加载失败：', err);
         this.notAdvImg();
      } else {
         // console.log('---后羿广告图片加载成功', texture);
         this.updateIconNode(texture);
      }
   },
   getLogoUrl() {
      let advInfo = this.advInfo;
      let logo_url = '';
      if (typeof advInfo.logo_url === 'string') {
         logo_url = advInfo.logo_url;
      } else if (
         Array.isArray(advInfo.logo_url) &&
         advInfo.logo_url.length >= 1
      ) {
         let index = G_chSdk.random(0, advInfo.logo_url.length - 1);
         logo_url = advInfo.logo_url[index];
      }

      return logo_url;
   },
   /**
    * 当加载远程图片失败时处理
    */
   notAdvImg() {
      this.node.active = false;
   },
   /**
    * 更新广告图片
    * @param {cc.Texture2D} texture 
    */
   updateIconNode(texture) {
      if (!this.node.active) {
         this.node.active = true;
      }
      if (!(texture instanceof cc.Texture2D)) return;
      let advFrame = new cc.SpriteFrame(texture);

      if (this.iconSprite instanceof cc.Sprite) {
         this.iconSprite.spriteFrame = advFrame;
      }
   },
   /**
    * 更新广告标题
    */
   updateTit() {
      if (this.titLabel instanceof cc.Label) {
         let advInfo = this.advInfo;
         let title =
            typeof advInfo.title == 'string'
               && advInfo.title != ''
               ? advInfo.title
               : '更多好玩!';
         this.titLabel.string = title;
      }
      if (this.titBg instanceof cc.Sprite) {
         this.getTitbgFrams((frames) => {
            let idx = this.node.indexBtn;
            if (Number.isInteger(idx)) {
               idx %= frames.length;
            } else {
               idx = G_chSdk.random(0, frames.length - 1);
            }
            let frame = frames[idx];
            this.titBg.spriteFrame = frame;
         });
      }
   },
   getTitbgFrams(cb) {
      if (Array.isArray(_titBgFrames)) {
         typeof cb === 'function' && cb(_titBgFrames);
      } else {
         cc.loader.loadRes(
            'adv_pic/advPic',
            cc.SpriteAtlas,
            (err, atlas) => {
               if (err) {

               } else {
                  _titBgFrames = G_chSdk.get_frames(atlas, 'advTit');
                  typeof cb === 'function' && cb(_titBgFrames);
               }
            });
      }
   }
});