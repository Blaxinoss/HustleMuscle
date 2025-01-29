import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const { t } = useTranslation(); // Use the translation hook
    const { phone } = useParams(); // Get the userId from the URL
    const trainees = useSelector((state) => state.trainees.subList); // Get the entire list of trainees from the Redux store

    if (!trainees.length) {
        return <p>{t('userDetails.loading')}...</p>;
    }

    const userRecords = trainees.filter((trainee) => trainee.phone === phone);
    console.log(userRecords)

    if (!userRecords.length) {
        return <p>{t('userDetails.noRecordsFound')}</p>;
    }

    const totalSubscriptions = userRecords.length;
    const totalCost = userRecords.reduce((sum, record) => sum + record.totalCost, 0);
    const totalPaid = userRecords.reduce((sum, record) => sum + record.paid, 0);
    const totalRemaining = userRecords.reduce((sum, record) => sum + record.remaining, 0);
    const totalDiscounts = userRecords.reduce((sum, record) => sum + record.discount, 0);

    const latestSubscription = userRecords.reduce((latest, record) => {
        return new Date(record.subscriptionEndDate) > new Date(latest.subscriptionEndDate) ? record : latest;
    }, userRecords[0]);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <div className='space-y-1'>
                <h1 className="text-2xl font-bold mb-4">{userRecords[0].name}</h1>
                <p className="text-lg text-gray-400">{t('userDetails.phone')}: {userRecords[0].phone}</p>
                <p className="text-lg text-gray-400">{t('userDetails.lastSubscription')}: {new Date(latestSubscription.subscriptionEndDate).toLocaleDateString()}</p>
                <p className="text-lg text-orange-400">{t('userDetails.totalCosts')}: {totalCost}{t('price')}</p>
                <p className="text-lg text-green-400">{t('userDetails.totalPaid')}: {totalPaid}{t('price')}</p>
                <p className="text-lg text-red-400">{t('userDetails.totalRemaining')}: {totalRemaining}{t('price')}</p>
                <p className="text-lg text-yellow-400">{t('userDetails.totalDiscounts')}: {totalDiscounts}{t('price')}</p>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl mb-2">{t('userDetails.lastSubscription')}</h2>
                <p className="text-gray-400">{t('userDetails.start')}: {new Date(latestSubscription.subscriptionStartDate).toLocaleDateString()}</p>
                <p className="text-gray-400">{t('userDetails.end')}: {new Date(latestSubscription.subscriptionEndDate).toLocaleDateString()}</p>
                <p className="text-gray-400">{t('userDetails.paid')}: {latestSubscription.paid}{t('price')}</p>
                <p className="text-gray-400">{t('userDetails.remaining')}: {latestSubscription.remaining}{t('price')}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl">{t('userDetails.subscriptionHistory')} ({totalSubscriptions})</h2>
                <table className="w-full border border-gray-700 mt-4 rounded-lg overflow-x-auto block ">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.subscriptionStartDate')}</th>
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.subscriptionEndDate')}</th>
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.totalCost')}</th>
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.paid')}</th>
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.remaining')}</th>
                            <th className="rtl:text-right px-4 py-2 text-left">{t('userDetails.discount')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRecords.map((sub, index) => (
                            <tr key={`${sub._id}-${index}`} className="bg-gray-800 even:bg-gray-700 border-b border-gray-600 hover:bg-gray-600 transition">
                                <td className="rtl:text-right px-4 py-2">{new Date(sub.subscriptionStartDate).toLocaleDateString()}</td>
                                <td className="rtl:text-right px-4 py-2 ">{new Date(sub.subscriptionEndDate).toLocaleDateString()}</td>
                                <td className="rtl:text-right px-4 py-2">{sub.totalCost}{t('price')}</td>
                                <td className="rtl:text-right px-4 py-2 text-green-400">{sub.paid}{t('price')}</td>
                                <td className="rtl:text-right px-4 py-2 text-red-400">{sub.remaining}{t('price')}</td>
                                <td className="rtl:text-right px-4 py-2">{sub.discount}{t('price')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetails;
