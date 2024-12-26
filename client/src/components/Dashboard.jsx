import { faBell, faBellSlash, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import React, { useMemo, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import SubscriptionTable from './SubscriptionTable';






// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month

    const [openNotifications, setOpenNotificiations] = useState(false)


    let { subList } = useSelector((state) => state.trainees)

    const subscriptions = useMemo(() => {
        return subList ? subList.filter((sub) => !sub.deleteFlag) : [];
    }, [subList]); // Recompute only if subList changes


    // Options for the line chart
    const lineOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#9CA3AF" },
            },
            y: {
                grid: { color: "#374151" },
                ticks: { color: "#9CA3AF" },
            },
        },
    };

    // Data for the gym capacity doughnut chart


    // Options for the doughnut chart
    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "#9CA3AF" },
            },
        },
    };





    // Function to calculate the monthly revenue
    const getMonthlyRevenue = (subscriptions, month) => {
        const monthlyRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let numMembers = 0;
        let revenue = 0;
        let needtocollect = 0;
        let numExpires = 0;
        let subfreezedCounts = 0;
        let notificationsArray = [];



        subscriptions.forEach((sub) => {
            const startDate = new Date(sub.subscriptionStartDate);


            if (startDate.getMonth() === month) { // Compare the month of startDate with the selected month
                revenue += sub.paid; // Add the paid amount for that month
                needtocollect += sub.remaining;
                numMembers += 1;
            }

            const EndDate = new Date(sub.subscriptionEndDate);
            if (EndDate.getMonth() === month) {
                numExpires += 1;
            }

            if (EndDate.getDate() === new Date().getDate()) {
                notificationsArray.push({ name: sub.name, phone: sub.phone });
            }

            if (sub.accountFreezeStatus) {
                subfreezedCounts += 1; // Correcting the increment of freezed counts
            }

            if (
                (startDate.getMonth() <= selectedMonth && EndDate.getMonth() >= selectedMonth) ||
                startDate.getMonth() === selectedMonth
            ) {
                monthlyRevenue[selectedMonth] += sub.paid; // Add the paid amount for the selected month
            }


        });

        // Doughnut chart data (calculated after the loop)
        const doughnutData = {
            labels: ["Freeze", "Ongoing"],
            datasets: [
                {
                    data: [subfreezedCounts, numMembers - subfreezedCounts],
                    backgroundColor: ["#10B981", "#374151"],
                    hoverBackgroundColor: ["#16C784", "#4B5563"],
                    borderWidth: 0,
                },
            ],
        };

        const lineData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Revenue",
                    data: monthlyRevenue,
                    borderColor: "#10B981",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    fill: true,
                    tension: 0.4,
                },
            ],
        };




        return { revenue, needtocollect, numMembers, numExpires, notificationsArray, doughnutData, lineData };
    };

    // Memoize the revenue calculation to avoid recalculating on every render
    const { revenue, needtocollect, numMembers, numExpires, notificationsArray, doughnutData, lineData } = useMemo(
        () => getMonthlyRevenue(subscriptions, selectedMonth),
        [subscriptions, selectedMonth]
    );



    const handleSliderChange = (event) => {
        setSelectedMonth(Number(event.target.value)); // Update the selected month based on the slider value
    };


    return (
        <div className="bg-black text-white min-h-screen p-6 relative">
            <div className={`backdrop w-full h-full ${openNotifications ? 'bg-[#0000007d]' : 'hidden'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}></div>

            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500 p-3 rounded-lg">
                        <FontAwesomeIcon
                            icon={faDumbbell} size='2x'
                            className="h-6 w-6 text-black"
                        />
                    </div>
                    <div className="flex flex-col"><h3 className="text-xs text-gray-400">Welcome</h3><span className="text-sm md:text-lg font-bold">Mohamed Hassan</span></div>
                </div>
                <div className="flex items-center space-x-4">


                    <div className='notifications Wrapper relative '>
                        <div className={`bg-gray-800 p-4 translate-y-16 md:translate-y-0 rounded-lg ${openNotifications ? "block" : "hidden"} absolute w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] right-0 sm:-right-2 md:-left-[30rem] sm:top-16 top-0`}>
                            <ul className="list-none space-y-4 mt-4 text-gray-400">
                                {notificationsArray && notificationsArray.map((notify) => (
                                    <li key={notify.id} className="bg-[#154dc5] text-white  transition-all duration-300 ease-in-out p-4 rounded-lg shadow-md cursor-pointer">
                                        {notify.name} subscription will be expired today. try to call at {notify.phone}
                                    </li>
                                ))}


                            </ul>
                        </div>
                        <button className="bg-gray-800 p-2 rounded-full" onClick={() => { setOpenNotificiations(!openNotifications) }}>
                            {notificationsArray.length !== 0 ? (
                                <FontAwesomeIcon
                                    icon={faBell} // Solid bell icon
                                    size="2x"
                                    className="text-white"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faBellSlash} // Outline bell icon
                                    size="2x"
                                    className="text-white"
                                />
                            )}

                        </button>
                    </div>

                    <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
                        <img
                            src="/Mo.png"
                            alt="Profile"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <div className="mb-6">
                <h1 className=" text-2xl lg:text-4xl font-bold mb-2">
                    Manage your <span className="text-green-500">Fitness</span> business
                </h1>
                <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            </div>

            {/* Add New Member Button */}
            <div className="mb-8">
                <Link to='/trainees' className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg font-semibold" >
                    + New Member
                </Link>
            </div>

            {/* Stats Section */}
            <div className='bg-raisin-black rounded-lg p-5 mb-5'>
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


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Revenue, Members, Visited, Trainer Cards */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Revenue</h3>
                    <p className="text-2xl font-bold">EGP {revenue}</p>
                    <span className="text-green-500 text-sm">+2.1%</span>
                    <div>


                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Members</h3>
                    <p className="text-2xl font-bold">{numMembers}</p>
                    <span className="text-red-500 text-sm">-1.8%</span>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Need To Collect</h3>
                    <p className="text-2xl font-bold">EGP {needtocollect}</p>
                    <span className="text-green-500 text-sm">+2.1%</span>
                    <div>


                        {/* Slider to select the month */}

                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Expired subscriptions this month</h3>
                    <p className="text-2xl font-bold">{numExpires}</p>
                    <span className="text-green-500 text-sm">+3.2%</span>
                </div>
            </div>

            {/* Analytics Section */}
            <div className='flex flex-col md:flex-row justify-between'>
                <div className="bg-gray-800 p-6 rounded-lg  mb-5  md:w-[50%]">
                    <h2 className="text-lg font-bold">Revenue Analytics</h2>
                    <Line data={lineData} options={lineOptions} />
                </div>

                {/* Gym Capacity Section */}
                <div className="bg-gray-800 p-6 rounded-lg md:w-[20%] mb-5 lg:mb-auto">
                    <h2 className="text-lg font-bold mb-10">Freezed Subscriptions</h2>
                    <Doughnut data={doughnutData} options={doughnutOptions} />

                </div>
                <div className="bg-gray-800 p-6 rounded-lg md:w-[20%]">
                    <h2 className="text-lg font-bold text-white">Development notifications</h2>

                    {/* UPDATE ANNOUNCMENTS */}
                    <ul className="list-none space-y-4 mt-4 text-gray-400">
                        <li className="bg-[#154dc5] text-white hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white transition-all duration-300 ease-in-out p-4 rounded-lg shadow-md cursor-pointer">
                            There will be a technical maintenance in the system from 3pm to 4pm Today 27/12/2024
                        </li>

                    </ul>


                </div>
            </div>
            <SubscriptionTable subscriptions={subscriptions} short={true} />

        </div>
    );
};

export default Dashboard;
