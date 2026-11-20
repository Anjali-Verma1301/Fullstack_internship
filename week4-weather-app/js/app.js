
const App = {
    async loadWeather(city) {
        if (!city || !city.trim()) {
            return;
        }

        WeatherUI.showLoading();
        document.getElementById("suggestions").hidden = true;

        try {
            const data = await WeatherService.getWeather(city.trim());
            WeatherUI.displayWeather(data);
        } catch (error) {
            WeatherUI.showError(error.message);
        }
    },

    toggleFavorite(city) {
        let favorites = StorageService.getFavorites();

        const existing = favorites.findIndex(
            item => item.toLowerCase() === city.toLowerCase()
        );

        if (existing >= 0) {
            favorites.splice(existing, 1);
        } else {
            favorites.push(city);
        }

        StorageService.saveFavorites(favorites);
        WeatherUI.renderFavorites(favorites);
    },

    init() {
        const form = document.getElementById("searchForm");
        const input = document.getElementById("searchInput");
        const toggle = document.getElementById("unitToggle");

        form.addEventListener("submit", event => {
            event.preventDefault();
            this.loadWeather(input.value);
        });

        toggle.addEventListener("click", () => {
            WeatherUI.currentUnit =
                WeatherUI.currentUnit === "C" ? "F" : "C";

            toggle.textContent = WeatherUI.currentUnit === "C"
                ? "Switch to °F"
                : "Switch to °C";

            if (WeatherUI.lastData) {
                WeatherUI.displayWeather(WeatherUI.lastData);
            }
        });

        let searchTimer;

        input.addEventListener("input", () => {
            clearTimeout(searchTimer);

            const query = input.value.trim();

            if (query.length < 2) {
                WeatherUI.displaySuggestions([]);
                return;
            }

            searchTimer = setTimeout(async () => {
                try {
                    const cities =
                        await WeatherService.getSuggestions(query);

                    // Avoid showing old suggestions for a newer query.
                    if (input.value.trim() === query) {
                        WeatherUI.displaySuggestions(cities);
                    }
                } catch {
                    WeatherUI.displaySuggestions([]);
                }
            }, 400);
        });

        WeatherUI.renderFavorites(StorageService.getFavorites());

        // Load a default city when the app opens.
        this.loadWeather("Mathura");
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());
