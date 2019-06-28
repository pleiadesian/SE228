import React, {Component} from "react";
import Footer from "./component/Footer";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Alert from "./component/Alert";
import Avatar from "./component/Avatar";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address : "",
            gender : "",
            telephone : "",
            avatar: "",
            content : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserInfo();
    }

    handleChange(e) {
        if(e.target.id === "address") {
            this.state.address = e.target.value;
        }else if(e.target.id === "gender"){
            this.state.gender = e.target.value;
        }else if(e.target.id === "telephone"){
            this.state.telephone = e.target.value;
        }
    }

    async getUserInfo() {
        var userInfo = cookie.load("userInfo");
        if (userInfo!=null) {
            var userId = cookie.load("userInfo").id;
            await axios.get('/book/getUserInfo'
                , {
                    params: {
                        "userId" : userId,
                    }
                }).then(res => {
                    if (res.data != null) {
                        this.setState({
                            address : res.data.address,
                            gender : res.data.gender,
                            telephone : res.data.telephone,
                            avatar : res.data.img
                        })
                    }
            })
        }
    }

    async updateUserInfo() {
        var userInfo = cookie.load("userInfo");
        if (userInfo!=null) {
            var userId = cookie.load("userInfo").id;
            await axios.get('/book/saveUserInfo'
                , {
                    params: {
                        "userId" : userId,
                        "address" : this.state.address,
                        "gender" : this.state.gender,
                        "telephone" : this.state.telephone
                    }
                })
            this.handleAlert("更新用户信息成功");
        }
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {
        var userInfo = cookie.load("userInfo");
        var username;
        if (userInfo!=null){
            username = userInfo.username;
        }
        var avatarUrl = "http://localhost:8080/book/"+this.state.avatar;
        return(
            <div>
                <Alert content={this.state.content} cancelAlert={this.handleAlert}/>
                <div id={"userInfoTitle"}>
                    <h1>用户信息</h1>
                    <p>用户名：{username}</p>
                    <div id={"backButtonWrapper"}>
                        <Link to={"/"}>返回</Link>
                    </div>
                </div>
                <div id={"userInfoWrapper"}>
                    <div id = {"userInfoAvatar"}>
                        <img src={avatarUrl} className={"avatarBigImg"} />
                        <div  className={"avatarUpload"}>
                            <Avatar url={"/book/saveUserAvatar"}/>
                        </div>
                    </div>
                    <div id = {"userInfoForm"}>
                        <div className={"inputWrapper"}>
                            <p className="title">住址</p>
                            <input id="address" className="inputID" type="text" defaultValue={this.state.address} onChange={this.handleChange}/>
                            <p className="title">性别</p>
                            <input id="gender" className="inputID" type="text" defaultValue={this.state.gender} onChange={this.handleChange}/>
                            <p className="title">电话</p>
                            <input id="telephone" className="inputID" type="text" defaultValue={this.state.telephone} onChange={this.handleChange}/>
                        </div>
                        <Button onClick={this.updateUserInfo}>更新信息</Button>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default UserInfo;