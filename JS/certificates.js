// ============================================================
// CERTIFICATES: featured preview (3) + "browse all" modal +
// full-size preview modal
// Depends on: certificates-data.js, utils.js
// ============================================================
function renderCertificateCard(c) {
    return `<div class="project-card cert-card">
        <img src="${c.image}" alt="${escapeHtml(c.name)}" class="cert-thumb"
             data-cert-id="${c.id}" loading="lazy" decoding="async" width="320" height="185"
             onerror="this.src='https://via.placeholder.com/320x160?text=Certificate'">
        <div class="cert-issuer"><i class="fas fa-building"></i> ${escapeHtml(c.issuer)}</div>
        <h3>${escapeHtml(c.name)}</h3>
        <div class="cert-date"><i class="fas fa-calendar"></i> ${escapeHtml(c.date)}</div>
        <div class="project-links">
            <a href="${c.image}" target="_blank"><i class="fas fa-expand"></i> View Full Size</a>
        </div>
    </div>`;
}

function renderFeaturedCertificates() {
    const grid = document.getElementById('featuredCertificatesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    certificatesLibrary.slice(0, 3).forEach(c => {
        grid.innerHTML += renderCertificateCard(c);
    });
}

function renderModalCertificates() {
    const grid = document.getElementById('modalCertificatesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (certificatesLibrary.length === 0) {
        grid.innerHTML = '<div class="no-results">No certificates yet.</div>';
        return;
    }
    certificatesLibrary.forEach(c => {
        grid.innerHTML += renderCertificateCard(c);
    });
}

function openCertModal(id) {
    const cert = certificatesLibrary.find(c => c.id === id);
    if (!cert) return;
    document.getElementById('certModalTitle').textContent = cert.name;
    document.getElementById('certModalImage').src = cert.image;
    document.getElementById('certModalDownload').href = cert.image;
    document.getElementById('certModal').style.display = 'block';
}

function initCertificatesModals() {
    // Event delegation on both grids: works for featured cards AND
    // modal cards, even after re-render.
    ['featuredCertificatesGrid', 'modalCertificatesGrid'].forEach(gridId => {
        const grid = document.getElementById(gridId);
        if (grid) {
            grid.addEventListener('click', (e) => {
                const thumb = e.target.closest('.cert-thumb');
                if (thumb) openCertModal(Number(thumb.dataset.certId));
            });
        }
    });

    document.getElementById('closeCertModal')?.addEventListener('click', () => {
        document.getElementById('certModal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target.id === 'certModal') e.target.style.display = 'none';
    });

    // Browse All Certificates modal
    const certificatesModal = document.getElementById('certificatesModal');
    const viewAllBtn = document.getElementById('viewAllCertificatesBtn');
    const closeAllBtn = certificatesModal ? certificatesModal.querySelector('.close-modal') : null;

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            certificatesModal.style.display = 'block';
            renderModalCertificates();
        });
    }

    if (closeAllBtn) {
        closeAllBtn.addEventListener('click', () => { certificatesModal.style.display = 'none'; });
    }

    window.addEventListener('click', (e) => {
        if (e.target === certificatesModal) certificatesModal.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedCertificates();
    initCertificatesModals();
});
