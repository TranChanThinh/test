import React, { useState } from 'react';
import { auth, db } from '../../services/firebase-config'; // Đảm bảo đường dẫn đúng
import './Login.scss';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseError } from 'firebase/app';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');


    const isEmptyValue = (value) => {
        return !value || value.trim().length < 1;
    }
    const isEmailValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    const validateForm = () => {
        const error = {};
        if (isEmptyValue(username)) {
            error["username"] = "Username is required";
        }
        else {
            if (!isEmailValid(username)) {
                error["username"] = "Username is invalid";
            }
        }
        if (isEmptyValue(password)) {
            error["password"] = "Password is required";
        }
        if (isEmptyValue(confirmpassword)) {
            error["confirmpassword"] = "Confirm Password is required";
        }
        else if (password !== confirmpassword) {
            error["confirmpassword"] = "Confirm Password is not match";
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    }

    const handleOnChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleOnChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleForgotPassword = async () => {
        if (!isEmailValid(username)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, username);
            alert("A password reset email has been sent to your email address.");
        } catch (error) {
            console.error("Failed to send password reset email: ", error);
            alert("Failed to send password reset email. Please try again.");
        }
    };


    const handleSignUp = async (event) => {
        event.preventDefault(); // ngăn trang reload khi nhấn nút submit

        console.log('Username: ', username);
        console.log('Password: ', password);
        console.log('Confirm Password: ', confirmpassword);

        if (validateForm()) {
            console.log('Form is valid');
            try {

                // Sử dụng Firebase Auth để tạo tài khoản mới
                const userCredential = await createUserWithEmailAndPassword(auth, username, password);
                console.log("User created: ", userCredential.user);
                // const firstname = "Test";
                // const lastname = "Thu thoi";
                // Tùy chọn: Lưu thông tin người dùng vào Firestore
                // const docRef = await addDoc(collection(db, "Accounts"), {
                //     username: username,
                //     // Bạn có thể thêm thêm thông tin tại đây
                //     firstname: firstname,
                //     lastname: lastname,
                // });
                // console.log("Document written with ID: ", docRef.id);
                alert('User added successfully');

            } catch (error) {
                // Hiển thị thông tin lỗi trong console
                const errorMessage = error.message.replace('Firebase: ', ''); // Loại bỏ "Firebase: "
                console.error(errorMessage); // Hiển thị thông điệp lỗi đã được chỉnh sửa
                alert(errorMessage);
            }
        }
        else {
            console.log('Form is invalid');
            alert('Error adding user');
        }


    };
    console.log(formError);
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-login">Sign Up</div>
                    <div className="col-12 form-group login-input">
                        <label> Username:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleOnChangeUsername} />
                    </div>
                    {formError.username && (<div className="col-12 form-group login-input">{formError.username}</div>
                    )}
                    <div className="col-12 form-group login-input">
                        <label> Password:</label>
                        <input type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleOnChangePassword} />
                    </div>
                    {formError.password && (<div className="col-12 form-group login-input">{formError.password}</div>
                    )}
                    <div className="col-12 form-group login-input">
                        <label>Confirm Password:</label>
                        <input type="password"
                            className="form-control"
                            placeholder="Enter your confirm password"
                            value={confirmpassword}
                            onChange={handleOnChangeConfirmPassword} />
                    </div>
                    {formError.confirmpassword && (<div className="col-12 form-group login-input">{formError.confirmpassword}</div>
                    )}
                    <div className="col-12">
                        <button className="button-login" onClick={handleSignUp}>SignUp</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</span>
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
// Trong file SignUp.js
export default SignUp;
