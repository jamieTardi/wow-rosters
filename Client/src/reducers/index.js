import { combineReducers } from 'redux';
import { raids } from './raids';
import { roster } from './roster';

const rootReducer = combineReducers({
	raids,
	roster,
});

export default rootReducer;
