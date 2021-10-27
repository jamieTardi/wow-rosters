import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { darkMode } from '../../reducers/darkMode';

const DarkModeBTN = () => {
	const dispatch = useDispatch();
	const isDark = useSelector((state) => state.darkMode);

	const handleDarkMode = () => {
		switch (isDark) {
			case true:
				return dispatch({ type: 'LIGHT_MODE' });
			case false:
				return dispatch({ type: 'DARK_MODE' });
			default:
				return darkMode;
		}
	};

	useEffect(() => {
		dispatch({ type: 'DARK_MODE' });
	}, []);

	return (
		<input
			type='checkbox'
			name='checkbox'
			className='switch'
			onClick={handleDarkMode}
		/>
	);
};

export default DarkModeBTN;
