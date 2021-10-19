import React from 'react';
import SkeletonCard from './SkeletonCard';

const Loading = () => {
	const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<div className='row'>
			{loadingArr.map(() => (
				<div className='mt-4 col-12 col-sm-6 col-lg-4  mb-4 d-flex justify-content-center '>
					<SkeletonCard />
				</div>
			))}
		</div>
	);
};

export default Loading;
