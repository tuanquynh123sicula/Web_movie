import React, { useState } from "react";
import Snowfall from "react-snowfall"; // Thư viện hiệu ứng tuyết rơi

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOk = () => {
    console.log("Đủ 18 tuổi clicked!");
    setIsVisible(false); // Đóng thông báo sau khi nhấn "Đủ 18 tuổi"
  };

  const handleCancel = () => {
    console.log("Chưa đủ 18 tuổi clicked!");
    alert("Bạn chưa đủ 18 tuổi để truy cập trang web này!");
    // Chuyển hướng đến Google
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null; // Không hiển thị nếu thông báo đã bị đóng

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      {/* Hiệu ứng tuyết rơi */}
      <Snowfall
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Đảm bảo tuyết nằm phía sau thông báo
        }}
      />
      <div className="bg-red-700 text-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-500 ease-in-out scale-100 hover:scale-105 hover:shadow-xl">
        <div className="mb-6">
          <p className="font-bold text-2xl text-center">
            🎄 Chúc Mừng Giáng Sinh! 🎅
          </p>
          <p className="font-semibold text-lg text-center mt-2">
            Bạn có đủ 18 tuổi để xem nội dung trên trang này?
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleOk}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Đủ 18 tuổi
          </button>
          <button
            onClick={handleCancel}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Chưa đủ 18 tuổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
