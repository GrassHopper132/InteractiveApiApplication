import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeather } from '../services/weatherApi';

/**
 * Custom React Hook for fetching and managing weather data state.
 * @param {string} initialCity - Optional city to query automatically on mount.
 */
export function useWeather(initialCity = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getCurrentWeather(cityName);
      setData(weatherData);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCity) {
      fetchWeather(initialCity);
    }
  }, [initialCity, fetchWeather]);

  return { data, loading, error, fetchWeather };
}
