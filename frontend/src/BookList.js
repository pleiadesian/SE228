import React, { Component } from 'react';
import Header from './component/Header';
import BookTable from'./component/BookTable';
import SearchBar from'./component/SearchBar';
import Footer from './component/Footer';
import axios from 'axios';
import "./css/StyleSheet1.css"
import cookie from "react-cookies";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            sortAttr : "",
            sortType: "None",
            search : false,
            bookArr: [],
            tempBookArr : []
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleBookTableChange = this.handleBookTableChange.bind(this);
        this.goGetData = this.goGetData.bind(this);
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
        var booklist= this.state.tempBookArr;
        if (booklist == null) {
            alert("未修改任何值");
        }else{
            console.log("get book list from cookie:");
            console.log(booklist);
           // booklist = JSON.parse(booklist);
                var params = new URLSearchParams();
                params.append('booklist',JSON.stringify(booklist));
            await axios.post('/book/changeBookInfo',params)
                .then( res =>{
                console.log("after admin change a book:");
                console.log(res.data);
                if (res.data == null){
                    alert("修改失败");
                }else {
                    this.setState({bookArr: res.data})
                }
            })
        }
    }

    handleBookTableChange(bookArr) {
        this.state.tempBookArr = bookArr;
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
                <input type="submit" value="添加"  id="submitAdd" className="button" />
            </div>
            : "";

        return (
            <div>
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