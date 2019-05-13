import React, { Component } from 'react';
import '../css/Header.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import cookie from 'react-cookies';

class Header extends Component {
    constructor(props) {
        super(props);
        // Get login state from cookie
        var login = cookie.load("login") === "true";
        var admin = cookie.load("admin") === "true";
        var userInfo = cookie.load("userInfo");
        var username = "";
        if (admin == null) {
            admin = false;
        }
        if (login == null) {
            login = false;
        }
        if (userInfo != null) {
            username = userInfo.username;
        }
        this.state = {
            admin: admin,
            login: login,
            username : username,
            logout : false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNavi = this.handleNavi.bind(this);
        this.goGetData = this.goGetData.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    // Render again when get props from parent component
    componentWillReceiveProps(nextProps, nextContext) {
        this.goGetData();
    }

    goGetData() {
        var login = cookie.load("login") === "true";
        var admin = cookie.load("admin") === "true";
        var userInfo = cookie.load("userInfo");
        if (userInfo == null)
            return;
        var username = userInfo.username;
        this.setState({
            login: login,
            username: username
        });
    }

    logout() {
        this.handleLogout();
    }

    async handleLogout() {
        console.log("excute log out")
        await axios.get('/book/logout')
            .then(res => {
                    cookie.remove("userInfo");
                    cookie.save("login", false);
                    cookie.save("admin", false);
                    this.setState({
                        login : false ,
                        username :"",
                        logout : true
                    })
                }
            )
    }

    handleSearch() {
        if (this.props.onSearchChange) {
            this.props.onSearchChange();
        }
    }

    handleAlert() {
        alert("请先登录");
    }

    handleNavi() {
        const loginList = (
            <div>
                <li><Link to={"/cart"}>购物车</Link></li>
                <li><Link to={"/order"} id={"login"}>订单</Link><Link onClick={this.logout} id={"register"}>退出</Link></li>
            </div>
        );
        const unloginList = (
            <div>
                <li><Link onClick={this.handleAlert}>购物车</Link></li>
                <li><Link to={"/login"} id={"login"}>登录</Link><Link to={"/register"} id={"register"}>注册</Link></li>
            </div>
        );
        const insertList = this.state.login ? (loginList) : (unloginList);

        if(this.state.admin && this.state.login) {
            console.log("state when rendering:");
            console.log(this.state.admin);
            return (
                <ul className="option">
                    <li><Link to={"/admin/user"}>用户管理</Link></li>
                    <li><Link to={"/admin/book"}>书籍管理</Link></li>
                    <li><a onClick={this.handleSearch}>查找图书</a></li>
                    <li><Link to={"/admin/order"} id={"login"}>订单</Link><Link onClick={this.logout} id={"register"}>退出</Link></li>
                </ul>
            );
        }else{
            return (
                <ul className="option">
                    <li><Link to={"/"}>图书浏览</Link></li>
                    <li><a onClick={this.handleSearch}>查找图书</a></li>
                    {insertList}
                </ul>
            );
        }
    }

    render() {
        // Redirect to home page after log out
        if (this.state.logout) {
                this.setState({logout:false});
                return (<Redirect to={"/login"}/>);
        }

        return (
            <div id="header">
                <div id="caption">
                    <h1>e-book</h1>
                </div>
                <div id="navi">
                    {this.handleNavi()}
                </div>
                <div id={"userInfo"}>
                    <div className={"avatar"}>
                        <img src={require("./img/avatar.jpg")} className={"avatarImg"} />
                    </div>
                    <div className={"username"}>
                        <h3>{this.state.username}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;