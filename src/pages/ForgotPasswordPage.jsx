import { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Link, Navigate } from "react-router";
import { isAuthenticated } from "../services/authService";

const ForgotPasswordPage = () => {
    if (isAuthenticated()) {
        return <Navigate to="/" />;
    }

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ email: false, custom_error: "" });
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail === "") {
            setErrors({ email: "Email is required", custom_error: "" }); 
        } else if (!validateEmail(newEmail)) {
            setErrors({ email: "Invalid email format", custom_error: "" }); 
        } else {
            setErrors({ email: false, custom_error: "" }); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({ email: false, custom_error: "" }); 

        if (!email) {
            setErrors({ email: "Email is required", custom_error: "" });
            return;
        }

        if (!validateEmail(email)) {
            setErrors({ email: "Invalid email format", custom_error: "" });
            return;
        }

        setLoading(true);

        try {
            await axios.post("https://flight-booking-backend-v5sz.onrender.com/api/password/forgot", { email });
            setShowMessage(true);
            setErrors({ email: false, custom_error: "" });
        } catch (err) {
            setErrors({ email: false, custom_error: "Failed to send reset link. Please try again with a registered mail." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-200 to-amber-400 font-pop">
            <NavBar />
            <div className="flex flex-col justify-center items-center flex-grow py-8">
                <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-white font-pop">Forgot Password</h2>
                    {errors.custom_error && (
                        <p className={errors.custom_error.includes("Failed") ? "text-red-500 mb-4 font-pop" : "text-green-500 mb-4 font-pop"}>
                            {errors.custom_error}
                        </p>
                    )}
                    {showMessage && !errors.custom_error && (
                        <p className="text-green-500 mb-4 font-pop">
                            Check your email for the reset link. It will redirect you to the password reset page.
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`p-4 border rounded w-full text-white bg-slate-800 focus:outline-none ${errors.email ? 'border-red-500 placeholder-red-500' : 'border-white'} font-pop`}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs font-pop">{errors.email}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-amber-500 text-white p-4 rounded-lg hover:bg-amber-700 transition font-pop"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-white font-pop">
                            Remembered your password? 
                            <Link to="/login" className="text-blue-500 hover:underline font-pop"> Login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-8 font-pop">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ForgotPasswordPage;
