import { useEffect, useMemo, useState } from "react"

function HourlyForecast({hourlyForecast,getWeatherIcon,units}) {
    const [weekDays,setWeekDays]=useState(false);
    
      const [daySelected,setDaySelected]=useState();
      const [temperatureIndexes,setTemperatureIndexes]=useState([])
       const days= useMemo(()=>['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],[])
       //this effect will run initally and will fetch the hourly weather data
       useEffect(function(){
        const curDay=days[new Date().getDay()];
        setDaySelected(curDay);
        console.log('Helo')

       },[days])
       //useEffect to initaially show the data with current day weather hourly
       
       useEffect(function(){
          
        // const curDay=days[new Date().getDay()];
        // setDaySelected(curDay);
        const newTemperatureIndexes=hourlyForecast?.time.reduce((acc,el,index)=>{
    const dayInArray=days[new Date(el).getDay()];
    if(dayInArray===daySelected){
        acc.push(index)
    }
    return acc;
   },[])
   setTemperatureIndexes(newTemperatureIndexes);

    },[daySelected,hourlyForecast?.time,days])
  
    function dayOfTheWeek(){
        const curDay=new Date();
        return days[curDay.getDay()];
    }
    

    //This is the function to hanldle the week days and also it will give us an array that will contain all the indexes of the temperature with respect to the day selected
  function handleWeekDays(event){
const itemSelected=event.target.closest('li');
console.log(itemSelected.textContent)
if(itemSelected){
   
    setDaySelected(itemSelected.textContent)
    setWeekDays(false)

}
  }
  //function to format time from the givnString
  function formatTime(dateString){
    const date=new Date(dateString);
    const formatter=new Intl.DateTimeFormat('en-Us',{
        hour:'numeric',
        hour12:true
    })
    const formattedTime=formatter.format(date);
    return formattedTime
  }
   
    return (
        <>
        <div className="bg-neutral-800 mt-2 rounded-2xl h-[90vh] mb-[5px]  relative md:w-[100%] md:h-[98%]  md:rounded-2xl md:mt-4 md:relative">
    
                <div className="flex justify-between items-start py-4 px-2 ">
                    <h2 className="text-white font-bold mt-2 md:text-sm">Hourly forecast</h2>
                    <div className=" md:px-1 md:py-1 flex gap-1 px-2 py-2 items-center bg-neutral-600 rounded-md z-[50]">
                        {!weekDays ? <>
                        <h2 className="text-white" onClick={()=>setWeekDays(true)}>{daySelected?daySelected:dayOfTheWeek()}</h2>
                        <img src="./assets/images/icon-dropdown.svg" className="w-[10px]" />
                        </>

                   : <ul className="text-white px-5 py-2 z-[5]" onClick={(e)=>handleWeekDays(e)}>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Monday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Tuesday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in" >Wednesday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Thursday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Friday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Saturday</li>
                    <li className="mb-2 hover:bg-neutral-400 hover:px-2 hover:py-0 hover:rounded-md transition-all ease-in">Sunday</li>

                        </ul>}
                    </div>
                    
                </div>
                
            <ul className="px-4 z-[1] md:mb-50  absolute top-[12%] h-[85%]  md:h-[85%] overflow-y-scroll box-border md:box-border scroll-smooth scrollbar-thumb-gray-950 scrollbar-thumb-rounded-lg custom-thumb-size scrollbar-w-1 scrollbar">
                {temperatureIndexes?.map((el,index)=>{
return <li key={index} className="flex items-center justify-between bg-neutral-700 mb-2 px-2 rounded-md md:py-1">
    <div className="flex items-center">
    <img src={getWeatherIcon(hourlyForecast.weather_code[el])} className="w-[18%]" />
    <span className="text-white">{formatTime(hourlyForecast.time[el])}</span>
    </div>
    <div>
    <span className="text-white">{hourlyForecast.temperature_2m[el]}{units?.temperature_2m.slice(0,1)}</span>
    </div>
    
</li>
                })}
            </ul>
           
        </div>
        <div>

        </div>
        </>
    )
}

export default HourlyForecast
