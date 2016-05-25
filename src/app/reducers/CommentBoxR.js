import {combineReducers} from 'redux';
import * as actions from '../actions/CommentBoxA.js';

function filterComment(state = actions.FILTER_PARAMS.SHOW_ALL, action) {
    switch (action.type) {
        case actions.FILTER_COMMENT:
            return action.filter;
        default:
            return state;
    }
}

function seracrComment(state = '', action) {
    switch (action.type) {
        case actions.SEARCH_COMMENT:
            return action.text;
        default:
            return state;
    }
}

function optComment(state = [], action) {
    switch (action.type) {
        case actions.DEL_COMMENT:
            break;
        case actions.ADD_COMMENT:
            return action.comment;
        default:
            return state;
    }
}

const CommentBoxApp =  combineReducers({
    filterComment,
    seracrComment,
    optComment
}); 

export default CommentBoxApp;