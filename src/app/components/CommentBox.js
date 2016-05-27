import React, {Component} from "react";
import FiltersParams from '../constants/FiltersParams';

import CommentFilter from './CommentFilter' ;
import CommentSearch  from './CommentSearch';
import CommentForm from './CommentForm';
import CommentList from './CommentList';


export default class CommentBox extends Component {
    constructor(props) {
        super();
        this.state = { comments: [] };
        this.globComments = [];
    }

    loadCommentServ() {
        $.ajax({
            url: this.props.data_url,
            dataType: "json",
            cache: false,
            success: comments => {
                this.globComments = comments;
                this.setState({ comments: comments });
            },
            error: (xhr, status, err) => {
                console.log(xhr, err.toString());
            }
        })
    }

    saveCommentServ(comment) {
        comment.id = Date.now();
        comment.del = false;
        this.globComments = this.state.comments.concat([comment]);
        this.setState({ comments: this.globComments });
        $.ajax({
            url: this.props.save_url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            error: (xhr, status, err) => {
                this.setState({ comments: oldComments });
                console.log(xhr, err.toString());
            }
        });
    }
    searchComment(param) {
        if (param.trim().length > 0) {
            const reg = new RegExp('^.*\[' + param + '\].*$');
            this.setState({
                comments: this.globComments.filter(item => {
                    return item.comment.match(reg) != null;
                })
            });
        } else {
            this.setState({ comments: this.globComments });
        }
    }
    filterComment(filter) {
        if (filter == FiltersParams.SHOW_ALL) {
            this.setState({ comments: this.globComments });
        } else if (filter == FiltersParams.SHOW_USE) {
            this.setState({
                comments: this.globComments.filter(item => {
                    return !item.del;
                })
            });
        } else if (filter == FiltersParams.SHOW_DEL) {
            this.setState({
                comments: this.globComments.filter(item => {
                    return item.del;
                })
            })
        }
    }


    componentDidMount() {
        this.loadCommentServ();
    }

    render() {
        return (
            <div className="commentBox">
                <CommentSearch onChange={param => this.searchComment(param) }/>
                <h3>评论列表</h3>
                <CommentFilter onClick={filter => this.filterComment(filter) }/>
                <CommentList comments = {this.state.comments}/>
                <CommentForm onSubmit = {comment => this.saveCommentServ(comment) }/>
            </div>
        );
    }
}
