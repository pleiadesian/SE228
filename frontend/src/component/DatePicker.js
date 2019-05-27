import React, { Component } from 'react';
import moment from "moment";
import Alert from "./Alert";

const dateFormat = 'YYYY-MM-DD';
class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate : moment('20150101',dateFormat),
            endDate : "2019-01-01",
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
        }
    }

    // Submit date range input by user
    handleSubmit() {
        if (/\d{4}-\d{2}-\d{2}/.test(this.state.startDate) && /\d{4}-\d{2}-\d{2}/.test(this.state.endDate)) {
            if(this.props.onChange)
                if(moment(this.state.startDate).isValid() && moment(this.state.endDate).isValid()&&
                    moment(this.state.endDate).isAfter(moment(this.state.startDate))) {
                    this.props.onChange(moment(this.state.startDate).format(dateFormat), moment(this.state.endDate).format(dateFormat));
                }else{
                    this.handleAlert("无效日期范围")
                }
        }else{
            this.handleAlert("日期格式应为 YYYY-MM-DD");
        }
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {
        return (
            <div>
                <Alert content={this.state.content}/>
                <span>开始日期</span>
                <input id="startDate" className="dateInput" type="text" onChange={this.handleChange}/><br/>
                <span>结束日期</span>
                <input id="endDate" className="dateInput" type="text" onChange={this.handleChange}/><br/>
                <input type="submit" id="signupButton" className="button" value={"搜索"} onClick={this.handleSubmit}/><br/>
            </div>
        );
    }

}

export default DatePicker;