import * as actionTypes from '../constants/ActionTypes';
import FiltersParams from '../constants/FiltersParams';

const initialState = {
    comments: []
}
function indexOf(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            return i;
        }
    }
    return -1;
}

function postComment(id, text, author, del, state) {
    let commnet = { id: id, comment: text, author: author, del: del };
    let comments = state.comments.concat([commnet]);
    return {
        ...state,
        comments: {
            ...state.comments,
            [id]: {
                ...commnet
            }
        }
    }
}

function searchComment(searchText, state) {
    if (searchText.trim().length > 0) {
        const reg = new RegExp('^.*\[' + searchText + '\].*$');
        return {
            ...state,
            comments: this.globComments.filter(item => {
                return item.comment.match(reg) != null;
            })
        }
    } else {
        return {
            ...state,
            comments: state.comments
        }
    }
}
function filterComment(filterText, state) {
    let comments = state.comments;
    if (filterText == FiltersParams.SHOW_ALL) {
        return {
            ...state,
            comments: comments
        }
    } else if (filterText == FiltersParams.SHOW_USE) {
        return {
            ...state,
            comments: comments.filter(item => {
                return !item.del;
            })
        };
    } else if (filterText == FiltersParams.SHOW_DEL) {
        return {
            ...state,
            comments: comments.filter(item => {
                return item.del;
            })
        }
    }
}

export default function comment(state = initialState, action) {
    const {payload, error, meta = {}, type} = action;
    const {sequence = {}, id = Date.now(), text = '被隐藏', author = '匿名', del = false, searchText = '', filterText = ''} = meta;

    if (sequence.type === 'start' || error) {
        return state;
    }

    switch (type) {
        case actionTypes.LOAD_COMMENT:
            return {
                ...state,
                [commnets]: payload
            };
        case actionTypes.ADD_COMMENT:
            return postComment(id, text, author, del, state);
        case actionTypes.DEL_COMMENT:
            return { className: 'comment del' };
        case actionTypes.FILTER_COMMENT:
            return searchComment(searchText, state);
        case actionTypes.SEARCH_COMMENT:
            return filterComment(filterText, state);
        default:
            return state;
    }
};
