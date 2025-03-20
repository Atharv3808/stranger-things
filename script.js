// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add data-text attribute to all glitch-hover elements
    const glitchElements = document.querySelectorAll('.glitch-hover');
    glitchElements.forEach(element => {
      if (element.textContent) {
        element.setAttribute('data-text', element.textContent);
      }
    });
  
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
      
      // Close mobile nav when clicking on a link
      const navItems = navLinks.querySelectorAll('a');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          navLinks.classList.remove('active');
          document.body.classList.remove('nav-open');
        });
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button and pane
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      const eventDate = new Date('April 3, 2025 00:00:00').getTime();
      
      // Update the countdown every second
      const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
          clearInterval(countdownTimer);
          document.getElementById('countdown').innerHTML = '<div class="gate-open">THE GATE IS OPEN</div>';
        }
      }, 1000);
    }
    
    // Form Submission
    const registrationForm = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelectorAll('.close-modal, .close-btn');
    
    if (registrationForm) {
      registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        let isValid = true;
        const requiredFields = registrationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--neon-red)';
          } else {
            field.style.borderColor = '';
          }
        });
        
        // Check if at least one event is selected
        const eventCheckboxes = registrationForm.querySelectorAll('input[name="events"]');
        let eventSelected = false;
        
        eventCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            eventSelected = true;
          }
        });
        
        if (!eventSelected) {
          isValid = false;
          document.querySelector('.checkbox-group').style.borderColor = 'var(--neon-red)';
        } else {
          document.querySelector('.checkbox-group').style.borderColor = '';
        }
        
        // If form is valid, show success modal
        if (isValid) {
          successModal.style.display = 'flex';
          registrationForm.reset();
        }
      });
    }
    
    // Close modal
    if (closeModal) {
      closeModal.forEach(btn => {
        btn.addEventListener('click', function() {
          successModal.style.display = 'none';
        });
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === successModal) {
        successModal.style.display = 'none';
      }
    });
  
    // Floating particles animation
    createFloatingParticles();
    
    // Add VHS tracking lines effect
    createVHSEffect();
    
    // Create flickering lights effect
    createFlickeringLights();
    
    // Create TV static effect for footer
    createTVStatic();
    
    // Create Christmas Lights
    createChristmasLights();
    
    // Create Alphabet Wall Lights
    createAlphabetWallEffect();
    
    // Create Upside Down Vines
    createUpsideDownVines();
    
    // Create Gate Portal Particles
    createGateParticles();
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Parallax for hero section
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
      
      // Fade in elements on scroll
      const fadeElements = document.querySelectorAll('.section-header, .about-content, .events-grid, .schedule-tabs, .upside-down-content, .contact-content, .sponsors-grid');
      fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('fade-in');
        }
      });
    });
  });
  
  // Create Christmas Lights
  function createChristmasLights() {
    const lightsContainer = document.querySelector('.lights-container');
    if (!lightsContainer) return;
    
    const lightCount = Math.floor(window.innerWidth / 30);
    
    for (let i = 0; i < lightCount; i++) {
      const light = document.createElement('div');
      const colorIndex = i % 6 + 1;
      const delay = Math.random() * 5;
      
      light.classList.add('christmas-light');
      light.style.cssText = `
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: var(--christmas-light-${colorIndex});
        left: ${(i / lightCount) * 100}%;
        top: 15px;
        box-shadow: 0 0 10px var(--christmas-light-${colorIndex});
        animation: lightFlicker 2s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;
      
      lightsContainer.appendChild(light);
    }
  }
  
  // Create Alphabet Wall Effect
  function createAlphabetWallEffect() {
    const alphabetLetters = document.querySelectorAll('.alphabet-letters span');
    if (alphabetLetters.length === 0) return;
    
    // Randomly flicker some letters
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * alphabetLetters.length);
      const letter = alphabetLetters[randomIndex];
      
      letter.classList.add('letter-active');
      
      setTimeout(() => {
        letter.classList.remove('letter-active');
      }, 500);
    }, 2000);
    
    // Add CSS for letter-active class
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .letter-active {
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.8) !important;
          background-color: #ff0000 !important;
          color: #fff !important;
        }
      </style>
    `);
  }
  
  // Create Upside Down Vines
  function createUpsideDownVines() {
    const vinesContainer = document.querySelector('.upside-down-vines-animated');
    if (!vinesContainer) return;
    
    const vineCount = 10;
    
    for (let i = 0; i < vineCount; i++) {
      const vine = document.createElement('div');
      const posX = Math.random() * 100;
      const height = Math.random() * 200 + 100;
      const delay = Math.random() * 5;
      
      vine.classList.add('vine');
      vine.style.cssText = `
        position: absolute;
        width: 2px;
        height: ${height}px;
        background-color: rgba(100, 0, 0, 0.3);
        left: ${posX}%;
        top: -50px;
        transform-origin: top center;
        animation: vineGrow 20s ease-in-out infinite;
        animation-delay: -${delay}s;
      `;
      
      // Add vine particles
      for (let j = 0; j < 5; j++) {
        const particle = document.createElement('div');
        const particleSize = Math.random() * 10 + 5;
        const particlePos = Math.random() * 100;
        
        particle.style.cssText = `
          position: absolute;
          width: ${particleSize}px;
          height: ${particleSize}px;
          background-color: rgba(100, 0, 0, 0.2);
          border-radius: 50%;
          left: 0;
          top: ${particlePos}%;
          transform: translateX(-50%);
        `;
        
        vine.appendChild(particle);
      }
      
      vinesContainer.appendChild(vine);
    }
    
    // Add CSS for vine animation
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes vineGrow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(50px) rotate(5deg); }
        }
      </style>
    `);
  }
  
  // Create floating particles in the background
  function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position, size and animation delay
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        box-shadow: 0 0 ${size * 2}px rgba(255, 0, 0, 0.7);
        animation: float 20s ease-in-out infinite;
        animation-delay: -${delay}s;
      `;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Create VHS tracking lines effect
  function createVHSEffect() {
    const vhsEffect = document.querySelector('.vhs-effect');
    if (!vhsEffect) return;
    
    const lineCount = 10;
    
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      const posY = (i / lineCount) * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 2 + 1;
      
      line.style.cssText = `
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.1);
        top: ${posY}%;
        animation: vhsLine ${duration}s ease-in-out infinite;
        animation-delay: -${delay}s;
      `;
      
      vhsEffect.appendChild(line);
    }
  }
  
  // Create flickering lights effect
  function createFlickeringLights() {
    const lights = document.querySelector('.flickering-lights');
    if (!lights) return;
    
    const lightCount = 5;
    
    for (let i = 0; i < lightCount; i++) {
      const light = document.createElement('div');
      const size = Math.random() * 30 + 10;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      
      light.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%);
        top: ${posY}%;
        left: ${posX}%;
        border-radius: 50%;
        animation: flicker ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: -${delay}s;
      `;
      
      lights.appendChild(light);
    }
  }
  
  // Create TV static effect for footer
  function createTVStatic() {
    const staticOverlay = document.querySelector('.static-overlay');
    if (!staticOverlay) return;
    
    const staticCount = 500;
    
    for (let i = 0; i < staticCount; i++) {
      const staticDot = document.createElement('div');
      const size = Math.random() * 2 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      staticDot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        top: ${posY}%;
        left: ${posX}%;
      `;
      
      staticOverlay.appendChild(staticDot);
    }
  }
  
  // Create Gate Portal Particles
  function createGateParticles() {
    const gateParticles = document.querySelector('.gate-particles');
    if (!gateParticles) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 5 + 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        box-shadow: 0 0 ${size * 2}px rgba(255, 0, 0, 0.7);
        animation: gateParticleFloat ${duration}s ease-in-out infinite;
        animation-delay: -${delay}s;
      `;
      
      gateParticles.appendChild(particle);
    }
    
    // Add CSS for gate particle animation
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes gateParticleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-10px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes lightFlicker {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px currentColor; }
          50% { opacity: 0.5; box-shadow: 0 0 5px currentColor; }
        }
      </style>
    `);
  }
  
  // Add chromatic aberration effect to glitch-hover elements
  document.querySelectorAll('.glitch-hover').forEach(element => {
    element.addEventListener('mouseover', function() {
      this.style.textShadow = '2px 0 var(--neon-red), -2px 0 var(--neon-blue)';
    });
    
    element.addEventListener('mouseout', function() {
      this.style.textShadow = 'none';
    });
  });
  
  // Add interactive effects to event cards
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseover', function() {
      this.querySelector('.card-inner').style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.7)';
    });
    
    card.addEventListener('mouseout', function() {
      this.querySelector('.card-inner').style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.3)';
    });
  });
  
  // Add glitch effect on click for main title
  const mainTitle = document.querySelector('.main-title');
  if (mainTitle) {
    mainTitle.addEventListener('click', function() {
      this.classList.add('glitch-active');
      setTimeout(() => {
        this.classList.remove('glitch-active');
      }, 1000);
    });
  }
  
  // Add CSS class for fade-in animation
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .fade-in {
        animation: fadeIn 1s ease-out forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes vhsLine {
        0%, 100% { transform: translateY(0); opacity: 0.1; }
        50% { transform: translateY(10px); opacity: 0.3; }
      }
      
      .glitch-active {
        animation: activeGlitch 1s linear;
      }
      
      @keyframes activeGlitch {
        0% { transform: translate(0); }
        20% { transform: translate(-10px, 5px); }
        40% { transform: translate(10px, -5px); }
        60% { transform: translate(-5px, 2px); }
        80% { transform: translate(5px, -2px); }
        100% { transform: translate(0); }
      }
    </style>
  `);