// 1. تحويل المظهر (Theme Switcher) الفاخر
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark-theme';
bodyElement.className = savedTheme;
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    if (bodyElement.classList.contains('dark-theme')) {
        bodyElement.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateThemeIcon('light-theme');
    } else {
        bodyElement.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateThemeIcon('dark-theme');
    }
});

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'light-theme') {
        icon.className = 'fas fa-moon';
        themeToggleBtn.style.color = '#4f46e5';
    } else {
        icon.className = 'fas fa-sun';
        themeToggleBtn.style.color = '#f59e0b';
    }
}

// 2. التحكم في قائمة الموبايل والتابلت الانزلاقية المرنة (Slide-down Menu)
const menuToggle = document.querySelector('.menu-toggle');
const navHolder = document.querySelector('.nav-holder');

menuToggle.addEventListener('click', () => {
    navHolder.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// إغلاق المنيو تلقائياً عند الضغط على أي رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navHolder.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// 3. سلايدر الصور التلقائي بقسم الهيرو
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

setInterval(() => {
    goToSlide(currentSlide + 1);
}, 4500);

// 4. نظام تعقب الأقسام النشطة (Scroll Spy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 250)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
});