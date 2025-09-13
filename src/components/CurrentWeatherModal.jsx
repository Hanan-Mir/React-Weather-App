function CurrentWeatherModal() {
    const currentDate=new Date();
    const formatDateObject={
        weekday:'long',
        month:'short',
        year:'numeric',
        day:'numeric'
    }
    return (
        <div className="mt-6 relative z-[-1]">
            <div>
            <img src="./assets/images/bg-today-small.svg" />
            <div className="absolute top-[20%] left-[10%]">
                <h1 className="font-bold text-white text-4xl">Berlin,Germany</h1>
                <h2 className="text-white">{currentDate.toLocaleString('en-Us',formatDateObject)}</h2>
            <div className="flex items-center justify-between">
                <img src="./assets/images/icon-sunny.webp" className="w-[30%]" />
                <h1 className="text-white font-extrabold text-7xl">68</h1>
            </div>
            
            </div>
            </div>
        </div>
    )
}

export default CurrentWeatherModal
