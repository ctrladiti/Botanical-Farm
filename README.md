## Virtual Herbal Garden

A web-based interactive platform to explore medicinal plants used in traditional Indian healing systems (AYUSH – Ayurveda, Yoga, Unani, Siddha, and Homeopathy). The garden allows users to browse plants by category, view 3D-style carousels, and learn their uses, habitats, and botanical names.

---

### Features

- **Searchable & Filterable Categories**
- **Interactive Carousel** with smooth transitions
- **Plant Detail Modals** with audio, image, and full info
- **Immersive Garden Aesthetic**
- **Modular Design** using HTML, CSS, JS, and JSON
- **Category-based Navigation** (e.g., Skin Care, Immunity)

---

### Folder Structure

```
VirtualHerbalGarden/
├── index.html                 # Landing page with AYUSH intro
├── garden.html               # Garden category carousel
├── category.html             # Plants under selected category
│
├── plants.json               # List of all medicinal plants
├── categories.json           # Categories for carousel
│
├── style.css                 # Styles for index.html
├── stylegarden.css           # Styles for garden.html
├── stylecategory.css         # Styles for category.html
│
├── script.js                 # JS for carousel and search
├── category.js               # JS for category page plant modal
│
├── images/
│   ├── categories/           # Category thumbnails
│   └── plant images
│
├── audio/
│   └── plant audio clips
│
└── README.md                 # You're here
```

---

### How to Run Locally

1. **Clone this repository**

   ```bash
   git clone https://github.com/your-username/VirtualHerbalGarden.git
   cd VirtualHerbalGarden
   ```

2. **Open `index.html` in any browser**

   - Double-click the file or serve with Live Server.

3. **Explore!**

   - Use the navigation to browse categories and plant information.

> No backend or server setup needed. This project runs fully in the browser using static assets.

---

### Data Files

#### `plants.json`

Each plant has:

```json
{
  "name": "Tulsi",
  "botanical": "Ocimum tenuiflorum",
  "image": "images/tulsi.jpg",
  "uses": "Boosts immunity",
  "habitat": "Tropical India",
  "audio": "audio/tulsi.mp3",
  "category": "immunity"
}
```

#### `categories.json`

Each category entry:

```json
{
  "name": "Immunity",
  "slug": "immunity",
  "image": "images/categories/immunity.jpg"
}
```

---

### Customization

- Add more plants: just add new entries in `plants.json`.
- Add categories: update `categories.json` and ensure matching `slug` in plants.
- Add images and audio: place files inside `/images/` and `/audio/`.

