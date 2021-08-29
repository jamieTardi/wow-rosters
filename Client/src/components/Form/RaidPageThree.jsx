import React from 'react';
import { Button } from 'react-bootstrap';

const RaidPageThree = ({ isLoading, handleSubmitSucess }) => {
	return (
		<div>
			Page 3
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
