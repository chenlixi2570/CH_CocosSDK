var ALD_QQ_GAME_CONFIG = {
	app_key: "", //请在此行填写从阿拉丁后台获取的appkey
	getLocation: false, //默认不获取用户坐标位置
	useOpen: true, //默认不启用，是否启用openid计算，开启后必须上传openid，否则数据不会上报。
	openKey: "key_of_qy_ald_open_id" //storage中的openid对应的key, SDK提供了通过读缓存的中openid来上传openid,需要配置缓存中openid对应的key
}

// export
// export {ALD_QQ_GAME_CONFIG as default}
module.exports = ALD_QQ_GAME_CONFIG