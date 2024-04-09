// firebaseConfig.js

import { initializeApp } from "firebase/app";
// Import thêm các dịch vụ Firebase mà bạn sẽ sử dụng, ví dụ:
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

//API
//API
//API
//API

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase mà bạn muốn sử dụng
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Xuất các dịch vụ để sử dụng trong các thành phần khác của ứng dụng
export { auth, db, analytics };
