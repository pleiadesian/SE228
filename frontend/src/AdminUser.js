import React, { Component } from 'react';
import Header from './component/Header';
import UserTable from './component/UserTable';
import Footer from './component/Footer';
import "./css/StyleSheet1.css"

class AdminUser extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                <Header
                    admin={true}
                    login={true}
                />
                <div  id={"mainBooklist"} className={"main"}>
                    <UserTable />
                </div>
                <Footer />
            </div>
        );
    }
}
export default AdminUser;