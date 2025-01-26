import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
		.typeError("Raise must be a number")
	,
	deleteFlag: yup
		.boolean()
		.default(false)
	,
});


const TrainersForm = ({ trainerList }) => {


	const { error, status } = useSelector((state) => state.trainers);
	const [showForm, setshowForm] = useState(true)

	const dispatch = useDispatch();


	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});



	const onSubmit = async (data) => {
		try {
			// Dispatch action to add trainee
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

			<button className="bg-white mb-5 text-black" onClick={() => { setshowForm(!showForm) }}>Form</button>
			{showForm && (<div className=" bg-gray-800 p-6 rounded-lg shadow-md w-full mx-auto text-white">
				{status === 'loading' && <p>Loading...</p>}
				{error && <p className="text-red-500">{error}{error.message}</p>}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<h2 className="text-xl font-bold text-green-500 mb-6">New Trainer</h2>

					{/* Name */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<label htmlFor="name" className="block">
								Name:
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
							<label htmlFor="phone" className="block">
								Phone:
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
							<label htmlFor="salary" className="block">
								Salary
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
							<label htmlFor="raise" className="block">
								Raise:
							</label>
							<input
								type="number"
								id="raise"
								{...register("riase")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.raise && (
								<span className="text-red-500 ml-2">{errors.raise.message}</span>
							)}
						</div>
					</div>

					<div className="flex justify-center md:justify-end">
						<button
							type="submit"
							className="bg-yellow-400 hover:bg-yellow-500 text-[#330d6d] font-bold py-2 px-4 rounded md:px-8 md:py-4"
						>
							Save
						</button>
						<button
							onClick={() => {
								clearFormInputs();
							}}
							type="button"
							className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4 md:px-8 md:py-4"
						>
							Clear
						</button>
					</div>
				</form>
			</div>)}
		</>
	);
};

export default TrainersForm;
