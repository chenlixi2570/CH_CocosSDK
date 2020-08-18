var { AppId } = require('global_const');
// oppo
var tjconf = {
   // OPPO小游戏的appid
   app_key: AppId.oppo,
   company: "quyou"
};

// qq
if (typeof window.qq !== "undefined") {
   // qq小游戏的appid
   tjconf.app_key = AppId.qq;
}

// tt
if (typeof window.tt !== "undefined") {
   // tt小游戏的appid
   tjconf.app_key = AppId.tt;
}

// vivo
if (typeof window.qg !== "undefined" && (window.qg.getProvider().toLowerCase().indexOf("vivo") > -1)) {
   // VIVO小游戏的appid
   tjconf.app_key = AppId.vivo;
}


// export
module.exports = tjconf;
// export { tjconf };