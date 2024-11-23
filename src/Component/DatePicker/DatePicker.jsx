import { useState } from "react";


const DatePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const [selectedRange, setSelectedRange] = useState('last28Days');
    const [sDate, setSDate] = useState(startDate); 
    const [eDate, setEDate] = useState(endDate);
    

    const handleRangeChange = (range) => {
        setSelectedRange(range);
        if (range === 'last28Days') {
            setStartDate(new Date(new Date().setDate(new Date().getDate() - 28)));
            setEndDate(new Date());
        } else if (range === 'overall') {
            setStartDate(new Date('2024-01-01')); 
            setEndDate(new Date());
        }
        
    };

    const handleCustomDateChange = () => {
        if (sDate > eDate) {
            setStartDate(eDate); 
            setEndDate(sDate); 
        } else {
            setStartDate(sDate); 
            setEndDate(eDate); 
        }
    };
    return (
        <div className="flex flex-col md:flex-row gap-3 py-2 items-center justify-between border-b shadow ">
            <div className="flex items-center space-x-4">
                <button 
                    className={`px-3 py-1 ${selectedRange === 'last28Days' ? 'bg-[#ff3811] text-white' : 'text-[#ff3811]'}`} 
                    onClick={() => handleRangeChange('last28Days')}
                >
                    Last 28 Days
                </button>
                <button 
                    className={`px-3 py-1 ${selectedRange === 'overall' ? 'bg-[#ff3811] text-white' : 'text-[#ff3811]'}`} 
                    onClick={() => handleRangeChange('overall')}
                >
                    Overall
                </button>
                <button 
                    className={`px-3 py-1 ${selectedRange === 'custom' ? 'bg-[#ff3811] text-white' : 'text-[#ff3811]'}`} 
                    onClick={() => handleRangeChange('custom')}
                >
                    Custom
                </button>
            </div>
            {selectedRange === 'custom' && (
                <div className="flex items-center  justify-center  space-x-1">
                    <input 
                        type="date" 
                        value={sDate.toISOString().split('T')[0]} 
                        onChange={(e) => setSDate(new Date(e.target.value))} 
                        className="border w-[35%] md:w-full md:px-3 "
                    />
                    <input 
                        type="date" 
                        value={eDate.toISOString().split('T')[0]} 
                        onChange={(e) => setEDate(new Date(e.target.value))} 
                        className="border w-[35%] md:w-full md:px-3 "
                    />
                    <button 
                        className="md:px-3 px-3 py-[2px] bg-[#ff3811] text-white " 
                        onClick={handleCustomDateChange}
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default DatePicker;