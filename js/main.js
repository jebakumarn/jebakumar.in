// Lab Authentication System
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const labContent = document.getElementById('lab-content');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
  
    // Check if user is already logged in
    checkAuthStatus();
  
    // Switch between login and register forms
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginSection.classList.add('d-none');
      registerSection.classList.remove('d-none');
    });
  
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      registerSection.classList.add('d-none');
      loginSection.classList.remove('d-none');
    });
  
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Simple user validation (replace with server-side validation in production)
      const users = JSON.parse(localStorage.getItem('lab_users')) || [];
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        // Set session
        sessionStorage.setItem('lab_current_user', JSON.stringify({
          username: user.username,
          email: user.email,
          loggedIn: true
        }));
        
        // Show lab content
        showLabContent();
        loginForm.reset();
        loginError.classList.add('d-none');
      } else {
        loginError.classList.remove('d-none');
      }
    });
  
    // Handle register form submission
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-username').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;
  
      // Simple validation
      if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match";
        registerError.classList.remove('d-none');
        return;
      }
  
      // Check if username already exists
      const users = JSON.parse(localStorage.getItem('lab_users')) || [];
      if (users.some(u => u.username === username)) {
        registerError.textContent = "Username already exists";
        registerError.classList.remove('d-none');
        return;
      }
  
      // Add new user
      users.push({
        username,
        email,
        password, // In a real application, hash passwords before storing
        registeredAt: new Date().toISOString()
      });
  
      // Save to localStorage
      localStorage.setItem('lab_users', JSON.stringify(users));
  
      // Auto-login after registration
      sessionStorage.setItem('lab_current_user', JSON.stringify({
        username,
        email,
        loggedIn: true
      }));
  
      // Show lab content
      showLabContent();
      registerForm.reset();
      registerError.classList.add('d-none');
    });
  
    // Handle logout
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('lab_current_user');
      loginSection.classList.remove('d-none');
      labContent.classList.add('d-none');
    });
  
    // Check authentication status
    function checkAuthStatus() {
      const currentUser = JSON.parse(sessionStorage.getItem('lab_current_user'));
      if (currentUser && currentUser.loggedIn) {
        showLabContent();
      }
    }
  
    // Show lab content after successful authentication
    function showLabContent() {
      loginSection.classList.add('d-none');
      registerSection.classList.add('d-none');
      labContent.classList.remove('d-none');
    }
  });

  // Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
  
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      // For now, we'll simulate a successful submission
      
      // Store message in localStorage for demonstration purposes
      const messages = JSON.parse(localStorage.getItem('contact_messages')) || [];
      messages.push({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contact_messages', JSON.stringify(messages));
      
      // Show success message
      contactSuccess.classList.remove('d-none');
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        contactSuccess.classList.add('d-none');
      }, 5000);
    });
  });
  
  // Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    // Filter portfolio items based on category
    function filterPortfolio(category) {
      portfolioItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = 0;
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    }
  
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get filter category
        const category = button.getAttribute('data-filter');
        // Filter portfolio items
        filterPortfolio(category);
      });
    });
  
    // Animate skill bars on scroll
    const skillSection = document.querySelector('.about-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;
  
    function animateSkills() {
      if (animated) return;
      
      const sectionPos = skillSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;
      
      if (sectionPos < screenPos) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
        animated = true;
      }
    }
  
    // Check on scroll
    window.addEventListener('scroll', animateSkills);
    // Check on load
    animateSkills();
  });