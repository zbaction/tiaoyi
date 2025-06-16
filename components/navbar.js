// 跳戏 - 非遗文化网站 导航组件

/**
 * 创建导航栏并插入到指定元素中
 * @param {string} elementId - 要插入导航栏的元素ID
 * @param {string} activePage - 当前活动页面的ID ('home', 'about', 'gallery', 'events', 'contact')
 */
function createNavbar(elementId, activePage) {
  // 获取当前路径的基础URL
  const getBaseUrl = () => {
    // 确保路径以/结尾
    const path = window.location.pathname;
    const pathParts = path.split('/');
    // 移除最后一个元素（文件名）
    pathParts.pop();
    return pathParts.join('/') + '/';
  };

  // 获取图片的绝对URL
  const getImageUrl = (relativePath) => {
    // 检查是否已经是绝对URL
    if (relativePath.startsWith('http') || relativePath.startsWith('//')) {
      return relativePath;
    }

    // 将相对路径转换为绝对路径
    const baseUrl = window.location.origin + getBaseUrl();
    // 移除开头的斜杠（如果有的话）
    const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    return baseUrl + cleanPath;
  };

  const logoUrl = getImageUrl('images/logo.png');
  console.log('Logo URL:', logoUrl);

  const navbar = `
    <header class="header">
      <div class="container header-content">
        <a href="index.html" class="logo">
          <img src="${logoUrl}" alt="跳戏 Logo" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%238c1c13\\'/><text x=\\'20\\' y=\\'25\\' font-size=\\'20\\' text-anchor=\\'middle\\' fill=\\'white\\'>跳</text></svg>';" />
          <span>跳戏</span>
        </a>
        
        <div class="mobile-menu-btn">☰</div>
        
        <ul class="nav-menu">
          <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}">首页</a></li>
          <li><a href="about.html" class="${activePage === 'about' ? 'active' : ''}">关于跳戏</a></li>
          <li><a href="gallery.html" class="${activePage === 'gallery' ? 'active' : ''}">图片集</a></li>
          <li><a href="events.html" class="${activePage === 'events' ? 'active' : ''}">演出活动</a></li>
          <li><a href="cultural-products.html" class="${activePage === 'cultural-products' ? 'active' : ''}">文创产品</a></li>
          <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">联系我们</a></li>
        </ul>
      </div>
    </header>
  `;

  document.getElementById(elementId).innerHTML = navbar;

  // 确保移动端菜单正确初始化
  setTimeout(() => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
      // 确保菜单按钮可见
      menuBtn.style.display = 'block';

      menuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        console.log('菜单状态切换：', navMenu.classList.contains('active') ? '已打开' : '已关闭');
      });

      // 添加链接点击事件
      const links = navMenu.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', function () {
          console.log('点击了菜单链接：', this.textContent);
        });
      });
    } else {
      console.error('移动菜单初始化失败: ', menuBtn ? '菜单按钮已找到' : '菜单按钮未找到',
        navMenu ? '导航菜单已找到' : '导航菜单未找到');
    }
  }, 100);
} 