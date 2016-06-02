import { combineReducers } from 'redux';
import * as comment from './comment';
import utils from './utils';

export default combineReducers({
    ...comment,
    utils
});