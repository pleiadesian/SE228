import React, { Component } from 'react';
import BookList from './BookList';
import BookInfo from './BookInfo';
import Login from './Login';
import Cart from './Cart';
import Order from './Order';
import AdminUser from './AdminUser';
import {Route, Switch} from "react-router";
import {HashRouter as Router} from "react-router-dom";
import UserInfo from "./UserInfo";

class MainRouter extends Component {
    render () {
        return (
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
                    <Route path="/userInfo" component={UserInfo}/>
                </Switch>
            </Router>
        )
    }
}

export default MainRouter;