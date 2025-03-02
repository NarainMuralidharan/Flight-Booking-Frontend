import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LuCalendar, LuChevronDown } from "react-icons/lu"; 

const predefinedCities = [
    { code: "JFK", name: "New York (JFK)" },
    { code: "LAX", name: "Los Angeles (LAX)" },
    { code: "ORD", name: "Chicago (ORD)" },
    { code: "ATL", name: "Atlanta (ATL)" },
    { code: "LHR", name: "London (LHR)" },
    { code: "DXB", name: "Dubai (DXB)" },
    { code: "SIN", name: "Singapore (SIN)" },
    { code: "FRA", name: "Frankfurt (FRA)" }
];

const SearchFlights = ({ initialSearchData }) => {
    const today = new Date().toISOString().split("T")[0];
    const [searchData, setSearchData] = useState({
        origin: initialSearchData?.origin || "",
        destination: initialSearchData?.destination || "",
        date: initialSearchData?.date || today
    });
    const [error, setError] = useState({ origin: "", destination: "", date: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (searchData.date < today) {
            setSearchData((prev) => ({ ...prev, date: today }));
        }
    }, []);

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    const handleSearch = () => {
        let newError = { origin: "", destination: "", date: "" };

        if (!searchData.origin) newError.origin = "Origin required";
        if (!searchData.destination) newError.destination = "Destination required";
        if (!searchData.date) {
            newError.date = "Date required";
        } else if (searchData.date < today) {
            newError.date = "Invalid date. Please select today or a future date.";
            setSearchData((prev) => ({ ...prev, date: today }));
        }

        if (newError.origin || newError.destination || newError.date) {
            setError(newError);
            return;
        }

        navigate(`/flights?origin=${searchData.origin}&destination=${searchData.destination}&date=${searchData.date}`);
    };

    return (
        <div className="p-6 bg-slate-800 text-center w-full flex justify-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-3xl font-bold mb-6 text-amber-500">Search Flights</h2>

                <div className="flex flex-wrap justify-center gap-4 w-full">
                    {/* Origin */}
                    <div className="relative w-full sm:w-auto flex-1 min-w-[200px]">
                        <select
                            name="origin"
                            onChange={handleChange}
                            value={searchData.origin}
                            className={`p-4 border rounded w-full text-white bg-slate-900 focus:outline-none appearance-none ${
                                error.origin ? "border-red-500 text-red-500" : "border-white"
                            }`}
                        >
                            <option value="" disabled className="text-gray-400">{error.origin || "Select Origin"}</option>
                            {predefinedCities.map((city) => (
                                <option key={city.code} value={city.code} disabled={city.code === searchData.destination} className="text-white bg-slate-900">
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                    </div>

                    {/* Destination */}
                    <div className="relative w-full sm:w-auto flex-1 min-w-[200px]">
                        <select
                            name="destination"
                            onChange={handleChange}
                            value={searchData.destination}
                            className={`p-4 border rounded w-full text-white bg-slate-900 focus:outline-none appearance-none ${
                                error.destination ? "border-red-500 text-red-500" : "border-white"
                            }`}
                        >
                            <option value="" disabled className="text-gray-400">{error.destination || "Select Destination"}</option>
                            {predefinedCities.map((city) => (
                                <option key={city.code} value={city.code} disabled={city.code === searchData.origin} className="text-white bg-slate-900">
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                    </div>

                    {/* Date */}
                    <div className="relative w-full sm:w-auto flex-1 min-w-[200px]">
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={searchData.date}
                            min={today} 
                            onFocus={(e) => e.target.showPicker()} 
                            className={`p-4 border rounded w-full text-white bg-slate-900 focus:outline-none ${
                                error.date ? "border-red-500 text-red-500 placeholder-red-500" : "border-white"
                            }`}
                        />
                        <LuCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                        {error.date && <p className="text-red-500 text-sm mt-1">{error.date}</p>}
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="bg-amber-500 text-white p-4 rounded w-full sm:w-auto flex-1 min-w-[200px] text-lg transition duration-300 ease-in-out hover:bg-amber-700"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFlights;
