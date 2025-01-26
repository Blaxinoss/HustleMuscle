import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './slices/expensesSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import trainerReducer from './slices/trainersSlice';

const store = configureStore({
    reducer: {
        trainees: subscriptionReducer,
        expenses: expenseReducer,
        trainers: trainerReducer,
    }
});

export default store;