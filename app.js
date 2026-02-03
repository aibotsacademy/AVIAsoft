// Global state
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroScene, heroCamera, heroRenderer;
let rampScene, rampCamera, rampRenderer;
let heroAnimationId, rampAnimationId;

// Motion Toggle
document.addEventListener('DOMContentLoaded', () => {
    const motionToggle = document.getElementById('motion-toggle');
    if (motionToggle) {
        motionToggle.addEventListener('click', () => {
            reducedMotion = !reducedMotion;
            document.body.classList.toggle('reduced-motion', reducedMotion);
            motionToggle.classList.toggle('reduced-motion', reducedMotion);
            
            if (reducedMotion) {
                // Pause animations
                if (heroAnimationId) cancelAnimationFrame(heroAnimationId);
                if (rampAnimationId) cancelAnimationFrame(rampAnimationId);
            } else {
                // Resume animations
                if (heroRenderer) animateHero();
                if (rampRenderer) animateRamp();
            }
        });
    }

    // Initialize all components
    initNavigation();
    initHeroScene();
    initModulesScrollTrigger();
    initMetrics();
    initInteractiveDemos();
    initRampScene();
});

// Navigation
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll detection
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            if (targetId === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Check if it's a module
            const moduleIds = ['ramp-report', 'wheelchair-requests', 'wheelchair-monitoring', 'avatars-kiosk'];
            const moduleIndex = moduleIds.indexOf(targetId);
            
            if (moduleIndex !== -1) {
                const modulesSection = document.querySelector('.modules-scroll-story');
                if (modulesSection) {
                    const scrollTo = modulesSection.offsetTop + (moduleIndex * (modulesSection.offsetHeight / 4));
                    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                }
            } else {
                const target = document.querySelector(`#${targetId}`);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // CTA buttons
    document.querySelectorAll('[data-scroll-to]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.scrollTo);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY;
    
    // Determine which section we're in
    let currentSection = 'hero';
    
    // Check hero
    if (scrollPosition < window.innerHeight * 0.8) {
        currentSection = 'hero';
    } else {
        // Check modules section
        const modulesSection = document.querySelector('.modules-scroll-story');
        if (modulesSection) {
            const sectionTop = modulesSection.offsetTop;
            const sectionBottom = sectionTop + modulesSection.offsetHeight;
            
            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionBottom) {
                const relativeScroll = scrollPosition - sectionTop;
                const progress = relativeScroll / modulesSection.offsetHeight;
                const moduleIndex = Math.min(Math.floor(progress * 4), 3);
                const moduleIds = ['ramp-report', 'wheelchair-requests', 'wheelchair-monitoring', 'avatars-kiosk'];
                currentSection = moduleIds[moduleIndex];
            }
        }
    }
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Three.js Hero Scene
function initHeroScene() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Camera position
    heroCamera.position.z = 30;
    
    // Grid
    const gridSize = 50;
    const gridDivisions = 50;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00d9ff, 0x1e293b);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -5;
    heroScene.add(gridHelper);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    heroScene.add(particlesMesh);
    
    // Runway lines
    const runwayGeometry = new THREE.BoxGeometry(0.2, 40, 0.1);
    const runwayMaterial = new THREE.MeshBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.5 });
    
    for (let i = -3; i <= 3; i += 2) {
        const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
        runway.position.x = i * 5;
        runway.position.z = -2;
        heroScene.add(runway);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    heroScene.add(ambientLight);
    
    // Animation
    let time = 0;
    function animateHero() {
        if (reducedMotion) return;
        
        time += 0.005;
        
        // Rotate particles
        particlesMesh.rotation.y = time * 0.3;
        
        // Move grid
        gridHelper.position.y = Math.sin(time) * 0.5;
        
        // Camera subtle movement
        if (!reducedMotion) {
            heroCamera.position.x = Math.sin(time * 0.5) * 2;
            heroCamera.position.y = Math.cos(time * 0.3) * 1;
            heroCamera.lookAt(0, 0, 0);
        }
        
        heroRenderer.render(heroScene, heroCamera);
        heroAnimationId = requestAnimationFrame(animateHero);
    }
    
    if (!reducedMotion) {
        animateHero();
    } else {
        heroRenderer.render(heroScene, heroCamera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// RAMP Report 3D Scene
function initRampScene() {
    const canvas = document.getElementById('ramp-3d-canvas');
    if (!canvas) return;
    
    rampScene = new THREE.Scene();
    rampCamera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    rampRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    rampRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    rampRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    rampCamera.position.set(0, 10, 20);
    rampCamera.lookAt(0, 0, 0);
    
    // Create holographic ramp map
    const planeGeometry = new THREE.PlaneGeometry(15, 15, 20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    rampScene.add(plane);
    
    // Add gate markers
    for (let i = 0; i < 5; i++) {
        const gateGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
        const gateMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
        const gate = new THREE.Mesh(gateGeometry, gateMaterial);
        gate.position.set(
            (Math.random() - 0.5) * 12,
            1,
            (Math.random() - 0.5) * 12
        );
        rampScene.add(gate);
    }
    
    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    rampScene.add(light);
    
    // Animation
    let rampTime = 0;
    function animateRamp() {
        if (reducedMotion) return;
        
        rampTime += 0.01;
        
        // Rotate plane slowly
        plane.rotation.z = rampTime * 0.2;
        
        // Animate vertices
        const positions = plane.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const wave = Math.sin(x + rampTime) * Math.cos(y + rampTime) * 0.5;
            positions.setZ(i, wave);
        }
        positions.needsUpdate = true;
        
        rampRenderer.render(rampScene, rampCamera);
        rampAnimationId = requestAnimationFrame(animateRamp);
    }
    
    if (!reducedMotion) {
        animateRamp();
    } else {
        rampRenderer.render(rampScene, rampCamera);
    }
}

// GSAP ScrollTrigger for Modules
function initModulesScrollTrigger() {
    const modulePanels = document.querySelectorAll('.module-panel');
    const progressItems = document.querySelectorAll('.progress-item');
    
    if (modulePanels.length === 0) return;
    
    // Initially show first module
    modulePanels[0].classList.add('active');
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded - using fallback scroll behavior');
        
        // Fallback: simple scroll-based switching
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const modulesSection = document.querySelector('.modules-scroll-story');
            if (!modulesSection) return;
            
            const sectionTop = modulesSection.offsetTop;
            const sectionHeight = modulesSection.offsetHeight;
            const relativeScroll = scrollPosition - sectionTop;
            
            if (relativeScroll > 0 && relativeScroll < sectionHeight) {
                const progress = relativeScroll / sectionHeight;
                const moduleIndex = Math.min(Math.floor(progress * 4), 3);
                activateModule(moduleIndex);
            }
        });
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Create scroll trigger for each module
    modulePanels.forEach((panel, index) => {
        ScrollTrigger.create({
            trigger: '.modules-scroll-story',
            start: `top+=${index * 25}% top`,
            end: `top+=${(index + 1) * 25}% top`,
            onEnter: () => activateModule(index),
            onEnterBack: () => activateModule(index),
        });
    });
    
    function activateModule(index) {
        // Update panels
        modulePanels.forEach((panel, i) => {
            if (i === index) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        // Update progress indicators
        progressItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Make progress items clickable
    progressItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const modulesSection = document.querySelector('.modules-scroll-story');
            if (modulesSection) {
                const scrollTo = modulesSection.offsetTop + (index * (modulesSection.offsetHeight / 4));
                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        });
    });
}

// Metrics Counter Animation
function initMetrics() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const valueEl = card.querySelector('.metric-value');
                const target = parseFloat(valueEl.dataset.target);
                
                animateCounter(valueEl, target);
                drawSparkline(card.querySelector('.sparkline'));
                
                observer.unobserve(card);
            }
        });
    }, observerOptions);
    
    metricCards.forEach(card => observer.observe(card));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function drawSparkline(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Generate random data points
    const points = 20;
    const data = [];
    for (let i = 0; i < points; i++) {
        data.push(Math.random() * 0.5 + 0.5);
    }
    
    // Draw line
    ctx.strokeStyle = '#00d9ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (points - 1)) * width;
        const y = height - (value * height);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
}

// Interactive Demos
function initInteractiveDemos() {
    initRampFilters();
    initWheelchairStepper();
    initMonitoringBoard();
    initKioskVideo();
}

// RAMP Report Filters
function initRampFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Simulate filter animation
            const cards = document.querySelectorAll('.flight-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    });
}

// Wheelchair Stepper
function initWheelchairStepper() {
    const steps = document.querySelectorAll('.step');
    const stepPanels = document.querySelectorAll('.step-panel');
    let currentStep = 1;
    let stepInterval;
    
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        stepPanels.forEach((panel, index) => {
            if (index + 1 === stepNumber) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // Auto-advance stepper on scroll into view
    const stepperObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !reducedMotion) {
                clearInterval(stepInterval);
                currentStep = 1;
                showStep(currentStep);
                
                stepInterval = setInterval(() => {
                    currentStep++;
                    if (currentStep > 4) currentStep = 1;
                    showStep(currentStep);
                }, 2000);
            } else {
                clearInterval(stepInterval);
            }
        });
    });
    
    const stepperContainer = document.querySelector('.stepper-container');
    if (stepperContainer) {
        stepperObserver.observe(stepperContainer);
    }
    
    // Assign button interaction
    const assignBtns = document.querySelectorAll('.assign-btn');
    assignBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.request-card');
            const statusChip = card.querySelector('.status-chip');
            
            statusChip.classList.remove('new');
            statusChip.classList.add('assigned');
            statusChip.textContent = 'Assigned';
            
            this.style.display = 'none';
            
            // Add pulse indicator
            const pulse = document.createElement('div');
            pulse.className = 'pulse-indicator';
            card.appendChild(pulse);
        });
    });
}

// Monitoring Board - Live Updates
function initMonitoringBoard() {
    const timers = document.querySelectorAll('.timer');
    
    // Update timers every second
    setInterval(() => {
        timers.forEach(timer => {
            let elapsed = parseInt(timer.dataset.elapsed);
            elapsed++;
            timer.dataset.elapsed = elapsed;
            
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            // Update SLA badges based on time
            const row = timer.closest('.board-row');
            const slaBadge = row.querySelector('.sla-badge');
            
            if (elapsed > 600) { // 10 minutes
                row.dataset.sla = 'critical';
                slaBadge.className = 'sla-badge critical';
                slaBadge.textContent = 'Critical';
            } else if (elapsed > 480) { // 8 minutes
                row.dataset.sla = 'warning';
                slaBadge.className = 'sla-badge warning';
                slaBadge.textContent = 'Warning';
            }
        });
        
        // Update active count
        const activeCount = document.getElementById('active-count');
        const alertCount = document.getElementById('alert-count');
        if (activeCount && alertCount) {
            const critical = document.querySelectorAll('.board-row[data-sla="critical"]').length;
            const warning = document.querySelectorAll('.board-row[data-sla="warning"]').length;
            alertCount.textContent = critical + warning;
        }
    }, 1000);
    
    // Animate heatmap cells
    const heatCells = document.querySelectorAll('.heat-cell');
    setInterval(() => {
        if (!reducedMotion) {
            heatCells.forEach(cell => {
                const intensities = ['low', 'medium', 'high', 'critical'];
                const currentIntensity = cell.dataset.intensity;
                const currentIndex = intensities.indexOf(currentIntensity);
                
                // Small chance to change intensity
                if (Math.random() > 0.9) {
                    const newIndex = Math.max(0, Math.min(intensities.length - 1, currentIndex + (Math.random() > 0.5 ? 1 : -1)));
                    cell.dataset.intensity = intensities[newIndex];
                }
            });
        }
    }, 3000);
}

// Kiosk Video
function initKioskVideo() {
    const video = document.querySelector('.kiosk-video');
    if (!video) return;
    
    const kioskObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(err => console.log('Video autoplay prevented:', err));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    kioskObserver.observe(video);
}

// Form submission
document.querySelector('.cta-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    const form = e.target;
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        background: rgba(16, 185, 129, 0.2);
        border: 1px solid var(--success);
        padding: 1rem;
        border-radius: 6px;
        color: var(--success);
        text-align: center;
        margin-top: 1rem;
    `;
    successMsg.textContent = 'Thank you! We\'ll be in touch soon.';
    
    form.style.display = 'none';
    form.parentElement.appendChild(successMsg);
});

// Page Visibility API - Pause rendering when tab not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (heroAnimationId) cancelAnimationFrame(heroAnimationId);
        if (rampAnimationId) cancelAnimationFrame(rampAnimationId);
    } else {
        if (heroRenderer && !reducedMotion) animateHero();
        if (rampRenderer && !reducedMotion) animateRamp();
    }
});
