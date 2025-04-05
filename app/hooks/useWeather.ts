import { useState } from 'react';
import { WeatherData } from '../../types';
import { getWeatherData } from '../utils/weatherService';
import { getCachedData, setCachedData } from '../utils/cacheManager';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check cache first
      const cachedData = getCachedData(city);
      if (cachedData) {
        setWeatherData(cachedData);
        setIsLoading(false);
        return;
      }

      // Fetch new data if not in cache
      const data = await getWeatherData(city);
      setWeatherData(data);
      
      // Cache the data
      setCachedData(city, data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { weatherData, error, isLoading, fetchWeather };
};