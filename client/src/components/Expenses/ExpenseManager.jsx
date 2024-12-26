import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, deleteExpense, editExpense, fetchExpenses } from '../../slices/expensesSlice';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
const ExpenseManager = () => {
    const dispatch = useDispatch();
    const { items: expenses, status } = useSelector((state) => state.expenses);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExpenses());
            console.log(expenses)
        }
    }, [status, dispatch]);

    const handleAdd = (newExpense) => {
        dispatch(addExpense(newExpense));
    };

    const handleEdit = (id, updatedExpense) => {
        dispatch(editExpense({ id, updatedExpense }));
    };

    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };

    return (
        <div className="p-8 bg-black">
            <ExpenseForm onAddExpense={handleAdd} />
            <ExpenseTable
                expenses={expenses}
                onEditExpense={handleEdit}
                onDeleteExpense={handleDelete}
            />
        </div>
    );
};

export default ExpenseManager;
