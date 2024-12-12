import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/Auth/sign_up", formData);

      // Phản hồi từ server
      alert(`Đăng nhập thành công:\n${JSON.stringify(response.data, null, 2)}`); // JSON đẹp
    } catch (error) {
      if (error.response) {
        // Lỗi từ server
        alert(`Đăng nhập thất bại:\n${JSON.stringify(error.response.data, null, 2)}`); // JSON đẹp
      } else {
        // Lỗi mạng hoặc vấn đề khác
        alert(`Có lỗi xảy ra:\n${JSON.stringify({ message: error.message }, null, 2)}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên của bạn"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Nút Đăng Ký */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}