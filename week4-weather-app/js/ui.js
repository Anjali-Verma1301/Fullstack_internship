
const WeatherUI = {
    currentUnit: "C",
    lastData: null,

    showLoading() {
        document.getElementById("statusMessage").textContent =
            "Loading weather data...";

        document.getElementById("currentWeather").innerHTML =
            '<div class="loading">Fetching current weather...</div>';
    },

    showError(message) {
        document.getElementById("statusMessage").textContent = "";

        document.getElementById("currentWeather").innerHTML = "";

        const box = document.createElement("p");
        box.className = "error-message";
        box.textContent = message;

        document.getElementById("currentWeather").appendChild(box);
        document.getElementById("forecast").replaceChildren();
    },

    temperature(value) {
        const converted = this.currentUnit === "C"
            ? value
            : (value * 9 / 5) + 32;

        return `${Math.round(converted)}°${this.currentUnit}`;
    },

    iconUrl(icon) {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    },

    displayWeather(data) {
        this.lastData = data;

        const current = data.current;
        const location = data.location;
        const condition = current.weather[0];

        const card = document.createElement("div");
        card.className = "weather-card";

        const heading = document.createElement("h2");
        heading.textContent =
            `${location.name}${location.state ? ", " + location.state : ""}, ${location.country}`;

        const image = document.createElement("img");
        image.className = "weather-icon";
        image.src = this.iconUrl(condition.icon);
        image.alt = condition.description;

        const temperature = document.createElement("p");
        temperature.className = "temperature";
        temperature.textContent = this.temperature(current.main.temp);

        const description = document.createElement("p");
        description.className = "condition";
        description.textContent = condition.description;

        const details = document.createElement("div");
        details.className = "weather-details";

        const values = [
            ["Feels like", this.temperature(current.main.feels_like)],
            ["Humidity", `${current.main.humidity}%`],
            ["Wind", `${current.wind.speed} m/s`],
            ["Pressure", `${current.main.pressure} hPa`]
        ];

        values.forEach(([label, value]) => {
            const detail = document.createElement("div");
            detail.className = "detail";

            const title = document.createElement("span");
            title.textContent = label;

            const result = document.createElement("span");
            result.textContent = value;

            detail.append(title, result);
            details.appendChild(detail);
        });

        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.textContent = "☆ Add to Favorites";
        favoriteButton.addEventListener("click", () => {
            App.toggleFavorite(location.name);
        });

        card.append(
            heading,
            image,
            temperature,
            description,
            details,
            favoriteButton
        );

        document.getElementById("currentWeather").replaceChildren(card);

        document.getElementById("statusMessage").textContent =
            `Weather updated for ${location.name}.`;

        this.displayForecast(data.forecast);
    },

    displayForecast(forecastData) {
        const days = new Map();

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const key = date.toLocaleDateString("en-CA");

            if (!days.has(key)) {
                days.set(key, []);
            }

            days.get(key).push(item);
        });

        const container = document.createElement("div");
        container.className = "forecast-grid";

        [...days.values()].slice(0, 5).forEach(items => {
            const item = items.reduce((best, current) => {
                const bestHour = new Date(best.dt * 1000).getHours();
                const currentHour = new Date(current.dt * 1000).getHours();

                return Math.abs(currentHour - 12) <
                    Math.abs(bestHour - 12) ? current : best;
            });

            const date = new Date(item.dt * 1000);
            const card = document.createElement("article");
            card.className = "forecast-card";

            const day = document.createElement("h3");
            day.textContent = date.toLocaleDateString("en", {
                weekday: "short",
                day: "numeric"
            });

            const icon = document.createElement("img");
            icon.className = "weather-icon";
            icon.src = this.iconUrl(item.weather[0].icon);
            icon.alt = item.weather[0].description;

            const temp = document.createElement("p");
            temp.textContent = this.temperature(item.main.temp);

            const condition = document.createElement("p");
            condition.className = "condition";
            condition.textContent = item.weather[0].description;

            card.append(day, icon, temp, condition);
            container.appendChild(card);
        });

        document.getElementById("forecast").replaceChildren(container);
    },

    displaySuggestions(cities) {
        const list = document.getElementById("suggestions");
        list.replaceChildren();
        list.hidden = cities.length === 0;

        cities.forEach(city => {
            const item = document.createElement("li");
            const button = document.createElement("button");

            button.type = "button";
            button.style.width = "100%";
            button.style.textAlign = "left";
            button.textContent =
                `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;

            button.addEventListener("click", () => {
                document.getElementById("searchInput").value = city.name;
                list.hidden = true;
                App.loadWeather(city.name);
            });

            item.appendChild(button);
            list.appendChild(item);
        });
    },

    renderFavorites(favorites) {
        const container = document.getElementById("favorites");
        container.replaceChildren();

        if (!favorites.length) {
            const message = document.createElement("p");
            message.textContent = "No favorite cities saved yet.";
            container.appendChild(message);
            return;
        }

        favorites.forEach(city => {
            const item = document.createElement("div");
            item.className = "favorite-item";

            const openButton = document.createElement("button");
            openButton.textContent = city;
            openButton.addEventListener("click", () => {
                document.getElementById("searchInput").value = city;
                App.loadWeather(city);
            });

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                App.toggleFavorite(city);
            });

            item.append(openButton, removeButton);
            container.appendChild(item);
        });
    }
};
