var isShowModal = false

if (qq.loadSubpackage) {
	qq.loadSubpackage({
		name: 'sub',
		success: function( res ) {
			console.log("load sub package success...")
		},
		fail: function( res ) {
			if (isShowModal) {
				return
			}
			isShowModal = true
			
			console.log(res)
			console.log("load sub package fail...")
			let obj = {
				title: "网络错误",
				content: "网络连接异常，请稍后重试",
				showCancel: false,
				success (res) {
					isShowModal = false
					qq.exitMiniProgram()
				}
			}

			qq.showModal(obj)
		}
	})
}
else {
	require("../sub/game.js")
}