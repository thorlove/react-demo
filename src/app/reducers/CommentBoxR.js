import {combineReducers} from 'redux';
import {CONSTANTS} from '../actions/CommentBoxA.js';

function filterComment(state = CONSTANTS.FILTER_PARAMS.SHOW_ALL, action) {
    switch (action.type) {
        case constants.FILTER_COMMENT:
            return action.filter;
        default:
            return state;
    }
}

function seracrComment(state = '', action) {
    switch (action.type) {
        case CONSTANTS.SEARCH_COMMENT:
            return action.text;
        default:
            return state;
    }
}

function optComment(state = [], action) {
    switch (action.type) {
        case CONSTANTS.DEL_COMMENT:
            break;
        case CONSTANTS.ADD_COMMENT:
            return action.comment;
        default:
            return state;
    }
}

const commentBoxReducers =  combineReducers({
    filterComment,
    seracrComment,
    optComment
});

export default commentBoxReducers;