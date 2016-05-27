import React, {Component} from "react";
import ReactDOM from 'react-dom';

export default class CommentSearch extends Component {
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