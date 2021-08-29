import React from 'react';
import { Button } from 'react-bootstrap';
import TacticsForm from './TacticsForm';

const RaidPageThree = ({ isLoading, handleSubmitSucess }) => {
	return (
		<div>
			<TacticsForm />
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
