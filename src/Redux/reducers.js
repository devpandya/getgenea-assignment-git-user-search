import { combineReducers } from 'redux';

const initialState = { user: {} };

function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'setUser':
			return { ...state, user: action.payload };
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	user: userReducer,
});

export default rootReducer;
