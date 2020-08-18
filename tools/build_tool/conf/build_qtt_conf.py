import os

# root of compress tool path
_ROOT_OF_COMPRESS_TOOL = "Tools/ScriptPNG/ScriptPNG.cmd"

# root of backup project(relative path)
_ROOT_OF_BACKUP_PROJECT = 'qttgame'

# root of build project(relative path)
_ROOT_OF_BUILD_PROJECT = '../../build/qttgame'

# backup output dir(absolute path)
_DIR_OF_BACKUP_OUTPUT_DIR = ""

# replace (relative, delete old first) (step 1)
_REPLACES = [
	"index.html"
]

# copy (relative) (step 2)
_COPYS = [
]

# moves in build project (relative) (step 3)
_MOVES_IN_BUILD_PROJECT = [
]

# no compresses in (build project) raw-assets dir (relative) (step 4)
_UN_COMPRESSES_IN_RAW_ASSETS = [
]