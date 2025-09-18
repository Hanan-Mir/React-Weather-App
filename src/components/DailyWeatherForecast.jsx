import { useEffect, useState } from "react";

function DailyWeatherForecast({dailyForecast,weatherIcon,units,dayOfTheWeek}) {
    const [maxTemp,setMaxTemp]=useState();
    const [minTemp,setMinTemp]=useState();
    const [time,setTime]=useState();
    const [weatherCode,setWeatherCode]=useState();
    

    useEffect(function(){
if(dailyForecast){
    setMaxTemp(dailyForecast.temperature_2m_max)
    setMinTemp(dailyForecast.temperature_2m_min)
    setTime(dailyForecast.time)
    setWeatherCode(dailyForecast.weather_code)
}
    },[dailyForecast])
    return (
        <div className="mt-4">
            <h2 className="text-white">Daily forecast</h2>
            <div className="grid grid-cols-3 gap-2">
                {time?.map((el,index)=>{
                    return (
                        <div className="bg-neutral-800 py-4 px-3 rounded-lg">
                            <div className="flex flex-col items-center">
                            <h2 className="text-white">{dayOfTheWeek(el)}</h2>
                            <img src={weatherIcon(weatherCode[index])} />
                            </div>
                            <div className="flex justify-between">
                                <h2 className="text-white">{Math.round(maxTemp[index])}{units.temperature_2m_max.slice(0,1)}</h2>
                                <h2 className="text-white">{Math.round(minTemp[index])}{units.temperature_2m_min.slice(0,1)}</h2>
                                </div>

                            </div>
                    )
                })}
                
            </div>
            
        </div>
    )
}

export default DailyWeatherForecast
