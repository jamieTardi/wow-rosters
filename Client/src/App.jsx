import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import { Nav } from './components';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import RosterHomePage from './components/Roster/RosterHomePage';
import RaidForm from './components/Form/RaidForm';
import TacticsForm from './components/Form/TacticsForm';
import AssignRoster from './components/Roster/AssignRoster';
import ViewRosters from './components/Roster/ViewRosters';
import ViewAssignments from './components/Assignments/ViewAssignments';
const App = () => {
	const isDark = useSelector((state) => state.darkMode);
	const rootDiv = document.querySelector('html');
	useEffect(() => {
		if (isDark) {
			rootDiv.classList.add('dark');
			rootDiv.classList.remove('light');
		} else {
			rootDiv.classList.add('light');
			rootDiv.classList.remove('dark');
		}
	}, [isDark]);
	return (
		<div className='container'>
			<div>
				<Nav />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/auth' exact component={Auth} />
					<Route path='/roster-creation' exact component={RosterHomePage} />
					<Route path='/raid-creation' exact component={RaidForm} />
					<Route path='/assignments' exact component={TacticsForm} />
					<Route path='/current-roster' exact component={AssignRoster} />
					<Route path='/view-rosters' exact component={ViewRosters} />
					<Route path='/view-assignments' exact component={ViewAssignments} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
