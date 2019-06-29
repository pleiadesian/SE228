import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <h2>this website has been visited
                    <a href="https://www.easycounter.com/">
                        <img src="https://www.easycounter.com/counter.php?pleiadesian"
                             border="0" alt="Website Hit Counters"/>
                    </a>
                    times</h2><br/>
                <ul className="option">
                    <li><a>关于我们</a></li>
                    <li><a>反馈</a></li>
                    <li><a>帮助</a></li>
                </ul>
            </div>
        );
    }

}

export default Footer;