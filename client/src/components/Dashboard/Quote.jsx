import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Quote = () => {

    const { t } = useTranslation()
    const locale = i18n.language;
    return (
        <div className="mb-6">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                {t("dashboardHeader.title")} <span className="text-green-500">{t("dashboardHeader.title2")}</span> {t("dashboardHeader.title3")}
            </h1>
            <p className="text-gray-500 text-sm">      {new Date().toLocaleDateString(locale)} {new Date().toLocaleTimeString(locale)}
            </p>
        </div>
    )
};

export default Quote;
