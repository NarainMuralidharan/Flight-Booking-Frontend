import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import FlightsPage from "./pages/FlightsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />     <Route path="/flights" element={<FlightsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route
                    path="/payment"
                    element={
                        <Elements stripe={stripePromise}>
                            <PaymentPage />
                        </Elements>
                    }
                />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
