// 图片路径修复工具

document.addEventListener('DOMContentLoaded', function () {
    console.log('图片修复脚本已加载');

    // 修复所有图片路径
    setTimeout(fixAllImages, 500);
});

// 获取基础URL
function getBaseUrl() {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const pathParts = path.split('/');
    // 移除最后一个元素（文件名）
    pathParts.pop();
    return origin + pathParts.join('/') + '/';
}

// 修复图片URL
function fixImageUrl(relativePath) {
    // 处理空路径
    if (!relativePath) return relativePath;

    // 检查是否已经是绝对URL
    if (relativePath.startsWith('http') || relativePath.startsWith('//') || relativePath.startsWith('data:')) {
        return relativePath;
    }

    // 将相对路径转换为绝对路径
    const baseUrl = getBaseUrl();
    // 移除开头的斜杠（如果有的话）
    const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    return baseUrl + cleanPath;
}

// 为所有图片添加错误处理
function addImageErrorHandler(img) {
    if (!img) return;

    // 保存原始src以在控制台记录
    const originalSrc = img.getAttribute('src');

    img.onerror = function () {
        console.error(`图片加载失败: ${originalSrc}`);

        // 清除错误处理器以防止循环
        this.onerror = null;

        // 为不同的图片类型提供不同的替代方案
        let placeholder;

        // 根据图片的类或父元素的类来确定图片的类型
        const imgClass = this.className || '';
        const parentClass = this.parentElement ? this.parentElement.className || '' : '';

        if (imgClass.includes('card-img') || parentClass.includes('card')) {
            // 卡片图片
            placeholder = createSVGPlaceholder(300, 200, '#8c1c13', '卡片图片');
        } else if (originalSrc.includes('carousel')) {
            // 轮播图
            placeholder = createSVGPlaceholder(800, 400, '#5f1108', '轮播图');
        } else if (originalSrc.includes('logo')) {
            // Logo图片
            placeholder = createSVGPlaceholder(40, 40, '#8c1c13', '跳');
        } else {
            // 默认图片
            placeholder = createSVGPlaceholder(200, 150, '#666', '图片');
        }

        this.src = placeholder;
    };
}

// 创建SVG占位图
function createSVGPlaceholder(width, height, color, text) {
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><rect width='${width}' height='${height}' fill='${color.replace('#', '%23')}' opacity='0.2'/><rect x='0' y='0' width='${width}' height='30' fill='${color.replace('#', '%23')}'/><text x='${width / 2}' y='${height / 2}' font-size='20' text-anchor='middle' fill='${color.replace('#', '%23')}'>${text}</text></svg>`;
}

// 修复所有图片
function fixAllImages() {
    const images = document.querySelectorAll('img');
    console.log(`开始修复 ${images.length} 张图片的路径`);

    images.forEach((img, index) => {
        const originalSrc = img.getAttribute('src');

        // 修复图片路径
        if (originalSrc && !originalSrc.startsWith('data:')) {
            const fixedSrc = fixImageUrl(originalSrc);
            console.log(`[${index + 1}/${images.length}] 图片路径: ${originalSrc} => ${fixedSrc}`);
            img.setAttribute('src', fixedSrc);
        }

        // 添加错误处理
        addImageErrorHandler(img);

        // 如果图片没有alt属性，添加一个
        if (!img.getAttribute('alt')) {
            const imgName = originalSrc ? originalSrc.split('/').pop().split('.')[0] : '图片';
            img.setAttribute('alt', `跳戏${imgName}`);
        }
    });
} 