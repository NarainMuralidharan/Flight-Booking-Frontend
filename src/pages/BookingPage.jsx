import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const flight = location.state?.flight;
    const [passengers, setPassengers] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(flight ? flight.price : 0);

    useEffect(() => {
        if (flight) {
            setTotalPrice((flight.price * passengers).toFixed(2));
        }
    }, [passengers, flight]);

    const handleBooking = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token || userId === "undefined" || token === "undefined") {
            alert("Please Login or Register, Session may be Expired");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
            return;
        }

        if (!flight || !flight._id) {
            setError("Invalid flight selection. Please choose a flight.");
            return;
        }

        if (passengers < 1) {
            setError("There should be at least one passenger.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "https://flight-booking-backend-v5sz.onrender.com/api/bookings/create",
                {
                    userId,
                    flightId: flight._id,
                    numberOfSeats: passengers,
                    totalPrice,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const bookingId = response.data._id;

            if (bookingId) {
                navigate("/payment", { state: { bookingId } });
            } else {
                throw new Error("Invalid booking response from server.");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                alert("Please Login or Register, Session may be Expired");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            } else {
                setError(err.response?.data?.message || "Failed to create booking. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); 
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-white font-pop">
            <NavBar />
            
            <div className="flex-grow flex justify-center items-center p-6">
                <div className="w-full max-w-3xl bg-slate-800 shadow-lg rounded-lg p-6 border border-slate-700">
                    <h2 className="text-3xl font-bold mb-4 text-center text-amber-400 font-pop">Booking Flight</h2>
                    {!flight ? (
                        <p className="text-center text-red-500 font-bold text-lg font-pop">
                            No flight selected. Please go back and choose a flight.
                        </p>
                    ) : (
                        <>
                            <div className="bg-slate-700 p-4 rounded-md">
                                <p className="text-lg font-semibold text-amber-400 font-pop">{flight.airline} {flight.flightNumber}</p>
                                <p className="text-gray-300 font-pop">{flight.departure} → {flight.destination}</p>
                                <p className="text-sm text-gray-400 font-pop">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                                <p className="text-sm text-gray-400 font-pop">Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
                                <p className="text-xl font-bold mt-2 text-green-400 font-pop">${flight.price} per passenger</p>
                            </div>

                            <div className="mt-4">
                                <label className="block font-medium font-pop">Number of Passengers</label>
                                <input 
                                    type="number" 
                                    value={passengers} 
                                    onChange={(e) => {
                                        setPassengers(Number(e.target.value));
                                        if (Number(e.target.value) >= 1) {
                                            setError(null);
                                        }
                                    }} 
                                    className="w-full p-2 border rounded mt-1 bg-slate-700 text-white border-slate-600 font-pop"
                                    min="1"
                                />
                            </div>

                            <div className="mt-4">
                                <p className="text-lg font-bold text-green-400 font-pop">Total Price: ${totalPrice}</p>
                            </div>

                            {error && <p className="text-red-500 mt-2 font-pop">{error}</p>}

                            <button 
                                className="w-full bg-amber-500 text-white p-3 rounded mt-3 hover:bg-amber-600 transition font-pop"
                                onClick={handleBooking}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </button>

                            <button 
                                className="w-full bg-slate-500 text-white p-3 rounded mt-3 hover:bg-slate-600 transition font-pop"
                                onClick={handleCancel}
                            >
                                Cancel Booking
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            <footer className="bg-gray-800 text-white text-center py-4 mt-auto font-pop">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BookingPage;
