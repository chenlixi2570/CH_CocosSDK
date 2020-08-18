/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.csgw = (function() {

    /**
     * Namespace csgw.
     * @exports csgw
     * @namespace
     */
    var csgw = {};

    /**
     * BaseConfigIDs enum.
     * @name csgw.BaseConfigIDs
     * @enum {string}
     * @property {number} BC_NET_ADDR=1 BC_NET_ADDR value
     * @property {number} BC_SHOT_NAME=2 BC_SHOT_NAME value
     * @property {number} BC_HTTP_ADDR_OF_SERVER=3 BC_HTTP_ADDR_OF_SERVER value
     * @property {number} BC_HTTP_ADDR_OF_PATCH_PACKAGE=4 BC_HTTP_ADDR_OF_PATCH_PACKAGE value
     * @property {number} BC_APP_VERSION=5 BC_APP_VERSION value
     * @property {number} BC_PATCH_VERSION=6 BC_PATCH_VERSION value
     * @property {number} BC_MINI_PROGRAM_ID=7 BC_MINI_PROGRAM_ID value
     * @property {number} BC_MINI_PROGRAM_APP_ID=8 BC_MINI_PROGRAM_APP_ID value
     * @property {number} BC_MINI_PROGRAM_APP_SECRET=9 BC_MINI_PROGRAM_APP_SECRET value
     * @property {number} BC_BANNER_AD_UNIT_ID=10 BC_BANNER_AD_UNIT_ID value
     * @property {number} BC_VIDEO_AD_UNIT_ID=11 BC_VIDEO_AD_UNIT_ID value
     * @property {number} BC_MAX_ADV_TIMES_OF_ONE_DAY=12 BC_MAX_ADV_TIMES_OF_ONE_DAY value
     */
    csgw.BaseConfigIDs = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "BC_NET_ADDR"] = 1;
        values[valuesById[2] = "BC_SHOT_NAME"] = 2;
        values[valuesById[3] = "BC_HTTP_ADDR_OF_SERVER"] = 3;
        values[valuesById[4] = "BC_HTTP_ADDR_OF_PATCH_PACKAGE"] = 4;
        values[valuesById[5] = "BC_APP_VERSION"] = 5;
        values[valuesById[6] = "BC_PATCH_VERSION"] = 6;
        values[valuesById[7] = "BC_MINI_PROGRAM_ID"] = 7;
        values[valuesById[8] = "BC_MINI_PROGRAM_APP_ID"] = 8;
        values[valuesById[9] = "BC_MINI_PROGRAM_APP_SECRET"] = 9;
        values[valuesById[10] = "BC_BANNER_AD_UNIT_ID"] = 10;
        values[valuesById[11] = "BC_VIDEO_AD_UNIT_ID"] = 11;
        values[valuesById[12] = "BC_MAX_ADV_TIMES_OF_ONE_DAY"] = 12;
        return values;
    })();

    csgw.BaseConfig = (function() {

        /**
         * Properties of a BaseConfig.
         * @memberof csgw
         * @interface IBaseConfig
         * @property {number} id BaseConfig id
         * @property {number|null} [num] BaseConfig num
         * @property {number|null} [decimal] BaseConfig decimal
         * @property {string|null} [str] BaseConfig str
         */

        /**
         * Constructs a new BaseConfig.
         * @memberof csgw
         * @classdesc Represents a BaseConfig.
         * @implements IBaseConfig
         * @constructor
         * @param {csgw.IBaseConfig=} [properties] Properties to set
         */
        function BaseConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BaseConfig id.
         * @member {number} id
         * @memberof csgw.BaseConfig
         * @instance
         */
        BaseConfig.prototype.id = 0;

        /**
         * BaseConfig num.
         * @member {number} num
         * @memberof csgw.BaseConfig
         * @instance
         */
        BaseConfig.prototype.num = 0;

        /**
         * BaseConfig decimal.
         * @member {number} decimal
         * @memberof csgw.BaseConfig
         * @instance
         */
        BaseConfig.prototype.decimal = 0;

        /**
         * BaseConfig str.
         * @member {string} str
         * @memberof csgw.BaseConfig
         * @instance
         */
        BaseConfig.prototype.str = "";

        /**
         * Creates a new BaseConfig instance using the specified properties.
         * @function create
         * @memberof csgw.BaseConfig
         * @static
         * @param {csgw.IBaseConfig=} [properties] Properties to set
         * @returns {csgw.BaseConfig} BaseConfig instance
         */
        BaseConfig.create = function create(properties) {
            return new BaseConfig(properties);
        };

        /**
         * Encodes the specified BaseConfig message. Does not implicitly {@link csgw.BaseConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.BaseConfig
         * @static
         * @param {csgw.IBaseConfig} message BaseConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.num != null && message.hasOwnProperty("num"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.num);
            if (message.decimal != null && message.hasOwnProperty("decimal"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.decimal);
            if (message.str != null && message.hasOwnProperty("str"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.str);
            return writer;
        };

        /**
         * Encodes the specified BaseConfig message, length delimited. Does not implicitly {@link csgw.BaseConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.BaseConfig
         * @static
         * @param {csgw.IBaseConfig} message BaseConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BaseConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.BaseConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.BaseConfig} BaseConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.BaseConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.num = reader.uint32();
                    break;
                case 3:
                    message.decimal = reader.uint32();
                    break;
                case 4:
                    message.str = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes a BaseConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.BaseConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.BaseConfig} BaseConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BaseConfig message.
         * @function verify
         * @memberof csgw.BaseConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BaseConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (message.num != null && message.hasOwnProperty("num"))
                if (!$util.isInteger(message.num))
                    return "num: integer expected";
            if (message.decimal != null && message.hasOwnProperty("decimal"))
                if (!$util.isInteger(message.decimal))
                    return "decimal: integer expected";
            if (message.str != null && message.hasOwnProperty("str"))
                if (!$util.isString(message.str))
                    return "str: string expected";
            return null;
        };

        /**
         * Creates a BaseConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.BaseConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.BaseConfig} BaseConfig
         */
        BaseConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.BaseConfig)
                return object;
            var message = new $root.csgw.BaseConfig();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.num != null)
                message.num = object.num >>> 0;
            if (object.decimal != null)
                message.decimal = object.decimal >>> 0;
            if (object.str != null)
                message.str = String(object.str);
            return message;
        };

        /**
         * Creates a plain object from a BaseConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.BaseConfig
         * @static
         * @param {csgw.BaseConfig} message BaseConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BaseConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.num = 0;
                object.decimal = 0;
                object.str = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.num != null && message.hasOwnProperty("num"))
                object.num = message.num;
            if (message.decimal != null && message.hasOwnProperty("decimal"))
                object.decimal = message.decimal;
            if (message.str != null && message.hasOwnProperty("str"))
                object.str = message.str;
            return object;
        };

        /**
         * Converts this BaseConfig to JSON.
         * @function toJSON
         * @memberof csgw.BaseConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BaseConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BaseConfig;
    })();

    csgw.TBBaseConfig = (function() {

        /**
         * Properties of a TBBaseConfig.
         * @memberof csgw
         * @interface ITBBaseConfig
         * @property {Array.<csgw.IBaseConfig>|null} [list] TBBaseConfig list
         */

        /**
         * Constructs a new TBBaseConfig.
         * @memberof csgw
         * @classdesc Represents a TBBaseConfig.
         * @implements ITBBaseConfig
         * @constructor
         * @param {csgw.ITBBaseConfig=} [properties] Properties to set
         */
        function TBBaseConfig(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBBaseConfig list.
         * @member {Array.<csgw.IBaseConfig>} list
         * @memberof csgw.TBBaseConfig
         * @instance
         */
        TBBaseConfig.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBBaseConfig instance using the specified properties.
         * @function create
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {csgw.ITBBaseConfig=} [properties] Properties to set
         * @returns {csgw.TBBaseConfig} TBBaseConfig instance
         */
        TBBaseConfig.create = function create(properties) {
            return new TBBaseConfig(properties);
        };

        /**
         * Encodes the specified TBBaseConfig message. Does not implicitly {@link csgw.TBBaseConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {csgw.ITBBaseConfig} message TBBaseConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBBaseConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.BaseConfig.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBBaseConfig message, length delimited. Does not implicitly {@link csgw.TBBaseConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {csgw.ITBBaseConfig} message TBBaseConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBBaseConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBBaseConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBBaseConfig} TBBaseConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBBaseConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBBaseConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.BaseConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBBaseConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBBaseConfig} TBBaseConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBBaseConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBBaseConfig message.
         * @function verify
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBBaseConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.BaseConfig.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBBaseConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBBaseConfig} TBBaseConfig
         */
        TBBaseConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBBaseConfig)
                return object;
            var message = new $root.csgw.TBBaseConfig();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBBaseConfig.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBBaseConfig.list: object expected");
                    message.list[i] = $root.csgw.BaseConfig.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBBaseConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBBaseConfig
         * @static
         * @param {csgw.TBBaseConfig} message TBBaseConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBBaseConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.BaseConfig.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBBaseConfig to JSON.
         * @function toJSON
         * @memberof csgw.TBBaseConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBBaseConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBBaseConfig;
    })();

    /**
     * UIWordIDs enum.
     * @name csgw.UIWordIDs
     * @enum {string}
     * @property {number} UIWORD_ID_APP_NAME=1 UIWORD_ID_APP_NAME value
     * @property {number} UIWORD_ID_SYSTEM_ERROR_TITLE=2 UIWORD_ID_SYSTEM_ERROR_TITLE value
     * @property {number} UIWORD_ID_SYSTEM_ERROR_CONTENT=3 UIWORD_ID_SYSTEM_ERROR_CONTENT value
     * @property {number} UIWORD_ID_SYSTEM_ERROR_RELOAD_GAME=4 UIWORD_ID_SYSTEM_ERROR_RELOAD_GAME value
     * @property {number} UIWORD_ID_SYSTEM_ERROR_EXIT_GAME=5 UIWORD_ID_SYSTEM_ERROR_EXIT_GAME value
     * @property {number} UIWORD_ID_QQ_PLATFORM_NAME=6 UIWORD_ID_QQ_PLATFORM_NAME value
     * @property {number} UIWORD_ID_WX_PLATFORM_NAME=7 UIWORD_ID_WX_PLATFORM_NAME value
     * @property {number} UIWORD_ID_SDK_NOT_SUPPORT_FORMAT=8 UIWORD_ID_SDK_NOT_SUPPORT_FORMAT value
     * @property {number} UIWORD_ID_PLAYER_BLOCKED_TITLE=9 UIWORD_ID_PLAYER_BLOCKED_TITLE value
     * @property {number} UIWORD_ID_PLAYER_BLOCKED_CONTENT=10 UIWORD_ID_PLAYER_BLOCKED_CONTENT value
     * @property {number} UIWORD_ID_SHARE_SUCCESS=11 UIWORD_ID_SHARE_SUCCESS value
     * @property {number} UIWORD_ID_ADV_SUCCESS=12 UIWORD_ID_ADV_SUCCESS value
     * @property {number} UIWORD_ID_ADV_FAIL=13 UIWORD_ID_ADV_FAIL value
     * @property {number} UIWORD_ID_UNIT_DAY=14 UIWORD_ID_UNIT_DAY value
     * @property {number} UIWORD_ID_UNIT_WEEK=15 UIWORD_ID_UNIT_WEEK value
     * @property {number} UIWORD_ID_UNIT_HOUR=16 UIWORD_ID_UNIT_HOUR value
     * @property {number} UIWORD_ID_UNIT_MINUTE=17 UIWORD_ID_UNIT_MINUTE value
     * @property {number} UIWORD_ID_LOADING_TITLE=101 UIWORD_ID_LOADING_TITLE value
     * @property {number} UIWORD_ID_UPDATE_TITLE=102 UIWORD_ID_UPDATE_TITLE value
     * @property {number} UIWORD_ID_LOGIN_TITLE=103 UIWORD_ID_LOGIN_TITLE value
     * @property {number} UIWORD_ID_SHARE_FAIL_TIPS_ONE=1001 UIWORD_ID_SHARE_FAIL_TIPS_ONE value
     * @property {number} UIWORD_ID_SHARE_FAIL_TIPS_TWO=1002 UIWORD_ID_SHARE_FAIL_TIPS_TWO value
     * @property {number} UIWORD_ID_SHARE_FAIL_TIPS_THREE=1003 UIWORD_ID_SHARE_FAIL_TIPS_THREE value
     */
    csgw.UIWordIDs = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "UIWORD_ID_APP_NAME"] = 1;
        values[valuesById[2] = "UIWORD_ID_SYSTEM_ERROR_TITLE"] = 2;
        values[valuesById[3] = "UIWORD_ID_SYSTEM_ERROR_CONTENT"] = 3;
        values[valuesById[4] = "UIWORD_ID_SYSTEM_ERROR_RELOAD_GAME"] = 4;
        values[valuesById[5] = "UIWORD_ID_SYSTEM_ERROR_EXIT_GAME"] = 5;
        values[valuesById[6] = "UIWORD_ID_QQ_PLATFORM_NAME"] = 6;
        values[valuesById[7] = "UIWORD_ID_WX_PLATFORM_NAME"] = 7;
        values[valuesById[8] = "UIWORD_ID_SDK_NOT_SUPPORT_FORMAT"] = 8;
        values[valuesById[9] = "UIWORD_ID_PLAYER_BLOCKED_TITLE"] = 9;
        values[valuesById[10] = "UIWORD_ID_PLAYER_BLOCKED_CONTENT"] = 10;
        values[valuesById[11] = "UIWORD_ID_SHARE_SUCCESS"] = 11;
        values[valuesById[12] = "UIWORD_ID_ADV_SUCCESS"] = 12;
        values[valuesById[13] = "UIWORD_ID_ADV_FAIL"] = 13;
        values[valuesById[14] = "UIWORD_ID_UNIT_DAY"] = 14;
        values[valuesById[15] = "UIWORD_ID_UNIT_WEEK"] = 15;
        values[valuesById[16] = "UIWORD_ID_UNIT_HOUR"] = 16;
        values[valuesById[17] = "UIWORD_ID_UNIT_MINUTE"] = 17;
        values[valuesById[101] = "UIWORD_ID_LOADING_TITLE"] = 101;
        values[valuesById[102] = "UIWORD_ID_UPDATE_TITLE"] = 102;
        values[valuesById[103] = "UIWORD_ID_LOGIN_TITLE"] = 103;
        values[valuesById[1001] = "UIWORD_ID_SHARE_FAIL_TIPS_ONE"] = 1001;
        values[valuesById[1002] = "UIWORD_ID_SHARE_FAIL_TIPS_TWO"] = 1002;
        values[valuesById[1003] = "UIWORD_ID_SHARE_FAIL_TIPS_THREE"] = 1003;
        return values;
    })();

    csgw.UIWord = (function() {

        /**
         * Properties of a UIWord.
         * @memberof csgw
         * @interface IUIWord
         * @property {number} id UIWord id
         * @property {string} word UIWord word
         */

        /**
         * Constructs a new UIWord.
         * @memberof csgw
         * @classdesc Represents a UIWord.
         * @implements IUIWord
         * @constructor
         * @param {csgw.IUIWord=} [properties] Properties to set
         */
        function UIWord(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UIWord id.
         * @member {number} id
         * @memberof csgw.UIWord
         * @instance
         */
        UIWord.prototype.id = 0;

        /**
         * UIWord word.
         * @member {string} word
         * @memberof csgw.UIWord
         * @instance
         */
        UIWord.prototype.word = "";

        /**
         * Creates a new UIWord instance using the specified properties.
         * @function create
         * @memberof csgw.UIWord
         * @static
         * @param {csgw.IUIWord=} [properties] Properties to set
         * @returns {csgw.UIWord} UIWord instance
         */
        UIWord.create = function create(properties) {
            return new UIWord(properties);
        };

        /**
         * Encodes the specified UIWord message. Does not implicitly {@link csgw.UIWord.verify|verify} messages.
         * @function encode
         * @memberof csgw.UIWord
         * @static
         * @param {csgw.IUIWord} message UIWord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UIWord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.word);
            return writer;
        };

        /**
         * Encodes the specified UIWord message, length delimited. Does not implicitly {@link csgw.UIWord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.UIWord
         * @static
         * @param {csgw.IUIWord} message UIWord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UIWord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UIWord message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.UIWord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.UIWord} UIWord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UIWord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.UIWord();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.word = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("word"))
                throw $util.ProtocolError("missing required 'word'", { instance: message });
            return message;
        };

        /**
         * Decodes a UIWord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.UIWord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.UIWord} UIWord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UIWord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UIWord message.
         * @function verify
         * @memberof csgw.UIWord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UIWord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (!$util.isString(message.word))
                return "word: string expected";
            return null;
        };

        /**
         * Creates a UIWord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.UIWord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.UIWord} UIWord
         */
        UIWord.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.UIWord)
                return object;
            var message = new $root.csgw.UIWord();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.word != null)
                message.word = String(object.word);
            return message;
        };

        /**
         * Creates a plain object from a UIWord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.UIWord
         * @static
         * @param {csgw.UIWord} message UIWord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UIWord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.word = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.word != null && message.hasOwnProperty("word"))
                object.word = message.word;
            return object;
        };

        /**
         * Converts this UIWord to JSON.
         * @function toJSON
         * @memberof csgw.UIWord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UIWord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UIWord;
    })();

    csgw.TBUIWord = (function() {

        /**
         * Properties of a TBUIWord.
         * @memberof csgw
         * @interface ITBUIWord
         * @property {Array.<csgw.IUIWord>|null} [list] TBUIWord list
         */

        /**
         * Constructs a new TBUIWord.
         * @memberof csgw
         * @classdesc Represents a TBUIWord.
         * @implements ITBUIWord
         * @constructor
         * @param {csgw.ITBUIWord=} [properties] Properties to set
         */
        function TBUIWord(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBUIWord list.
         * @member {Array.<csgw.IUIWord>} list
         * @memberof csgw.TBUIWord
         * @instance
         */
        TBUIWord.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBUIWord instance using the specified properties.
         * @function create
         * @memberof csgw.TBUIWord
         * @static
         * @param {csgw.ITBUIWord=} [properties] Properties to set
         * @returns {csgw.TBUIWord} TBUIWord instance
         */
        TBUIWord.create = function create(properties) {
            return new TBUIWord(properties);
        };

        /**
         * Encodes the specified TBUIWord message. Does not implicitly {@link csgw.TBUIWord.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBUIWord
         * @static
         * @param {csgw.ITBUIWord} message TBUIWord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBUIWord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.UIWord.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBUIWord message, length delimited. Does not implicitly {@link csgw.TBUIWord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBUIWord
         * @static
         * @param {csgw.ITBUIWord} message TBUIWord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBUIWord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBUIWord message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBUIWord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBUIWord} TBUIWord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBUIWord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBUIWord();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.UIWord.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBUIWord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBUIWord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBUIWord} TBUIWord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBUIWord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBUIWord message.
         * @function verify
         * @memberof csgw.TBUIWord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBUIWord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.UIWord.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBUIWord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBUIWord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBUIWord} TBUIWord
         */
        TBUIWord.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBUIWord)
                return object;
            var message = new $root.csgw.TBUIWord();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBUIWord.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBUIWord.list: object expected");
                    message.list[i] = $root.csgw.UIWord.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBUIWord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBUIWord
         * @static
         * @param {csgw.TBUIWord} message TBUIWord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBUIWord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.UIWord.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBUIWord to JSON.
         * @function toJSON
         * @memberof csgw.TBUIWord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBUIWord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBUIWord;
    })();

    csgw.NetError = (function() {

        /**
         * Properties of a NetError.
         * @memberof csgw
         * @interface INetError
         * @property {number} id NetError id
         * @property {string} word NetError word
         */

        /**
         * Constructs a new NetError.
         * @memberof csgw
         * @classdesc Represents a NetError.
         * @implements INetError
         * @constructor
         * @param {csgw.INetError=} [properties] Properties to set
         */
        function NetError(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NetError id.
         * @member {number} id
         * @memberof csgw.NetError
         * @instance
         */
        NetError.prototype.id = 0;

        /**
         * NetError word.
         * @member {string} word
         * @memberof csgw.NetError
         * @instance
         */
        NetError.prototype.word = "";

        /**
         * Creates a new NetError instance using the specified properties.
         * @function create
         * @memberof csgw.NetError
         * @static
         * @param {csgw.INetError=} [properties] Properties to set
         * @returns {csgw.NetError} NetError instance
         */
        NetError.create = function create(properties) {
            return new NetError(properties);
        };

        /**
         * Encodes the specified NetError message. Does not implicitly {@link csgw.NetError.verify|verify} messages.
         * @function encode
         * @memberof csgw.NetError
         * @static
         * @param {csgw.INetError} message NetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.word);
            return writer;
        };

        /**
         * Encodes the specified NetError message, length delimited. Does not implicitly {@link csgw.NetError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.NetError
         * @static
         * @param {csgw.INetError} message NetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NetError message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.NetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.NetError} NetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetError.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.NetError();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.word = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("word"))
                throw $util.ProtocolError("missing required 'word'", { instance: message });
            return message;
        };

        /**
         * Decodes a NetError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.NetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.NetError} NetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NetError message.
         * @function verify
         * @memberof csgw.NetError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NetError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (!$util.isString(message.word))
                return "word: string expected";
            return null;
        };

        /**
         * Creates a NetError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.NetError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.NetError} NetError
         */
        NetError.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.NetError)
                return object;
            var message = new $root.csgw.NetError();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.word != null)
                message.word = String(object.word);
            return message;
        };

        /**
         * Creates a plain object from a NetError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.NetError
         * @static
         * @param {csgw.NetError} message NetError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.word = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.word != null && message.hasOwnProperty("word"))
                object.word = message.word;
            return object;
        };

        /**
         * Converts this NetError to JSON.
         * @function toJSON
         * @memberof csgw.NetError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NetError;
    })();

    csgw.TBNetError = (function() {

        /**
         * Properties of a TBNetError.
         * @memberof csgw
         * @interface ITBNetError
         * @property {Array.<csgw.INetError>|null} [list] TBNetError list
         */

        /**
         * Constructs a new TBNetError.
         * @memberof csgw
         * @classdesc Represents a TBNetError.
         * @implements ITBNetError
         * @constructor
         * @param {csgw.ITBNetError=} [properties] Properties to set
         */
        function TBNetError(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBNetError list.
         * @member {Array.<csgw.INetError>} list
         * @memberof csgw.TBNetError
         * @instance
         */
        TBNetError.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBNetError instance using the specified properties.
         * @function create
         * @memberof csgw.TBNetError
         * @static
         * @param {csgw.ITBNetError=} [properties] Properties to set
         * @returns {csgw.TBNetError} TBNetError instance
         */
        TBNetError.create = function create(properties) {
            return new TBNetError(properties);
        };

        /**
         * Encodes the specified TBNetError message. Does not implicitly {@link csgw.TBNetError.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBNetError
         * @static
         * @param {csgw.ITBNetError} message TBNetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBNetError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.NetError.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBNetError message, length delimited. Does not implicitly {@link csgw.TBNetError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBNetError
         * @static
         * @param {csgw.ITBNetError} message TBNetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBNetError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBNetError message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBNetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBNetError} TBNetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBNetError.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBNetError();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.NetError.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBNetError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBNetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBNetError} TBNetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBNetError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBNetError message.
         * @function verify
         * @memberof csgw.TBNetError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBNetError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.NetError.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBNetError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBNetError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBNetError} TBNetError
         */
        TBNetError.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBNetError)
                return object;
            var message = new $root.csgw.TBNetError();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBNetError.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBNetError.list: object expected");
                    message.list[i] = $root.csgw.NetError.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBNetError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBNetError
         * @static
         * @param {csgw.TBNetError} message TBNetError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBNetError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.NetError.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBNetError to JSON.
         * @function toJSON
         * @memberof csgw.TBNetError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBNetError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBNetError;
    })();

    csgw.PlayerInfo = (function() {

        /**
         * Properties of a PlayerInfo.
         * @memberof csgw
         * @interface IPlayerInfo
         * @property {string} openID PlayerInfo openID
         * @property {string} sessID PlayerInfo sessID
         * @property {string} userID PlayerInfo userID
         * @property {number} lastSaveTime PlayerInfo lastSaveTime
         * @property {string} nickname PlayerInfo nickname
         * @property {number} sex PlayerInfo sex
         * @property {string} headUrl PlayerInfo headUrl
         * @property {string} coin PlayerInfo coin
         * @property {string} totalCoin PlayerInfo totalCoin
         * @property {number} shareTimesOfToday PlayerInfo shareTimesOfToday
         * @property {number} recordDayOfShareTimes PlayerInfo recordDayOfShareTimes
         * @property {number} advTimesOfToday PlayerInfo advTimesOfToday
         * @property {number} recordDayOfAdvTimes PlayerInfo recordDayOfAdvTimes
         * @property {number} currLevel PlayerInfo currLevel
         * @property {number|null} [physical] PlayerInfo physical
         * @property {string|null} [levelStar] PlayerInfo levelStar
         * @property {number|null} [currSkin] PlayerInfo currSkin
         * @property {string|null} [unlockSkin] PlayerInfo unlockSkin
         * @property {string|null} [signInfo] PlayerInfo signInfo
         * @property {string|null} [buySing] PlayerInfo buySing
         * @property {number|null} [currGun] PlayerInfo currGun
         * @property {string|null} [unlockGun] PlayerInfo unlockGun
         * @property {number|null} [gem] PlayerInfo gem
         * @property {string|null} [starScale] PlayerInfo starScale
         */

        /**
         * Constructs a new PlayerInfo.
         * @memberof csgw
         * @classdesc Represents a PlayerInfo.
         * @implements IPlayerInfo
         * @constructor
         * @param {csgw.IPlayerInfo=} [properties] Properties to set
         */
        function PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo openID.
         * @member {string} openID
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.openID = "";

        /**
         * PlayerInfo sessID.
         * @member {string} sessID
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.sessID = "";

        /**
         * PlayerInfo userID.
         * @member {string} userID
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.userID = "";

        /**
         * PlayerInfo lastSaveTime.
         * @member {number} lastSaveTime
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.lastSaveTime = 0;

        /**
         * PlayerInfo nickname.
         * @member {string} nickname
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.nickname = "";

        /**
         * PlayerInfo sex.
         * @member {number} sex
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.sex = 0;

        /**
         * PlayerInfo headUrl.
         * @member {string} headUrl
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.headUrl = "";

        /**
         * PlayerInfo coin.
         * @member {string} coin
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.coin = "";

        /**
         * PlayerInfo totalCoin.
         * @member {string} totalCoin
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.totalCoin = "";

        /**
         * PlayerInfo shareTimesOfToday.
         * @member {number} shareTimesOfToday
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.shareTimesOfToday = 0;

        /**
         * PlayerInfo recordDayOfShareTimes.
         * @member {number} recordDayOfShareTimes
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.recordDayOfShareTimes = 0;

        /**
         * PlayerInfo advTimesOfToday.
         * @member {number} advTimesOfToday
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.advTimesOfToday = 0;

        /**
         * PlayerInfo recordDayOfAdvTimes.
         * @member {number} recordDayOfAdvTimes
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.recordDayOfAdvTimes = 0;

        /**
         * PlayerInfo currLevel.
         * @member {number} currLevel
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.currLevel = 0;

        /**
         * PlayerInfo physical.
         * @member {number} physical
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.physical = 0;

        /**
         * PlayerInfo levelStar.
         * @member {string} levelStar
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.levelStar = "";

        /**
         * PlayerInfo currSkin.
         * @member {number} currSkin
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.currSkin = 0;

        /**
         * PlayerInfo unlockSkin.
         * @member {string} unlockSkin
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.unlockSkin = "";

        /**
         * PlayerInfo signInfo.
         * @member {string} signInfo
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.signInfo = "";

        /**
         * PlayerInfo buySing.
         * @member {string} buySing
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.buySing = "";

        /**
         * PlayerInfo currGun.
         * @member {number} currGun
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.currGun = 0;

        /**
         * PlayerInfo unlockGun.
         * @member {string} unlockGun
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.unlockGun = "";

        /**
         * PlayerInfo gem.
         * @member {number} gem
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.gem = 0;

        /**
         * PlayerInfo starScale.
         * @member {string} starScale
         * @memberof csgw.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.starScale = "";

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @function create
         * @memberof csgw.PlayerInfo
         * @static
         * @param {csgw.IPlayerInfo=} [properties] Properties to set
         * @returns {csgw.PlayerInfo} PlayerInfo instance
         */
        PlayerInfo.create = function create(properties) {
            return new PlayerInfo(properties);
        };

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link csgw.PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof csgw.PlayerInfo
         * @static
         * @param {csgw.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.openID);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessID);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.userID);
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.lastSaveTime);
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.nickname);
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.sex);
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.headUrl);
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.coin);
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.totalCoin);
            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.shareTimesOfToday);
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.recordDayOfShareTimes);
            writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.advTimesOfToday);
            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.recordDayOfAdvTimes);
            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.currLevel);
            if (message.physical != null && message.hasOwnProperty("physical"))
                writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.physical);
            if (message.levelStar != null && message.hasOwnProperty("levelStar"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.levelStar);
            if (message.currSkin != null && message.hasOwnProperty("currSkin"))
                writer.uint32(/* id 17, wireType 0 =*/136).uint32(message.currSkin);
            if (message.unlockSkin != null && message.hasOwnProperty("unlockSkin"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.unlockSkin);
            if (message.signInfo != null && message.hasOwnProperty("signInfo"))
                writer.uint32(/* id 19, wireType 2 =*/154).string(message.signInfo);
            if (message.buySing != null && message.hasOwnProperty("buySing"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.buySing);
            if (message.currGun != null && message.hasOwnProperty("currGun"))
                writer.uint32(/* id 21, wireType 0 =*/168).uint32(message.currGun);
            if (message.unlockGun != null && message.hasOwnProperty("unlockGun"))
                writer.uint32(/* id 22, wireType 2 =*/178).string(message.unlockGun);
            if (message.gem != null && message.hasOwnProperty("gem"))
                writer.uint32(/* id 23, wireType 0 =*/184).uint32(message.gem);
            if (message.starScale != null && message.hasOwnProperty("starScale"))
                writer.uint32(/* id 24, wireType 2 =*/194).string(message.starScale);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link csgw.PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.PlayerInfo
         * @static
         * @param {csgw.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openID = reader.string();
                    break;
                case 2:
                    message.sessID = reader.string();
                    break;
                case 3:
                    message.userID = reader.string();
                    break;
                case 4:
                    message.lastSaveTime = reader.uint32();
                    break;
                case 5:
                    message.nickname = reader.string();
                    break;
                case 6:
                    message.sex = reader.uint32();
                    break;
                case 7:
                    message.headUrl = reader.string();
                    break;
                case 8:
                    message.coin = reader.string();
                    break;
                case 9:
                    message.totalCoin = reader.string();
                    break;
                case 10:
                    message.shareTimesOfToday = reader.uint32();
                    break;
                case 11:
                    message.recordDayOfShareTimes = reader.uint32();
                    break;
                case 12:
                    message.advTimesOfToday = reader.uint32();
                    break;
                case 13:
                    message.recordDayOfAdvTimes = reader.uint32();
                    break;
                case 14:
                    message.currLevel = reader.uint32();
                    break;
                case 15:
                    message.physical = reader.uint32();
                    break;
                case 16:
                    message.levelStar = reader.string();
                    break;
                case 17:
                    message.currSkin = reader.uint32();
                    break;
                case 18:
                    message.unlockSkin = reader.string();
                    break;
                case 19:
                    message.signInfo = reader.string();
                    break;
                case 20:
                    message.buySing = reader.string();
                    break;
                case 21:
                    message.currGun = reader.uint32();
                    break;
                case 22:
                    message.unlockGun = reader.string();
                    break;
                case 23:
                    message.gem = reader.uint32();
                    break;
                case 24:
                    message.starScale = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("openID"))
                throw $util.ProtocolError("missing required 'openID'", { instance: message });
            if (!message.hasOwnProperty("sessID"))
                throw $util.ProtocolError("missing required 'sessID'", { instance: message });
            if (!message.hasOwnProperty("userID"))
                throw $util.ProtocolError("missing required 'userID'", { instance: message });
            if (!message.hasOwnProperty("lastSaveTime"))
                throw $util.ProtocolError("missing required 'lastSaveTime'", { instance: message });
            if (!message.hasOwnProperty("nickname"))
                throw $util.ProtocolError("missing required 'nickname'", { instance: message });
            if (!message.hasOwnProperty("sex"))
                throw $util.ProtocolError("missing required 'sex'", { instance: message });
            if (!message.hasOwnProperty("headUrl"))
                throw $util.ProtocolError("missing required 'headUrl'", { instance: message });
            if (!message.hasOwnProperty("coin"))
                throw $util.ProtocolError("missing required 'coin'", { instance: message });
            if (!message.hasOwnProperty("totalCoin"))
                throw $util.ProtocolError("missing required 'totalCoin'", { instance: message });
            if (!message.hasOwnProperty("shareTimesOfToday"))
                throw $util.ProtocolError("missing required 'shareTimesOfToday'", { instance: message });
            if (!message.hasOwnProperty("recordDayOfShareTimes"))
                throw $util.ProtocolError("missing required 'recordDayOfShareTimes'", { instance: message });
            if (!message.hasOwnProperty("advTimesOfToday"))
                throw $util.ProtocolError("missing required 'advTimesOfToday'", { instance: message });
            if (!message.hasOwnProperty("recordDayOfAdvTimes"))
                throw $util.ProtocolError("missing required 'recordDayOfAdvTimes'", { instance: message });
            if (!message.hasOwnProperty("currLevel"))
                throw $util.ProtocolError("missing required 'currLevel'", { instance: message });
            return message;
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo message.
         * @function verify
         * @memberof csgw.PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.openID))
                return "openID: string expected";
            if (!$util.isString(message.sessID))
                return "sessID: string expected";
            if (!$util.isString(message.userID))
                return "userID: string expected";
            if (!$util.isInteger(message.lastSaveTime))
                return "lastSaveTime: integer expected";
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
            if (!$util.isInteger(message.sex))
                return "sex: integer expected";
            if (!$util.isString(message.headUrl))
                return "headUrl: string expected";
            if (!$util.isString(message.coin))
                return "coin: string expected";
            if (!$util.isString(message.totalCoin))
                return "totalCoin: string expected";
            if (!$util.isInteger(message.shareTimesOfToday))
                return "shareTimesOfToday: integer expected";
            if (!$util.isInteger(message.recordDayOfShareTimes))
                return "recordDayOfShareTimes: integer expected";
            if (!$util.isInteger(message.advTimesOfToday))
                return "advTimesOfToday: integer expected";
            if (!$util.isInteger(message.recordDayOfAdvTimes))
                return "recordDayOfAdvTimes: integer expected";
            if (!$util.isInteger(message.currLevel))
                return "currLevel: integer expected";
            if (message.physical != null && message.hasOwnProperty("physical"))
                if (!$util.isInteger(message.physical))
                    return "physical: integer expected";
            if (message.levelStar != null && message.hasOwnProperty("levelStar"))
                if (!$util.isString(message.levelStar))
                    return "levelStar: string expected";
            if (message.currSkin != null && message.hasOwnProperty("currSkin"))
                if (!$util.isInteger(message.currSkin))
                    return "currSkin: integer expected";
            if (message.unlockSkin != null && message.hasOwnProperty("unlockSkin"))
                if (!$util.isString(message.unlockSkin))
                    return "unlockSkin: string expected";
            if (message.signInfo != null && message.hasOwnProperty("signInfo"))
                if (!$util.isString(message.signInfo))
                    return "signInfo: string expected";
            if (message.buySing != null && message.hasOwnProperty("buySing"))
                if (!$util.isString(message.buySing))
                    return "buySing: string expected";
            if (message.currGun != null && message.hasOwnProperty("currGun"))
                if (!$util.isInteger(message.currGun))
                    return "currGun: integer expected";
            if (message.unlockGun != null && message.hasOwnProperty("unlockGun"))
                if (!$util.isString(message.unlockGun))
                    return "unlockGun: string expected";
            if (message.gem != null && message.hasOwnProperty("gem"))
                if (!$util.isInteger(message.gem))
                    return "gem: integer expected";
            if (message.starScale != null && message.hasOwnProperty("starScale"))
                if (!$util.isString(message.starScale))
                    return "starScale: string expected";
            return null;
        };

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.PlayerInfo} PlayerInfo
         */
        PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.PlayerInfo)
                return object;
            var message = new $root.csgw.PlayerInfo();
            if (object.openID != null)
                message.openID = String(object.openID);
            if (object.sessID != null)
                message.sessID = String(object.sessID);
            if (object.userID != null)
                message.userID = String(object.userID);
            if (object.lastSaveTime != null)
                message.lastSaveTime = object.lastSaveTime >>> 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.sex != null)
                message.sex = object.sex >>> 0;
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.coin != null)
                message.coin = String(object.coin);
            if (object.totalCoin != null)
                message.totalCoin = String(object.totalCoin);
            if (object.shareTimesOfToday != null)
                message.shareTimesOfToday = object.shareTimesOfToday >>> 0;
            if (object.recordDayOfShareTimes != null)
                message.recordDayOfShareTimes = object.recordDayOfShareTimes >>> 0;
            if (object.advTimesOfToday != null)
                message.advTimesOfToday = object.advTimesOfToday >>> 0;
            if (object.recordDayOfAdvTimes != null)
                message.recordDayOfAdvTimes = object.recordDayOfAdvTimes >>> 0;
            if (object.currLevel != null)
                message.currLevel = object.currLevel >>> 0;
            if (object.physical != null)
                message.physical = object.physical >>> 0;
            if (object.levelStar != null)
                message.levelStar = String(object.levelStar);
            if (object.currSkin != null)
                message.currSkin = object.currSkin >>> 0;
            if (object.unlockSkin != null)
                message.unlockSkin = String(object.unlockSkin);
            if (object.signInfo != null)
                message.signInfo = String(object.signInfo);
            if (object.buySing != null)
                message.buySing = String(object.buySing);
            if (object.currGun != null)
                message.currGun = object.currGun >>> 0;
            if (object.unlockGun != null)
                message.unlockGun = String(object.unlockGun);
            if (object.gem != null)
                message.gem = object.gem >>> 0;
            if (object.starScale != null)
                message.starScale = String(object.starScale);
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.PlayerInfo
         * @static
         * @param {csgw.PlayerInfo} message PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openID = "";
                object.sessID = "";
                object.userID = "";
                object.lastSaveTime = 0;
                object.nickname = "";
                object.sex = 0;
                object.headUrl = "";
                object.coin = "";
                object.totalCoin = "";
                object.shareTimesOfToday = 0;
                object.recordDayOfShareTimes = 0;
                object.advTimesOfToday = 0;
                object.recordDayOfAdvTimes = 0;
                object.currLevel = 0;
                object.physical = 0;
                object.levelStar = "";
                object.currSkin = 0;
                object.unlockSkin = "";
                object.signInfo = "";
                object.buySing = "";
                object.currGun = 0;
                object.unlockGun = "";
                object.gem = 0;
                object.starScale = "";
            }
            if (message.openID != null && message.hasOwnProperty("openID"))
                object.openID = message.openID;
            if (message.sessID != null && message.hasOwnProperty("sessID"))
                object.sessID = message.sessID;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.lastSaveTime != null && message.hasOwnProperty("lastSaveTime"))
                object.lastSaveTime = message.lastSaveTime;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.sex != null && message.hasOwnProperty("sex"))
                object.sex = message.sex;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.coin != null && message.hasOwnProperty("coin"))
                object.coin = message.coin;
            if (message.totalCoin != null && message.hasOwnProperty("totalCoin"))
                object.totalCoin = message.totalCoin;
            if (message.shareTimesOfToday != null && message.hasOwnProperty("shareTimesOfToday"))
                object.shareTimesOfToday = message.shareTimesOfToday;
            if (message.recordDayOfShareTimes != null && message.hasOwnProperty("recordDayOfShareTimes"))
                object.recordDayOfShareTimes = message.recordDayOfShareTimes;
            if (message.advTimesOfToday != null && message.hasOwnProperty("advTimesOfToday"))
                object.advTimesOfToday = message.advTimesOfToday;
            if (message.recordDayOfAdvTimes != null && message.hasOwnProperty("recordDayOfAdvTimes"))
                object.recordDayOfAdvTimes = message.recordDayOfAdvTimes;
            if (message.currLevel != null && message.hasOwnProperty("currLevel"))
                object.currLevel = message.currLevel;
            if (message.physical != null && message.hasOwnProperty("physical"))
                object.physical = message.physical;
            if (message.levelStar != null && message.hasOwnProperty("levelStar"))
                object.levelStar = message.levelStar;
            if (message.currSkin != null && message.hasOwnProperty("currSkin"))
                object.currSkin = message.currSkin;
            if (message.unlockSkin != null && message.hasOwnProperty("unlockSkin"))
                object.unlockSkin = message.unlockSkin;
            if (message.signInfo != null && message.hasOwnProperty("signInfo"))
                object.signInfo = message.signInfo;
            if (message.buySing != null && message.hasOwnProperty("buySing"))
                object.buySing = message.buySing;
            if (message.currGun != null && message.hasOwnProperty("currGun"))
                object.currGun = message.currGun;
            if (message.unlockGun != null && message.hasOwnProperty("unlockGun"))
                object.unlockGun = message.unlockGun;
            if (message.gem != null && message.hasOwnProperty("gem"))
                object.gem = message.gem;
            if (message.starScale != null && message.hasOwnProperty("starScale"))
                object.starScale = message.starScale;
            return object;
        };

        /**
         * Converts this PlayerInfo to JSON.
         * @function toJSON
         * @memberof csgw.PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfo;
    })();

    csgw.SkinConfig = (function() {

        /**
         * Properties of a SkinConfig.
         * @memberof csgw
         * @interface ISkinConfig
         * @property {number} id SkinConfig id
         * @property {string|null} [flag] SkinConfig flag
         * @property {number|null} [buy] SkinConfig buy
         * @property {number|null} [task] SkinConfig task
         */

        /**
         * Constructs a new SkinConfig.
         * @memberof csgw
         * @classdesc Represents a SkinConfig.
         * @implements ISkinConfig
         * @constructor
         * @param {csgw.ISkinConfig=} [properties] Properties to set
         */
        function SkinConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SkinConfig id.
         * @member {number} id
         * @memberof csgw.SkinConfig
         * @instance
         */
        SkinConfig.prototype.id = 0;

        /**
         * SkinConfig flag.
         * @member {string} flag
         * @memberof csgw.SkinConfig
         * @instance
         */
        SkinConfig.prototype.flag = "";

        /**
         * SkinConfig buy.
         * @member {number} buy
         * @memberof csgw.SkinConfig
         * @instance
         */
        SkinConfig.prototype.buy = 0;

        /**
         * SkinConfig task.
         * @member {number} task
         * @memberof csgw.SkinConfig
         * @instance
         */
        SkinConfig.prototype.task = 0;

        /**
         * Creates a new SkinConfig instance using the specified properties.
         * @function create
         * @memberof csgw.SkinConfig
         * @static
         * @param {csgw.ISkinConfig=} [properties] Properties to set
         * @returns {csgw.SkinConfig} SkinConfig instance
         */
        SkinConfig.create = function create(properties) {
            return new SkinConfig(properties);
        };

        /**
         * Encodes the specified SkinConfig message. Does not implicitly {@link csgw.SkinConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.SkinConfig
         * @static
         * @param {csgw.ISkinConfig} message SkinConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.flag != null && message.hasOwnProperty("flag"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.flag);
            if (message.buy != null && message.hasOwnProperty("buy"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.buy);
            if (message.task != null && message.hasOwnProperty("task"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.task);
            return writer;
        };

        /**
         * Encodes the specified SkinConfig message, length delimited. Does not implicitly {@link csgw.SkinConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.SkinConfig
         * @static
         * @param {csgw.ISkinConfig} message SkinConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SkinConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.SkinConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.SkinConfig} SkinConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.SkinConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.flag = reader.string();
                    break;
                case 3:
                    message.buy = reader.uint32();
                    break;
                case 4:
                    message.task = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes a SkinConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.SkinConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.SkinConfig} SkinConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SkinConfig message.
         * @function verify
         * @memberof csgw.SkinConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SkinConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (message.flag != null && message.hasOwnProperty("flag"))
                if (!$util.isString(message.flag))
                    return "flag: string expected";
            if (message.buy != null && message.hasOwnProperty("buy"))
                if (!$util.isInteger(message.buy))
                    return "buy: integer expected";
            if (message.task != null && message.hasOwnProperty("task"))
                if (!$util.isInteger(message.task))
                    return "task: integer expected";
            return null;
        };

        /**
         * Creates a SkinConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.SkinConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.SkinConfig} SkinConfig
         */
        SkinConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.SkinConfig)
                return object;
            var message = new $root.csgw.SkinConfig();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.flag != null)
                message.flag = String(object.flag);
            if (object.buy != null)
                message.buy = object.buy >>> 0;
            if (object.task != null)
                message.task = object.task >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SkinConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.SkinConfig
         * @static
         * @param {csgw.SkinConfig} message SkinConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SkinConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.flag = "";
                object.buy = 0;
                object.task = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.flag != null && message.hasOwnProperty("flag"))
                object.flag = message.flag;
            if (message.buy != null && message.hasOwnProperty("buy"))
                object.buy = message.buy;
            if (message.task != null && message.hasOwnProperty("task"))
                object.task = message.task;
            return object;
        };

        /**
         * Converts this SkinConfig to JSON.
         * @function toJSON
         * @memberof csgw.SkinConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SkinConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SkinConfig;
    })();

    csgw.TBSkinConfig = (function() {

        /**
         * Properties of a TBSkinConfig.
         * @memberof csgw
         * @interface ITBSkinConfig
         * @property {Array.<csgw.ISkinConfig>|null} [list] TBSkinConfig list
         */

        /**
         * Constructs a new TBSkinConfig.
         * @memberof csgw
         * @classdesc Represents a TBSkinConfig.
         * @implements ITBSkinConfig
         * @constructor
         * @param {csgw.ITBSkinConfig=} [properties] Properties to set
         */
        function TBSkinConfig(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBSkinConfig list.
         * @member {Array.<csgw.ISkinConfig>} list
         * @memberof csgw.TBSkinConfig
         * @instance
         */
        TBSkinConfig.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBSkinConfig instance using the specified properties.
         * @function create
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {csgw.ITBSkinConfig=} [properties] Properties to set
         * @returns {csgw.TBSkinConfig} TBSkinConfig instance
         */
        TBSkinConfig.create = function create(properties) {
            return new TBSkinConfig(properties);
        };

        /**
         * Encodes the specified TBSkinConfig message. Does not implicitly {@link csgw.TBSkinConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {csgw.ITBSkinConfig} message TBSkinConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBSkinConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.SkinConfig.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBSkinConfig message, length delimited. Does not implicitly {@link csgw.TBSkinConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {csgw.ITBSkinConfig} message TBSkinConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBSkinConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBSkinConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBSkinConfig} TBSkinConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBSkinConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBSkinConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.SkinConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBSkinConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBSkinConfig} TBSkinConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBSkinConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBSkinConfig message.
         * @function verify
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBSkinConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.SkinConfig.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBSkinConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBSkinConfig} TBSkinConfig
         */
        TBSkinConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBSkinConfig)
                return object;
            var message = new $root.csgw.TBSkinConfig();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBSkinConfig.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBSkinConfig.list: object expected");
                    message.list[i] = $root.csgw.SkinConfig.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBSkinConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBSkinConfig
         * @static
         * @param {csgw.TBSkinConfig} message TBSkinConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBSkinConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.SkinConfig.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBSkinConfig to JSON.
         * @function toJSON
         * @memberof csgw.TBSkinConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBSkinConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBSkinConfig;
    })();

    csgw.AtlasConfig = (function() {

        /**
         * Properties of an AtlasConfig.
         * @memberof csgw
         * @interface IAtlasConfig
         * @property {number} id AtlasConfig id
         * @property {string|null} [imgNm] AtlasConfig imgNm
         * @property {string|null} [atlas] AtlasConfig atlas
         */

        /**
         * Constructs a new AtlasConfig.
         * @memberof csgw
         * @classdesc Represents an AtlasConfig.
         * @implements IAtlasConfig
         * @constructor
         * @param {csgw.IAtlasConfig=} [properties] Properties to set
         */
        function AtlasConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AtlasConfig id.
         * @member {number} id
         * @memberof csgw.AtlasConfig
         * @instance
         */
        AtlasConfig.prototype.id = 0;

        /**
         * AtlasConfig imgNm.
         * @member {string} imgNm
         * @memberof csgw.AtlasConfig
         * @instance
         */
        AtlasConfig.prototype.imgNm = "";

        /**
         * AtlasConfig atlas.
         * @member {string} atlas
         * @memberof csgw.AtlasConfig
         * @instance
         */
        AtlasConfig.prototype.atlas = "";

        /**
         * Creates a new AtlasConfig instance using the specified properties.
         * @function create
         * @memberof csgw.AtlasConfig
         * @static
         * @param {csgw.IAtlasConfig=} [properties] Properties to set
         * @returns {csgw.AtlasConfig} AtlasConfig instance
         */
        AtlasConfig.create = function create(properties) {
            return new AtlasConfig(properties);
        };

        /**
         * Encodes the specified AtlasConfig message. Does not implicitly {@link csgw.AtlasConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.AtlasConfig
         * @static
         * @param {csgw.IAtlasConfig} message AtlasConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AtlasConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.imgNm != null && message.hasOwnProperty("imgNm"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.imgNm);
            if (message.atlas != null && message.hasOwnProperty("atlas"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.atlas);
            return writer;
        };

        /**
         * Encodes the specified AtlasConfig message, length delimited. Does not implicitly {@link csgw.AtlasConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.AtlasConfig
         * @static
         * @param {csgw.IAtlasConfig} message AtlasConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AtlasConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AtlasConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.AtlasConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.AtlasConfig} AtlasConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AtlasConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.AtlasConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.imgNm = reader.string();
                    break;
                case 3:
                    message.atlas = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes an AtlasConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.AtlasConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.AtlasConfig} AtlasConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AtlasConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AtlasConfig message.
         * @function verify
         * @memberof csgw.AtlasConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AtlasConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (message.imgNm != null && message.hasOwnProperty("imgNm"))
                if (!$util.isString(message.imgNm))
                    return "imgNm: string expected";
            if (message.atlas != null && message.hasOwnProperty("atlas"))
                if (!$util.isString(message.atlas))
                    return "atlas: string expected";
            return null;
        };

        /**
         * Creates an AtlasConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.AtlasConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.AtlasConfig} AtlasConfig
         */
        AtlasConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.AtlasConfig)
                return object;
            var message = new $root.csgw.AtlasConfig();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.imgNm != null)
                message.imgNm = String(object.imgNm);
            if (object.atlas != null)
                message.atlas = String(object.atlas);
            return message;
        };

        /**
         * Creates a plain object from an AtlasConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.AtlasConfig
         * @static
         * @param {csgw.AtlasConfig} message AtlasConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AtlasConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.imgNm = "";
                object.atlas = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.imgNm != null && message.hasOwnProperty("imgNm"))
                object.imgNm = message.imgNm;
            if (message.atlas != null && message.hasOwnProperty("atlas"))
                object.atlas = message.atlas;
            return object;
        };

        /**
         * Converts this AtlasConfig to JSON.
         * @function toJSON
         * @memberof csgw.AtlasConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AtlasConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AtlasConfig;
    })();

    csgw.TBAtlasConfig = (function() {

        /**
         * Properties of a TBAtlasConfig.
         * @memberof csgw
         * @interface ITBAtlasConfig
         * @property {Array.<csgw.IAtlasConfig>|null} [list] TBAtlasConfig list
         */

        /**
         * Constructs a new TBAtlasConfig.
         * @memberof csgw
         * @classdesc Represents a TBAtlasConfig.
         * @implements ITBAtlasConfig
         * @constructor
         * @param {csgw.ITBAtlasConfig=} [properties] Properties to set
         */
        function TBAtlasConfig(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBAtlasConfig list.
         * @member {Array.<csgw.IAtlasConfig>} list
         * @memberof csgw.TBAtlasConfig
         * @instance
         */
        TBAtlasConfig.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBAtlasConfig instance using the specified properties.
         * @function create
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {csgw.ITBAtlasConfig=} [properties] Properties to set
         * @returns {csgw.TBAtlasConfig} TBAtlasConfig instance
         */
        TBAtlasConfig.create = function create(properties) {
            return new TBAtlasConfig(properties);
        };

        /**
         * Encodes the specified TBAtlasConfig message. Does not implicitly {@link csgw.TBAtlasConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {csgw.ITBAtlasConfig} message TBAtlasConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBAtlasConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.AtlasConfig.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBAtlasConfig message, length delimited. Does not implicitly {@link csgw.TBAtlasConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {csgw.ITBAtlasConfig} message TBAtlasConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBAtlasConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBAtlasConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBAtlasConfig} TBAtlasConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBAtlasConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBAtlasConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.AtlasConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBAtlasConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBAtlasConfig} TBAtlasConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBAtlasConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBAtlasConfig message.
         * @function verify
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBAtlasConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.AtlasConfig.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBAtlasConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBAtlasConfig} TBAtlasConfig
         */
        TBAtlasConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBAtlasConfig)
                return object;
            var message = new $root.csgw.TBAtlasConfig();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBAtlasConfig.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBAtlasConfig.list: object expected");
                    message.list[i] = $root.csgw.AtlasConfig.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBAtlasConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBAtlasConfig
         * @static
         * @param {csgw.TBAtlasConfig} message TBAtlasConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBAtlasConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.AtlasConfig.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBAtlasConfig to JSON.
         * @function toJSON
         * @memberof csgw.TBAtlasConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBAtlasConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBAtlasConfig;
    })();

    csgw.LevelConfig = (function() {

        /**
         * Properties of a LevelConfig.
         * @memberof csgw
         * @interface ILevelConfig
         * @property {number} id LevelConfig id
         * @property {string} atlNm LevelConfig atlNm
         * @property {string} preNm LevelConfig preNm
         * @property {string} sceneNm LevelConfig sceneNm
         * @property {string|null} [prevScene] LevelConfig prevScene
         */

        /**
         * Constructs a new LevelConfig.
         * @memberof csgw
         * @classdesc Represents a LevelConfig.
         * @implements ILevelConfig
         * @constructor
         * @param {csgw.ILevelConfig=} [properties] Properties to set
         */
        function LevelConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LevelConfig id.
         * @member {number} id
         * @memberof csgw.LevelConfig
         * @instance
         */
        LevelConfig.prototype.id = 0;

        /**
         * LevelConfig atlNm.
         * @member {string} atlNm
         * @memberof csgw.LevelConfig
         * @instance
         */
        LevelConfig.prototype.atlNm = "";

        /**
         * LevelConfig preNm.
         * @member {string} preNm
         * @memberof csgw.LevelConfig
         * @instance
         */
        LevelConfig.prototype.preNm = "";

        /**
         * LevelConfig sceneNm.
         * @member {string} sceneNm
         * @memberof csgw.LevelConfig
         * @instance
         */
        LevelConfig.prototype.sceneNm = "";

        /**
         * LevelConfig prevScene.
         * @member {string} prevScene
         * @memberof csgw.LevelConfig
         * @instance
         */
        LevelConfig.prototype.prevScene = "";

        /**
         * Creates a new LevelConfig instance using the specified properties.
         * @function create
         * @memberof csgw.LevelConfig
         * @static
         * @param {csgw.ILevelConfig=} [properties] Properties to set
         * @returns {csgw.LevelConfig} LevelConfig instance
         */
        LevelConfig.create = function create(properties) {
            return new LevelConfig(properties);
        };

        /**
         * Encodes the specified LevelConfig message. Does not implicitly {@link csgw.LevelConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.LevelConfig
         * @static
         * @param {csgw.ILevelConfig} message LevelConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LevelConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.atlNm);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.preNm);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.sceneNm);
            if (message.prevScene != null && message.hasOwnProperty("prevScene"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.prevScene);
            return writer;
        };

        /**
         * Encodes the specified LevelConfig message, length delimited. Does not implicitly {@link csgw.LevelConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.LevelConfig
         * @static
         * @param {csgw.ILevelConfig} message LevelConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LevelConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LevelConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.LevelConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.LevelConfig} LevelConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LevelConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.LevelConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.atlNm = reader.string();
                    break;
                case 3:
                    message.preNm = reader.string();
                    break;
                case 4:
                    message.sceneNm = reader.string();
                    break;
                case 5:
                    message.prevScene = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("atlNm"))
                throw $util.ProtocolError("missing required 'atlNm'", { instance: message });
            if (!message.hasOwnProperty("preNm"))
                throw $util.ProtocolError("missing required 'preNm'", { instance: message });
            if (!message.hasOwnProperty("sceneNm"))
                throw $util.ProtocolError("missing required 'sceneNm'", { instance: message });
            return message;
        };

        /**
         * Decodes a LevelConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.LevelConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.LevelConfig} LevelConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LevelConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LevelConfig message.
         * @function verify
         * @memberof csgw.LevelConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LevelConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (!$util.isString(message.atlNm))
                return "atlNm: string expected";
            if (!$util.isString(message.preNm))
                return "preNm: string expected";
            if (!$util.isString(message.sceneNm))
                return "sceneNm: string expected";
            if (message.prevScene != null && message.hasOwnProperty("prevScene"))
                if (!$util.isString(message.prevScene))
                    return "prevScene: string expected";
            return null;
        };

        /**
         * Creates a LevelConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.LevelConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.LevelConfig} LevelConfig
         */
        LevelConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.LevelConfig)
                return object;
            var message = new $root.csgw.LevelConfig();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.atlNm != null)
                message.atlNm = String(object.atlNm);
            if (object.preNm != null)
                message.preNm = String(object.preNm);
            if (object.sceneNm != null)
                message.sceneNm = String(object.sceneNm);
            if (object.prevScene != null)
                message.prevScene = String(object.prevScene);
            return message;
        };

        /**
         * Creates a plain object from a LevelConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.LevelConfig
         * @static
         * @param {csgw.LevelConfig} message LevelConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LevelConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.atlNm = "";
                object.preNm = "";
                object.sceneNm = "";
                object.prevScene = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.atlNm != null && message.hasOwnProperty("atlNm"))
                object.atlNm = message.atlNm;
            if (message.preNm != null && message.hasOwnProperty("preNm"))
                object.preNm = message.preNm;
            if (message.sceneNm != null && message.hasOwnProperty("sceneNm"))
                object.sceneNm = message.sceneNm;
            if (message.prevScene != null && message.hasOwnProperty("prevScene"))
                object.prevScene = message.prevScene;
            return object;
        };

        /**
         * Converts this LevelConfig to JSON.
         * @function toJSON
         * @memberof csgw.LevelConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LevelConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LevelConfig;
    })();

    csgw.TBLevelConfig = (function() {

        /**
         * Properties of a TBLevelConfig.
         * @memberof csgw
         * @interface ITBLevelConfig
         * @property {Array.<csgw.ILevelConfig>|null} [list] TBLevelConfig list
         */

        /**
         * Constructs a new TBLevelConfig.
         * @memberof csgw
         * @classdesc Represents a TBLevelConfig.
         * @implements ITBLevelConfig
         * @constructor
         * @param {csgw.ITBLevelConfig=} [properties] Properties to set
         */
        function TBLevelConfig(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBLevelConfig list.
         * @member {Array.<csgw.ILevelConfig>} list
         * @memberof csgw.TBLevelConfig
         * @instance
         */
        TBLevelConfig.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBLevelConfig instance using the specified properties.
         * @function create
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {csgw.ITBLevelConfig=} [properties] Properties to set
         * @returns {csgw.TBLevelConfig} TBLevelConfig instance
         */
        TBLevelConfig.create = function create(properties) {
            return new TBLevelConfig(properties);
        };

        /**
         * Encodes the specified TBLevelConfig message. Does not implicitly {@link csgw.TBLevelConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {csgw.ITBLevelConfig} message TBLevelConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBLevelConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.LevelConfig.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBLevelConfig message, length delimited. Does not implicitly {@link csgw.TBLevelConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {csgw.ITBLevelConfig} message TBLevelConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBLevelConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBLevelConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBLevelConfig} TBLevelConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBLevelConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBLevelConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.LevelConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBLevelConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBLevelConfig} TBLevelConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBLevelConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBLevelConfig message.
         * @function verify
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBLevelConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.LevelConfig.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBLevelConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBLevelConfig} TBLevelConfig
         */
        TBLevelConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBLevelConfig)
                return object;
            var message = new $root.csgw.TBLevelConfig();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBLevelConfig.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBLevelConfig.list: object expected");
                    message.list[i] = $root.csgw.LevelConfig.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBLevelConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBLevelConfig
         * @static
         * @param {csgw.TBLevelConfig} message TBLevelConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBLevelConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.LevelConfig.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBLevelConfig to JSON.
         * @function toJSON
         * @memberof csgw.TBLevelConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBLevelConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBLevelConfig;
    })();

    csgw.SignConfig = (function() {

        /**
         * Properties of a SignConfig.
         * @memberof csgw
         * @interface ISignConfig
         * @property {number} id SignConfig id
         * @property {number} type SignConfig type
         * @property {string} count SignConfig count
         */

        /**
         * Constructs a new SignConfig.
         * @memberof csgw
         * @classdesc Represents a SignConfig.
         * @implements ISignConfig
         * @constructor
         * @param {csgw.ISignConfig=} [properties] Properties to set
         */
        function SignConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SignConfig id.
         * @member {number} id
         * @memberof csgw.SignConfig
         * @instance
         */
        SignConfig.prototype.id = 0;

        /**
         * SignConfig type.
         * @member {number} type
         * @memberof csgw.SignConfig
         * @instance
         */
        SignConfig.prototype.type = 0;

        /**
         * SignConfig count.
         * @member {string} count
         * @memberof csgw.SignConfig
         * @instance
         */
        SignConfig.prototype.count = "";

        /**
         * Creates a new SignConfig instance using the specified properties.
         * @function create
         * @memberof csgw.SignConfig
         * @static
         * @param {csgw.ISignConfig=} [properties] Properties to set
         * @returns {csgw.SignConfig} SignConfig instance
         */
        SignConfig.create = function create(properties) {
            return new SignConfig(properties);
        };

        /**
         * Encodes the specified SignConfig message. Does not implicitly {@link csgw.SignConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.SignConfig
         * @static
         * @param {csgw.ISignConfig} message SignConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.type);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.count);
            return writer;
        };

        /**
         * Encodes the specified SignConfig message, length delimited. Does not implicitly {@link csgw.SignConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.SignConfig
         * @static
         * @param {csgw.ISignConfig} message SignConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SignConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.SignConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.SignConfig} SignConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.SignConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.type = reader.uint32();
                    break;
                case 3:
                    message.count = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("count"))
                throw $util.ProtocolError("missing required 'count'", { instance: message });
            return message;
        };

        /**
         * Decodes a SignConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.SignConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.SignConfig} SignConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SignConfig message.
         * @function verify
         * @memberof csgw.SignConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SignConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (!$util.isInteger(message.type))
                return "type: integer expected";
            if (!$util.isString(message.count))
                return "count: string expected";
            return null;
        };

        /**
         * Creates a SignConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.SignConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.SignConfig} SignConfig
         */
        SignConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.SignConfig)
                return object;
            var message = new $root.csgw.SignConfig();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.type != null)
                message.type = object.type >>> 0;
            if (object.count != null)
                message.count = String(object.count);
            return message;
        };

        /**
         * Creates a plain object from a SignConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.SignConfig
         * @static
         * @param {csgw.SignConfig} message SignConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SignConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.type = 0;
                object.count = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this SignConfig to JSON.
         * @function toJSON
         * @memberof csgw.SignConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SignConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SignConfig;
    })();

    csgw.TBSignConfig = (function() {

        /**
         * Properties of a TBSignConfig.
         * @memberof csgw
         * @interface ITBSignConfig
         * @property {Array.<csgw.ISignConfig>|null} [list] TBSignConfig list
         */

        /**
         * Constructs a new TBSignConfig.
         * @memberof csgw
         * @classdesc Represents a TBSignConfig.
         * @implements ITBSignConfig
         * @constructor
         * @param {csgw.ITBSignConfig=} [properties] Properties to set
         */
        function TBSignConfig(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBSignConfig list.
         * @member {Array.<csgw.ISignConfig>} list
         * @memberof csgw.TBSignConfig
         * @instance
         */
        TBSignConfig.prototype.list = $util.emptyArray;

        /**
         * Creates a new TBSignConfig instance using the specified properties.
         * @function create
         * @memberof csgw.TBSignConfig
         * @static
         * @param {csgw.ITBSignConfig=} [properties] Properties to set
         * @returns {csgw.TBSignConfig} TBSignConfig instance
         */
        TBSignConfig.create = function create(properties) {
            return new TBSignConfig(properties);
        };

        /**
         * Encodes the specified TBSignConfig message. Does not implicitly {@link csgw.TBSignConfig.verify|verify} messages.
         * @function encode
         * @memberof csgw.TBSignConfig
         * @static
         * @param {csgw.ITBSignConfig} message TBSignConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBSignConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.csgw.SignConfig.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBSignConfig message, length delimited. Does not implicitly {@link csgw.TBSignConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof csgw.TBSignConfig
         * @static
         * @param {csgw.ITBSignConfig} message TBSignConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBSignConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBSignConfig message from the specified reader or buffer.
         * @function decode
         * @memberof csgw.TBSignConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {csgw.TBSignConfig} TBSignConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBSignConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.csgw.TBSignConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.csgw.SignConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBSignConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof csgw.TBSignConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {csgw.TBSignConfig} TBSignConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBSignConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBSignConfig message.
         * @function verify
         * @memberof csgw.TBSignConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBSignConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.csgw.SignConfig.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TBSignConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof csgw.TBSignConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {csgw.TBSignConfig} TBSignConfig
         */
        TBSignConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.csgw.TBSignConfig)
                return object;
            var message = new $root.csgw.TBSignConfig();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".csgw.TBSignConfig.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".csgw.TBSignConfig.list: object expected");
                    message.list[i] = $root.csgw.SignConfig.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TBSignConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof csgw.TBSignConfig
         * @static
         * @param {csgw.TBSignConfig} message TBSignConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBSignConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.csgw.SignConfig.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this TBSignConfig to JSON.
         * @function toJSON
         * @memberof csgw.TBSignConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBSignConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBSignConfig;
    })();

    return csgw;
})();

module.exports = $root;
