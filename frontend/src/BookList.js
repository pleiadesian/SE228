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
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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

        return (
            <div>
                <Header
                    onSearchChange = {this.handleSearchChange}
                />
                {searchBar}
                <BookTable
                    filterText={this.state.filterText}
                    sortAttr={this.state.sortAttr}
                    sortType={this.state.sortType}
                    bookArr={this.state.bookArr}
                    page="booklist"
                    admin={this.props.match.path.indexOf("admin") !== -1}
                />
                <Footer/>
            </div>
        );
    }
}

export default BookList;