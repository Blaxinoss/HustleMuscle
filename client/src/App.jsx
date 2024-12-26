import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import SubscriptionPage from './components/SubscriptionPage';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import ExpenseManager from './components/Expenses/ExpenseManager';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar';
import SubscriptionPage from './components/SubscriptionPage.jsx';
import Trainers from './components/Trainers/Trainers';
import store from './store.js';
import PrivateRoute from './utils/ProtectedRoute';

function App() {



	// useEffect(() => {
	// 	const handleBeforeUnload = () => {
	// 		// Logout the user by clearing the login status
	// 		localStorage.setItem('log', 'false');
	// 	};

	// 	// Attach the event listener
	// 	window.addEventListener('beforeunload', handleBeforeUnload);

	// 	// Cleanup on component unmount
	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload);
	// 	};
	// }, []);

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
