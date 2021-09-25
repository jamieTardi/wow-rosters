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
import { googleId } from './googleId';
import { currentUser } from './currentUser';
import { createdRosters } from './createdRosters';
import { currentRoster } from './currentRoster';
import { currentAssignment } from './currentAssignment';

const rootReducer = combineReducers({
	raids,
	roster,
	assignRaids,
	createdRosters,
	currentAssignment,
	currentRoster,
	raidModal,
	currentId,
	currentUser,
	currentRaid,
	deleteLoad,
	assignments,
	darkMode,
	auth,
	googleId,
});

export default rootReducer;
