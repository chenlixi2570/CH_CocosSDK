/** 
chsdk 主要命名空间
 */
declare namespace G_chSdk {
   /* -------------- es_utils.js ---------------*/
   /**
    * 返回数据类型字符串
    * null undefined string number array boolean
    * symbol set map date regexp weakmap weakset promise
    * @param {any} value 
    */
   export function dataType(value: any): string;

   /**
    * 是否为数字
    * @param {any} data 
    */
   export function isNumber(data: any): boolean;

   /**
    * 是否为整数
    * @param {any} data 
    */
   export function isInt(data: any): boolean;
   /**
    * 是否为简单类型值 string number boolean null undefined
    * @param {any} data 
    */
   export function isSimpleValue(data: any): boolean;

   /**
    * 是否为复合类型值 object array function date regexp set map ...
    * @param {any} data 
    */
   export function isCompositeValue(data: any): boolean;

   /**
    * 检测参数是否为字符类型且不是空字符
    * @param {any} str 
    */
   export function checkString(str: any): boolean;
   /**
    * 将其他类型的数据转为数字 
    * Number parseInt parseFloat 三个函数对不同值转为数字存在差异
    * 本方法是为了消除这种差异
    * '' => 0; null => NaN; undefined => NaN; false => 0; true => 1
    * 任何复合类型值 => NaN
    * @param {any} data 
    */
   export function toNumber(data: any): number;
   /**
    * 生成随机整数
    * Math.randow 生成一个大于等于0.0并小于1.0的伪随机数
    * @param {number} min 
    * @param {number} max 
    */
   export function randomInt(min: number, max: number): number;
   /**
    * 生成随机整数
    * Math.randow 生成一个大于等于0.0并小于1.0的伪随机数
    * @param {number} min 
    * @param {number} max 
    */
   export function random(min: number, max: number): number;

   /**
    * 生成随机浮点数
    * 参数必需为 Number 类型的值，参数错误默认返回 0
    * @param {number} min 
    * @param {number} max 
    */
   export function randomDouble(min: number, max: number): number;

   /**
    * 生成指定位数的随机字符串 数字 大写字母 小写字母 组成
    */
   export function generateString(count: number = 32): string;

   /**
    * 递归删除对象下的某个属性 
    * @param {object or array} object 对象或数组
    * @param {string} prop 属性名
    * @returns {object or array} 
    */
   export function deleteProperty(object: object, prop: string): object;
   /**
    * 管理一组事物的状态, 
    * status_is_open: 查看某一个事物的状态
    * status_set_open: 设置该事物的状态为打开
    * status_set_close: 设置该事物的状态为关闭
    * @param {number} result ：当前状态 1 2 3 4 5 6 7 8
    * @param {number} target ：某一种状态的编码表示，该码值为 2 的幂 1，2，4，8
    */
   export function status_is_open(result: number, target: number);
   export function status_set_open(result: number, target: number);
   export function status_set_close(result: number, target: number);
   /**
    * 比较版本号
    * @param {string} v1  '1.11.2'
    * @param {string} v2  '1.9.9'
    * @retrun : 1 v1 > v2 | 0 v1 == v2 | -1 v1 < v2
    */
   export function compareVersion(v1: string, v2: string): number;

   /**
    * 是否为数组
    * @param data any
    */
   export function isArray(data: any): boolean;
   /**
    * 是否为字符类型
    * @param data any
    */
   export function isString(data: any): boolean;
   /**
    * 是否为Object 的实例
    * @param data any
    */
   export function isObject(data: any): boolean;


   /* -------------- tm_utils.js ---------------*/
   /**
    * 注册来自服务端获取 计算出与本地时间的偏差值 偏差值精确到毫秒
    * @param {number} serverTime 时间戳，单位精确到秒,
    */
   export function onRegisterServerTime(serverTime: number): boolean;
   /**
    * 获得当前时间戳 单位到毫秒
    */
   export function getServerTime(): number;
   /**
    * 返回当日字符串值
    * 例 20200118
    */
   export function getTodayStr(): string;
   /**
    * 获得当前时间对象 Date 的实例
    */
   export function getServerDate(): Date;
   /**
    * 当前是星期几 返回数字值
    */
   export function getCurServerDayOfWeek(): number;
   /**
    * 一月中的第几日
    */
   export function getCurServerDayOfMonth(): number;
   /**
    * 一年中的第几天
    */
   export function getCurServerDayOfYear(): number;
   /**
    * 一年中的第几周
    */
   export function getCurServerWeekOfYear(): number;
   /**
    * 格式化时间, 
    * 默认格式 2018年1月1日 01:02:03,
    * 当first = 2时日期格式为 2018/01/01 23:45:08
    * @param {Date} date 目标时间结构
    * @param {Boolean} first 是否需要年月日
    * @param {Boolean} last 是否需要当日时间
    */
   export function formatDate(date: Date, first: boolean, last: boolean): string;
   /**
   * 将秒数转化为时分制 
   */
   export function convertSecondToHourMinute(seconds: number): string;

   /**
   * 将秒数转化为时分秒制 
   */
   export function convertSecondToHourMinuteSecond(seconds: number): string;
   /**
    * 将星期数字转化为中文
    * 支持数字1-7
    */
   export function convertNumberToChinese(num: number): string;

   /*-------------- geom_utils --------------*/
   /**
    * 角度转弧度
    * @param {number} ang 
    */
   export function ang2rad(ang: number): number;
   /**
    * 弧度转角度
    * @param {number} ang 
    */
   export function rad2ang(rad: number): number;
   /**
    * 是否为坐标点对象
    * 该对象应该包含 x, y 两个属性，且x，y 的值必需是 Number 类型
    * @param {object} point 坐标点
    */
   export function isPoint(point: object): boolean;
   /**
    * 返回两个坐标点的距离
    * @param {object or cc.Vec2} pA 
    * @param {object or cc.Vec2} pB 
    */
   export function getMag(pA: object, pB: object): number;
   /**
    * 传入两个点，得到相对于x轴的角度
    * @param pA 
    * @param pB 
    */
   export function getXDeg(pA: object, pB: object): number;
   /**
    * 根据开始点与结束点，得到结束点围绕开始点360旋转的角度，
    * @param start 
    * @param end 
    */
   export function getRotate(start: object, end: object): number;
   /**
    * 传入开始点，长度，角度，得到下一点位置
    * @param startP 
    * @param len 
    * @param deg 
    */
   export function getNextPoint(startP: object, len: number, deg: number): object;
   /**
    * 传入开始点，长度，角度，得到上一点位置
    * @param startP 
    * @param len 
    * @param deg 
    */
   export function getPrevPoint(startP: object, len: number, deg: number): object;
   /**
    * 求两点的中点坐标
    * @param {object} pA 
    * @param {object} pB 
    */
   export function getCenterPoint(pA, pB)
   /**
    * 传入初始坐标与圆心坐标，以及旋转角度，顺时针角度值为正，逆时针角度值为负
    * 返回旋转之后的 a点对应的坐标值
    * @param {object} a {x:0, y:0} 初始坐标
    * @param {object} o {x:0, y:0} 圆心坐标
    * @param {number} angle 角度值 节点的rotation值
    */
   export function getRotateAnglePoint(a, o, angle);

   /*-------------- cc_sysInfo.js --------------*/
   export function getSystemInfo(): object;
   /**
    * 获取平台标识字符 pc wx qq tt vivo oppo
    */
   export function getPlatStr();
   /**
    * 平台API全局对象
    */
   export function getPlat()
   /**
    * 获得可视区像素宽高
    */
   export function getPxSize(): object;
   /**
    * 是否为苹果手机
    */
   export function isIphone(): boolean;
   /**
    * 是否为安卓手机
    */
   export function isAndroid(): boolean;
   /**
    * 当前是否在微信平台下
    */
   export function isWX(): boolean;
   /**
    * 当前是否在 OPPO 平台下
    */
   export function isOPPO(): boolean;
   /**
    * 当前是否在 VIVO 平台下
    */
   export function isVIVO(): boolean;
   /**
    * 当前是否在 QQ 平台下
    */
   export function isQQ(): boolean;
   /**
    * 当前是否在 头条 平台下
    */
   export function isTT(): boolean;

   /*-------------- cc_storage.js --------------*/
   /**
    * 获取本地缓存数据
    * 取值不成功时浏览器返回 null 而微信中返回空字符
    * @param {String} key 键名(全局唯一)，不能为空
    * @param {any} def 默认值，当取值不成功时返回
    */
   export function getStorage(key: string, def: any): string;

   /**
    * 存储本地缓存数据
    * @param {String} key 键名(全局唯一)，不能为空
    * @param {Any} data 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
    */
   export function setStorage(key: string, data: object);

   /**
    * 清除所有本地缓存数据
    */
   export function clearStorage();
   /**
    * 清除某一项本地缓存数据
    * @param {String} key 键名(全局唯一)，不能为空
    */
   export function removeStorage(key: string);

   /*-------------- cc_request.js --------------*/
   /**
    * 发送请求，失败重连三次
    * @param {string} url 请求地址
    * @param {string} header 请求头
    * @param {string} method 请求方法
    * @param {string/object} data 传递给后端数据
    */
   export function requestReconnect({ url, header, method, timeout, data, success, fail, complete } = {});

   /**
    * 发送请求
    * @param {string} url 请求路径 默认''
    * @param {string} method 请求方法 默认 POST
    * @param {string/object} data 发送数据 默认''
    * @param {string} header 请求头 默认'application/x-www-form-urlencoded' 
    * @param {number} timeout 超时时间，单位为毫秒
    * @param {function} success 请求成功回调函数
    * @param {function} fail 请求失败回调函数
    * @param {function} complete 接口调用结束的回调函数（调用成功、失败都会执行）
    * @return {xhr or null}
    */
   export function request({
      url = '',
      method = 'POST',
      data = '',
      header = 'application/x-www-form-urlencoded',  // application/json 
      timeout = 5000,
      success = res => { },
      fail = res => { },
      complete = res => { },
   } = {});

   /*-------------- ch_event.js --------------*/
   /**
       * 添加自定义事件函数 addEventListener 方法的别名
       * @param {string} event_name 自定义事件名
       * @param {function} listener 监听函数
       * @param {object} call_target 绑定域
       */
   export function on(event_name, listener, call_target = null);
   /**
    * 删除自定义事件监听函数，如第二、三参未传值，则删除该事件所有监听函数
    * removeEventListener 方法的别名
    * @param {string} event_name 自定义事件名
    * @param {function} listener 监听函数
    * @param {object} call_target 绑定域 
    */
   export function off(event_name, listener, call_target = null);
   /**
    * 添加自定义事件函数
    * @param {string} event_name 自定义事件名
    * @param {function} listener 监听函数
    * @param {object} call_target 绑定域
    */
   export function addEventListener(event_name: string, listener: function, call_target: object = null);
   /**
    * 删除自定义事件监听函数，如第二、三参未传值，则删除该事件所有监听函数
    * @param {string} event_name 自定义事件名
    * @param {function} listener 监听函数
    * @param {object} call_target 绑定域 
    */
   export function removeEventListener(event_name: string, listener: function, call_target: object = null);
   /**
    * 发布事件
    * @param {string} event_name 自定义事件名
    * @param  {...any} args 需要传递给监听函数的参数
    */
   export function dispatchEvent(event_name: string, ...args);
   /**
    * 事件名是否已经有监听函数了
    * @param {string} event_name 自定义事件名
    */
   export function hasEventListener(event_name: string);
   /**
    * 监听一个只触发一次的事件
    * 该事件全局只触发一次，事件触发前或触发后监听函数都会调用一次
    * 如果监听时，事件已经触发，则监听函数立即执行
    * 如果监听时，事件没有触发，则保存监听函数，等待事件触发后执行监听函数，
    * 监听函数执行完后会立刻销毁保存的监听函数
    */
   export function addEventOnce(event_name: string, listener: function, call_target: object = null);
   /**
    * 触发全局只能触发一次的事件
    */
   export function dispatchOnce(event_name: string, ...args);
   /*-------------- rely_utils.js --------------*/
   /**
    * 16进制字符转 protobuf 格式进制数组
    * @returns {Uint8Array}
    */
   export function HexString2Uint8Array(string: string): Uint8Array;

   /**
    * protobuf 格式进制数组转16进制字符
    * @returns {Hex String}
    */
   export function Uint8Array2HexString(uint8Arr: Uint8Array): string;
   /**
    * 将大数字转换为字符数字
    * k = 3个0, m = 6个0, b = 9个0, t = 12个0, 
    * aa = 15个0, bb = 18个0, cc = 21个0 ... zz = 246个0
    * @param bigNum 需要转换的数字
    * @param roundNum 转换后数据的有效位数
    */
   export function bigNumber2StrNumber(bigNum: number, roundNum: number);

   /*-------------- cc_utils.js --------------*/


   /**
    * 将世界坐标转化为OpenGL坐标 基于左下角坐标转为基于左上角
    */
   export function convertToOpenGLPt(worldPt: cc.Vec2);
   /**
    * 将世界Size转化为OpenGL的Size
    */
   export function convertToOpenGLSize(worldSize: cc.Size);
   /**
    * 将rgb字符数值创建 cc.Color
    * @param {string} colorStr '255,255,255'
    */
   export function createColor(colorStr: string);
   /**
    * 从预制资源或节点实例新的节点
    * @param {object} pool cc.NodePool
    * @param {object} prefab cc.Prefab || cc.Node
    */
   export function createNodeByObj(pool, prefab);

   /**
    * 创建随机颜色值
    */
   export function createRandomColor();
   /**
    * 创建测试节点
    * @param {*} item 
    * @param {*} spriteFrame 
    */
   export function createTestNode();
   /**
    * 下载网络资源
    */
   export function downloadAssets(url, succ, fail);
   /**
    * 下载网络图片
    */
   export function downloadImg(imgName, succ, fail);
   /**
    * 退出当前游戏
    */
   export function exitApp();
   /**
    * 将图集处理成spriteFram 与 name 对应的对象
    */
   export function getFramesDir(atlas);
   /**
    * 获取全局常驻节点
    * @param {string} tag 
    */
   export function getGlobalNode(tag: string);
   /**
    * 注册一个所有弹窗都可以共用的节点
    * @param {*} tag 
    * @param {*} node 
    */
   export function registerMoveParent(tag: string, node: cc.Node)
   /**
    * 根据标志取得所有弹窗都可共用的节点
    * @param {string} tag 
    */
   export function getMoveParentNode(tag: string): cc.Node;
   /**
    * 传入事件对象，将世界坐标转换为参数节点空间坐标
    * @param {cc.Event.EventTouch} ev 
    * @param {cc.Node} node 
    */
   export function getNodeSpacePosi(ev: cc.Event.EventTouch, node: cc.Node);

   /**
    * 将传入的节点定位到距离屏幕四边的位置
    * x 负为左，正为右 0居中
    * y 负为下，正为上 0居中
    * 返回该节点在父节点下的cocos位置
    */
   export function getWidgetPosition(node: cc.Node, x: number, y: number);
   /*
    * 得到图集中一个子集，子集中图片名字包含str
    * @param {cc.SpriteAtlas} atlas 
    * @param {string} str 
    * @returns {array}
    */
   export function get_frames(atlas: cc.SpriteAtlas, str: string, isSort: boolean);
   /**
    * 隐藏指定节点
    * @param {cc.Node} node 
    */
   export function hideThatNode(node: cc.Node);
   /**
    * 初始时间管理工具的时间戳为服务器时间
    * @param {function} cb 
    */
   export function initServerTime(cb: function);

   /**
    * 节点Button组件注册事件
    * @param {cc.Component} comp
    * @param {string} nodeName 节点 name
    * @param {function} lister 事件函数
    */
   export function registerBtnClick();
   /**
    * 注册场景常驻节点
    * @param {string} tag 
    * @param {cc.Node} node 
    */
   export function registerGlobalNode(tag: string, node: cc.Node);
   /**
   * 重置适配方式，长宽比小于设计图的使用高度适配。
   */
   export function resetFit();
   /**
    * 重新开始游戏
    */
   export function restartApp();
   /**
    * 遍历查找指定名称的节点
    */
   export function seekNodeByName(node: cc.Node, name: string);

   /**
   * 创建测试节点
   * @param {*} item 
   * @param {*} spriteFrame 
   */
   export function setTestArea(item: cc.Rect, spriteFrame: cc.SpriteFrame);
   /**
    * 显示指定节点
    * @param {cc.Node} node 
    */
   export function showThatNode();
   /**
    * 注销场景常驻节点
    * @param {string} tag 
    */
   export function unregisterGlobalNode(tag: string);

   /**
    * 请求趣游游戏管理后台服务器
    * 用于登陆，配置参数下发
    */
   export function requestConfig({ path, header, data, success, fail } = {});
   /**
    * 请求微信后羿后台
    */
   export function requestApi({ path, header, data, success, fail } = {});
   /**
    *  请求其他平台后羿后台
    */
   export function requestAppApi({ path, header, data, success, fail } = {});
   /**
    * 发送获取服务器信息请求，返回服务器时间
    */
   export function reqGetServerTime({ success, fail } = {});


   /**
    * 将参数节点中心点位置转换为相对世界坐标系的点
    * @param {cc.Node} node 
    */
   export function nodeSpaceToWorld(node: cc.Node);

   /**
    * 将世界坐标系下点转换为节点空间中的点
    * @param {cc.Node} node 
    * @param {cc.Vec2} world 
    */
   export function worldToNodeSpace(node: cc.Node, world: cc.Vec2);
   /**
    * 获取节点在父节点坐标系下的四个顶点坐标
    * 返回数组类型的值，参数错误返回空数组
    * @param {cc.Node} node
    */
   export function getNodeVertex(node);
   /**
    * 检测点是否在指定的节点中
    * @param {cc.Vec2} point 测试点
    * @param {cc.Node} node 节点
    */
   export function pointInNode(point, node);
   /**
    * 与 cc.Component.EventHandler 类的实例方法 emit 一样执行其他组件中的函数
    * 区别是本方法会返回的 EventHandler 的返回值
    * @param {cc.Component.EventHandler} evHandler 另一个组件中的函数
    */
   export function emitEventHandler(evHandler);

   /**
    * 获取参数二节点处于相对参数一节点的位置，
    * @param {cc.Node} baseNode 参照节点
    * @param {cc.Node} otherNode 该节点相对参照节点位置
    * @returns {strign} top right bottom left 参数错误或条件不符合返回空字符
    */
   export function getNodeRelativeLocation(baseNode, otherNode);
   /**
    * 获取参数二矩形处于相对参数一矩形的位置，
    * @param {cc.Rect} baseNode 参照矩形
    * @param {cc.Rect} otherNode 该矩形相对参照节点位置
    * @returns {strign} top right bottom left 参数错误或条件不符合返回空字符
    */
   export function getAabbLocation(baseAabb, otherAabb)
   /**
    * 将场景设置时保存的宽高或xy字符值转为数组
    * 默认转为 [0,0]
    * @param {string} data '10,20'
    * @returns {array} [10,20]
    */
   export function getNodePtORSz(data)

   /*-------------- phys_utils.js --------------*/
   /**
    * 开启碰撞系统
    */
   export function open_collider();
   /**
    * 开启物理系统
    */
   export function open_rigid();
   /**
    * 在节点四周加上静态刚体，阻止物体弹出节点
    * @param parent {cc.Node} 需要加静态刚体的节点
    */
   export function addRigidBody(parent: cc.Node);
   /**
    * 设置物理步长 默认这个步长即是你的游戏的帧率：1/framerate。
    */
   export function setStep();
   /**
    * 获取到两个碰撞体相互碰撞时在碰撞点上的相对速度
    * @param {*} contact 
    * @param {*} selfCollider 
    * @param {*} otherCollider 
    */
   export function getCollideSpeed(contact, selfCollider, otherCollider);
   /**
    * 获取到与当前碰撞体碰撞的另一个碰撞体的方向
    * @param {*} contact 
    * @param {*} selfCollider 
    * @param {*} otherCollider 
    * @returns {string} top right bottom left none
    */
   export function getCollideDirection(contact, selfCollider, otherCollider);
   /**
    * 获取刚体质心点到上下左右四个方向最近刚体的距离
    * 以及该刚体碰撞分组字符标识
    * @param {cc.RigidBody} rigidBody 
    * @param {Array} dir ['left', 'right', 'top', 'bottom']
    */
   export function getCollideDistance(rigidBody, dir = ['left', 'right', 'top', 'bottom'], addPos = cc.v2(0, 0));
   /**
    * 两个刚体质心连线的角度
    * 返回以当前碰撞体质心为圆心的角度
    * @param {cc.RigidBody} selfCollider 
    * @param {cc.PhysicsCollider} selfCollider 
    * @returns {number} 
    */
   export function getRigidDirection(selfCollider, otherCollider);
   /**
    * 获取指定方向上所有与射线相交的物理碰撞体，同一碰撞体只返回最近的点
    * 方向是正右方为0度，然后逆时针旋转为正值
    * @param {cc.Vec2} start 检测起点
    * @param {number} angle 角度值，右0 上90 左180 下270
    */
   export function getRayCast(start, angle);
   /*-------------- frame_mgr.js --------------*/
   /**
   * 传入图片名，从动态资源的图集中查找图片
   */
   export function getFrameByName(imgName: string, cb: function): cc.SpriteFrame;

   /**
    * 获取图片所在图集
    * @param {string} imgName 图片名称，不含后缀
    * @param {function} cb 回调函数
    * @returns {promise}
    */
   export function getAtlasByName(imgName, cb);

   /* -------------- loader_mgr.js ---------------*/
   /**
    * 先尝试取动态资源，未成功尝试线上
    * @param {string} path 图片名称加路径 不带后缀
    * @param {function} cb 
    */
   export function autoLoadSf(path, cb);
   /**
    * 取动态资源中的图片
    * @param {string} path 图片名称加路径 不带后缀
    * @param {function} cb 
    */
   export function loadSf(path, cb);
   /**
    * 取线上服务器的图片
    * @param {string} path 图片名称加路径 不带后缀
    * @param {function} cb 
    */
   export function loadRemoteSf(path, cb);
   /**
    * 先尝试动态资源，再尝试线上，音频
    * @param {string} url 音频名称加路径 不带后缀
    * @param {function} cb 
    */
   export function autoLoadAudio(url, cb);
   /**
    * 获取动态资源中的音频
    * @param {string} url 音频名称加路径 不带后缀
    * @param {function} cb 
    */
   export function loadAudio(url, cb);
   /**
    * 获取线上音频
    * @param {string} url 音频名称加路径 不带后缀
    * @param {function} cb 
    */
   export function loadRemoteAudio(url, cb);
   /**
    * 
    * @param {string} path JSON 名称加路径，带后缀
    * @param {*} cb 
    */
   export function loadJson(path, cb);
   /**动态加载预制体 */
   export function loadPrefab(path, cb);

   /**
    * 将动态资源或线上图集打包的大图通过json裁剪成小图
    * @param {string} jsonPath json路径 带 .json 后缀
    * @param {string} imgPath 图片路径， 不带后缀，必须是png
    * @param {function} cb 取图片成功参数为对象，不成功参数为空
    */
   export function convertJsonAtlas(jsonPath, imgPath, cb);
   /**
    * 裁切出一张图上的rect区域，返回sf
    * @param {cc.SpriteFrame} spriteframe 
    * @param {cc.Rect} rect 
    */
   export function cutSpriteFrameByRect(spriteframe, rect);

   /* -------------- animate_module.js ---------------*/

   /**
    * 根据图片数组生成动画clip
    * @param {Array<cc.SpriteFrame>} sfarr 图片数组
    * @param {String} clipName 动画名字
    * @param {Bollon} loop 是否循环播放
    * @param {Number} rate 帧率(可选，默认为图片数量)
    * @param {Number} speed 播放速度(可选，默认为1)
    */
   export function getAnimClipBySfs({
      sfarr,
      clipName = 'default',
      loop = false,
      rate = 2,
      speed = 1
   } = {});

   /**
    * 将一张大图按约定顺序裁切成等大小的小图
    * 一般用于帧动画,目前仅支持先从左往右，再从上往下排列
    * @param {cc.SpriteFrame} spriteframe 
    * @param {cc.size} cellSize 裁切的每张图片尺寸
    * @param {Number} count 裁切的图片数量
    */
   export function cutSpriteFrame(spriteframe, cellSize, count, initPos);

   /********************* sound_mgr *********************/
   /**
    * 播放背景音频，音频必需放在 oss 下项目资源文件夹下的 audio 文件中
    * @param {string} bgmName 背景音频名
    * @param {number} volume 背景音量
    */
   export function playBgm(bgmName, volume);
   /**
    * 循环播放背景音乐
    * @param {cc.AudioClip} bgmClip 
    * @param {number} volume 音量
    */
   export function playMusic(bgmClip, volume = 0.1);
   /**
    * 停止播放背景音频
    * @param {boolean} isClean 是否清除背景音频
    */
   export function stopMusic(isClean);
   /**
    * 播放音效
    * @param {cc.AudioClip} effectClip 
    * @param {number} volume 
    */
   export function playEffect(effectClip, volume = 1);
   /**
    * 是否播放音频
    * @param {boolean} isOn 
    */
   export function setSoundState(isOn);
   /**
    * 获得用户是否选择播放音频状态
    */
   export function isSoundOn();
   /**
    * 播放线上音效
    * @param {string} name
    * @param {number} volume
    */
   export function playOssAudio(name, volume)
   /******************* vibrate_mgr ******************/

   /**
    * 设置是否允许振动
    * @param {boolean} isOn 
    */
   export function setVibrateState(isOn);
   /**
    * 查询是否可以振动
    */
   export function isVibrateOn();
   /**
    * 使手机发生较短时间的振动（15 ms）。
    * 仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
    */
   export function vibrateShort();
   /**
    * 使手机发生较长时间的振动（400 ms)
    */
   export function vibrateLong()
}

