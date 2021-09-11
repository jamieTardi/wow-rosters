import React from 'react';
import Raids from './components/Raids/Raids';
import RosterForm from './components/Form/RosterForm';
import RaidForm from './components/Form/RaidForm';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import { Nav } from './components';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
const App = () => {
	const isDark = useSelector((state) => state.darkMode);
	return (
		<div className={isDark ? 'container dark' : 'container light'}>
			<div>
				<Nav />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/auth' exact component={Auth} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
