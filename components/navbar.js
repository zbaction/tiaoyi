// 跳戏 - 非遗文化网站 导航组件

/**
 * 创建导航栏并插入到指定元素中
 * @param {string} elementId - 要插入导航栏的元素ID
 * @param {string} activePage - 当前活动页面的ID ('home', 'about', 'gallery', 'events', 'contact')
 */
function createNavbar(elementId, activePage) {
  const navbar = `
    <header class="header">
      <div class="container header-content">
        <a href="index.html" class="logo">
          <img src="images/logo.png" alt="跳戏 Logo" />
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
} 