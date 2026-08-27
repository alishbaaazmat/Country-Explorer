# 🌍 Country Explorer

A responsive and interactive web application for exploring countries around the world using live data from the [countries.dev](https://countries.dev/) public API.

Country Explorer combines a clean, atlas-inspired interface with a data-focused dashboard, letting users search, filter, and drill into detailed country information.

---

## ✨ Features

- Fetches live country data from a public API
- Search countries by name
- Filter countries by region (combinable with search)
- Dynamic dashboard stats: total countries, regions, and currencies
- Country cards with flag, name, capital, region, and population
- Detailed country view via an interactive modal
- Loading, error (with retry), and empty-result states
- Fully responsive layout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript (ES6+) | API integration and application logic |
| [countries.dev API](https://countries.dev/) | Live country data |

No frameworks, build tools, or backend required.

---

## 🖥️ Application Overview

### World at a Glance
A dashboard summarizing the total number of countries, unique regions, and unique currencies in the dataset.

### Search & Filters
Users can search by country name and filter by region — both can be applied together to narrow results.

### Country Cards
Each card shows a country's flag, name, capital, region, and population, with a "View Details" option.

### Country Details Modal
Expands on a country's card with its native name, subregion, area, country code, languages, currency, and timezone.

---

## ⚙️ How It Works

1. The app requests country data from the API on load.
2. Data is stored locally in the application state.
3. Dashboard statistics are calculated from that data.
4. Country cards are rendered.
5. Search and filtering run against the already-fetched data — no extra API calls are made while interacting with the UI.
6. Selecting a country opens the details modal.

---

## ⏳ State Handling

| State | Behavior |
|---|---|
| **Loading** | Visible loading indicator while data is being fetched |
| **Success** | Country data rendered as interactive cards |
| **Error** | Friendly error message with a **Try Again** button |
| **Empty** | Clear messaging when no countries match the current search/filter |

---

## 📁 Project Structure

```text
country-explorer/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- An internet connection (for API requests)
- (Optional) A code editor such as VS Code

### Run Locally

```bash
git clone https://github.com/alishbaaazmat/Country-Explorer.git
cd country-explorer
```

Then open `index.html` in your browser, or use the **Live Server** extension in VS Code for a smoother development experience.

---

## 🌐 Live Demo

🔗 [Country Explorer](https://alishbaaazmat.github.io/Country-Explorer/)

---

## 👩‍💻 Author

**Alishba Azmat**
