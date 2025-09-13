import { useEffect, useState } from "react"
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import CurrentWeatherModal from "./components/CurrentWeatherModal";

function App() {
  const [userInput,setUserInput]=useState();
  const [location,setLocation]=useState()
  const [geoCodingData,setGeoCodingData]=useState();
  const [weatherData,setWeatherData]=useState();
  const [errorMessage,setErrorMessage]=useState();
  const [loading,setLoading]=useState(true);
  
  //This effect is to fetch the cordinates related the the query entered by the user
  useEffect(function(){
async function getLocationCordinates(){
  try{
  if(location){
  const response= await fetch(`https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=10&type=city&format=json&apiKey=96ffd920db094716b8d6c6335a2a863c`)
  const data=await response.json();
  if(!response.ok) throw new Error ('Something went wrong while fetching the cordinates')
  console.log(data.results[0]);
setGeoCodingData(data.results[0]);
  }
  }catch(error){
setErrorMessage(error.message)
  }finally{
    setLoading(false)
  }
}
getLocationCordinates()



  },[location])


  //This effect is related to getting weather data about the given cordinates 
  useEffect(function(){
    async function getWeatherData(){
try{
if(geoCodingData){
  setLoading(true)
  const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoCodingData.lat}&longitude=${geoCodingData.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit`)
  const data=await response.json();
  if(!response.ok){
    throw new Error('Error while finding the Weather data')
  }
  setWeatherData(data)

}
}catch(error){
  setErrorMessage(error.message)
}finally{
  setLoading(false)
}
    } getWeatherData()
  },[geoCodingData])
  
 return (
  <div className="w-full max-w-md px-5 py-4 h-[100vh]">
  <Header />
  <InputBar userInput={userInput} setUserInput={setUserInput} setLocation={setLocation} />
<CurrentWeatherModal />
  </div>
  
 )
}

export default App
