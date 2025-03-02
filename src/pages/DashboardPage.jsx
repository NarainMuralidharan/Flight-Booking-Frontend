import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

const DashboardPage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const alertShown = useRef(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token || userId === "undefined" || token === "undefined") {
            if (!alertShown.current) {
                alertShown.current = true;
                alert("Please Login or Register, Session may be Expired.");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("https://flight-booking-backend-v5sz.onrender.com/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserProfile(response.data);
            } catch (err) {
                if (err.response?.status === 401 && !alertShown.current) {
                    alertShown.current = true;
                    alert("Please Login or Register, Session may be Expired.");
                    setTimeout(() => {
                        localStorage.removeItem("userId");
                        localStorage.removeItem("token");
                        navigate("/login", { replace: true });
                    }, 500);
                } else {
                    setError("Error fetching user profile.");
                }
            }
        };

        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://flight-booking-backend-v5sz.onrender.com/api/bookings/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const filteredBookings = response.data.filter(booking => booking.status !== "pending");
                setUserBookings(filteredBookings);
            } catch (err) {
                setError("Error fetching bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
        fetchBookings();
    }, [navigate]);

    const handleBookingStatusUpdate = async (bookingId, newStatus) => {
        try {
            await axios.put("https://flight-booking-backend-v5sz.onrender.com/api/bookings/status", {
                bookingId,
                status: newStatus,
            });

            setUserBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
        } catch (err) {
            setError("Error updating booking status.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white font-pop">
            <NavBar />
            <div className="relative">
                <Header />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
                    {userProfile ? (
                        <p className="text-2xl md:text-4xl font-bold text-amber-500">
                            Hi, {userProfile.username}
                        </p>
                    ) : (
                        <p className="text-xl md:text-2xl text-white">Loading user profile...</p>
                    )}
                </div>
            </div>

            <div className="container mx-auto mt-10 px-4 flex-grow pb-20">
                <div className="text-left w-full">
                    <h2 className="text-2xl font-semibold text-amber-400">Booking History:</h2>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400">Loading your bookings...</p>
                ) : error ? (
                    <p className="text-center text-amber-500">{error}</p>
                ) : userBookings.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">No Bookings.</p>
                ) : (
                    <ul className="space-y-4 mt-4">
                        {userBookings.map(booking => (
                            <li key={booking._id} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                                <h2 className="text-xl font-semibold text-amber-400 mb-2">
                                    {booking.flightId.airline} {booking.flightId.flightNumber}
                                </h2>
                                <p className="text-gray-300"><strong>Seats booked:</strong> {booking.numberOfSeats}</p>
                                <p className="text-gray-300"><strong>Total price:</strong> ${booking.totalPrice}</p>
                                <p className="text-gray-300">
                                    <strong>Status: </strong> 
                                    <span className={booking.status === "confirmed" ? "text-green-400" : "text-red-400"}>
                                        {booking.status}
                                    </span>
                                </p>
                                <p className="text-gray-300">
                                    <strong>Departure:</strong> {new Date(booking.flightId.departureTime).toLocaleString()} (from {booking.flightId.departure})
                                </p>
                                <p className="text-gray-300">
                                    <strong>Arrival:</strong> {new Date(booking.flightId.arrivalTime).toLocaleString()} (to {booking.flightId.destination})
                                </p>
                                <p className="text-gray-300"><strong>Email:</strong> {userProfile?.email}</p>
                                <div className="mt-4">
                                    {booking.status !== "cancelled" && (
                                        <button
                                            onClick={() => handleBookingStatusUpdate(booking._id, "cancelled")}
                                            className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-all"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DashboardPage;
