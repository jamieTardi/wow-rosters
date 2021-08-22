import React from 'react';
import { Nav } from './components';
import Raids from './components/Raids/Raids';

const App = () => {
	return (
		<div>
			<div>
				<Nav />
			</div>
			<div>
				<Raids />
			</div>
		</div>
	);
};

export default App;
