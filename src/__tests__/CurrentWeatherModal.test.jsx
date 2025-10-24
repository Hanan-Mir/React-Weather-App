import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import CurrentWeatherModal from "../components/CurrentWeatherModal";


describe("These test cases are related to the current weather modal", () => {
  const mockWeatherData = {
    current: {
      temperature_2m: 25,
      relative_humidity_2m: 45,
      wind_speed_10m: 10,
      weather_code: 1,
      apparent_temperature: 26,
      precipitation:0
    },
    current_units:{
        time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    wind_speed_10m: "kmh",
    precipitation: "mm",
    weather_code: "wmo code",
    apparent_temperature: "°C",

    },
    daily: {},
    hourly: {},
  };
  const mockGeoCodingData = {
    city: "Test",
    country: "Test",
  };
  function mockWeatherIcon(weatherCode) {
    if (weatherCode === 1) {
      return "./assets/images/icon-sunny.webp";
    }
  }
  const MOCK_DATE = new Date("2025-12-25T12:00:00.000Z");
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_DATE);
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  test("Should display the date in the format(weekDay,Day Month Year)", () => {
    render(
      <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const expectedText = "Thursday, Dec 25, 2025";
    const dateElement = screen.getByTestId("date-display");
    expect(dateElement).toHaveTextContent(expectedText);
  });
  test("tests the location is present correctly or not", () => {
    render(
      <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const locationElement = screen.getByTestId("location");
    const expectedLocation = `${mockGeoCodingData.city}, ${mockGeoCodingData.country}`;
    expect(locationElement).toHaveTextContent(expectedLocation);
  });
  test("test weather the temperature is present or not ", () => {
    render(
    
      <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const temperatureElement = screen.getByTestId("currentTemperature");
    const expectedResult=`${mockWeatherData.current.temperature_2m}${mockWeatherData.current_units.temperature_2m.slice(0,1)}`
    expect(temperatureElement).toHaveTextContent(expectedResult);
  });
  test('test wheather the current weather icon is present there or not',()=>{
     render(
    <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const iconElement=screen.getByTestId('currentWeatherIcon');
    expect(iconElement).toBeInTheDocument();
    const curWeatherIcon=mockWeatherIcon(mockWeatherData.current.weather_code);
    expect(iconElement).toHaveAttribute('src',curWeatherIcon)
  })
  test('test wheather feels like is present there or not',()=>{
     render(
    <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const feelsLikeEl=screen.getByTestId('feels-like');
    const feelsLikeValue=`${mockWeatherData.current.apparent_temperature} ${mockWeatherData.current_units.apparent_temperature.slice(0,1)}`;
    expect(feelsLikeEl).toHaveTextContent(feelsLikeValue);
  })
   test('test wheather humidity is present there or not',()=>{
     render(
    <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const humidityEl=screen.getByTestId('humidity');
    const humidityValue=`${mockWeatherData.current.relative_humidity_2m}${mockWeatherData.current_units.relative_humidity_2m}`;
    expect(humidityEl).toHaveTextContent(humidityValue);
  })
   test('test wheather wind is present there or not',()=>{
     render(
    <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const windEl=screen.getByTestId('wind');
    const windValue=`${mockWeatherData.current.wind_speed_10m} ${mockWeatherData.current_units.wind_speed_10m}`;
    expect(windEl).toHaveTextContent(windValue);
  })

   test('test wheather precipitation is present there or not',()=>{
     render(
    <CurrentWeatherModal
        weatherData={mockWeatherData}
        geoCodingData={mockGeoCodingData}
        weatherIcon={mockWeatherIcon}
      />
    );
    const precipitationEl=screen.getByTestId('precipitation');
    const precipitationValue=`${mockWeatherData.current.precipitation} ${mockWeatherData.current_units.precipitation}`;
    expect(precipitationEl).toHaveTextContent(precipitationValue);
  })

});
