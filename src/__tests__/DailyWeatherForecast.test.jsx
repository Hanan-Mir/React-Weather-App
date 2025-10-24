import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import DailyWeatherForecast from "../components/DailyWeatherForecast";


describe('These test cases are related to the DailyWeatherForecase component of the app',()=>{
    
    const mockGetDayOfTheWeek=vi.fn((date)=>{
        return new Date(date).toLocaleDateString('en-US',{weekday:'short'})
    });
    const mockWeatherIcon=vi.fn((weatherCode)=> {
    if (weatherCode === 1) {
      return "./assets/images/icon-sunny.webp";
    }
  })
    const mockWeatherData={
        current:{},
        current_units:{},
       daily: {
    time: [
        "2025-10-19",
        "2025-10-20",
        "2025-10-21",
        "2025-10-22",
        "2025-10-23",
        "2025-10-24",
        "2025-10-25"
    ],
    weather_code: [
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ],
    temperature_2m_max: [
        24,
        23.8,
        19.2,
        20,
        21.5,
        21.6,
        22.2
    ],
    temperature_2m_min: [
        10,
        10.6,
        11.2,
        9.1,
        8.6,
        8.7,
        8.5
    ]
},
 daily_units:{
    time: "iso8601",
    weather_code: "wmo code",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C"
}
   }
   test('tests weather all the days of the week are listed',async()=>{
render(<DailyWeatherForecast dailyForecast={mockWeatherData.daily} weatherIcon={mockWeatherIcon} units={mockWeatherData.daily_units} dayOfTheWeek={mockGetDayOfTheWeek} />)
const listItems=screen.getAllByRole('listItem');
expect(listItems).toHaveLength(mockWeatherData.daily.time.length)   
})
test('tests weather all the days of the week are present',()=>{
    render(<DailyWeatherForecast dailyForecast={mockWeatherData.daily} weatherIcon={mockWeatherIcon} units={mockWeatherData.daily_units} dayOfTheWeek={mockGetDayOfTheWeek} />)
expect(mockGetDayOfTheWeek).toHaveBeenCalled(mockWeatherData.daily.time.length);
expect(mockWeatherIcon).toHaveBeenCalled(mockWeatherData.daily.weather_code.length)
const weekDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

weekDays.forEach(day=>{
    const dayElement=screen.getByText(day);
    expect(dayElement).toBeInTheDocument()
})
})
test('tests weather icons are present in the card',()=>{
       render(<DailyWeatherForecast dailyForecast={mockWeatherData.daily} weatherIcon={mockWeatherIcon} units={mockWeatherData.daily_units} dayOfTheWeek={mockGetDayOfTheWeek} />)
       expect(mockWeatherIcon).toHaveBeenCalled(mockWeatherData.daily.weather_code.length);
       const weatherEl=screen.queryAllByRole('weatherIcon');
       const weatherIcon=mockWeatherIcon(mockWeatherData.daily.weather_code[0]);
    expect(weatherEl[0]).toHaveAttribute('src',weatherIcon)

})
test('tests weather max temperature present in the card',()=>{
       render(<DailyWeatherForecast dailyForecast={mockWeatherData.daily} weatherIcon={mockWeatherIcon} units={mockWeatherData.daily_units} dayOfTheWeek={mockGetDayOfTheWeek} />)
       const maxEl=screen.getAllByTestId('max-temp')
       const expectedText=`${mockWeatherData.daily.temperature_2m_max[0]}${mockWeatherData.daily_units.temperature_2m_max.slice(0,1)}`
       expect(maxEl[0]).toHaveTextContent(expectedText)
})
test('tests weather min temperature present in the card',()=>{
       render(<DailyWeatherForecast dailyForecast={mockWeatherData.daily} weatherIcon={mockWeatherIcon} units={mockWeatherData.daily_units} dayOfTheWeek={mockGetDayOfTheWeek} />)
       const maxEl=screen.getAllByTestId('min-temp')
       const expectedText=`${mockWeatherData.daily.temperature_2m_min[0]}${mockWeatherData.daily_units.temperature_2m_min.slice(0,1)}`
       expect(maxEl[0]).toHaveTextContent(expectedText)
})
})