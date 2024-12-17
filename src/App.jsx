import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";
import Banner from "./Component/Banner";
import List from "./Component/List";
import MovieSearch from "./Component/MovieSearch";
import Footer from "./Component/Footer";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import About from "./Component/About";
import Categories from "./Component/Categories";
import { MovieProvider } from "./context/MovieDetailContext";
import Snowfall from "react-snowfall";
import Notification from "./Component/Notification";
import UserProfile from "./Component/UserProfile";

// Component hiển thị lỗi
const ErrorDisplay = ({ message }) => (
  <div className="error-message text-center text-red-500">
    <p>{message}</p>
  </div>
);

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Xử lý tìm kiếm phim
  const handleSearch = async (value) => {
    setLoading(true);
    if (value === "") {
      setSearchData([]);
      setLoading(false);
      return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      setError("Lỗi khi tìm kiếm phim. Vui lòng thử lại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu phim
  useEffect(() => {
    const fetchMovies = async () => {
      const urls = [
        `https://api.themoviedb.org/3/trending/movie/day?language=vi`,
        `https://api.themoviedb.org/3/movie/top_rated?language=vi`,
        `https://api.themoviedb.org/3/genre/movie/list?language=vi`,
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url, options).then((res) => res.json()))
        );
        setTrendingMovies(responses[0]?.results || []);
        setTopRatedMovies(responses[1]?.results || []);
        setCategories(responses[2]?.genres || []);
      } catch (error) {
        setError("Không thể tải dữ liệu phim. Vui lòng thử lại!");
        console.error("Error fetching movies:", error);
      }
    };

    const fetchMoviesByCategory = async () => {
      if (!categories.length) return;
      setLoading(true);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const categoryMovies = {};
        for (const category of categories) {
          const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${category.id}&language=vi&page=1`;
          const response = await fetch(url, options);
          const data = await response.json();
          categoryMovies[category.id] = data.results;
        }
        setMoviesByCategory(categoryMovies);
      } catch (error) {
        setError("Không thể tải phim theo thể loại. Vui lòng thử lại!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    fetchMoviesByCategory();
  }, [categories]);

  // Lấy dữ liệu người dùng từ localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("avatar");
    setUserName("");
    setAvatar("");
  };

  return (
    <MovieProvider>
      <Router>
        <Snowfall
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          {error && <ErrorDisplay message={error} />}
          <Notification />
          <Header onSearch={handleSearch} />
          <nav className="text-white text-lg font-bold flex gap-6">
            <Link to="/" className="hover:text-yellow-500">
              Trang chủ
            </Link>
            <Link to="/about" className="hover:text-yellow-500">
              Giới thiệu
            </Link>
            <Link to="/categories" className="hover:text-yellow-500">
              Phim Bộ
            </Link>
            {userName && (
              <Link to="/user" className="hover:text-yellow-500">
                Tài khoản
              </Link>
            )}
            {userName && (
              <button onClick={handleLogout} className="hover:text-yellow-500">
                Đăng Xuất
              </button>
            )}
          </nav>

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  {searchData.length === 0 && (
                    <>
                      <List
                        title="Phim Hot"
                        data={trendingMovies.slice(0, 10)}
                        imgBaseUrl={IMG_BASE_URL}
                      />
                      <List
                        title="Phim đề cử"
                        data={topRatedMovies.slice(0, 10)}
                        imgBaseUrl={IMG_BASE_URL}
                      />
                    </>
                  )}
                  {searchData.length > 0 && <MovieSearch data={searchData} imgBaseUrl={IMG_BASE_URL} />}
                </>
              }
            />
            <Route
              path="/categories"
              element={
                <Categories
                  data={categories}
                  title="Phim Bộ"
                  moviesByCategory={moviesByCategory}
                  imgBaseUrl={IMG_BASE_URL}
                />
              }
            />
            <Route path="/user" element={<UserProfile name={userName} avatar={avatar} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
