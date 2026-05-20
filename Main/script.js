document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Events Data
    const eventsData = [
        { name: "Tech Fest 2026", cat: "technical", date: "Mar 15", price: "FREE", desc: "Coding competitions, robotics wars & workshops with prizes worth ₹2 Lakhs", venue: "Main Auditorium", reg: "156/300", daysLeft: 12, img: "https://www.chitkara.edu.in/wp-content/themes/chitkara/images/2026/home-page/slider/litfest-2026-banner-mob.webp" },
        { name: "Cultural Night 2026", cat: "cultural", date: "Apr 20", price: "₹100", desc: "Music, dance & drama performances by talented students and celebrity guests", venue: "Open Air Theatre", reg: "320/500", daysLeft: 48, img: "https://www.chitkara.edu.in/wp-content/uploads/2022/08/cultural-night-banner.jpg" },
        { name: "Annual Sports Meet", cat: "sports", date: "May 5", price: "₹50", desc: "Cricket, football, basketball, athletics & more. Compete for the championship trophy", venue: "Sports Complex", reg: "210/400", daysLeft: 63, img: "https://www.chitkara.edu.in/wp-content/uploads/2024/07/Annual-Sports-Meet-banner.jpg" },
        { name: "Guest Lecture: Future of AI", cat: "technical", date: "Mar 10", price: "FREE", desc: "Industry experts discuss AI trends, career opportunities, and hands-on workshop", venue: "Seminar Hall", reg: "89/150", daysLeft: 7, img: "https://www.chitkara.edu.in/wp-content/uploads/2025/09/Protothon-AI-2025-banner.jpg" },
        { name: "24-Hour Hackathon", cat: "workshop", date: "Mar 25", price: "FREE", desc: "Build innovative solutions, win exciting prizes, and get mentored by industry leaders", venue: "CS Department", reg: "67/100", daysLeft: 22, img: "https://www.chitkara.edu.in/wp-content/uploads/2018/04/26-hour-national-level-hackathon-%E2%80%98OctaHacks%E2%80%99-at-Chitkara-University.jpg" },
        { name: "MERN Stack Workshop", cat: "workshop", date: "Mar 18", price: "₹200", desc: "Learn full-stack development with MongoDB, Express, React, and Node.js", venue: "Lab 301", reg: "45/50", daysLeft: 15, img: "https://www.chitkara.edu.in/wp-content/uploads/2018/03/BCA.jpg" },
        { name: "Alumni Meet 2026", cat: "cultural", date: "Apr 2", price: "FREE", desc: "Connect with successful alumni, networking opportunities, and career guidance", venue: "College Lawn", reg: "145/200", daysLeft: 30, img: "https://www.chitkara.edu.in/wp-content/uploads/2022/12/4.jpg" },
        { name: "Startup Pitch Competition", cat: "workshop", date: "Mar 28", price: "FREE", desc: "Present your business idea to investors and win seed funding opportunities", venue: "Innovation Hub", reg: "23/30", daysLeft: 25, img: "https://www.chitkara.edu.in/wp-content/themes/chitkara/images/cas/startup/startup-banner1-mob.webp" }
    ];

    // Render Events
    const eventGrid = document.getElementById('eventGrid');
    function renderEvents(filter = "all") {
        eventGrid.innerHTML = '';
        eventsData.forEach(ev => {
            if (filter !== 'all' && ev.cat !== filter) return;
            const urgentClass = ev.daysLeft <= 7 ? 'urgent' : '';
            const card = document.createElement('div');
            card.className = 'event-card';
            card.setAttribute('data-category', ev.cat);
            card.innerHTML = `
                <div class="card-img" style="background-image: linear-gradient(0deg, rgba(139,0,0,0.4), rgba(0,0,0,0.2)), url('${ev.img}')">
                    <span class="card-date"><i class="far fa-calendar-alt"></i> ${ev.date}, 2026</span>
                    <span class="price-badge ${ev.price === 'FREE' ? 'free' : ''}">${ev.price}</span>
                </div>
                <div class="card-content">
                    <h3>${ev.name}</h3>
                    <p class="card-desc">${ev.desc}</p>
                    <div class="card-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${ev.venue}</span>
                        <span class="countdown-badge ${urgentClass}"><i class="far fa-clock"></i> <span class="event-days">${ev.daysLeft}</span>d left</span>
                    </div>
                    <div class="card-footer">
                        <span class="registered"><i class="fas fa-users"></i> ${ev.reg} Registered</span>
                        <span class="category-tag ${ev.cat}">${ev.cat}</span>
                    </div>
                    <button class="card-register-btn">Register Now</button>
                </div>
            `;
            const btn = card.querySelector('.card-register-btn');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showToast(`Successfully registered for ${ev.name}!`, 'success');
                updateAdminStats();
            });
            eventGrid.appendChild(card);
        });
    }
    renderEvents();

    // Filter Events
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderEvents(this.getAttribute('data-filter'));
        });
    });

    // Toast Notification
    function showToast(message, type = 'success') {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle' };
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
        toast.className = `toast ${type}`;
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Buttons
    document.getElementById('registerBtn')?.addEventListener('click', () => showToast('Registration opened! Please complete your profile.', 'success'));
    document.getElementById('exploreEventsBtn')?.addEventListener('click', (e) => { e.preventDefault(); document.querySelector('#events').scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('watchHighlightsBtn')?.addEventListener('click', (e) => { e.preventDefault(); document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('refreshDashboard')?.addEventListener('click', () => showToast('Dashboard data refreshed!', 'success'));
    document.getElementById('createEventBtn')?.addEventListener('click', () => showToast('Create new event feature coming soon!', 'warning'));

    // Smooth Scroll & Active Nav
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('.nav-links')?.classList.remove('show');
            }
        });
    });

    // Mobile Menu Toggle
    document.querySelector('.menu-toggle')?.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.toggle('show');
    });

    // Scroll To Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Countdown Timer
    function updateCountdown() {
        const target = new Date(2026, 2, 15);
        const diff = target - new Date();
        if (diff > 0) {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            document.querySelector('.countdown-timer .days').textContent = d.toString().padStart(2, '0');
            document.querySelector('.countdown-timer .hours').textContent = h.toString().padStart(2, '0');
            document.querySelector('.countdown-timer .minutes').textContent = m.toString().padStart(2, '0');
            document.querySelector('.countdown-timer .seconds').textContent = s.toString().padStart(2, '0');
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Admin Stats Update
    function updateAdminStats() {
        let totalReg = 0;
        document.querySelectorAll('.registered').forEach(el => {
            const match = el.textContent.match(/(\d+)\/(\d+)/);
            if (match) totalReg += parseInt(match[1]);
        });
        document.getElementById('totalEvents').textContent = eventsData.length;
        document.getElementById('totalRegistrations').textContent = totalReg;
        const capacities = [300, 500, 400, 150, 100, 50, 200, 30];
        const totalCap = capacities.reduce((a, b) => a + b, 0);
        const percent = Math.round((totalReg / totalCap) * 100);
        document.getElementById('progressPercent').textContent = `${percent}% Complete`;
        document.getElementById('progressFill').style.width = `${percent}%`;
    }
    updateAdminStats();

    // Event Management List
    const mgmtList = document.getElementById('eventManagementList');
    if (mgmtList) {
        eventsData.forEach(ev => {
            const div = document.createElement('div');
            div.className = 'event-item';
            div.innerHTML = `${ev.name} <span>${ev.reg}</span>`;
            mgmtList.appendChild(div);
        });
    }

    // Lightbox Gallery
    window.openLightbox = function(index) {
        const images = document.querySelectorAll('.gallery-item img');
        const captions = document.querySelectorAll('.gallery-caption');
        const lb = document.getElementById('lightbox');
        document.getElementById('lightboxImg').src = images[index].src;
        document.getElementById('lightboxCaption').textContent = captions[index].textContent;
        lb.style.display = 'flex';
    };
    window.closeLightbox = function() {
        document.getElementById('lightbox').style.display = 'none';
    };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Active Nav on Scroll
    window.addEventListener('scroll', () => {
        const sections = ['home', 'events', 'schedule', 'speakers', 'gallery', 'admin'];
        let current = 'home';
        for (let s of sections) {
            const el = document.getElementById(s);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) current = s;
            }
        }
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

});

dsad
