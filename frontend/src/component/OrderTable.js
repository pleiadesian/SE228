import React,{Component} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment, {isMoment} from "moment";
import axios from "axios";
import cookie from 'react-cookies';

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            admin : this.props.admin,
            username : ""
        };
        this.goGetData = this.goGetData.bind(this);
        this.goGetData();
    }
    async goGetData() {
        var userInfo = cookie.load("userInfo");
        var user_id = "";
        if (userInfo != null){
            user_id = userInfo.id
        }
        var admin = cookie.load("admin");
        if (admin == null || admin !== "true") {
            admin = false;
        }
        await axios.get('/book/order',{
            params:{
                "admin" : admin,
                "userId" : user_id
            }
        })
            .then(res => {
                    console.log("get order table:");
                    console.log(res.data);
                    if(res.data[0] != null) {
                        this.setState({orders: res.data});
                    }
                }
            )
    }

    render() {
        // Get user info and login state from cookie
        var userInfo = cookie.load("userInfo");
        var user_id = "";
        if (userInfo != null){
            user_id = userInfo.id
        }
        var admin = cookie.load("admin");
        if (admin == null || admin !== "true") {
            admin = false;
        }else{
            admin = true;
        }

        return (
            <Paper id={"mainAdmin"}>
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                订单号
                            </TableCell>
                            <TableCell align="center">
                                订单日期
                            </TableCell>
                            <TableCell align="center">
                                买家ID
                            </TableCell>
                            <TableCell align="center">
                                书籍ID
                            </TableCell>
                            <TableCell align="center">
                                数量
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.orders.map((item) => {
                            // Is order time between start date and end date from user input?
                            if (moment(item.ordertime).isBetween(moment(this.props.startDate),moment(this.props.endDate)) ||
                                moment(item.ordertime).isSame(this.props.endDate) || moment(item.ordertime).isSame(this.props.startDate)) {
                                return(
                                    //  遍历订单中每一个物品
                                item.orderitems.map((orderitem) =>{
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {item.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.ordertime}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.userId}
                                            </TableCell>
                                            <TableCell align="center">
                                                {orderitem.bookId}
                                            </TableCell>
                                            <TableCell align="center">
                                                {orderitem.num}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default OrderTable;