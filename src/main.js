import React from 'react';
import { render } from 'react-dom';
import { App } from './app/App';
import './styles/common.css';
import './styles/font.css';

render(<div><i className="material-icons md-36">alarm</i> <App /></div>, document.getElementById('root'));