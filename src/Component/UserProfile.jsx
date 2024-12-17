import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaCheck, FaTimes, FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(""); // New username for editing
  const [notification, setNotification] = useState(""); // State for notifications

  // Load user data from localStorage on page load
  useEffect(() => {
    // Scroll the page to the top when the component is mounted
    window.scrollTo(0, 0);

    const storedUserName = localStorage.getItem("userName");
    const storedUserAvatar = localStorage.getItem("userAvatar");

    if (storedUserName) setUserName(storedUserName);
    if (storedUserAvatar) setUserAvatar(storedUserAvatar);
  }, []);

  // Edit mode toggle
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(userName);
  };

  // Save username changes
  const handleSave = () => {
    if (newUserName.trim() !== "") {
      localStorage.setItem("userName", newUserName);
      setUserName(newUserName);
      setIsEditing(false);

      // Show success notification
      setNotification("Cập nhật hồ sơ thành công! Vui lòng đợi...");

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        setNotification(""); // Clear notification
        window.location.href = "/"; // Redirect to the homepage
      }, 2000);
    } else {
      setNotification("Tên người dùng không được để trống!");
      setTimeout(() => setNotification(""), 2000); // Clear error message after 2 seconds
    }
  };

  // Cancel editing mode
  const handleCancel = () => {
    setIsEditing(false);
    setNewUserName(userName);
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userAvatar", reader.result);
        setUserAvatar(reader.result);

        setNotification("Cập nhật ảnh đại diện thành công!");

        setTimeout(() => {
          setNotification("");
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle key press to save username when 'Enter' is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
      {/* Snowfall effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="snowflakes absolute top-0 left-0 w-full h-full z-50">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="snowflake absolute w-1 h-1 bg-white rounded-full opacity-80 animate-snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            />
          ))}
        </div>
      </div>

      {/* Notification bar */}
      {notification && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 py-2 px-6 rounded-lg shadow-lg text-white text-lg font-semibold ${
            notification === "Cập nhật hồ sơ thành công! Vui lòng đợi..."
              ? "bg-teal-500"
              : "bg-red-500"
          }`}
        >
          {notification}
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 text-center transform transition duration-500 ease-in-out hover:scale-105">
        {/* Avatar */}
        <div className="relative mb-6">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-36 h-36 rounded-full mx-auto border-4 border-yellow-400 shadow-2xl object-cover transition duration-300 transform hover:scale-110"
            />
          ) : (
            <FaUserCircle className="text-gray-500 text-9xl mx-auto transition duration-300 hover:text-yellow-500" />
          )}

          {/* Edit button for avatar */}
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="absolute bottom-2 right-[40%] bg-yellow-400 text-black rounded-full p-3 shadow-lg hover:bg-yellow-500 transition-all"
            >
              <FaEdit />
            </button>
          )}

          {/* Avatar upload button */}
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-2 right-0 bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 cursor-pointer transition-all"
          >
            <FaCamera />
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* User's name */}
        <div>
          {isEditing ? (
            <div className="flex items-center justify-center gap-6 mb-6">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                onKeyDown={handleKeyDown}  // Add the keyDown handler
                className="w-4/5 p-3 rounded-lg bg-gray-100 text-black border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-500 p-3 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 p-3 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ) : (
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 transition duration-300 hover:text-yellow-400">
              {userName || "Tên của bạn"}
            </h2>
          )}
          <p className="text-gray-500 text-lg">
            Chào mừng bạn quay lại, hãy cập nhật hồ sơ của bạn nếu muốn!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
