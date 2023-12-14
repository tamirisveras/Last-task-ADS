import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from '../src/services/serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyRoutes from './routes';


ReactDOM.render(<MyRoutes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
