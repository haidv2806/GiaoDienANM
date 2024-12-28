import './App.css';
import RegisterForm from './Input/RegisterForm';
import LoginForm from './Input/LoginForm';
import TokenForm from './Input/TokenForm';
import React,{ useState, useEffect } from 'react';
import axios from "axios";

// PORT=4000 npm start
function App() {
  const [name, setName] = useState("chưa xác định")
  const [email, setEmail] = useState("chưa xác định")
  const [message, setMessage] = useState("Không có thông báo")

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  
  // Sử dụng:
  const token = getCookie('token');

  const LogOnOpen = async () => {
    try {
      // Gửi yêu cầu với axios
      const response = await axios.get("http://localhost:3000/Auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
  
      // Xử lý phản hồi từ server
      setMessage(response.data.message); // Hiển thị message
      setName(response.data.user.user_name)
      setEmail(response.data.user.email)
    } catch (err) {
      // Xử lý lỗi từ server
      if (err.response) {
        setMessage(err.response.data.message || "Xác thực không thành công.");
      } else {
        setMessage("Có lỗi xảy ra: " + err.message);
      }
      setName("")
      setEmail("")
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("userName");
    console.log(token);
    
    if (!name) {
      LogOnOpen();
    }
  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <RegisterForm />
        <LoginForm 
          setName={setName}
          setEmail={setEmail}
          setMessage={setMessage}
        />
        <TokenForm 
          name={name}
          email={email}
          message={message}
          setName={setName}
          setEmail={setEmail}
          setMessage={setMessage}
        />
      </header>
    </div>
  );
}

export default App;