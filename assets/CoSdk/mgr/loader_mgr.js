/**
 * 加载远程线上的资源
 * 先尝试动态资源文件夹，如无，则加载远程，
 * 这两者的文件目录结构要一致
 */
let LoaderMgr = (function () {
   let assetsUrl = require('global_const').HttpConf.assetsUrl;

   let _instance = {
      /**
       * 先尝试取动态资源，未成功尝试线上
       * @param {string} path 图片名称加路径 不带后缀
       * @param {function} cb 
       */
      autoLoadSf(path, cb) {
         this.loadSf(path, (sf) => {
            if (sf instanceof cc.SpriteFrame) {
               typeof cb === 'function' && cb(sf);
            }
            else {
               this.loadRemoteSf(path, cb);
            }
         });
      },
      /**
       * 取动态资源中的图片
       * @param {string} path 图片名称加路径 不带后缀
       * @param {function} cb 
       */
      loadSf(path, cb) {
         cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (spriteFrame instanceof cc.SpriteFrame) {
               typeof cb == "function" && cb(spriteFrame);
            } else {
               console.warn('**取动态资源图片失败', err);
               typeof cb === 'function' && cb(null);
            }
         });
      },
      /**
       * 取线上服务器的图片
       * @param {string} path 图片名称加路径 不带后缀
       * @param {function} cb 
       */
      loadRemoteSf(path, cb) {
         let remotePath = assetsUrl + path + ".png";
         cc.loader.load(remotePath, (err, texture) => {
            if (texture instanceof cc.Texture2D) {
               // console.log('==取线上图片', texture);
               let spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
               typeof cb == "function" && cb(spriteFrame);
            } else {
               console.warn('**取线上图片失败', err);
               typeof cb === 'function' && cb(null);
            }
         });
      },
      /**
       * 先尝试动态资源，再尝试线上，音频
       * @param {string} url 音频名称加路径 不带后缀
       * @param {function} cb 
       */
      autoLoadAudio(url, cb) {
         this.loadAudio(url, (clip) => {
            if (clip instanceof cc.AudioClip) {
               typeof cb === 'function' && cb(clip);
            } else {
               this.loadRemoteAudio(url, cb);
            }
         });
      },
      /**
       * 获取动态资源中的音频
       * @param {string} url 音频名称加路径 不带后缀
       * @param {function} cb 
       */
      loadAudio(url, cb) {
         cc.loader.loadRes(url, cc.AudioClip, (err, clip) => {
            if (clip instanceof cc.AudioClip) {
               typeof cb === "function" && cb(clip);
            } else {
               console.warn('**取动态资源音频失败', err);
               typeof cb === "function" && cb(null);
            }
         });
      },
      /**
       * 获取线上音频
       * @param {string} url 音频名称加路径 不带后缀
       * @param {function} cb 
       */
      loadRemoteAudio(url, cb) {
         let remotePath = assetsUrl + url + ".mp3";
         cc.loader.load(remotePath, (err, clip) => {
            if (clip instanceof cc.AudioClip) {
               typeof cb === 'function' && cb(clip);
            }
            else {
               console.warn('**取线上音频失败', err);
               typeof cb === "function" && cb(null);
            }
         });
      },
      /**
       * 
       * @param {string} path JSON 名称加路径，不带后缀
       * @param {*} cb 
       */
      loadJson(path, cb) {
         cc.loader.loadRes(path, cc.JsonAsset, (err, object) => {
            if (err) {
               console.warn('**取动态资源中的JSON失败', err);
               let remotePath = assetsUrl + path + '.json';
               cc.loader.load(remotePath, (err, object) => {
                  if (err) {
                     console.warn('**取线上JSON失败', err);
                     typeof cb === "function" && cb(null);
                  }
                  else {
                     typeof cb === 'function' && cb(object);
                  }
               });
            } else {
               typeof cb === 'function' && cb(object.json);
            };
         });
      },
      /**动态加载预制体 */
      loadPrefab(path, cb) {
         cc.loader.loadRes(path, function (err, prefab) {
            if (prefab instanceof cc.Prefab) {
               typeof cb === "function" && cb(prefab);
            }
            else {
               console.warn(path + " load wrong !!", err);
               typeof cb === "function" && cb(null);
            }
         });
      },
      /**
       * 将动态资源或线上图集打包的大图通过json裁剪成小图
       * @param {string} jsonPath json路径 带 .json 后缀
       * @param {string} imgPath 图片路径， 不带后缀，必须是png
       * @param {function} cb 取图片成功参数为对象，不成功参数为空
       */
      convertJsonAtlas(jsonPath, imgPath, cb) {
         let result = {};
         this.autoLoadSf(imgPath, (sf) => {
            if (sf instanceof cc.SpriteFrame) {

               this.loadJson(jsonPath, (data) => {

                  if (G_chSdk.isObject(data) && Array.isArray(data.frames)) {
                     data.frames.forEach(info => {
                        // let osize = sf.getOriginalSize();
                        let name = info.filename.split(".")[0];
                        let frame = info.frame;
                        let rect = cc.rect(frame.x, frame.y, frame.w, frame.h);
                        result[name] = this.cutSpriteFrameByRect(sf, rect);
                        // result[name].sf.rectData = frame;
                     });
                     typeof cb === 'function' && cb(result);
                  }
                  else {
                     typeof cb === 'function' && cb(null);
                  }
               });

            }
            else {
               typeof cb === 'function' && cb(null);
            }
         });
      },
      /**
       * 裁切出一张图上的rect区域，返回sf
       * @param {cc.SpriteFrame} spriteframe 
       * @param {cc.Rect} rect 
       */
      cutSpriteFrameByRect(spriteframe, rect) {
         let texture = spriteframe.getTexture();
         let newSf = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
         newSf.setRect(rect);
         return newSf;
      },
      loadDragonBone(node, dbName) {
         var dragonDisplay = node.getComponent(dragonBones.ArmatureDisplay);

         var imageUrl = `${assetsUrl}dragonBones/${dbName}_tex.png`;
         var skeUrl = `${assetsUrl}dragonBones/${dbName}_ske.json`;
         var atlasUrl = `${assetsUrl}dragonBones/${dbName}_tex.json`;
         cc.loader.load(imageUrl, (error, texture) => {
            cc.loader.load({ url: atlasUrl, type: 'txt' }, (error, atlasJson) => {
               cc.loader.load({ url: skeUrl, type: 'txt' }, (error, dragonBonesJson) => {
                  var atlas = new dragonBones.DragonBonesAtlasAsset();
                  atlas._uuid = atlasUrl;
                  atlas.atlasJson = atlasJson;
                  atlas.texture = texture;

                  var asset = new dragonBones.DragonBonesAsset();
                  asset._uuid = skeUrl;
                  asset.dragonBonesJson = dragonBonesJson;

                  dragonDisplay.dragonAtlasAsset = atlas;
                  dragonDisplay.dragonAsset = asset;

                  dragonDisplay.armatureName = 'Armature';
                  dragonDisplay.playAnimation('Idle', 0);
               });
            });
         });
      }
   };

   return () => {
      return _instance;
   };
})();

module.exports = LoaderMgr;