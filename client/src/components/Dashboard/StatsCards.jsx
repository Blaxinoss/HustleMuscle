import { t } from 'i18next';
import PropTypes from 'prop-types';

const StatsCards = ({ revenue, numMembers, needToCollect, numExpires }) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">{t('numCards.revenue')}</h3>
                <p className="text-2xl font-bold">{revenue} {t('price')}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">{t('numCards.members')}</h3>
                <p className="text-2xl font-bold">{numMembers} </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">{t('numCards.needToCollect')}</h3>
                <p className="text-2xl font-bold">{needToCollect} {t('price')} </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">{t('numCards.expire')}</h3>
                <p className="text-2xl font-bold">{numExpires} {t('price')}</p>
            </div>
        </div>
    );
};

StatsCards.propTypes = {
    revenue: PropTypes.number.isRequired,
    numMembers: PropTypes.number.isRequired,
    needToCollect: PropTypes.number.isRequired,
    numExpires: PropTypes.number.isRequired
};

export default StatsCards;
