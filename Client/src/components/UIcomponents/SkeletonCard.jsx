import React from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { useStyles } from '../Form/styles';

const SkeletonCard = () => {
	const classes = useStyles();
	return (
		<div className='skeleton-parent'>
			<div>
				<div className='skeleton-container'>
					<div>
						<div className='skeleton-image'></div>

						<CardContent>
							<div className='skeleton-title'></div>
							<div className='skeleton-date my-3'></div>
							<div className='skeleton-content mb-1'></div>
							<div className='skeleton-content mb-1'></div>
							<div className='skeleton-content mb-1'></div>
							<div className='skeleton-content-small mb-1'></div>
						</CardContent>
					</div>
					<div>
						<CardActions className='d-flex justify-content-between w-100'>
							<div className='skeleton-button'></div>
							<div className='skeleton-button'></div>
						</CardActions>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonCard;
