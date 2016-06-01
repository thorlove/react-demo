import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStor from './app/store/configureStor';
import CommentBox from './app/layouts/commentBox';

import './styles/common.css';
import './styles/font.css';

const store = configureStor();

render(
  <Provider>
    <CommentBox store={store}/>
  </Provider>
  , document.getElementById('root')
);
