
const StorageService = {
    CACHE_DURATION: 10 * 60 * 1000,

    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("Could not save browser data:", error);
        }
    },

    getCache(key) {
        const cached = this.get("weather_cache_" + key);

        if (
            cached &&
            Date.now() - cached.timestamp < this.CACHE_DURATION
        ) {
            return cached.data;
        }

        return null;
    },

    setCache(key, data) {
        this.set("weather_cache_" + key, {
            data,
            timestamp: Date.now()
        });
    },

    getFavorites() {
        return this.get("weather_favorites") || [];
    },

    saveFavorites(favorites) {
        this.set("weather_favorites", favorites);
    }
};
