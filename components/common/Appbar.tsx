

export default function Appbar(){
    return (
        <div className="relative h-[85px] bg-nav">
            <div className="flex items-center justify-between px-5 py-2">
                <div className="flex flex-col gap-[2px]">
                    <h2 
                    className="font-bold text-3xl font-sans text-white">Patient Directory</h2>
                    <p className="font-normal text-xl text-white">1000 Patients Found</p>
                </div>
            </div>
            <div className="absolute hidden md:block right-0 top-0 h-[85px] w-[40%] z-50" style={{
                backgroundImage : "url('/img.png')",
                backgroundSize : "cover",
                backgroundPosition : "center",
                backgroundRepeat : "no-repeat",
                backgroundBlendMode : "overlay",
            }} ></div>            
        </div>
        
    )
}