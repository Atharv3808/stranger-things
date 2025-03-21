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

  // Enhanced Smooth scrolling for anchor links with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Create a smoother scroll with custom easing
        smoothScrollTo(targetElement.offsetTop - 100, 1000);
      }
    });
  });

  // Custom smooth scroll function with easing
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();
    
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    
    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      window.scrollTo(0, startY + difference * easedProgress);
      
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    }
    
    requestAnimationFrame(step);
  }

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

  // Create all visual effects
  createFloatingParticles();
  createVHSEffect();
  createFlickeringLights();
  createTVStatic();
  createChristmasLights();
  createAlphabetWallEffect();
  createUpsideDownVines();
  createGateParticles();
  
  // Initialize scroll-based animations
  initScrollAnimations();
  
  // Add scroll-triggered animations to sections
  addScrollTriggeredAnimations();
});

// Initialize enhanced scroll animations
function initScrollAnimations() {
  // Create scroll observer for parallax and reveal effects
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        // Only remove the class if we want elements to animate again when scrolling back up
        // entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });
  
  // Observe all sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
    section.classList.add('scroll-animate');
  });
  
  // Add scroll-triggered animation styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .scroll-animate {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.17, 0.67, 0.45, 0.99);
      }
      
      .scroll-animate.in-view {
        opacity: 1;
        transform: translateY(0);
      }
      
      .stagger-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.17, 0.67, 0.45, 0.99);
      }
      
      .in-view .stagger-item {
        opacity: 1;
        transform: translateY(0);
      }
      
      .in-view .stagger-item:nth-child(1) { transition-delay: 0.1s; }
      .in-view .stagger-item:nth-child(2) { transition-delay: 0.2s; }
      .in-view .stagger-item:nth-child(3) { transition-delay: 0.3s; }
      .in-view .stagger-item:nth-child(4) { transition-delay: 0.4s; }
      .in-view .stagger-item:nth-child(5) { transition-delay: 0.5s; }
      .in-view .stagger-item:nth-child(6) { transition-delay: 0.6s; }
      
      .parallax-bg {
        transition: transform 0.1s cubic-bezier(0.17, 0.67, 0.45, 0.99);
      }
    </style>
  `);
  
  // Enhanced parallax scrolling effect
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Parallax for hero section with smoother animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
    
    // Parallax for upside down overlay
    const upsideDownOverlay = document.querySelector('.upside-down-overlay');
    if (upsideDownOverlay) {
      upsideDownOverlay.style.transform = `translateY(${scrollPosition * -0.1}px)`;
    }
    
    // Parallax for demogorgon silhouette
    const demogorgonSilhouette = document.querySelector('.demogorgon-silhouette');
    if (demogorgonSilhouette) {
      demogorgonSilhouette.style.transform = `translateY(${scrollPosition * 0.05}px) scaleX(-1)`;
    }
    
    // Parallax for hero demogorgon
    const heroDemogorgon = document.querySelector('.hero-demogorgon');
    if (heroDemogorgon) {
      heroDemogorgon.style.transform = `translateY(${scrollPosition * -0.15}px) rotate(${scrollPosition * 0.01}deg)`;
    }
    
    // Parallax for alphabet wall
    const alphabetWall = document.querySelector('.alphabet-wall');
    if (alphabetWall) {
      const alphabetOffset = alphabetWall.offsetTop;
      const alphabetParallax = (scrollPosition - alphabetOffset) * 0.1;
      if (scrollPosition > alphabetOffset - window.innerHeight && scrollPosition < alphabetOffset + alphabetWall.offsetHeight) {
        alphabetWall.style.backgroundPosition = `center ${alphabetParallax}px`;
      }
    }
    
    // Parallax for upside down vines
    const vines = document.querySelectorAll('.vine');
    vines.forEach((vine, index) => {
      const speed = 0.05 + (index % 3) * 0.02;
      vine.style.transform = `translateY(${scrollPosition * speed}px) rotate(${scrollPosition * 0.005 * (index % 2 ? 1 : -1)}deg)`;
    });
    
    // Parallax for gate portal
    const gatePortal = document.querySelector('.gate-portal');
    if (gatePortal) {
      const gateOffset = gatePortal.getBoundingClientRect().top + scrollPosition;
      const distanceFromGate = scrollPosition - gateOffset + window.innerHeight / 2;
      if (distanceFromGate > 0) {
        const scale = 1 + Math.min(distanceFromGate * 0.0005, 0.2);
        gatePortal.style.transform = `scale(${scale})`;
      }
    }
    
    // Rotate cassette tape reels based on scroll
    const reels = document.querySelectorAll('.reel');
    reels.forEach((reel, index) => {
      const direction = index % 2 ? 1 : -1;
      reel.style.transform = `rotate(${scrollPosition * 0.2 * direction}deg)`;
    });
    
    // Apply glitch effect to main title based on scroll
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle && scrollPosition > 100) {
      const glitchIntensity = Math.min(scrollPosition * 0.001, 0.5);
      mainTitle.style.textShadow = `
        ${Math.sin(scrollPosition * 0.01) * 5 * glitchIntensity}px 0 var(--neon-red),
        ${Math.cos(scrollPosition * 0.01) * 5 * glitchIntensity}px 0 var(--neon-blue)
      `;
    } else if (mainTitle) {
      mainTitle.style.textShadow = '';
    }
  }, { passive: true });
}

// Add scroll-triggered animations to specific elements
function addScrollTriggeredAnimations() {
  // Add stagger animation to event cards
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach(card => {
    card.classList.add('stagger-item');
  });
  
  // Add stagger animation to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.classList.add('stagger-item');
  });
  
  // Add stagger animation to experiment cards
  const experimentCards = document.querySelectorAll('.experiment-card');
  experimentCards.forEach(card => {
    card.classList.add('stagger-item');
  });
  
  // Add stagger animation to contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.classList.add('stagger-item');
  });
  
  // Add stagger animation to sponsor logos
  const sponsorLogos = document.querySelectorAll('.sponsor-logo');
  sponsorLogos.forEach(logo => {
    logo.classList.add('stagger-item');
  });
  
  // Add parallax backgrounds
  document.querySelectorAll('.upside-down-particles, .floating-particles, .static-overlay').forEach(bg => {
    bg.classList.add('parallax-bg');
  });
  
  // Add scroll-triggered animation for alphabet letters
  const alphabetLetters = document.querySelectorAll('.alphabet-letters span');
  alphabetLetters.forEach((letter, index) => {
    letter.style.transitionDelay = `${index * 0.05}s`;
    letter.classList.add('stagger-item');
  });
  
  // Add scroll-triggered animation for Christmas lights
  const christmasLights = document.querySelectorAll('.christmas-light');
  christmasLights.forEach((light, index) => {
    light.style.transitionDelay = `${index * 0.02}s`;
    light.classList.add('stagger-item');
  });
  
  // Add scroll-triggered reveal for lab door
  const labDoor = document.querySelector('.lab-door');
  if (labDoor) {
    labDoor.classList.add('stagger-item');
    
    // Create a hover effect for the lab door
    labDoor.addEventListener('mouseenter', () => {
      labDoor.classList.add('door-hover');
    });
    
    labDoor.addEventListener('mouseleave', () => {
      labDoor.classList.remove('door-hover');
    });
    
    // Add door hover animation
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .door-hover {
          transform: scale(1.05) !important;
          box-shadow: 0 0 30px rgba(255, 0, 0, 0.7) !important;
          transition: all 0.3s ease-out !important;
        }
      </style>
    `);
  }
  
  // Add scroll-triggered animation for countdown timer
  const countdownItems = document.querySelectorAll('.countdown-item');
  countdownItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    item.classList.add('stagger-item');
  });
  
  // Add scroll-triggered animation for section headers
  document.querySelectorAll('.section-header').forEach(header => {
    const title = header.querySelector('.section-title');
    const line = header.querySelector('.section-line');
    
    if (title) title.classList.add('stagger-item');
    if (line) {
      line.classList.add('stagger-item');
      line.style.transitionDelay = '0.2s';
    }
  });
  
  // Add 3D tilt effect to cards on mouse move
  document.querySelectorAll('.event-card, .experiment-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Calculate rotation based on mouse position
      const rotateX = mouseY * -0.05;
      const rotateY = mouseX * 0.05;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.zIndex = '10';
      
      // Add dynamic shadow based on tilt
      card.style.boxShadow = `
        ${-rotateY/2}px ${-rotateX/2}px 20px rgba(255, 0, 0, 0.3),
        ${rotateY/2}px ${rotateX/2}px 20px rgba(0, 0, 255, 0.3)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '';
      card.style.boxShadow = '';
    });
  });
  
  // Add scroll-triggered animation for the gate portal
  const gatePortal = document.querySelector('.gate-portal');
  if (gatePortal) {
    // Create a pulsing effect for the gate
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .gate-pulse {
          animation: gatePulse 4s ease-in-out infinite !important;
        }
        
        @keyframes gatePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 50px rgba(255, 0, 0, 0.7); }
          50% { transform: scale(1.1); box-shadow: 0 0 80px rgba(255, 0, 0, 0.9); }
        }
      </style>
    `);
    
    // Add the pulse effect when the gate comes into view
    const gateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gatePortal.classList.add('gate-pulse');
        } else {
          gatePortal.classList.remove('gate-pulse');
        }
      });
    }, { threshold: 0.5 });
    
    gateObserver.observe(gatePortal);
  }
}

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
// Add this at the beginning of your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // Loader functionality
  const loader = document.querySelector('.loader-container');
  
  // Hide loader after content is loaded
  window.addEventListener('load', function() {
    // Add a slight delay for dramatic effect
    setTimeout(function() {
      loader.classList.add('loader-hidden');
      
      // Enable scrolling on body after loader is hidden
      document.body.style.overflow = 'auto';
      
      // Remove loader from DOM after transition completes
      loader.addEventListener('transitionend', function() {
        if (loader.classList.contains('loader-hidden')) {
          loader.remove();
        }
      });
    }, 1500); // 1.5 second delay
  });
  
  // Disable scrolling while loader is active
  document.body.style.overflow = 'hidden';
  
  // Rest of your existing code...
  
  // Add data-text attribute to all glitch-hover elements
  const glitchElements = document.querySelectorAll('.glitch-hover');
  glitchElements.forEach(element => {
    if (element.textContent) {
      element.setAttribute('data-text', element.textContent);
    }
  });
  
  // ... rest of your existing code
});