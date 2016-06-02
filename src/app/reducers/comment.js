import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    className: '',
    comments: []
}

function postComment(params) {
    
    
}

function delComment(param) { 
    
 }
 
 function filterComment(params) {
     
     
 }
 
 function searchComment(params) {
     
 }

export default function (state = initialState, action) {
    const {payload, error, meta = {}, type} = action;
    const {sequence = {}, id = Date.now(), text = '被隐藏', author = '匿名', del = false, searchText = '', filterText = ''} = meta;

    if (sequence.type === 'start' || error) {
        return state;
    }

    switch (type) {
        case actionTypes.ADD_COMMENT:
            return {};
        case actionTypes.DEL_COMMENT:
            return {};
        case actionTypes.FILTER_COMMENT:
            return {};
        case actionTypes.SEARCH_COMMENT:
            return {};
        default:
            return state;
    }
};
