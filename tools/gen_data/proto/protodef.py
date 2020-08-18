#coding=utf-8

import sys
#import xlrd
import shutil

#protobuf
_curFile = None
_msgFieldIdx = 0
_fileName = ''
_curMsgName = None
_curMsgPrefix = None

#xml
_curXml = None
_fileXmlName = ''
_dictEnum2Fields = {}
_dictEnumDefs = {}

#####################################################
#excel
#_xls = xlrd.open_workbook(path)
#_xlstable = self.xls.sheets()[0]

#####################################################
#mysql
_curSql = None
_curSqlKey = None
_mysqlTypeDict = {}
_mysqlTypeDict['int32']='int(10)'
_mysqlTypeDict['uint64']='bigint(10) unsigned'
_mysqlTypeDict['float']=''
_mysqlTypeDict['string']='varchar(255) collate utf8_unicode_ci'
#_mysqlTypeDict['string']='text collate utf8_unicode_ci'

def getSqlTypeByProtobufType(t):
    global _mysqlTypeDict
    if t in _mysqlTypeDict:
        return _mysqlTypeDict[t]
    else:
        return 'int(10)' #enum

def writeSqlBegin(tbname):
    global _curSql
    _curSql.write('SET FOREIGN_KEY_CHECKS=0;\n')
    _curSql.write("DROP TABLE IF EXISTS `"+tbname+"`;\n")
    _curSql.write("CREATE TABLE `"+tbname+"`;\n")

def writeSqlR(n,t):
    global _curSql
    tn = getSqlTypeByProtobufType(t)
    _curSql.write("`"+n+"` "+tn+" NOT NULL default '0',\n")

def writeSqlO(n,t):
    global _curSql
    tn = getSqlTypeByProtobufType(t)
    _curSql.write("`"+n+"` "+tn+" NOT NULL default '0',\n")

def writeSqlStruct(prefix,t):
    pass

def writeSqlC(n,t):
    global _curSql
    tn = getSqlTypeByProtobufType(t)
    _curSql.write("`"+n+"` "+tn+" NOT NULL default '0',\n")
    

def writeSqlEnd():
    global _curSql
    global _curSqlKey
    if _curSqlKey is not None:
        idkey = 'id'
        _curSql.write("PRIMARY KEY  (`"+idkey+"`)\n")
    _curSql.write(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;\n")
    


#####################################################
def writeXml():
    global _curXml
    global _dictEnum2Fields
    global _dictEnumDefs
    _curXml = open(xmlName, 'w')
    _curXml.write('<?xml version="1.0" encoding="utf-8"?>\n')
    _curXml.write('<GlobalDefine>\n')
    for (k,v) in _dictEnum2Fields.items():
        _curXml.write('<MacroDefine Domain="DescHero.Type" Desc="英雄类型" >\n')
        for enumDef in _dictEnumDefs[k]:
            pass
            #_curXml.write('<Define name="'+enumDef.name+'" value="'+enumDef.val+'" />\n')
        _curXml.write('</MacroDefine>\n')
    _curXml.write('</GlobalDefine>\n')

def addEnum2Field(enumName,fieldName):
    global _curMsgName
    global _dictEnum2Fields
    if enumName in _dictEnum2Fields:
        _dictEnum2Fields[enumName].append(_curMsgName+'.'+fieldName)


#####################################################
def pdFileDef(protoFile, pkgName):
    #protobuf
    global _curFile
    global _fileName
    _fileName = protoFile
    _curFile = open(protoFile, 'w')
    _curFile.write('package '+pkgName+';\n')
    #xml
    global _fileXmlName
    #_fileXmlName = liteProtoFile

def pdFileImport(importfilename):
    #protobuf
    global _curFile
    _curFile.write('import "'+importfilename+'";\n')



def pdFileEnd():
    global _curFile
    global _fileXmlName
    global _fileName
    if sys.platform.startswith('linux') == False: # generate full runtime in server code
        #_curFile.write('\noption optimize_for = LITE_RUNTIME;\n')
        pass
    _curFile.close()
    print(_fileName + ' generated')
    #shutil.copy2(_fileName, _fileXmlName)
    #_curFile = open(_fileXmlName,'a')
    #_curFile.write('\noption optimize_for = LITE_RUNTIME;\n')
    #_curFile.close()
    #xmldef
    #writeXml()

def pdFileSplit(nextFileName, pkgname):
    global _fileName
    tmpstr = _fileName
    pdFileEnd()
    pdFileDef(nextFileName, pkgname)
    pdFileImport(tmpstr)


def pdEnumDef(n,cnSupport=False,allowAlias=False):
    global _curFile
    global _dictEnum2Fields
    global _dictEnumDefs
    _curFile.write('enum '+n+'{\n')
    if allowAlias:
        _curFile.write('option allow_alias = true;\n')
    #xml
    if cnSupport:
        _dictEnum2Fields[n] = []

def pdMsgDef(n,tablePrefix=None):
    global _curFile
    global _msgFieldIdx
    global _curMsgPrefix
    global _curMsgName
    _curFile.write('message '+n+'{'+'\n')
    _msgFieldIdx = 1
    _curMsgName = n
    _curMsgPrefix = tablePrefix

def pdEnd():
    global _curFile
    global _curMsgPrefix
    global _curMsgName
    _curFile.write('}'+'\n')
    if _curMsgPrefix is not None and _curMsgName is not None:
        _curFile.write('message '+_curMsgPrefix+_curMsgName+'{'+'\n')
        _curFile.write('repeated '+_curMsgName+' '+'list=1;'+'\n')
        _curFile.write('}\n')
    _curMsgPrefix = None
    _curMsgName = None

#required
def pdR(t,n,defVal=None,cn=None,desc=None):
    global _curFile
    global _msgFieldIdx
    content = 'required '+t+' '+n+'='+str(_msgFieldIdx)
    _msgFieldIdx = _msgFieldIdx+1
    if defVal is not None:
        content = content + ' [default='+defVal+']'
    content = content+';'
    if desc is not None:
        content = content + ' //desc='+desc
    if cn is not None:
        content = content + ' //cn='+cn
    _curFile.write(content+'\n')
    addEnum2Field(t,n)

#collection(repeated)
def pdC(t,n,defVal=None,cn=None,desc=None,packed=False):
    global _curFile
    global _msgFieldIdx
    content = 'repeated '+t+' '+n+'='+str(_msgFieldIdx)
    _msgFieldIdx = _msgFieldIdx+1
    if defVal is not None:
        content = content + ' [default='+defVal+']'
    if packed:
        content = content + ' [packed=true]'
    content = content+';'
    if desc is not None:
        content = content + ' //desc='+desc
    if cn is not None:
        content = content + ' //cn='+cn
    _curFile.write(content+'\n')
    addEnum2Field(t,n)

#optional
def pdO(t,n,defVal=None,cn=None,desc=None):
    global _curFile
    global _msgFieldIdx
    content = 'optional '+t+' '+n+'='+str(_msgFieldIdx)
    _msgFieldIdx = _msgFieldIdx+1
    if defVal is not None:
        content = content + ' [default='+defVal+']'
    content = content+';'
    if desc is not None:
        content = content + ' //desc='+desc
    if cn is not None:
        content = content + ' //cn='+cn
    _curFile.write(content+'\n')
    addEnum2Field(t,n)

#enum
def pdE(n,v,cn=None,desc=None):
    global _curFile
    content = n+'='+v+';'
    if desc is not None:
        content = content + ' //desc='+desc
    if cn is not None:
        content = content + ' //cn='+cn
    _curFile.write(content+'\n')



