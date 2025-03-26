
// Initialize Feather icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Toggle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      
      // Change icon based on menu state
      const icon = mobileMenu.classList.contains('open') ? 'x' : 'menu';
      mobileMenuButton.innerHTML = '';
      const newIcon = document.createElement('i');
      newIcon.setAttribute('data-feather', icon);
      mobileMenuButton.appendChild(newIcon);
      feather.replace();
    });
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuButton.innerHTML = '';
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-feather', 'menu');
        mobileMenuButton.appendChild(newIcon);
        feather.replace();
      });
    });
    
    // Handle scroll events
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Scroll to features section
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    // Learn More button scroll behavior
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn && window.location.pathname.includes('index')) {
      learnMoreBtn.addEventListener('click', (e) => {
        if (window.location.pathname.includes('index')) {
          e.preventDefault();
          const featuresSection = document.getElementById('features');
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
    
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxOffset = scrollPosition * 0.4;
        
        hero.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
      });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
    
    // Handle clan application form submission
    const clanApplication = document.getElementById('clan-application');
    if (clanApplication) {
      clanApplication.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send this data to a server
        alert('Thank you for your application! We will review it and contact you through Discord if you meet our requirements.');
        
        // Optionally reset the form
        this.reset();
      });
    }
  });

  // Initialize Feather icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Toggle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // ... keep existing code (mobile menu toggle, close menu, scroll events, scroll to features)
    
    // Learn More button scroll behavior
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn && window.location.pathname.includes('index')) {
      learnMoreBtn.addEventListener('click', (e) => {
        if (window.location.pathname.includes('index')) {
          e.preventDefault();
          const featuresSection = document.getElementById('features');
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
    
    // ... keep existing code (parallax effect, animation on scroll)
    
    // Handle clan application form submission with Discord webhook
    const clanApplication = document.getElementById('clan-application');
    if (clanApplication) {
      clanApplication.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const applicationData = {};
        formData.forEach((value, key) => {
          applicationData[key] = value;
        });
        
        // Discord webhook URL - replace with your actual webhook URL
        const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
        
        try {
          // Send data to Discord webhook
          await sendToDiscordWebhook(webhookUrl, applicationData);
          
          // Show success message with Discord information
          showApplicationConfirmation();
          
          // Reset the form
          this.reset();
        } catch (error) {
          console.error("Error sending application:", error);
          alert("There was an error submitting your application. Please try again later.");
        }
      });
    }
    
    // Function to send data to Discord webhook
    async function sendToDiscordWebhook(webhookUrl, data) {
      const { name, hours, age, discord, experience, contribution, availability } = data;
      
      const content = {
        embeds: [{
          title: "New Clan Application",
          color: 0xb91c1c, // Red color
          fields: [
            {
              name: "Steam Name",
              value: name || "Not provided",
              inline: true
            },
            {
              name: "Hours in Rust",
              value: hours || "0",
              inline: true
            },
            {
              name: "Age",
              value: age || "Not provided",
              inline: true
            },
            {
              name: "Discord Username",
              value: discord || "Not provided",
              inline: true
            },
            {
              name: "Experience",
              value: experience || "Not provided"
            },
            {
              name: "Potential Contribution",
              value: contribution || "Not provided"
            },
            {
              name: "Availability",
              value: availability || "Not provided"
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };
      
      // Only send the request if we have a valid webhook URL
      if (webhookUrl && webhookUrl !== "https://discord.com/api/webhooks/1352724243523047528/TMmWeulw056B0HMCd8AJRvqIh5FLzG2P_tHGVUZWp8C2SjVIQj_GIT1P38qPf-N5IXA0") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(content)
        });
      } else {
        console.log("Webhook URL not configured. Would have sent: ", content);
      }
    }
    
    // Function to show application confirmation with Discord info
    function showApplicationConfirmation() {
      // Create modal backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'confirmation-backdrop';
      document.body.appendChild(backdrop);
      
      // Create confirmation modal
      const modal = document.createElement('div');
      modal.className = 'confirmation-modal fade-in-up';
      modal.innerHTML = `
        <div class="confirmation-content">
          <i data-feather="check-circle" class="confirmation-icon"></i>
          <h3>Application Submitted!</h3>
          <p>Thank you for your interest in RustWraith Clan.</p>
          <p>The next step is to join our Discord server where we'll review your application and contact you for an interview if you meet our requirements.</p>
          <div class="confirmation-actions">
            <a href="https://discord.gg/rustwraith" class="cta-button" target="_blank">
              Join Discord Now <i data-feather="external-link"></i>
            </a>
            <button class="secondary-button close-confirmation">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Initialize Feather icons in the modal
      feather.replace();
      
      // Close confirmation on backdrop click or close button
      backdrop.addEventListener('click', closeConfirmation);
      modal.querySelector('.close-confirmation').addEventListener('click', closeConfirmation);
      
      function closeConfirmation() {
        backdrop.remove();
        modal.remove();
      }
    }
  });
  