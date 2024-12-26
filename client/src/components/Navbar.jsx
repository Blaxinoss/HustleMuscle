import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
function Navbar() {
	const [mobileMenu, setMobileMenu] = useState(false);

	return (
		<>
			<div className="flex gap-10 p-5 bg-raisin-black justify-around items-center">
				<div>
					<img src="/Logo.jpg" alt="Fight Logo" className="w-[70px] h-auto " />
				</div>

				<div
					className="text-white relative "

				>
					<div className="flex flex-col justify-center items-center m-auto">
						<FontAwesomeIcon
							icon={faList}
							size="2x"
							className="cursor-pointer md:hidden"
							onClick={() => {
								setMobileMenu(!mobileMenu);
							}}
						/>
						{mobileMenu && (
							<div className="absolute top-10 bg-black rounded-lg p-4">
								<ul className="  flex flex-col transition-[hover] text-xs lg:gap-20 md:text-[1.1rem]  text-center">
									<Link
										className="text-white  hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
										to='/dashboard'
									>
										Dashboard
									</Link>

									<Link
										to='/trainers'
										className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
									>
										Trainers
									</Link>
									<Link
										to='/trainees'
										className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
									>
										Trainees
									</Link>
									<Link
										to='/expenses'
										className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
									>
										Expenses
									</Link>

								</ul>
							</div>
						)}
					</div>

					<ul className=" hidden md:flex  transition-[hover] text-xs lg:gap-20 md:text-[1.1rem]">
						<Link
							className="text-white  hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
							to='/dashboard'
						>
							Dashboard
						</Link>

						<Link
							to='/trainers'
							className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
						>
							Trainers
						</Link>
						<Link
							to='/trainees'
							className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
						>
							Trainees
						</Link>
						<Link
							to='/expenses'
							className="text-white hover:bg-blue-600 p-3 hover:p-3  rounded-md cursor-pointer hover:duration-300"
						>
							Expenses
						</Link>

					</ul>
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default Navbar;