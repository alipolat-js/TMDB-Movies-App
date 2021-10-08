import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/index'
import App from './App';

// fontawesome
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);