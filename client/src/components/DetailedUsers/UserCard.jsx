import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function UserCard({ TraineesList = [] }) {
    const { t } = useTranslation(); // Use the translation hook
    const navigate = useNavigate();

    const handleMoreInfoClick = (phone) => {
        navigate(`/userDetails/${phone}`); // Use phone as the unique identifier
    };

    const uniqueTraineesList = TraineesList.filter((trainee, index, self) =>
        index === self.findIndex((t) => t.phone === trainee.phone)
    );
    return (
        <>
            <h1 className="text-3xl font-bold text-white mb-6 text-center mt-4">{t('trainees')}</h1>
            {uniqueTraineesList.length > 0 ? (
                <div className="grid justify-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {uniqueTraineesList.map((trainee) => (
                        <div
                            key={trainee.phone} // Use phone as the key
                            className="w-[13rem] h-[13rem] rounded-md bg-raisin-black flex flex-col items-center justify-around p-2 cursor-pointer shadow-lg border border-gray-700 group hover:shadow-xl hover:border-gray-500 transition-all duration-300"
                        >
                            <h2 className="text-lg font-semibold text-white">{trainee.name}</h2>
                            <FontAwesomeIcon
                                icon={faUser}
                                color="white"
                                size="5x"
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                            <button
                                onClick={() => handleMoreInfoClick(trainee.phone)} // Pass phone to handleMoreInfoClick
                                className="border-none text-sm text-red-500 bg-[#00000080] p-2 rounded-md mt-2 group-hover:bg-black transition-all duration-300"
                            >
                                {trainee.info || t('moreInfo')}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 text-lg">{t('noTrainees')}</p>
            )}
        </>
    );
}

export default UserCard;
