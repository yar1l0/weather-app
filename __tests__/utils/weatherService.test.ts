import axios from 'axios';
import { getWeatherData } from '../../app/utils/weatherService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Weather Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    // Mock data
    const mockWeatherData = {
      name: 'London',
      main: {
        temp: 15.5,
        humidity: 75,
        feels_like: 14.8,
        temp_min: 14.0,
        temp_max: 16.2,
        pressure: 1012
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      wind: {
        speed: 3.6,
        deg: 260
      },
      dt: 1650000000,
      sys: {
        country: 'GB',
        sunrise: 1649999000,
        sunset: 1650049000
      }
    };

    // Setup mock response
    mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

    // Call the function
    const result = await getWeatherData('London');

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/weather'),
      expect.objectContaining({
        params: expect.objectContaining({
          q: 'London',
          units: 'metric'
        })
      })
    );
    expect(result).toEqual(mockWeatherData);
  });

  it('should handle city not found error', async () => {
    // Mock 404 error
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: 'city not found'
        }
      },
      isAxiosError: true
    });

    // Call and expect error
    await expect(getWeatherData('NonExistentCity')).rejects.toThrow(
      'Failed to fetch weather data'
    );
  });

  it('should handle general API errors', async () => {
    // Mock general error
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal server error'
        }
      },
      isAxiosError: true
    });

    // Call and expect error
    await expect(getWeatherData('London')).rejects.toThrow(
      'Failed to fetch weather data'
    );
  });
});