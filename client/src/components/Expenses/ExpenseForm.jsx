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
            className="bg-white p-6 rounded shadow-md mb-6 max-w-3xl mx-auto"
        >
            <h2 className="text-lg font-bold text-gray-700 mb-4">Add New Expense</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Expense Name"
                    required
                    className="border p-2 rounded w-full"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                >
                    <option value="">Choose Category</option>
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
                    className="border p-2 rounded w-full"
                />
                <input
                    type="date"
                    name="dateOfPayment"
                    value={formData.dateOfPayment}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;
