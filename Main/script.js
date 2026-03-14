document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderPersonalInfo(data.personalInfo);
            renderUIStrings(data.ui);
            renderProjects(data.projectsWeb, 'web-projects-grid');
            renderProjects(data.projectsDesign, 'design-projects-grid');
            renderVideos(data.videos, 'video-grid');
            renderSkills(data.skills, 'skills-grid');
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderPersonalInfo(info) {
    if (!info) return;

    // Page Title
    document.getElementById('page-title').textContent = info.name;

    // Header
    const headerAvatar = document.getElementById('header-avatar');
    if (headerAvatar) {
        headerAvatar.src = info.avatarImage;
        headerAvatar.alt = info.name;
    }
    const headerName = document.getElementById('header-name');
    if (headerName) headerName.textContent = info.name;
    const headerRole = document.getElementById('header-role');
    if (headerRole) headerRole.textContent = info.role;

    // Hero Section
    const heroAvatar = document.getElementById('hero-avatar');
    if (heroAvatar) {
        heroAvatar.src = info.avatarImage;
        heroAvatar.alt = info.name;
    }
    const heroLogo = document.getElementById('hero-logo');
    if (heroLogo) heroLogo.src = info.logoImage;
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = info.heroSubtitle;
    const heroDescription = document.getElementById('hero-description');
    if (heroDescription) heroDescription.textContent = info.heroDescription;

    // About Me
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = info.aboutMe.map(p => `<p>${p}</p>`).join('');
    }

    // Contact
    const contactDesc = document.getElementById('contact-description');
    if (contactDesc) contactDesc.textContent = info.contactDescription;

    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer && info.socialLinks) {
        socialLinksContainer.innerHTML = info.socialLinks
            .map(link => `<a href="${link.url}">${link.name}</a>`)
            .join('');
    }

    // Footer
    const footerText = document.getElementById('footer-text');
    if (footerText) footerText.textContent = info.footerText;
}

function renderUIStrings(ui) {
    if (!ui) return;

    const navBtn = document.getElementById('nav-btn');
    if (navBtn) navBtn.textContent = ui.navButton;

    const heroCta = document.getElementById('hero-cta');
    if (heroCta) heroCta.textContent = ui.heroCTA;

    // Section Titles
    if (ui.sectionTitles) {
        const titles = {
            'title-desarrollo': ui.sectionTitles.desarrollo,
            'title-diseno': ui.sectionTitles.diseno,
            'title-videos': ui.sectionTitles.videos,
            'title-sobreMi': ui.sectionTitles.sobreMi,
            'title-habilidades': ui.sectionTitles.habilidades,
            'title-contacto': ui.sectionTitles.contacto
        };
        for (const [id, text] of Object.entries(titles)) {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        }
    }

    // Form
    if (ui.form) {
        const labelNombre = document.getElementById('label-nombre');
        if (labelNombre) labelNombre.textContent = ui.form.nameLabel;
        const inputNombre = document.getElementById('nombre');
        if (inputNombre) inputNombre.placeholder = ui.form.namePlaceholder;

        const labelEmail = document.getElementById('label-email');
        if (labelEmail) labelEmail.textContent = ui.form.emailLabel;
        const inputEmail = document.getElementById('email');
        if (inputEmail) inputEmail.placeholder = ui.form.emailPlaceholder;

        const labelMensaje = document.getElementById('label-mensaje');
        if (labelMensaje) labelMensaje.textContent = ui.form.messageLabel;
        const inputMensaje = document.getElementById('mensaje');
        if (inputMensaje) inputMensaje.placeholder = ui.form.messagePlaceholder;

        const btnSubmit = document.getElementById('btn-submit');
        if (btnSubmit) btnSubmit.textContent = ui.form.submitButton;
    }
}

function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !projects) return;
    container.innerHTML = '';
    projects.forEach(project => {
        const techTags = project.tech ? project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '';
        const projectHTML = `
            <div class="glass-panel project-card">
              <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
              </div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="project-tech">
                ${techTags}
              </div>
            </div>
        `;
        container.innerHTML += projectHTML;
    });
}

function renderVideos(videos, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !videos) return;
    container.innerHTML = '';
    videos.forEach(video => {
        const videoHTML = `
            <div class="glass-panel video-card">
              <iframe src="${video.url}" allowfullscreen></iframe>
              <h3>${video.title}</h3>
              <p>${video.description}</p>
            </div>
        `;
        container.innerHTML += videoHTML;
    });
}

function renderSkills(skillsCategories, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !skillsCategories) return;
    container.innerHTML = '';
    skillsCategories.forEach(category => {
        const itemsHTML = category.items ? category.items.map(item => `<li>${item}</li>`).join('') : '';
        const categoryHTML = `
            <div class="skill-category">
              <h3>${category.category}</h3>
              <ul class="skill-list">
                ${itemsHTML}
              </ul>
            </div>
        `;
        container.innerHTML += categoryHTML;
    });
}
