import React,{Component} from "react";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
        this.goGetData = this.goGetData.bind(this);
        this.goGetData();
    }

    // Get user array from back end
    async goGetData() {
        await axios.get('/book/user')
            .then(res => {
                    console.log("get user table:")
                    console.log(res.data);
                    this.setState({users: res.data});
                }
            )
    }

    render() {
        return (
            <Paper id={"mainAdmin"}>
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                用户名
                            </TableCell>
                            <TableCell align="center">
                                用户类型
                            </TableCell>
                            <TableCell align="center">
                                操作
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((item, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell component="th" scope="row">
                                        {item.username}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.usertype}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button>禁用</Button>
                                        <Button>解禁</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default UserTable;