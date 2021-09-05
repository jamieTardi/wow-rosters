import React from 'react';
import Raids from './components/Raids/Raids';
import RosterForm from './components/Form/RosterForm';
import RaidForm from './components/Form/RaidForm';
import { useSelector } from 'react-redux';
const App = () => {
	const isDark = useSelector((state) => state.darkMode);
	return (
		<div className={isDark ? 'container dark' : 'container light'}>
			<div>
				<Raids />
				<RaidForm />
			</div>
		</div>
	);
};

export default App;
