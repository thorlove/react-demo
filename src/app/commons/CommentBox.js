import React, {Component} from "react";
import ReactDOM from 'react-dom';

class Comment extends Component {
    constructor(props) {
        super();
        this.state = { display: "block" };
    }

    rawComment() {
        return { __html: this.props.children || '未定义'.toString() };
    }

    handleDel() {
        this.props.comment.del = true;
        console.log(this.props.comment);
    }

    componentDidMount() {
        this.setState({
            display: this.props.comment.del ? 'none' : 'block'
        });
    }
    
    render() {
        this.state.display = this.props.comment.del ? 'none' : 'block';
        return (
            <div style={{ display: this.state.display }}>
                <p dangerouslySetInnerHTML={this.rawComment() }></p>
                <span>{"-" + this.props.comment.author}</span>
                <sapn onClick={() => { this.handleDel() } } style={{ marginLeft: '10em' }} className="material-icons md-14 md-inactive">close</sapn>
            </div>
        )
    }
}
class CommentForm extends Component {
    handleSave() {
        const comment = ReactDOM.findDOMNode(this.refs.txt_comment).value;
        const author = ReactDOM.findDOMNode(this.refs.txt_author).value;
        const form = ReactDOM.findDOMNode(this.refs.form);
        this.props.onSubmit({ "comment": comment, "author": author });
        form.reset();
    }

    render() {
        return (
            <form className="commentForm" ref = "form">
                <p>内容：<input type="text" placeholder = "说些什么吧" ref="txt_comment"/></p>
                <p>名字：<input type="text" placeholder = "告诉我你的名字" ref="txt_author"/></p>
                <button type="button" onClick={() => this.handleSave() }>保存</button>
            </form>
        )
    }
}
class CommentList extends Component {
    render() {
        var commentNodes = this.props.comments.map((obj) => { return (<Comment comment={obj} key={"comment_" + obj.id}>{obj.comment}</Comment>) });
        return (
            <div  className = "commentList">{commentNodes}</div>
        );
    }
}

export class CommentBox extends Component {
    constructor(props) {
        super();
        this.state = { comments: [] };
    }

    loadCommentServ() {
        $.ajax({
            url: this.props.data_url,
            dataType: "json",
            cache: false,
            success: comments => {
                this.setState({ comments: comments });
            },
            error: (xhr, status, err) => {
                console.log(xhr, err.toString());
            }
        })
    }

    saveCommentServ(comment) {
        var oldComments = this.state.comments;
        var newComments = oldComments.concat([comment]);
        this.setState({ comments: newComments });
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

    delCommentServ(comment) {
        $.ajax({
            url: '/api/comments',
            type: 'DELETE',
            data: { id: this.props.id },
            dataType: 'json',
            success: comments => {

            },
            error: (xhr, status, err) => {

            }
        })
    }

    componentDidMount() {
        this.loadCommentServ();
    }

    render() {
        return (
            <div className="commentBox">
                <CommentList comments = {this.state.comments}/>
                <CommentForm onSubmit = {comment => this.saveCommentServ(comment) }/>
            </div>
        );
    }
}
