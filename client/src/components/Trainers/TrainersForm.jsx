import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addTrainer } from "../../slices/trainersSlice";


const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	phone: yup
		.string()
		.matches(/^\d{11}$/, "Phone number must be 10 digits")
		.required("Phone number is required"),
	salary: yup
		.number()
		.typeError("Total Cost must be a number")
		.positive("Total Cost must be positive")
		.required("Total Cost is required"),
	raise: yup
		.number()
		.optional()
		.typeError("Raise must be a number"),
	deleteFlag: yup
		.boolean()
		.default(false),
});

const TrainersForm = ({ trainerList }) => {
	const { t } = useTranslation(); // Initialize t() for translation
	const { error, status } = useSelector((state) => state.trainers);
	const [showForm, setShowForm] = useState(true);

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			// Dispatch action to add trainer
			await dispatch(addTrainer(data));
		} catch (error) {
			console.log(error.message); // Error handling for dispatch failure
		}
	};

	const clearFormInputs = () => {
		reset();
	};

	return (
		<>
			<button className="bg-white mb-5 text-black" onClick={() => { setShowForm(!showForm) }}>
				{t('Trainersform.toggleButton')}
			</button>
			{showForm && (
				<div className="bg-gray-800 p-6 rounded-lg shadow-md w-full mx-auto text-white">
					{status === 'loading' && <p>{t('Trainersform.loading')}</p>}
					{error && <p className="text-red-500">{t('Trainersform.error')} {error.message}</p>}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<h2 className="text-xl font-bold text-green-500 mb-6">{t('Trainersform.title')}</h2>

						{/* Name */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block mb-2">
									{t('Trainersform.nameLabel')}:
								</label>
								<input
									type="text"
									id="name"
									{...register("name")}
									className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
								/>
								{errors.name && (
									<span className="text-red-500 ml-2">{errors.name.message}</span>
								)}
							</div>

							{/* Phone */}
							<div>
								<label htmlFor="phone" className="block mb-2">
									{t('Trainersform.phoneLabel')}:
								</label>
								<input
									type="text"
									id="phone"
									{...register("phone")}
									className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
								/>
								{errors.phone && (
									<span className="text-red-500 ml-2">{errors.phone.message}</span>
								)}
							</div>
						</div>

						{/* Salary */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<div>
								<label htmlFor="salary" className="block mb-2">
									{t('Trainersform.salaryLabel')}
								</label>
								<input
									type="number"
									id="salary"
									{...register("salary")}
									className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
								/>
								{errors.salary && (
									<span className="text-red-500 ml-2">{errors.salary.message}</span>
								)}
							</div>

							{/* Raise (Optional) */}
							<div>
								<label htmlFor="raise" className="block mb-2">
									{t('Trainersform.raiseLabel')}:
								</label>
								<input
									type="number"
									id="raise"
									{...register("raise")}
									className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-400 bg-[#0684ff57]"
								/>
								{errors.raise && (
									<span className="text-red-500 ml-2">{errors.raise.message}</span>
								)}
							</div>
						</div>

						<div className="flex justify-center md:justify-end gap-2">
							<button
								disabled={isSubmitting}
								type="submit"
								className={`bg-yellow-400 hover:bg-yellow-500 text-[#330d6d] font-bold py-2 px-4 rounded md:px-8 md:py-4 ${isSubmitting ? 'bg-gray-400' : 'bg-yellow-400'} `}
							>
								{t('Trainersform.saveButton')}
							</button>
							<button
								onClick={() => {
									clearFormInputs();
								}}
								type="button"
								className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4 md:px-8 md:py-4"
							>
								{t('Trainersform.clearButton')}
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default TrainersForm;
