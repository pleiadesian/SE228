import React, { Component } from 'react';
import Header from './component/Header';
import OrderTable from './component/OrderTable';
import Footer from './component/Footer';
import DatePicker from './component/DatePicker';
import "./css/StyleSheet1.css";
import moment from "moment";

class Order extends Component {
    constructor(props) {
        super(props);
        const dateFormat = 'YYYY-MM-DD';
        this.state = {
            startDate : moment('2000-01-01').format(dateFormat),
            endDate : moment().format(dateFormat)
        };
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(startDate, endDate){
        this.setState({
            startDate : startDate,
            endDate : endDate
        })
    }
    render() {
        return (
            <div >
                <Header
                    admin={true}
                    login={true}
                />
                <div className={"crossBar"}>
                    <div id={"datePicker"}>
                        <DatePicker onChange={this.handleDateChange}/>
                    </div>
                </div>
                <div  id={"mainBooklist"} className={"main"}>
                    <OrderTable
                        startDate = {this.state.startDate}
                        endDate = {this.state.endDate}
                    />
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Order;