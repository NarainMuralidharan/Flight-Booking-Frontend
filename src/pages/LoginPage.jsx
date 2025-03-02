import { useState } from "react";
import { useNavigate, Link } from "react-router"; 
import axios from "axios";
import NavBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({ username: "", email: "", password: "", custom_error: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      let newErrors = { ...prev };

      // Validate username
      if (name === "username") {
        newErrors.username = value ? "" : "Username is required";
      }

      // Validate email 
      if (name === "email") {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        newErrors.email = emailRegex.test(value) ? "" : "Invalid email address format";
      }

      // Validate password
      if (name === "password") {
        newErrors.password = value ? "" : "Password is required";
      }

      return newErrors;
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({ username: "", email: "", password: "", custom_error: "" });

    let hasError = false;
    let newErrors = { username: "", email: "", password: "", custom_error: "" };

    if (!inputs.username) {
      hasError = true;
      newErrors.username = "Username is required";
    }

    if (!inputs.email) {
      hasError = true;
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(inputs.email)) {
        hasError = true;
        newErrors.email = "Invalid email address format";
      }
    }

    if (!inputs.password) {
      hasError = true;
      newErrors.password = "Password is required"; 
    }

    if (hasError) {
      setErrors(newErrors); 
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://flight-booking-backend-v5sz.onrender.com/api/auth/login", inputs);

      localStorage.setItem("token", response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      localStorage.setItem("userId", decodedToken.id); // Store userId
      localStorage.setItem("username", decodedToken.username); // Store username

      // Now check if token and userId are stored correctly
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (storedToken && storedUserId) {
        navigate("/"); 
      } else {
        setErrors((prev) => ({ ...prev, custom_error: "Failed to store user information." }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, custom_error: err.response?.data?.message || "Login failed" }));
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-200 to-amber-400 font-pop">
      <NavBar />
      <div className="flex flex-col justify-center items-center flex-grow py-8">
        <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white font-pop">Login</h2>
          {errors.custom_error && <p className="text-red-500 mb-4 font-pop">{errors.custom_error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative w-full">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.username ? 'border-red-500 placeholder-red-500' : 'border-white'} font-pop`}
                value={inputs.username}
                onChange={handleInput}
              />
              {errors.username && <p className="text-red-500 text-xs font-pop">{errors.username}</p>}
            </div>

            <div className="relative w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.email ? 'border-red-500 placeholder-red-500' : 'border-white'} font-pop`}
                value={inputs.email}
                onChange={handleInput}
              />
              {errors.email && <p className="text-red-500 text-xs font-pop">{errors.email}</p>}
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.password ? 'border-red-500 placeholder-red-500' : 'border-white'} font-pop`}
                value={inputs.password}
                onChange={handleInput}
              />
              <span
                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="text-white" />
                ) : (
                  <FaEyeSlash className="text-white" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white p-4 rounded-lg hover:bg-amber-700 transition font-pop"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center font-pop">
            <p className="mb-2">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
            <p className="text-white font-pop">
              Don't have an account? 
              <Link to="/register" className="text-blue-500 hover:underline"> Register</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8 font-pop">
        <p>© 2025 Skypiea. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
