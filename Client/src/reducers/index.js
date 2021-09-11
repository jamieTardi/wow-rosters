import { combineReducers } from 'redux';
import { raids } from './raids';
import { roster } from './roster';
import { assignRaids } from './assignRaids';
import { raidModal } from './raidModal';
import { currentId } from './currentId';
import { currentRaid } from './currentRaid';
import { deleteLoad } from './deleteLoad';
import { assignments } from './assignments';
import { darkMode } from './darkMode';
import { auth } from './auth';

const rootReducer = combineReducers({
	raids,
	roster,
	assignRaids,
	raidModal,
	currentId,
	currentRaid,
	deleteLoad,
	assignments,
	darkMode,
	auth,
});

export default rootReducer;
