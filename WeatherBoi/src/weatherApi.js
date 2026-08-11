const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a specified city using OpenWeather API.
 * @param {string} city - The city name to search for.
 * @returns {Promise<Object>} Processed weather data object.
 */
export async function getCurrentWeather(city) {
  if (!city || !city.trim()) {
    throw new Error('Please enter a valid city name.');
  }

  const endpoint = `${BASE_URL}/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=imperial`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check your spelling.');
    }
    if (response.status === 401) {
      throw new Error('Invalid API Key. Please verify your .env file setup.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }

  const data = await response.json();

  // Return a clean, formatted object for components to consume
  return {
    id: data.id,
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    coordinates: data.coord,
  };
}
