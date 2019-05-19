import React, { Component } from 'react';
import Header from './component/Header';
import BookTable from "./component/BookTable";
import Footer from './component/Footer';
import "./css/StyleSheet1.css"
import axios from "axios";
import cookie from 'react-cookies';

var sum = 0;
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArr :[]
        };
        this.goGetData = this.goGetData.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.goGetData();
    }

    async goGetData() {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null){
            alert("获取用户信息错误");
            return;
        }
        var userid = userInfo.id;
        await axios.get('/book/getCart',
            {params:{userid: userid}})
            .then(res => {
                    console.log("get cart item info:");
                    console.log(res.data);
                    if (res.data !== null) {
                        this.setState({itemArr: res.data});
                    }else{
                        this.setState({itemArr: []});
                    }
                }
            );
    }

    getSum() {
        console.log("before get sum")
        console.log(this.state.itemArr);
        if( this.state.itemArr[0] == null) {
            console.log("there");
            sum = 0.0;
            return 0.0;
        }
        else {
            sum = 0.0;
            this.state.itemArr.forEach((item) => {
                sum += item.book.price * item.quantity;
            });
            sum = sum.toFixed(2);
            return sum;
        }
    }

    handleSubmitOrder() {
        var valid = true;
        // Item list is null?
         if(this.state.itemArr[0] == null) {
             alert("购物车为空");
             valid = false;
         }

        // Check storage at front end
        if(valid) {
            this.state.itemArr.forEach((item, index) => {
                if (item.quantity > item.book.storage) {
                    alert("库存不足，购买失败");
                    valid = false;
                }
            });
        }

        if (valid) {
         var userInfo = cookie.load("userInfo");
            if (userInfo == null) {
                alert("请先登录");
            }else {
                var userid = cookie.load("userInfo").id;
                this.submitOrder(userid);
            }
        }
    }

    async submitOrder(userid) {
        await axios.get('/book/submitCart'
            , {
                params: {
                    userid: userid
                }
            })
            .then(res => {
                    console.log("submit cart");
                    console.log(res.data);
                    if (!(res.data === false)) {
                        alert("购买成功");
                        this.setState({itemArr: []});
                    } else {
                        // Check storage at back end
                        alert("库存不足，购买失败")
                    }
                }
            );
    }

    handleQuantityChange() {
        console.log("is rerendering");
        this.goGetData();
    }

    render() {
        this.getSum();
        return (
            <div>
                <Header/>
                <div className={"crossBar"}>
                    <h2>总金额：{sum}</h2>
                    <input type={"submit"} className={"button"} value={"购买"} onClick={this.handleSubmitOrder}/>
                </div>
                <BookTable
                    filterText=""
                    sortAttr=""
                    sortType= {0}
                    bookArr = {this.state.itemArr}
                    page = "cart"
                    onQuantityChange = {this.handleQuantityChange}
                />
                <Footer/>
            </div>
        );
    }
}

export default Cart;