// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme') || 'light';
if (stored === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ===== SCROLL TO TOP =====
const fab = document.getElementById('scrollToTop');
if (fab) {
    window.addEventListener('scroll', () => {
        fab.classList.toggle('show', window.scrollY > 300);
    });
    fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle' };
    t.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> ${msg}`;
    t.className = `toast ${type}`;
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => t.classList.remove('show'), 3500);
}

// ===== ACTIVE NAV HIGHLIGHT =====
(function () {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (path === '' && href === 'index.html')) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
})();

// ===== EVENTS DATA (shared) =====
const eventsData = [
    { id: 1, name: "Tech Fest 2026", cat: "technical", date: "Mar 15", price: "FREE", desc: "Coding competitions, robotics wars & workshops with prizes worth ₹2 Lakhs", venue: "Main Auditorium", reg: 156, cap: 300, daysLeft: 10, img: "https://www.chitkara.edu.in/wp-content/themes/chitkara/images/2026/home-page/slider/litfest-2026-banner-mob.webp" },
    { id: 2, name: "Cultural Night 2026", cat: "cultural", date: "Apr 20", price: "₹100", desc: "Music, dance & drama performances by talented students and celebrity guests", venue: "Open Air Theatre", reg: 320, cap: 500, daysLeft: 48, img: "https://www.chitkara.edu.in/wp-content/uploads/2022/08/cultural-night-banner.jpg" },
    { id: 3, name: "Annual Sports Meet", cat: "sports", date: "May 5", price: "₹50", desc: "Cricket, football, basketball, athletics & more. Compete for the championship trophy", venue: "Sports Complex", reg: 210, cap: 400, daysLeft: 63, img: "https://www.chitkara.edu.in/wp-content/uploads/2024/07/Annual-Sports-Meet-banner.jpg" },
    { id: 4, name: "Guest Lecture: Future of AI", cat: "technical", date: "Mar 10", price: "FREE", desc: "Industry experts discuss AI trends, career opportunities, and hands-on workshop", venue: "Seminar Hall", reg: 89, cap: 150, daysLeft: 5, img: "https://www.chitkara.edu.in/wp-content/uploads/2025/09/Protothon-AI-2025-banner.jpg" },
    { id: 5, name: "24-Hour Hackathon", cat: "workshop", date: "Mar 25", price: "FREE", desc: "Build innovative solutions, win prizes, and get mentored by industry leaders", venue: "CS Department", reg: 67, cap: 100, daysLeft: 22, img: "https://www.chitkara.edu.in/wp-content/uploads/2018/04/26-hour-national-level-hackathon-%E2%80%98OctaHacks%E2%80%99-at-Chitkara-University.jpg" },
    { id: 6, name: "MERN Stack Workshop", cat: "workshop", date: "Mar 18", price: "₹200", desc: "Learn full-stack development with MongoDB, Express, React, and Node.js", venue: "Lab 301", reg: 45, cap: 50, daysLeft: 15, img: "https://www.chitkara.edu.in/wp-content/uploads/2018/03/BCA.jpg" },
    { id: 7, name: "Alumni Meet 2026", cat: "cultural", date: "Apr 2", price: "FREE", desc: "Connect with successful alumni, networking opportunities, and career guidance", venue: "College Lawn", reg: 145, cap: 200, daysLeft: 30, img: "https://www.chitkara.edu.in/wp-content/uploads/2022/12/4.jpg" },
    { id: 8, name: "Startup Pitch Competition", cat: "workshop", date: "Mar 28", price: "FREE", desc: "Present your business idea to investors and win seed funding opportunities", venue: "Innovation Hub", reg: 23, cap: 30, daysLeft: 25, img: "https://www.chitkara.edu.in/wp-content/themes/chitkara/images/cas/startup/startup-banner1-mob.webp" }
];

