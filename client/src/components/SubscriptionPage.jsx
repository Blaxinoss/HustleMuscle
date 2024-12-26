import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainee } from '../slices/subscriptionSlice';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionTable from './SubscriptionTable';
const SubscriptionPage = () => {

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTrainee());
	}, [dispatch]);
	const { subList } = useSelector((state) => state.trainees);

	// Memoize the filtered subscriptions to avoid unnecessary recomputations
	const subscriptions = useMemo(() => {
		return subList ? subList.filter((sub) => !sub.deleteFlag) : [];
	}, [subList]); // Recompute only if subList changes


	return (
		<div className=" p-4
	">
			<SubscriptionForm subscriptions={subscriptions} />
			<SubscriptionTable subscriptions={subscriptions} short={false} />
		</div>
	);
};

export default SubscriptionPage;
