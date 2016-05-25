const ADD_COMMENT = 'ADD_COMMENT';
const DEL_COMMENT = 'DEL_COMMENT';
const SEARCH_COMMENT = 'SEARCH_COMMENT';
const FILTER_COMMENT = 'FILTER_COMMENT';

const FILTER_PARAMS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_USE: 'SHOW_USE',
    SHOW_DEL: 'SHOW_DEL'
}

export {ADD_COMMENT, DEL_COMMENT, SEARCH_COMMENT, FILTER_COMMENT, FILTER_PARAMS}

function addComment(comment) {
    return { type: ADD_COMMENT, comment:comment };
}

function delComment(id) {
    return { type: DEL_COMMENT, id:id };
}

function searcComment(text) {
    return { type: SEARCH_COMMENT, text:text };
}

function filterComment(filter) {
    return { type: FILTER_COMMENT, filter:filter };
}

export {addComment, delComment, searcComment, filterComment}

