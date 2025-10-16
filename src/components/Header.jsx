import { useState } from "react";
import React from "react";

function Header({selectedTemperature,setSelectedTemperature,selectedWindSpeed,setSelectedWindSpeed,selectedPrecipitation,setSelectedPrecipitation,setTemperatureUnit,setWindSpeedUnit,setPrecipitationUnit}) {
    const [viewDropDown,setViewDropDown]=useState(false);
  
    
    //This function sets the drop down of for the units functionality
    function handleDropDown(){
setViewDropDown(curState=>!curState)
    }
    function handleOptionClick(setter,value,booleanSetter){
      setter(value);
      handleDropDown();
      booleanSetter(cur=>!cur)
    }
  return (
    <div className="relative md:w-[80%] md:relative">
      <div className="flex justify-between">
        <img src="./assets/images/logo.svg" alt="App logo" className="w-[50%] md:w-[20%]" />
        <div role="button" aria-label="dropDownButton" className="flex items-center bg-[hsl(243,23%,30%)] px-2 py-1 rounded-lg " onClick={()=>handleDropDown()}>
          <img src="./assets/images/icon-units.svg" className="w-[30%]" />
          <span className="text-white font-dmSans ml-1 mr-1 font-semibold">
            Units
          </span>
          <img src="./assets/images/icon-dropdown.svg" className="w-[30%]" />
        </div>
      </div>
      <div role="dropdown" aria-label="unitConversionDropDown"  className={`bg-[hsl(243,23%,30%)] w-[54%] md:w-[20%] md:absolute md:left-[77%]  rounded-lg px-4 py-4 font-dmSans absolute left-[46%] top-[110%] md:z-[10] transition-all ease-in ${viewDropDown?'block':'hidden'} `}>
        <h2 className="text-white font-medium">Switch to Imperial</h2>
        <div className="flex flex-col">
          <h2 className="text-neutral-500 mt-3">Temperature</h2>
          <h2 data-testid='celsius' className="text-white mt-3 font-medium flex justify-between items-center transition-all ease-in hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>{
            handleOptionClick(setTemperatureUnit,'celsius',setSelectedTemperature)
          }
            
            }>
            <span >Celsius(&#8451;)</span>
            {selectedTemperature &&<img src='./assets/images/icon-checkmark.svg' />}
            </h2>
          <span data-testid='fahrenheit' className="transition-all ease-in font-medium text-white mt-3 pb-3 border-b-1 border-b-neutral-500 flex justify-between items-center hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>{
            handleOptionClick(setTemperatureUnit,'fahrenheit',setSelectedTemperature)
            }}>
            <h2>Fahrenheit(&#8457;)</h2>
            {!selectedTemperature &&<img src='./assets/images/icon-checkmark.svg' />}
          </span>
        </div>
        <div className="flex flex-col">
          <h2 data-testid='kmh' className="text-neutral-500">Wind Speed</h2>
          <span className="text-white mt-3 transition-all ease-in font-medium flex justify-between items-center hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>{
           handleOptionClick(setWindSpeedUnit,'kmh',setSelectedWindSpeed)
            }}>
           <h2>Km/h</h2>
           { selectedWindSpeed &&  <img src='./assets/images/icon-checkmark.svg' /> }
            </span>
          <span data-testid='mph' className="text-white transition-all ease-in mt-3 pb-2 border-b-1 font-medium border-b-neutral-500 flex justify-between items-center hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>
            {
              handleOptionClick(setWindSpeedUnit,'mph',setSelectedWindSpeed)
            }}>
        <h2>mph</h2>
          {!selectedWindSpeed &&  <img src='./assets/images/icon-checkmark.svg' /> }
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-neutral-500">precipitation</h2>
          <span data-testid='mm' className="text-white transition-all ease-in mt-3 font-medium flex items-center justify-between hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>{
          handleOptionClick(setPrecipitationUnit,'mm',setSelectedPrecipitation)
            }}>
            <h2>Millimeter(mm)</h2>
          {selectedPrecipitation &&   <img src='./assets/images/icon-checkmark.svg' />}

            </span>
          <span data-testid='inch' className="text-white transition-all ease-in mt-3 pb-2 font-medium flex items-center justify-between hover:bg-neutral-400 hover:rounded-lg border-2 border-transparent py-2 px-2" onClick={()=>{
          handleOptionClick(setPrecipitationUnit,'inch',setSelectedPrecipitation)
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
