import React, { Component } from 'react';
import moment from "moment";
import Alert from "./Alert";
import cookie from 'react-cookies';

const dateFormat = 'YYYY-MM-DD';
class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate : "1015-01-01",
            endDate : "2020-01-01",
            userId : 0,
            bookId : 0,
            content: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if(e.target.id === "startDate") {
            this.state.startDate = e.target.value;
        }else if(e.target.id === "endDate") {
            this.state.endDate= e.target.value;
        }else if(e.target.id === "buyerId") {
            this.state.userId = e.target.value;
        }else if(e.target.id === "bookId") {
            this.state.bookId = e.target.value;
        }
    }

    // Submit date range input by user
    handleSubmit() {
        if (this.state.userId !== "" && this.state.userId >0) {
            if(!/[1-9][0-9]*/.test(this.state.userId)) {
                this.handleAlert("无效用户ID");
                return;
            }
        }

        if (this.state.bookId !== "" && this.state.bookId >0) {
            if(!/[1-9][0-9]*/.test(this.state.bookId)) {
                this.handleAlert("无效书籍ID");
                return;
            }
        }

        if (/\d{4}-\d{2}-\d{2}/.test(this.state.startDate) && /\d{4}-\d{2}-\d{2}/.test(this.state.endDate)) {
            if(this.props.onChange) {
                if (moment(this.state.startDate).isValid() && moment(this.state.endDate).isValid() &&
                    moment(this.state.endDate).isAfter(moment(this.state.startDate))) {
                    this.props.onChange(moment(this.state.startDate).format(dateFormat), moment(this.state.endDate).format(dateFormat),
                        this.state.userId, this.state.bookId);
                } else {
                    this.handleAlert("无效日期范围")
                }
            }
        }else{
            this.handleAlert("日期格式应为 YYYY-MM-DD");
        }
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {

        var admin = cookie.load("admin");
        if (admin == null || admin !== "true") {
            admin = false;
        }else{
            admin = true;
        }
        var adminBlock = admin ? (
            <div>
                <span>买家ID</span>
                <input id="buyerId" className="dateInput" type="text" onChange={this.handleChange}/><br/>
            </div>) : "";
        return (
            <div>
                <Alert content={this.state.content} cancelAlert={this.handleAlert}/>
                <div className={"leftBlock"}>
                    <span>开始日期</span>
                    <input id="startDate" className="dateInput" type="text" onChange={this.handleChange}/><br/>
                    <span>结束日期</span>
                    <input id="endDate" className="dateInput" type="text" onChange={this.handleChange}/><br/>
                </div>
                <div className={"rightBlock"}>
                    {adminBlock}
                    <span>书籍ID</span>
                    <input id="bookId" className="dateInput" type="text" onChange={this.handleChange}/><br/>
                </div>
                <input type="submit" id="signupButton" className="button" value={"搜索"} onClick={this.handleSubmit}/><br/>
            </div>
        );
    }

}

export default DatePicker;