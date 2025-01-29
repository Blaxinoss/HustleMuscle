import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import SubscriptionPage from './components/SubscriptionPage';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from './components/Dashboard/Dashboard';
import AllUsers from './components/DetailedUsers/AllUsers.jsx';
import UserDetails from './components/DetailedUsers/UserDetails.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import ExpenseManager from './components/Expenses/ExpenseManager';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar';
import SubscriptionPage from './components/SubscriptionPage.jsx';
import Trainers from './components/Trainers/Trainers';
import './i18n';
import store from './store.js';
import PrivateRoute from './utils/ProtectedRoute';

function App() {

	const { i18n, t } = useTranslation();

	useEffect(() => {

		console.log(i18n)
		document.documentElement.lang = i18n.language;
		document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";

		if (i18n.language === 'ar') {
			document.documentElement.style.fontFamily = "'Almarai', sans-serif"; // Apply Arabic font
		} else {
			document.documentElement.style.fontFamily = "'Roboto', sans-serif"; // Apply default font (e.g., English font)
		}

	}, [i18n.language])
	return (

		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />

						<Route element={<PrivateRoute />}>
							<Route element={<Navbar />}>
								<Route path="/trainers" element={<Trainers />} />
								<Route path="/trainees" element={<SubscriptionPage />} />
								<Route path="/expenses" element={<ExpenseManager />} />

								<Route path="/dashboard" element={<Dashboard />} />
								<Route path='/allUsers' element={<AllUsers />} />
								<Route path='/userDetails/:phone' element={<UserDetails />} />
								<Route path="*" element={<ErrorBoundary />} />
							</Route>
						</Route>

					</Routes>
				</BrowserRouter>
			</Provider>

		</>
	);
}

export default App;
