// 跳戏 - 非遗文化网站 主JavaScript文件

// 轮播图功能
document.addEventListener('DOMContentLoaded', function () {
    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    if (carousel) {
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
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
}); 