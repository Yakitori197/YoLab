/**
 * DevCraft Studio - Main JavaScript
 * 網站互動功能
 */

document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    HeroSlider.init();
    CounterAnimation.init();
    ProjectFilter.init();
    FAQ.init();
    ContactForm.init();
    BackToTop.init();
    LineButton.init();
});

/**
 * Navigation Module
 */
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    },
    
    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/**
 * Hero Slider Module
 */
const HeroSlider = {
    init() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-arrow.prev');
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.currentSlide = 1;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        if (this.slides.length === 0) return;
        
        this.bindEvents();
        this.startAutoPlay();
    },
    
    bindEvents() {
        // Dot navigation
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                this.goToSlide(parseInt(dot.dataset.slide));
            });
        });
        
        // Arrow navigation
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    },
    
    goToSlide(slideNum) {
        // Remove active class from current
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to new slide
        const newSlide = document.querySelector(`.slide[data-slide="${slideNum}"]`);
        const newDot = document.querySelector(`.dot[data-slide="${slideNum}"]`);
        
        if (newSlide) newSlide.classList.add('active');
        if (newDot) newDot.classList.add('active');
        
        this.currentSlide = slideNum;
    },
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next > this.totalSlides) next = 1;
        this.goToSlide(next);
    },
    
    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 1) prev = this.totalSlides;
        this.goToSlide(prev);
    },
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    },
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
};

/**
 * Counter Animation Module
 */
const CounterAnimation = {
    init() {
        this.counters = document.querySelectorAll('[data-count]');
        this.animated = false;
        
        if ('IntersectionObserver' in window) {
            this.createObserver();
        } else {
            this.animateAll();
        }
    },
    
    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateAll();
                }
            });
        }, { threshold: 0.5 });
        
        const statsBar = document.querySelector('.stats-bar');
        if (statsBar) observer.observe(statsBar);
    },
    
    animateAll() {
        this.counters.forEach(counter => {
            this.animateCounter(counter);
        });
    },
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
};

/**
 * Project Filter Module
 */
const ProjectFilter = {
    init() {
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setActiveTab(btn);
                this.filterProjects(filter);
            });
        });
    },
    
    setActiveTab(activeBtn) {
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    },
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const categories = card.dataset.category || '';
            
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.4s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    }
};

/**
 * FAQ Accordion Module
 */
const FAQ = {
    init() {
        this.faqItems = document.querySelectorAll('.faq-item');
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
    },
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    }
};

/**
 * Contact Form Module
 */
const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        
        if (this.form) {
            this.bindEvents();
        }
    },
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        if (!this.validate(data)) {
            return;
        }
        
        this.showSubmitting();
        
        // Simulate form submission
        setTimeout(() => {
            this.showSuccess();
            this.form.reset();
            console.log('Form submitted:', data);
        }, 1500);
    },
    
    validate(data) {
        if (!data.name || !data.contact || !data.service || !data.message) {
            this.showToast('請填寫所有必填欄位', 'error');
            return false;
        }
        return true;
    },
    
    showSubmitting() {
        const btn = this.form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = `
            送出中...
            <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
        `;
    },
    
    showSuccess() {
        const btn = this.form.querySelector('button[type="submit"]');
        btn.disabled = false;
        btn.innerHTML = `
            送出諮詢
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
        `;
        
        this.showToast('感謝您的諮詢！我會盡快與您聯繫。', 'success');
    },
    
    showToast(message, type = 'success') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

/**
 * LINE Button Module
 */
const LineButton = {
    init() {
        this.lineId = '@442fjdqq';
        this.lineAppUrl = `line://ti/p/${this.lineId}`;
        this.lineWebUrl = `https://line.me/ti/p/${this.lineId}`;
        
        // 綁定所有 LINE 相關連結
        document.querySelectorAll('.line-float, .contact-line, a[href*="line.me"]').forEach(el => {
            el.addEventListener('click', (e) => this.handleClick(e));
        });
    },
    
    handleClick(e) {
        e.preventDefault();
        
        if (this.isMobile()) {
            // 手機：直接開啟 LINE app
            this.openLineApp();
        } else {
            // 電腦：嘗試開啟 LINE 桌面版，失敗則滾動到表單
            this.tryOpenLineDesktop();
        }
    },
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    openLineApp() {
        // 嘗試開啟 LINE app
        const start = Date.now();
        
        // 先嘗試 app scheme
        window.location.href = this.lineAppUrl;
        
        // 如果 2.5 秒後還在這個頁面，表示沒有安裝 LINE app，跳轉到 LINE 網頁
        setTimeout(() => {
            if (Date.now() - start < 3000) {
                window.location.href = this.lineWebUrl;
            }
        }, 2500);
    },
    
    tryOpenLineDesktop() {
        // 嘗試開啟 LINE 桌面版
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        const start = Date.now();
        let opened = false;
        
        // 監聽視窗失焦，表示成功開啟了外部應用
        const handleBlur = () => {
            opened = true;
            cleanup();
        };
        
        const cleanup = () => {
            window.removeEventListener('blur', handleBlur);
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        };
        
        window.addEventListener('blur', handleBlur);
        
        // 嘗試用 iframe 開啟 LINE
        try {
            iframe.contentWindow.location.href = this.lineAppUrl;
        } catch (e) {
            // 忽略跨域錯誤
        }
        
        // 1.5 秒後檢查是否成功開啟
        setTimeout(() => {
            cleanup();
            
            if (!opened) {
                // 沒有開啟 LINE，滾動到表單區域
                this.scrollToForm();
                this.showToast('請透過下方表單聯繫，或手機掃描 QR Code 加入 LINE');
            }
        }, 1500);
    },
    
    scrollToForm() {
        const contactSection = document.getElementById('contact');
        const form = document.getElementById('contactForm');
        
        if (form) {
            const headerOffset = 100;
            const elementPosition = form.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // 聚焦到第一個輸入欄位
            setTimeout(() => {
                const firstInput = form.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 800);
        }
    },
    
    showToast(message) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast info';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
};

/**
 * Back to Top Module
 */
const BackToTop = {
    init() {
        this.btn = document.getElementById('backToTop');
        
        if (this.btn) {
            this.bindEvents();
        }
    },
    
    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.btn.addEventListener('click', () => this.scrollToTop());
    },
    
    handleScroll() {
        if (window.scrollY > 500) {
            this.btn.classList.add('show');
        } else {
            this.btn.classList.remove('show');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/**
 * Smooth Scroll
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add spin animation style
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
