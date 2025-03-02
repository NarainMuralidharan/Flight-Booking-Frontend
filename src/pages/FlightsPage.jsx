import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../components/NavBar";
import SearchFlights from "../components/SearchFlights";
import FeaturedTours from "../components/FeaturedTours";

const FlightsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [searchData, setSearchData] = useState({
        origin: queryParams.get("origin") || "",
        destination: queryParams.get("destination") || "",
        date: queryParams.get("date") || ""
    });

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showFeatured, setShowFeatured] = useState(true);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        setSearchData({
            origin: queryParams.get("origin") || "",
            destination: queryParams.get("destination") || "",
            date: queryParams.get("date") || ""
        });
    }, [location.search]);

    useEffect(() => {
        if (searchData.origin && searchData.destination && searchData.date) {
            setShowFeatured(false);
            setSearchPerformed(true);
            fetchFlights();
        }
    }, [searchData]);

    const fetchFlights = async () => {
        setLoading(true);
        setErrors({});
        setFlights([]);

        const selectedDate = new Date(searchData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setErrors({ general: "Invalid Date, try today's or upcoming dates." });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get("https://flight-booking-backend-v5sz.onrender.com/api/flights/search", {
                params: searchData
            });

            if (Array.isArray(response.data) && response.data.length > 0) {
                setFlights(response.data);
            } else {
                setFlights([]);
                setErrors({ general: "No flights found. Try other Dates or Flights" });
            }
        } catch (error) {
            setErrors({ general: "Failed to fetch flights." });
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = (flight) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token || userId === "undefined" || token === "undefined") {
            alert("Please Login or Register, Session maybe Expired");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
            return;
        }

        navigate("/booking", { state: { flight } });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-pop">
            <NavBar />
            <SearchFlights initialSearchData={searchData} />
            {showFeatured && <FeaturedTours />}
            {searchPerformed && (
                <div className="container mx-auto px-4 py-6 flex-grow">
                    <div className="mt-8">
                        {loading && <p className="text-center text-gray-400 font-pop">Loading flights...</p>}
                        {errors.general && <p className="text-center text-amber-500 text-2xl font-bold font-pop">{errors.general}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {flights.map((flight, index) => (
                                <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 font-pop">
                                    <h4 className="text-xl font-semibold text-amber-400 font-pop">{flight.airline} {flight.flightNumber}</h4>
                                    <p className="text-gray-300 font-pop">{flight.departure} → {flight.destination}</p>
                                    <p className="text-sm text-gray-400 font-pop">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                                    <p className="text-sm text-gray-400 font-pop">Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
                                    <p className="text-green-400 font-bold text-lg mt-2 font-pop">${flight.price}</p>
                                    <p className="text-gray-300 text-sm font-pop">Seats Available: {flight.availableSeats}</p>
                                    <button
                                        className="w-full bg-amber-500 text-white p-3 rounded-lg mt-4 text-lg hover:bg-amber-600 transition-all font-pop"
                                        onClick={() => handleBookNow(flight)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-gray-800 text-white text-center py-4 mt-auto font-pop">
                <p>© 2025 Skypiea. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FlightsPage;
