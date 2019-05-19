import React, {Component} from "react";
import { Modal} from 'antd';
import "antd/dist/antd.css"

class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({
            visible: true
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <div>
                <input type="submit" onClick={this.showModal} value="添加"/>
                <Modal title="添加书籍信息" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <p className="title">书籍名称</p>
                    <input id="bookname" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">价格</p>
                    <input id="price" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">库存</p>
                    <input id="storage" className="inputID" type="text" onChange={this.handleChange}/>
                    <p className="title">作者</p>
                    <input id="author" className="inputID" type="text" onChange={this.handleChange}/>
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

