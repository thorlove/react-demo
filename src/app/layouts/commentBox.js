import React, { Component } from 'react';

import CommentFilter from '../components/CommentFilter';
import CommentSearch  from '../components/CommentSearch';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';


class CommentBox extends Component {

    componentDidMount() {
        const {actions} = this.props;
        actions.loadComments();
    }
    render() {
        // console.log(this.props);
        const {comments, actions} = this.props;
        return (
            <div className="commentBox">
                <CommentSearch onChange={searchText => actions.searchComment(text) }/>
                <h3>评论列表</h3>
                <CommentFilter onClick={filterText => actions.filterComment(filterText) }/>
                <CommentList comments = {comments}/>
                <CommentForm onSubmit = {comment => actions.postComment(comment) }/>
            </div>
        );
    }
}

export const LayoutComponent = CommentBox;
export function mapStateToProps(state, props) {
    return {
        comments: state.comments
    }
}