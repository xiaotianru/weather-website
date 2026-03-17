@echo off
echo ========================================
echo 天气查询网站 - 一键部署脚本
echo ========================================
echo.

:: 检查Git是否安装
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未检测到Git，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: 检查是否已初始化仓库
if not exist ".git" (
    echo [信息] 初始化Git仓库...
    git init
    git add .
    git commit -m "初始提交: 天气查询网站"
    echo.
)

:: 检查远程仓库
git remote -v | findstr "origin" >nul
if %ERRORLEVEL% NEQ 0 (
    echo [提示] 请输入GitHub仓库URL（HTTPS格式）
    echo 例如: https://github.com/你的用户名/weather-app.git
    set /p repo_url="仓库URL: "
    git remote add origin %repo_url%
    echo.
)

:: 推送到GitHub
echo [信息] 推送到GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 下一步操作：
echo 1. 访问 https://github.com/你的用户名/weather-app
echo 2. 点击 "Settings" -> "Pages"
echo 3. Source 选择 "Deploy from a branch"
echo 4. Branch 选择 "main" / "root"
echo 5. 点击 "Save"
echo.
echo 网站将在1-2分钟后部署成功
echo 访问地址: https://你的用户名.github.io/weather-app
echo.
pause
