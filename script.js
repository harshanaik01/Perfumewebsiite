// You can add interactivity here. Example:
document.getElementById("search-icon").addEventListener("click", () => {
  alert("Search functionality coming soon!");
});

// Initialize AOS (Animate On Scroll)
AOS.init();

// Accordion functionality
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement; // This should be the .accordion-item
        const content = item.querySelector('.accordion-content'); // Get the content element
        const toggleIcon = header.querySelector('.icon'); // <--- CHANGED THIS LINE

        const isActive = item.classList.contains('active');

        // Close all other accordion items
        document.querySelectorAll('.accordion-item').forEach(i => {
            if (i !== item) { // Only close others
                i.classList.remove('active');
                // Explicitly set max-height to 0 for others to ensure collapse
                i.querySelector('.accordion-content').style.maxHeight = null; // Reset inline style
                i.querySelector('.icon').textContent = '+'; // <--- CHANGED THIS LINE
            }
        });

        // Toggle the clicked item
        if (!isActive) {
            item.classList.add('active');
            // Set max-height to its scrollHeight to animate opening
            content.style.maxHeight = content.scrollHeight + "px"; // Dynamic height
            toggleIcon.textContent = '−'; // Change to minus sign
        } else {
            item.classList.remove('active');
            // Set max-height to null to animate closing
            content.style.maxHeight = null; // Reset inline style
            toggleIcon.textContent = '+'; // Change back to plus sign
        }
    });
});


// Product Image Switcher
function switchImage(element) {
  const mainImage = document.getElementById("mainPerfumeImage");
  mainImage.src = element.src;
}

// Testimonial Carousel
const track = document.querySelector(".testimonial-track");
const dotsContainer = document.getElementById("dotContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;
let cardsPerView = 3; // Default for desktop

function updateCardsPerView() {
  if (window.innerWidth <= 768) { // Mobile
    cardsPerView = 1;
  } else if (window.innerWidth <= 1200) { // Tablet
    cardsPerView = 2;
  } else { // Desktop
    cardsPerView = 3;
  }
}

function createDots() {
  dotsContainer.innerHTML = ''; // Clear existing dots
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  updateCardsPerView(); // Recalculate cards per view on resize
  const cardStyle = window.getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth;
  const cardMarginRight = parseFloat(cardStyle.marginRight); // Get margin dynamically

  // Calculate the total width of one set of cards including margins
  const slideWidth = (cardWidth + cardMarginRight) * cardsPerView;
  
  // Adjust current index if it goes beyond new total slides
  const totalPossibleSlides = Math.ceil(cards.length / cardsPerView);
  if (currentIndex >= totalPossibleSlides) {
      currentIndex = totalPossibleSlides - 1;
      if (currentIndex < 0) currentIndex = 0; // Handle case with no cards
  }


  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  createDots(); // Recreate dots to match new total slides
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  const totalPossibleSlides = Math.ceil(cards.length / cardsPerView);
  if (currentIndex < totalPossibleSlides - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Initial load and resize events
window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel); // Ensure carousel updates on load

// FAQ Accordion (Improved to close others)
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".toggle-icon");

    const isOpen = answer.style.display === "block";

    // Close all other FAQ answers and reset their icons
    document.querySelectorAll(".faq-answer").forEach(ans => {
      if (ans !== answer) {
        ans.style.display = "none";
        ans.previousElementSibling.querySelector(".toggle-icon").textContent = "+";
      }
    });

    // Toggle the clicked FAQ answer
    if (!isOpen) {
      answer.style.display = "block";
      icon.textContent = "−";
    } else {
      answer.style.display = "none";
      icon.textContent = "+";
    }
  });
});

// Subscription Plan Radio Button Logic
const planRadios = document.querySelectorAll('input[name="plan"]');
const doubleSubscriptionSection = document.getElementById('double-subscription-section');
const tryOnceDoubleSection = document.getElementById('try-once-double-section');

planRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const label = radio.parentElement.textContent.toLowerCase();

    // Hide all optional sections first
    doubleSubscriptionSection.style.display = 'none';
    tryOnceDoubleSection.style.display = 'none';

    // Show section based on selected plan
    if (label.includes('double subscription')) {
      doubleSubscriptionSection.style.display = 'block';
    } else if (label.includes('try once')) {
      tryOnceDoubleSection.style.display = 'block';
    }
  });
});

// Optional: trigger correct section on page load based on which is checked
window.addEventListener('DOMContentLoaded', () => {
  const checkedPlan = document.querySelector('input[name="plan"]:checked');
  if (checkedPlan) checkedPlan.dispatchEvent(new Event('change'));
});

// Hamburger Menu Functionality
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burgerMenu.classList.toggle('toggle');
});

// Close nav when a link is clicked (for smoother mobile experience)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burgerMenu.classList.remove('toggle');
    });
});