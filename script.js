// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initProductFilters();
    initForms();
    initMobileMenu();
    initScrollToTop();
});

// Navigation Active State
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// Product Filtering Functionality
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const category = this.dataset.category;
                productCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Form Handling
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form validation
            if (validateForm(this)) {
                // Simulate form submission
                showAlert('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
            }
        });
    }

    // Buyer Signup Form
    const buyerSignupForm = document.getElementById('buyerSignup');
    if (buyerSignupForm) {
        buyerSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showAlert('Buyer account created successfully!', 'success');
                this.reset();
            }
        });
    }

    // Buyer Login Form
    const buyerLoginForm = document.getElementById('buyerLogin');
    if (buyerLoginForm) {
        buyerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showAlert('Logged in successfully as buyer!', 'success');
                this.reset();
            }
        });
    }

    // Supplier Signup Form
    const supplierSignupForm = document.getElementById('supplierSignup');
    if (supplierSignupForm) {
        supplierSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showAlert('Supplier application submitted successfully!', 'success');
                this.reset();
            }
        });
    }

    // Supplier Login Form
    const supplierLoginForm = document.getElementById('supplierLogin');
    if (supplierLoginForm) {
        supplierLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showAlert('Logged in successfully as supplier!', 'success');
                this.reset();
            }
        });
    }
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            const errorMsg = input.nextElementSibling?.classList.contains('error-message') 
                ? input.nextElementSibling 
                : document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            input.after(errorMsg);
        } else {
            input.classList.remove('error');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
            
            // Email validation
            if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
                const errorMsg = input.nextElementSibling || document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email';
                input.after(errorMsg);
            }
            
            // Password validation (min 6 chars)
            if (input.type === 'password' && input.value.length < 6) {
                isValid = false;
                input.classList.add('error');
                const errorMsg = input.nextElementSibling || document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Password must be at least 6 characters';
                input.after(errorMsg);
            }
        }
    });
    
    return isValid;
}

// Email Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Alert Notification
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 500);
    }, 3000);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    const header = document.querySelector('header');
    if (header) {
        header.insertBefore(menuToggle, header.firstChild);
        
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add to Cart Functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        showAlert(`${productName} added to cart (${productPrice})`, 'success');
    }
});
