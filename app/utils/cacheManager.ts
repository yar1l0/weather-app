import { WeatherData } from '../../types';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheItem {
  data: WeatherData;
  timestamp: number;
}

export const getCachedData = (city: string): WeatherData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedItem = localStorage.getItem(cacheKey);
    
    if (!cachedItem) return null;
    
    const { data, timestamp }: CacheItem = JSON.parse(cachedItem);
    const now = new Date().getTime();
    
    // Check if the cache is still valid (less than 5 minutes old)
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    console.error('Error accessing cache:', error);
    return null;
  }
};

export const setCachedData = (city: string, data: WeatherData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheKey = `weather_${city.toLowerCase()}`;
    const cacheItem: CacheItem = {
      data,
      timestamp: new Date().getTime()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};