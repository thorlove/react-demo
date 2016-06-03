import React, {Component} from "react";
import ReactDOM from 'react-dom';

export default class Comment extends Component {
    constructor(props) {
        super();
        this.state = { className: "comment" };
    }

    rawComment() {
        return { __html: this.props.children || '被隐藏'.toString() };
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
        const {className,actions,comment} = this.props;
        return (
            <div className={className} ref="comment">
                <p dangerouslySetInnerHTML={this.rawComment() }></p>
                <span>{"-" + comment.author}</span>
                <sapn onClick={() => actions.delComment(comment.id) } style={{ marginLeft: '10em' }} className="material-icons md-14 md-inactive">close</sapn>
            </div>
        )
    }
}

export const LayoutComponent = Comment;
export function mapStateToProps(state, props) {
    return {
        className:state.className
    }
}