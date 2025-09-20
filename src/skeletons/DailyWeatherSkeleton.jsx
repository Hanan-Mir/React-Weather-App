import Skeleton from "react-loading-skeleton"

function DailyWeatherSkeleton() {
    return (
        <>
        <h2 className="text-white">Daily Forecast</h2>
        <div className="grid grid-cols-3 mt-2 gap-2">
            <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
             <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
              <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
               <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
                <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
                 <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
                  <Skeleton baseColor="#333" highlightColor="#555" height={160} borderRadius='10px' />
        </div>
        </>
    )
}

export default DailyWeatherSkeleton
