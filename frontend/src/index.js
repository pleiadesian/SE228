import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BookList from './BookList';
import BookInfo from './BookInfo';
import Login from './Login';
import Cart from './Cart';
import Order from './Order';
import AdminUser from './AdminUser';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

document.title="e-book"
ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={BookList}/>
            <Route path="/info/:id" component={BookInfo}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Login}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/admin/user" component={AdminUser}/>
            <Route path="/admin/book" component={BookList}/>
            <Route path="/admin/order" component={Order}/>
            <Route path="/order" component={Order}/>
        </Switch>
    </Router>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA           <!-- 
//             <Route path="/login" component={Login} />-->
serviceWorker.unregister();
