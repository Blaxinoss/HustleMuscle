import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, deleteExpense, editExpense, fetchExpenses } from '../../slices/expensesSlice';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';

const ExpenseManager = () => {
    const { t } = useTranslation(); // Initialize the translation function
    const dispatch = useDispatch();
    const { items: expenses, status } = useSelector((state) => state.expenses);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExpenses());
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
            <h2 className="text-xl font-bold text-green-500 mb-6">{t('expenseTable.newExpense')}</h2> {/* Translate button title */}
            <ExpenseTable
                expenses={expenses}
                onEditExpense={handleEdit}
                onDeleteExpense={handleDelete}
            />
        </div>
    );
};

export default ExpenseManager;
