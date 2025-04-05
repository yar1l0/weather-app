'use client';

import { useState } from 'react';
import { MantineProvider, Container, Paper, Title, Center } from '@mantine/core';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMessage from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';

export default function Home() {
  const [city, setCity] = useState<string>('');
  const { weatherData, error, isLoading, fetchWeather } = useWeather();

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  return (
    <MantineProvider>
      <Container size="sm" pt={50}>
        <Paper shadow="md" p="xl" radius="md">
          <Center mb={30}>
            <Title order={1}>Weather App</Title>
          </Center>
          
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          {error && <ErrorMessage message={error} />}
          
          {weatherData && !error && (
            <WeatherDisplay 
              cityName={city} 
              weatherData={weatherData} 
            />
          )}
        </Paper>
      </Container>
    </MantineProvider>
  );
}