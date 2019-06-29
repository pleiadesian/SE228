import React, { Component } from 'react';
import Header from './component/Header';
import {Link, Redirect} from "react-router-dom";
import Footer from './component/Footer';
import "./css/StyleSheet1.css"
import axios from "axios";
import cookie from 'react-cookies';
import Alert from "./component/Alert";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            repeatPassword : "",
            mail : "",
            auth : "",
            resAuth : "",
            isValid : false,
            content1: "",
            content2: ""
        }
        this.handleAlert = this.handleAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goLogin = this.goLogin.bind(this);
        this.goAuthcode = this.goAuthcode.bind(this);
        this.goRegister = this.goRegister.bind(this);
    }

    async goLogin() {
        var params = new URLSearchParams();
        params.append('username',this.state.username);
        params.append('password',this.state.password);
        await axios.post('/book/login'
            ,params)
            .then(res => {
                    console.log("after login request:");
                    console.log(res.data);
                    // Get "false" from back end when login fails
                    if(!(res.data.id == null)) {
                        if (res.data.disabled == 0) {
                            cookie.save("userInfo", res.data);
                            console.log("save userType:");
                            console.log(res.data.usertype);
                            if (res.data.usertype == "admin") {
                                cookie.save("admin", true);
                            }else {
                                cookie.save("admin", false);
                            }
                            cookie.save("login", true);
                            this.handleAlert("登陆成功", 1);
                            this.setState({isValid: true});
                        }else{
                            this.handleAlert("您的账号已经被禁用", 1)
                        }
                    }
                    else {
                        this.handleAlert("用户名或密码不正确", 1);
                    }
                }
            )
    }
    async goRegister() {
        if (this.state.auth == "") {
            this.handleAlert("请输入邮箱验证码",2);
            return;
        }
        console.log(this.state.auth);
        console.log(this.state.resAuth);
        if (this.state.auth != this.state.resAuth) {
            this.handleAlert("验证码错误，请检查你的邮箱", 2);
            return;
        }

        if (this.state.password !== this.state.repeatPassword) {
            this.handleAlert("两次输入密码不一致", 2);
            return;
        }

        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.mail)) {
            this.handleAlert("邮箱格式不正确", 2);
            return;
        }

        var params = new URLSearchParams();
        params.append('username',this.state.username);
        params.append('password',this.state.password);
        params.append('mail',this.state.mail);
        params.append('auth',this.state.auth);
        await axios.post('/book/register',params)
            .then(res => {
                    console.log("after register request:");
                    console.log(res.data);
                    if(res.data === true) {
                        //this.handleAlert("注册成功", 2);
                        alert("注册成功");
                        this.setState({isValid : true});
                    }
                    else if(res.data === false)
                    {
                        this.handleAlert("该用户名已被注册", 2);
                    }else{
                        this.handleAlert("错误", 2);
                    }
                }
            )
    }

    async goAuthcode() {
        this.handleAlert("发送验证码成功", 2);
        await axios.get('/book/authcode', {params:{mail : this.state.mail}}).then(res => {
            this.state.resAuth = res.data;
        })
    }

    handleChange(e) {
        if(e.target.id === "username") {
            this.state.username = e.target.value;
        }else if(e.target.id === "passcode"){
            this.state.password = e.target.value;
        }else if(e.target.id === "repeatPasscode"){
            this.state.repeatPassword = e.target.value;
        }else if(e.target.id === "mail") {
            this.state.mail = e.target.value;
        }else if(e.target.id === "auth") {
            this.state.auth = e.target.value;
        }
    }

    // two state change to deal with login or register page
    handleAlert(content, id) {
        if (id === 1) {
            this.setState({content1: content, content2: ""});
        }else if(id === 2){
            this.setState({content1: "", content2: content});
        }
    }

    render() {
        var admin = cookie.load("admin");
        if (!(admin == null || admin !== "true")) {
            return(<Redirect to={"/admin/book"}/>);
        }else {
            if (this.state.isValid) {
                return (<Redirect to={"/"}/>);
            }
        }


        if (this.props.match.path === "/login") {
            this.state.content2="";
            return (
                <div>
                    <Alert content={this.state.content1}  cancelAlert={this.handleAlert}/>
                    <Header
                        login={true}
                        username={this.state.username}
                    />
                    <div id="mainLoginpage" className="main">
                        <div id="loginColumn">
                            <p className="title">用户名</p>
                            <input id="username" className="inputID" type="text" name="username"
                                   onChange={this.handleChange}/>
                            <p className="title">密码</p>
                            <input id="passcode" className="inputID" type="password" name="username"
                                   onChange={this.handleChange}/><br/>
                            <input type="submit" id="signupButton" className="button" value={"登录"}
                                   onClick={this.goLogin}/><br/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        } else {
            this.state.content1="";
            return (
                <div>
                    <Alert content={this.state.content2}  cancelAlert={this.handleAlert}/>
                    <Header/>
                    <div id="mainLoginpage" className="main">
                        <div>
                        </div>
                        <div id="loginColumn">
                            <p className="title">用户名</p>
                            <input id="username" className="inputID" type="text"
                                   onChange={this.handleChange}/>
                            <p className="title">密码</p>
                            <input id="passcode" className="inputID" type="password"
                                   onChange={this.handleChange}/>
                            <p className="title">重复密码</p>
                            <input id="repeatPasscode" className="inputID" type="password"
                                   onChange={this.handleChange}/>
                            <p className="title">邮箱</p>
                            <input id="mail" className="inputID" type="text"
                                   onChange={this.handleChange}/>
                           <input id="signupButton" type="submit" value="发送验证码" className="button"
                                  onClick={this.goAuthcode}/><br/>
                            <p className="title">验证码</p>
                            <input id="auth" className="inputID" type="text"
                                   onChange={this.handleChange}/><br/>
                            <input id="signupButton" type="submit" value="注册" className="button"
                                   onClick={this.goRegister}/><br/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}
export default Login;