import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "../css/ItemAmount.css"
import Alert from "./Alert";

class ItemAmount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount : this.props.amount,
            content : ""
        };
        this.handleAlert = this.handleAlert.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }
    handleAmountChange (num) {
        if(this.state.amount + num <= 0) {
            this.handleAlert("已经是最小数目");
            return;
        }
        var tempAmount = this.state.amount + num;
        console.log("tempamount:"+tempAmount);
        if(this.props.onQuantityChange) {
            // Is in the cart page?
            console.log("this.props.index"+this.props.index);
            if(this.props.index != null){
                this.props.onQuantityChange(num, this.props.index);  // Corresponding to different book in cart page
            }else {
                this.props.onQuantityChange(tempAmount);
            }
        }
        this.setState({
            amount : tempAmount
        })
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {
        console.log("amount:"+this.state.amount);
        return (
            <div className="itemAmount">
                <Alert content={this.state.content} cancelAlert={this.handleAlert}/>
                <Button className="amount" id={"minus"} onClick={this.handleAmountChange.bind(this,-1)} >-</Button>
                <input type="text" id={"inputtext"} readOnly={true} value={this.state.amount}/>
                <Button className="amount" id={"plus"} onClick={this.handleAmountChange.bind(this,1)}>+</Button>
            </div>
        );
    }
}

export default ItemAmount;