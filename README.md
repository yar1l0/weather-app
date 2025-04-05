# Weather App

A modern weather application built with Next.js, React, TypeScript, and Mantine UI.

## Features

- Search weather by city name
- Display current temperature, description, and weather icon
- Caching mechanism to reduce API calls
- Responsive design
- Error handling for invalid requests
- Unit tests for key components

## Technologies Used

- Next.js 13 (App Router)
- React 18
- TypeScript
- Mantine UI
- Axios
- Jest and React Testing Library


### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the root directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Running Tests

```bash
npm test
# or
yarn test
```

## API Integration

This app uses the OpenWeatherMap API to fetch weather data. You need to [sign up](https://openweathermap.org/api) for a free API key to use this application.

## Caching

The application implements a caching mechanism that stores weather data in localStorage for 5 minutes to reduce API calls.