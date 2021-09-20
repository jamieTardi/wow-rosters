import React from 'react';

import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import { Nav } from './components';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import RosterHomePage from './components/Roster/RosterHomePage';
import RaidForm from './components/Form/RaidForm';
const App = () => {
	const isDark = useSelector((state) => state.darkMode);
	return (
		<div className={isDark ? 'container dark' : 'container light'}>
			<div>
				<Nav />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/auth' exact component={Auth} />
					<Route path='/roster-creation' exact component={RosterHomePage} />
					<Route path='/raid-creation' exact component={RaidForm} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
