import React from 'react';
import { render } from 'react-dom';
import { App } from './app/App';
import {CommentBox} from './app/commons/CommentBox.js';

import './styles/common.css';
import './styles/font.css';

render(
    <div>
        <h1>评论列表</h1>
        <CommentBox data_url="/api/comments" save_url="/api/comments"/>
    </div>
    , document.getElementById('root')
);