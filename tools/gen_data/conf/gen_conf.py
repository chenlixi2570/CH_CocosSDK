import os

# namespace of proto data
_NAMESPACE_OF_PROTO_DATA = 'qysdk'

# output file name
_FILE_NAME_OF_PROTO_FILE = _NAMESPACE_OF_PROTO_DATA + '_db.proto'

# sign of encrypt
_SIGN = "encrypt:"

# key of encrypt
_KEY = "Qysdk"

# suffix of conf file
_SUFFIX = ".txt"

# encrypt conf files or not
_ENCRYPTED = False

# modify js file conf
_MODIFT_JS_CONF = {
	"var jspb = require('google-protobuf');": "var google_protobuf = require('google-protobuf');\nvar COMPILED = google_protobuf.COMPILED;\nvar jspb = google_protobuf.jspb;\nvar goog = google_protobuf.goog;\n\n",
	"var goog = jspb;": ""
}

# modify js file conf (protobufjs)
_MODIFT_JS_CONF_PROTOBUF = {
	"var $protobuf = require(\"protobufjs/minimal\");": "var $protobuf = protobuf;\n",
	"module.exports = $root;": "var " + _NAMESPACE_OF_PROTO_DATA + " = $root." + _NAMESPACE_OF_PROTO_DATA + ";\nexport {" + _NAMESPACE_OF_PROTO_DATA + " as default};"
}

# root of publish tools directory(absolute path)(include file: publish.py)
_ROOT_OF_PUBLISH_TOOLS = ""