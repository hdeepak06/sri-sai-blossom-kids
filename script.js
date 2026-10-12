/**
 * Sri Sai Blossom Kids — Official Website JavaScript
 * Pure Vanilla JavaScript: Robust, Accessible, Maintainable
 * Belaku Education Trust (R), Hassan, Karnataka
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 0. Full-Screen Logo Intro Screen & Homepage Reveal
  // =========================================================================
  const logoIntro = document.getElementById('logoIntro');
  const heroImage = document.getElementById('heroImage');
  const skipIntroBtn = document.getElementById('logoIntroSkipBtn');

  let introCompleted = false;

  const revealHomepage = () => {
    if (introCompleted) return;
    introCompleted = true;

    try {
      sessionStorage.setItem('ssbk_intro_shown', 'true');
    } catch (err) {
      // Storage access gracefully handled
    }

    // Start the cinematic 7-second zoom-out on the actual school building hero image
    if (heroImage) {
      heroImage.classList.add('zoom-active');
    }

    if (logoIntro) {
      logoIntro.classList.add('fade-out');
      // Re-enable page scrolling
      document.body.classList.remove('intro-active');

      // Fully hide overlay after transition so it never blocks clicks
      setTimeout(() => {
        logoIntro.style.display = 'none';
        logoIntro.setAttribute('aria-hidden', 'true');
      }, 750);
    }
  };

  const hasSeenIntro = sessionStorage.getItem('ssbk_intro_shown') === 'true';
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hasSeenIntro || prefersReducedMotion) {
    if (logoIntro) {
      logoIntro.style.display = 'none';
      logoIntro.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('intro-active');
    if (heroImage) heroImage.classList.add('zoom-active');
    introCompleted = true;
  } else if (logoIntro) {
    document.body.classList.add('intro-active');

    // Hold logo intro for 2.3 seconds, then smoothly reveal the homepage
    const introTimer = setTimeout(revealHomepage, 2300);

    // Tap / click anywhere on intro screen to skip immediately if in a rush
    logoIntro.addEventListener('click', () => {
      clearTimeout(introTimer);
      revealHomepage();
    });

    if (skipIntroBtn) {
      skipIntroBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(introTimer);
        revealHomepage();
      });
    }

    // Keyboard support: Escape, Enter, or Space to dismiss early
    window.addEventListener('keydown', (e) => {
      if (!introCompleted && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
        clearTimeout(introTimer);
        revealHomepage();
      }
    });
  } else {
    if (heroImage) heroImage.classList.add('zoom-active');
  }

  // =========================================================================
  // 1. Central School Configuration
  // =========================================================================
  const SCHOOL_CONFIG = {
    schoolName: 'Sri Sai Blossom Kids',
    trust: 'Belaku Education Trust (R)',
    location: 'Hassan, Karnataka, India',
    email: 'nithi892016@gmail.com',
    primaryPhone: '8217689236',
    phones: ['8217689236', '9880001881', '8050263538', '7204887580'],
    subject: 'Admission Enquiry - Sri Sai Blossom Kids Hassan',
    address: 'Opposite Malnadu Engineering College, Vidyuth Nagar, Hassan – 573202',
    mapCoords: [13.0228, 76.1035], // Opposite MCE, Vidyuth Nagar, Hassan
    zoomLevel: 16
  };

  // Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 2. Header & Sticky Scroll Management
  // =========================================================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header elevation shadow
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // Active nav link spy
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 3. Mobile Navigation Drawer
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // =========================================================================
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // =========================================================================
  // 5. Program Quick Enquire Buttons
  // =========================================================================
  const progButtons = document.querySelectorAll('.prog-enquire-btn');
  const programSelect = document.getElementById('programInterest');
  const parentNameInput = document.getElementById('parentName');

  progButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedProg = btn.getAttribute('data-program');
      if (programSelect && selectedProg) {
        let matched = false;
        for (let i = 0; i < programSelect.options.length; i++) {
          if (programSelect.options[i].value === selectedProg || programSelect.options[i].text.includes(selectedProg)) {
            programSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          programSelect.value = selectedProg;
        }
      }

      // Smooth scroll to admissions form
      const admSection = document.getElementById('admissions');
      if (admSection) {
        admSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (parentNameInput) parentNameInput.focus();
        }, 600);
      }
    });
  });

  // =========================================================================
  // 6. Gallery Filtering & Lightbox Modal
  // =========================================================================
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let currentGalleryItems = [];
  let currentLightboxIndex = 0;

  const updateCurrentItems = () => {
    currentGalleryItems = [];
    galleryCards.forEach((card) => {
      if (!card.classList.contains('hidden')) {
        const inner = card.querySelector('.gallery-card__inner');
        if (inner) {
          currentGalleryItems.push({
            src: inner.getAttribute('data-src'),
            caption: inner.getAttribute('data-caption'),
            alt: inner.querySelector('img')?.getAttribute('alt') || 'Sri Sai Blossom Kids Photograph'
          });
        }
      }
    });
  };

  updateCurrentItems();

  // Tab Filtering
  galleryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      galleryTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      galleryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      updateCurrentItems();
    });
  });

  // Lightbox functions
  const showLightboxImage = (index) => {
    if (!currentGalleryItems.length) return;
    if (index < 0) index = currentGalleryItems.length - 1;
    if (index >= currentGalleryItems.length) index = 0;

    currentLightboxIndex = index;
    const item = currentGalleryItems[currentLightboxIndex];

    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.innerHTML = item.caption;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentGalleryItems.length}`;
    }
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    showLightboxImage(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Gallery cards click
  galleryCards.forEach((card) => {
    const inner = card.querySelector('.gallery-card__inner');
    if (inner) {
      const handleOpen = () => {
        const itemSrc = inner.getAttribute('data-src');
        const index = currentGalleryItems.findIndex((it) => it.src === itemSrc);
        if (index !== -1) {
          openLightbox(index);
        }
      };

      inner.addEventListener('click', handleOpen);
      inner.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    }
  });

  // Featured Activity Card click to open in Lightbox
  const featuredActivityCard = document.querySelector('.activity-photo-card');
  if (featuredActivityCard) {
    const handleFeaturedClick = () => {
      const itemSrc = featuredActivityCard.getAttribute('data-src');
      let index = currentGalleryItems.findIndex((it) => it.src === itemSrc);
      if (index === -1) {
        currentGalleryItems.unshift({
          src: itemSrc,
          caption: featuredActivityCard.getAttribute('data-caption'),
          alt: featuredActivityCard.querySelector('img')?.getAttribute('alt') || 'Environment Day Classroom Display'
        });
        index = 0;
      }
      openLightbox(index);
    };

    featuredActivityCard.addEventListener('click', handleFeaturedClick);
    featuredActivityCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFeaturedClick();
      }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => showLightboxImage(currentLightboxIndex - 1));
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => showLightboxImage(currentLightboxIndex + 1));
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
  });

  // =========================================================================
  // 7. Admissions Enquiry Form Validation & Real Email Draft Creation
  // =========================================================================
  const form = document.getElementById('admissionForm');
  const parentName = document.getElementById('parentName');
  const contactNumber = document.getElementById('contactNumber');
  const childAge = document.getElementById('childAge');
  const programInterest = document.getElementById('programInterest');
  const message = document.getElementById('message');
  const formAlert = document.getElementById('formAlert');

  const enquirySuccessBox = document.getElementById('enquirySuccessBox');
  const enquirySummaryDetails = document.getElementById('enquirySummaryDetails');
  const openEmailDraftBtn = document.getElementById('openEmailDraftBtn');
  const copyEnquiryBtn = document.getElementById('copyEnquiryBtn');
  const resetEnquiryBtn = document.getElementById('resetEnquiryBtn');

  const setError = (field, msg) => {
    field.classList.add('invalid');
    const errorEl = document.getElementById(`${field.id}Error`);
    if (errorEl) errorEl.textContent = msg;
  };

  const clearError = (field) => {
    field.classList.remove('invalid');
    const errorEl = document.getElementById(`${field.id}Error`);
    if (errorEl) errorEl.textContent = '';
  };

  [parentName, contactNumber, childAge, programInterest].forEach((field) => {
    if (field) {
      field.addEventListener('input', () => clearError(field));
      field.addEventListener('change', () => clearError(field));
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Parent Name
      const nameVal = parentName.value.trim();
      if (!nameVal) {
        setError(parentName, 'Please enter parent/guardian name.');
        isValid = false;
      } else if (nameVal.length < 2) {
        setError(parentName, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        clearError(parentName);
      }

      // Validate Contact Number (10 digits Indian mobile)
      const phoneVal = contactNumber.value.trim();
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneVal) {
        setError(contactNumber, 'Please enter 10-digit contact number.');
        isValid = false;
      } else if (!phoneRegex.test(phoneVal)) {
        setError(contactNumber, 'Please enter a valid 10-digit number starting with 6, 7, 8, or 9.');
        isValid = false;
      } else {
        clearError(contactNumber);
      }

      // Validate Child Age
      if (!childAge.value) {
        setError(childAge, 'Please select your child’s age.');
        isValid = false;
      } else {
        clearError(childAge);
      }

      // Validate Program
      if (!programInterest.value) {
        setError(programInterest, 'Please select a program of interest.');
        isValid = false;
      } else {
        clearError(programInterest);
      }

      if (!isValid) {
        if (formAlert) {
          formAlert.className = 'form-alert form-alert--error';
          formAlert.textContent = 'Please fill all required fields correctly before submitting.';
          formAlert.style.display = 'block';
        }
        return;
      }

      if (formAlert) formAlert.style.display = 'none';

      // Build structured email draft
      const notesVal = message.value.trim() ? message.value.trim() : 'None provided';
      const emailSubject = encodeURIComponent(SCHOOL_CONFIG.subject);
      const emailBodyRaw = 
`Dear Admissions Team at Sri Sai Blossom Kids (Belaku Education Trust R),

I would like to submit an admission enquiry for my child. Here are our details:

• Parent / Guardian Name: ${nameVal}
• Contact Number: +91 ${phoneVal}
• Child's Age Group: ${childAge.value}
• Program of Interest: ${programInterest.value}
• Message / Query:
${notesVal}

School Location: ${SCHOOL_CONFIG.address}
Direct School Contacts: ${SCHOOL_CONFIG.phones.join(' / ')}

Please contact us to share admission details and schedule a campus visit.

Thank you,
${nameVal}`;

      const mailtoUrl = `mailto:${SCHOOL_CONFIG.email}?subject=${emailSubject}&body=${encodeURIComponent(emailBodyRaw)}`;

      // Update Summary UI
      if (enquirySummaryDetails) {
        enquirySummaryDetails.innerHTML = `
          <p><strong>Parent Name:</strong> ${nameVal}</p>
          <p><strong>Contact:</strong> +91 ${phoneVal}</p>
          <p><strong>Child's Age:</strong> ${childAge.value}</p>
          <p><strong>Program:</strong> ${programInterest.value}</p>
          <p><strong>Note:</strong> ${notesVal}</p>
        `;
      }

      if (openEmailDraftBtn) {
        openEmailDraftBtn.href = mailtoUrl;
      }

      // Hide form and show dispatch summary modal
      form.style.display = 'none';
      if (enquirySuccessBox) {
        enquirySuccessBox.style.display = 'block';
        enquirySuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showCartoonFeedback(enquirySuccessBox, 'star', "Great choice! Enquiry prepared! ⭐");
      }

      // Automatically trigger email client
      window.location.href = mailtoUrl;

      // Handle copy to clipboard button
      if (copyEnquiryBtn) {
        copyEnquiryBtn.onclick = () => {
          navigator.clipboard.writeText(emailBodyRaw).then(() => {
            const originalText = copyEnquiryBtn.textContent;
            copyEnquiryBtn.textContent = '✓ Copied to Clipboard!';
            copyEnquiryBtn.style.background = '#06D6A0';
            copyEnquiryBtn.style.color = '#FFFFFF';
            setTimeout(() => {
              copyEnquiryBtn.textContent = originalText;
              copyEnquiryBtn.style.background = '';
              copyEnquiryBtn.style.color = '';
            }, 3000);
          }).catch(() => {
            alert('Enquiry details formatted. You can paste directly into your email.');
          });
        };
      }
    });
  }

  if (resetEnquiryBtn) {
    resetEnquiryBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'block';
      }
      if (enquirySuccessBox) {
        enquirySuccessBox.style.display = 'none';
      }
    });
  }

  // =========================================================================
  // 7. Small Animated Cartoon Popup Feedback System
  // Pure inline SVG vector characters: Smiling Teddy Bear, Happy Star, Friendly Bunny
  // Non-blocking, viewport-clamped, accessible, mobile-optimized
  // =========================================================================
  const CARTOON_AVATARS = {
    teddy: `
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="9" cy="11" r="7" fill="#C68A4C"/>
        <circle cx="9" cy="11" r="4" fill="#F8B4B4"/>
        <circle cx="31" cy="11" r="7" fill="#C68A4C"/>
        <circle cx="31" cy="11" r="4" fill="#F8B4B4"/>
        <circle cx="20" cy="22" r="15" fill="#DDA15E"/>
        <circle cx="11" cy="24" r="3" fill="#F8B4B4" opacity="0.85"/>
        <circle cx="29" cy="24" r="3" fill="#F8B4B4" opacity="0.85"/>
        <ellipse cx="20" cy="24.5" rx="7" ry="5.5" fill="#FFF3D6"/>
        <circle cx="15" cy="19" r="2.2" fill="#28251F"/>
        <circle cx="14.3" cy="18.3" r="0.8" fill="#FFFFFF"/>
        <circle cx="25" cy="19" r="2.2" fill="#28251F"/>
        <circle cx="24.3" cy="18.3" r="0.8" fill="#FFFFFF"/>
        <ellipse cx="20" cy="22.5" rx="2.5" ry="1.8" fill="#583101"/>
        <path d="M17.5 25.5 Q20 28 22.5 25.5" stroke="#583101" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      </svg>
    `,
    star: `
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="20,2 25,14 38,15 28,24 31,37 20,30 9,37 12,24 2,15 15,14" fill="#FFC93C" stroke="#D4AF37" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="14" cy="22" r="2.2" fill="#FF7B7B" opacity="0.85"/>
        <circle cx="26" cy="22" r="2.2" fill="#FF7B7B" opacity="0.85"/>
        <circle cx="16" cy="18" r="1.8" fill="#28251F"/>
        <circle cx="15.5" cy="17.5" r="0.6" fill="#FFFFFF"/>
        <circle cx="24" cy="18" r="1.8" fill="#28251F"/>
        <circle cx="23.5" cy="17.5" r="0.6" fill="#FFFFFF"/>
        <path d="M17.5 22.5 Q20 25.5 22.5 22.5" stroke="#28251F" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      </svg>
    `,
    bunny: `
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="14" cy="11" rx="4.5" ry="10" fill="#FFFFFF" stroke="#E2D9C8" stroke-width="1"/>
        <ellipse cx="14" cy="11" rx="2.5" ry="7" fill="#F8B4B4"/>
        <ellipse cx="26" cy="11" rx="4.5" ry="10" fill="#FFFFFF" stroke="#E2D9C8" stroke-width="1"/>
        <ellipse cx="26" cy="11" rx="2.5" ry="7" fill="#F8B4B4"/>
        <circle cx="20" cy="24" r="13" fill="#FFFFFF" stroke="#E2D9C8" stroke-width="1"/>
        <circle cx="12" cy="26" r="2.5" fill="#F8B4B4" opacity="0.85"/>
        <circle cx="28" cy="26" r="2.5" fill="#F8B4B4" opacity="0.85"/>
        <circle cx="15" cy="22" r="1.8" fill="#28251F"/>
        <circle cx="14.4" cy="21.4" r="0.6" fill="#FFFFFF"/>
        <circle cx="25" cy="22" r="1.8" fill="#28251F"/>
        <circle cx="24.4" cy="21.4" r="0.6" fill="#FFFFFF"/>
        <polygon points="18.5,25 21.5,25 20,27" fill="#FF85A1"/>
        <path d="M17.5 27.5 Q18.7 29.5 20 27.5 Q21.3 29.5 22.5 27.5" stroke="#28251F" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      </svg>
    `
  };

  let currentCartoonPopup = null;
  let cartoonDismissTimer = null;

  const showCartoonFeedback = (targetEl, characterKey, message) => {
    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (currentCartoonPopup) {
      currentCartoonPopup.remove();
      currentCartoonPopup = null;
      if (cartoonDismissTimer) clearTimeout(cartoonDismissTimer);
    }

    const avatarSvg = CARTOON_AVATARS[characterKey] || CARTOON_AVATARS.teddy;
    const popup = document.createElement('div');
    popup.className = 'cartoon-popup';
    popup.setAttribute('role', 'status');
    popup.setAttribute('aria-live', 'polite');
    popup.innerHTML = `
      <div class="cartoon-popup__avatar">${avatarSvg}</div>
      <span class="cartoon-popup__text">${message}</span>
    `;

    document.body.appendChild(popup);
    currentCartoonPopup = popup;

    // Viewport-safe coordinates calculation
    if (targetEl && targetEl.getBoundingClientRect) {
      const rect = targetEl.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const pWidth = popupRect.width || 220;
      const pHeight = popupRect.height || 54;

      let top = rect.top - pHeight - 14;
      // If placed too close to the top, flip below the target
      if (top < 12) {
        top = rect.bottom + 14;
      }
      // If it still overflows bottom
      if (top + pHeight > window.innerHeight - 12) {
        top = window.innerHeight - pHeight - 16;
      }

      let left = rect.left + (rect.width / 2) - (pWidth / 2);
      // Horizontal clamping inside viewport
      left = Math.max(12, Math.min(window.innerWidth - pWidth - 12, left));

      popup.style.top = `${Math.round(top)}px`;
      popup.style.left = `${Math.round(left)}px`;
    }

    // Auto dismiss after 1.8 seconds
    cartoonDismissTimer = setTimeout(() => {
      if (currentCartoonPopup === popup) {
        popup.remove();
        currentCartoonPopup = null;
      }
    }, 1800);
  };

  // Wire non-blocking cartoon feedback to buttons
  const attachCartoonInteractions = () => {
    const candidates = document.querySelectorAll('.btn, .float-btn, .prog-enquire-btn, .phone-chip, .phone-box__btn, .contact-phone-item, .back-to-top');
    candidates.forEach((btn) => {
      btn.addEventListener('click', () => {
        const href = btn.getAttribute('href') || '';
        const text = (btn.textContent || '').trim().toLowerCase();

        // 1. WhatsApp Action
        if (btn.classList.contains('float-btn--whatsapp') || href.includes('wa.me')) {
          showCartoonFeedback(btn, 'teddy', "Let's connect on WhatsApp! 💬");
        }
        // 2. Phone Call Action
        else if (btn.classList.contains('float-btn--call') || href.startsWith('tel:') || btn.classList.contains('phone-chip') || btn.classList.contains('phone-box__btn') || btn.classList.contains('contact-phone-item')) {
          showCartoonFeedback(btn, 'bunny', "Calling our friendly school! 📞");
        }
        // 3. Email Action
        else if (btn.classList.contains('float-btn--email') || href.startsWith('mailto:')) {
          showCartoonFeedback(btn, 'star', "Let's connect with our team! ✉️");
        }
        // 4. Program specific enquiry
        else if (btn.classList.contains('prog-enquire-btn') || btn.dataset.program) {
          showCartoonFeedback(btn, 'star', "Great choice! Ready to learn! ⭐");
        }
        // 5. Admissions enquiry
        else if (href === '#admissions' || text.includes('enquire') || text.includes('admission')) {
          showCartoonFeedback(btn, 'teddy', "Yay! Let's learn together! 🎒");
        }
        // 6. Explore school / campus visit
        else if (href === '#about' || text.includes('explore') || text.includes('visit')) {
          showCartoonFeedback(btn, 'bunny', "Ready to explore our school? 🏫");
        }
        // 7. Back to top
        else if (btn.id === 'backToTopBtn') {
          showCartoonFeedback(btn, 'star', "Thank you for visiting! 🌸");
        }
        // 8. Other button actions
        else {
          showCartoonFeedback(btn, 'teddy', "Yay! Let's learn together! 🎒");
        }
      });
    });
  };

  attachCartoonInteractions();
});
