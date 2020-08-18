// 动态获取图集资源中的图片管理类

let AtlasFramesMgr = (function () {
   let _allAtlasPath = {};// 图片所属资源路径缓存

   function _getFramePath(imgName) {
      if (_allAtlasPath[imgName]) {
         return _allAtlasPath[imgName];
      } else {
         let all = G_GameDB.getAllAtlasConfigs();
         Array.isArray(all) && all.forEach(item => {
            let key = item.imgNm.includes('.') ? item.imgNm.split('.')[0] : item.imgNm;
            _allAtlasPath[key] = item.atlas;
         });
         return _allAtlasPath[imgName];
      }
   }

   let _instance = {
      /**
       * 传入图片名，从动态资源的图集中查找图片
       * 查找失败使用 loader_mgr 类中的方法去oos上查找
       */
      getFrameByName(imgName, cb) {
         return new Promise((resolve, reject) => {
            // console.log(`==开始从动态图集中查找图片${imgName}`);
            this.getAtlasByName(imgName, (assets) => {
               if (assets instanceof cc.SpriteAtlas) {
                  let frame = assets.getSpriteFrame(imgName);
                  if (frame instanceof cc.SpriteFrame) {
                     typeof cb === 'function' && cb(frame);
                     resolve(frame);
                     return;
                  }
               }
               typeof cb === 'function' && cb(null);
               reject();
            });
         });
      },
      /**
       * 获取图片所在图集
       * @param {string} imgName 图片名称，不含后缀
       * @param {function} cb 回调函数
       * @returns {promise}
       */
      getAtlasByName(imgName, cb) {
         return new Promise((resolve, reject) => {
            let atalsPath = _getFramePath(imgName);
            // console.log(`==图片${imgName}所在图集为${atalsPath}`);

            if (G_chSdk.checkString(atalsPath)) {
               cc.loader.loadRes(
                  atalsPath,
                  cc.SpriteAtlas,
                  (err, assets) => {
                     if (assets instanceof cc.SpriteAtlas) {
                        typeof cb === 'function' && cb(assets);
                        resolve(assets);
                     }
                     else {
                        console.warn('***加载图集目录错误...', err);
                        typeof cb === 'function' && cb(null);
                        reject();
                     }
                  }
               );
            } else {
               typeof cb === 'function' && cb(null);
               reject();
            }
         });
      },
   };
   return () => {
      return _instance;
   };
})();


module.exports = AtlasFramesMgr;