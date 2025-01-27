import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const { phone } = useParams(); // Get the userId from the URL
    const trainees = useSelector((state) => state.trainees.subList); // Get the entire list of trainees from the Redux store

    if (!trainees.length) {
        return <p>Loading...</p>;
    }

    const userRecords = trainees.filter((trainee) => trainee.phone === phone);
    console.log(userRecords)

    if (!userRecords.length) {
        return <p>No records found for this user.</p>;
    }

    const totalSubscriptions = userRecords.length;
    const totalCost = userRecords.reduce((sum, record) => sum + record.totalCost, 0)
    const totalPaid = userRecords.reduce((sum, record) => sum + record.paid, 0);
    const totalRemaining = userRecords.reduce((sum, record) => sum + record.remaining, 0);
    const totalDiscounts = userRecords.reduce((sum, record) => sum + record.discount, 0)

    const latestSubscription = userRecords.reduce((latest, record) => {
        return new Date(record.subscriptionEndDate) > new Date(latest.subscriptionEndDate) ? record : latest;
    }, userRecords[0]);

    return (
        <div className="p-6  bg-gray-900 text-white rounded-lg shadow-lg">
            <div className='space-y-1'>
                <h1 className="text-2xl font-bold mb-4">{userRecords[0].name}</h1>
                <p className="text-lg text-gray-400">Phone: {userRecords[0].phone}</p>
                <p className="text-lg text-gray-400">Last Subscription: {new Date(latestSubscription.subscriptionEndDate).toLocaleDateString()}</p>
                <p className="text-lg text-orange-400">Total Costs: {totalCost}</p>
                <p className="text-lg text-green-400">Total Paid: {totalPaid}</p>
                <p className="text-lg text-red-400">Total Remainings: {totalRemaining}</p>
                <p className="text-lg text-yellow-400">Total Discounts: {totalDiscounts}EGP</p>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl mb-2">Last Subscription</h2>
                <p className="text-gray-400">Start: {new Date(latestSubscription.subscriptionStartDate).toLocaleDateString()}</p>
                <p className="text-gray-400">End: {new Date(latestSubscription.subscriptionEndDate).toLocaleDateString()}</p>
                <p className="text-gray-400">Paid: {latestSubscription.paid}</p>
                <p className="text-gray-400">Remaining: {latestSubscription.remaining}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl">Subscription History ({totalSubscriptions})</h2>
                <table className="w-full border border-gray-700 mt-4 rounded-lg overflow-x-auto block ">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                            <th className="px-4 py-2 text-left ">Subscription Start Date</th>
                            <th className="px-4 py-2 text-left">Subscription End Date</th>
                            <th className="px-4 py-2 text-left">Total Cost</th>
                            <th className="px-4 py-2 text-left">Paid</th>
                            <th className="px-4 py-2 text-left">Remaining</th>
                            <th className="px-4 py-2 text-left">Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRecords.map((sub, index) => (
                            <tr key={`${sub._id}-${index}`} className="bg-gray-800 even:bg-gray-700 border-b border-gray-600 hover:bg-gray-600 transition">
                                <td className="px-4 py-2">{new Date(sub.subscriptionStartDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 ">{new Date(sub.subscriptionEndDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{sub.totalCost}EGP</td>
                                <td className="px-4 py-2 text-green-400">{sub.paid}EGP</td>
                                <td className="px-4 py-2 text-red-400">{sub.remaining}EGP</td>
                                <td className="px-4 py-2">{sub.discount}EGP</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetails;
