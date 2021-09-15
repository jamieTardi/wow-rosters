import React, { useEffect, useState } from 'react';
import Raids from '../Raids/Raids';
import RaidForm from '../Form/RaidForm';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_LOGIN } from '../../constants/actionTypes';
import { fetchUsers, createGoogleUser } from '../../api';

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
				return console.log('exists');
			}
			createGoogleUser(googleUser);
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
