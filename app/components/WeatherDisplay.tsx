import { Card, Group, Text, Image, Stack, Badge } from '@mantine/core';
import { WeatherData } from '../../types';

interface WeatherDisplayProps {
  cityName: string;
  weatherData: WeatherData;
}

const WeatherDisplay = ({ cityName, weatherData }: WeatherDisplayProps) => {
  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder mt={20} data-testid="weather-card">
      <Card.Section p="md">
        <Group position="apart">
          <Text weight={500} size="lg" data-testid="city-name">
            {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
          </Text>
          <Badge color="blue">
            Updated: {formatDateTime(weatherData.dt)}
          </Badge>
        </Group>
      </Card.Section>

      <Group position="center" mt="md" mb="xs">
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          width={100}
          height={100}
        />
        <Stack spacing={0}>
          <Text size="xl" weight={700} data-testid="temperature">
            {Math.round(weatherData.main.temp)}°C
          </Text>
          <Text transform="capitalize" data-testid="weather-description">
            {weatherData.weather[0].description}
          </Text>
        </Stack>
      </Group>

      <Group position="apart" mt="xl">
        <Text size="sm">Humidity: {weatherData.main.humidity}%</Text>
        <Text size="sm">Wind: {weatherData.wind.speed} m/s</Text>
      </Group>
    </Card>
  );
};

export default WeatherDisplay;