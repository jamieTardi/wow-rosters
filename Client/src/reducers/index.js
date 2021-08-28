import { combineReducers } from 'redux';
import { raids } from './raids';
import { roster } from './roster';
import { assignRaids } from './assignRaids';
import { raidModal } from './raidModal';
import { currentId } from './currentId';

const rootReducer = combineReducers({
	raids,
	roster,
	assignRaids,
	raidModal,
	currentId,
});

export default rootReducer;
