import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import environment from "./environment";

const store = configureStore();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: environment.cognito.REGION,
    userPoolId: environment.cognito.USER_POOL_ID,
    userPoolWebClientId: environment.cognito.APP_CLIENT_ID
  }
});


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
