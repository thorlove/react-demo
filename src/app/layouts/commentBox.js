import React, { Component } from 'react';

import CommentFilter from '../components/CommentFilter';
import CommentSearch  from '../components/CommentSearch';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

import {connectComponent} from '../utils';

class CommentBox extends Component {
    render() {
        return (
            <div className="commentBox">
                <CommentSearch onChange={text => this.searchComment(text) }/>
                <h3>评论列表</h3>
                <CommentFilter onClick={filter => this.filterComment(filter) }/>
                <CommentList comments = {this.state.comments}/>
                <CommentForm onSubmit = {comment => this.saveCommentServ(comment) }/>
            </div>
        );
    }
}
export const LayoutComponent = CommentBox;
export function mapStateToProps(state, props) {
    
}

