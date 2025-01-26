import { faBell, faBellSlash, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ notificationsArray, openNotifications, setOpenNotifications }) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 p-3 rounded-lg">
                <FontAwesomeIcon icon={faDumbbell} size="2x" className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-xs text-gray-400">Welcome</h3>
                <span className="text-sm md:text-lg font-bold">Mohamed Hassan</span>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="notifications-wrapper relative">
                <div className={`bg-gray-800 p-4 rounded-lg absolute -right-20 w-[20rem] top-1/2  translate-y-[2rem] ${openNotifications ? 'block' : 'hidden'}`}>
                    <ul className="list-none space-y-4 mt-4 text-gray-400">
                        {notificationsArray.map((notify, index) => (
                            <li key={index} className="bg-[#154dc5] text-white p-4 rounded-lg shadow-md">
                                {notify.name} subscription will expire today. Try to call at {notify.phone}.
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="bg-gray-800 p-2 rounded-full" onClick={() => setOpenNotifications(!openNotifications)}>
                    <FontAwesomeIcon
                        icon={notificationsArray.length ? faBell : faBellSlash}
                        size="2x"
                        className="text-white"
                    />
                </button>
            </div>
            <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
                <img src="/Mo.png" alt="Profile" className="w-full h-full" />
            </div>
        </div>
    </div>
);

export default Header;
