import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStor from './app/store/configureStor';
import * as CommentBox from './app/layouts/CommentBox';

import './styles/common.css';
import './styles/font.css';


import {connectComponent} from './app/utils';
const CommentApp = connectComponent(CommentBox);

const store = configureStor();

render(
  <Provider store={store}>
    <CommentApp/>
  </Provider>
  , document.getElementById('root')
);
