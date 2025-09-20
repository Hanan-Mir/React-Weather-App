import { useState } from "react";

function Header({selectedTemperature,setSelectedTemperature,selectedWindSpeed,setSelectedWindSpeed,selectedPrecipitation,setSelectedPrecipitation,setTemperatureUnit,setWindSpeedUnit,setPrecipitationUnit}) {
    const [viewDropDown,setViewDropDown]=useState(false);
  
    
    //This function sets the drop down of for the units functionality
    function handleDropDown(){
setViewDropDown(curState=>!curState)
    }
  return (
    <div className="relative">
      <div className="flex justify-between" onClick={()=>handleDropDown()}>
        <img src="./assets/images/logo.svg" className="w-[50%]" />
        <div className="flex items-center bg-[hsl(243,23%,30%)] px-2 py-1 rounded-lg ">
          <img src="./assets/images/icon-units.svg" className="w-[30%]" />
          <span className="text-white font-dmSans ml-1 mr-1 font-semibold">
            Units
          </span>
          <img src="./assets/images/icon-dropdown.svg" className="w-[30%]" />
        </div>
      </div>
      <div className={`bg-[hsl(243,23%,30%)] w-[54%] rounded-lg px-4 py-4 font-dmSans absolute left-[46%] top-[110%] ${viewDropDown?'block':'hidden'}`}>
        <h2 className="text-white font-medium">Switch to Imperial</h2>
        <div className="flex flex-col">
          <h2 className="text-neutral-500 mt-3">Temperature</h2>
          <h2 className="text-white mt-3 font-medium flex justify-between items-center" onClick={()=>
            {setSelectedTemperature((curStatus)=>!curStatus)
              setTemperatureUnit('celsius');
              handleDropDown();
            }
            
            }>
            <span>Celsius(&#8451;)</span>
            {selectedTemperature &&<img src='./assets/images/icon-checkmark.svg' />}
            </h2>
          <span className="font-medium text-white mt-3 pb-2 border-b-1 border-b-neutral-500 flex justify-between items-center" onClick={()=>{
            setSelectedTemperature((curStatus)=>!curStatus)
             setTemperatureUnit('fahrenheit');
             handleDropDown();
            }}>
            <h2>Fahrenheit(&#8457;)</h2>
            {!selectedTemperature &&<img src='./assets/images/icon-checkmark.svg' />}
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-neutral-500">Wind Speed</h2>
          <span className="text-white mt-3 font-medium flex justify-between items-center" onClick={()=>{
            setSelectedWindSpeed((curStatus)=>!curStatus)
            setWindSpeedUnit('km/h');
            handleDropDown();
            }}>
           <h2>Km/h</h2>
           { selectedWindSpeed &&  <img src='./assets/images/icon-checkmark.svg' /> }
            </span>
          <span className="text-white mt-3 pb-2 border-b-1 font-medium border-b-neutral-500 flex justify-between items-center" onClick={()=>
            {setSelectedWindSpeed((curStatus)=>!curStatus)
              setWindSpeedUnit('mph');
              handleDropDown();
            }}>
        <h2>mph</h2>
          {!selectedWindSpeed &&  <img src='./assets/images/icon-checkmark.svg' /> }
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-neutral-500">precipitation</h2>
          <span className="text-white mt-3 font-medium flex items-center justify-between" onClick={()=>{
            setSelectedPrecipitation((curStatus)=>!curStatus)
            setPrecipitationUnit('mm');
            handleDropDown()
            }}>
            <h2>Millimeter(mm)</h2>
          {selectedPrecipitation &&   <img src='./assets/images/icon-checkmark.svg' />}

            </span>
          <span className="text-white mt-3 pb-2 font-medium flex items-center justify-between" onClick={()=>{
            setSelectedPrecipitation((curStatus)=>!curStatus)
            setPrecipitationUnit('inch');
            handleDropDown();
            }}>
            <h2>Inches(in)</h2>
            {!selectedPrecipitation && <img src='./assets/images/icon-checkmark.svg' />}
            </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
