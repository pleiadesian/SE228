import React, { Component } from 'react';
import Header from './component/Header';
import ItemAmount from './component/ItemAmount';
import Footer from './component/Footer';
import "./css/StyleSheet1.css"
import axios from "axios";
import cookie from 'react-cookies';
import Alert from "./component/Alert";
import Avatar from "./component/Avatar";

class BookInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookInfo : {ID:0,name:"" ,img:"",price: 0,isbn:"0",storage:0,author:"",area:"",press:"",time:""},
			quantity : 1,
			content: ""
		};
		this.goGetData = this.goGetData.bind(this);
		this.handleAlert = this.handleAlert.bind(this);
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
			this.handleAlert("请先登录");
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
						this.handleAlert("添加成功")
					}
				)
		}else {
			this.handleAlert("请先登录");
		}

	}

	handleAlert(content) {
		this.setState({content : content})
	}

    render() {
		console.log("alert content after render:");
		console.log(this.state.content);
		var imgUrl= "http://localhost:8080/book/getBookCover?bookId="+this.state.bookInfo.id;

		var admin = cookie.load("admin");
		if(admin == null || admin !== "true") {
			admin = false
		}else{
			admin = true
		}

		var adminEnabled = admin ? (
			<Avatar bookId={this.state.bookInfo.id} url={"/book/saveBookCover"}/>
		):"";
        return (
        	<div >
				<Alert content={this.state.content} cancelAlert={this.handleAlert}/>
				<Header/>
				<div  id={"mainBookinfo"} className={"main"}>
					<div className={"bookImg"}>
						<img
							className="bookInfoCover"
							src={imgUrl}
							alt={this.state.bookInfo.name}
						/>
						{adminEnabled}
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