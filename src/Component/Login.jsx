import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi yêu cầu
    try {
      const result = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (result.data.message === "Login successful") {
        localStorage.setItem("userName", result.data.user.name);
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Đăng nhập thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/"); // Điều hướng về trang chủ sau 2 giây
          window.location.reload(); // Tải lại trang sau khi điều hướng
        }, 2000);
      } else {
        setError(result.data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại!");
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6dd5fa, #2980b9)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: "350px", textAlign: "center" }}
      >
        <h2 className="mb-4 text-dark">Đăng Nhập</h2>
        {error && (
          <div
            className="alert alert-danger py-2"
            style={{ fontSize: "0.9rem" }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-dark">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label text-dark">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập Mật khẩu"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Đăng Nhập
          </button>
        </form>
        <p className="mt-3 mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
          Chưa có tài khoản?
        </p>
        <a
          href="/register"
          className="btn btn-outline-dark w-100 py-2"
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Đăng Ký
        </a>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
