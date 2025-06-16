// 跳戏 - 非遗文化网站 页脚组件

/**
 * 创建页脚并插入到指定元素中
 * @param {string} elementId - 要插入页脚的元素ID
 */
function createFooter(elementId) {
    const currentYear = new Date().getFullYear();

    const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>关于我们</h3>
            <ul class="footer-links">
              <li><a href="about.html">关于跳戏</a></li>
              <li><a href="about.html#history">历史渊源</a></li>
              <li><a href="about.html#culture">文化价值</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>内容导航</h3>
            <ul class="footer-links">
              <li><a href="gallery.html">图片集</a></li>
              <li><a href="events.html">演出活动</a></li>
              <li><a href="about.html#preservation">传承保护</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>联系方式</h3>
            <ul class="footer-links">
              <li><a href="contact.html">联系我们</a></li>
              <li>电话: 123-456-7890</li>
              <li>邮箱: info@tiaoxiyishu.com</li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>关注我们</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">微博</a>
              <a href="#" class="social-icon">微信</a>
              <a href="#" class="social-icon">抖音</a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          &copy; ${currentYear} 跳戏非物质文化遗产保护中心 All Rights Reserved
        </div>
      </div>
    </footer>
  `;

    document.getElementById(elementId).innerHTML = footer;
} 