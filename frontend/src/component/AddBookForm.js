import React, {Component} from "react";
import { Modal} from 'antd';
import "antd/dist/antd.css";
import axios from "axios";

class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: "",
            price: 0.0,
            storage: -1,
            author: "",
            isbn: "",
            area: "",
            press: "",
            time: ""
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goAddBook = this.goAddBook.bind(this);
    }
    showModal(){
        this.setState({
            visible: true
        })
    }
    async goAddBook(params) {
        await axios.post('/book/addBook',params)
            .then(res => {
                alert("添加成功");
                if (this.props.onAddBook) {
                    this.props.onAddBook(res.data);
                }
                this.setState({
                    visible: false
                })
            })
    }
    handleOk() {
        var book = {};
        book.name =    this.state.name;
        book.price =   this.state.price;
        book.storage = this.state.storage;
        book.author =  this.state.author;
        book.isbn =    this.state.isbn;
        book.area =    this.state.area;
        book.press =   this.state.press;
        book.time =    this.state.time;
        var params = new URLSearchParams();
        console.log("add book:");
        console.log(book);
        params.append('bookInfo',JSON.stringify(book));
        this.goAddBook(params);
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    handleChange(e) {
        switch (e.target.id) {
            case "name":    this.state.name = e.target.value;   break;
            case "price":   this.state.price = e.target.value;  break;
            case "storage": this.state.storage = e.target.value;break;
            case "author":  this.state.author = e.target.value; break;
            case "isbn":  this.state.isbn = e.target.value; break;
            case "area":    this.state.area = e.target.value;   break;
            case "press":   this.state.press = e.target.value;  break;
            case "time":    this.state.time = e.target.value;   break;
        }
    }
    render() {
        return (
            <div>
                <input type="submit" className="button" onClick={this.showModal} value="添加"/>
                <Modal title="添加书籍信息" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <p className="title">书籍名称</p>
                    <input id="name" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">价格</p>
                    <input id="price" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">库存</p>
                    <input id="storage" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">作者</p>
                    <input id="author" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">ISBN</p>
                    <input id="isbn" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">作者地区</p>
                    <input id="area" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">出版社</p>
                    <input id="press" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">出版时间</p>
                    <input id="time" className="inputID" type="text" onChange={this.handleChange}/>
                </Modal>
            </div>
        )
    }
}

export default AddBookForm;

