import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrainer, fetchTrainer, updateTrainer } from '../../slices/trainersSlice';

const TraienrsTable = ({ trainerList }) => {
	const { t } = useTranslation(); // Initialize t() for translation
	const dispatch = useDispatch();
	const [editingRowId, setEditingRowId] = useState(null);
	const [editableValues, setEditableValues] = useState({});
	const { error, status } = useSelector((state) => state.trainees);

	// Start editing a row
	const handleEditClick = (trainer) => {
		setEditingRowId(trainer.id); // Set the current row in edit mode
		setEditableValues(trainer); // Populate the editable values
	};

	// Save changes and exit edit mode
	const handleSaveClick = () => {
		dispatch(updateTrainer({ id: editingRowId, updatedData: editableValues }));
		setEditingRowId(null); // Exit edit mode
		dispatch(fetchTrainer());
	};

	// Cancel editing and exit edit mode
	const handleCancelClick = () => {
		setEditingRowId(null); // Exit edit mode without saving
	};

	// Update editable values on input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditableValues({ ...editableValues, [name]: value });
	};

	const handleDelete = (id) => {
		dispatch(deleteTrainer(id));
	};

	return (
		<div className='overflow-x-auto mt-5'>
			{status === 'loading' && <p>{t('TrainersTable.loading')}</p>}
			{error && <p className="text-red-500">{error}</p>}
			<table className="border border-none shadow-md rounded-lg overflow-auto w-full">
				<thead className="bg-[#325bb3] text-white">
					<tr>
						<th className="px-4 py-2 rtl:text-right text-left text-sm font-medium">{t('TrainersTable.name')}</th>
						<th className="px-4 py-2 rtl:text-right text-left text-sm font-medium ">{t('TrainersTable.phone')}</th>
						<th className="px-4 py-2 rtl:text-right text-left text-sm font-medium ">{t('TrainersTable.salary-net')}</th>
						<th className="px-4 py-2 rtl:text-right text-left text-sm font-medium ">{t('TrainersTable.raise')}</th>
						<th className="px-4 py-2 text-center text-sm font-medium">{t('TrainersTable.actions')}</th>
					</tr>
				</thead>
				<tbody>
					{trainerList.map((trainer) => (
						<tr key={trainer.id} className="border-t bg-gray-800 text-white transition-colors h-16 items-center">
							{editingRowId === trainer.id ? (
								<>
									{/* Editable Inputs */}
									<td className="px-4 py-2">
										<input
											type="text"
											name="name"
											value={editableValues.name || ""}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded px-2 py-1 text-black"
										/>
									</td>

									<td className="px-4 py-2">
										<input
											type="text"
											name="phone"
											value={editableValues.phone || ""}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded px-2 py-1 text-black"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											type="number"
											name="totalCost"
											value={editableValues.salaryAfterDiscount || ""}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded px-2 py-1 text-black"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											type="number"
											name="raise"
											value={editableValues.raise || ""}
											onChange={handleInputChange}
											className="w-full border border-gray-300 rounded px-2 py-1 text-black"
										/>
									</td>

									<td className="px-4 py-2 text-center">
										<button
											onClick={handleSaveClick}
											className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
										>
											{t('TrainersTable.save')}
										</button>
										<button
											onClick={handleCancelClick}
											className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
										>
											{t('TrainersTable.cancel')}
										</button>
									</td>
								</>
							) : (
								<>
									<td className="px-4 py-2 rtl:text-right">{trainer.name}</td>
									<td className="px-4 py-2 rtl:text-right ">{trainer.phone}</td>
									<td className="px-4 py-2 rtl:text-right">{trainer.salaryAfterDiscount}</td>
									<td className="px-4 py-2 rtl:text-right">{trainer.raise}</td>
									{/* Actions (Edit/Delete) */}
									<td className="px-4 py-2">
										<div className='text-center flex items-center justify-center gap-2'>
											<button
												onClick={() => handleEditClick(trainer)}
												className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
											>
												{t('TrainersTable.edit')}
											</button>
											<button
												onClick={() => handleDelete(trainer._id)}
												className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
											>
												{t('TrainersTable.delete')}
											</button>
										</div>
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

export default TraienrsTable;
