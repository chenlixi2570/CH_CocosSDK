// 最大可同步下载数量
var MAX_DOWNLOADING_COUNT = 8;
var DIR_NAME_OF_DOWNLOAD = "download";
var _instance;

class _Downloader {
   constructor() {
      // body...
      this._downloadingList = {};
      this._waitingList = [];
      this._inited = false;
      this._downloadingList.count = 0;
      this.init();
   }
   static getInstance() {
      if (!_instance) {
         _instance = new this;
      }

      return _instance;
   }
   init() {
      // body...
      if (window.wx) {
         let rootDir = this._getDownloadRootDir();
         let fs = wx.getFileSystemManager();

         try {
            fs.accessSync(rootDir);
            this._inited = true;
         }
         catch (e) {
            try {
               fs.mkdirSync(rootDir, true);
               this._inited = true;
            }
            catch (e) {
               // notify
               G_chSdk.dispatchEvent(G_Const.EventName.EN_SYSTEM_ERROR);
            }
         }
      }
   }

   // @param fileBody 存储路径（不含后缀）, 无效则随机生成
   // @param url 网络路径
   // @param cb(statusCode, progress, savePath) 回调
   // @cb param statusCode -1: 失败, 0: 正在下载, 1: 成功
   // @cb param progress 进度 statusCode为0时有效
   // @cb param savePath 存储路径
   download(fileBody, url, cb) {
      // body...
      if (G_chSdk.getPlatStr() === 'wx') {
         if (!this._isUrlValid(url)) {
            return;
         }

         let taskInfo = {
            fileBody: fileBody,
            url: url,
            task: null,
            cbs: []
         };
         taskInfo.cbs.push(cb);

         // push into wait list
         this._waitingList.push(taskInfo);

         // schedule
         if (!this._isScheduled()) {
            this._schedule();
         }
      } else {
         // 非微信环境下直接返回网络地址
         typeof cb === 'function' &&
            cb(1, 1, url);
      }
   }

   _isUrlValid(url) {
      // body...
      if (typeof url !== "string" || url.indexOf("https://") !== 0) {
         console.warn("Download Url Error, Check Input: " + url);
         return false;
      }

      return true;
   }

   _doDownload(taskInfo) {
      // body...
      if (taskInfo) {
         let _taskInfo = this._downloadingList[taskInfo.url];

         if (typeof _taskInfo !== "undefined") {
            for (let i = 0; i < taskInfo.cbs.length; i++) {
               _taskInfo.cbs.push(taskInfo.cbs[i]);
            }

            return;
         }
         else {
            if (window.wx) {
               let saveFilePath = this._makeSaveFilePath(taskInfo.fileBody, taskInfo.url);

               if (this._isTargetFileExist(saveFilePath)) {
                  // succ
                  this._doCallback(taskInfo, 1, undefined, saveFilePath);
               }
               else {
                  var self = this;

                  taskInfo.task = window.wx.downloadFile({
                     url: taskInfo.url,
                     filePath: saveFilePath,
                     success(res) {
                        // body...
                        if (res.statusCode === 200) {
                           // succ
                           self._doCallback(taskInfo, 1, undefined, saveFilePath);
                        }
                        else {
                           // fail
                           self._doCallback(taskInfo, -1);
                        }
                     },
                     fail(res) {
                        // body...
                        // fail
                        self._doCallback(taskInfo, -1);
                     },
                     complete(res) {
                        // body...
                        if (typeof self._downloadingList[taskInfo.url] !== "undefined") {
                           delete self._downloadingList[taskInfo.url];
                           self._downloadingList.count -= 1;
                        }
                     }
                  });

                  taskInfo.task.onProgressUpdate(function (res) {
                     // body...
                     // progress
                     self._doCallback(taskInfo, 0, res.progress);
                  });

                  // add into downloading list
                  this._downloadingList[taskInfo.url] = taskInfo;
                  this._downloadingList.count += 1;
               }
            }
            else {
               this._doCallback(taskInfo, -1);
            }
         }
      }
   }

   _doCallback(taskInfo, statusCode, progress, savePath) {
      // body...
      if (taskInfo) {
         for (let i = 0; i < taskInfo.cbs.length; i++) {
            let cb = taskInfo.cbs[i];

            if (typeof cb === "function") {
               cb(statusCode, progress, savePath);
            }
         }
      }
   }

   _update() {
      // body...
      if (!this._inited) {
         return;
      }

      if (this._downloadingList.count >= MAX_DOWNLOADING_COUNT) {
         console.warn("Max Download Connections, Waiting...");
         return;
      }

      if (this._waitingList.length > 0) {
         this._doDownload(this._waitingList[0]);
         this._waitingList.splice(0, 1);
      }
      else {
         // unschedule
         this._unschedule();
      }
   }

   _isTargetFileExist(filePath) {
      // body...
      if (window.wx) {
         if (typeof filePath === "string" && filePath !== "") {
            try {
               let fs = wx.getFileSystemManager();
               fs.accessSync(filePath);

               return true;
            }
            catch (e) {
               return false;
            }
         }
         else {
            return false;
         }
      }
      else {
         return false;
      }
   }

   _makeSaveFilePath(body, url) {
      // body...
      if (window.wx) {
         let ext = url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2);

         if (typeof body === "string" && body !== "") {
            return this._getDownloadRootDir() + "/" + body + "." + ext;
         }
         else {
            return this._getDownloadRootDir() + "/" + hex_md5(url) + "." + ext;
         }
      }
      else {
         return url;
      }
   }

   _getDownloadRootDir() {
      // body...
      if (window.wx) {
         return window.wx.env.USER_DATA_PATH + "/" + DIR_NAME_OF_DOWNLOAD;
      }
      else {
         return url;
      }
   }

   _schedule() {
      // body...
      if (this._isScheduled()) {
         return;
      }
      let scheduler = cc.director.getScheduler();
      scheduler.enableForTarget(this);
      scheduler.schedule(this._update, this, 0, cc.macro.REPEAT_FOREVER, 0, false);
   }

   _isScheduled() {
      // body...
      let scheduler = cc.director.getScheduler();
      scheduler.enableForTarget(this);
      return scheduler.isScheduled(this._update, this);
   }

   _unschedule() {
      // body...
      let scheduler = cc.director.getScheduler();
      scheduler.enableForTarget(this);
      scheduler.unschedule(this._update, this);
   }
};


// export
module.exports = _Downloader;
