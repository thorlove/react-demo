import {createAction} from 'redux-actions';
import * as ActionsTypes from '../constants/ActionTypes.js'
import * as commentServ from '../services/commentServ'

export const postComment = createAction(ActionsTypes.ADD_COMMENT, commentServ.postComment, ({id, text, author, del}, resolved, rejected) => {
    return {
        id: id,
        text: text,
        author: author,
        del: del,
        resolved,
        rejected,
    }
});

export const delComment = createAction(ActionsTypes.DEL_COMMENT, commentServ.delComment, ({id}, resolved, rejected) => {
    return {
        id: id,
        resolved,
        rejected,
    }
});

export const searchComment = createAction(ActionsTypes.SEARCH_COMMENT, (searchText) => {
    return {
        searchText
    }
});

export const filterComment = createAction(ActionsTypes.FILTER_COMMENT, (filterText) => {
    return {
        filterText
    }
});

