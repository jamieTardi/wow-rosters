import React, { useEffect, useState, useRef } from 'react';
import Raids from '../Raids/Raids';
import RaidForm from '../Form/RaidForm';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_LOGIN } from '../../constants/actionTypes';
import { fetchUsers, createGoogleUser } from '../../api';
import { CURRENT_USER } from '../../constants/actionTypes';
import { getRoster } from '../../actions/roster';
import { v4 as uuidv4 } from 'uuid';

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
			const googleId =
				newLogin.result !== undefined
					? newLogin.result.googleId
					: newLogin.googleId;
			if (googleId) {
				dispatch({ type: GOOGLE_LOGIN, payload: newLogin.result });
			}
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem('profile') !== null) {
			dispatch({
				type: CURRENT_USER,
				payload:
					JSON.parse(localStorage.getItem('profile')).result !== undefined
						? JSON.parse(localStorage.getItem('profile')).result
						: JSON.parse(localStorage.getItem('profile')),
			});
		} else {
			dispatch({
				type: CURRENT_USER,
				payload: {
					name: 'Guest',
					email: 'Guest',
					role: 'Guest',
					guild: 'Example',
				},
			});
		}
	}, []);

	useEffect(() => {
		if (googleUser) {
			if (userRes) {
				let isUser =
					userRes?.filter((user) => user.email === googleUser.email).length > 0;

				if (isUser) {
					let filitered = userRes?.filter(
						(user) => user.email === googleUser.email,
					);

					let currentGoogleUser = {
						_id: filitered[0]._id,
						name: filitered[0].name,
						email: filitered[0].email,
						password: '',
						role: filitered[0].role,
						guild: filitered[0].guild,
						character: filitered[0].character,
					};
					localStorage.setItem(
						'current_user',
						JSON.stringify(currentGoogleUser),
					);
					dispatch({
						type: CURRENT_USER,
						payload: currentGoogleUser,
					});
				} else {
					let currentGoogleUser = {
						name: googleUser.name,
						email: googleUser.email,
						id: uuidv4(),
						password: '',
						role: 'member',
						guild: 'guildless',
						character: 'none',
					};
					localStorage.setItem('profile', JSON.stringify(currentGoogleUser));
					dispatch({
						type: CURRENT_USER,
						payload: currentGoogleUser,
					});
					createGoogleUser(currentGoogleUser);
				}
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
