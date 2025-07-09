const carousel = document.getElementById("category-carousel");
const searchInput = document.getElementById("search");
const leftArrow = document.getElementById("arrow-left");
const rightArrow = document.getElementById("arrow-right");

let cardWidth = 0;
let currentIndex = 2;
let totalCards = 0;
let categoriesData = [];

// Fetch categories and render carousel
fetch("categories.json")
  .then((res) => res.json())
  .then((categories) => {
    categoriesData = categories;
    renderCarousel(categories);

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = categoriesData.filter(cat =>
        cat.name.toLowerCase().includes(query)
      );
      renderCarousel(filtered);
    });
  })
  .catch((err) => {
    console.error("Failed to load categories:", err);
    carousel.innerHTML = "<p>Error loading categories.</p>";
  });

function renderCarousel(categories) {
  carousel.innerHTML = "";

  if (categories.length === 0) return;

  const clonesBefore = categories.slice(-2);
  const clonesAfter = categories.slice(0, 2);
  const fullList = [...clonesBefore, ...categories, ...clonesAfter];
  totalCards = fullList.length;

  fullList.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" />
      <h2>${cat.name}</h2>
    `;
    card.addEventListener("click", () => {
      window.location.href = `category.html?category=${encodeURIComponent(cat.slug)}`;
    });
    carousel.appendChild(card);
  });

  setTimeout(() => {
    const cards = document.querySelectorAll(".category-card");
    cardWidth = cards[0].offsetWidth + 20;
    currentIndex = 2;
    carousel.scrollLeft = cardWidth * currentIndex;
    highlightCenterCard();
  }, 100);
}

function highlightCenterCard() {
  const cards = document.querySelectorAll(".category-card");
  const center = carousel.scrollLeft + carousel.offsetWidth / 2;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const isCenter = Math.abs(center - cardCenter) < card.offsetWidth / 2;
    card.classList.toggle("active", isCenter);
  });
}

function scrollToIndex(index) {
  carousel.scrollTo({
    left: cardWidth * index,
    behavior: "smooth"
  });
  currentIndex = index;
}

// Arrow Button Events
leftArrow.addEventListener("click", () => {
    if (currentIndex <= 1) {
      currentIndex--;
      scrollToIndex(currentIndex);
  
      setTimeout(() => {
        currentIndex = totalCards - 4;
        scrollToIndex(currentIndex); // smooth jump
      }, 400); // matches scroll duration
    } else {
      currentIndex--;
      scrollToIndex(currentIndex);
    }
  });
  
  rightArrow.addEventListener("click", () => {
    if (currentIndex >= totalCards - 3) {
      currentIndex++;
      scrollToIndex(currentIndex);
  
      setTimeout(() => {
        currentIndex = 2;
        scrollToIndex(currentIndex); // smooth jump
      }, 400);
    } else {
      currentIndex++;
      scrollToIndex(currentIndex);
    }
  });

// Continuous center highlight
carousel.addEventListener("scroll", () => {
    requestAnimationFrame(highlightCenterCard);
  
    const clones = 2;
    const realCount = totalCards - clones * 2;
  
    // ONLY jump immediately if user drags quickly
    if (carousel.scrollLeft <= 0) {
      currentIndex = realCount;
      carousel.scrollTo({ left: cardWidth * currentIndex, behavior: "auto" });
    } else if (carousel.scrollLeft >= cardWidth * (totalCards - clones)) {
      currentIndex = clones;
      carousel.scrollTo({ left: cardWidth * currentIndex, behavior: "auto" });
    }
  });
  