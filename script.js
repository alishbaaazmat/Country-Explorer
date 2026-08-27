const API_URL = "https://countries.dev/countries";

let allCountries = [];
let selectedRegion = "all";

// ========================================
// DOM ELEMENTS
// ========================================

const countriesGrid = document.getElementById("countries-grid");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");

const countryCount = document.getElementById("country-count");
const regionCount = document.getElementById("region-count");
const currencyCount = document.getElementById("currency-count");

const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

const retryButton = document.getElementById("retry-btn");

// ========================================
// FETCH COUNTRIES
// ========================================

async function fetchCountries() {

    try {

        showLoading();

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        allCountries = data;

        console.log(data);

        updateStatistics(allCountries);
        renderCountries(allCountries);

        // We'll process the API data in the next step.

    } catch (error) {

        console.error("Error fetching countries:", error);

        showError();
    }
}


// ========================================
// UI STATES
// ========================================

function showLoading() {

    loadingState.classList.remove("hidden");
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");

    countriesGrid.innerHTML = "";

    resultsCount.textContent = "Loading...";

    countryCount.textContent = "—";
    regionCount.textContent = "—";
    currencyCount.textContent = "—";
}

function showError() {

    loadingState.classList.add("hidden");
    errorState.classList.remove("hidden");
    emptyState.classList.add("hidden");

    countriesGrid.innerHTML = "";

    resultsCount.textContent = "Unable to load";

}

searchInput.addEventListener("input", handleSearch);

retryButton.addEventListener("click", fetchCountries);

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedRegion = button.dataset.region;

        applyFilters();
    });

});

function handleSearch() {
    applyFilters();
}

function applyFilters() {

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const filteredCountries = allCountries.filter(country => {

        const matchesSearch =
            country.name
                .toLowerCase()
                .includes(searchTerm);

        const matchesRegion =
            selectedRegion === "all" ||
            country.region === selectedRegion;

        return matchesSearch && matchesRegion;

    });

    renderCountries(filteredCountries);
}

// ========================================
// START APPLICATION
// ========================================

fetchCountries();

function renderCountries(countries) {

    loadingState.classList.add("hidden");
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");

    countriesGrid.innerHTML = "";

    if (countries.length === 0) {
        emptyState.classList.remove("hidden");
        resultsCount.textContent = "0 countries";
        return;
    }

    countries.forEach(country => {

        const card = document.createElement("article");

        card.className = "country-card";

        card.innerHTML = `
            <img
                src="${country.flags.svg}"
                alt="Flag of ${country.name}"
                class="country-flag"
            >

            <div class="country-info">

                <h3 class="country-name">
                    ${country.name}
                </h3>

                <p class="country-capital">
                    ${country.capital || "Capital unavailable"}
                </p>

                <div class="country-meta">

                    <span class="country-tag">
                        ${country.region || "Unknown region"}
                    </span>

                    <span class="country-tag">
                        ${formatPopulation(country.population)}
                    </span>

                </div>

                <button
                    class="country-details-btn"
                    data-country="${country.alpha3Code}"
                >
                    View Details →
                </button>

            </div>
        `;

        countriesGrid.appendChild(card);
    });

    resultsCount.textContent =
        `${countries.length} ${countries.length === 1 ? "country" : "countries"}`;

    addCountryButtonListeners();
}

function formatPopulation(population) {

    if (!population) {
        return "Population unavailable";
    }

    return `${new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(population)} people`;
}

function addCountryButtonListeners() {

    const detailButtons =
        document.querySelectorAll(".country-details-btn");

    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const countryCode = button.dataset.country;

            openCountryModal(countryCode);

        });

    });
}

function openCountryModal(countryCode) {

    const country = allCountries.find(
        country => country.alpha3Code === countryCode
    );

    if (!country) {
        return;
    }

    modalContent.innerHTML = `
        <img
            src="${country.flags.svg}"
            alt="Flag of ${country.name}"
            class="modal-flag"
        >

        <h2>${country.name}</h2>

        <p class="modal-native-name">
            ${country.nativeName || ""}
        </p>

        <div class="modal-details">

            <div class="modal-detail">
                <span>Capital</span>
                <strong>
                    ${country.capital || "N/A"}
                </strong>
            </div>

            <div class="modal-detail">
                <span>Region</span>
                <strong>
                    ${country.region || "N/A"}
                </strong>
            </div>

            <div class="modal-detail">
                <span>Subregion</span>
                <strong>
                    ${country.subregion || "N/A"}
                </strong>
            </div>

            <div class="modal-detail">
                <span>Population</span>
                <strong>
                    ${formatPopulation(country.population)}
                </strong>
            </div>

            <div class="modal-detail">
                <span>Area</span>
                <strong>
                    ${country.area
                        ? `${country.area.toLocaleString()} km²`
                        : "N/A"
                    }
                </strong>
            </div>

            <div class="modal-detail">
                <span>Country Code</span>
                <strong>
                    ${country.alpha2Code || "N/A"}
                </strong>
            </div>

        </div>
    `;

    modalOverlay.classList.remove("hidden");
}

modalClose.addEventListener("click", () => {

    modalOverlay.classList.add("hidden");

});

modalOverlay.addEventListener("click", event => {

    if (event.target === modalOverlay) {

        modalOverlay.classList.add("hidden");

    }

});

function updateStatistics(countries) {

    const regions = new Set();
    const currencies = new Set();

    countries.forEach(country => {

        if (country.region) {
            regions.add(country.region);
        }

        if (country.currencies) {
            country.currencies.forEach(currency => {
                currencies.add(currency.code);
            });
        }

    });

    countryCount.textContent = countries.length;
    regionCount.textContent = regions.size;
    currencyCount.textContent = currencies.size;
}