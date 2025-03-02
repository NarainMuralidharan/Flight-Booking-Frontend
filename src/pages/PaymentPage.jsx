import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import NavBar from "../components/NavBar";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(
                    `https://flight-booking-backend-v5sz.onrender.com/api/bookings/user/${userId}`
                );
                if (response.data && response.data.length > 0) {
                    setBooking(response.data[0]);
                } else {
                    setError("No bookings found.");
                }
            } catch (err) {
                console.error("Error fetching booking details:", err.message);
                setError("Error fetching booking details.");
            }
        };

        fetchBookingDetails();
    }, [userId, navigate]);

    const handleCheckout = async () => {
        if (!booking) return;

        setLoading(true);
        try {
            const response = await axios.post(
                "https://flight-booking-backend-v5sz.onrender.com/api/payment/create-checkout-session",
                { bookingId: booking._id }
            );

            const { sessionId } = response.data;

            alert(
                "Use the following test card details:\n\nCard Number: 4242 4242 4242 4242\nExpiry: Any future date\nCVC: Any 3 digits"
            );

            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                console.error("Stripe Checkout error:", result.error);
                setError("An error occurred while processing payment.");
            }
        } catch (error) {
            console.error("Error during checkout:", error.message);
            setError("An error occurred while initiating payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-white font-pop">
            <NavBar />

            <div className="flex-grow flex justify-center items-center p-6">
                <div className="w-full max-w-3xl bg-slate-800 shadow-lg rounded-lg p-6 border border-slate-700">
                    <h2 className="text-3xl font-bold mb-4 text-center text-amber-400 font-pop">
                        Payment
                    </h2>

                    {error && <p className="text-red-500 text-center mb-4 font-pop">{error}</p>}

                    {booking ? (
                        <div className="bg-slate-700 p-4 rounded-md font-pop">
                            <h3 className="text-2xl font-semibold text-amber-400 mb-4 font-pop">
                                Booking Details
                            </h3>
                            <p className="text-lg font-pop">
                                <span className="font-semibold">Airline:</span> {booking.flightId.airline}
                            </p>
                            <p className="text-lg font-pop">
                                <span className="font-semibold">Flight Number:</span> {booking.flightId.flightNumber}
                            </p>
                            <p className="text-lg font-pop">
                                <span className="font-semibold">Departure:</span> {new Date(booking.flightId.departureTime).toLocaleString()}
                            </p>
                            <p className="text-lg font-pop">
                                <span className="font-semibold">Arrival:</span> {new Date(booking.flightId.arrivalTime).toLocaleString()}
                            </p>
                            <p className="text-xl font-bold text-green-400 mt-3 font-pop">
                                Total Price: ${booking.totalPrice}
                            </p>
                        </div>
                    ) : (
                        <p className="text-center text-gray-300 font-pop">Loading booking details...</p>
                    )}

                    <div className="flex flex-col gap-3 mt-4 font-pop">
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-amber-500 text-white p-3 rounded hover:bg-amber-600 transition disabled:bg-gray-500 font-pop"
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-slate-500 text-white p-3 rounded hover:bg-slate-600 transition font-pop"
                        >
                            Cancel Payment
                        </button>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white text-center py-4 mt-auto font-pop">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PaymentPage;
