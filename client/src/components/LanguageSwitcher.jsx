import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={changeLanguage}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      {i18n.language === "en" ? t("switchButton.switchAR") : t("switchButton.switchEN")}
    </button>
  );
}
