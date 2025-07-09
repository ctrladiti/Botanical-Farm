const plantGrid = document.getElementById("plant-grid");
const categoryTitle = document.getElementById("category-title");
const categoryDesc = document.getElementById("category-description");

const modal = document.getElementById("plant-modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalBotanical = document.getElementById("modal-botanical");
const modalUses = document.getElementById("modal-uses");
const modalHabitat = document.getElementById("modal-habitat");
const modalAudio = document.getElementById("modal-audio");
const closeBtn = document.getElementById("close-btn");

// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

if (!selectedCategory) {
  categoryTitle.textContent = "Category not found";
  plantGrid.innerHTML = "<p>Invalid or missing category in URL.</p>";
} else {
  fetch("plants.json")
    .then((res) => res.json())
    .then((plants) => {
      const filteredPlants = plants.filter(plant =>
        plant.category.toLowerCase() === selectedCategory.toLowerCase()
      );

      if (filteredPlants.length === 0) {
        categoryTitle.textContent = selectedCategory;
        plantGrid.innerHTML = "<p>No plants found for this category.</p>";
        return;
      }

      categoryTitle.textContent = `🌿 ${capitalize(selectedCategory)} Plants`;
      renderPlants(filteredPlants);
    })
    .catch((err) => {
      console.error("Error loading plants:", err);
      plantGrid.innerHTML = "<p>Error loading plant data.</p>";
    });
}

// Render plant cards
function renderPlants(plants) {
  plantGrid.innerHTML = "";

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}">
      <h3>${plant.name}</h3>
      <p><strong>Uses:</strong> ${plant.uses}</p>
    `;
    card.addEventListener("click", () => openModal(plant));
    plantGrid.appendChild(card);
  });
}

// Show modal with plant details
function openModal(plant) {
  modalImg.src = plant.image;
  modalName.textContent = plant.name;
  modalBotanical.innerHTML = `<strong>Botanical:</strong> ${plant.botanical}`;
  modalUses.innerHTML = `<strong>Uses:</strong> ${plant.uses}`;
  modalHabitat.innerHTML = `<strong>Habitat:</strong> ${plant.habitat}`;
  modalAudio.src = plant.audio || ""; // optional
  modal.classList.remove("hidden");
}

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Utility
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
