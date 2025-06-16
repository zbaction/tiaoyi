// 跳戏 - 非遗文化遗产网站 调试工具

document.addEventListener('DOMContentLoaded', function () {
    // 在移动设备上添加调试面板
    if (window.innerWidth <= 768) {
        addDebugPanel();
    }

    // 记录页面加载事件
    console.log('页面已加载: ' + window.location.pathname);
    logToPanel('页面已加载: ' + window.location.pathname);

    // 检查关键元素是否存在
    setTimeout(checkCriticalElements, 1000);
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
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 12px;
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
        padding: 5px;
        background-color: #8c1c13;
        color: white;
        border: none;
        border-radius: 4px;
        z-index: 10000;
        font-size: 12px;
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
    const log = document.getElementById('debug-log');
    if (log) {
        const time = new Date().toLocaleTimeString();
        log.innerHTML += `<p>[${time}] ${message}</p>`;
        log.scrollTop = log.scrollHeight;
    }
    console.log(message);
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
}

// 添加页面测试链接
function addTestLinks() {
    const testPanel = document.createElement('div');
    testPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.7);
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
            padding: 3px;
            background-color: #8c1c13;
            border-radius: 3px;
            text-align: center;
            font-size: 12px;
        `;

        link.addEventListener('click', function (e) {
            logToPanel(`正在跳转到: ${page.name} (${page.url})`);
        });

        testPanel.appendChild(link);
    });

    document.body.appendChild(testPanel);
} 