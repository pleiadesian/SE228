import React, { Component } from 'react';
import Header from './component/Header';
import BookTable from'./component/BookTable';
import SearchBar from'./component/SearchBar';
import Footer from './component/Footer';
import AddBookForm from './component/AddBookForm';
import axios from 'axios';
import "./css/StyleSheet1.css"
import cookie from "react-cookies";
import Alert from "./component/Alert";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            sortAttr : "",
            sortType: "None",
            search : false,
            bookArr: [],
            tempBookArr : [],
            content: "",
            edit: false
        };

        this.handleAlert = this.handleAlert.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleBookTableChange = this.handleBookTableChange.bind(this);
        this.goGetData = this.goGetData.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.goGetData();
    }

    // Get book info from back end
    async goGetData() {
        await axios.get('/book/booklist')
            .then(res => {
                    console.log("get book info:")
                    console.log(res.data);
                    if (res.data !== null) {
                        this.setState({bookArr: res.data});
                    }
                }
            );
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText : filterText})
    }

    handleSortChange(attr, type) {
        this.setState({
            sortAttr : attr,
            sortType : type
        })
    }

    handleSearchChange(){
        var temp = !this.state.search
        this.setState({
            search: temp
        })
    }

    // Get book list from cookie and send to back end
    async handleUpdate() {
        if(!this.state.edit) {
            this.handleAlert("请先进入编辑状态")
        }else {
            var booklist = this.state.tempBookArr;
            if (booklist == null) {
                this.handleAlert("未修改任何值");
            } else {
                console.log("get book list from cookie:");
                console.log(booklist);
                var params = new URLSearchParams();
                params.append('booklist', JSON.stringify(booklist));
                await axios.post('/book/changeBookInfo', params)
                    .then(res => {
                        console.log("after admin change a book:");
                        console.log(res.data);
                        if (res.data[0] == null) {
                            this.handleAlert("修改后的数据不合法，修改失败");
                        } else {
                            this.handleAlert('更新成功');
                            this.setState({bookArr: res.data, edit: false})
                        }
                    })
            }
        }
    }

    handleBookTableChange(bookArr, edit) {
        this.state.tempBookArr = bookArr;
        this.state.edit = edit
    }

    handleAddBook(res_data) {
        this.setState({
            bookArr : res_data
        })
    }

    handleAlert(content) {
        this.setState({content : content})
    }

    render() {
        // Display search bar?
        const searchBar = this.state.search ?
            <SearchBar
                filterText={this.state.filterText}
                sortAttr={this.state.sortAttr}
                sortType={this.state.sortType}
                onFilterTextChange={this.handleFilterTextChange}
                onSortChange={this.handleSortChange}
            />
            : "";

        // Display admin bar?
        var admin = cookie.load("admin");
        var login = cookie.load("login");
        if (admin == null || login == null || admin === "false" || login === "false") {
            admin = false;
        } else {
            admin = true;
        }
        var adminBar = admin ?
            <div>
                <input type="submit" value="更新" id="submitUpdate" className="button" onClick={this.handleUpdate}/>
                <AddBookForm onAddBook = {this.handleAddBook}/>
            </div>
            : "";

        return (
            <div>
                <Alert content={this.state.content} cancelAlert={this.handleAlert}/>
                <Header
                    onSearchChange = {this.handleSearchChange}
                />
                {searchBar}
                {adminBar}
                <BookTable
                    filterText={this.state.filterText}
                    sortAttr={this.state.sortAttr}
                    sortType={this.state.sortType}
                    bookArr={this.state.bookArr}
                    page="booklist"
                    admin={this.props.match.path.indexOf("admin") !== -1}
                    onChange={this.handleBookTableChange} // when book array is modified in the admin page, book array here should be changed
                />
                <Footer/>
            </div>
        );
    }
}

export default BookList;