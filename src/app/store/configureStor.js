import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import minPendingTimeMiddleware from './minPendingTimeMiddleware';
import promiseMiddleware from './promiseMiddleware';
import utilsMiddleware from './utilsMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';

import reducers from '../reducers';


const isDebuggingInChrome = !!window.navigator.userAgent;
const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

let middlewares = [
	thunkMiddleware,
	minPendingTimeMiddleware,
	promiseMiddleware,
	// utilsMiddleware,
	asyncActionCallbackMiddleware
];

if (isDebuggingInChrome) {
	middlewares.push(logger);
}

export default function configureStore(initialState) {
	const store = applyMiddleware(...middlewares)(createStore)(reducers, initialState);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	if (isDebuggingInChrome) {
		window.store = store;
	}

	return store;
}