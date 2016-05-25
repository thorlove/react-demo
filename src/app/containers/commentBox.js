import React, { Component } from 'react'
import { connect } from 'react-redux'
import {actions ,CONSTANTS} from '../actions/CommentBoxA.js';
import {CommentFilter, CommentSearch, CommentList, Comment, CommentForm} from '../components/CommentBox.js';


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
