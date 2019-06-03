import React,{Component} from "react";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ItemAmount from "./ItemAmount"
import '../css/BookTable.css';
import Alert from './Alert';
import axios from "axios";
import cookie from 'react-cookies';

var attrName = "";
var sortType = 0;
var renderArr = [];
class BookTable extends Component {
    constructor(props) {
        super(props);

        // Is admin mode?
        var admin = cookie.load("admin");
        if (admin === "true"){
            admin = true;
        }else {
            admin = false;
        }
        console.log("booktable");
        console.log(admin);

        this.state = {
            bookArr : this.props.bookArr,
            admin : admin,
            content : ""
        };
        this.handleAlert = this.handleAlert.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleAddCart= this.handleAddCart.bind(this);
        this.handleAdminChange = this.handleAdminChange.bind(this);
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
        if (this.state.bookArr[0] != null) {
            this.state.bookArr.forEach((item, index) => {
                // take book JSONObject out, push whole JSON complex Object back(containing quantity and bookinfo)
                var book;
                this.props.page === "cart" ? book = item.book : book = item;
                if (book.name.indexOf(filterText) !== -1 || filterText === "") {
                    renderArr.push(item)
                }
            })
        }
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
        if ( type === "NONE") return;
        attrName = attr;
        sortType = type;
        renderArr.sort(this.compare);
    }

    // Delete a book from cart in the back end
    async handleDelete(bookid) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            this.handleAlert("删除失败");
            return;
        }
        // user is admin?
        var admin = cookie.load("admin");
        var login = cookie.load("login");
        console.log("before delete admin state:");
        console.log(admin);
        console.log("before delete login state:");
        console.log(admin);
        if (admin == null || login == null || admin !== "true" || login !== "true" ){
            admin = false;
        }else {
            admin = true;
        }
        console.log("before delete admin state:");
        console.log(admin);
        if (admin){
            // admin delete book
            await axios.get('/book/deleteBook',
                {
                  params: {
                      "bookId": bookid
                  }
                }).then(res => {
                    this.setState({bookArr : res.data})
            })
        }else {
            // user delete book in cart
            await axios.get('/book/deleteCart',
                {
                    params: {
                        bookId: bookid,
                        userid: userInfo.id
                    }
                })
                .then(res => {
                        // Get new book array json from back end
                        console.log("cart delete:");
                        console.log(res.data);
                        this.setState({bookArr: res.data});
                        // Parent component need to render again
                        if (this.props.onQuantityChange) {
                            this.props.onQuantityChange();
                        }
                    }
                );
        }
    }

    // Quantity change in the cart page
    async handleQuantityChange(amount, index) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            this.handleAlert("请先登录");
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
            this.handleAlert("请先登录");
        }
    }

    async handleAddCart(bookid) {
        var userInfo = cookie.load("userInfo");
        if (userInfo == null) {
            this.handleAlert("请先登录");
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
                        this.handleAlert("添加成功");
                    }
                )
        }else{
            this.handleAlert("请先登录");
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

    handleColumnBlock(book) {
        var admin = cookie.load("admin");
        if (admin == null || admin !== "true") {
            admin = false;
        }else{
            admin = true;
        }
        if (admin) {
            return (
                <div>
                    <h2>
                        <input id="bookName" 
                           onChange={this.handleAdminChange.bind(this, book.id)} className="bookname" defaultValue={book.name} />
                    </h2>
                    <input className="category" id={"bookPrice"} onChange={this.handleAdminChange.bind(this, book.id)}
                        defaultValue={book.price}/>
                    <input id="bookAuthor" className={"spanLeft"} onChange={this.handleAdminChange.bind(this, book.id)} defaultValue={book.author}/>
                    <span className={"spanRight"}>ISBN:<input id={"bookIsbn"} onChange={this.handleAdminChange.bind(this, book.id)} defaultValue={book.isbn}/></span>
                    <span className={"spanRight"}>剩余<input id={"bookStorage"} onChange={this.handleAdminChange.bind(this, book.id)} defaultValue={book.storage}/>件| </span>
                </div>
            );
        }else {
            return (
                <div>
                    <h2>
                        <a id="bookName"  className="bookname">{book.name}</a>
                    </h2>
                    <p className="category" id={"bookPrice"} >
                        ￥{book.price}
                    </p>
                    <span id="bookAuthor" className={"spanLeft"}>{book.author}</span>
                    <span className={"spanRight"}>ISBN:<span id={"bookIsbn"}>{book.isbn}</span></span>
                    <span className={"spanRight"}>剩余<span id={"bookStorage"}>{book.storage}</span>件| </span>
                </div>
            )
        }
    }

    // this.handle...().bind(this,book.id)
    handleAdminChange(bookid, e) {
        console.log("admin change etargetid");
        console.log(e.target.id);
        console.log(e.target.value)
        console.log("bookid");
        console.log(bookid);
        var attrName;
        if (e.target.id === "bookName"){
            attrName = "name";
        }else if(e.target.id === "bookAuthor") {
            attrName = "author";
        }else if(e.target.id === "bookPrice") {
            attrName = "price";
        }else if(e.target.id === "bookIsbn") {
            attrName = "isbn";
        }else if(e.target.id === "bookStorage") {
            attrName = "storage"
        }

        // check permission
        var admin = cookie.load("admin");
        var login = cookie.load("login");
        if (admin == null || login == null || admin !== "true" || login !== "true") {
            this.handleAlert("权限不足");
            return;
        }

        this.state.bookArr.forEach((item,index) => {
            if (item.id === bookid) {
                item[attrName] = e.target.value;
                console.log("after admin change.booklist is:");
                console.log(this.state.bookArr);
                //this.handleBookChange(item.id, attrName, e.target.value);  // bookId, attribute to change, new value
            }
        });
        // send book array to parent component
        if (this.props.onChange) {
            this.props.onChange(this.state.bookArr);
        }
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {
        console.log("booktable rerender")
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
            var imgUrl;
            if(book.img == null){
                imgUrl = "http://localhost:8080/book/img/book/img_default.jpg";
            }else{
                imgUrl = "http://localhost:8080/book/"+book.img;
            }
            bookColumns.push(
                <li className="bookColumn">
                    <div className={"columnWrapper"}>
                        <div className={"columnBlock"} id={"imgBlock"}>
                            <Link to={this.handleLink(book.id)} className="bookcover">
                                <img
                                    src={imgUrl}
                                    alt={book.name}
                                    className="bookimage"
                                />
                            </Link>
                        </div>
                        <div className={"columnBlock"} id={"infoBlock"}>
                            {this.handleColumnBlock(book)}
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
                <Alert content={this.state.content}/>
                <ul>
                    {bookColumns}
                </ul>
            </div>
        );
    }
}

export default BookTable;