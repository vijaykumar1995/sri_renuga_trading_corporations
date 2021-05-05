import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import decode from 'jwt-decode';
import thunk from 'redux-thunk';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.SRTJWT) {
	const payload = decode(localStorage.SRTJWT);
	
		const user = {
			token: localStorage.SRTJWT,
			email: payload.email,
			confirmed: localStorage.validated
		};
		setAuthorizationHeader(localStorage.SRTJWT);
		store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
