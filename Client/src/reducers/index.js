import { combineReducers } from 'redux';
import { raids } from './raids';
import { roster } from './roster';
import { assignRaids } from './assignRaids';
import { raidModal } from './raidModal';

const rootReducer = combineReducers({
	raids,
	roster,
	assignRaids,
	raidModal,
});

export default rootReducer;
