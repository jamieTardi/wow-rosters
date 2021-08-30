import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TacticsForm from './TacticsForm';
import plus from '../../images/plus.svg';

const RaidPageThree = ({ isLoading, handleSubmitSucess }) => {
	const [numberOfTactics, setNumberOfTactics] = useState(0);
	const [tactics, setTactics] = useState([]);

	let tacticsArr = [];
	const NewForm = () => {
		for (let i = 0; i < numberOfTactics; i++) {
			tacticsArr.push(i);
		}

		return (
			<>
				<Button
					onClick={() => {
						setNumberOfTactics(numberOfTactics + 1);
					}}>
					<img src={plus} alt='plus' /> Create a new assignment table
				</Button>
				{tacticsArr.map(() => (
					<>
						<TacticsForm />
					</>
				))}
			</>
		);
	};
	return (
		<div>
			<NewForm />

			<Button
				variant='primary'
				type='submit'
				disabled={isLoading}
				onClick={!isLoading ? handleSubmitSucess : null}>
				Create Raid
			</Button>
		</div>
	);
};

export default RaidPageThree;
