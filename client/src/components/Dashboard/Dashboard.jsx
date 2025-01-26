
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



import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainee } from "../../slices/subscriptionSlice";
import SubscriptionTable from "../SubscriptionTable";
import AddNewButtons from "./AddNewButtons";
import Charts from './Charts';
import ExpiredSubscriptions from "./ExpiredSubscriptions";
import Header from './Header';
import Quote from './Quote';
import StatsCards from './StatsCards';
import StatsSlider from './StatsSlider';


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
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTrainee())
    }, [dispatch])


    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [openNotifications, setOpenNotifications] = useState(false);
    const { subList } = useSelector((state) => state.trainees);

    const subscriptions = useMemo(() => subList?.filter((sub) => !sub.deleteFlag) || [], [subList]);

    // Function to calculate the monthly revenue
    const getMonthlyRevenue = (subscriptions, month) => {
        const monthlyRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let numMembers = 0;
        let revenue = 0;
        let needToCollect = 0;
        let numExpires = 0;
        let subfreezedCounts = 0;
        let notificationsArray = [];



        subscriptions.forEach((sub) => {
            const startDate = new Date(sub.subscriptionStartDate);


            if (startDate.getMonth() === month) { // Compare the month of startDate with the selected month
                revenue += sub.paid; // Add the paid amount for that month
                needToCollect += sub.remaining;
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


        const doughnutData = {
            labels: ["Freeze", "Ongoing"],
            datasets: [
                {
                    data: [subfreezedCounts, numMembers - subfreezedCounts],
                    backgroundColor: ["#154dc5", "#16C784"],
                    hoverBackgroundColor: ["#154dc5", "#16C784"],
                    borderWidth: 0,
                    cutout: '65%'
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


        const doughnutOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { color: "white" },
                },
            },
        };



        return {
            revenue,
            needToCollect,
            numMembers,
            numExpires,
            notificationsArray,
            doughnutData,
            lineData,
            lineOptions,
            doughnutOptions,
        };
    };

    const { revenue, needToCollect, numMembers, numExpires, notificationsArray, doughnutData, lineData, lineOptions, doughnutOptions } = useMemo(
        () => getMonthlyRevenue(subscriptions, selectedMonth),
        [subscriptions, selectedMonth]
    );

    const handleSliderChange = (event) => setSelectedMonth(Number(event.target.value));

    return (
        <>        <div className="bg-black text-white min-h-screen p-6 relative">
            <Header
                notificationsArray={notificationsArray}
                openNotifications={openNotifications}
                setOpenNotifications={setOpenNotifications}
            />
            <Quote />
            <AddNewButtons />
            <StatsSlider selectedMonth={selectedMonth} handleSliderChange={handleSliderChange} />
            <StatsCards revenue={revenue} numMembers={numMembers} needToCollect={needToCollect} numExpires={numExpires} />
            <ExpiredSubscriptions subscriptions={subscriptions} />
            <Charts doughnutData={doughnutData} lineData={lineData} lineOptions={lineOptions} doughnutOptions={doughnutOptions} />

        </div>
            <SubscriptionTable subscriptions={subscriptions} short={true} />
        </>

    );
};

export default Dashboard;

