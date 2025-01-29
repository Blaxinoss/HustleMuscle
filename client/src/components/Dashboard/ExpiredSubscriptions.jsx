import { faLevelDownAlt, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, { useState } from 'react';

function ExpiredSubscriptions({ subscriptions }) {
    const [openSlider, setOpenSlider] = useState(false);

    const today = new Date(); // Get today's date
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Filter subscriptions ending within the next 7 days
    const BackInSeverSubscriptions = subscriptions.filter((sub) => {
        const endDate = new Date(sub.subscriptionEndDate);
        return endDate >= today && endDate <= sevenDaysFromNow;
    });

    return (
        <div
            className={`bg-gray-800 p-4 rounded-lg mb-5 ${openSlider ? 'max-h-64' : 'max-h-16'
                } transition-all duration-300 overflow-y-auto will-change-[max-height]`}
        >
            {/* Header Section */}
            <div className="flex gap-3 items-center">
                <h2 className="font-sans font-bold text-xl text-white">{t('toCollect')}</h2>
                <FontAwesomeIcon
                    className="cursor-pointer text-white"
                    size="2x"
                    icon={openSlider ? faLevelDownAlt : faLevelUpAlt}
                    onClick={() => setOpenSlider(!openSlider)}
                />
            </div>

            {/* List Section */}
            {openSlider && (
                <ul className="mt-3 space-y-2">
                    {BackInSeverSubscriptions.length > 0 ? (BackInSeverSubscriptions.map((sub, index) => {

                        return (
                            <li
                                className="p-5 rounded-md bg-gray-700 text-white flex justify-between items-center"
                                key={index}
                            >
                                <div>
                                    {sub.name} ({sub.phone}) {t('toCollectSoon1')}{' '}{' '}
                                    {new Date(sub.subscriptionEndDate).toLocaleDateString()}
                                </div>
                                <span
                                    className={`font-semibold ${sub.daysLeft > 5
                                        ? 'text-green-500'
                                        : sub.daysLeft >= 3
                                            ? 'text-orange-300'
                                            : 'text-red-700'

                                        }`}
                                >
                                    {t('toCollectSoon2')} {sub.daysLeft}   {t('toCollectSoon3')}
                                </span>
                            </li>
                        );
                    })) : (<div className='text-center my-5 text-green-500 text-2xl'>{t("toCollectEmpty")}</div>)}
                </ul>
            )}
        </div>
    );
}

export default ExpiredSubscriptions;
