import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MainRouter from './MainRouter';

document.title="e-book"
ReactDOM.render(
    <MainRouter/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA           <!-- 
//             <Route path="/login" component={Login} />-->
serviceWorker.unregister();
