import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tab, Tabs } from 'react-bootstrap';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import CurrentAssignments from '../Raids/CurrentAssignments';

const TabbedMenu = () => {
	const [key, setKey] = useState('');
	const raid = useSelector((state) => state.currentRaid);
	const assignments = raid.tactics;
	return (
		<div>
			<Tabs
				activeKey={key}
				transition={false}
				onSelect={(k) => setKey(k)}
				id='noanim-tab-example'
				className='mb-3'>
				{assignments.map((assignment) => (
					<Tab
						eventKey={assignment.title}
						title={assignment.title}
						onClick={() => {
							setKey(assignment.title);
						}}>
						<CurrentAssignments assignment={assignment} />
					</Tab>
				))}
			</Tabs>
		</div>
	);
};

export default TabbedMenu;
