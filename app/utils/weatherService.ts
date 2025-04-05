import axios from 'axios';
import { WeatherData } from '../../types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Get temperature in Celsius
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the city name and try again.');
      } else {
        throw new Error(`Weather service error: ${error.response?.data?.message || error.message}`);
      }
    }
    throw new Error('Failed to fetch weather data');
  }
};