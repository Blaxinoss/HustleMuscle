import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrainer } from '../../slices/trainersSlice'
import TrainersForm from './TrainersForm'
import TraienrsTable from './TrainersTable'

function Trainers() {
    const { t } = useTranslation(); // Initialize t() function
    const dispatch = useDispatch()
    const { trainerList } = useSelector((state) => state.trainers)

    useEffect(() => {
        dispatch(fetchTrainer());
    }, [dispatch]);

    const filteredTrainerList = useMemo(() => {
        return trainerList ? trainerList.filter((trainer) => !trainer.deleteFlag) : []
    }, [trainerList])

    return (
        <div className="text-white p-8">
            <h1 className="text-2xl mb-4">{t('trainers.title')}</h1> {/* Example of translation */}
            <TrainersForm />
            <TraienrsTable trainerList={filteredTrainerList} />
        </div>
    )
}

export default Trainers
