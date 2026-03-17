# 天气查询网站 - AdSense优化版

一个免费、简单的天气查询网站，集成Google AdSense广告代码，可通过广告收入盈利。

## ✨ 功能特点

- 🌤️ 实时天气查询
- 📅 7天天气预报
- 🌫️ 空气质量指数（AQI）
- 📱 响应式设计，支持移动端
- 🚀 免费部署到GitHub Pages
- 💰 集成AdSense广告位

## 🚀 快速开始

### 1. 部署到GitHub Pages

#### 步骤1：创建GitHub仓库
1. 访问 https://github.com
2. 点击 "New repository"
3. 输入仓库名（如：weather-app）
4. 选择 Public
5. 点击 "Create repository"

#### 步骤2：上传代码
```bash
# 在本地项目目录打开终端
git init
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/你的用户名/weather-app.git
git push -u origin main
```

#### 步骤3：启用GitHub Pages
1. 进入仓库页面
2. 点击 "Settings" -> "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main" / "root"
5. 点击 "Save"

#### 步骤4：等待部署
- 大约1-2分钟后，访问 `https://你的用户名.github.io/weather-app`

## 💰 AdSense集成

### 步骤1：申请AdSense账号
1. 访问 https://www.google.com/adsense
2. 注册Google账号（如果没有）
3. 填写网站URL：`https://你的用户名.github.io/weather-app`
4. 等待审核（通常需要几天）

### 步骤2：获取AdSense代码
1. 审核通过后，进入AdSense后台
2. 获取 "Ad code" 和 "Ad unit code"

### 步骤3：替换广告代码

打开 `index.html` 文件，找到以下位置：

```html
<!-- AdSense Top Banner -->
<div class="ad-banner ad-top">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  <!-- 替换为你的AdSense发布商ID -->
         data-ad-slot="XXXXXXXXXX"                  <!-- 替换为你的广告单元ID -->
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

**替换两个位置：**
- `data-ad-client`: 你的AdSense发布商ID（以 `ca-pub-` 开头）
- `data-ad-slot`: 你的广告单元ID

类似地，更新 `index.html` 底部的广告代码。

### 步骤4：提交审核
1. 在AdSense后台提交审核，说明你的网站符合政策
2. 等待AdSense审核（通常3-7天）
3. 审核通过后，广告就会开始展示

## 📱 移动端优化

网站已经优化了移动端显示：
- 自适应布局
- 触摸友好的按钮
- 响应式字体大小

## 🌍 支持的城市

目前支持以下城市（可直接输入中文）：
- **直辖市**：北京、上海、广州、深圳、天津、重庆
- **省会城市**：杭州、成都、武汉、西安、南京、长沙、郑州、青岛、济南、合肥、石家庄、太原、长春、南昌、南宁、贵阳、兰州、西宁、乌鲁木齐、呼和浩特、沈阳
- **重要城市**：苏州、东莞、大连、厦门、福州、宁波、哈尔滨、昆明
- **港澳台**：香港、澳门、台北

### 功能特点：
- ✅ 支持模糊搜索（输入"北"也能找到北京）
- ✅ 自动移除空格优化查询
- ✅ 未找到时提示常用城市列表
- ✅ 智能错误提示

如需添加更多城市，编辑 `script.js` 文件中的 `cityCoords` 对象，格式：
```javascript
'城市名': { lat: 纬度, lon: 经度 }
```

## 🎨 自定义样式

### 修改主题颜色
编辑 `style.css` 文件，找到渐变背景：

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

修改为你喜欢的颜色。

### 修改天气图标
编辑 `script.js` 文件中的 `weatherIcons` 对象，可以替换成你喜欢的表情或图片。

## 📊 广告优化建议

### 1. 页面布局
- 顶部和底部放置广告横幅
- 广告尺寸：728x90（横幅）、300x250（矩形）

### 2. 内容优化
- 添加更多城市搜索
- 增加空气质量详情
- 发布天气相关的文章

### 3. SEO优化
- 优化页面标题和描述
- 使用语义化HTML标签
- 添加robots.txt

### 4. 监控和调整
- 定期查看AdSense报告
- 调整广告位置和数量
- A/B测试不同广告布局

## 📝 文件说明

- `index.html` - 主页面，包含AdSense代码
- `style.css` - 样式文件
- `script.js` - 天气查询逻辑
- `README.md` - 项目说明（本文件）

## ⚠️ 注意事项

1. **AdSense政策**：确保网站内容符合Google AdSense政策，避免违规内容
2. **广告位置**：不要过度放置广告，影响用户体验
3. **内容质量**：保持内容原创和高质量
4. **隐私政策**：如需要，添加隐私政策页面

## 🔧 扩展功能建议

- 添加天气预报推送（使用PWA）
- 集成更多天气API
- 添加历史天气数据
- 创建移动端App
- 添加用户收藏功能

## 📧 联系方式

如有问题，欢迎提交Issue或Pull Request。

## 📄 许可证

MIT License

---

**祝你的天气网站早日通过AdSense审核！**
