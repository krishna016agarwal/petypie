// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    }
    
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Authentication Modal
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');

function createAuthModal(type) {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form class="auth-form">
                ${type === 'signup' ? '<input type="text" placeholder="Full Name" required>' : ''}
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                ${type === 'signup' ? '<input type="password" placeholder="Confirm Password" required>' : ''}
                <button type="submit">${type === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Style the modal
    const style = document.createElement('style');
    style.textContent = `
        .auth-modal {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1001;
        }

        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 15px;
            width: 90%;
            max-width: 400px;
            position: relative;
        }

        .close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
        }

        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }

        .auth-form input {
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .auth-form button {
            padding: 0.8rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }

        .auth-form button:hover {
            background-color: #ff5252;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Form submission
    const form = modal.querySelector('form');
    form.onsubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here
        console.log(`${type} form submitted`);
        modal.remove();
    };
}

loginBtn.addEventListener('click', () => createAuthModal('login'));
signupBtn.addEventListener('click', () => createAuthModal('signup'));

// Intersection Observer for animations
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

// Observe all feature and service cards
document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            const originalText = this.textContent;
            this.classList.add('loading');
            this.innerHTML = '<span class="spinner"></span>';
            
            // Simulate loading state (remove in production)
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
            }, 1000);
        }
    });
});

// Add spinner styles
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Shop Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        button.innerHTML = 'Added to Cart!';
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
        }, 2000);
        
        // You can implement cart functionality here
    });
});

// Health Records Functionality
const addPetBtn = document.querySelector('.add-pet-btn');
if (addPetBtn) {
    addPetBtn.addEventListener('click', () => {
        // Create modal for adding new pet
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Add New Pet</h2>
                <form id="add-pet-form">
                    <input type="text" placeholder="Pet Name" required>
                    <select required>
                        <option value="">Select Pet Type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="number" placeholder="Age" required>
                    <input type="text" placeholder="Breed">
                    <button type="submit">Add Pet</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add pet logic here
            modal.remove();
        });
    });
}

// Community Features
const likeButtons = document.querySelectorAll('.post-actions button');
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        if (button.querySelector('i').classList.contains('fa-heart')) {
            const likeCount = parseInt(button.getAttribute('data-likes') || '0');
            button.setAttribute('data-likes', button.classList.contains('active') ? likeCount + 1 : likeCount - 1);
        }
    });
});

// RSVP Functionality
const rsvpButtons = document.querySelectorAll('.rsvp-btn');
rsvpButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('rsvp-confirmed')) {
            button.textContent = 'RSVP Now';
            button.classList.remove('rsvp-confirmed');
        } else {
            button.textContent = 'RSVP Confirmed!';
            button.classList.add('rsvp-confirmed');
        }
    });
});

// Add more pet photos dynamically
function addMorePetPhotos() {
    const gallery = document.querySelector('.gallery-grid');
    const petTypes = ['dogs', 'cats', 'rabbits'];
    const totalPhotos = 46; // We'll add 46 more photos to reach 50 total

    for (let i = 0; i < totalPhotos; i++) {
        const type = petTypes[Math.floor(Math.random() * petTypes.length)];
        const photoId = i + 5; // Start from 5 since we already have 4 photos
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', type);
        
        const img = document.createElement('img');
        if (type === 'dogs') {
            img.src = `https://placedog.net/500/400?id=${photoId}`;
        } else if (type === 'cats') {
            img.src = `https://placekitten.com/500/400?image=${photoId % 16}`; // Placekitten has 16 images
        } else {
            // For rabbits, we'll use a placeholder
            img.src = `https://via.placeholder.com/500x400?text=Cute+Rabbit+${photoId}`;
        }
        img.alt = `${type.slice(0, -1)} ${photoId}`;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    }
}

// Call the function to add more pet photos when the page loads
window.addEventListener('load', addMorePetPhotos);
