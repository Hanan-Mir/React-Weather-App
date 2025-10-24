import { useEffect, useState } from "react";

function DailyWeatherForecast({dailyForecast,weatherIcon,units,dayOfTheWeek}) {
    
    
console.log(dailyForecast);

    if(!dailyForecast){
        return null;
    }
    

    return (
        <div className="mt-4 md:w-[100%]">
            <h2 className="text-white">Daily forecast</h2>
            <div className="grid grid-cols-3 gap-2 mt-2 md:w-[100%] md:gird md:grid-cols-7">
                {dailyForecast.time?.map((el,index)=>{
                    return (
                        <div role="listItem" key={index} className="bg-neutral-800 py-4 px-3 rounded-lg">
                            <div className="flex flex-col items-center">
                            <h2 role="dayOfTheWeek" className="text-white">{dayOfTheWeek(el)}</h2>
                            <img role="weatherIcon" src={weatherIcon(dailyForecast.weather_code[index])} />
                            </div>
                            <div className="flex justify-between">
                                <h2 data-testid='max-temp' className="text-white">{Math.round(dailyForecast.temperature_2m_max[index])}{units.temperature_2m_max.slice(0,1)}</h2>
                                <h2 data-testid='min-temp' className="text-white">{Math.round(dailyForecast.temperature_2m_min[index])}{units.temperature_2m_min.slice(0,1)}</h2>
                                </div>

                            </div>
                    )
                })}
                
            </div>
            
        </div>
    )
}

export default DailyWeatherForecast
