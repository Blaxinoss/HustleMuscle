import React, { useState } from 'react';

const ExpenseTable = ({ expenses, onEditExpense, onDeleteExpense }) => {
    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEdit = (expense) => {
        setEditMode(expense._id);
        setFormData(expense);
    };

    const handleSave = (id) => {
        onEditExpense(id, formData);
        setEditMode(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="overflow-x-auto bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Expense Records</h2>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Date of Payment</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id} className="border-t text-center">
                            {editMode === expense._id ? (
                                <>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        >
                                            <option value="Salary">Salary</option>
                                            <option value="Fixing">Fixing</option>
                                            <option value="Bills">Bills</option>
                                            <option value="Place Expenses">Place Expenses</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="date"
                                            name="dateOfPayment"
                                            value={formData.dateOfPayment}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleSave(expense._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-4">{expense.name}</td>
                                    <td className="p-4">{expense.category}</td>
                                    <td className="p-4">{expense.amount}</td>
                                    <td className="p-4">
                                        {new Date(expense.dateOfPayment).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteExpense(expense._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
