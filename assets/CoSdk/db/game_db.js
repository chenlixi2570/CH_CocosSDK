import { csgw } from "csgw_db";
var _db = csgw;

var _GameDB = (function () {
   var _instance;

   function init() {
      // body...

      var _loaded = false;
      var _onLoadCbs = [];
      var _dbs = {};
      var _configs = null;
      if (!window.G_chSdk) {
         return console.warn('**请在全局变量中增加 G_chSdk');
      }
      cc.loader.loadResDir('conf/db', function (err, assets, urls) {
         for (let i = 0; i < assets.length; i++) {

            let class_name = assets[i].name;
            let content_str = assets[i].text;

            // save
            if (class_name != '' && content_str != '' && _db[class_name]) {
               let serialize_btyes = G_chSdk.HexString2Uint8Array(content_str);
               let conf = new _db[class_name].decode(serialize_btyes);

               if (conf) {
                  _dbs[class_name] = conf;
               }
            }
         }

         // mark loaded
         _loaded = true;

         for (let j = 0; j < _onLoadCbs.length; j++) {
            _onLoadCbs[j]();
         }

         _onLoadCbs = [];
      });

      return {
         isLoaded: function () {
            // body...
            return _loaded;
         },

         registerAll: function (configs) {
            // body...
            if (configs) {
               _configs = configs;

               for (let i = 0; i < _configs.length; i++) {
                  let info = _configs[i];
                  if (info && typeof info.key !== "undefined") {
                     if (info.getFunc === true) {
                        let funcName = "get" + info.key + "ByID";
                        this[funcName] = function (id) {
                           // body...
                           return this.getConfigByID("TB" + info.key, id);
                        }.bind(this);
                     }

                     if (info.getAllFunc === true) {
                        let funcName = "getAll" + info.key + "s";
                        this[funcName] = function () {
                           // body...
                           let cfgs = this.getConfigs("TB" + info.key);

                           if (cfgs) {
                              return cfgs.list;
                           }
                           else {
                              return [];
                           }
                        }.bind(this);
                     }
                  }
               }
            }
         },

         // register load finished callback
         onLoad: function (loadCb) {
            // body...
            if (loadCb != null && "function" == typeof loadCb) {
               if (this.isLoaded()) {
                  loadCb();
               }
               else {
                  _onLoadCbs[_onLoadCbs.length] = loadCb;
               }
            }
         },

         addDB: function (cls_name, cfg) {
            // body...
            if (cfg) {
               var conf_list = this.getConfigs("TB" + cls_name);

               if (typeof conf_list === "undefined") {
                  _dbs["TB" + cls_name] = new hcddw["TB" + cls_name];
                  conf_list = _dbs["TB" + cls_name];
               }

               if (conf_list) {
                  var list = conf_list.list;
                  list.push(cfg);
               }
            }
         },

         replaceDB: function (cls_name, id, cfg) {
            // body...
            if (cfg) {
               var conf_list = this.getConfigs("TB" + cls_name);

               if (conf_list) {
                  var list = conf_list.list;

                  for (var i = 0; i < list.length; i++) {
                     var conf = list[i];

                     if (conf && conf.id === id) {
                        list[i] = cfg;
                     }
                  }
               }
            }
         },


         getConfigByID: function (cls_name, id) {
            // body...
            var conf_list = this.getConfigs(cls_name);

            if (conf_list) {
               var list = conf_list.list;

               for (var i = 0; i < list.length; i++) {
                  var conf = list[i];

                  if (conf && conf.id === id) {
                     return conf;
                  }
               }
            }

            return null;
         },

         getConfigs: function (cls_name) {
            // body...
            if (cls_name == null || cls_name == '') {
               return null;
            }

            if (!this.isLoaded()) {
               return null;
            }
            else {
               return _dbs[cls_name];
            }
         },
         getAllCfgs() {
            return _dbs;
         }
      };
   }

   return {
      getInstance: function () {
         if (!_instance) {
            _instance = init();
         }

         return _instance;
      }
   };
})();

// export
module.exports = {
   db: _db,
   ins: _GameDB
};