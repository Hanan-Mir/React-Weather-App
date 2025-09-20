import Skeleton from "react-loading-skeleton"

function HourlyForecastSkeleton() {
    return (
        <div className="bg-neutral-800 px-2 py-4 mt-3 rounded-lg overflow-auto h-[80vh]">
            <div className="flex justify-between">
                <h2 className="text-white">Hourly forecast</h2>
                <span className="flex items-center w-[10%] justify-between bg-neutral-400 px-1 rounded-md">
                    <p className="text-white ml-1">_</p>
                    <img src="./assets/images/icon-dropdown.svg" />
                </span>
            </div>
            <div className="mt-4">
                {[...Array(24)].map((_,index)=>{
return <Skeleton key={index} className="mb-2" baseColor="#333" highlightColor="#555" height={60} borderRadius='10px' />
                })}
               
                

            </div>
        </div>
    )
}

export default HourlyForecastSkeleton
