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
        <div className="overflow-x-auto bg-gray-900 p-2 md:p-6 rounded-lg shadow-md  mx-auto">
            <table className="table-auto w-full border-collapse">
                <thead className="bg-black text-gray-200">
                    <tr>
                        <th className="p-2 md:p-4 text-left">Name</th>
                        <th className="p-2 md:p-4 text-left">Category</th>
                        <th className="p-2 md:p-4 text-left">Amount</th>
                        <th className="p-2 md:p-4 text-left">Date of Payment</th>
                        <th className="p-2 md:p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr
                            key={expense._id}
                            className={`border-t bg-[#232427]  rounded-lg`}
                        >
                            {editMode === expense._id ? (
                                <>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border border-red-600 p-2 rounded w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="border border-red-600 p-2 rounded w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
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
                                            className="border border-red-600 p-2 rounded w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="date"
                                            name="dateOfPayment"
                                            value={formData.dateOfPayment}
                                            onChange={handleChange}
                                            className="border border-red-600 p-2 rounded w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                                        />
                                    </td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleSave(expense._id)}
                                            className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                                        >
                                            Save
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-4 text-gray-200">{expense.name}</td>
                                    <td className="p-4 text-gray-200">{expense.category}</td>
                                    <td className="p-4 text-gray-200">{expense.amount}</td>
                                    <td className="p-4 text-gray-200">
                                        {new Date(expense.dateOfPayment).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteExpense(expense._id)}
                                            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
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
