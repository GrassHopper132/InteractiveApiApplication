const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather for a specific city.
 * @param {string} city - Name of the city to query
 */
export async function getCurrentWeather(city) {
  if (!city || !city.trim()) {
    throw new Error('City name is required.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=imperial`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check spelling.');
    }
    throw new Error('Failed to retrieve weather data.');
  }

  const data = await response.json();

  return {
    id: data.id,
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    coord: data.coord,
  };
}
