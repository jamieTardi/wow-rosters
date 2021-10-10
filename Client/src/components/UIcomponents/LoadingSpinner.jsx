import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
	return (
		<div
			style={{ height: '250px' }}
			className='d-flex justify-content-center align-items-center flex-column'>
			<Spinner animation='grow' variant='success' size='xl' />
			<h5>Poking the server with a pointy stick....</h5>
		</div>
	);
};

export default LoadingSpinner;
