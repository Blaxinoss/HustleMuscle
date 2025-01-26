const StatsSlider = ({ selectedMonth, handleSliderChange }) => (
    <div className="bg-raisin-black rounded-lg p-5 mb-5">
        <input
            type="range"
            min="0"
            max="11"
            value={selectedMonth}
            onChange={handleSliderChange}
            step="1"
            className="w-full mt-4"
        />
        <div className="flex justify-between">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <span key={month} className={selectedMonth === index ? 'font-bold text-green-500' : 'text-[0.5rem]'}>
                    {month}
                </span>
            ))}
        </div>
    </div>
);

export default StatsSlider;
