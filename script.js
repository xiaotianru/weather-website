// 天气图标映射
const weatherIcons = {
    0: '☀️',  // Clear
    1: '🌤️', // Mainly clear
    2: '⛅',  // Partly cloudy
    3: '☁️',  // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Depositing rime fog
    51: '🌦️', // Light drizzle
    53: '🌦️', // Moderate drizzle
    55: '🌧️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '🌨️', // Slight snow
    73: '🌨️', // Moderate snow
    75: '❄️',  // Heavy snow
    80: '🌧️', // Showers
    81: '🌧️', // Showers
    82: '⛈️',  // Heavy showers
    85: '🌨️', // Snow showers
    86: '🌨️', // Heavy snow showers
    95: '⛈️',  // Thunderstorm
    96: '⛈️',  // Thunderstorm with hail
    99: '⛈️',  // Thunderstorm with heavy hail
    100: '🌈'  // Clear
};

// 城市搜索映射（中文名称 -> WMO代码）
const cityCodeMap = {
    '北京': 'CNXX0001',
    '上海': 'CNXX0002',
    '广州': 'CNXX0003',
    '深圳': 'CNXX0004',
    '杭州': 'CNXX0005',
    '成都': 'CNXX0006',
    '武汉': 'CNXX0007',
    '西安': 'CNXX0008',
    '南京': 'CNXX0009',
    '重庆': 'CNXX0010',
    '天津': 'CNXX0011',
    '苏州': 'CNXX0012',
    '长沙': 'CNXX0013',
    '郑州': 'CNXX0014',
    '青岛': 'CNXX0015',
    '宁波': 'CNXX0016',
    '东莞': 'CNXX0017',
    '沈阳': 'CNXX0018',
    '昆明': 'CNXX0019',
    '哈尔滨': 'CNXX0020',
    '大连': 'CNXX0021',
    '厦门': 'CNXX0022',
    '福州': 'CNXX0023',
    '济南': 'CNXX0024',
    '合肥': 'CNXX0025',
    '石家庄': 'CNXX0026',
    '太原': 'CNXX0027',
    '长春': 'CNXX0028',
    '南昌': 'CNXX0029',
    '南宁': 'CNXX0030',
    '贵阳': 'CNXX0031',
    '兰州': 'CNXX0032',
    '银川': 'CNXX0033',
    '西宁': 'CNXX0034',
    '乌鲁木齐': 'CNXX0035',
    '拉萨': 'CNXX0036',
    '呼和浩特': 'CNXX0037',
    '海口': 'CNXX0038',
    '三亚': 'CNXX0039',
    '香港': 'CNXX0040',
    '澳门': 'CNXX0041',
    '台北': 'CNXX0042'
};

// 搜索城市
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('请输入城市名称');
        return;
    }

    // 尝试直接映射
    if (cityCodeMap[cityName]) {
        await fetchWeather(cityCodeMap[cityName], cityName);
    } else {
        // 如果没有精确匹配，显示提示
        showError('未找到该城市，请尝试使用拼音或标准城市名');
    }
}

// 按回车键搜索
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

// 获取天气数据
async function fetchWeather(wmoCode, cityName) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.style.display = 'none';

    try {
        // 获取当前天气
        const currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=Asia%2FShanghai`;
        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();

        // 获取未来7天预报
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FShanghai&forecast_days=7`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // 显示天气
        displayWeather(currentData, forecastData, cityName);

    } catch (error) {
        console.error('获取天气数据失败:', error);
        showError('获取天气数据失败，请稍后再试');
    }
}

// 显示天气信息
function displayWeather(currentData, forecastData, cityName) {
    const weatherResult = document.getElementById('weatherResult');
    const weatherCode = currentData.current.weather_code;
    const icon = weatherIcons[weatherCode] || '🌤️';
    const temperature = Math.round(currentData.current.temperature_2m);
    const apparentTemperature = Math.round(currentData.current.apparent_temperature);
    const humidity = currentData.current.relative_humidity_2m;
    const windSpeed = Math.round(currentData.current.wind_speed_10m);
    const precipitation = currentData.current.precipitation;

    let weatherDesc = getWeatherDescription(weatherCode);

    const html = `
        <h2>${cityName}</h2>
        <div class="weather-main">
            <div class="weather-icon">${icon}</div>
            <div>
                <div class="temperature">${temperature}°</div>
                <div class="weather-desc">${weatherDesc}</div>
                <div style="margin-top: 10px; color: #999;">体感: ${apparentTemperature}° | 湿度: ${humidity}%</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <label>风速</label>
                <span>${windSpeed} km/h</span>
            </div>
            <div class="detail-item">
                <label>降水</label>
                <span>${precipitation} mm</span>
            </div>
            <div class="detail-item">
                <label>天气代码</label>
                <span>${weatherCode}</span>
            </div>
        </div>
        <div class="forecast">
            <h3>未来7天预报</h3>
            <div class="forecast-list">
                ${forecastData.daily.time.map((date, index) => {
                    const forecastCode = forecastData.daily.weather_code[index];
                    const maxTemp = Math.round(forecastData.daily.temperature_2m_max[index]);
                    const minTemp = Math.round(forecastData.daily.temperature_2m_min[index]);
                    const forecastIcon = weatherIcons[forecastCode] || '🌤️';
                    const dayName = getDayName(new Date(date));

                    return `
                        <div class="forecast-item">
                            <div class="day">${dayName}</div>
                            <div class="icon">${forecastIcon}</div>
                            <div class="temp">${maxTemp}° / ${minTemp}°</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    weatherResult.innerHTML = html;
    weatherResult.classList.add('active');
}

// 获取天气描述
function getWeatherDescription(code) {
    const descriptions = {
        0: '晴朗',
        1: '大部晴朗',
        2: '多云',
        3: '阴天',
        45: '雾',
        48: '雾凇',
        51: '毛毛雨',
        53: '中度毛毛雨',
        55: '浓毛毛雨',
        61: '小雨',
        63: '中雨',
        65: '大雨',
        71: '小雪',
        73: '中雪',
        75: '大雪',
        80: '阵雨',
        81: '中雨阵雨',
        82: '大阵雨',
        85: '小雪阵雨',
        86: '大雪阵雨',
        95: '雷暴',
        96: '雷暴伴冰雹',
        99: '强雷暴伴大冰雹',
        100: '晴朗'
    };
    return descriptions[code] || '未知';
}

// 获取星期名称
function getDayName(date) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
}

// 显示错误信息
function showError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<div class="error-message">${message}</div>`;
    weatherResult.classList.add('active');
}

// 关于页面
function openAbout() {
    alert('天气查询网站\n\n数据来源：Open-Meteo API\n\n部署建议：\n1. 将代码上传到 GitHub\n2. 使用 GitHub Pages 部署\n3. 申请 Google AdSense 账户\n4. 将 AdSense 代码替换到 HTML 文件中');
}
