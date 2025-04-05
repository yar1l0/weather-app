import { getCachedData, setCachedData } from '../../app/utils/cacheManager';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Cache Manager', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('should store data in cache', () => {
    setCachedData('London', mockWeatherData);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'weather_london',
      expect.any(String)
    );
    
    const storedValue = localStorageMock.getItem('weather_london');
    const parsedValue = JSON.parse(storedValue!);
    
    expect(parsedValue.data).toEqual(mockWeatherData);
    expect(parsedValue.timestamp).toBeDefined();
  });

  it('should retrieve valid cached data', () => {
    // Set up mock data with current timestamp (fresh cache)
    const cacheItem = {
      data: mockWeatherData,
      timestamp: new Date().getTime()
    };
    
    localStorageMock.setItem('weather_london', JSON.stringify(cacheItem));
    
    // Retrieve data
    const cachedData = getCachedData('London');
    
    expect(cachedData).toEqual(mockWeatherData);
  });

  it('should return null for expired cache', () => {
    // Set up mock data with old timestamp (expired cache)
    const cacheItem = {
      data: mockWeatherData,
      timestamp: new Date().getTime() - (6 * 60 * 1000) // 6 minutes ago (expired)
    };
    
    localStorageMock.setItem('weather_london', JSON.stringify(cacheItem));
    
    // Retrieve data
    const cachedData = getCachedData('London');
    
    expect(cachedData).toBeNull();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('weather_london');
  });

  it('should return null when no cache exists', () => {
    const cachedData = getCachedData('Paris');
    expect(cachedData).toBeNull();
  });
});