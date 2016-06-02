import * as requestServ from './request';

export const getCommentList = () => {
    return requestServ.get('/comments')
        .then(data => data.data)
        .then(comments => {
            if (comments) {
                return comments;
            }
            throw 'get comment list failed'
        })
};

export const delComment = (id) => {
    return requestServ.del('/comments', { id: id })
        .then(data => {
            if (data.success) {
                return data.id;
            }
            throw 'delete comment failed'
        });
};


export const postComment = ({id, author, text, del}) => {
    const body = { id: id, del: del, comment: text, author: author };
    return requestServ.post('/comment', body)
        .then(data => {
            if (data.success) {
                return data.id;
            }
            throw 'post comment is failed';
        })
};

