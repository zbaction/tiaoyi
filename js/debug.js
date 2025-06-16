// 跳戏 - 非遗文化遗产网站 调试工具

document.addEventListener('DOMContentLoaded', function () {
    // 在移动设备上强制添加调试面板
    addDebugPanel();

    // 记录页面加载事件
    console.log('页面已加载: ' + window.location.pathname);
    logToPanel('页面已加载: ' + window.location.pathname);

    // 检查图片加载情况
    setTimeout(checkImagesLoaded, 1000);

    // 检查关键元素是否存在
    setTimeout(checkCriticalElements, 1500);
});

// 添加调试面板
function addDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 14px;
        padding: 10px;
        overflow-y: scroll;
        z-index: 9999;
        display: none;
    `;

    const logContent = document.createElement('div');
    logContent.id = 'debug-log';
    debugPanel.appendChild(logContent);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '显示调试';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        padding: 8px;
        background-color: #8c1c13;
        color: white;
        border: none;
        border-radius: 4px;
        z-index: 10000;
        font-size: 16px;
        font-weight: bold;
    `;

    document.body.appendChild(debugPanel);
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', function () {
        const isVisible = debugPanel.style.display === 'block';
        debugPanel.style.display = isVisible ? 'none' : 'block';
        toggleButton.textContent = isVisible ? '显示调试' : '隐藏调试';
    });

    // 添加页面测试按钮
    addTestLinks();
}

// 记录信息到调试面板
function logToPanel(message) {
    console.log(message); // 始终在控制台记录

    const log = document.getElementById('debug-log');
    if (log) {
        const time = new Date().toLocaleTimeString();
        log.innerHTML += `<p>[${time}] ${message}</p>`;
        log.scrollTop = log.scrollHeight;
    }
}

// 检查图片加载情况
function checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    logToPanel(`页面上共有 ${images.length} 张图片`);

    let loadedCount = 0;
    let errorCount = 0;

    images.forEach((img, index) => {
        if (img.complete) {
            if (img.naturalHeight === 0) {
                errorCount++;
                logToPanel(`错误: 图片 ${index + 1} (${img.src}) 加载失败`);
                // 添加边框以显示问题图片位置
                img.style.border = '3px solid red';
            } else {
                loadedCount++;
            }
        } else {
            img.addEventListener('load', function () {
                loadedCount++;
                logToPanel(`图片已加载: ${this.src.split('/').pop()}`);
            });

            img.addEventListener('error', function () {
                errorCount++;
                logToPanel(`错误: 图片加载失败: ${this.src}`);
                // 添加边框以显示问题图片位置
                this.style.border = '3px solid red';
                // 显示替代文本
                const errorText = document.createElement('div');
                errorText.textContent = '图片加载失败';
                errorText.style.cssText = `
                    color: red;
                    background-color: #ffeeee;
                    padding: 5px;
                    text-align: center;
                    font-size: 12px;
                `;
                this.parentNode.insertBefore(errorText, this.nextSibling);
            });
        }

        // 记录图片信息
        logToPanel(`图片 ${index + 1}: ${img.src.split('/').pop()}, alt="${img.alt}"`);
    });

    logToPanel(`已加载 ${loadedCount} 张图片，${errorCount} 张加载失败`);
}

// 检查关键元素
function checkCriticalElements() {
    // 检查导航菜单
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (navMenu) {
        logToPanel('导航菜单已找到');

        // 检查菜单链接
        const links = navMenu.querySelectorAll('a');
        logToPanel(`找到 ${links.length} 个导航链接`);

        links.forEach((link, index) => {
            logToPanel(`链接 ${index + 1}: ${link.textContent} -> ${link.href}`);

            // 添加事件监听器，测试链接点击
            link.addEventListener('click', function (e) {
                logToPanel(`点击了链接: ${this.textContent}`);
            });
        });
    } else {
        logToPanel('错误: 未找到导航菜单元素');
    }

    if (menuBtn) {
        logToPanel('菜单按钮已找到');
        logToPanel('菜单按钮显示状态: ' + getComputedStyle(menuBtn).display);

        // 测试菜单按钮点击
        menuBtn.addEventListener('click', function () {
            logToPanel('菜单按钮被点击');
            if (navMenu) {
                logToPanel('菜单状态: ' + (navMenu.classList.contains('active') ? '已打开' : '已关闭'));
            }
        });
    } else {
        logToPanel('错误: 未找到菜单按钮');
    }

    // 检查设备信息
    logDeviceInfo();
}

// 记录设备信息
function logDeviceInfo() {
    const deviceInfo = {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.screen.orientation ? window.screen.orientation.type : '未知'
    };

    logToPanel('设备信息:');
    for (const [key, value] of Object.entries(deviceInfo)) {
        logToPanel(`- ${key}: ${value}`);
    }
}

// 添加页面测试链接
function addTestLinks() {
    const testPanel = document.createElement('div');
    testPanel.style.cssText = `
        position: fixed;
        top: 70px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 10px;
        border-radius: 4px;
        z-index: 9999;
    `;

    const pages = [
        { name: '首页', url: 'index.html' },
        { name: '关于', url: 'about.html' },
        { name: '图片', url: 'gallery.html' },
        { name: '活动', url: 'events.html' },
        { name: '文创', url: 'cultural-products.html' },
        { name: '联系', url: 'contact.html' }
    ];

    pages.forEach(page => {
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.name;
        link.style.cssText = `
            display: block;
            color: white;
            margin: 5px 0;
            text-decoration: none;
            padding: 5px 10px;
            background-color: #8c1c13;
            border-radius: 3px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
        `;

        link.addEventListener('click', function (e) {
            logToPanel(`正在跳转到: ${page.name} (${page.url})`);
        });

        testPanel.appendChild(link);
    });

    document.body.appendChild(testPanel);
} 