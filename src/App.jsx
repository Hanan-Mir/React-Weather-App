import { useEffect, useState } from "react"
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import CurrentWeatherModal from "./components/CurrentWeatherModal";
import Skeleton from "react-loading-skeleton";
import DailyWeatherForecast from "./components/DailyWeatherForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeatherForeCastSkeleton from "./skeletons/CurrentWeatherForeCastSkeleton";
import DailyWeatherSkeleton from "./skeletons/DailyWeatherSkeleton";
import HourlyForecastSkeleton from "./skeletons/HourlyForecastSkeleton";

function App() {
  const [userInput,setUserInput]=useState();
  const [location,setLocation]=useState()
  const [geoCodingData,setGeoCodingData]=useState();
  const [weatherData,setWeatherData]=useState();
  const [cityResults,setCityResults]=useState();
  const [selectedTemperature,setSelectedTemperature]=useState(true);
  const [selectedWindSpeed,setSelectedWindSpeed]=useState(true);
  const [selectedPrecipitation,setSelectedPrecipitation]=useState(true)
  const [temperatureUnit,setTemperatureUnit]=useState('celsius');
  const [windSpeedUnit,setWindSpeedUnit]=useState('km/h');
  const [precipitationUnit,setPrecipitationUnit]=useState('mm');
  const [errorMessage,setErrorMessage]=useState();
  const [loading,setLoading]=useState(false);
  const weatherCodes={
    '0':'./assets/images/icon-sunny.webp',
    '1':'./assets/images/icon-partly-cloudy.webp',
    '2':'./assets/images/icon-partly-cloudy.webp',
    '3':'./assets/images/icon-partly-cloudy.webp',
    '45':'./assets/images/icon-fog.webp',
    '48':'./assets/images/icon-fog.webp',
    '51':'./assets/images/icon-drizzle.webp',
    '53':'./assets/images/icon-drizzle.webp',
    '55':'./assets/images/icon-drizzle.webp',
    '56':'./assets/images/icon-drizzle.webp',
    '57':'./assets/images/icon-drizzle.webp',
    '61':'./assets/images/icon-rain.webp',
    '63':'./assets/images/icon-rain.webp',
    '65':'./assets/images/icon-rain.webp',
    '66':'./assets/images/icon-rain.webp',
    '67':'./assets/images/icon-rain.webp',
    '71':'./assets/images/icon-snow.webp',
    '73':'./assets/images/icon-snow.webp',
    '75':'./assets/images/icon-snow.webp',
    '77':'./assets/images/icon-snow.webp',
    '80':'./assets/images/icon-rain.webp',
    '81':'./assets/images/icon-rain.webp',
    '82':'./assets/images/icon-rain.webp',
    '85':'./assets/images/icon-snow.webp',
    '86':'./assets/images/icon-snow.webp',
    '95':'./assets/images/icon-storm.webp',
    '99':'./assets/images/icon-storm.webp',
  }
  //function to get the weather code
  function getWeatherIcon(weatherCode){
    
    const iconAddress=weatherCodes[String(weatherCode)];
    
    return iconAddress;
  }
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  

    //Function to get day of the week
    function dayOfTheWeek(date){
        const curDate=new Date(date);
        const weekDayNumber=curDate.getDay();
        return days[weekDayNumber].slice(0,3)
    }
  //This Effect runs on the inital render to get the current location and the current weather of the place
  useEffect(function(){
    let isCancelled=false;
    const getCurrentLocation=()=>{
      return new Promise((resolve,reject)=>{
        if(!navigator.geolocation){
          return reject(new Error('Cannot fetch the geolocation'))
        }
        navigator.geolocation.getCurrentPosition(resolve,reject)
      })
    }
   async function getInitialWeather(){
    setLoading(true)
    try{
const position=await getCurrentLocation();
if(isCancelled) return
const locationPromise=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=96ffd920db094716b8d6c6335a2a863c`)
const weatherPromise=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&timezone=auto${temperatureUnit==='celsius'?'':'&temperature_unit=fahrenheit'}${windSpeedUnit==='km/h'?'':'&wind_speed_unit=mph'}${precipitationUnit==='mm'?'':'&precipitation_unit=inch'}`)
const [locationResponse,weatherResponse]=await Promise.all([locationPromise,weatherPromise])

if(!weatherResponse.ok |!locationResponse.ok){
      throw new Error('Error while finding the weather data')
    }
    const [locationData,weatherData]=await Promise.all([locationResponse.json(),weatherResponse.json()])
  
    console.log(locationData)
console.log(weatherData)
    if(!isCancelled){
      setGeoCodingData(locationData?.features[0].properties);
      setWeatherData(weatherData)
    }
}catch(error){
if(!isCancelled){
  setErrorMessage(error.message)
}
    }finally{
      if(!isCancelled) setLoading(false)
    }
  }getInitialWeather();
  return ()=>{
    isCancelled=true
  }
}

    ,[precipitationUnit,temperatureUnit,windSpeedUnit])
  //This effect is to fetch the coordinates and to get the current weather according to the location
  useEffect(function(){
    if(!location ) return
async function getLocationCordinates(){
  try{
     setLoading(true);
     console.log(location)
   const locationResponse=await fetch(`https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=10&type=city&format=json&apiKey=96ffd920db094716b8d6c6335a2a863c`)
  const locationData=await locationResponse.json();
  console.log(locationData);
  if(!locationResponse.ok) throw new Error ('Something went wrong while fetching the cordinates');
  if(locationData.results.length>1){
    setCityResults(locationData.results);
  }else if(locationData.results.length===1){
 const geoData=locationData.results[0];
 setGeoCodingData(geoData);
 console.log(geoData);
 const weatherResponse=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoData?.lat}&longitude=${geoData?.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&timezone=auto${temperatureUnit==='celsius'?'':'&temperature_unit=fahrenheit'}${windSpeedUnit==='km/h'?'':'&wind_speed_unit=mph'}${precipitationUnit==='mm'?'':'&precipitation_unit=inch'}`)
const weatherData=await weatherResponse.json();
if(!weatherResponse.ok){
    throw new Error('Error while finding the Weather data')
  }
  
  setWeatherData(weatherData)
  }

  
  }catch(error){
setErrorMessage(error.message)
  }finally{
    setLoading(false)
  }
}
getLocationCordinates()



  },[location,temperatureUnit,windSpeedUnit,precipitationUnit])
useEffect(function(){
  if(!geoCodingData || !location) return;
  async function getWeatherForCity(){
    try{
      setLoading(true);
       const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoCodingData.lat}&longitude=${geoCodingData.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&timezone=auto${temperatureUnit==='celsius'?'':'&temperature_unit=fahrenheit'}${windSpeedUnit==='km/h'?'':'&wind_speed_unit=mph'}${precipitationUnit==='mm'?'':'&precipitation_unit=inch'}`);
       if(!weatherResponse.ok){
        throw new Error('Error while finding the data')
       }
       const weatherData=await weatherResponse.json();
       setWeatherData(weatherData)
    }catch(error){
      setErrorMessage(error.message)

    }finally{
      setLoading(false)

    }
  }getWeatherForCity()
},[geoCodingData,location,precipitationUnit,temperatureUnit,windSpeedUnit])

  //This effect is related to getting weather data about the given cordinates 
  

 return (
  <div className="w-full max-w-md px-5 py-4 h-[100vh]">
  <Header selectedTemperature={selectedTemperature} setSelectedTemperature={setSelectedTemperature} selectedWindSpeed={selectedWindSpeed} setSelectedWindSpeed={setSelectedWindSpeed} selectedPrecipitation={selectedPrecipitation} setSelectedPrecipitation={setSelectedPrecipitation} setTemperatureUnit={setTemperatureUnit} setWindSpeedUnit={setWindSpeedUnit} setPrecipitationUnit={setPrecipitationUnit} />
  <InputBar userInput={userInput} setUserInput={setUserInput} setLocation={setLocation} cityResults={cityResults} setGeoCodingData={setGeoCodingData} setCityResults={setCityResults} />
{loading || !weatherData || !geoCodingData ?<CurrentWeatherForeCastSkeleton />:<CurrentWeatherModal weatherData={weatherData} geoCodingData={geoCodingData} loading={loading} weatherIcon={getWeatherIcon} />}
{loading || !weatherData || !geoCodingData?<DailyWeatherSkeleton />:<DailyWeatherForecast dailyForecast={weatherData?.daily} weatherIcon={getWeatherIcon} units={weatherData?.daily_units} dayOfTheWeek={dayOfTheWeek} />}
{loading || !weatherData || !geoCodingData?<HourlyForecastSkeleton /> :<HourlyForecast hourlyForecast={weatherData?.hourly} getWeatherIcon={getWeatherIcon} units={weatherData?.hourly_units} /> }
  </div>
  
 )

}

export default App
