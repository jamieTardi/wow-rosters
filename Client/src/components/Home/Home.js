import React, { useEffect, useState } from 'react';
import Raids from '../Raids/Raids';
import RaidForm from '../Form/RaidForm';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_LOGIN } from '../../constants/actionTypes';
import { fetchUsers } from '../../api';

const Home = () => {
	const [userRes, setUserRes] = useState(null);
	const dispatch = useDispatch();
	const googleUser = useSelector((state) => state.googleId);

	useEffect(() => {
		fetchUsers(setUserRes);
		if (localStorage.getItem('profile')) {
			let newLogin = JSON.parse(localStorage.getItem('profile'));
			const googleId = newLogin.result.googleId;
			if (googleId) {
				dispatch({ type: GOOGLE_LOGIN, payload: newLogin.result });
			}
		}
	}, []);

	useEffect(() => {
		userRes?.forEach((user) => {
			if (googleUser.email === user.email) {
				console.log('user exists');
			} else {
				console.log('does not exist');
			}
		});
	}, [userRes]);

	return (
		<div>
			<Raids />
			<RaidForm />
		</div>
	);
};

export default Home;
