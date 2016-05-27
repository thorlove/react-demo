import { combineReducers } from 'redux';
import * as comment from './comment';


export default combineReducers({
    ...comment
});