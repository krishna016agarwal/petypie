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

// Health Assistant Functionality
class HealthAssistant {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.concernType = document.getElementById('concern-type');
        this.healthQuery = document.getElementById('health-query');
        this.sendButton = document.getElementById('send-query');
        this.emergencyBtn = document.querySelector('.emergency-btn');
        this.scheduleBtn = document.querySelector('.schedule-btn');
        this.reminderBtn = document.querySelector('.reminder-btn');

        this.initializeEventListeners();
        this.displayWelcomeMessage();
    }

    initializeEventListeners() {
        this.sendButton?.addEventListener('click', () => this.handleQuery());
        this.emergencyBtn?.addEventListener('click', () => this.showEmergencyContacts());
        this.scheduleBtn?.addEventListener('click', () => this.scheduleVetVisit());
        this.reminderBtn?.addEventListener('click', () => this.setMedicineReminder());
    }

    displayWelcomeMessage() {
        if (this.chatMessages) {
            const welcomeMessage = `
                <div class="message assistant-message">
                    <p>👋 Hello! I'm your Pet Health Assistant. How can I help you today?</p>
                    <p>You can ask me about:</p>
                    <ul>
                        <li>Pet illness symptoms</li>
                        <li>Pregnancy care advice</li>
                        <li>Emergency situations</li>
                        <li>Nutrition guidance</li>
                        <li>Vaccination schedules</li>
                    </ul>
                </div>
            `;
            this.chatMessages.innerHTML = welcomeMessage;
        }
    }

    handleQuery() {
        const concern = this.concernType?.value;
        const query = this.healthQuery?.value;

        if (!concern || !query) {
            this.addMessage('Please select a concern type and enter your query.', 'assistant');
            return;
        }

        // Add user's message to chat
        this.addMessage(query, 'user');

        // Process the query based on concern type
        const response = this.generateResponse(concern, query);
        this.addMessage(response, 'assistant');

        // Clear input
        this.healthQuery.value = '';
    }

    addMessage(text, type) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = text;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    generateResponse(concern, query) {
        const responses = {
            illness: this.getIllnessResponse(query),
            pregnancy: this.getPregnancyResponse(query),
            emergency: this.getEmergencyResponse(query),
            nutrition: this.getNutritionResponse(query),
            vaccination: this.getVaccinationResponse(query)
        };

        return responses[concern] || 'I apologize, but I cannot process this type of concern at the moment.';
    }

    getIllnessResponse(query) {
        const symptoms = query.toLowerCase();
        if (symptoms.includes('vomit')) {
            return 'If your pet is vomiting:<br>1. Withhold food for 12-24 hours<br>2. Provide small amounts of water<br>3. If vomiting persists for more than 24 hours, contact your vet immediately.';
        } else if (symptoms.includes('diarrhea')) {
            return 'For diarrhea:<br>1. Ensure plenty of fresh water<br>2. Consider a bland diet (rice and boiled chicken)<br>3. Monitor for 24 hours<br>4. If symptoms persist or worsen, consult your vet.';
        }
        return 'Based on the symptoms described, it would be best to consult with a veterinarian for a proper diagnosis. Would you like me to help you schedule an appointment?';
    }

    getPregnancyResponse(query) {
        return `Pregnancy care tips:<br>
        1. Ensure a balanced diet with proper nutrients<br>
        2. Provide a quiet and comfortable space<br>
        3. Regular gentle exercise is important<br>
        4. Schedule regular vet check-ups<br>
        5. Monitor for any unusual symptoms<br><br>
        Would you like to schedule a vet appointment for a pregnancy check-up?`;
    }

    getEmergencyResponse(query) {
        return `This sounds like it requires immediate attention. Please:<br>
        1. Stay calm<br>
        2. Contact your nearest emergency vet clinic<br>
        3. While waiting:<br>
           - Keep your pet warm and comfortable<br>
           - Don't give any medication without vet approval<br>
           - Prepare for transport<br><br>
        Click the Emergency Vet Contacts button for immediate help.`;
    }

    getNutritionResponse(query) {
        return `Nutrition recommendations:<br>
        1. Maintain a balanced diet appropriate for your pet's age and size<br>
        2. Ensure fresh water is always available<br>
        3. Avoid toxic human foods<br>
        4. Consider supplements if recommended by your vet<br><br>
        Would you like specific dietary recommendations for your pet?`;
    }

    getVaccinationResponse(query) {
        return `Vaccination guidelines:<br>
        1. Core vaccines are essential for all pets<br>
        2. Schedule depends on age and previous vaccination history<br>
        3. Regular boosters are important<br>
        4. Keep vaccination records updated<br><br>
        Would you like to schedule a vaccination appointment?`;
    }

    showEmergencyContacts() {
        const emergencyInfo = `
            <div class="message assistant-message emergency-info">
                <h3>🚨 Emergency Veterinary Contacts:</h3>
                <p><strong>24/7 Emergency Vet Hospital:</strong><br>
                   Phone: (555) 123-4567<br>
                   Address: 123 Pet Care Lane</p>
                <p><strong>Animal Poison Control:</strong><br>
                   Phone: (888) 426-4435</p>
                <p><strong>Mobile Vet Service:</strong><br>
                   Phone: (555) 987-6543</p>
            </div>
        `;
        this.addMessage(emergencyInfo, 'assistant');
    }

    scheduleVetVisit() {
        const scheduleForm = `
            <div class="message assistant-message">
                <h3>Schedule a Vet Visit</h3>
                <p>Please provide your preferred date and time, and we'll contact you to confirm the appointment.</p>
                <form id="vet-schedule-form">
                    <input type="date" id="appointment-date" min="${new Date().toISOString().split('T')[0]}" required>
                    <select id="appointment-time" required>
                        <option value="">Select Time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (1PM - 5PM)</option>
                        <option value="evening">Evening (6PM - 8PM)</option>
                    </select>
                    <button type="submit" class="primary-btn">Request Appointment</button>
                </form>
            </div>
        `;
        this.addMessage(scheduleForm, 'assistant');
    }

    setMedicineReminder() {
        const reminderForm = `
            <div class="message assistant-message">
                <h3>Set Medicine Reminder</h3>
                <p>Enter medicine details to set up reminders:</p>
                <form id="medicine-reminder-form">
                    <input type="text" placeholder="Medicine Name" required>
                    <input type="text" placeholder="Dosage" required>
                    <select required>
                        <option value="">Frequency</option>
                        <option value="daily">Daily</option>
                        <option value="twice">Twice Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    <button type="submit" class="primary-btn">Set Reminder</button>
                </form>
            </div>
        `;
        this.addMessage(reminderForm, 'assistant');
    }
}

// Initialize Health Assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('health.html')) {
        new HealthAssistant();
    }
});

const posts = [
    {
        username: 'Sarah & Max',
        image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        caption: 'Happy day at the park! 🐕',
        likes: 45,
        comments: 12
    },
    {
        username: 'Tom & Whiskers',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        caption: 'Lazy Sunday with my cat 😺',
        likes: 38,
        comments: 8
    },
    {
        username: 'Lisa & Rocky',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
        caption: 'Beach day adventures! 🌊',
        likes: 62,
        comments: 15
    }
];
