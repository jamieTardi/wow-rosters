import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(<App />, document.getElementById('root'));
