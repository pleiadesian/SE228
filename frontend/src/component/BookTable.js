import React,{Component} from "react";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ItemAmount from "./ItemAmount"
import '../css/BookTable.css';
import axios from "axios";
import cookie from 'react-cookies';

var attrName = "";
var sortType = 0;
var renderArr = [];
class BookTable extends Component {
    constructor(props) {
        super(props);

        // Is admin mode?
        var admin = cookie.load("admin") === true;
        if (admin == null) {
            admin = false;
        }

        this.state = {
            bookArr : this.props.bookArr,
            admin : admin
        };
        this.handleInput=this.handleInput.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleAddCart= this.handleAddCart.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    static defaultProps = {
        filterText:"",
        sortAttr:"",
        sortType: 0,
        page : "booklist",
    }

    // Rerender when get new book array from parent component
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({bookArr : nextProps.bookArr})
    }

    // Url of book info page
    handleLink(index) {
        return "/info/" + index
    }

    // Filter books according to user input
    filter(filterText) {
        // Display book array json in console
        console.log("filter bookArr:");
        console.log(this.state.bookArr);
        this.state.bookArr.forEach((item, index)=>{
            // take book JSONObject out, push whole JSON complex Object back(containing quantity and bookinfo)
            var book;
            this.props.page === "cart" ? book = item.book : book = item;
            if (book.name.indexOf(filterText) !== -1 || filterText === ""){
                renderArr.push(item)
            }
        })
    }

    compare(a,b) {
        if (a[attrName]<b[attrName]) {
            return sortType
        }
        else if (a[attrName]  === b[attrName]) {
            return 0
        }
        else if (a[attrName]>b[attrName]) {
            return -sortType
        }
    }

    sort(attr,type) {
        if (renderArr.size>0 && !renderArr[0].hasOwnProperty(attr)) {
            return
        }
        if ( type === "NONE") return
        attrName = attr
        sortType = type
        renderArr.sort(this.compare)
    }

    // Delete a book from cart in the back end
    async handleDelete(bookid) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            alert("删除失败");
            return;
        }
        await axios.get('/book/deleteCart',
            {params:{
                    bookId : bookid,
                    userid : userInfo.id
                }
            })
            .then(res => {
                    // Get new book array json from back end
                    console.log("cart delete:");
                    console.log(res.data);
                    this.setState({bookArr: res.data});
                    // Parent component need to render again
                    if(this.props.onQuantityChange) {
                        this.props.onQuantityChange();
                    }
                }
            );
    }

    // Quantity change in the cart page
    async handleQuantityChange(amount, index) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            alert("请先登录");
            return;
        }
        var userid = userInfo.id;
        if(userid != null) {
            await axios.get('/book/addCart'
                , {
                    params: {
                        "userid": userid,
                        "bookId": index,
                        "quantity": amount
                    }
                })
                .then(res => {
                        // Parent needs to render again after quantity change
                        if(this.props.onQuantityChange) {
                            this.props.onQuantityChange();
                        }
                    }
                )
        }else{
            alert("请先登录");
        }
    }

    async handleAddCart(bookid) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            alert("请先登录");
            return;
        }
        var userid = userInfo.id;
        console.log("addcart userid:" + userid);
        if(userid != null) {
            await axios.get('/book/addCart'
                , {
                    params: {
                        "userid": userid,
                        "bookId": bookid,
                        "quantity": 1
                    }
                })
                .then(res => {
                        alert("添加成功");
                    }
                )
        }else{
            alert("请先登录");
        }
    }

    // ul and li are different in the cart page and booklist page
    handleInput(bookid, quantity){
        // In the cart page?
        if (this.props.page==="cart") {
            return (
                <div>
                    <ItemAmount
                        amount = {quantity}
                        index = {bookid}
                        onQuantityChange = {this.handleQuantityChange}
                    />
                    <Button onClick={this.handleDelete.bind(this,bookid)} >移除</Button>
                </div>
            );
        }
        else if(this.props.page==="booklist") {
            // Admin can delete a book from a booklist but user can add it to cart
            if (this.state.admin) {
                return (
                    <input type="submit" value="删除书籍" className="button" onClick={this.handleDelete.bind(this,bookid)}/>
                );
            }
            else{
                return (
                    <input type="submit" value="加入购物车" className="button" onClick={this.handleAddCart.bind(this,bookid)}/>
                );
            }
        }
    }

    render() {
        renderArr = [];
        this.filter(this.props.filterText);
        this.sort(this.props.sortAttr,this.props.sortType);
        var bookColumns = [];
        if (!(renderArr === false)){
        renderArr.forEach((item, index)=>{
            // Get book attr from itemAttr JSON when in cart page(item:{book:{},quantity})
            var book;
            if(this.props.page==="cart"){
                book = item.book;
            }else{
                book = item;
            }
            bookColumns.push(
                <li className="bookColumn">
                    <div className={"columnWrapper"}>
                        <div className={"columnBlock"} id={"imgBlock"}>
                            <Link to={this.handleLink(book.id)} className="bookcover">
                                <img
                                    src={require( "" + book.img)}
                                    alt={book.name}
                                    className="bookimage"/>
                            </Link>
                        </div>
                        <div className={"columnBlock"} id={"infoBlock"}>
                            <h2>
                                <a contentEditable={this.state.admin}  className="bookname" onClick={this.handleItem}>{book.name}</a>
                            </h2>
                            <p className="category" contentEditable={this.state.admin}>
                                ￥{book.price}
                            </p>
                            <span id={"spanLeft"} contentEditable={this.state.admin}>{book.author}</span>
                            <span id={"spanRight"}>ISBN:<span contentEditable={this.state.admin}>{book.isbn}</span></span>
                            <span id={"spanRight"}>剩余<span contentEditable={this.state.admin}>{book.storage}</span>件| </span>
                        </div>
                        <div className={"columnBlock"} id={"handleBlock"}>
                            <Link to={this.handleLink(book.id)} id={"detail"}>查看详情</Link>
                            {this.handleInput(book.id,item.quantity)}
                        </div>
                    </div>
                </li>
            )
        });}
        return (
            <div id = "mainBooklist" className={"main"}>
                <ul>
                    {bookColumns}
                </ul>
            </div>
        );
    }
}

export default BookTable;