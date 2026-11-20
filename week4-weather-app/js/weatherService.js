
const WeatherService = {
    async request(url) {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(
                    "Invalid API key or the key is not active yet."
                );
            }

            if (response.status === 404) {
                throw new Error("City not found. Try another city.");
            }

            if (response.status === 429) {
                throw new Error(
                    "API request limit reached. Please try again later."
                );
            }

            throw new Error(
                `Weather service error (${response.status}).`
            );
        }

        return response.json();
    },

    async searchCities(query) {
        const url =
            `${WEATHER_CONFIG.geoUrl}/direct` +
            `?q=${encodeURIComponent(query)}` +
            `&limit=5&appid=${WEATHER_CONFIG.apiKey}`;

        return this.request(url);
    },

    async getWeather(city) {
        const cacheKey = `city_${city.toLowerCase()}`;
        const cached = StorageService.getCache(cacheKey);

        if (cached) {
            return cached;
        }

        const cities = await this.searchCities(city);

        if (!cities.length) {
            throw new Error("City not found. Try another city.");
        }

        const selectedCity = cities[0];

        const location = {
            name: selectedCity.name,
            country: selectedCity.country,
            state: selectedCity.state || "",
            lat: selectedCity.lat,
            lon: selectedCity.lon
        };

        const query =
            `lat=${location.lat}&lon=${location.lon}` +
            `&units=metric&appid=${WEATHER_CONFIG.apiKey}`;

        const [current, forecast] = await Promise.all([
            this.request(
                `${WEATHER_CONFIG.baseUrl}/weather?${query}`
            ),
            this.request(
                `${WEATHER_CONFIG.baseUrl}/forecast?${query}`
            )
        ]);

        const result = { location, current, forecast };

        StorageService.setCache(cacheKey, result);

        return result;
    },

    async getSuggestions(query) {
        if (query.trim().length < 2) {
            return [];
        }

        return this.searchCities(query.trim());
    }
};
