// ============================================
// Product Data
// ============================================

const products = [
    {
        id: 0,
        name: "Orchid Antioxidant Face Oil",
        category: "Skincare",
        price: 125,
        benefit: "Radiant glow & deep hydration",
        description: "Luxurious botanical oil blend with rare orchid extract for luminous skin.",
        rating: 4.8,
        tags: ["Bestseller", "Doctor Curated"],
        stock: 42,
        imageSvg: createProductSVG(0)
    },
    {
        id: 1,
        name: "Bakuchiol Smoothing Serum",
        category: "Skincare",
        price: 98,
        benefit: "Retinol alternative for sensitive skin",
        description: "Plant-based alternative to retinol that smooths and refines texture.",
        rating: 4.9,
        tags: ["Bestseller", "New"],
        stock: 38,
        imageSvg: createProductSVG(1)
    },
    {
        id: 2,
        name: "Eye Anti-Aging Cream",
        category: "Skincare",
        price: 78,
        benefit: "Reduces puffiness & dark circles",
        description: "Green tea peptide complex targets signs of aging around delicate eye area.",
        rating: 4.7,
        tags: ["Bestseller", "Clinical Grade"],
        stock: 55,
        imageSvg: createProductSVG(2)
    },
    {
        id: 3,
        name: "Hyaluronic Hydration Mist",
        category: "Skincare",
        price: 52,
        benefit: "Instant moisture boost",
        description: "Multi-molecular weight hyaluronic acid delivers hydration to all skin layers.",
        rating: 4.6,
        tags: ["New"],
        stock: 67,
        imageSvg: createProductSVG(3)
    },
    {
        id: 4,
        name: "LED Light Therapy Mask",
        category: "Devices",
        price: 425,
        benefit: "Professional-grade light therapy",
        description: "Clinical LED device with multiple wavelengths for comprehensive skin rejuvenation.",
        rating: 4.9,
        tags: ["Bestseller", "Doctor Curated"],
        stock: 15,
        imageSvg: createProductSVG(4)
    },
    {
        id: 5,
        name: "Microcurrent Facial Toning Device",
        category: "Devices",
        price: 385,
        benefit: "Lifts & sculpts facial contours",
        description: "FDA-cleared microcurrent technology for non-invasive facial toning.",
        rating: 4.8,
        tags: ["Clinical Grade"],
        stock: 22,
        imageSvg: createProductSVG(5)
    },
    {
        id: 6,
        name: "Recovery Overnight Balm",
        category: "Recovery",
        price: 88,
        benefit: "Intensive barrier repair",
        description: "Rich balm with ceramides and fatty acids restores skin overnight.",
        rating: 4.7,
        tags: ["Bestseller"],
        stock: 44,
        imageSvg: createProductSVG(6)
    },
    {
        id: 7,
        name: "Post-Procedure Soothing Gel",
        category: "Recovery",
        price: 72,
        benefit: "Calms treated skin",
        description: "Cooling gel formulated for post-treatment recovery and redness reduction.",
        rating: 4.8,
        tags: ["Doctor Curated"],
        stock: 51,
        imageSvg: createProductSVG(7)
    },
    {
        id: 8,
        name: "Complete Skincare Essentials",
        category: "Bundles",
        price: 245,
        benefit: "Full routine in one set",
        description: "Curated collection of our hero products for a complete skincare regimen.",
        rating: 4.9,
        tags: ["Bestseller", "Limited"],
        stock: 28,
        imageSvg: createProductSVG(8)
    },
    {
        id: 9,
        name: "Advanced Anti-Aging System",
        category: "Bundles",
        price: 385,
        benefit: "Comprehensive age-defying routine",
        description: "Professional-strength products targeting multiple signs of aging.",
        rating: 4.8,
        tags: ["Doctor Curated"],
        stock: 19,
        imageSvg: createProductSVG(9)
    },
    {
        id: 10,
        name: "Monthly Beauty Membership",
        category: "Membership",
        price: 95,
        benefit: "Exclusive access & savings",
        description: "Monthly delivery of curated products with 20% off all purchases.",
        rating: 4.9,
        tags: ["New"],
        stock: 999,
        imageSvg: createProductSVG(10)
    },
    {
        id: 11,
        name: "Vitamin C Brightening Complex",
        category: "Skincare",
        price: 92,
        benefit: "Evens tone & boosts radiance",
        description: "Stabilized vitamin C with ferulic acid for maximum brightening efficacy.",
        rating: 4.7,
        tags: ["Clinical Grade"],
        stock: 48,
        imageSvg: createProductSVG(11)
    },
    {
        id: 12,
        name: "Cleansing Balm",
        category: "Skincare",
        price: 48,
        benefit: "Gentle makeup removal",
        description: "Luxurious sherbet texture melts away impurities without stripping skin.",
        rating: 4.6,
        tags: [],
        stock: 73,
        imageSvg: createProductSVG(12)
    },
    {
        id: 13,
        name: "Cryotherapy Ice Roller",
        category: "Devices",
        price: 65,
        benefit: "Reduces inflammation & puffiness",
        description: "Professional-grade ice roller for depuffing and soothing sensitive skin.",
        rating: 4.5,
        tags: [],
        stock: 84,
        imageSvg: createProductSVG(13)
    },
    {
        id: 14,
        name: "Barrier Defense Moisturizer",
        category: "Recovery",
        price: 82,
        benefit: "Strengthens skin barrier",
        description: "Advanced lipid complex repairs and protects compromised skin barrier.",
        rating: 4.8,
        tags: ["New"],
        stock: 39,
        imageSvg: createProductSVG(14)
    },
    {
        id: 15,
        name: "Glow Essentials Starter Set",
        category: "Bundles",
        price: 165,
        benefit: "Perfect introduction to the line",
        description: "Travel-friendly sizes of our most-loved products for glowing skin.",
        rating: 4.7,
        tags: [],
        stock: 56,
        imageSvg: createProductSVG(15)
    }
];

function createProductSVG(id) {
    const colors = [
        ['#F3D7C7', '#E8C4B0'],
        ['#D7D2F6', '#C5BEE8'],
        ['#D7E9E1', '#C2D9CE'],
        ['#F0E7FF', '#E0D5F5'],
        ['#FFE5E0', '#FFD5CE'],
        ['#E5F2FF', '#D0E7FF']
    ];
    const colorPair = colors[id % colors.length];
    
    return `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g${id}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${encodeURIComponent(colorPair[0])};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${encodeURIComponent(colorPair[1])};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='%23FFFDF9'/%3E%3Ccircle cx='100' cy='100' r='60' fill='url(%23g${id})' opacity='0.8'/%3E%3Ccircle cx='100' cy='80' r='20' fill='rgba(255,255,255,0.9)'/%3E%3C/svg%3E`;
}

// ============================================
// State Management
// ============================================

let cart = JSON.parse(localStorage.getItem('beautyCart')) || [];
let currentFilter = 'all';
let currentSort = 'featured';
let currentCategoryTab = 'Skincare';

// ============================================
// Cart Functions
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`Added ${product.name} to cart`);
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    if (product) {
        showToast(`Removed ${product.name} from cart`);
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('beautyCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartBadge = document.querySelector('.cart-badge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.querySelector('.cart-total-amount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartBadge.textContent = totalItems;
    cartBadge.dataset.count = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.imageSvg}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__details">
                    <div class="cart-item__name">${item.name}</div>
                    <div class="cart-item__price">$${item.price}</div>
                    <div class="cart-item__quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <div class="cart-item__actions">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">×</button>
                </div>
            </div>
        `).join('');
    }
    
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function toggleCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const isHidden = cartDrawer.getAttribute('aria-hidden') === 'true';
    cartDrawer.setAttribute('aria-hidden', !isHidden);
    
    if (!isHidden) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Scroll Reveal Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function initScrollReveal() {
    document.querySelectorAll('.feature-panel, .product-card').forEach(el => {
        revealObserver.observe(el);
    });
}

// ============================================
// Bestsellers Carousel
// ============================================

function initBestsellersCarousel() {
    const carousel = document.getElementById('bestsellersCarousel');
    const progressBar = document.querySelector('.carousel-progress__bar');
    const nextBtn = document.querySelector('.carousel-control--next');
    
    const bestsellers = products.filter(p => p.tags.includes('Bestseller'));
    
    carousel.innerHTML = bestsellers.map(product => `
        <div class="carousel-card">
            <img src="${product.imageSvg}" alt="${product.name}" class="carousel-card__image">
            <div class="carousel-card__name">${product.name}</div>
            <div class="carousel-card__benefit">${product.benefit}</div>
            <div class="carousel-card__price">$${product.price}</div>
            <button class="carousel-card__cta" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
    
    const updateProgress = () => {
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        const scrollLeft = carousel.scrollLeft;
        const progress = (scrollLeft / scrollWidth) * 100;
        progressBar.style.width = `${progress}%`;
    };
    
    carousel.addEventListener('scroll', updateProgress);
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 350, behavior: 'smooth' });
    });
    
    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            carousel.scrollBy({ left: -350, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            carousel.scrollBy({ left: 350, behavior: 'smooth' });
        }
    });
}

// ============================================
// Product Grid with Filters
// ============================================

function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    let filteredProducts = products;
    
    // Apply filter
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }
    
    // Apply sort
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.imageSvg}" alt="${product.name}" class="product-card__image">
            <div class="product-card__tags">
                ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
            </div>
            <div class="product-card__name">${product.name}</div>
            <div class="product-card__benefit">${product.benefit}</div>
            <div class="product-card__footer">
                <div class="product-card__price">$${product.price}</div>
                <button class="product-card__add" onclick="addToCart(${product.id})">Add</button>
            </div>
        </div>
    `).join('');
    
    // Re-observe for scroll reveal
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(el => {
            revealObserver.observe(el);
        });
    }, 100);
}

function initProductFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const sortSelect = document.getElementById('sortSelect');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.dataset.category;
            renderProductGrid();
        });
    });
    
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProductGrid();
    });
}

// ============================================
// Floating Product Cards (Lifestyle Section)
// ============================================

function initFloatingCards() {
    const container = document.getElementById('floatingCards');
    const floatingProducts = products.slice(0, 3);
    
    container.innerHTML = floatingProducts.map(product => `
        <div class="floating-card" data-product-id="${product.id}">
            <img src="${product.imageSvg}" alt="${product.name}" class="floating-card__image">
            <div class="floating-card__name">${product.name}</div>
            <div class="floating-card__price">$${product.price}</div>
            <button class="floating-card__cta" onclick="addToCart(${product.id})">Quick Add</button>
        </div>
    `).join('');
    
    // Mouse parallax effect (disabled on touch devices and reduced motion)
    if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
        const cards = container.querySelectorAll('.floating-card');
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            cards.forEach((card, index) => {
                const intensity = (index + 1) * 5;
                card.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
            });
        });
        
        container.addEventListener('mouseleave', () => {
            cards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
}

// ============================================
// Category Slider with Tabs
// ============================================

function initCategorySlider() {
    const segments = document.querySelectorAll('.segment');
    const carousel = document.getElementById('categoryCarousel');
    const prevBtn = document.querySelector('.category-nav--prev');
    const nextBtn = document.querySelector('.category-nav--next');
    const dotsContainer = document.getElementById('paginationDots');
    
    let currentSlideIndex = 0;
    
    function renderCategorySlides(category) {
        const categoryProducts = products.filter(p => p.category === category);
        
        carousel.innerHTML = categoryProducts.map((product, index) => `
            <div class="category-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${product.imageSvg}" alt="${product.name}" class="category-slide__image">
                <div class="category-slide__content">
                    <div class="category-slide__title">${product.name}</div>
                    <div class="category-slide__description">${product.description}</div>
                </div>
            </div>
        `).join('');
        
        // Create pagination dots
        dotsContainer.innerHTML = categoryProducts.map((_, index) => 
            `<button class="pagination-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`
        ).join('');
        
        currentSlideIndex = 0;
        updateActiveSlide();
    }
    
    function updateActiveSlide() {
        const slides = carousel.querySelectorAll('.category-slide');
        const dots = dotsContainer.querySelectorAll('.pagination-dot');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlideIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
        
        const slideWidth = slides[0]?.offsetWidth + 24 || 304;
        carousel.scrollTo({
            left: currentSlideIndex * slideWidth,
            behavior: 'smooth'
        });
    }
    
    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            segments.forEach(s => s.setAttribute('aria-selected', 'false'));
            segment.setAttribute('aria-selected', 'true');
            currentCategoryTab = segment.dataset.category;
            renderCategorySlides(currentCategoryTab);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        const slides = carousel.querySelectorAll('.category-slide');
        currentSlideIndex = Math.max(0, currentSlideIndex - 1);
        updateActiveSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        const slides = carousel.querySelectorAll('.category-slide');
        currentSlideIndex = Math.min(slides.length - 1, currentSlideIndex + 1);
        updateActiveSlide();
    });
    
    // Dot navigation
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-dot')) {
            currentSlideIndex = parseInt(e.target.dataset.index);
            updateActiveSlide();
        }
    });
    
    // Initialize with first category
    renderCategorySlides(currentCategoryTab);
}

// ============================================
// Face Hotspots
// ============================================

function initFaceHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infos = document.querySelectorAll('.hotspot-info');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const target = hotspot.dataset.hotspot;
            const infoCard = document.getElementById(`hotspot${target.charAt(0).toUpperCase() + target.slice(1)}`);
            
            // Close all other hotspots
            hotspots.forEach(h => h.classList.remove('active'));
            infos.forEach(info => info.setAttribute('hidden', ''));
            
            // Toggle current
            const isActive = !infoCard.hasAttribute('hidden');
            
            if (isActive) {
                hotspot.classList.remove('active');
                infoCard.setAttribute('hidden', '');
            } else {
                hotspot.classList.add('active');
                infoCard.removeAttribute('hidden');
            }
        });
    });
    
    // Close buttons
    document.querySelectorAll('.hotspot-close').forEach(btn => {
        btn.addEventListener('click', () => {
            hotspots.forEach(h => h.classList.remove('active'));
            infos.forEach(info => info.setAttribute('hidden', ''));
        });
    });
}

// ============================================
// Newsletter Form
// ============================================

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        
        showToast('Thank you for subscribing!');
        form.reset();
    });
}

// ============================================
// Header Scroll Behavior
// ============================================

function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.65)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    updateCartUI();
    initScrollReveal();
    initBestsellersCarousel();
    renderProductGrid();
    initProductFilters();
    initFloatingCards();
    initCategorySlider();
    initFaceHotspots();
    initNewsletterForm();
    initHeaderScroll();
    
    // Cart trigger
    document.querySelector('.cart-trigger').addEventListener('click', toggleCart);
    document.querySelector('.cart-close').addEventListener('click', toggleCart);
    document.querySelector('.cart-overlay').addEventListener('click', toggleCart);

    // Cart checkout → navigate to shopping-cart.html
    document.querySelector('.cart-checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty');
            return;
        }
        window.location.href = 'shopping-cart.html';
    });
    
    // ESC to close cart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartDrawer = document.getElementById('cartDrawer');
            if (cartDrawer.getAttribute('aria-hidden') === 'false') {
                toggleCart();
            }
        }
    });
    
    // Feature panel CTAs
    document.querySelectorAll('.feature-panel__cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Video error handling
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', () => {
            console.log('Video failed to load, using fallback');
        });
    });
});

// ============================================
// Expose functions to global scope for inline handlers
// ============================================

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
