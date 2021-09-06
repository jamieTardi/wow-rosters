import React from 'react';
import SkeletonCard from './SkeletonCard';

const Loading = () => {
	const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<div>
			<div className='mb-5 col-12 col-sm-6 col-lg-4  d-flex justify-content-center w-100'>
				<SkeletonCard />
			</div>
			<div className='row'>
				{loadingArr.map(() => (
					<div className='col-12 col-sm-6 col-lg-4  mb-4 d-flex justify-content-center '>
						<SkeletonCard />
					</div>
				))}
			</div>
		</div>
	);
};

export default Loading;
