import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import "../css/SearchBar.css"

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.submitFilterTextChange = this.submitFilterTextChange.bind(this);
        this.state = {
            filterText : "",
            sortAttr : "",
            sortType : 0
        }
    }

    handleSortChange(e){
        if(e.target.sortType === "UP") {
            if (this.props.onSortChange) {
                this.props.onSortChange(e.target.id, -1)
            }
            e.target.sortType = "DOWN"
            this.setState({
                sortAttr : e.target.id,
                sortType : -1
            })
        }
        else{
            if (this.props.onSortChange) {
                this.props.onSortChange(e.target.id,1)
            }
            e.target.sortType = "UP"
            this.setState({
                sortAttr : e.target.id,
                sortType : 1
            })
        }
    }

    handleFilterTextChange(e){
        this.setState({filterText :e.target.value })
    }

    // Send filter text to parent component
    submitFilterTextChange(e){
        var text = this.state.filterText
        if (this.props.onFilterTextChange) {
                this.props.onFilterTextChange(text)
        }
    }

    handleSortText(attr) {
        if (this.state.sortAttr === attr) {
            return this.state.sortType === -1 ? "↑" : "↓";
        }
        return " ";
    }

    render() {
        return (
            <div id ="searchBar" className={"crossBar"}>
                <div id="search">
                    <input className="inputtext" type="text" name="bookname" value={this.state.filterText} onChange={this.handleFilterTextChange} />
                    <input type="submit" value="搜索" onClick={this.submitFilterTextChange } id="submitSearch" className="button" />
                </div>
                <div id="sortBar">
                    <Button id={'name'} onClick={this.handleSortChange} sortType = "NONE" ><span id={'name'}>按书名排序</span><span id={'sortType'}>{this.handleSortText("name")}</span></Button>
                    <Button id={'price'} onClick={ this.handleSortChange} sortType = "NONE" ><span id={'price'}>按价格排序</span><span id={'sortType'}>{this.handleSortText("price")}</span></Button>
                    <Button id={'storage'} onClick={ this.handleSortChange} sortType = "NONE" ><span id={'storage'}>按库存排序</span><span id={'sortType'}>{this.handleSortText("storage")}</span></Button>
                </div>
            </div>
        );
    }
}

export default SearchBar;