import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const AddNewButtons = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className="mb-8">
                <Link to="/trainees" className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg font-semibold">
                    {t("dashboardHeader.member")}
                </Link>
            </div>
            <div className="mb-8">
                <Link to="/expenses" className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg font-semibold">
                    {t("dashboardHeader.expense")}
                </Link>
            </div>
        </>)
};

export default AddNewButtons;
