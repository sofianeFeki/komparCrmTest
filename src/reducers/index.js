import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { drawerReducer } from './drawerReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  search: searchReducer,
});

export default rootReducer;
