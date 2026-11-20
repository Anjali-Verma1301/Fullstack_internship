# Weather Application 🌦️

A responsive weather application that displays current weather conditions and upcoming forecasts for cities around the world. Built using HTML, CSS, and JavaScript with the OpenWeatherMap API.

## Features

- **Current Weather:** View temperature, weather conditions, and weather icons.
- **City Search:** Search for cities by name.
- **Autocomplete:** Get city suggestions while typing.
- **Weather Forecast:** View the upcoming five-day forecast.
- **Temperature Conversion:** Switch between Celsius (°C) and Fahrenheit (°F).
- **Favorites:** Save favorite cities for quick access.
- **Local Storage:** Store favorite cities and cache weather data for ten minutes.
- **Error Handling:** Display helpful messages for invalid cities and API errors.
- **Responsive Design:** Supports desktop and mobile screens.
- **Loading States:** Display feedback while weather data loads.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API
- Fetch API
- Browser Local Storage
- Visual Studio Code

## Project Structure

```text
week4-weather-app/
├── index.html
├── css/
│   ├── style.css
│   ├── weather-icons.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── weatherService.js
│   ├── ui.js
│   ├── storage.js
│   └── config.js
├── assets/
│   ├── icons/
│   └── images/
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser
- Visual Studio Code
- Visual Studio Code Live Server extension
- An OpenWeatherMap account and API key

### Installation

1. Clone or download this repository.
2. Open the `week4-weather-app` folder in Visual Studio Code.
3. Configure your API key in `js/config.js` for local testing.
4. Open `index.html` using Live Server.
5. Search for a city and explore the available weather features.

## API Configuration

This application uses the OpenWeatherMap API for weather information, forecast data, and city geocoding.

Create an account at https://openweathermap.org/ and obtain an API key.

For local testing, configure the key in `js/config.js`:

```javascript
const WEATHER_CONFIG = {
    baseUrl: "https://api.openweathermap.org/data/2.5",
    geoUrl: "https://api.openweathermap.org/geo/1.0",
    apiKey: "YOUR_API_KEY"
};
```

**Security note:** Do not commit a real API key to a public repository. A key used directly in frontend JavaScript is visible to website visitors. For public deployment, use a backend proxy that protects the key or an appropriate alternative API.

## Weather Data and Caching

The application retrieves current weather and forecast information from OpenWeatherMap. Weather results are cached in browser Local Storage for ten minutes to reduce repeated API requests.

Favorite cities are also stored locally in the browser.

## Testing

The following functionality should be tested before submission:

- Search for valid and invalid city names.
- Verify city autocomplete suggestions.
- Switch between Celsius and Fahrenheit.
- Confirm that current weather and forecast information display correctly.
- Add favorite cities and verify persistence after refreshing.
- Check that cached results are reused when available.
- Test the interface at desktop and mobile screen sizes.
- Verify error messages and loading states.

## Future Improvements

- Automatic weather detection using browser geolocation.
- Weather alerts and additional weather details.
- Interactive weather maps.
- Improved API-key protection and production deployment.

## Author

**Anjali Verma**

GitHub: https://github.com/Anjali-Verma1301

## License

This project was developed for educational and internship purposes.
