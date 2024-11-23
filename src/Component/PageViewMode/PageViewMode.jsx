// import { useState } from "react";
import { IoGridSharp, IoListSharp } from "react-icons/io5";

const PageViewMode = ({viewMode, setViewMode}) => {
    
    const handlePageViewSet = (value) => {
        setViewMode(value)
        localStorage.setItem('pageView', value);
    }

    return (
        <div className="flex gap-x-1">
                <button onClick={()=>handlePageViewSet('grid')} className={`${viewMode === 'grid' && 'text-[#FF3811] '} text-2xl`}><IoGridSharp />
                </button>
                <button onClick={()=>handlePageViewSet('list')} className={`${viewMode === 'list' && 'text-[#FF3811] '} text-3xl`}  ><IoListSharp />  </button>
        </div>
    );
};

export default PageViewMode;