import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import CurrentWeatherModal from "./components/CurrentWeatherModal";
import Skeleton from "react-loading-skeleton";
import DailyWeatherForecast from "./components/DailyWeatherForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeatherForeCastSkeleton from "./skeletons/CurrentWeatherForeCastSkeleton";
import DailyWeatherSkeleton from "./skeletons/DailyWeatherSkeleton";
import HourlyForecastSkeleton from "./skeletons/HourlyForecastSkeleton";
import Error from "./components/Error";
import NoResults from "./components/NoResults";

function App() {
  const [userInput, setUserInput] = useState();
  const [location, setLocation] = useState();
  const [geoCodingData, setGeoCodingData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [cityResults, setCityResults] = useState();
  const [selectedTemperature, setSelectedTemperature] = useState(true);
  const [selectedWindSpeed, setSelectedWindSpeed] = useState(true);
  const [selectedPrecipitation, setSelectedPrecipitation] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState("km/h");
  const [precipitationUnit, setPrecipitationUnit] = useState("mm");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [noResults,setNoResults]=useState(false)
  const weatherCodes = {
    0: "./assets/images/icon-sunny.webp",
    1: "./assets/images/icon-partly-cloudy.webp",
    2: "./assets/images/icon-partly-cloudy.webp",
    3: "./assets/images/icon-partly-cloudy.webp",
    45: "./assets/images/icon-fog.webp",
    48: "./assets/images/icon-fog.webp",
    51: "./assets/images/icon-drizzle.webp",
    53: "./assets/images/icon-drizzle.webp",
    55: "./assets/images/icon-drizzle.webp",
    56: "./assets/images/icon-drizzle.webp",
    57: "./assets/images/icon-drizzle.webp",
    61: "./assets/images/icon-rain.webp",
    63: "./assets/images/icon-rain.webp",
    65: "./assets/images/icon-rain.webp",
    66: "./assets/images/icon-rain.webp",
    67: "./assets/images/icon-rain.webp",
    71: "./assets/images/icon-snow.webp",
    73: "./assets/images/icon-snow.webp",
    75: "./assets/images/icon-snow.webp",
    77: "./assets/images/icon-snow.webp",
    80: "./assets/images/icon-rain.webp",
    81: "./assets/images/icon-rain.webp",
    82: "./assets/images/icon-rain.webp",
    85: "./assets/images/icon-snow.webp",
    86: "./assets/images/icon-snow.webp",
    95: "./assets/images/icon-storm.webp",
    99: "./assets/images/icon-storm.webp",
  };
  //function to get the weather code
  function getWeatherIcon(weatherCode) {
   
    const iconAddress = weatherCodes[String(weatherCode)];
  

    return iconAddress;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //Function to get day of the week
  function dayOfTheWeek(date) {
    const curDate = new Date(date);
    const weekDayNumber = curDate.getDay();
    return days[weekDayNumber].slice(0, 3);
  }
  //function to get the current position
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject( new Error("Cannot fetch the current location"));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  //Optimization function for getting the location and the weather data
  const getWeatherAndLocation=useCallback(async (lat, lng)=> {
    if(!navigator.onLine){
      throw new Error('No internet connection')
    }
    try {
      const locationPromise = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=96ffd920db094716b8d6c6335a2a863c`
      );
      const weatherPromise = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&timezone=auto${
          temperatureUnit === "celsius" ? "" : "&temperature_unit=fahrenheit"
        }${windSpeedUnit === "km/h" ? "" : "&wind_speed_unit=mph"}${
          precipitationUnit === "mm" ? "" : "&precipitation_unit=inch"
        }`
      );
      const [locationResponse, weatherResponse] = await Promise.all([
        locationPromise,
        weatherPromise,
      ]);
      if (!weatherResponse.ok || !locationResponse.ok) {
        setErrorMessage(`we couldn't connect to the server(API error).Please try again in a few moments.`)
     return;
      }
      const [locationData, weatherData] = await Promise.all([
        locationResponse.json(),
        weatherResponse.json(),
      ]);
      return { locationData, weatherData };
    } catch (error) {
      if (!navigator.onLine) {
        console.log(error);
        throw new Error("No Internet connection");
      }
      throw error
    }
  })
  //function for initial loading of data
   const getInitialWeather=useCallback(async ()=> {
    if(!navigator.onLine){
      throw new Error('No internet connection')
    }
      let isCancelled = false;
        setErrorMessage(null);
        setLoading(true);
        try {
          const position = await getCurrentLocation();
          console.log(position);
          //if (isCancelled) return;
          const result=await getWeatherAndLocation(position.coords.latitude,position.coords.longitude)
          if(!result) return
          const { locationData, weatherData } = result;

          console.log(locationData);
          console.log(weatherData);
          if (!isCancelled) {
            setGeoCodingData(locationData?.features[0].properties);
            setWeatherData(weatherData);
          }
        } catch (error) {
          if (
            error instanceof TypeError &&
            error.message === "Failed to fetch"
          ) {
            setErrorMessage(
              "There appears an error in the fetching of data from the API.Try Again"
            );
          }
          else {
            console.log(error.message);
            setErrorMessage(error.message);
          }
        } finally {
          if (!isCancelled) setLoading(false);
        }
      })
  //  This effect is related with the internet connection of the browser
const getDataForLocation=useCallback(async()=> {
        setLoading(true);
        setErrorMessage(null);
        if(!navigator.onLine){
          throw new Error('No internet connection')
        }
        try {
          const locationResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=10&type=city&format=json&apiKey=96ffd920db094716b8d6c6335a2a863c`
          );
          const locationData = await locationResponse.json();
          console.log(locationResponse);
          if (!locationResponse.ok){
            setErrorMessage(`we couldn't connect to the server(API error).Please try again in a few moments.`)
          return;
          }
          
          if (locationData?.results.length === 0 || !locationData.results) {
            console.log("my new error");
            setNoResults(true)

        
          }
          if (locationData.results.length > 1) {
            setCityResults(locationData.results);
            setNoResults(false)
            setLoading(false);
            return;
          } else if (locationData.results.length === 1) {
            setNoResults(false)
            const geoData = locationData.results[0];
            setGeoCodingData(geoData);
            setCityResults(null);
            const { weatherData: newWeatherData } = await getWeatherAndLocation(
              geoData.lat,
              geoData.lon
            );

            setWeatherData(newWeatherData);
          }
        } catch (error) {
          setWeatherData(null);
          setGeoCodingData(null);
          setCityResults(null);
          if (
            error instanceof TypeError &&
            error.message === "Failed to fetch"
          ) {
            setErrorMessage(
              "There appears an error in the fetching of data from the api."
            );
          }
          
           else {
            if(error instanceof Error){
              console.log('catch block error:',error.message)
              setErrorMessage(error.message)
            }else{
              console.log(error)
              setErrorMessage(String(error.message));

            }
            
          }
        } finally {
          setLoading(false);
        }
      })
  //This Effect runs on the inital render to get the current location and the current weather of the place
  useEffect(
    function () {
      if (location) return;
     getInitialWeather();
    },

    [location, precipitationUnit, windSpeedUnit, temperatureUnit]
  );

  //This effect is to fetch the coordinates and to get the current weather according to the location
  useEffect(
    function () {
      if (!location) return;
      getDataForLocation();
    },

    [location, temperatureUnit, windSpeedUnit, precipitationUnit]
  );

  //This useEffect will run when offline and online status
  useEffect(function(){
    const handleOnline=()=>{
      setIsOnline(true);
      setErrorMessage(null);
      setLoading(true)
     setTimeout(async()=>{
    
      try{
          if(!navigator.onLine) return;
if(!location){
        getInitialWeather()
      }else{
        getDataForLocation();
      }
    }catch(error){
      console.log(error);
      setErrorMessage(error.message)
    }

     },5000) 
    } 
    function handleOffline(){
      setIsOnline(false);
      setErrorMessage('Please check your internet connection. You appear to be offline')
    }
    window.addEventListener('online',handleOnline);
    window.addEventListener('offline',handleOffline)
    return ()=>{
      window.removeEventListener('online',handleOnline);
      window.removeEventListener('offline',handleOffline);
    }
  },[location,getInitialWeather,getDataForLocation])


  return (
    <div className="w-full max-w-md px-5 py-4 md:max-w-full md:w-full md:flex md:flex-col md:items-center md:pb-19">
      <Header
        selectedTemperature={selectedTemperature}
        setSelectedTemperature={setSelectedTemperature}
        selectedWindSpeed={selectedWindSpeed}
        setSelectedWindSpeed={setSelectedWindSpeed}
        selectedPrecipitation={selectedPrecipitation}
        setSelectedPrecipitation={setSelectedPrecipitation}
        setTemperatureUnit={setTemperatureUnit}
        setWindSpeedUnit={setWindSpeedUnit}
        setPrecipitationUnit={setPrecipitationUnit}
      />
      {errorMessage ? (
        <Error errorMessage={errorMessage} getInitialWeather={getInitialWeather} />
      ) : (
        <>
          {" "}
          <InputBar
            userInput={userInput}
            setUserInput={setUserInput}
            setLocation={setLocation}
            cityResults={cityResults}
            setGeoCodingData={setGeoCodingData}
            setCityResults={setCityResults}
            loading={loading}
          />
        {noResults?<NoResults />  :<div className="md:flex md:flex-row md:justify-start md:gap-3 md:w-[80%]">
            <div className="md:w-[70%]">
              {loading || !weatherData || !geoCodingData ? (
                <CurrentWeatherForeCastSkeleton />
              ) : (
                <CurrentWeatherModal
                  weatherData={weatherData}
                  geoCodingData={geoCodingData}
                  loading={loading}
                  weatherIcon={getWeatherIcon}
                />
              )}
              {loading || !weatherData || !geoCodingData ? (
                <DailyWeatherSkeleton />
              ) : (
                <DailyWeatherForecast
                  dailyForecast={weatherData?.daily}
                  weatherIcon={getWeatherIcon}
                  units={weatherData?.daily_units}
                  dayOfTheWeek={dayOfTheWeek}
                />
              )}
            </div>
            <div className="md:w-[30%]">
              {loading || !weatherData || !geoCodingData ? (
                <HourlyForecastSkeleton />
              ) : (
                <HourlyForecast
                  hourlyForecast={weatherData?.hourly}
                  getWeatherIcon={getWeatherIcon}
                  units={weatherData?.hourly_units}
                />
              )}
            </div>
          </div>}
        </>
      )}
    </div>
  );
}

export default App;
