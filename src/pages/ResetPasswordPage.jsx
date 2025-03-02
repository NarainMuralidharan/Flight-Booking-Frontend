import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import NavBar from "../components/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const ResetPasswordPage = () => {
    const [inputs, setInputs] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ password: "", confirmPassword: "", custom_error: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        let newErrors = { ...errors };
        if (name === "password" || name === "confirmPassword") {
            newErrors[name] = value.length < 4 ? "Password must be at least 4 characters" : "";
        }
        newErrors.custom_error = "";
        setErrors(newErrors);
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        
        if (inputs.password.length < 4 || inputs.confirmPassword.length < 4) {
            setErrors({
                password: inputs.password.length < 4 ? "Password must be at least 4 characters" : "",
                confirmPassword: inputs.confirmPassword.length < 4 ? "Password must be at least 4 characters" : "",
                custom_error: "Password should be at least 4 characters",
            });
            return;
        }

        if (inputs.password !== inputs.confirmPassword) {
            setErrors((prev) => ({ ...prev, custom_error: "Passwords do not match" }));
            return;
        }

        setLoading(true);
        try {
            await axios.post(`https://flight-booking-backend-v5sz.onrender.com/api/password/reset/${id}/${token}`, { password: inputs.password });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setErrors((prev) => ({ ...prev, custom_error: err.response?.data?.message || "Reset failed" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-200 to-slate-400 font-pop">
            <NavBar />
            <div className="flex flex-col justify-center items-center flex-grow py-8">
                <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-white">Reset Password</h2>
                    {success && <p className="text-green-500 text-center mb-4">Password has been changed successfully! Redirecting...</p>}
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="New Password"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.password ? 'border-red-500' : 'border-white'}`}
                                value={inputs.password}
                                onChange={handleInput}
                            />
                            <span
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <div className="relative w-full">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-white'}`}
                                value={inputs.confirmPassword}
                                onChange={handleInput}
                            />
                            <span
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        {errors.custom_error && <p className="text-red-500 text-sm text-center">{errors.custom_error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-slate-500 text-white p-4 rounded-lg hover:bg-slate-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
            <footer className="bg-gray-800 text-white text-center py-4 mt-8">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ResetPasswordPage;
