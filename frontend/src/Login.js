import React, { Component } from 'react';
import Header from './component/Header';
import {Link, Redirect} from "react-router-dom";
import Footer from './component/Footer';
import "./css/StyleSheet1.css"
import axios from "axios";
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            repeatPassword : "",
            mail : "",
            isValid : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.goLogin = this.goLogin.bind(this);
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
                    if(!(res.data == null)) {
                        if (res.data.disabled == false) {
                            cookie.save("userInfo", res.data);
                            cookie.save("admin", false);
                            cookie.save("login", true);
                            alert("登陆成功");
                            this.setState({isValid: true});
                        }else{
                            alert("登陆失败")
                        }
                    }
                    else {
                        alert("用户名或密码不正确");
                    }
                }
            )
    }
    async goRegister() {
        if (this.state.password !== this.state.repeatPassword) {
            alert("两次输入密码不一致")
            return;
        }

        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.mail)) {
            alert("邮箱格式不正确");
            return;
        }

        var params = new URLSearchParams();
        params.append('username',this.state.username);
        params.append('password',this.state.password);
        params.append('mail',this.state.mail);
        await axios.post('/book/register',params)
            .then(res => {
                    console.log("after register request:");
                    console.log(res.data);
                    if(res.data === true) {
                        alert("注册成功");
                        this.setState({isValid : true});
                    }
                    else if(res.data === false)
                    {
                        alert("注册失败");
                    }else{
                        alert("错误");
                    }
                }
            )
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
        }
    }

    render() {
        if(this.state.isValid)   {
            return(<Redirect to={"/"}/>);
        }

        if (this.props.match.path === "/login") {
            return (
                <div>
                    <Header
                        login = {true}
                        username = {this.state.username}
                    />
                    <div id="mainLoginpage" className="main">
                        <div id="loginColumn">
                            <p className="title">用户名</p>
                            <input id="username" className="inputID" type="text" name="username" onChange={this.handleChange}/>
                            <p className="title">密码</p>
                            <input id="passcode" className="inputID" type="password" name="username" onChange={this.handleChange}/><br/>
                            <input type="submit" id="signupButton" className="button" value={"登录"} onClick={this.goLogin}/><br/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Header/>
                    <div id="mainLoginpage" className="main">
                        <div id="loginColumn">
                            <p className="title">用户名</p>
                            <input id="username" className="inputID" type="text" name="username" onChange={this.handleChange}/>
                            <p className="title">密码</p>
                            <input id="passcode" className="inputID" type="password" name="username" onChange={this.handleChange}/>
                            <p className="title">重复密码</p>
                            <input id="repeatPasscode" className="inputID" type="password" name="username" onChange={this.handleChange}/>
                            <p className="title">邮箱</p>
                            <input id="mail" className="inputID" type="text" name="username" onChange={this.handleChange}/><br/>
                            <input id="signupButton" type="submit" value="注册" className="button" onClick={this.goRegister}/><br/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }

    }
}
export default Login;