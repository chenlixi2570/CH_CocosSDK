@echo off

:user_settings
set "autorun=0"
set "autorun_option=1"
set "close_script_end=0"


:user_quality
set "lossy_png8_quality=1"
set "lossy_png8_dithering=1"
set "lossy_png24_quality=6"


:scriptpng
setlocal enabledelayedexpansion
color 0f
set "name=ScriptPNG"
set "version=02.04.2015"
set "lib=%~dp0lib\"
path %lib%;%path%
if "%~1" equ "thread" call:thread_run "%~2" %3 %4 & exit /b
set "script_name=%~0"
set "temporary_folder=%temp%\ScriptPNG\%random%\"
set "temporary_parent_folder=%temp%\ScriptPNG\"


:script_check
if exist %temporary_parent_folder% goto:debug_session
if not exist %lib% goto:debug_lib_folder
1>nul 2>&1 echo "%*" >%temp%1 & 1>nul 2>&1 find /v /i /c ")" %temp%1
if errorlevel 1 goto:debug_filename


:counters
set "current_png_number=0"
set "current_png_size=0"
set "total_png_number=0"
set "total_png_size=0"
set "change_png=0"
set "wait_in_ms=500"


:file_format
set "png="
set "log_file=%temporary_folder%log_file.csv"
set "counters_png=%temporary_folder%count_png"
set "separe_bar=__________________________________________________________________________"


:thread_configuration
set "number_of_png_thread=4"
if %number_of_png_thread% equ 1 (set "multi_thread=0") else set "multi_thread=1"
if "%~1" neq "" (
set "file_format=%*"
) else (
title %name% - %version%
echo.
echo.
echo  Usage   : To use %name%, just drag-and-drop your files
echo.
echo            on the %name% file
echo.
echo.
echo            -------------------
echo  Formats : PNG,GIF,JPG,PCX,TGA
echo            -------------------
echo.
echo.
echo  Config  : lossy png filtering   = %lossy_png24_quality%
echo            lossy png-8 quality   = %lossy_png8_quality%
if %lossy_png8_dithering% equ 1 echo            lossy png-8 dithering = yes
if %lossy_png8_dithering% neq 1 echo            lossy png-8 dithering = none
echo.
echo.
if exist %temporary_parent_folder% call:script_reset
pause >nul
goto:eof
)


:check_folder
echo.
set "root_path=%1"
echo root_path: "%root_path%"
for %%a in (%*) do (
if "%root_path%" neq "%%~a" (
call:define_source "%root_path%%%~a"
if defined is_a_png (
if not defined is_a_folder (
set /a "total_png_number+=1"
) else (
for /f "delims=" %%i in ('dir /b /s /a-d-h "%%~a\*.png" 2^>nul ^| find /c /v "" ') do set /a "total_png_number+=%%i"
1>nul 2>&1 dir /b /n "%~1\*.png" >%temp%2 & 1>nul 2>&1 find /v /i /c ")" %temp%2
if errorlevel 1 goto:debug_filename
)
)
)
)
echo total png number: %total_png_number%
if "%total_png_number%" equ "0" set "multi_thread=0"
set "file_format1="
for %%a in (%*) do (
if "%root_path%" neq "%%~a" (
set "is_not_png="
1>nul 2>nul dir "%root_path%%%~a" || (
goto:eof
)
if not defined is_not_png (
call:define_source "%root_path%%%~a"
if not defined is_a_png set "is_not_png=1"
if not defined is_not_png (
if defined is_a_png if not defined png call:user_interface "%root_path%%%~a"
set "file_format1=!file_format1! %root_path%%%a"
)
)
)
)
if not defined file_format1 goto:file_converter


:temporary_path
if not exist "%temporary_folder%" 1>nul 2>&1 md "%temporary_folder%"
if "%png%" equ "0" set "multi_thread=0"
if %multi_thread% neq 0 1>nul 2>&1 >"%log_file%" echo.
if not defined png set "png=0"


:first_echo
echo.
echo.
echo  %name% - %version%
echo.
echo.
call:set_title
set start=%time%
for %%a in (%file_format1%) do (
call:define_source "%%~a"
if defined is_a_png if "%png%" neq "0" call:png_in_folder "%%~a"
)


:thread_check_wait
set "thread="
for /l %%z in (1,1,%number_of_png_thread%) do if exist "%temporary_folder%threadpng%%z.lock" (set "thread=1") else call:echo_in_log & call:set_title
if defined thread >nul 2>&1 ping -n 1 -w %wait_in_ms% 127.255.255.255 & goto:thread_check_wait
if %close_script_end% equ 1 (
call:script_reset
exit /b
)
call:end
pause>nul & exit /b
:thread_creation
if %2 equ 1 call:thread_run "%~3" %1 1 & call:echo_in_log & exit /b
for /l %%z in (1,1,%2) do (
if not exist "%temporary_folder%thread%1%%z.lock" (
call:echo_in_log
>"%temporary_folder%thread%1%%z.lock" echo : %~3
start "" /b /low cmd.exe /c ""%script_name%" thread "%~3" %1 %%z "
exit /b
)
)
1>nul 2>&1 ping -n 1 -w %wait_in_ms% 127.255.255.255
goto:thread_creation


:echo_in_log
if %multi_thread% equ 0 exit /b
if exist "%temporary_folder%echo_in_log.lock" exit /b 
>"%temporary_folder%echo_in_log.lock" echo.echo_in_log %echo_file_log%
if not defined echo_file_log set "echo_file_log=1"
for /f "usebackq skip=%echo_file_log% tokens=1-5 delims=;" %%b in ("%log_file%") do (
echo  "%%~b"
echo  In  : %%c Bytes
if %%d geq %%c (
echo  Out : %%d Bytes
)
if %%d lss %%c (
echo  Out : %%d Bytes - %%e Bytes saved
)
echo  %separe_bar%
echo.
set /a "echo_file_log+=1"
)
1>nul 2>&1 del /f /q "%temporary_folder%echo_in_log.lock"
exit /b


:thread_run
if /i "%2" equ "png" call:png_run %1 %3 & call:count_more "%counters_png%"
if exist "%temporary_folder%thread%2%3.lock" >nul 2>&1 del /f /q "%temporary_folder%thread%2%3.lock"
exit /b



:count_more
if %multi_thread% equ 0 exit /b
call:loop_wait "%~1.lock"
>"%~1.lock" echo.%~1
>>"%counters_png%" echo.1
1>nul 2>&1 del /f /q "%~1.lock"
exit /b



:loop_wait
if exist "%~1" (1>nul 2>&1 ping -n 1 -w %wait_in_ms% 127.255.255.255 & goto:loop_wait)
exit /b 0



:define_source
set "is_a_png="
set "is_a_folder="
1>nul 2>nul dir /ad "%~1" && set "is_a_folder=1"
if not defined is_a_folder (
if /i "%~x1" equ ".png" set "is_a_png=1"
) else (
1>nul 2>nul dir /b /s /a-d-h "%~1\*.png" && set "is_a_png=1"
)
exit /b



:set_title
if "%png%" equ "0" (title %~1%name% %version% & exit /b)
if %multi_thread% neq 0 (
set "current_png_number=0"
for %%b in ("%counters_png%") do set /a "current_png_number=%%~zb/3" 2>nul
)
title %~1 [%current_png_number%/%total_png_number%] - %name% - %version%
exit /b



:user_interface
if %autorun% equ 1 (
if "%autorun_option%" neq "1" if "%autorun_option%" neq "2" if "%autorun_option%" neq "3" if "%autorun_option%" neq "8" if "%autorun_option%" neq "9" set "png=1" & exit /b
set "png=%autorun_option%"
exit /b
)
title %name% - %version%
echo.
echo.
echo.
echo   Lossless for Web :
echo   ----------------
echo.
echo   [1] Fast     [2] Intense     [3] High
echo.
echo.
echo   Lossy conversion :
echo   ----------------
echo.
echo.  [8] PNG8+A   [9] PNG24+A
echo.
echo.
echo.
echo.
set png=
set /p png=# Enter an option: 
echo.
if "%png%" equ "" goto:user_interface
if "%png%" neq "1" if "%png%" neq "2" if "%png%" neq "3" if "%png%" neq "8" if "%png%" neq "9" goto:user_interface
exit /b



:png_in_folder
if defined is_a_folder (
for /f "delims=" %%i in ('dir /b /s /a-d-h "%~1\*.png" ') do (
call:thread_creation png %number_of_png_thread% "%%~fi"
set /a "current_png_number+=1" & call:set_title
)
) else (
call:thread_creation png %number_of_png_thread% "%~1"
set /a "current_png_number+=1" & call:set_title
)
exit /b


:png_run
call:copy_temporary "%~1"
if %png% leq 4 call:clean_png_structure "%temporary_folder%%~nx1" >nul
if %png% equ 1 call:fast "%temporary_folder%%~nx1" >nul
if %png% equ 2 call:intense "%temporary_folder%%~nx1" >nul
if %png% equ 3 call:high "%temporary_folder%%~nx1" >nul
if %png% equ 8 call:lossy_png8 "%temporary_folder%%~nx1" >nul
if %png% equ 9 call:lossy_png24 "%temporary_folder%%~nx1" >nul
call:check_compare "%~f1" "%temporary_folder%%~nx1" >nul
if %sizein% leq %sizeout% call:clean_png_meta_deflate "%~f1"
call:save_log "%~f1" !file_size_origine!
exit /b


:copy_temporary
if %multi_thread% equ 0 (
echo  "%~nx1"
echo  In:  %~z1 Bytes
)
set "file_size_origine=%~z1"
1>nul 2>&1 copy /b /y "%~f1" "%temporary_folder%%~nx1"
exit /b


:clean_png_structure
pngout -c6 -f0 -s4 -k0 -q -y -force "%~f1"
exit /b


:clean_png_meta_deflate
truepng -nz -md remove all -quiet -force -y "%~f1"
deflopt -k -b -s "%~f1" >nul
1>nul 2>nul defluff < "%~f1" > "%~f1.tmp"
call:check_move "%~f1" "%~f1.tmp"
deflopt -k -b -s "%~f1" >nul
exit /b


:save_log
set /a "change=%2-%~z1"
if %multi_thread% neq 0 (
if exist "%temporary_folder%echo_in_log.lock" (1>nul 2>&1 ping -n 1 -w %wait_in_ms% 127.255.255.255 & goto:save_log)
1>nul 2>&1 >"%temporary_folder%echo_in_log.lock" echo.save_log %~1
1>nul 2>&1 >>"%log_file%" echo.%~nx1;%2;%~z1;%change%
1>nul 2>&1 del /f /q "%temporary_folder%echo_in_log.lock"
)
exit /b


:end
set finish=%time%
title Finished - %name% - %version%
if "%png%" equ "0" 1>nul ping -n 1 -w %wait_in_ms% 127.255.255.255 2>nul
if %multi_thread% neq 0 for /f "usebackq tokens=1-5 delims=;" %%a in ("%log_file%") do (
if /i "%%~xa" equ ".png" set /a "total_png_size+=%%b" & set /a "current_png_size+=%%c"
)
set /a "change_png=%total_png_size%-%current_png_size%" 2>nul
set /a "change_png_kb=%change_png%/1024" 2>nul
echo.
echo  Total: %change_png_kb% KB [%change_png% Bytes] saved.
echo.
echo.
echo  Started  at : %start%
echo  Finished at : %finish%
echo.
exit

:debug_lib_folder
title Error - %name% - %version%
cls
echo.
echo.
echo  %name% can not find lib folder.
echo.
echo.
pause >nul
goto:eof


:debug_session
for /f "tokens=* delims=" %%a in ('tasklist /v /fi "imagename eq cmd.exe" ^| find /c "%name%" ') do (
if %%a equ 1 exit
)
call:script_reset
1>nul ping -n 1 -w %wait_in_ms% 127.255.255.255 2>nul
goto:user_settings
exit


:file_converter
echo.
echo.
echo  %name% - %version%
echo.


:converter_run
echo.
echo  In : "%~n1%~x1"
echo  Out: "%~n1.png"
if %~x1 equ .bmp (
pngout -s2 -q -y -force "%~f1" >nul
echo  %separe_bar%
goto:converter_next
)
if %~x1 equ .gif (
pngout -s2 -k0 -q -y -force "%~f1" >nul
truepng -f0,5 -i0 -g0 -zc9 -zm9 -zs0,1 -quiet -force -y "%~n1.png"
echo  %separe_bar%
goto:converter_next
)
if %~x1 equ .jpg (
pngout -s3 -q -y -force "%~f1" >nul
echo  %separe_bar%
goto:converter_next
)
if %~x1 equ .jpeg (
pngout -s3 -q -y -force "%~f1" >nul
echo  %separe_bar%
goto:converter_next
)
if %~x1 equ .pcx (
pngout -q -y -force "%~f1" >nul
echo  %separe_bar%
goto:converter_next
)
if %~x1 equ .tga (
pngout -s2 -q -y -force "%~f1" >nul
echo  %separe_bar%
goto:converter_next
)


:debug_unsupported
title Error - %name% - %version%
cls
echo.
echo.
echo  %name% does not support this format.
echo.
echo.
pause >nul
goto:eof


:converter_next
shift
if .%1==. goto converter_end
goto:converter_run


:converter_end
echo.
echo.
echo. Job List Finished.
echo.
echo.
title Finished - %name% - %version%
pause >nul
goto:eof


:debug_filename
title Error - %name% - %version%
cls
echo.
echo.
echo  %name% does not support parenthesis.
echo.
echo.
pause >nul
goto:eof


:check_compare
set "sizein=%~z1"
set "sizeout=%~z2"
if %~z1 leq %~z2 (1>nul 2>&1 del /f /q %2) else (1>nul 2>&1 move /y %2 %1 || exit /b 1)
exit /b


:check_move
1>nul 2>&1 move /y %2 %1
exit /b


:check_colortype
for /f "tokens=1 delims=/c " %%i in ('pngout -l "%~f1"') do set "colortype=%%i"
exit /b


:check_filtering
for /f "tokens=2 delims=/f " %%i in ('pngout -l "%~f1"') do set "filtering=%%i"
exit /b


:fast
truepng -f0,5 -i0 -g0 -md remove all -zc8 -zm8 -zw7 -zs0,1 -quiet -force -y "%~f1"
advdef -z -3 -q "%~f1"
exit /b


:intense
truepng -f0,5 -i0 -g0 -md remove all -zc8 -zm8 -zw7 -zs0,1 -quiet -force -y "%~f1"
pngwolf --in="%~f1" --out="%~f1" --zlib-level=8 --zlib-strategy=1 --exclude-original --exclude-singles --exclude-heuristic --max-stagnate-time=0 --max-evaluations=1
advdef -z -3 -q "%~f1"
exit /b


:high
truepng -f0,5 -i0 -g0 -md remove all -zc8 -zm8 -zw7 -zs0,1 -quiet -force -y "%~f1"
call:check_colortype "%~f1"
if %colortype% equ 3 (
pngout -c3 -s3 -q -k0 -y -force "%~f1" "%temporary_folder%%~n1-pal.png"
advdef -z -3 -q "%temporary_folder%%~n1-pal.png"
)
if %colortype% geq 4 (
pngout -c6 -f0 -s4 -k0 -q -y -force "%~f1" "%temporary_folder%%~n1-f1.png"
cryopng -f1 -force -quiet -i0 -zc1 -zm1 -zs3 -zw32k -nx "%temporary_folder%%~n1-f1.png"
if %colortype% equ 4 (
pngout -c4 -f0 -s4 -k0 -q -y -force "%temporary_folder%%~n1-f1.png"
)
truepng -f0,5 -i0 -g0 -na -nc -md remove all -zc8 -zm8 -zw7 -zs0,1 -quiet -force -y "%temporary_folder%%~n1-f1.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-f1.png"
)
pngwolf --in="%~f1" --out="%~f1" --zlib-level=8 --zlib-strategy=1 --exclude-original --exclude-singles --exclude-heuristic --max-stagnate-time=0 --max-evaluations=1
advdef -z -3 -q "%~f1"
if %colortype% equ 3 (
call:check_compare "%~f1" "%temporary_folder%%~n1-pal.png"
)
exit /b


:lossy_png8
if %lossy_png8_dithering% equ 1 (
1>nul 2>&1 pngquant --speed %lossy_png8_quality% 256 "%~f1"
truepng -f0,5 -i0 -g0 -nc -md remove all -zc8 -zm8 -zs0,1 -quiet -force -y "%temporary_folder%%~n1-fs8.png"
advdef -z -3 -q "%temporary_folder%%~n1-fs8.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-fs8.png"
exit /b
)
1>nul 2>&1 pngquant --nofs --speed %lossy_png8_quality% "%~f1"
truepng -f0,5 -i0 -g0 -nc -md remove all -zc8 -zm8 -zs0,1 -quiet -force -y "%temporary_folder%%~n1-or8.png"
advdef -z -3 -q "%temporary_folder%%~n1-or8.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-or8.png"
exit /b


:lossy_png24
call:check_colortype "%~f1"
if %colortype% equ 0 exit /b
if %colortype% equ 3 goto:lossy_png24-8
if %colortype% equ 6 (
cryopng -f3 -force -quiet -i0 -zc1 -zm1 -zs3 -zw32k -nx "%~f1"
)
if %colortype% equ 4 (
pngout -c6 -f0 -s4 -k0 -q -y -force "%~f1"
cryopng -f3 -force -quiet -i0 -zc1 -zm1 -zs3 -zw32k -nx "%~f1"
pngout -c4 -f0 -s4 -k0 -q -y -force "%~f1"
)
truepng -f3 -i0 -g0 -na -nc -md remove all -l q=6 m=1 -zc1 -zm1 -zs3 -quiet -force -y "%~f1"
advdef -z -3 -q "%~f1"
exit /b


:lossy_png24-8
if %lossy_png8_dithering% equ 1 (
1>nul 2>&1 pngquant --speed %lossy_png8_quality% 160 "%~f1"
truepng -f0,5 -i0 -g0 -nc -md remove all -zc8 -zm8 -zs0,1 -quiet -force -y "%temporary_folder%%~n1-fs8.png"
pngout -c3 -s3 -q -k0 -y -force "%temporary_folder%%~n1-fs8.png" "%temporary_folder%%~n1-pal.png"
advdef -z -3 -q "%temporary_folder%%~n1-pal.png"
advdef -z -3 -q "%temporary_folder%%~n1-fs8.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-pal.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-fs8.png"
exit /b
)
1>nul 2>&1 pngquant --nofs --speed %lossy_png8_quality% 160 "%~f1"
truepng -f0,5 -i0 -g0 -nc -md remove all -zc8 -zm8 -zs0,1 -quiet -force -y "%temporary_folder%%~n1-or8.png"
pngout -c3 -s3 -q -k0 -y -force "%temporary_folder%%~n1-or8.png" "%temporary_folder%%~n1-pal.png"
advdef -z -3 -q "%temporary_folder%%~n1-pal.png"
advdef -z -3 -q "%temporary_folder%%~n1-or8.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-pal.png"
call:check_compare "%~f1" "%temporary_folder%%~n1-or8.png"
exit /b


:script_reset
1>nul 2>&1 rd /s /q "%temporary_parent_folder%"
exit /b