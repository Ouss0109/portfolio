// Handle profile image loading
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.onerror = function() {
            // Si l'image ne charge pas, afficher une icône placeholder
            this.style.display = 'none';
            const container = this.parentElement;
            container.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #2d5016 0%, #3a6b1e 50%, #4a7c2a 100%); border-radius: 5.5rem;">
                    <i class="ri-user-line" style="font-size: 5rem; color: white;"></i>
                </div>
            `;
        };
    }

    // Navigation toggle
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Load saved projects
    loadProjects();

    // Handle skills images error - show icon fallback
    const skillsImages = document.querySelectorAll('.skills__img');
    skillsImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const icon = this.nextElementSibling;
            if (icon && icon.classList.contains('skills__icon')) {
                icon.style.display = 'block';
            }
        };
        // If image loads successfully, ensure icon is hidden
        img.onload = function() {
            const icon = this.nextElementSibling;
            if (icon && icon.classList.contains('skills__icon')) {
                icon.style.display = 'none';
            }
        };
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Up button
const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 400) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
});

// Web 3D Projects Management
let web3dProjects = [];

// Load projects from localStorage on page load
function loadProjects() {
    const savedProjects = localStorage.getItem('web3dProjects');
    if (savedProjects) {
        web3dProjects = JSON.parse(savedProjects);
        renderProjects();
    }
}

// Save projects to localStorage
function saveProjects() {
    localStorage.setItem('web3dProjects', JSON.stringify(web3dProjects));
}

// Render all Web 3D projects
function renderProjects() {
    const container = document.getElementById('web3dProjects');
    if (!container) return;

    if (web3dProjects.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-color-light);">
                <i class="ri-code-s-slash-line" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Aucun projet Web 3D pour le moment. Ajoutez votre premier projet !</p>
            </div>
        `;
        return;
    }

    // Gradient colors for different projects
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];

    container.innerHTML = web3dProjects.map((project, index) => {
        const gradientIndex = index % gradients.length;
        const gradient = gradients[gradientIndex];
        
        const hasImage = project.image ? 'has-image' : '';
        return `
        <div class="web3d-project-card">
            <div class="web3d-project-image ${hasImage}" style="background: ${gradient};">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}" onerror="this.onerror=null; this.parentElement.classList.remove('has-image'); this.style.display='none';" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2;">` : 
                    ''
                }
                ${!project.image ? `<i class="ri-code-s-slash-line"></i>` : ''}
                <div class="project__card-badge" style="position: absolute; top: 1rem; right: 1rem; z-index: 10;">Web 3D</div>
            </div>
            <div class="web3d-project-content">
                <span class="project__category">Interactive 3D</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.tech ? `
                    <div class="web3d-project-tech">
                        ${project.tech.split(',').map(t => `<span class="tech-badge">${t.trim()}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="web3d-project-actions">
                    ${project.url ? `
                        <a href="${project.url}" target="_blank" class="project__card-link">
                            Voir le projet <i class="ri-arrow-right-line"></i>
                        </a>
                    ` : ''}
                    <button class="web3d__button web3d__button-secondary" onclick="deleteProject(${index})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        <i class="ri-delete-bin-line"></i> Supprimer
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Delete a project
function deleteProject(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        web3dProjects.splice(index, 1);
        saveProjects();
        renderProjects();
        showNotification('Projet supprimé avec succès !', 'success');
    }
}

// Make deleteProject globally available
window.deleteProject = deleteProject;

// Modal management
const modal = document.getElementById('projectModal');
const addProjectBtn = document.getElementById('addProjectBtn');
const cancelBtn = document.getElementById('cancelBtn');
const projectForm = document.getElementById('projectForm');

if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        projectForm.reset();
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (modal) {
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Handle form submission
if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(projectForm);
        const project = {
            title: formData.get('title'),
            description: formData.get('description'),
            url: formData.get('url') || null,
            image: formData.get('image') || null,
            tech: formData.get('tech') || null,
            date: new Date().toISOString()
        };

        web3dProjects.push(project);
        saveProjects();
        renderProjects();
        modal.style.display = 'none';
        projectForm.reset();

        // Show success message
        showNotification('Projet ajouté avec succès !', 'success');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2d5016' : '#4a7c2a'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactMessage = document.getElementById('contact-message');
        
        // Show success message
        contactMessage.textContent = 'Message envoyé avec succès !';
        contactMessage.classList.add('success');
        
        setTimeout(() => {
            contactMessage.textContent = '';
            contactMessage.classList.remove('success');
        }, 3000);
        
        contactForm.reset();
        showNotification('Message envoyé avec succès !', 'success');
    });
}

function openVideo(id) {
    document.getElementById(id).style.display = "flex";
}

function closeVideo(id) {
    let popup = document.getElementById(id);
    popup.style.display = "none";

    // Stop video when closing
    let video = popup.querySelector("video");
    video.pause();
    video.currentTime = 0;
}

