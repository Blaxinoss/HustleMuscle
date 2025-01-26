import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrainer } from '../../slices/trainersSlice'
import TrainersForm from './TrainersForm'
import TraienrsTable from './TrainersTable'

function Trainers() {
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
            <TrainersForm />
            <TraienrsTable trainerList={filteredTrainerList} />
        </div>
    )
}

export default Trainers