import {createAction} from 'redux-actions';
import * as ActionsTypes from '../constants/ActionTypes.js'

export const actions = {
    addComment: creatorAction(ActionsTypes.ADD_COMMENT, 'comment'),
    delComment: creatorAction(ActionsTypes.DEL_COMMENT, 'id'),
    searcComment: creatorAction(ActionsTypes.SEARCH_COMMENT, 'text'),
    filterComment: creatorAction(ActionsTypes.FILTER_COMMENT, 'filter')
};
