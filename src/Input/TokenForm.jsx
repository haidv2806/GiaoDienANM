import React, { useState, useEffect} from "react";
import axios from "axios";

export default function TokenForm() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" });

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu với axios
      const response = await axios.get("http://localhost:3000/Auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
  
      // Xử lý phản hồi từ server
      setMessage(response.data.message); // Hiển thị message
      setUserData({
        name: response.data.user.user_name,
        email: response.data.user.email,
      }); // Hiển thị tên và email
    } catch (err) {
      // Xử lý lỗi từ server
      if (err.response) {
        setMessage(err.response.data.message || "Xác thực không thành công.");
      } else {
        setMessage("Có lỗi xảy ra: " + err.message);
      }
      setUserData({ name: "", email: "" }); // Xóa thông tin người dùng nếu lỗi
    }
  };

  useEffect(() => {
    // Lấy query parameters từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("userName");
    const email = queryParams.get("email");
    const message = "Đăng nhập google thành công"
    if (name && email) {
      setMessage(message)
      setUserData({
        name: name,
        email: email,
      }); // Hiển thị tên và email
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
          <p className="text-gray-700">{message || "Không có thông báo"}</p>
        </div>
        {/* Hiển thị tên và email */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Thông tin người dùng:</h3>
          <p className="text-gray-700">Tên: {userData.name || "Chưa xác định"}</p>
          <p className="text-gray-700">Email: {userData.email || "Chưa xác định"}</p>
        </div>
      </div>
    </div>
  );
}