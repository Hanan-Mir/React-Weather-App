import { useEffect, useRef, useState } from "react";
import { ToastContainer,toast } from "react-toastify"
function InputBar({userInput,setUserInput,setLocation,cityResults,setGeoCodingData,setCityResults,loading}) {
    const [viewResults,setViewResults]=useState(true);
    const inputRef=useRef(null)
    //This effect will focus on the input as soon as the app loads
    useEffect(function(){
        if(inputRef.current){
            inputRef.current.focus();
        }
    },[])
    function handleButtonSearch(input){

        console.log(cityResults)
        setLocation(input);
        setViewResults(true)
        if(cityResults){
            setCityResults([]);
        }
    }
    return (
        <div className="w-[100%] flex flex-col items-center mt-8 md:flex md:flex-col md:items-center md:w-[80%]">
            <ToastContainer/>
            <h1 className="text-white font-extrabold  text-5xl w-[90%] mt-3 md:text-center md:w-[90%] md:text-6xl">How's the sky looking today?</h1>
            <div className="md:flex md:gap-2 md:w-[70%] md:mt-[5%]">
            <div className="flex bg-gray-800 px-3 py-3 rounded-md mt-4 w-[100%] md:w-[90%]">
                <img src="./assets/images/icon-search.svg" className="ml-2 mr-2"  />
                <input ref={inputRef} value={userInput ||''} onChange={(e)=>setUserInput(e.target.value)} type="text" placeholder="Search for a place" className="text-white focus:outline-none text-[1.2rem]" />

            </div>
            {cityResults?.length>1 &&viewResults && <ul className="bg-neutral-800 w-[100%] mt-1 px-2 py-2 rounded-lg">{cityResults.map((el,index)=>{
               return <li className="text-white text-[1.2rem] py-2" onClick={()=>{
                setGeoCodingData(el)
                setViewResults(false)
                
            }}>{el.formatted}</li>
            })} </ul>}
            <button disabled={loading}  onClick={()=>userInput?handleButtonSearch(userInput):toast.warn('Please enter the location')} className="bg-blue-700 w-[100%] py-3 rounded-md mt-4 flex items-center justify-center text-white font-medium text-[1.2rem] md:px-4 md:py-2 md:w-[20%]">{loading?<img src="./assets/images/icon-loading.svg" className="animate-spin ml-8" />:'Search'}</button>
        </div>
        </div>
    )
}

export default InputBar
