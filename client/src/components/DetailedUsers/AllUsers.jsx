import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

function AllUsers() {
    const { t } = useTranslation(); // Use the translation hook
    const [searchWord, setSearchWord] = useState('');
    const Trainees = useSelector((state) => state.trainees.subList);
    const filteredTraineesList = Trainees.filter((trainee) =>
        trainee.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    const handleSearchWordChange = (event) => {
        setSearchWord(event.target.value);
    };

    return (
        <div className='p-6'>
            {/* SearchBar */}
            <div className='text-white text-center mb-4'>
                <h2 className='mb-4 text-3xl font-bold uppercase bg-gradient-to-r from-gray-300 via-gray-400 to-gray-200 bg-clip-text text-transparent'>
                    {t('lookingForSomeone')}
                </h2>

                <div className=''>
                    <input
                        value={searchWord}
                        onChange={handleSearchWordChange}
                        className='p-2 rounded-md bg-slate-900'
                        type='search'
                        placeholder={t('searchPlaceholder')}
                    />
                </div>
            </div>
            <UserCard TraineesList={filteredTraineesList} />
        </div>
    );
}

export default AllUsers;
