import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { Provider } from 'react-redux'
import { Store } from './redux/Store';



ReactDOM.render(
  <GoogleOAuthProvider clientId="350789883792-pdgugqcngvmmp57pcm08it1h5dqp8tn9.apps.googleusercontent.com">
  <React.StrictMode>
  <Provider store={Store}>
      <App />
      </Provider>
  </React.StrictMode>
</GoogleOAuthProvider>,
  document.getElementById('root')
);
