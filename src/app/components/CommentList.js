import React, {Component} from "react";
import Comment from './Comment';

export default class CommentList extends Component {
    render() {
        var commentNodes = this.props.comments.map((obj) => { return (<Comment comment={obj} key={"comment_" + obj.id}>{obj.comment}</Comment>) });
        return (
            <div  className = "commentList">{commentNodes}</div>
        );
    }
}