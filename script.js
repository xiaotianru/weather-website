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

// 城市搜索映射（中文名称 -> 坐标）
const cityCoords = {
    '北京': { lat: 39.9042, lon: 116.4074 },
    '上海': { lat: 31.2304, lon: 121.4737 },
    '广州': { lat: 23.1291, lon: 113.2644 },
    '深圳': { lat: 22.5431, lon: 114.0579 },
    '杭州': { lat: 30.2741, lon: 120.1551 },
    '成都': { lat: 30.5728, lon: 104.0668 },
    '武汉': { lat: 30.5928, lon: 114.3055 },
    '西安': { lat: 34.3416, lon: 108.9398 },
    '南京': { lat: 32.0603, lon: 118.7969 },
    '重庆': { lat: 29.4316, lon: 106.9123 },
    '天津': { lat: 39.0842, lon: 117.2009 },
    '苏州': { lat: 31.2989, lon: 120.5853 },
    '长沙': { lat: 28.2282, lon: 112.9388 },
    '郑州': { lat: 34.7466, lon: 113.6253 },
    '青岛': { lat: 36.0671, lon: 120.3826 },
    '宁波': { lat: 29.8683, lon: 121.5440 },
    '东莞': { lat: 23.0208, lon: 113.7518 },
    '沈阳': { lat: 41.8057, lon: 123.4315 },
    '昆明': { lat: 25.0389, lon: 102.7183 },
    '哈尔滨': { lat: 45.8038, lon: 126.5350 },
    '大连': { lat: 38.9140, lon: 121.6147 },
    '厦门': { lat: 24.4798, lon: 118.0894 },
    '福州': { lat: 26.0745, lon: 119.2965 },
    '济南': { lat: 36.6512, lon: 117.1201 },
    '合肥': { lat: 31.8206, lon: 117.2272 },
    '石家庄': { lat: 38.0428, lon: 114.5149 },
    '太原': { lat: 37.8706, lon: 112.5489 },
    '长春': { lat: 43.8171, lon: 125.3235 },
    '南昌': { lat: 28.6829, lon: 115.8579 },
    '南宁': { lat: 22.8170, lon: 108.3665 },
    '贵阳': { lat: 26.6470, lon: 106.6302 },
    '兰州': { lat: 36.0611, lon: 103.8343 },
    '银川': { lat: 38.4875, lon: 106.2306 },
    '西宁': { lat: 36.6171, lon: 101.7782 },
    '乌鲁木齐': { lat: 43.8256, lon: 87.6168 },
    '拉萨': { lat: 29.6500, lon: 91.1000 },
    '呼和浩特': { lat: 40.8414, lon: 111.7498 },
    '海口': { lat: 20.0174, lon: 110.3465 },
    '三亚': { lat: 18.2528, lon: 109.5119 },
    '香港': { lat: 22.3193, lon: 114.1694 },
    '澳门': { lat: 22.1987, lon: 113.5439 },
    '台北': { lat: 25.0330, lon: 121.5654 }
};

// 搜索城市
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const cityName = cityInput.value.trim();

    // 隐藏之前的错误信息
    weatherResult.style.display = 'none';
    weatherResult.classList.remove('active');

    if (!cityName) {
        showError('请输入城市名称');
        return;
    }

    // 移除空格并尝试匹配
    const normalizedCityName = cityName.replace(/\s+/g, '');

    // 尝试直接映射
    if (cityCoords[normalizedCityName]) {
        await fetchWeather(normalizedCityName);
    } else {
        // 尝试模糊匹配
        const matchedCity = Object.keys(cityCoords).find(
            city => city.includes(normalizedCityName) || normalizedCityName.includes(city)
        );

        if (matchedCity) {
            cityInput.value = matchedCity;
            await fetchWeather(matchedCity);
        } else {
            // 显示常用城市列表
            const popularCities = Object.keys(cityCoords).slice(0, 10).join('、');
            showError(`未找到"${cityName}"，试试这些：${popularCities}`);
        }
    }
}

// 按回车键搜索
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

// 获取天气数据
async function fetchWeather(cityName) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.style.display = 'none';

    try {
        // 获取城市坐标
        if (!cityCoords[cityName]) {
            showError('未找到该城市，请尝试：北京、上海、广州、深圳等');
            return;
        }

        const coords = cityCoords[cityName];
        const lat = coords.lat;
        const lon = coords.lon;

        // 显示加载状态
        const loadingHtml = `
            <div class="loading-message">
                <div class="spinner"></div>
                <p>正在获取天气数据...</p>
            </div>
        `;
        weatherResult.innerHTML = loadingHtml;
        weatherResult.classList.add('active');

        // 获取当前天气
        const currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=Asia%2FShanghai`;
        const currentResponse = await fetch(currentUrl);

        if (!currentResponse.ok) {
            throw new Error('获取当前天气失败: HTTP ' + currentResponse.status);
        }

        const currentData = await currentResponse.json();

        // 获取未来7天预报
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FShanghai&forecast_days=7`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error('获取预报数据失败: HTTP ' + forecastResponse.status);
        }

        const forecastData = await forecastResponse.json();

        // 显示天气
        displayWeather(currentData, forecastData, cityName);

    } catch (error) {
        console.error('获取天气数据失败:', error);
        let errorMessage = '获取天气数据失败';

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = '网络请求失败，请检查网络连接';
        } else if (error.message.includes('404')) {
            errorMessage = 'API 请求失败，请稍后再试';
        } else if (error.message.includes('500') || error.message.includes('503')) {
            errorMessage = '服务器暂时不可用，请稍后再试';
        }

        showError(errorMessage + '\n\n错误详情: ' + error.message);
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
