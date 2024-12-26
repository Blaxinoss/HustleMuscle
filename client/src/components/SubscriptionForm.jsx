import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addTrainee } from "../slices/subscriptionSlice";
const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	phone: yup
		.string()
		.matches(/^\d{11}$/, "Phone number must be 10 digits")
		.required("Phone number is required"),
	subscriptionStartDate: yup.date().required("Start Date is required"),
	subscriptionEndDate: yup.date().required("Finish Date is required"),
	totalCost: yup
		.number()
		.typeError("Total Cost must be a number")
		.positive("Total Cost must be positive")
		.required("Total Cost is required"),
	paid: yup
		.number()
		.typeError("Paid amount must be a number")
		.positive("Paid amount must be positive")
		.required("Paid amount is required"),
	remaining: yup
		.number()

		.typeError("Remaining amount must be a number")
		.positive("Remaining amount must be positive")
		.required("Remaining amount is required"),

	discount: yup
		.number()
		.optional()
		.typeError("Discount must be a number")
		.max(100)
	,
	deleteFlag: yup
		.boolean()
		.default(false)
	,

	accountFreezeStatus: yup.boolean().required("Active status is required"),
});


const SubscriptionForm = ({ subscriptions, }) => {


	const { error, status } = useSelector((state) => state.trainees);
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
			await dispatch(addTrainee(data));
		} catch (error) {
			console.log(error.message); // Error handling for dispatch failure
		}
	};



	const clearFormInputs = () => {
		reset(); // This will clear all form inputs and errors
	};


	return (
		<>
			<button className="bg-white mb-5" onClick={() => { setshowForm(!showForm) }}>Form</button>
			{showForm && (<div className=" bg-gray-800 p-6 rounded-lg shadow-md w-full mx-auto text-white">
				{status === 'loading' && <p>Loading...</p>}
				{error && <p className="text-red-500">{error}{error.message}</p>}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

					{/* Start Date */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<label htmlFor="subscriptionStartDate" className="block">
								Start Date:
							</label>
							<input
								type="date"
								id="subscriptionStartDate"
								{...register("subscriptionStartDate")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.subscriptionStartDate && (
								<span className="text-red-500 ml-2">
									{errors.subscriptionStartDate.message}
								</span>
							)}
						</div>

						{/* Finish Date */}
						<div>
							<label htmlFor="subscriptionEndDate" className="block">
								Finish Date:
							</label>
							<input
								type="date"
								id="subscriptionEndDate"
								{...register("subscriptionEndDate")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.subscriptionEndDate && (
								<span className="text-red-500 ml-2">
									{errors.subscriptionEndDate.message}
								</span>
							)}
						</div>
					</div>

					{/* Total Cost */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<label htmlFor="totalCost" className="block">
								Total Cost:
							</label>
							<input
								type="number"
								id="totalCost"
								{...register("totalCost")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.totalCost && (
								<span className="text-red-500 ml-2">{errors.totalCost.message}</span>
							)}
						</div>

						{/* Paid */}
						<div>
							<label htmlFor="paid" className="block">
								Paid:
							</label>
							<input
								type="number"
								id="paid"
								{...register("paid")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.paid && (
								<span className="text-red-500 ml-2">{errors.paid.message}</span>
							)}
						</div>
					</div>

					{/* Remaining */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<label htmlFor="remaining" className="block">
								Remaining:
							</label>
							<input
								type="number"
								id="remaining"
								{...register("remaining")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.remaining && (
								<span className="text-red-500 ml-2">{errors.remaining.message}</span>
							)}
						</div>

						{/* Discount (Optional) */}
						<div>
							<label htmlFor="discount" className="block">
								Discount:
							</label>
							<input
								type="number"
								id="discount"
								{...register("discount")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-400 bg-[#0684ff57]"
							/>
							{errors.discount && (
								<span className="text-red-500 ml-2">{errors.discount.message}</span>
							)}
						</div>
					</div>

					{/* Account Status */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<label htmlFor="accountFreezeStatus" className="block">
								Account Status:
							</label>
							<select
								id="accountFreezeStatus"
								{...register("accountFreezeStatus")}
								className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-400 bg-[#0684ff57]"
							>
								<option value={false}>Ongoing</option>
								<option value={true}>Freezed</option>

							</select>
							{errors.accountFreezeStatus && (
								<span className="text-red-500 ml-2">
									{errors.accountFreezeStatus.message}
								</span>
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

export default SubscriptionForm;
