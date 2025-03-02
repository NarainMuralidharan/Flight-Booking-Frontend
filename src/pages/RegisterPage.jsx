import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import NavBar from "../components/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const RegisterPage = () => {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({ username: "", email: "", password: "", custom_error: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });

        let newErrors = { ...errors };

        // Validate username
        if (name === "username") {
            if (!value) {
                newErrors.username = "Username is required";
            } else if (value.length < 4) {
                newErrors.username = "Username must be at least 4 characters long";
            } else if (/[^a-zA-Z0-9]/.test(value)) {
                newErrors.username = "Username cannot contain special characters";
            } else {
                newErrors.username = "";
            }
        }

        // Validate email
        if (name === "email") {
            if (!value) {
                newErrors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                newErrors.email = "Invalid email address format";
            } else {
                newErrors.email = "";
            }
        }

        // Validate password
        if (name === "password") {
            if (!value) {
                newErrors.password = "Password is required";
            } else if (value.length < 4) {
                newErrors.password = "Password must be at least 4 characters long";
            } else {
                newErrors.password = "";
            }
        }

        setErrors(newErrors);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setErrors({ username: "", email: "", password: "", custom_error: "" });

        let hasError = false;
        let newErrors = { username: "", email: "", password: "", custom_error: "" };

        if (!inputs.username) {
            hasError = true;
            newErrors.username = "Username is required";
        } else if (inputs.username.length < 4) {
            hasError = true;
            newErrors.username = "Username must be at least 4 characters long";
        } else if (/[^a-zA-Z0-9]/.test(inputs.username)) {
            hasError = true;
            newErrors.username = "Username cannot contain special characters";
        }

        if (!inputs.email) {
            hasError = true;
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputs.email)) {
            hasError = true;
            newErrors.email = "Invalid email address format";
        }

        if (!inputs.password) {
            hasError = true;
            newErrors.password = "Password is required";
        } else if (inputs.password.length < 4) {
            hasError = true;
            newErrors.password = "Password must be at least 4 characters long";
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await axios.post("https://flight-booking-backend-v5sz.onrender.com/api/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setErrors((prev) => ({ ...prev, custom_error: err.response?.data?.message || "Registration failed" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-300 to-slate-500 font-pop">
            <NavBar />
            <div className="flex flex-col justify-center items-center flex-grow py-8">
                <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-white font-pop">Register</h2>
                    {errors.custom_error && <p className="text-red-500 mb-4 font-pop">{errors.custom_error}</p>}
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.username ? 'border-red-500 placeholder-red-500' : 'border-white'}`}
                                value={inputs.username}
                                onChange={handleInput}
                            />
                            {errors.username && <p className="text-red-500 text-xs font-pop">{errors.username}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="relative w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.email ? 'border-red-500 placeholder-red-500' : 'border-white'}`}
                                value={inputs.email}
                                onChange={handleInput}
                            />
                            {errors.email && <p className="text-red-500 text-xs font-pop">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.password ? 'border-red-500 placeholder-red-500' : 'border-white'}`}
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

                        {errors.password && <p className="text-red-500 text-xs text-center mt-2 font-pop">{errors.password}</p>}

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-slate-500 text-white p-4 rounded-lg hover:bg-slate-700 transition font-pop"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-white mb-2 font-pop">
                            Already have an account? 
                            <Link to="/login" className="text-blue-500 hover:underline font-pop"> Login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-8">
                <p className="font-pop">© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default RegisterPage;
