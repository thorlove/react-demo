import React, {Component} from "react";
import FiltersParams from '../constants/FiltersParams.js'

export default class CommentFilter extends Component {
    handleClick(filter) {
        this.props.onClick(filter);
    }
    render() {
        return (
            <div className='commentFilter'>
                <span onClick={() => this.handleClick(FiltersParams.SHOW_ALL) }>全部</span>
                <span onClick={() => this.handleClick(FiltersParams.SHOW_USE) }>未删除</span>
                <span onClick={() => this.handleClick(FiltersParams.SHOW_DEL) }>回收站</span>
            </div>
        );
    }
}
