import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase-config';
class UserManage extends Component {

    state = {
        userList: [],
    }

    async componentDidMount() {
        try {
            const querySnapshot = await getDocs(collection(db, "Accounts"));
            const userList = querySnapshot.docs.map(doc => ({
                id: doc.id, // lấy ID tài liệu nếu bạn muốn tham chiếu đến nó sau này
                ...doc.data() // lấy dữ liệu tài liệu
            }));
            this.setState({ userList });
        } catch (error) {
            console.log("Error getting user data: ", error);
        }
    }

    render() {
        const { userList } = this.state;
        return (
            <div className="user-container">
                <div className="title text-center">Manage User with Hieu</div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
