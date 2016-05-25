import {creatorAction} from '../utils/index.js';
const ADD_COMMENT = 'ADD_COMMENT';
const DEL_COMMENT = 'DEL_COMMENT';
const SEARCH_COMMENT = 'SEARCH_COMMENT';
const FILTER_COMMENT = 'FILTER_COMMENT';

const FILTER_PARAMS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_USE: 'SHOW_USE',
    SHOW_DEL: 'SHOW_DEL'
}

export const actions = {
    addComment: creatorAction(ADD_COMMENT, 'comment'),
    delComment: creatorAction(DEL_COMMENT, 'id'),
    searcComment: creatorAction(SEARCH_COMMENT, 'text'),
    filterComment: creatorAction(FILTER_COMMENT, 'filter')
};

export const CONSTANTS = { ADD_COMMENT, DEL_COMMENT, SEARCH_COMMENT, FILTER_COMMENT, FILTER_PARAMS };
