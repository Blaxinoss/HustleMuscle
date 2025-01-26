import { Doughnut, Line } from "react-chartjs-2";

const Charts = ({ doughnutData, lineData, lineOptions, doughnutOptions }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Gym Capacity</h3>
            <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Monthly Revenue</h3>
            <Line data={lineData} options={lineOptions} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-full">
            <h2 className="text-lg font-bold text-white">Development notifications</h2>

            {/* UPDATE ANNOUNCMENTS */}
            <ul className="list-none space-y-4 mt-4 text-gray-400 ">
                <li className="bg-[#154dc5] text-white hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white transition-all duration-300 ease-in-out p-4 rounded-lg shadow-md cursor-pointer">
                    There will be a technical maintenance in the system from 3pm to 4pm Today 27/12/2024
                </li>

            </ul>


        </div>
    </div>
);

export default Charts;
