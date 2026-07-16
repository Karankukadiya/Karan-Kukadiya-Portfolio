// ============================================================
// PROJECTS: rendering + "browse all" modal with category tabs
// Depends on: projects-data.js, utils.js
// ============================================================
function getIconClass(project) {
    return project.icon ? `fas ${project.icon}` : "fas fa-chart-column";
}

function renderProjectCard(p, showOutcome = false) {
    const techHtml = p.techStack.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('');
    const outcomeHtml = showOutcome && p.outcome
        ? `<p class="project-outcome"><i class="fas fa-chart-line"></i> Outcome: ${escapeHtml(p.outcome)}</p>`
        : '';
    return `<div class="project-card">
        <div class="project-icon"><i class="${getIconClass(p)}"></i></div>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.shortDesc)}</p>
        <div class="tech-stack">${techHtml}</div>
        ${outcomeHtml}
        <div class="project-links">
            <a href="${p.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub (Code & Report)</a>
        </div>
    </div>`;
}

function renderFeaturedProjects() {
    const featuredContainer = document.getElementById('featuredProjectsGrid');
    if (!featuredContainer) return;
    featuredContainer.innerHTML = '';
    projectsLibrary.slice(0, 3).forEach(proj => {
        featuredContainer.innerHTML += renderProjectCard(proj, false);
    });
}

function renderModalProjects(category = 'all') {
    const modalGrid = document.getElementById('modalProjectsGrid');
    if (!modalGrid) return;
    const filtered = category === 'all'
        ? projectsLibrary
        : projectsLibrary.filter(p => p.category === category);
    modalGrid.innerHTML = '';
    if (filtered.length === 0) {
        modalGrid.innerHTML = '<div class="no-results">No projects in this category.</div>';
        return;
    }
    filtered.forEach(proj => {
        modalGrid.innerHTML += renderProjectCard(proj, true);
    });
}

function initProjectsModal() {
    const modal = document.getElementById('projectsModal');
    const viewBtn = document.getElementById('viewAllProjectsBtn');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;

    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            const activeTab = document.querySelector('.modal-tabs .tab-btn.active');
            const currentCat = activeTab ? activeTab.dataset.tab : 'all';
            renderModalProjects(currentCat);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.querySelectorAll('.modal-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderModalProjects(btn.dataset.tab);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProjects();
    renderModalProjects('all');
    initProjectsModal();
});
