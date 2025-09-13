import { ToastContainer,toast } from "react-toastify"
function InputBar({userInput,setUserInput,setLocation}) {
    return (
        <div className="w-[100%] flex flex-col items-center mt-8">
            <ToastContainer/>
            <h1 className="text-white font-extrabold text-5xl w-[90%] mt-3">How's the sky looking today?</h1>
            <div className="flex bg-gray-800 px-3 py-3 rounded-md mt-4 w-[100%]">
                <img src="./assets/images/icon-search.svg" className="ml-2 mr-2"  />
                <input onChange={(e)=>setUserInput(e.target.value)} type="text" placeholder="Search for a place" className="text-white focus:outline-none text-[1.2rem]" />

            </div>
            <button onClick={()=>userInput?setLocation(userInput):toast.warn('Please enter the location')} className="bg-blue-700 w-[100%] py-3 rounded-md mt-4 text-white font-medium text-[1.2rem]">Search</button>
        </div>
    )
}

export default InputBar
