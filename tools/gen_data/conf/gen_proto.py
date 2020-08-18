#coding=utf-8
#此文件中的所有数据用来存储基础通用的数据配置

import sys

from protodef import *

_OUTPUT_NAME_OF_PROTO_FILE = 'qy_db.proto'
_NAMESPACE_OF_PROTO_DATA = 'qy'

if __name__ == '__main__':
	db_proto = _OUTPUT_NAME_OF_PROTO_FILE
	namespace_proto = _NAMESPACE_OF_PROTO_DATA

	if len(sys.argv) >= 2:
	    db_proto = sys.argv[1]

	if len(sys.argv) > 2:
	    namespace_proto = sys.argv[2]

	pdFileDef(db_proto, namespace_proto)

	pdEnumDef('BaseConfigIDs')
	# **** 以下为框架相关，勿主动修改 ****
	pdE(n='BC_NET_ADDR',v='1',cn=u'Net服务器地址')
	pdE(n='BC_SHOT_NAME',v='2',cn=u'游戏英文简写名，请跟服务器地址的前缀保持一致')
	pdE(n='BC_HTTP_ADDR_OF_SERVER',v='3',cn=u'Http服务器地址')
	pdE(n='BC_HTTP_ADDR_OF_PATCH_PACKAGE',v='4',cn=u'patch包的下载地址')
	pdE(n='BC_APP_VERSION',v='5',cn=u'app版本')
	pdE(n='BC_PATCH_VERSION',v='6',cn=u'patch版本')
	pdE(n='BC_MINI_PROGRAM_ID',v='7',cn=u'小程序ID（微信）')
	pdE(n='BC_MINI_PROGRAM_APP_ID',v='8',cn=u'小程序AppID')
	pdE(n='BC_MINI_PROGRAM_APP_SECRET',v='9',cn=u'小程序AppSecret')
	pdE(n='BC_QQ_MINI_PROGRAM_APP_ID',v='10',cn=u'QQ小程序AppID')
	pdE(n='BC_QQ_MINI_PROGRAM_APP_SECRET',v='11',cn=u'QQ小程序AppSecret')
	pdE(n='BC_OPPO_MINI_PROGRAM_APP_ID',v='12',cn=u'OPPO小程序AppID')
	pdE(n='BC_OPPO_MINI_PROGRAM_APP_SECRET',v='13',cn=u'OPPO小程序AppSecret')
	pdE(n='BC_VIVO_MINI_PROGRAM_APP_ID',v='14',cn=u'VIVO小程序AppID')
	pdE(n='BC_VIVO_MINI_PROGRAM_APP_SECRET',v='15',cn=u'VIVO小程序AppSecret')
	pdE(n='BC_TT_MINI_PROGRAM_APP_ID',v='16',cn=u'TT小程序AppID')
	pdE(n='BC_TT_MINI_PROGRAM_APP_SECRET',v='17',cn=u'TT小程序AppSecret')
	pdE(n='BC_MAX_ADV_TIMES_OF_ONE_DAY',v='25',cn=u'每日最高领取视频奖励次数')
	# **** 以上为框架相关，勿主动修改 ****
	pdE(n='BC_BORN_COIN_NUM',v='101',cn=u'初始金币值')
	pdEnd()

	pdMsgDef('BaseConfig',tablePrefix='TB')
	pdR(t='uint32',n='id',cn=u'ID')
	pdO(t='uint32',n='num',cn=u'整数')
	pdO(t='uint32',n='decimal',cn=u'小数 = val / 1000.0f')
	pdO(t='string',n='str',cn=u'字符')
	pdEnd()

	pdEnumDef('UIWordIDs')
	# **** 以下为框架相关，勿主动修改 ****
	pdE(n='UIWORD_ID_APP_NAME',v='1',cn=u'游戏名称')
	pdE(n='UIWORD_ID_SYSTEM_ERROR_TITLE',v='2',cn=u'网络错误')
	pdE(n='UIWORD_ID_SYSTEM_ERROR_CONTENT',v='3',cn=u'网络连接异常，请稍后重试')
	pdE(n='UIWORD_ID_SYSTEM_ERROR_RELOAD_GAME',v='4',cn=u'重新启动')
	pdE(n='UIWORD_ID_SYSTEM_ERROR_EXIT_GAME',v='5',cn=u'退出游戏')
	pdE(n='UIWORD_ID_QQ_PLATFORM_NAME',v='6',cn=u'QQ')
	pdE(n='UIWORD_ID_WX_PLATFORM_NAME',v='7',cn=u'微信')
	pdE(n='UIWORD_ID_SDK_NOT_SUPPORT_FORMAT',v='8',cn=u'很抱歉，{0}版本太低啦，无法使用此功能！')
	pdE(n='UIWORD_ID_NOT_FINISHED_YET',v='9',cn=u'很抱歉，该功能暂未开放')
	pdE(n='UIWORD_ID_PLAYER_BLOCKED_TITLE',v='10',cn=u'账号异常')
	pdE(n='UIWORD_ID_PLAYER_BLOCKED_CONTENT',v='11',cn=u'请规范您的游戏行为，您的账号数据存在异常，无法正常游戏！')
	pdE(n='UIWORD_ID_VIDEO_NOT_SUPPORT',v='12',cn=u'很抱歉，当前暂无合适的奖励视频播放，请稍后重新尝试')
	pdE(n='UIWORD_ID_SHARE_SUCCESS',v='13',cn=u'分享成功')
	pdE(n='UIWORD_ID_ADV_SUCCESS',v='14',cn=u'观看奖励视频完成')
	pdE(n='UIWORD_ID_ADV_FAIL',v='15',cn=u'奖励视频未观看完成，无法领取奖励')
	pdE(n='UIWORD_ID_ADV_NOT_FINISH_CONTENT',v='16',cn=u'观看完整的视频才可获得游戏奖励')
	pdE(n='UIWORD_ID_ADV_NOT_FINISH_CANCEL_TEXT',v='17',cn=u'稍后观看')
	pdE(n='UIWORD_ID_ADV_NOT_FINISH_CONFIRM_TEXT',v='18',cn=u'重新观看')
	pdE(n='UIWORD_ID_NO_MORE_REWARD',v='19',cn=u'很抱歉，今日奖励已经达到上限')
	pdE(n='UIWORD_ID_UNIT_DAY',v='20',cn=u'天')
	pdE(n='UIWORD_ID_UNIT_WEEK',v='21',cn=u'星期')
	pdE(n='UIWORD_ID_UNIT_HOUR',v='22',cn=u'小时')
	pdE(n='UIWORD_ID_UNIT_MINUTE',v='23',cn=u'分钟')
	pdE(n='UIWORD_ID_VIDEO_NOT_READY_YET',v='24',cn=u'暂无奖励视频播放，请稍后重新尝试')
	pdE(n='UIWORD_ID_FORMAT_OF_VIDEO_NOT_READY_YET',v='25',cn=u'奖励视频还未准备好，请{0}秒后重新尝试')
	pdE(n='UIWORD_ID_INSTALL_SHORTCUT_SUCCESS',v='26',cn=u'创建桌面图标成功')
	pdE(n='UIWORD_ID_NOT_SUPPORT_ON_IOS_PLATFORM',v='27',cn=u'很抱歉，iOS平台用户暂不支持')
	pdE(n='UIWORD_ID_SHARE_FAIL_TIPS_ONE',v='1001',cn=u'请不要一直打扰同一个群')
	pdE(n='UIWORD_ID_SHARE_FAIL_TIPS_TWO',v='1002',cn=u'请分享到不同的群聊中')
	pdE(n='UIWORD_ID_SHARE_FAIL_TIPS_THREE',v='1003',cn=u'只有分享到群中才可以获得奖励')
	# **** 以上为框架相关，勿主动修改 ****
	pdE(n='UIWORD_ID_LACK_OF_COIN',v='101',cn=u'很抱歉，金币不够了')
	pdEnd()

	pdMsgDef('UIWord',tablePrefix='TB')
	pdR(t='uint32',n='id',cn=u'ID')
	pdR(t='string',n='word',cn=u'字符')
	pdEnd()

	pdMsgDef('NetError',tablePrefix='TB')
	pdR(t='uint32',n='id',cn=u'ID')
	pdR(t='string',n='word',cn=u'字符')
	pdEnd()

	# 配置数据
	pdMsgDef('SettingConfig')
	pdR(t='bool',n='isSoundOn',cn=u'是否开启声音')
	pdR(t='bool',n='isMuteOn',cn=u'是否开启震动')
	pdEnd()

	# 玩家信息数据结构
	pdMsgDef('PlayerInfo')
	# **** 以下为框架相关，勿主动修改 ****
	pdR(t='string',n='openID',cn=u'玩家openID')
	pdR(t='string',n='sessID',cn=u'玩家sessID')
	pdR(t='string',n='userID',cn=u'玩家userID')
	pdR(t='uint32',n='lastSaveTime',cn=u'上次保存时间')
	pdR(t='string',n='nickname',cn=u'昵称')
	pdR(t='uint32',n='sex',cn=u'性别')
	pdR(t='string',n='headUrl',cn=u'网络头像地址')
	pdR(t='uint32',n='shareTimesOfToday',cn=u'今天分享次数')
	pdR(t='uint32',n='recordDayOfShareTimes',cn=u'记录分享次数天次（本年的）')
	pdR(t='uint32',n='advTimesOfToday',cn=u'今天广告次数')
	pdR(t='uint32',n='recordDayOfAdvTimes',cn=u'记录广告次数天次（本年的）')
	pdR(t='SettingConfig',n='setting',cn=u'配置数据')
	# **** 以上为框架相关，勿主动修改 ****
	pdR(t='string',n='coin',cn=u'金币')
	pdR(t='string',n='totalCoin',cn=u'总金币')
	pdEnd()

	# print
	print("The Proto File Has Just Generated, File Name: %s" % db_proto)