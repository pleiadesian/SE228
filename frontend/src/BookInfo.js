import React, { Component } from 'react';
import Header from './component/Header';
import ItemAmount from './component/ItemAmount';
import Footer from './component/Footer';
import "./css/StyleSheet1.css"
import axios from "axios";
import cookie from 'react-cookies';

class BookInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookInfo : {ID:0,name:"" ,img:"./img/book0.jpg",price: 0,isbn:"0",storage:0,author:"",area:"",press:"",time:""},
			quantity : 1
		};
		this.goGetData = this.goGetData.bind(this);
		this.handleAddCart = this.handleAddCart.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.goGetData();
	}

	// Get book info from back end
	async goGetData() {
		await axios.get('/book/onebook'
			,{params:{
					"bookId" : this.props.match.params.id
				}
			})
			.then(res => {
					console.log("get book info:")
					console.log(res.data);
					if (res.data !== null) {
						this.setState({bookInfo: res.data});
					}
				}
			)
	}
	handleQuantityChange(quantity) {
		this.state.quantity = quantity;
	}
	async handleAddCart() {
		var userInfo = cookie.load("userInfo");
		if (userInfo == null) {
			alert("请先登录");
			return;
		}
		var userid = cookie.load("userInfo").id;
		console.log("addcart userid:" + userid);
		if(userid != null) {
			await axios.get('/book/addCart'
				, {
					params: {
						"userid": userid,
						"bookId": this.props.match.params.id,
						"quantity": this.state.quantity
					}
				})
				.then(res => {
						console.log(res.data);
						alert("添加成功")
					}
				)
		}else{
			alert("请先登录");
		}
	}

    render() {
        return (
        	<div >
				<Header/>
				<div  id={"mainBookinfo"} className={"main"}>
					<div className={"bookImg"}>
						<img
							className="bookInfoCover"
							src={require( "" + this.state.bookInfo.img)}
							alt={this.state.bookInfo.name}
						/>
					</div>
					<div id="infoColumn">
						<ul id="infolist">
							<li><p className="attribute">价格: ￥{this.state.bookInfo.price}</p></li>
							<li><p className="attribute">书名: {this.state.bookInfo.name}</p></li>
							<li><p className="attribute">作者: {this.state.bookInfo.author}</p></li>
							<li><p className="attribute">作者地区: {this.state.bookInfo.area}</p></li>
							<li><p className="attribute">出版社: {this.state.bookInfo.press}</p></li>
							<li><p className="attribute">ISBN: {this.state.bookInfo.isbn}</p></li>
						</ul>
					</div>
					<div id="addToCart">
						<ItemAmount
							amount = {1}
							onQuantityChange = {this.handleQuantityChange}
						/>
						<input type="submit" value="加入购物车" className="button" onClick={this.handleAddCart}/>
					</div>
				</div>
				<Footer/>
        	</div>
    );
    }
}
export default BookInfo;