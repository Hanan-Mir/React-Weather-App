import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function CurrentWeatherModal({weatherData,geoCodingData,loading,weatherIcon}) {
    const [city,setCity]=useState();
    const [country,setCountry]=useState();
    const [temperature,setTemperature]=useState();
    const [unit,setUnit]=useState();
    const [feelsLike,setFeelsLike]=useState();
    const [humidity,setHumidity]=useState();
    const [wind,setWind]=useState();
    const [precipitation,setPrecipitation]=useState();
    const [weatherCode,setWeatherCode]=useState();


    const currentDate=new Date();
    const formatDateObject={
        weekday:'long',
        month:'short',
        year:'numeric',
        day:'numeric'
    }
    useEffect(function(){
    if(weatherData && geoCodingData){
const {city:curCity,country:curCountry}=geoCodingData;
const {temperature_2m:curTemperature,apparent_temperature:curFeelLike,relative_humidity_2m:curRelativeHumidity,wind_speed_10m:curWindSpeed,precipitation:curPrecipitation,weather_code:code}=weatherData.current;
const {current_units:curUnit}=weatherData;
console.log(code)
setCity(curCity);
setCountry(curCountry)
setTemperature(curTemperature)
setUnit(curUnit)
setFeelsLike(curFeelLike);
setHumidity(curRelativeHumidity);
setWind(curWindSpeed)
setPrecipitation(curPrecipitation)
setWeatherCode(code)
    }
    },[geoCodingData,weatherData])
    return (
        <div className="mt-6 px-1 relative z-[-1]">
            <div>
          <img src="./assets/images/bg-today-small.svg" /> 
            <div className="absolute top-[7%] flex flex-col items-center justify-start gap-y-2">
                <h1 className="font-bold text-white text-4xl">{city}, {country}</h1>
                <h2 className="text-white">{currentDate.toLocaleString('en-Us',formatDateObject)}</h2>
            <div className="flex items-center justify-between w-[70%]">
                <img src={weatherIcon(weatherCode)} className="w-[40%]" />
                <h1 className="text-white font-extrabold text-7xl font-dmSans italic">{Math.round(temperature)}{unit?.temperature_2m.slice(0,1)}</h1>
            </div> 
            
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-neutral-800 px-4 py-4 h-[15vh] rounded-xl flex justify-start flex-col ">
                    <h2 className="text-neutral-400">Feels Like</h2>
                    <h2 className="text-white text-[1.6rem] mt-4">
                        {Math.round(feelsLike)} {unit?.apparent_temperature.slice(0,1)}
                        </h2>
                
                </div>
                 <div className="bg-neutral-800 px-4 py-4 h-[15vh] rounded-xl flex justify-start flex-col ">
                    <h2 className="text-neutral-400">Humidity</h2>
                    <h2 className="text-white text-[1.6rem] mt-4">{humidity}{unit?.relative_humidity_2m}</h2>
                </div>
                 <div className="bg-neutral-800 px-4 py-4 h-[15vh] rounded-xl flex justify-start flex-col ">
                    <h2 className="text-neutral-400">Wind</h2>
                    <h2 className="text-white text-[1.6rem] mt-4">{Math.round(wind)} {unit?.wind_speed_10m.replace('/','')}</h2>
                </div>
                 <div className="bg-neutral-800 px-4 py-4 h-[15vh] rounded-xl flex justify-start flex-col ">
                    <h2 className="text-neutral-400">Precipitation</h2>
                    <h2 className="text-white text-[1.6rem] mt-4">{precipitation} {unit?.precipitation}</h2>
                </div>                 
            </div>
            </div>
        </div>
    )
}

export default CurrentWeatherModal
