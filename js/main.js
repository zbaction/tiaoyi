// 跳戏 - 非遗文化网站 主JavaScript文件

// 确保DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 初始化页面
    initPage();
});

// 页面初始化函数
function initPage() {
    // 初始化轮播图
    initCarousel();

    // 初始化移动端菜单
    initMobileMenu();
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return; // 如果当前页面没有轮播图，直接返回

    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.carousel-indicator');

    let currentIndex = 0;
    const itemCount = carouselItems.length;

    // 设置指示器
    function setIndicator() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 滑动到指定slide
    function slideTo(index) {
        if (index < 0) {
            index = itemCount - 1;
        } else if (index >= itemCount) {
            index = 0;
        }

        currentIndex = index;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        setIndicator();
    }

    // 下一个slide
    function nextSlide() {
        slideTo(currentIndex + 1);
    }

    // 上一个slide
    function prevSlide() {
        slideTo(currentIndex - 1);
    }

    // 自动轮播
    let interval = setInterval(nextSlide, 5000);

    // 鼠标悬停时暂停轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // 鼠标离开时继续轮播
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });

    // 按钮点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            slideTo(index);
        });
    });
}

// 移动端导航菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        // 确保菜单按钮可见且正常工作
        menuBtn.style.display = 'block';

        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
            console.log('Mobile menu clicked, active:', navMenu.classList.contains('active'));
        });

        // 点击菜单项后自动关闭菜单
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });
    }
} 