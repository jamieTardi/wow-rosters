import React from 'react';
import Raids from './components/Raids/Raids';
import RosterForm from './components/Form/RosterForm';
import RaidForm from './components/Form/RaidForm';
const App = () => {
	return (
		<div className='container'>
			<div>
				<Raids />
				<RaidForm />
			</div>
		</div>
	);
};

export default App;
