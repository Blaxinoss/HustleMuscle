import { Link } from 'react-router';

const AddNewButtons = () => (
    <>
        <div className="mb-8">
            <Link to="/trainees" className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg font-semibold">
                + New Member
            </Link>
        </div>
        <div className="mb-8">
            <Link to="/expenses" className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg font-semibold">
                + New Expense
            </Link>
        </div>
    </>
);

export default AddNewButtons;
