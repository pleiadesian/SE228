import React, {Component} from "react";
import { Upload, Icon, message } from 'antd';
import axios from "axios";
import cookie from 'react-cookies';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



function beforeUpload(file) {
    console.log(file);
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Avatar extends Component {
    state = {
        loading: false,
        userId : 1
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        var content = this.props.bookId? "更换封面" : "更换头像";
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{content}</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        var userId = cookie.load("userInfo").id;
        var bookId = 0;
        if (this.props.bookId) {
            console.log("this.props.bookId");
            console.log(this.props.bookId);
            bookId = this.props.bookId;
        }
        return (
            <Upload
                name="avatar"
                data={{userId: userId, bookId: bookId}}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/book/saveAvatar"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" className={"avatarUploadImg"}/> : uploadButton}
            </Upload>
        );
    }
}

export default Avatar;