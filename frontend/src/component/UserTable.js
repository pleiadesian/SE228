import React,{Component} from "react";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Alert from "./Alert";

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            content:""
        };
        this.handleForbidden = this.handleForbidden.bind(this);
        this.handleFree = this.handleFree.bind(this);
        this.goGetData = this.goGetData.bind(this);
        this.goGetData();
    }

    // Get user array from back end
    async goGetData() {
        await axios.get('/book/user')
            .then(res => {
                    console.log("get user table:");
                    console.log(res.data);
                    if(res.data[0] != null) {
                        this.setState({users: res.data});
                    }
                }
            )
    }

    async handleForbidden(id) {
        await axios.get('/book/userForbid',{
            params:{
                "userId" : id
            }
        }).then(res =>{
            if(res.data[0] != null) {
                this.setState({users: res.data, content: "禁用成功"})
            }else{
                this.setState({content: "您无法修改管理员的权限"})
            }
        })
    }

    async handleFree(id) {
        await axios.get('/book/userFree',{
            params:{
                "userId" : id
            }
        }).then(res =>{
            if(res.data[0] != null) {
                this.setState({users: res.data, content:"解禁成功"})
            }else{
                this.setState({content: "您无法修改管理员的权限"})
            }
        })
    }

    render() {
        return (
            <div>
            <Alert content={this.state.content}/>
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
                                状态
                            </TableCell>
                            <TableCell align="center">
                                操作
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((item, index) => {
                            var state;
                            if(item.disabled === false){
                                state="正常";
                            }else{
                                state="已禁用";
                            }
                            return (
                                <TableRow key={index} >
                                    <TableCell component="th" scope="row">
                                        {item.username}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.usertype}
                                    </TableCell>
                                    <TableCell align="center">
                                        {state}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={this.handleForbidden.bind(this,item.id)}>禁用</Button>
                                        <Button onClick={this.handleFree.bind(this,item.id)}>解禁</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
}

export default UserTable;