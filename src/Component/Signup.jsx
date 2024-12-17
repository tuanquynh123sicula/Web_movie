import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi yêu cầu đăng ký tới API
    axios
      .post("http://localhost:4000/register", { name, email, password })
      .then((result) => {
        alert(result.data.message); // Thông báo thành công
        // Sau khi đăng ký thành công, lưu thông tin vào localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        // Điều hướng người dùng tới trang đăng nhập
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Đăng ký thất bại. Vui lòng thử lại!");
      });
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.formBox}>
        <h2 style={styles.formTitle}>Đăng Ký</h2>
        <form onSubmit={handleSubmit} style={styles.signupForm}>
          <div style={styles.inputBox}>
            <label style={styles.label}>Họ và Tên</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => (e.target.style.borderBottom = "2px solid #ff6b6b")}
              onBlur={(e) => (e.target.style.borderBottom = "2px solid #000")}
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => (e.target.style.borderBottom = "2px solid #ff6b6b")}
              onBlur={(e) => (e.target.style.borderBottom = "2px solid #000")}
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <label style={styles.label}>Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => (e.target.style.borderBottom = "2px solid #ff6b6b")}
              onBlur={(e) => (e.target.style.borderBottom = "2px solid #000")}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitBtn}>
            Đăng Ký
          </button>
        </form>
        <p style={styles.switchForm}>
          Bạn đã có tài khoản?{" "}
          <Link to="/login" style={styles.switchLink}>
            Đăng Nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    fontFamily: "'Poppins', sans-serif",
  },
  formBox: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  formTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#333",
  },
  signupForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputBox: {
    marginBottom: "30px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 10px",
    border: "none",
    borderBottom: "2px solid #000",
    outline: "none",
    fontSize: "1rem",
    background: "transparent",
    color: "#333",
    transition: "border-color 0.3s ease",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
    fontSize: "1rem",
  },
  submitBtn: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    background: "#ff6b6b",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "5px",
    cursor: "pointer",
  },
  switchForm: {
    marginTop: "20px",
    fontSize: "0.9rem",
  },
  switchLink: {
    color: "#ff6b6b",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default Signup;
