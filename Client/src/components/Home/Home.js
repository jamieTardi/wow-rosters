import React, { useEffect, useState, useRef } from 'react';
import Raids from '../Raids/Raids';
import RaidForm from '../Form/RaidForm';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_LOGIN } from '../../constants/actionTypes';
import { fetchUsers, createGoogleUser } from '../../api';
import { CURRENT_USER } from '../../constants/actionTypes';
import { getRoster } from '../../actions/roster';

const Home = () => {
	const [userRes, setUserRes] = useState(null);
	const dispatch = useDispatch();
	const googleUser = useSelector((state) => state.googleId);
	const currentUser = useSelector((state) => state.currentUser);
	const [roster, setRoster] = useState([]);
	const isInitialMount = useRef(true);

	useEffect(() => {
		dispatch(getRoster());
	}, []);

	useEffect(() => {
		dispatch({ type: GOOGLE_LOGIN, payload: null });
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
		if (localStorage.getItem('profile') !== null) {
			dispatch({
				type: CURRENT_USER,
				payload: JSON.parse(localStorage.getItem('profile')).result,
			});
		} else {
			dispatch({
				type: CURRENT_USER,
				payload: { name: 'Guest', email: 'Guest', role: 'Guest' },
			});
		}
	}, []);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			if (googleUser) {
				let updatedUser = {
					name: googleUser.name,
					email: googleUser.email,
					id: googleUser.googleId,
					password: googleUser.googleId,
					role: 'member',
				};
				dispatch({
					type: CURRENT_USER,
					payload: updatedUser,
				});
				createGoogleUser(updatedUser);
				// userRes?.forEach((user) => {
				// 	if (googleUser.email === user.email) {
				// 		return console.log('exists');
				// 	}

				// 	createGoogleUser(updatedUser);
				// 	localStorage.setItem('current_user', JSON.stringify(updatedUser));
				// 	// userRes.forEach((user) => {
				// 	// 	if (
				// 	// 		localStorage.getItem('profile') &&
				// 	// 		googleUser.email === user.email
				// 	// 	) {

				// 	// 	}
				// 	// });

				// });
			}
		}
	}, [userRes]);

	return (
		<div>
			<Raids />
		</div>
	);
};

export default Home;
