import React, { useState, useEffect} from "react";
import axios from "axios";

export default function TokenForm(props) {
  const [token, setToken] = useState("");

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu với axios
      const response = await axios.get("http://localhost:3000/Auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
  
      // Xử lý phản hồi từ server
      props.setMessage(response.data.message); // Hiển thị message
      props.setName(response.data.user.user_name)
      props.setEmail(response.data.user.email)
    } catch (err) {
      // Xử lý lỗi từ server
      if (err.response) {
        props.setMessage(err.response.data.message || "Xác thực không thành công.");
      } else {
        props.setMessage("Có lỗi xảy ra: " + err.message);
      }
      props.setName("")
      props.setEmail("")
    }
  };

  useEffect(() => {
    // Lấy query parameters từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("userName");
    const email = queryParams.get("email");
    const token = queryParams.get("token");
    const message = "Đăng nhập google thành công"
    if (name && email && token) {
      document.cookie = `token=${token}; path=/; secure; samesite=strict; max-age=3600`;
      console.log("Da luu");
      
      props.setMessage(message); // Hiển thị message
      props.setName(name)
      props.setEmail(email)
    }
  }, []); // Chỉ chạy một lần khi component được mount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Token</h2>
        {/* Ô trống để điền token */}
        <div className="mb-4">
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Token
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Nhập token của bạn"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Nút gửi yêu cầu */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Gửi
        </button>
        {/* Hiển thị message */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Message:</h3>
          <p className="text-gray-700">{props.message || "Không có thông báo"}</p>
        </div>
        {/* Hiển thị tên và email */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Thông tin người dùng:</h3>
          <p className="text-gray-700">Tên: {props.name || "Chưa xác định"}</p>
          <p className="text-gray-700">Email: {props.email || "Chưa xác định"}</p>
        </div>
      </div>
    </div>
  );
}