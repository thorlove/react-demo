import React, {Component} from "react";
import ReactDOM from 'react-dom';

class Comment extends Component {
    constructor(props) {
        super();
        this.state = { className: "comment" };
    }

    rawComment() {
        return { __html: this.props.children || '未定义'.toString() };
    }

    componentWillMount() {
        this.state.className = this.props.comment.del ? 'comment del':'comment';
    }

    handleDel() {
        // const tag = ReactDOM.findDOMNode(this);
        // $(tag).fadeOut();
        // unmountComponentAtNode(ReactDOM.findDOMNode(this));

        this.props.comment.del = true;
        this.setState({className:'comment del'});
        $.ajax({
            url: '/api/comments',
            type: 'DELETE',
            data: { id: this.props.comment.id },
            dataType: 'json',
            error: (xhr, status, err) => {
                this.setState({className:'comment'})
                console.log(xhr, err);
            }
        })
    }

    render() {
        return (
            <div className={this.state.className} ref="comment">
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

class CommentSearch extends Component {
    handleChange(e) {
        this.props.onChange(ReactDOM.findDOMNode(this.refs.txt_search).value);
    }

    render() {
        return (
            <div className="commentSearch">
                <input type="text" onInput={(e) => { this.handleChange(e) } } placeholder="输入搜索关键字" ref = "txt_search"/>
            </div>
        );
    }
}

class CommentFilter extends Component {
    handleClick(filter) {
        this.props.onClick(filter);
    }
    render() {
        return (
            <div className='commentFilter'>
                <span onClick={() => this.handleClick('SHOW_ALL') }>全部</span>
                <span onClick={() => this.handleClick('SHOW_USE') }>未删除</span>
                <span onClick={() => this.handleClick('SHOW_DEL') }>回收站</span>
            </div>
        );
    }

}

class CommentBox extends Component {
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
        if (filter == 'SHOW_ALL') {
            this.setState({ comments: this.globComments });
        } else if (filter == 'SHOW_USE') {
            this.setState({
                comments: this.globComments.filter(item => {
                    return !item.del;
                })
            });
        } else if (filter == 'SHOW_DEL') {
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

export {CommentBox,CommentFilter,CommentSearch,CommentList,Comment,CommentForm};
