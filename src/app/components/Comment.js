import React, {Component} from "react";
import ReactDOM from 'react-dom';

export default class Comment extends Component {
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
