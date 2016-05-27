import * as actionTypes from '../constants/ActionTypes';

export function filterComment(state = CONSTANTS.FILTER_PARAMS.SHOW_ALL, action) {
    switch (action.type) {
        case actionTypes.FILTER_COMMENT:
            return action.filter;
        default:
            return state;
    }
}

export function seracrComment(state = '', action) {
    switch (action.type) {
        case actionTypes.SEARCH_COMMENT:
            return action.text;
        default:
            return state;
    }
}

export function optComment(state = [], action) {
    switch (action.type) {
        case actionTypes.DEL_COMMENT:
            break;
        case actionTypes.ADD_COMMENT:
            return action.comment;
        default:
            return state;
    }
}