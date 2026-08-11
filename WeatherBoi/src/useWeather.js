import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherApi';

export function useWeather(initialCity = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCurrentWeather(cityName);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCity) {
      fetchWeather(initialCity);
    }
  }, [initialCity]);

  return { data, loading, error, fetchWeather };
}
