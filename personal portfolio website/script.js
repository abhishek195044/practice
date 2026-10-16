/* =============================================
   PERSONAL PORTFOLIO MANAGEMENT SYSTEM
   =============================================
   WARNING: This application uses localStorage for
   ALL data storage and authentication. This is
   suitable ONLY for frontend demonstration purposes.
   
   In a production environment you MUST use:
   - A secure backend server
   - A proper database
   - Password hashing (e.g., bcrypt)
   - Server-side session or JWT authentication
   - HTTPS
   
   Do NOT store real passwords, secrets, payment info,
   or sensitive personal data using this approach.
   ============================================= */

// ========================================
// APP CONFIGURATION
// ========================================
const APP_CONFIG = {
    appName: "My Portfolio",
    defaultTheme: "dark",
    adminEmail: "admin@portfolio.com",
    adminPassword: "Admin@123"
};

// ========================================
// LOCAL STORAGE KEYS
// ========================================
const STORAGE_KEYS = {
    profile: 'portfolioProfile',
    skills: 'portfolioSkills',
    projects: 'portfolioProjects',
    education: 'portfolioEducation',
    experience: 'portfolioExperience',
    certificates: 'portfolioCertificates',
    services: 'portfolioServices',
    testimonials: 'portfolioTestimonials',
    messages: 'portfolioMessages',
    users: 'portfolioUsers',
    auth: 'portfolioAuth',
    settings: 'portfolioSettings',
    theme: 'portfolioTheme'
};

// ========================================
// UTILITY FUNCTIONS FOR LOCAL STORAGE
// ========================================

/** Retrieve parsed data from localStorage by key */
function getData(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('Error reading localStorage key:', key, e);
        return null;
    }
}

/** Save data to localStorage as JSON string */
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('Error saving to localStorage key:', key, e);
    }
}

/** Remove a key from localStorage */
function removeData(key) {
    localStorage.removeItem(key);
}

/** Generate a simple unique ID */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" aria-label="Close notification">&times;</button>
    `;
    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    };
    closeBtn.addEventListener('click', removeToast);
    setTimeout(removeToast, duration);
}

// ========================================
// CONFIRMATION DIALOG
// ========================================
function showConfirm(title, message) {
    return new Promise((resolve) => {
        const dialog = document.getElementById('confirm-dialog');
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        dialog.style.display = 'flex';

        const okBtn = document.getElementById('confirm-ok-btn');
        const cancelBtn = document.getElementById('confirm-cancel-btn');

        function cleanup() {
            dialog.style.display = 'none';
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            document.removeEventListener('keydown', onKey);
        }
        function onOk() { cleanup(); resolve(true); }
        function onCancel() { cleanup(); resolve(false); }
        function onKey(e) { if (e.key === 'Escape') { cleanup(); resolve(false); } }

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
        document.addEventListener('keydown', onKey);
    });
}

// ========================================
// FORM VALIDATION UTILITIES
// ========================================
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url) {
    if (!url) return true; // optional
    try { new URL(url); return true; } catch { return false; }
}

function clearFieldErrors(form) {
    form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

function setFieldError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

// ========================================
// DEMO / SEED DATA
// ========================================
function getDefaultProfile() {
    return {
        name: "Alex Johnson",
        title: "Aspiring Software Developer",
        tagline: "Building elegant solutions through code. Passionate about web development, open-source, and continuous learning.",
        bio: "I'm a Computer Science student with a deep passion for software development. I love creating web applications, exploring new technologies, and solving complex problems. Currently pursuing my B.Tech degree while working on personal projects and contributing to open-source communities. I believe in writing clean, maintainable code and building user-friendly applications that make a difference.",
        location: "San Francisco, CA",
        email: "alex@example.com",
        phone: "+1 (555) 123-4567",
        imageUrl: "",
        resumeUrl: "",
        githubUrl: "https://github.com/alexjohnson",
        linkedinUrl: "https://linkedin.com/in/alexjohnson",
        instagramUrl: "https://instagram.com/alexjohnson",
        youtubeUrl: "",
        availability: "available",
        interests: "Coding, Open Source, Gaming, Photography, Hiking",
        goals: "To become a full-stack developer and contribute to innovative tech solutions."
    };
}

function getDefaultSkills() {
    return [
        { id: generateId(), name: "Java", category: "Programming Languages", level: 85, icon: "☕" },
        { id: generateId(), name: "Python", category: "Programming Languages", level: 80, icon: "🐍" },
        { id: generateId(), name: "JavaScript", category: "Programming Languages", level: 78, icon: "💛" },
        { id: generateId(), name: "C++", category: "Programming Languages", level: 65, icon: "⚙️" },
        { id: generateId(), name: "HTML5", category: "Web Technologies", level: 90, icon: "🌐" },
        { id: generateId(), name: "CSS3", category: "Web Technologies", level: 85, icon: "🎨" },
        { id: generateId(), name: "React", category: "Web Technologies", level: 60, icon: "⚛️" },
        { id: generateId(), name: "Node.js", category: "Web Technologies", level: 55, icon: "🟢" },
        { id: generateId(), name: "Git & GitHub", category: "Tools and Platforms", level: 82, icon: "🔧" },
        { id: generateId(), name: "VS Code", category: "Tools and Platforms", level: 90, icon: "💻" },
        { id: generateId(), name: "Linux", category: "Tools and Platforms", level: 70, icon: "🐧" },
        { id: generateId(), name: "Docker", category: "Tools and Platforms", level: 45, icon: "🐳" },
        { id: generateId(), name: "MySQL", category: "Databases", level: 75, icon: "🗄️" },
        { id: generateId(), name: "MongoDB", category: "Databases", level: 50, icon: "🍃" },
        { id: generateId(), name: "Problem Solving", category: "Other Skills", level: 88, icon: "🧩" },
        { id: generateId(), name: "Team Collaboration", category: "Other Skills", level: 85, icon: "🤝" },
    ];
}

function getDefaultProjects() {
    return [
        {
            id: generateId(),
            title: "Portfolio Website",
            description: "A responsive personal portfolio website built with HTML, CSS, and JavaScript. Features dark/light theme toggle, smooth animations, contact form, and admin panel for content management.",
            imageUrl: "",
            technologies: "HTML, CSS, JavaScript",
            category: "Web App",
            githubUrl: "https://github.com/alexjohnson/portfolio",
            demoUrl: "",
            featured: true
        },
        {
            id: generateId(),
            title: "Task Manager Application",
            description: "A full-featured task management application with CRUD operations, categories, priority levels, due dates, and local storage persistence. Clean and intuitive user interface.",
            imageUrl: "",
            technologies: "JavaScript, HTML, CSS, localStorage",
            category: "Web App",
            githubUrl: "https://github.com/alexjohnson/taskmanager",
            demoUrl: "https://taskmanager-demo.example.com",
            featured: true
        },
        {
            id: generateId(),
            title: "Weather Dashboard",
            description: "A weather application that displays current weather conditions and forecasts. Features location search, unit conversion, and beautiful weather-based backgrounds.",
            imageUrl: "",
            technologies: "JavaScript, REST API, CSS",
            category: "Web App",
            githubUrl: "https://github.com/alexjohnson/weather",
            demoUrl: "",
            featured: false
        },
        {
            id: generateId(),
            title: "Student Grade Calculator",
            description: "A Java desktop application for calculating student grades. Supports multiple grading schemes, GPA calculation, and report generation with export functionality.",
            imageUrl: "",
            technologies: "Java, Swing, File I/O",
            category: "Desktop App",
            githubUrl: "https://github.com/alexjohnson/gradecalc",
            demoUrl: "",
            featured: false
        },
        {
            id: generateId(),
            title: "E-Commerce UI Prototype",
            description: "A modern e-commerce frontend prototype with product listing, search, cart functionality, and responsive design. Built with pure HTML and CSS.",
            imageUrl: "",
            technologies: "HTML, CSS, JavaScript",
            category: "UI Design",
            githubUrl: "https://github.com/alexjohnson/ecommerce-ui",
            demoUrl: "",
            featured: false
        },
        {
            id: generateId(),
            title: "Arduino Smart Home System",
            description: "An embedded systems project using Arduino to control home appliances. Includes temperature monitoring, light automation, and a mobile app interface.",
            imageUrl: "",
            technologies: "Arduino, C++, IoT",
            category: "Embedded Systems",
            githubUrl: "https://github.com/alexjohnson/smarthome",
            demoUrl: "",
            featured: true
        }
    ];
}

function getDefaultEducation() {
    return [
        {
            id: generateId(),
            degree: "Bachelor of Technology in Computer Science",
            institution: "University of California, Berkeley",
            startYear: "2021",
            endYear: "2025 (Expected)",
            description: "Pursuing a B.Tech in Computer Science and Engineering with a focus on software development and data structures. Active member of the coding club and hackathon team.",
            achievements: "Dean's List 2022-2023, GPA: 3.7/4.0, Won 2nd place in university hackathon"
        },
        {
            id: generateId(),
            degree: "Higher Secondary Education (Science)",
            institution: "Springfield High School",
            startYear: "2019",
            endYear: "2021",
            description: "Completed higher secondary education with a focus on Mathematics, Physics, and Computer Science.",
            achievements: "School topper in Computer Science, 95% aggregate"
        }
    ];
}

function getDefaultExperience() {
    return [
        {
            id: generateId(),
            role: "Software Development Intern",
            organization: "TechStart Inc.",
            duration: "Jun 2024 - Aug 2024",
            responsibilities: "Developed and maintained web application features using JavaScript. Participated in code reviews and daily stand-ups. Created documentation for internal tools. Assisted with database optimization and API development.",
            achievements: "Improved page load time by 30%. Received outstanding intern award."
        },
        {
            id: generateId(),
            role: "Web Development Lead",
            organization: "University Coding Club",
            duration: "Sep 2022 - Present",
            responsibilities: "Leading a team of 5 students in developing the club's official website. Organizing weekly coding workshops and mentoring junior members. Coordinating with faculty for technical events and hackathons.",
            achievements: "Successfully launched club website. Grew membership by 40%."
        },
        {
            id: generateId(),
            role: "Teaching Assistant",
            organization: "CS101 - Introduction to Programming",
            duration: "Jan 2023 - May 2023",
            responsibilities: "Assisted professor in conducting lab sessions. Graded assignments and provided feedback. Held weekly office hours for student queries.",
            achievements: "Highest-rated TA in the department for Spring 2023."
        }
    ];
}

function getDefaultCertificates() {
    return [
        {
            id: generateId(),
            title: "Java Programming Masterclass",
            organization: "Udemy",
            date: "Mar 2024",
            credentialUrl: "https://udemy.com/certificate/example"
        },
        {
            id: generateId(),
            title: "Web Development Bootcamp",
            organization: "Coursera",
            date: "Jan 2024",
            credentialUrl: "https://coursera.org/certificate/example"
        },
        {
            id: generateId(),
            title: "Git & GitHub Essentials",
            organization: "LinkedIn Learning",
            date: "Nov 2023",
            credentialUrl: "https://linkedin.com/learning/certificate/example"
        },
        {
            id: generateId(),
            title: "Python for Data Science",
            organization: "edX",
            date: "Aug 2023",
            credentialUrl: "https://edx.org/certificate/example"
        }
    ];
}

function getDefaultServices() {
    return [
        { id: generateId(), title: "Web Development", icon: "🌐", description: "Building responsive, modern websites and web applications using HTML, CSS, JavaScript, and modern frameworks.", active: true },
        { id: generateId(), title: "Java/Python Programming", icon: "💻", description: "Custom application development using Java and Python for desktop, web, and automation solutions.", active: true },
        { id: generateId(), title: "UI/UX Design", icon: "🎨", description: "Creating intuitive and visually appealing user interfaces with a focus on user experience and accessibility.", active: true },
        { id: generateId(), title: "Technical Support", icon: "🔧", description: "Troubleshooting, debugging, and providing technical assistance for software and hardware issues.", active: true },
        { id: generateId(), title: "Embedded Systems Projects", icon: "🔌", description: "Designing and developing IoT and embedded systems projects using Arduino, Raspberry Pi, and other microcontrollers.", active: true }
    ];
}

function getDefaultTestimonials() {
    return [
        {
            id: generateId(),
            name: "Prof. Sarah Mitchell",
            role: "Computer Science Professor",
            message: "Alex is one of the most dedicated students I've had. Their ability to grasp complex concepts and apply them to practical projects is remarkable. A natural problem solver with excellent communication skills.",
            imageUrl: ""
        },
        {
            id: generateId(),
            name: "David Chen",
            role: "Tech Lead at TechStart Inc.",
            message: "During their internship, Alex demonstrated exceptional coding skills and a strong work ethic. They quickly adapted to our tech stack and made meaningful contributions to the team.",
            imageUrl: ""
        },
        {
            id: generateId(),
            name: "Emily Rodriguez",
            role: "Fellow Student & Project Partner",
            message: "Working with Alex on our capstone project was a great experience. They're collaborative, creative, and always willing to go the extra mile to deliver quality work.",
            imageUrl: ""
        }
    ];
}

function getDefaultSettings() {
    return {
        primaryColor: "#6c63ff",
        secondaryColor: "#00c2ff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        darkModeDefault: true,
        footerText: "Aspiring Software Developer",
        sections: {
            about: true,
            skills: true,
            education: true,
            experience: true,
            projects: true,
            certifications: true,
            services: true,
            testimonials: true,
            resume: true,
            contact: true
        }
    };
}

/**
 * Seeds demo data ONLY if keys don't already exist in localStorage.
 * Never overwrites user data without confirmation.
 */
function seedDemoData() {
    if (!getData(STORAGE_KEYS.profile)) saveData(STORAGE_KEYS.profile, getDefaultProfile());
    if (!getData(STORAGE_KEYS.skills)) saveData(STORAGE_KEYS.skills, getDefaultSkills());
    if (!getData(STORAGE_KEYS.projects)) saveData(STORAGE_KEYS.projects, getDefaultProjects());
    if (!getData(STORAGE_KEYS.education)) saveData(STORAGE_KEYS.education, getDefaultEducation());
    if (!getData(STORAGE_KEYS.experience)) saveData(STORAGE_KEYS.experience, getDefaultExperience());
    if (!getData(STORAGE_KEYS.certificates)) saveData(STORAGE_KEYS.certificates, getDefaultCertificates());
    if (!getData(STORAGE_KEYS.services)) saveData(STORAGE_KEYS.services, getDefaultServices());
    if (!getData(STORAGE_KEYS.testimonials)) saveData(STORAGE_KEYS.testimonials, getDefaultTestimonials());
    if (!getData(STORAGE_KEYS.messages)) saveData(STORAGE_KEYS.messages, []);
    if (!getData(STORAGE_KEYS.users)) saveData(STORAGE_KEYS.users, []);
    if (!getData(STORAGE_KEYS.settings)) saveData(STORAGE_KEYS.settings, getDefaultSettings());
    if (!getData(STORAGE_KEYS.theme)) saveData(STORAGE_KEYS.theme, APP_CONFIG.defaultTheme);
}

/** Reset ALL data to demo defaults after confirmation */
async function resetDemoData() {
    const ok = await showConfirm('Reset All Data', 'This will erase all your changes and restore default demo data. This action cannot be undone. Continue?');
    if (!ok) return;
    Object.values(STORAGE_KEYS).forEach(key => removeData(key));
    seedDemoData();
    showToast('All data has been reset to demo defaults.', 'success');
    // Reload after brief delay
    setTimeout(() => location.reload(), 800);
}

// ========================================
// PAGE / VIEW NAVIGATION
// ========================================
const pages = ['page-portfolio', 'page-login', 'page-signup', 'page-admin-login', 'page-admin'];

function showPage(pageId) {
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = id === pageId ? '' : 'none';
    });
    window.scrollTo(0, 0);
}

function navigateTo(pageId) {
    showPage(pageId);
    if (pageId === 'page-portfolio') {
        renderPortfolio();
    } else if (pageId === 'page-admin') {
        if (!isAdminLoggedIn()) {
            navigateTo('page-admin-login');
            return;
        }
        renderAdminDashboard();
        switchAdminSection('admin-dashboard');
    }
}

/** Protect admin route */
function protectAdminRoute() {
    if (!isAdminLoggedIn()) {
        showToast('Please log in as admin to access the dashboard.', 'warning');
        navigateTo('page-admin-login');
        return false;
    }
    return true;
}

// ========================================
// AUTHENTICATION (localStorage demo only)
// ========================================

function isAdminLoggedIn() {
    const auth = getData(STORAGE_KEYS.auth);
    return auth && auth.role === 'admin' && auth.loggedIn === true;
}

function isUserLoggedIn() {
    const auth = getData(STORAGE_KEYS.auth);
    return auth && auth.role === 'user' && auth.loggedIn === true;
}

function getAuthState() {
    return getData(STORAGE_KEYS.auth);
}

function logoutUser() {
    removeData(STORAGE_KEYS.auth);
    showToast('Logged out successfully.', 'success');
    navigateTo('page-portfolio');
    updateNavLoginButton();
}

function logoutAdmin() {
    removeData(STORAGE_KEYS.auth);
    showToast('Admin logged out.', 'success');
    navigateTo('page-portfolio');
    updateNavLoginButton();
}

function updateNavLoginButton() {
    const btn = document.getElementById('nav-login-btn');
    if (!btn) return;
    const auth = getAuthState();
    if (auth && auth.loggedIn) {
        if (auth.role === 'admin') {
            btn.textContent = 'Dashboard';
            btn.onclick = (e) => { e.preventDefault(); navigateTo('page-admin'); };
        } else {
            btn.textContent = 'Logout';
            btn.onclick = (e) => { e.preventDefault(); logoutUser(); };
        }
    } else {
        btn.textContent = 'Login';
        btn.onclick = (e) => { e.preventDefault(); navigateTo('page-login'); };
    }
}

// ========================================
// THEME MANAGEMENT
// ========================================
function initTheme() {
    const saved = getData(STORAGE_KEYS.theme);
    const settings = getData(STORAGE_KEYS.settings);
    let theme = saved || (settings && settings.darkModeDefault ? 'dark' : 'light') || APP_CONFIG.defaultTheme;
    applyTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveData(STORAGE_KEYS.theme, theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applySettingsTheme() {
    const settings = getData(STORAGE_KEYS.settings);
    if (!settings) return;
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor || '#6c63ff');
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor || '#00c2ff');
    // Compute a hover color (slightly darker)
    const pc = settings.primaryColor || '#6c63ff';
    document.documentElement.style.setProperty('--primary-hover', adjustColor(pc, -15));
    if (settings.fontFamily) {
        document.documentElement.style.setProperty('--font-family', settings.fontFamily);
    }
}

/** Simple color brightness adjuster */
function adjustColor(hex, amount) {
    let col = hex.replace('#', '');
    if (col.length === 3) col = col.split('').map(c => c + c).join('');
    const num = parseInt(col, 16);
    let r = Math.min(255, Math.max(0, (num >> 16) + amount));
    let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ========================================
// RENDER PORTFOLIO SECTIONS
// ========================================

function renderPortfolio() {
    const profile = getData(STORAGE_KEYS.profile) || getDefaultProfile();
    const settings = getData(STORAGE_KEYS.settings) || getDefaultSettings();

    applySettingsTheme();
    renderProfile(profile);
    renderSkills();
    renderEducation();
    renderExperience();
    renderProjects();
    renderCertificates();
    renderServices();
    renderTestimonials();
    renderContactInfo(profile);
    renderFooter(profile, settings);
    applySectionVisibility(settings);
    updateNavLoginButton();
}

function renderProfile(profile) {
    // Hero
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const heroTagline = document.getElementById('hero-tagline');
    const heroImg = document.getElementById('hero-profile-img');
    const heroFallback = document.getElementById('hero-avatar-fallback');
    const heroStatus = document.getElementById('hero-status');
    const heroResume = document.getElementById('hero-resume-btn');
    const aboutImg = document.getElementById('about-profile-img');
    const aboutFallback = document.getElementById('about-avatar-fallback');
    const aboutBio = document.getElementById('about-bio');
    const aboutDetails = document.getElementById('about-details');
    const resumeBtn = document.getElementById('resume-download-btn');

    if (heroName) heroName.textContent = profile.name || 'Your Name';
    if (heroTitle) heroTitle.textContent = profile.title || 'Your Title';
    if (heroTagline) heroTagline.textContent = profile.tagline || '';

    // Initials
    const initials = (profile.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);

    // Hero image
    if (profile.imageUrl) {
        heroImg.src = profile.imageUrl;
        heroImg.style.display = '';
        heroFallback.style.display = 'none';
    } else {
        heroImg.style.display = 'none';
        heroFallback.style.display = 'flex';
        heroFallback.textContent = initials;
    }

    // About image
    if (profile.imageUrl) {
        aboutImg.src = profile.imageUrl;
        aboutImg.style.display = '';
        aboutFallback.style.display = 'none';
    } else {
        aboutImg.style.display = 'none';
        aboutFallback.style.display = 'flex';
        aboutFallback.textContent = initials;
    }

    // Status
    if (heroStatus) {
        const statusTexts = {
            'available': 'Available for opportunities',
            'busy': 'Currently busy',
            'not-available': 'Not available'
        };
        const dot = heroStatus.querySelector('.status-dot');
        if (dot) {
            if (profile.availability === 'available') dot.style.background = 'var(--success-color)';
            else if (profile.availability === 'busy') dot.style.background = 'var(--warning-color)';
            else dot.style.background = 'var(--error-color)';
        }
        heroStatus.querySelector('span:last-child').textContent = statusTexts[profile.availability] || statusTexts['available'];
    }

    // Resume
    if (profile.resumeUrl) {
        heroResume.href = profile.resumeUrl;
        heroResume.setAttribute('target', '_blank');
        heroResume.setAttribute('rel', 'noopener noreferrer');
        resumeBtn.href = profile.resumeUrl;
        resumeBtn.setAttribute('target', '_blank');
        resumeBtn.classList.remove('btn-secondary');
        resumeBtn.textContent = 'Download Resume';
    } else {
        heroResume.href = '#resume';
        heroResume.removeAttribute('target');
        resumeBtn.href = '#';
        resumeBtn.textContent = 'Resume not available yet';
        resumeBtn.onclick = (e) => { e.preventDefault(); showToast('No resume uploaded yet.', 'info'); };
    }

    // About bio
    aboutBio.textContent = profile.bio || 'No bio provided.';

    // About details
    let detailsHtml = '';
    const detailItems = [
        { icon: '📍', label: 'Location', value: profile.location },
        { icon: '📧', label: 'Email', value: profile.email },
        { icon: '📱', label: 'Phone', value: profile.phone },
        { icon: '🎯', label: 'Goals', value: profile.goals },
        { icon: '💡', label: 'Interests', value: profile.interests },
    ];
    detailItems.forEach(item => {
        if (item.value) {
            detailsHtml += `
                <div class="about-detail-item">
                    <span class="detail-icon">${item.icon}</span>
                    <div>
                        <div class="detail-label">${item.label}</div>
                        <div class="detail-value">${escapeHtml(item.value)}</div>
                    </div>
                </div>
            `;
        }
    });
    aboutDetails.innerHTML = detailsHtml;

    // Social links
    renderSocialLinks('hero-social', profile);
    renderSocialLinks('footer-social', profile);

    // Nav logo
    const navLogo = document.getElementById('nav-logo-text');
    if (navLogo) navLogo.textContent = profile.name ? profile.name.split(' ')[0] : APP_CONFIG.appName;
}

function renderSocialLinks(containerId, profile) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    if (profile.githubUrl) html += `<a href="${escapeHtml(profile.githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">GH</a>`;
    if (profile.linkedinUrl) html += `<a href="${escapeHtml(profile.linkedinUrl)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">LI</a>`;
    if (profile.instagramUrl) html += `<a href="${escapeHtml(profile.instagramUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">IG</a>`;
    if (profile.youtubeUrl) html += `<a href="${escapeHtml(profile.youtubeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">YT</a>`;
    if (profile.email) html += `<a href="mailto:${escapeHtml(profile.email)}" aria-label="Email" title="Email">✉️</a>`;
    container.innerHTML = html;
}

function renderSkills() {
    const skills = getData(STORAGE_KEYS.skills) || [];
    const grid = document.getElementById('skills-grid');
    const filterContainer = document.getElementById('skills-filter');

    // Get unique categories
    const categories = ['All', ...new Set(skills.map(s => s.category))];

    // Render filter buttons
    filterContainer.innerHTML = categories.map(cat =>
        `<button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`
    ).join('');

    // Render skill cards
    function renderSkillCards(filter) {
        const filtered = filter === 'All' ? skills : skills.filter(s => s.category === filter);
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state"><p>No skills found.</p></div>';
            return;
        }
        grid.innerHTML = filtered.map(skill => `
            <div class="skill-card">
                <div class="skill-card-header">
                    <span class="skill-name">${skill.icon || '💻'} ${escapeHtml(skill.name)}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" data-width="${skill.level}"></div>
                </div>
                <div class="skill-category-label">${escapeHtml(skill.category)}</div>
            </div>
        `).join('');

        // Animate progress bars
        requestAnimationFrame(() => {
            grid.querySelectorAll('.skill-progress-bar').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
        });
    }

    renderSkillCards('All');

    // Filter event
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderSkillCards(e.target.dataset.filter);
        }
    });
}

function renderEducation() {
    const education = getData(STORAGE_KEYS.education) || [];
    const timeline = document.getElementById('education-timeline');

    if (education.length === 0) {
        timeline.innerHTML = '<div class="empty-state"><p>No education records available.</p></div>';
        return;
    }

    timeline.innerHTML = education.map(edu => `
        <div class="timeline-item">
            <h3 class="timeline-title">${escapeHtml(edu.degree)}</h3>
            <div class="timeline-subtitle">${escapeHtml(edu.institution)}</div>
            <div class="timeline-date">${escapeHtml(edu.startYear)} - ${escapeHtml(edu.endYear || 'Present')}</div>
            ${edu.description ? `<p class="timeline-desc">${escapeHtml(edu.description)}</p>` : ''}
            ${edu.achievements ? `<p class="timeline-achievements">🏆 ${escapeHtml(edu.achievements)}</p>` : ''}
        </div>
    `).join('');
}

function renderExperience() {
    const experience = getData(STORAGE_KEYS.experience) || [];
    const timeline = document.getElementById('experience-timeline');

    if (experience.length === 0) {
        timeline.innerHTML = '<div class="empty-state"><p>No experience records available.</p></div>';
        return;
    }

    timeline.innerHTML = experience.map(exp => `
        <div class="timeline-item">
            <h3 class="timeline-title">${escapeHtml(exp.role)}</h3>
            <div class="timeline-subtitle">${escapeHtml(exp.organization)}</div>
            <div class="timeline-date">${escapeHtml(exp.duration)}</div>
            ${exp.responsibilities ? `<p class="timeline-desc">${escapeHtml(exp.responsibilities)}</p>` : ''}
            ${exp.achievements ? `<p class="timeline-achievements">🏆 ${escapeHtml(exp.achievements)}</p>` : ''}
        </div>
    `).join('');
}

function renderProjects() {
    const projects = getData(STORAGE_KEYS.projects) || [];
    const grid = document.getElementById('projects-grid');
    const filterContainer = document.getElementById('projects-filter');
    const searchInput = document.getElementById('project-search-input');

    // Categories
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    filterContainer.innerHTML = categories.map(cat =>
        `<button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`
    ).join('');

    let currentFilter = 'All';
    let currentSearch = '';

    function renderProjectCards() {
        let filtered = projects;
        if (currentFilter !== 'All') {
            filtered = filtered.filter(p => p.category === currentFilter);
        }
        if (currentSearch) {
            const q = currentSearch.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                (p.technologies || '').toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state"><p>No projects found.</p></div>';
            return;
        }

        grid.innerHTML = filtered.map(project => {
            const techs = (project.technologies || '').split(',').map(t => t.trim()).filter(Boolean);
            return `
                <div class="project-card" data-id="${project.id}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(project.title)}">
                    ${project.imageUrl
                        ? `<img src="${escapeHtml(project.imageUrl)}" alt="${escapeHtml(project.title)}" class="project-card-img" onerror="this.outerHTML='<div class=\\'project-card-img-placeholder\\'>📁</div>'">`
                        : `<div class="project-card-img-placeholder">📁</div>`
                    }
                    <div class="project-card-body">
                        <h3>${escapeHtml(project.title)} ${project.featured ? '<span class="featured-badge">★ Featured</span>' : ''}</h3>
                        <p>${escapeHtml(project.description)}</p>
                        <div class="project-tech-tags">
                            ${techs.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                        </div>
                        <div class="project-card-links">
                            ${project.githubUrl ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">GitHub</a>` : ''}
                            ${project.demoUrl ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Click to open modal
        grid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => openProjectModal(card.dataset.id));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(card.dataset.id); }
            });
        });
    }

    renderProjectCards();

    // Filter
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderProjectCards();
        }
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderProjectCards();
    });
}

function openProjectModal(projectId) {
    const projects = getData(STORAGE_KEYS.projects) || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const body = document.getElementById('project-modal-body');
    const techs = (project.technologies || '').split(',').map(t => t.trim()).filter(Boolean);

    body.innerHTML = `
        ${project.imageUrl ? `<img src="${escapeHtml(project.imageUrl)}" alt="${escapeHtml(project.title)}" class="modal-project-img" onerror="this.style.display='none'">` : ''}
        <h2>${escapeHtml(project.title)} ${project.featured ? '<span class="featured-badge">★ Featured</span>' : ''}</h2>
        <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 0.5rem;">${escapeHtml(project.category)}</p>
        <p style="color: var(--text-secondary); line-height: 1.7;">${escapeHtml(project.description)}</p>
        <div class="modal-proj-meta">
            ${techs.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="modal-proj-links">
            ${project.githubUrl ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View on GitHub</a>` : ''}
            ${project.demoUrl ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Demo</a>` : ''}
        </div>
    `;

    modal.style.display = 'flex';

    // Focus trap and close behavior
    const closeBtn = document.getElementById('project-modal-close');
    closeBtn.focus();
}

function renderCertificates() {
    const certs = getData(STORAGE_KEYS.certificates) || [];
    const grid = document.getElementById('certs-grid');

    if (certs.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No certifications available.</p></div>';
        return;
    }

    grid.innerHTML = certs.map(cert => `
        <div class="cert-card">
            <div class="cert-icon">📜</div>
            <h3>${escapeHtml(cert.title)}</h3>
            <div class="cert-org">${escapeHtml(cert.organization)}</div>
            <div class="cert-date">${escapeHtml(cert.date)}</div>
            ${cert.credentialUrl ? `<a href="${escapeHtml(cert.credentialUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">View Credential</a>` : ''}
        </div>
    `).join('');
}

function renderServices() {
    const services = (getData(STORAGE_KEYS.services) || []).filter(s => s.active !== false);
    const grid = document.getElementById('services-grid');

    if (services.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No services listed.</p></div>';
        return;
    }

    grid.innerHTML = services.map(svc => `
        <div class="service-card">
            <div class="service-icon">${svc.icon || '⚙️'}</div>
            <h3>${escapeHtml(svc.title)}</h3>
            <p>${escapeHtml(svc.description)}</p>
        </div>
    `).join('');
}

function renderTestimonials() {
    const testimonials = getData(STORAGE_KEYS.testimonials) || [];
    const grid = document.getElementById('testimonials-grid');

    if (testimonials.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No testimonials available.</p></div>';
        return;
    }

    grid.innerHTML = testimonials.map(t => {
        const initials = (t.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
        return `
            <div class="testimonial-card">
                <div class="testimonial-text">${escapeHtml(t.message)}</div>
                <div class="testimonial-author">
                    ${t.imageUrl
                        ? `<img src="${escapeHtml(t.imageUrl)}" alt="${escapeHtml(t.name)}" onerror="this.outerHTML='<div class=\\'testimonial-avatar\\'>${initials}</div>'">`
                        : `<div class="testimonial-avatar">${initials}</div>`
                    }
                    <div class="testimonial-author-info">
                        <div class="author-name">${escapeHtml(t.name)}</div>
                        <div class="author-role">${escapeHtml(t.role)}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderContactInfo(profile) {
    const container = document.getElementById('contact-info');
    let html = '';

    if (profile.email) {
        html += `
            <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div>
                    <div class="contact-label">Email</div>
                    <div class="contact-value"><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></div>
                </div>
            </div>
        `;
    }
    if (profile.phone) {
        html += `
            <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div>
                    <div class="contact-label">Phone</div>
                    <div class="contact-value">${escapeHtml(profile.phone)}</div>
                </div>
            </div>
        `;
    }
    if (profile.location) {
        html += `
            <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                    <div class="contact-label">Location</div>
                    <div class="contact-value">${escapeHtml(profile.location)}</div>
                </div>
            </div>
        `;
    }

    // Social
    let socialHtml = '<div class="contact-social">';
    if (profile.githubUrl) socialHtml += `<a href="${escapeHtml(profile.githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">GH</a>`;
    if (profile.linkedinUrl) socialHtml += `<a href="${escapeHtml(profile.linkedinUrl)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">LI</a>`;
    if (profile.instagramUrl) socialHtml += `<a href="${escapeHtml(profile.instagramUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">IG</a>`;
    if (profile.youtubeUrl) socialHtml += `<a href="${escapeHtml(profile.youtubeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">YT</a>`;
    socialHtml += '</div>';
    html += socialHtml;

    container.innerHTML = html;
}

function renderFooter(profile, settings) {
    document.getElementById('footer-name').textContent = profile.name || APP_CONFIG.appName;
    document.getElementById('footer-text').textContent = settings.footerText || profile.title || '';
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    document.getElementById('footer-copyright-name').textContent = profile.name || APP_CONFIG.appName;
}

function applySectionVisibility(settings) {
    const secs = settings.sections || {};
    const sectionIds = ['about', 'skills', 'education', 'experience', 'projects', 'certifications', 'services', 'testimonials', 'resume', 'contact'];
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = secs[id] === false ? 'none' : '';
        }
        // Also hide from nav
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (navLink) {
            navLink.parentElement.style.display = secs[id] === false ? 'none' : '';
        }
    });
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        let valid = true;

        if (!name) { setFieldError('contact-name-error', 'Name is required.'); valid = false; }
        if (!email) { setFieldError('contact-email-error', 'Email is required.'); valid = false; }
        else if (!validateEmail(email)) { setFieldError('contact-email-error', 'Enter a valid email.'); valid = false; }
        if (!subject) { setFieldError('contact-subject-error', 'Subject is required.'); valid = false; }
        if (!message) { setFieldError('contact-message-error', 'Message is required.'); valid = false; }

        if (!valid) return;

        const messages = getData(STORAGE_KEYS.messages) || [];
        messages.push({
            id: generateId(),
            name, email, subject, message,
            date: new Date().toISOString(),
            read: false
        });
        saveData(STORAGE_KEYS.messages, messages);

        form.reset();
        showToast('Message sent successfully! Thank you for reaching out.', 'success');
    });
}

// ========================================
// AUTH FORMS
// ========================================
function initAuthForms() {
    // SIGNUP
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        clearFieldErrors(form);

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        let valid = true;

        if (!name) { setFieldError('signup-name-error', 'Name is required.'); valid = false; }
        if (!email) { setFieldError('signup-email-error', 'Email is required.'); valid = false; }
        else if (!validateEmail(email)) { setFieldError('signup-email-error', 'Enter a valid email.'); valid = false; }
        if (!password) { setFieldError('signup-password-error', 'Password is required.'); valid = false; }
        else if (password.length < 6) { setFieldError('signup-password-error', 'Password must be at least 6 characters.'); valid = false; }
        if (password !== confirm) { setFieldError('signup-confirm-error', 'Passwords do not match.'); valid = false; }

        if (!valid) return;

        // Check duplicates
        const users = getData(STORAGE_KEYS.users) || [];
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            setFieldError('signup-email-error', 'An account with this email already exists.');
            return;
        }

        // NOTE: Storing passwords in plain text in localStorage is insecure.
        // This is only for frontend demonstration. In production, use bcrypt + backend.
        users.push({ id: generateId(), name, email, password, createdAt: new Date().toISOString() });
        saveData(STORAGE_KEYS.users, users);

        form.reset();
        showToast('Account created successfully! Please log in.', 'success');
        navigateTo('page-login');
    });

    // LOGIN
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        clearFieldErrors(form);

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        let valid = true;

        if (!email) { setFieldError('login-email-error', 'Email is required.'); valid = false; }
        else if (!validateEmail(email)) { setFieldError('login-email-error', 'Enter a valid email.'); valid = false; }
        if (!password) { setFieldError('login-password-error', 'Password is required.'); valid = false; }

        if (!valid) return;

        const users = getData(STORAGE_KEYS.users) || [];
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!user) {
            setFieldError('login-password-error', 'Invalid email or password.');
            return;
        }

        saveData(STORAGE_KEYS.auth, { loggedIn: true, role: 'user', email: user.email, name: user.name });
        form.reset();
        showToast(`Welcome back, ${user.name}!`, 'success');
        navigateTo('page-portfolio');
    });

    // ADMIN LOGIN
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        clearFieldErrors(form);

        const email = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value;
        let valid = true;

        if (!email) { setFieldError('admin-email-error', 'Email is required.'); valid = false; }
        if (!password) { setFieldError('admin-password-error', 'Password is required.'); valid = false; }

        if (!valid) return;

        // Check against hardcoded admin credentials
        if (email === APP_CONFIG.adminEmail && password === APP_CONFIG.adminPassword) {
            saveData(STORAGE_KEYS.auth, { loggedIn: true, role: 'admin', email: email, name: 'Admin' });
            form.reset();
            showToast('Welcome, Admin!', 'success');
            navigateTo('page-admin');
        } else {
            setFieldError('admin-password-error', 'Invalid admin credentials.');
        }
    });

    // Navigation links between auth pages
    document.getElementById('goto-signup').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-signup'); });
    document.getElementById('goto-admin-login').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-admin-login'); });
    document.getElementById('goto-home-from-login').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-portfolio'); });
    document.getElementById('goto-login-from-signup').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-login'); });
    document.getElementById('goto-home-from-signup').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-portfolio'); });
    document.getElementById('goto-login-from-admin').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-login'); });
    document.getElementById('goto-home-from-admin-login').addEventListener('click', (e) => { e.preventDefault(); navigateTo('page-portfolio'); });
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function renderAdminDashboard() {
    if (!protectAdminRoute()) return;

    const skills = getData(STORAGE_KEYS.skills) || [];
    const projects = getData(STORAGE_KEYS.projects) || [];
    const messages = getData(STORAGE_KEYS.messages) || [];
    const testimonials = getData(STORAGE_KEYS.testimonials) || [];
    const certs = getData(STORAGE_KEYS.certificates) || [];

    // Stats
    const statsContainer = document.getElementById('dashboard-stats');
    statsContainer.innerHTML = `
        <div class="stat-card"><div class="stat-icon">📁</div><div><div class="stat-value">${projects.length}</div><div class="stat-label">Projects</div></div></div>
        <div class="stat-card"><div class="stat-icon">🛠️</div><div><div class="stat-value">${skills.length}</div><div class="stat-label">Skills</div></div></div>
        <div class="stat-card"><div class="stat-icon">📧</div><div><div class="stat-value">${messages.length}</div><div class="stat-label">Messages</div></div></div>
        <div class="stat-card"><div class="stat-icon">💬</div><div><div class="stat-value">${testimonials.length}</div><div class="stat-label">Testimonials</div></div></div>
        <div class="stat-card"><div class="stat-icon">📜</div><div><div class="stat-value">${certs.length}</div><div class="stat-label">Certificates</div></div></div>
    `;

    // Recent messages
    const recentContainer = document.getElementById('dashboard-recent-messages');
    const recentMsgs = messages.slice(-5).reverse();
    if (recentMsgs.length === 0) {
        recentContainer.innerHTML = '<p style="color: var(--muted-text-color);">No messages yet.</p>';
    } else {
        recentContainer.innerHTML = recentMsgs.map(m => `
            <div class="recent-message-item">
                <div>
                    <span class="msg-sender">${escapeHtml(m.name)}</span>
                    <span class="msg-subject"> — ${escapeHtml(m.subject)}</span>
                </div>
                <span class="msg-date">${new Date(m.date).toLocaleDateString()}</span>
            </div>
        `).join('');
    }
}

// Admin section navigation
function switchAdminSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.style.display = sec.id === sectionId ? '' : 'none';
    });
    document.querySelectorAll('.admin-nav-link[data-section]').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // Update title
    const titleMap = {
        'admin-dashboard': 'Dashboard',
        'admin-profile': 'Profile Management',
        'admin-skills': 'Skills Management',
        'admin-projects': 'Projects Management',
        'admin-education': 'Education Management',
        'admin-experience': 'Experience Management',
        'admin-certifications': 'Certifications Management',
        'admin-services': 'Services Management',
        'admin-testimonials': 'Testimonials Management',
        'admin-messages': 'Contact Messages',
        'admin-settings': 'Website Settings'
    };
    document.getElementById('admin-page-title').textContent = titleMap[sectionId] || 'Dashboard';

    // Load data for the section
    if (sectionId === 'admin-dashboard') renderAdminDashboard();
    else if (sectionId === 'admin-profile') loadProfileForm();
    else if (sectionId === 'admin-skills') loadSkillsAdmin();
    else if (sectionId === 'admin-projects') loadProjectsAdmin();
    else if (sectionId === 'admin-education') loadEducationAdmin();
    else if (sectionId === 'admin-experience') loadExperienceAdmin();
    else if (sectionId === 'admin-certifications') loadCertificationsAdmin();
    else if (sectionId === 'admin-services') loadServicesAdmin();
    else if (sectionId === 'admin-testimonials') loadTestimonialsAdmin();
    else if (sectionId === 'admin-messages') loadMessagesAdmin();
    else if (sectionId === 'admin-settings') loadSettingsForm();

    // Close mobile sidebar
    document.getElementById('admin-sidebar').classList.remove('active');
}

function initAdminNav() {
    // Sidebar nav links
    document.querySelectorAll('.admin-nav-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!protectAdminRoute()) return;
            switchAdminSection(link.dataset.section);
        });
    });

    // Quick action buttons
    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => switchAdminSection(btn.dataset.goto));
    });

    // Admin logout
    document.getElementById('admin-logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        logoutAdmin();
    });

    // View site
    document.getElementById('admin-view-site').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('page-portfolio');
    });

    // Mobile sidebar toggle
    document.getElementById('admin-menu-toggle').addEventListener('click', () => {
        document.getElementById('admin-sidebar').classList.toggle('active');
    });
    document.getElementById('admin-sidebar-close').addEventListener('click', () => {
        document.getElementById('admin-sidebar').classList.remove('active');
    });
}

// ========================================
// ADMIN: PROFILE MANAGEMENT
// ========================================
function loadProfileForm() {
    const profile = getData(STORAGE_KEYS.profile) || getDefaultProfile();
    document.getElementById('pf-name').value = profile.name || '';
    document.getElementById('pf-title').value = profile.title || '';
    document.getElementById('pf-tagline').value = profile.tagline || '';
    document.getElementById('pf-bio').value = profile.bio || '';
    document.getElementById('pf-location').value = profile.location || '';
    document.getElementById('pf-email').value = profile.email || '';
    document.getElementById('pf-phone').value = profile.phone || '';
    document.getElementById('pf-image').value = profile.imageUrl || '';
    document.getElementById('pf-resume').value = profile.resumeUrl || '';
    document.getElementById('pf-github').value = profile.githubUrl || '';
    document.getElementById('pf-linkedin').value = profile.linkedinUrl || '';
    document.getElementById('pf-instagram').value = profile.instagramUrl || '';
    document.getElementById('pf-youtube').value = profile.youtubeUrl || '';
    document.getElementById('pf-availability').value = profile.availability || 'available';
    document.getElementById('pf-interests').value = profile.interests || '';
    document.getElementById('pf-goals').value = profile.goals || '';
}

function initProfileForm() {
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        clearFieldErrors(form);

        const name = document.getElementById('pf-name').value.trim();
        const email = document.getElementById('pf-email').value.trim();
        let valid = true;

        if (!name) { setFieldError('pf-name-error', 'Name is required.'); valid = false; }
        if (!document.getElementById('pf-title').value.trim()) { setFieldError('pf-title-error', 'Title is required.'); valid = false; }
        if (!email) { setFieldError('pf-email-error', 'Email is required.'); valid = false; }
        else if (!validateEmail(email)) { setFieldError('pf-email-error', 'Enter a valid email.'); valid = false; }

        if (!valid) return;

        const profile = {
            name: name,
            title: document.getElementById('pf-title').value.trim(),
            tagline: document.getElementById('pf-tagline').value.trim(),
            bio: document.getElementById('pf-bio').value.trim(),
            location: document.getElementById('pf-location').value.trim(),
            email: email,
            phone: document.getElementById('pf-phone').value.trim(),
            imageUrl: document.getElementById('pf-image').value.trim(),
            resumeUrl: document.getElementById('pf-resume').value.trim(),
            githubUrl: document.getElementById('pf-github').value.trim(),
            linkedinUrl: document.getElementById('pf-linkedin').value.trim(),
            instagramUrl: document.getElementById('pf-instagram').value.trim(),
            youtubeUrl: document.getElementById('pf-youtube').value.trim(),
            availability: document.getElementById('pf-availability').value,
            interests: document.getElementById('pf-interests').value.trim(),
            goals: document.getElementById('pf-goals').value.trim()
        };

        saveData(STORAGE_KEYS.profile, profile);
        showToast('Profile saved successfully!', 'success');
    });

    document.getElementById('pf-reset-btn').addEventListener('click', () => {
        loadProfileForm();
        showToast('Form reset to saved values.', 'info');
    });
}

// ========================================
// ADMIN: SKILLS MANAGEMENT
// ========================================
function loadSkillsAdmin() {
    const skills = getData(STORAGE_KEYS.skills) || [];
    const tbody = document.getElementById('skills-tbody');
    const emptyState = document.getElementById('skills-empty');

    if (skills.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = skills.map(skill => `
        <tr>
            <td>${skill.icon || '💻'}</td>
            <td>${escapeHtml(skill.name)}</td>
            <td>${escapeHtml(skill.category)}</td>
            <td>${skill.level}%</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editSkill('${skill.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteSkill('${skill.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initSkillsAdmin() {
    const formArea = document.getElementById('skill-form-area');
    const form = document.getElementById('skill-form');

    document.getElementById('add-skill-btn').addEventListener('click', () => {
        document.getElementById('skill-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('sk-name').focus();
    });

    document.getElementById('cancel-skill-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const name = document.getElementById('sk-name').value.trim();
        const category = document.getElementById('sk-category').value;
        const level = parseInt(document.getElementById('sk-level').value);
        const icon = document.getElementById('sk-icon').value.trim();
        const editId = document.getElementById('skill-edit-id').value;
        let valid = true;

        if (!name) { setFieldError('sk-name-error', 'Skill name is required.'); valid = false; }
        if (!category) { setFieldError('sk-category-error', 'Category is required.'); valid = false; }
        if (isNaN(level) || level < 0 || level > 100) { setFieldError('sk-level-error', 'Level must be 0-100.'); valid = false; }

        if (!valid) return;

        const skills = getData(STORAGE_KEYS.skills) || [];

        if (editId) {
            const idx = skills.findIndex(s => s.id === editId);
            if (idx > -1) {
                skills[idx] = { ...skills[idx], name, category, level, icon: icon || '💻' };
            }
            showToast('Skill updated!', 'success');
        } else {
            skills.push({ id: generateId(), name, category, level, icon: icon || '💻' });
            showToast('Skill added!', 'success');
        }

        saveData(STORAGE_KEYS.skills, skills);
        form.reset();
        formArea.style.display = 'none';
        loadSkillsAdmin();
    });

    // Search
    document.getElementById('skill-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#skills-tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(q) ? '' : 'none';
        });
    });
}

window.editSkill = function(id) {
    const skills = getData(STORAGE_KEYS.skills) || [];
    const skill = skills.find(s => s.id === id);
    if (!skill) return;

    document.getElementById('skill-edit-id').value = skill.id;
    document.getElementById('sk-name').value = skill.name;
    document.getElementById('sk-category').value = skill.category;
    document.getElementById('sk-level').value = skill.level;
    document.getElementById('sk-icon').value = skill.icon || '';
    document.getElementById('skill-form-area').style.display = '';
    document.getElementById('sk-name').focus();
};

window.deleteSkill = async function(id) {
    const ok = await showConfirm('Delete Skill', 'Are you sure you want to delete this skill?');
    if (!ok) return;
    const skills = (getData(STORAGE_KEYS.skills) || []).filter(s => s.id !== id);
    saveData(STORAGE_KEYS.skills, skills);
    loadSkillsAdmin();
    showToast('Skill deleted.', 'success');
};

// ========================================
// ADMIN: PROJECTS MANAGEMENT
// ========================================
function loadProjectsAdmin() {
    const projects = getData(STORAGE_KEYS.projects) || [];
    const tbody = document.getElementById('projects-tbody');
    const emptyState = document.getElementById('projects-empty');

    if (projects.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = projects.map(p => `
        <tr>
            <td>${escapeHtml(p.title)}</td>
            <td>${escapeHtml(p.category)}</td>
            <td>${p.featured ? '⭐ Yes' : 'No'}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editProject('${p.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProject('${p.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initProjectsAdmin() {
    const formArea = document.getElementById('project-form-area');
    const form = document.getElementById('project-form');

    document.getElementById('add-project-btn').addEventListener('click', () => {
        document.getElementById('proj-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('proj-title').focus();
    });

    document.getElementById('cancel-project-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const title = document.getElementById('proj-title').value.trim();
        const category = document.getElementById('proj-category').value.trim();
        const desc = document.getElementById('proj-desc').value.trim();
        const imageUrl = document.getElementById('proj-image').value.trim();
        const tech = document.getElementById('proj-tech').value.trim();
        const githubUrl = document.getElementById('proj-github').value.trim();
        const demoUrl = document.getElementById('proj-demo').value.trim();
        const featured = document.getElementById('proj-featured').checked;
        const editId = document.getElementById('proj-edit-id').value;
        let valid = true;

        if (!title) { setFieldError('proj-title-error', 'Title is required.'); valid = false; }
        if (!category) { setFieldError('proj-category-error', 'Category is required.'); valid = false; }
        if (!desc) { setFieldError('proj-desc-error', 'Description is required.'); valid = false; }
        if (githubUrl && !validateUrl(githubUrl)) { setFieldError('proj-title-error', 'Invalid GitHub URL.'); valid = false; }
        if (demoUrl && !validateUrl(demoUrl)) { setFieldError('proj-title-error', 'Invalid demo URL.'); valid = false; }

        if (!valid) return;

        const projects = getData(STORAGE_KEYS.projects) || [];
        const projectData = { title, category, description: desc, imageUrl, technologies: tech, githubUrl, demoUrl, featured };

        if (editId) {
            const idx = projects.findIndex(p => p.id === editId);
            if (idx > -1) {
                projects[idx] = { ...projects[idx], ...projectData };
            }
            showToast('Project updated!', 'success');
        } else {
            projects.push({ id: generateId(), ...projectData });
            showToast('Project added!', 'success');
        }

        saveData(STORAGE_KEYS.projects, projects);
        form.reset();
        formArea.style.display = 'none';
        loadProjectsAdmin();
    });

    // Search
    document.getElementById('admin-project-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#projects-tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });
}

window.editProject = function(id) {
    const projects = getData(STORAGE_KEYS.projects) || [];
    const p = projects.find(pr => pr.id === id);
    if (!p) return;

    document.getElementById('proj-edit-id').value = p.id;
    document.getElementById('proj-title').value = p.title || '';
    document.getElementById('proj-category').value = p.category || '';
    document.getElementById('proj-desc').value = p.description || '';
    document.getElementById('proj-image').value = p.imageUrl || '';
    document.getElementById('proj-tech').value = p.technologies || '';
    document.getElementById('proj-github').value = p.githubUrl || '';
    document.getElementById('proj-demo').value = p.demoUrl || '';
    document.getElementById('proj-featured').checked = !!p.featured;
    document.getElementById('project-form-area').style.display = '';
    document.getElementById('proj-title').focus();
};

window.deleteProject = async function(id) {
    const ok = await showConfirm('Delete Project', 'Are you sure you want to delete this project?');
    if (!ok) return;
    const projects = (getData(STORAGE_KEYS.projects) || []).filter(p => p.id !== id);
    saveData(STORAGE_KEYS.projects, projects);
    loadProjectsAdmin();
    showToast('Project deleted.', 'success');
};

// ========================================
// ADMIN: EDUCATION MANAGEMENT
// ========================================
function loadEducationAdmin() {
    const education = getData(STORAGE_KEYS.education) || [];
    const tbody = document.getElementById('edu-tbody');
    const emptyState = document.getElementById('edu-empty');

    if (education.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = education.map(e => `
        <tr>
            <td>${escapeHtml(e.degree)}</td>
            <td>${escapeHtml(e.institution)}</td>
            <td>${escapeHtml(e.startYear)} - ${escapeHtml(e.endYear || 'Present')}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editEducation('${e.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEducation('${e.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initEducationAdmin() {
    const formArea = document.getElementById('edu-form-area');
    const form = document.getElementById('edu-form');

    document.getElementById('add-edu-btn').addEventListener('click', () => {
        document.getElementById('edu-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('edu-degree').focus();
    });

    document.getElementById('cancel-edu-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const degree = document.getElementById('edu-degree').value.trim();
        const institution = document.getElementById('edu-institution').value.trim();
        const startYear = document.getElementById('edu-start').value.trim();
        const endYear = document.getElementById('edu-end').value.trim();
        const description = document.getElementById('edu-desc').value.trim();
        const achievements = document.getElementById('edu-achievements').value.trim();
        const editId = document.getElementById('edu-edit-id').value;
        let valid = true;

        if (!degree) { setFieldError('edu-degree-error', 'Degree is required.'); valid = false; }
        if (!institution) { setFieldError('edu-institution-error', 'Institution is required.'); valid = false; }
        if (!startYear) { setFieldError('edu-start-error', 'Start year is required.'); valid = false; }

        if (!valid) return;

        const education = getData(STORAGE_KEYS.education) || [];
        const data = { degree, institution, startYear, endYear, description, achievements };

        if (editId) {
            const idx = education.findIndex(ed => ed.id === editId);
            if (idx > -1) education[idx] = { ...education[idx], ...data };
            showToast('Education updated!', 'success');
        } else {
            education.push({ id: generateId(), ...data });
            showToast('Education added!', 'success');
        }

        saveData(STORAGE_KEYS.education, education);
        form.reset();
        formArea.style.display = 'none';
        loadEducationAdmin();
    });
}

window.editEducation = function(id) {
    const education = getData(STORAGE_KEYS.education) || [];
    const e = education.find(ed => ed.id === id);
    if (!e) return;

    document.getElementById('edu-edit-id').value = e.id;
    document.getElementById('edu-degree').value = e.degree || '';
    document.getElementById('edu-institution').value = e.institution || '';
    document.getElementById('edu-start').value = e.startYear || '';
    document.getElementById('edu-end').value = e.endYear || '';
    document.getElementById('edu-desc').value = e.description || '';
    document.getElementById('edu-achievements').value = e.achievements || '';
    document.getElementById('edu-form-area').style.display = '';
    document.getElementById('edu-degree').focus();
};

window.deleteEducation = async function(id) {
    const ok = await showConfirm('Delete Education', 'Are you sure?');
    if (!ok) return;
    const education = (getData(STORAGE_KEYS.education) || []).filter(e => e.id !== id);
    saveData(STORAGE_KEYS.education, education);
    loadEducationAdmin();
    showToast('Education record deleted.', 'success');
};

// ========================================
// ADMIN: EXPERIENCE MANAGEMENT
// ========================================
function loadExperienceAdmin() {
    const experience = getData(STORAGE_KEYS.experience) || [];
    const tbody = document.getElementById('exp-tbody');
    const emptyState = document.getElementById('exp-empty');

    if (experience.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = experience.map(e => `
        <tr>
            <td>${escapeHtml(e.role)}</td>
            <td>${escapeHtml(e.organization)}</td>
            <td>${escapeHtml(e.duration)}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editExperience('${e.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteExperience('${e.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initExperienceAdmin() {
    const formArea = document.getElementById('exp-form-area');
    const form = document.getElementById('exp-form');

    document.getElementById('add-exp-btn').addEventListener('click', () => {
        document.getElementById('exp-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('exp-role').focus();
    });

    document.getElementById('cancel-exp-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const role = document.getElementById('exp-role').value.trim();
        const organization = document.getElementById('exp-org').value.trim();
        const duration = document.getElementById('exp-duration').value.trim();
        const responsibilities = document.getElementById('exp-responsibilities').value.trim();
        const achievements = document.getElementById('exp-achievements').value.trim();
        const editId = document.getElementById('exp-edit-id').value;
        let valid = true;

        if (!role) { setFieldError('exp-role-error', 'Role is required.'); valid = false; }
        if (!organization) { setFieldError('exp-org-error', 'Organization is required.'); valid = false; }
        if (!duration) { setFieldError('exp-duration-error', 'Duration is required.'); valid = false; }

        if (!valid) return;

        const experience = getData(STORAGE_KEYS.experience) || [];
        const data = { role, organization, duration, responsibilities, achievements };

        if (editId) {
            const idx = experience.findIndex(ex => ex.id === editId);
            if (idx > -1) experience[idx] = { ...experience[idx], ...data };
            showToast('Experience updated!', 'success');
        } else {
            experience.push({ id: generateId(), ...data });
            showToast('Experience added!', 'success');
        }

        saveData(STORAGE_KEYS.experience, experience);
        form.reset();
        formArea.style.display = 'none';
        loadExperienceAdmin();
    });
}

window.editExperience = function(id) {
    const experience = getData(STORAGE_KEYS.experience) || [];
    const e = experience.find(ex => ex.id === id);
    if (!e) return;

    document.getElementById('exp-edit-id').value = e.id;
    document.getElementById('exp-role').value = e.role || '';
    document.getElementById('exp-org').value = e.organization || '';
    document.getElementById('exp-duration').value = e.duration || '';
    document.getElementById('exp-responsibilities').value = e.responsibilities || '';
    document.getElementById('exp-achievements').value = e.achievements || '';
    document.getElementById('exp-form-area').style.display = '';
    document.getElementById('exp-role').focus();
};

window.deleteExperience = async function(id) {
    const ok = await showConfirm('Delete Experience', 'Are you sure?');
    if (!ok) return;
    const experience = (getData(STORAGE_KEYS.experience) || []).filter(e => e.id !== id);
    saveData(STORAGE_KEYS.experience, experience);
    loadExperienceAdmin();
    showToast('Experience record deleted.', 'success');
};

// ========================================
// ADMIN: CERTIFICATIONS MANAGEMENT
// ========================================
function loadCertificationsAdmin() {
    const certs = getData(STORAGE_KEYS.certificates) || [];
    const tbody = document.getElementById('cert-tbody');
    const emptyState = document.getElementById('cert-empty');

    if (certs.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = certs.map(c => `
        <tr>
            <td>${escapeHtml(c.title)}</td>
            <td>${escapeHtml(c.organization)}</td>
            <td>${escapeHtml(c.date)}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editCert('${c.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCert('${c.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initCertificationsAdmin() {
    const formArea = document.getElementById('cert-form-area');
    const form = document.getElementById('cert-form');

    document.getElementById('add-cert-btn').addEventListener('click', () => {
        document.getElementById('cert-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('cert-title').focus();
    });

    document.getElementById('cancel-cert-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const title = document.getElementById('cert-title').value.trim();
        const organization = document.getElementById('cert-org').value.trim();
        const date = document.getElementById('cert-date').value.trim();
        const credentialUrl = document.getElementById('cert-url').value.trim();
        const editId = document.getElementById('cert-edit-id').value;
        let valid = true;

        if (!title) { setFieldError('cert-title-error', 'Title is required.'); valid = false; }
        if (!organization) { setFieldError('cert-org-error', 'Organization is required.'); valid = false; }
        if (!date) { setFieldError('cert-date-error', 'Date is required.'); valid = false; }

        if (!valid) return;

        const certs = getData(STORAGE_KEYS.certificates) || [];
        const data = { title, organization, date, credentialUrl };

        if (editId) {
            const idx = certs.findIndex(c => c.id === editId);
            if (idx > -1) certs[idx] = { ...certs[idx], ...data };
            showToast('Certificate updated!', 'success');
        } else {
            certs.push({ id: generateId(), ...data });
            showToast('Certificate added!', 'success');
        }

        saveData(STORAGE_KEYS.certificates, certs);
        form.reset();
        formArea.style.display = 'none';
        loadCertificationsAdmin();
    });
}

window.editCert = function(id) {
    const certs = getData(STORAGE_KEYS.certificates) || [];
    const c = certs.find(cert => cert.id === id);
    if (!c) return;

    document.getElementById('cert-edit-id').value = c.id;
    document.getElementById('cert-title').value = c.title || '';
    document.getElementById('cert-org').value = c.organization || '';
    document.getElementById('cert-date').value = c.date || '';
    document.getElementById('cert-url').value = c.credentialUrl || '';
    document.getElementById('cert-form-area').style.display = '';
    document.getElementById('cert-title').focus();
};

window.deleteCert = async function(id) {
    const ok = await showConfirm('Delete Certificate', 'Are you sure?');
    if (!ok) return;
    const certs = (getData(STORAGE_KEYS.certificates) || []).filter(c => c.id !== id);
    saveData(STORAGE_KEYS.certificates, certs);
    loadCertificationsAdmin();
    showToast('Certificate deleted.', 'success');
};

// ========================================
// ADMIN: SERVICES MANAGEMENT
// ========================================
function loadServicesAdmin() {
    const services = getData(STORAGE_KEYS.services) || [];
    const tbody = document.getElementById('svc-tbody');
    const emptyState = document.getElementById('svc-empty');

    if (services.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = services.map(s => `
        <tr>
            <td>${s.icon || '⚙️'}</td>
            <td>${escapeHtml(s.title)}</td>
            <td>${s.active !== false ? '✅ Yes' : '❌ No'}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editService('${s.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteService('${s.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initServicesAdmin() {
    const formArea = document.getElementById('svc-form-area');
    const form = document.getElementById('svc-form');

    document.getElementById('add-svc-btn').addEventListener('click', () => {
        document.getElementById('svc-edit-id').value = '';
        form.reset();
        document.getElementById('svc-active').checked = true;
        formArea.style.display = '';
        document.getElementById('svc-title').focus();
    });

    document.getElementById('cancel-svc-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const title = document.getElementById('svc-title').value.trim();
        const icon = document.getElementById('svc-icon').value.trim();
        const description = document.getElementById('svc-desc').value.trim();
        const active = document.getElementById('svc-active').checked;
        const editId = document.getElementById('svc-edit-id').value;
        let valid = true;

        if (!title) { setFieldError('svc-title-error', 'Title is required.'); valid = false; }
        if (!description) { setFieldError('svc-desc-error', 'Description is required.'); valid = false; }

        if (!valid) return;

        const services = getData(STORAGE_KEYS.services) || [];
        const data = { title, icon: icon || '⚙️', description, active };

        if (editId) {
            const idx = services.findIndex(s => s.id === editId);
            if (idx > -1) services[idx] = { ...services[idx], ...data };
            showToast('Service updated!', 'success');
        } else {
            services.push({ id: generateId(), ...data });
            showToast('Service added!', 'success');
        }

        saveData(STORAGE_KEYS.services, services);
        form.reset();
        formArea.style.display = 'none';
        loadServicesAdmin();
    });
}

window.editService = function(id) {
    const services = getData(STORAGE_KEYS.services) || [];
    const s = services.find(svc => svc.id === id);
    if (!s) return;

    document.getElementById('svc-edit-id').value = s.id;
    document.getElementById('svc-title').value = s.title || '';
    document.getElementById('svc-icon').value = s.icon || '';
    document.getElementById('svc-desc').value = s.description || '';
    document.getElementById('svc-active').checked = s.active !== false;
    document.getElementById('svc-form-area').style.display = '';
    document.getElementById('svc-title').focus();
};

window.deleteService = async function(id) {
    const ok = await showConfirm('Delete Service', 'Are you sure?');
    if (!ok) return;
    const services = (getData(STORAGE_KEYS.services) || []).filter(s => s.id !== id);
    saveData(STORAGE_KEYS.services, services);
    loadServicesAdmin();
    showToast('Service deleted.', 'success');
};

// ========================================
// ADMIN: TESTIMONIALS MANAGEMENT
// ========================================
function loadTestimonialsAdmin() {
    const testimonials = getData(STORAGE_KEYS.testimonials) || [];
    const tbody = document.getElementById('test-tbody');
    const emptyState = document.getElementById('test-empty');

    if (testimonials.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = testimonials.map(t => `
        <tr>
            <td>${escapeHtml(t.name)}</td>
            <td>${escapeHtml(t.role)}</td>
            <td>${escapeHtml((t.message || '').substring(0, 50))}${(t.message || '').length > 50 ? '...' : ''}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="editTestimonial('${t.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTestimonial('${t.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initTestimonialsAdmin() {
    const formArea = document.getElementById('test-form-area');
    const form = document.getElementById('test-form');

    document.getElementById('add-test-btn').addEventListener('click', () => {
        document.getElementById('test-edit-id').value = '';
        form.reset();
        formArea.style.display = '';
        document.getElementById('test-name').focus();
    });

    document.getElementById('cancel-test-btn').addEventListener('click', () => {
        formArea.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors(form);

        const name = document.getElementById('test-name').value.trim();
        const role = document.getElementById('test-role').value.trim();
        const message = document.getElementById('test-message').value.trim();
        const imageUrl = document.getElementById('test-image').value.trim();
        const editId = document.getElementById('test-edit-id').value;
        let valid = true;

        if (!name) { setFieldError('test-name-error', 'Name is required.'); valid = false; }
        if (!role) { setFieldError('test-role-error', 'Role is required.'); valid = false; }
        if (!message) { setFieldError('test-message-error', 'Message is required.'); valid = false; }

        if (!valid) return;

        const testimonials = getData(STORAGE_KEYS.testimonials) || [];
        const data = { name, role, message, imageUrl };

        if (editId) {
            const idx = testimonials.findIndex(t => t.id === editId);
            if (idx > -1) testimonials[idx] = { ...testimonials[idx], ...data };
            showToast('Testimonial updated!', 'success');
        } else {
            testimonials.push({ id: generateId(), ...data });
            showToast('Testimonial added!', 'success');
        }

        saveData(STORAGE_KEYS.testimonials, testimonials);
        form.reset();
        formArea.style.display = 'none';
        loadTestimonialsAdmin();
    });
}

window.editTestimonial = function(id) {
    const testimonials = getData(STORAGE_KEYS.testimonials) || [];
    const t = testimonials.find(test => test.id === id);
    if (!t) return;

    document.getElementById('test-edit-id').value = t.id;
    document.getElementById('test-name').value = t.name || '';
    document.getElementById('test-role').value = t.role || '';
    document.getElementById('test-message').value = t.message || '';
    document.getElementById('test-image').value = t.imageUrl || '';
    document.getElementById('test-form-area').style.display = '';
    document.getElementById('test-name').focus();
};

window.deleteTestimonial = async function(id) {
    const ok = await showConfirm('Delete Testimonial', 'Are you sure?');
    if (!ok) return;
    const testimonials = (getData(STORAGE_KEYS.testimonials) || []).filter(t => t.id !== id);
    saveData(STORAGE_KEYS.testimonials, testimonials);
    loadTestimonialsAdmin();
    showToast('Testimonial deleted.', 'success');
};

// ========================================
// ADMIN: MESSAGES MANAGEMENT
// ========================================
function loadMessagesAdmin() {
    const messages = getData(STORAGE_KEYS.messages) || [];
    const tbody = document.getElementById('msg-tbody');
    const emptyState = document.getElementById('msg-empty');

    if (messages.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';
    const sorted = [...messages].reverse(); // newest first
    tbody.innerHTML = sorted.map(m => `
        <tr>
            <td>${escapeHtml(m.name)}</td>
            <td>${escapeHtml(m.email)}</td>
            <td>${escapeHtml(m.subject)}</td>
            <td><span class="badge ${m.read ? 'badge-read' : 'badge-unread'}">${m.read ? 'Read' : 'Unread'}</span></td>
            <td class="action-btns">
                <button class="btn btn-sm btn-primary" onclick="viewMessage('${m.id}')">View</button>
                <button class="btn btn-sm btn-secondary" onclick="toggleMessageRead('${m.id}')">${m.read ? 'Unread' : 'Read'}</button>
                <button class="btn btn-sm btn-danger" onclick="deleteMessage('${m.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function initMessagesAdmin() {
    document.getElementById('msg-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#msg-tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });
}

window.viewMessage = function(id) {
    const messages = getData(STORAGE_KEYS.messages) || [];
    const m = messages.find(msg => msg.id === id);
    if (!m) return;

    // Mark as read
    m.read = true;
    saveData(STORAGE_KEYS.messages, messages);
    loadMessagesAdmin();

    const modal = document.getElementById('message-modal');
    const body = document.getElementById('message-modal-body');
    body.innerHTML = `
        <h2 style="margin-bottom: 1rem;">${escapeHtml(m.subject)}</h2>
        <p style="margin-bottom: 0.5rem;"><strong>From:</strong> ${escapeHtml(m.name)} (${escapeHtml(m.email)})</p>
        <p style="margin-bottom: 1rem; color: var(--muted-text-color); font-size: 0.85rem;"><strong>Date:</strong> ${new Date(m.date).toLocaleString()}</p>
        <div style="padding: 1rem; background: var(--background-color); border-radius: var(--radius-sm); line-height: 1.7;">
            ${escapeHtml(m.message)}
        </div>
    `;
    modal.style.display = 'flex';
};

window.toggleMessageRead = function(id) {
    const messages = getData(STORAGE_KEYS.messages) || [];
    const m = messages.find(msg => msg.id === id);
    if (!m) return;
    m.read = !m.read;
    saveData(STORAGE_KEYS.messages, messages);
    loadMessagesAdmin();
    showToast(`Message marked as ${m.read ? 'read' : 'unread'}.`, 'info');
};

window.deleteMessage = async function(id) {
    const ok = await showConfirm('Delete Message', 'Are you sure you want to delete this message?');
    if (!ok) return;
    const messages = (getData(STORAGE_KEYS.messages) || []).filter(m => m.id !== id);
    saveData(STORAGE_KEYS.messages, messages);
    loadMessagesAdmin();
    showToast('Message deleted.', 'success');
};

// ========================================
// ADMIN: SETTINGS
// ========================================
function loadSettingsForm() {
    const settings = getData(STORAGE_KEYS.settings) || getDefaultSettings();
    document.getElementById('set-primary').value = settings.primaryColor || '#6c63ff';
    document.getElementById('set-secondary').value = settings.secondaryColor || '#00c2ff';
    document.getElementById('set-font').value = settings.fontFamily || 'system-ui, -apple-system, sans-serif';
    document.getElementById('set-darkmode').checked = settings.darkModeDefault !== false;
    document.getElementById('set-footer').value = settings.footerText || '';

    // Section toggles
    const secs = settings.sections || {};
    document.querySelectorAll('[data-section-toggle]').forEach(cb => {
        const key = cb.getAttribute('data-section-toggle');
        cb.checked = secs[key] !== false;
    });
}

function initSettingsForm() {
    document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const sections = {};
        document.querySelectorAll('[data-section-toggle]').forEach(cb => {
            sections[cb.getAttribute('data-section-toggle')] = cb.checked;
        });

        const settings = {
            primaryColor: document.getElementById('set-primary').value,
            secondaryColor: document.getElementById('set-secondary').value,
            fontFamily: document.getElementById('set-font').value,
            darkModeDefault: document.getElementById('set-darkmode').checked,
            footerText: document.getElementById('set-footer').value.trim(),
            sections
        };

        saveData(STORAGE_KEYS.settings, settings);
        applySettingsTheme();
        showToast('Settings saved!', 'success');
    });

    document.getElementById('reset-all-data-btn').addEventListener('click', resetDemoData);
}

// ========================================
// NAVBAR BEHAVIOR
// ========================================
const hamburgerButton = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu .nav-link');

if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('active');

        hamburgerButton.classList.toggle('active', isOpen);
        hamburgerButton.setAttribute(
            'aria-expanded',
            String(isOpen)
        );
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburgerButton.classList.remove('active');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        });
    });
}