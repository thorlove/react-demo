import React, {Component} from "react";
import ReactDOM from 'react-dom';

export default class CommentForm extends Component {
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