//Các thứ liên quan đến React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";


import { auth } from '../../services/firebase-config'; // Đường dẫn tới file cấu hình Firebase

//đăng nhập và gửi email reset password
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }


    handleLogin = async () => {
        const { username, password } = this.state;
        console.log('username: ', username, ' password: ', password);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            console.log("Logged in user: ", userCredential.user);
            // Xử lý sau khi đăng nhập thành công, ví dụ chuyển hướng người dùng
            this.props.adminLoginSuccess(userCredential.user); // Ví dụ gọi action nếu đăng nhập thành công
            // Đây chỉ là một ví dụ, thực tế có thể bạn cần chuyển hướng hoặc thực hiện thao tác khác
        } catch (error) {
            console.error("Error logging in: ", error);
            this.props.adminLoginFail(); // Gọi action nếu đăng nhập thất bại
            // Bạn cũng có thể hiển thị thông báo lỗi cho người dùng ở đây
        }
    }
    render() {


        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label> Username:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label> Password:</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                onChange={(event) => this.handleOnChangePassword(event)} />
                        </div>
                        <div className="col-12">
                            <button class="button-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password"> Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-1">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
