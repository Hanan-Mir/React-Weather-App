

function Error({errorMessage,getInitialWeather}) {
    function retry(){
getInitialWeather()
    }
    return (
        <div className="md:flex md:flex-col md:items-center md:justify-start md:h-[100vh] md:mt-[10%] mt-[40%] flex flex-col items-center w-[100%]">
            <img className="h-[2.5rem]"  src="./assets/images/icon-error.svg" />
            <h1 className="text-3xl font-extrabold text-white mt-4">Something went wrong</h1>
            <p className="text-neutral-800 text-2xl md:mt-5 mt-3 w-[85%] md:w-[50%]">{errorMessage}</p>
            <button onClick={()=>retry()} className="text-white bg-neutral-800 px-4 py-1 rounded-lg mt-5">
              
                Retry 
                </button>
        </div>
    )
}

export default Error
