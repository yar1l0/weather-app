import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../../app/components/WeatherDisplay';

describe('WeatherDisplay', () => {
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

  it('should render weather information correctly', () => {
    render(<WeatherDisplay cityName="london" weatherData={mockWeatherData} />);
    
    // Check if city name is displayed correctly
    expect(screen.getByTestId('city-name')).toHaveTextContent('London');
    
    // Check if temperature is displayed correctly
    expect(screen.getByTestId('temperature')).toHaveTextContent('16°C'); // rounded from 15.5
    
    // Check if weather description is displayed
    expect(screen.getByTestId('weather-description')).toHaveTextContent('clear sky');
    
    // Check if weather card is present
    expect(screen.getByTestId('weather-card')).toBeInTheDocument();
    
    // Check for additional weather information
    expect(screen.getByText(/Humidity: 75%/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 3.6 m\/s/)).toBeInTheDocument();
  });
});