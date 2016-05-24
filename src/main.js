import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import { App } from './app/App';
import {CommentSearch,CommentBox} from './app/commons/CommentBox.js';

import './styles/common.css';
import './styles/font.css';

render(
    <div>
        <CommentBox data_url="/api/comments" save_url="/api/comments"/>
    </div>
    , document.getElementById('root')
);

// setTimeout(function() {
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
// }, 3000);