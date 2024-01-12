import { combineReducers } from 'redux';
import searchHistoryReducer from './search/searchReducer';

const rootReducer = combineReducers({
    searchHistory: searchHistoryReducer,
});

export default rootReducer;
