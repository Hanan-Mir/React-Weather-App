import Skeleton from "react-loading-skeleton"

function CurrentWeatherForeCastSkeleton() {
    return (
        <div className="relative mt-3">
            <Skeleton baseColor="#333" highlightColor="#555"  height={250} width='100%' borderRadius='10px'/>
           <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <Skeleton baseColor="#333" highlightColor="#555" height={140} borderRadius='10px' />
            <Skeleton baseColor="#333" highlightColor="#555" height={140} borderRadius='10px'/>
            <Skeleton baseColor="#333" highlightColor="#555" height={140} borderRadius='10px'/>
            <Skeleton baseColor="#333" highlightColor="#555" height={140} borderRadius='10px'/>
           </div>

            
        </div>
    )
}

export default CurrentWeatherForeCastSkeleton
