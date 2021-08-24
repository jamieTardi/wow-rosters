import React from 'react';
import { Nav } from './components';
import Raids from './components/Raids/Raids';
import RosterForm from './components/Form/RosterForm';

const App = () => {
	return (
		<div>
			<div>
				<Nav />
			</div>
			<div>
				<Raids />
			</div>
			<div>
				<RosterForm />
			</div>
		</div>
	);
};

export default App;
