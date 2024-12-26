import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        amount: '',
        dateOfPayment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddExpense(formData);
        setFormData({ name: '', category: '', amount: '', dateOfPayment: '' });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-md mb-6 mx-auto"
        >
            <h2 className="text-xl font-bold text-green-500 mb-6">New Expense</h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Expense Name"
                    required
                    className="border border-red-600 p-2 rounded w-full bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-red-600"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border border-red-600 p-2 rounded w-full bg-gray-800 text-gray-200 focus:ring-2 focus:ring-red-600"
                >
                    <option value="" className="text-gray-400">Choose Category</option>
                    <option value="Salary">Salary</option>
                    <option value="Fixing">Fixing</option>
                    <option value="Bills">Bills</option>
                    <option value="Place Expenses">Place Expenses</option>
                </select>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                    className="border border-red-600 p-2 rounded w-full bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-red-600"
                />
                <input
                    type="date"
                    name="dateOfPayment"
                    value={formData.dateOfPayment}
                    onChange={handleChange}
                    required
                    className="border border-red-600 p-2 rounded w-full bg-gray-800 text-gray-200 focus:ring-2 focus:ring-red-600"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;
