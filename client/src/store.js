import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './slices/expensesSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
    reducer: {
        trainees: subscriptionReducer,
        expenses: expenseReducer
    }
});

export default store;