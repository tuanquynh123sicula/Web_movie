import { useState, useEffect, useRef } from "react";
import { FaSearch, FaCommentDots, FaUserCircle, FaRegSnowflake, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [showSnowfall, setShowSnowfall] = useState(true);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref to manage clicking outside

  // Manage username and localStorage sync
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const handleStorageChange = () => {
      const updatedUserName = localStorage.getItem("userName");
      setUserName(updatedUserName || "");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch random avatar when the component is loaded or the user changes
  useEffect(() => {
    if (userName) {
      let storedAvatar = localStorage.getItem("userAvatar");
      if (!storedAvatar) {
        const fetchAvatar = async () => {
          const response = await fetch("https://randomuser.me/api/");
          const data = await response.json();
          storedAvatar = data.results[0].picture.thumbnail;
          localStorage.setItem("userAvatar", storedAvatar);
          setUserAvatar(storedAvatar);
        };
        fetchAvatar();
      } else {
        setUserAvatar(storedAvatar);
      }
    }
  }, [userName]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    setUserName("");
    setUserAvatar("");
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div className="p-6 flex justify-between items-center fixed top-0 left-0 w-full z-[9999] bg-black shadow-lg border-b border-gray-800">
      {showSnowfall && <Snowfall />}

      <div className="flex items-center gap-14">
        <h1
          className="text-[50px] text-white font-extrabold tracking-wider hover:text-yellow-500 hover:shadow-xl transition-all cursor-pointer"
          onClick={() => navigate("/")} // Khi click sẽ chuyển đến trang chủ
        >
          BUSI Ci-Nê
        </h1>
        <FaRegSnowflake className="text-white text-[60px] animate-bounce" />

        <nav className="flex items-center gap-12 ml-auto">
          <Link to="/" className="text-white text-lg font-bold pb-1 hover:text-yellow-500 transition-all no-underline hover:scale-105 hover:opacity-80">
            Trang Chủ
          </Link>
          <Link to="/categories" className="text-white text-lg font-bold pb-1 hover:text-yellow-500 transition-all no-underline hover:scale-105 hover:opacity-80">
            Phim Bộ
          </Link>
          <Link to="/about" className="text-white text-lg font-bold pb-1 hover:text-yellow-500 transition-all no-underline hover:scale-105 hover:opacity-80">
            Giới Thiệu
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="p-3 w-[300px] rounded-full text-black focus:ring-4 focus:ring-yellow-500 transition-all hover:w-[350px] hover:shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-2 rounded-full"
            onClick={() => onSearch(search)}
          >
            <FaSearch />
          </button>
        </div>

        {userName ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 text-white text-lg font-bold hover:text-yellow-500 transition-all pb-1"
            >
              {userAvatar ? (
                <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <FaUserCircle className="text-xl" />
              )}
              {`Hi, ${userName}`}
              <FaCaretDown className={`transform transition-transform ${showDropdown ? "rotate-180" : "rotate-0"}`} />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg border border-gray-200 animate-fade-in"
                style={{ zIndex: 9999 }}
              >
                <ul className="py-2">
                  <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all transform hover:scale-105">
                    <FaUserCircle className="text-lg text-gray-500" />
                    <Link to="/user" className="no-underline text-black text-sm font-medium">
                      Thông Tin Cá Nhân
                    </Link>
                  </li>
                  <li
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all transform hover:scale-105"
                    onClick={handleLogout}
                  >
                    <FaCommentDots className="text-lg text-gray-500" />
                    <span className="text-black text-sm font-medium">Đăng Xuất</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-white text-lg font-bold pb-1 hover:text-yellow-500 transition-all no-underline hover:scale-105 hover:opacity-80">
            Đăng Nhập
          </Link>
        )}
      </div>

      {/* Chat icon with tooltip */}
      <div className="relative group">
        <a
          href="https://m.me/331883940015410"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-12 right-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-3xl cursor-pointer p-4 rounded-full shadow-lg transition-transform transform hover:scale-125 hover:rotate-12 hover:shadow-2xl"
        >
          <FaCommentDots className="text-white" />
        </a>

        {/* Tooltip with black text */}
        <span className="absolute bottom-24 right-16 bg-black text-white text-sm rounded-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat với chúng tôi
        </span>
      </div>
    </div>
  );
};

export default Header;
