import PropTypes from 'prop-types';

const StatsCards = ({ revenue, numMembers, needToCollect, numExpires }) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Revenue</h3>
                <p className="text-2xl font-bold">EGP {revenue}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Members</h3>
                <p className="text-2xl font-bold">{numMembers}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Need to Collect</h3>
                <p className="text-2xl font-bold">EGP {needToCollect}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Expiring Subscriptions</h3>
                <p className="text-2xl font-bold">{numExpires}</p>
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
