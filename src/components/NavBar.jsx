import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router"; 
import { isAuthenticated, logoutUser } from "../services/authService";
import { HiOutlineMenu, HiX } from "react-icons/hi"; 

const NavBar = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    const handleLogout = () => {
        logoutUser();
        setAuthenticated(false);
        navigate("/");
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-900 p-4 text-white shadow-md w-full">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <h1
                    className="text-2xl text-amber-500 font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Skypiea
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-lg hover:underline px-4 py-2 mr-4">Home</Link> 
                    {authenticated && (
                        <>
                            <Link to="/flights" className="text-lg hover:underline px-4 py-2">Flights</Link>
                            <Link to="/dashboard" className="text-lg hover:underline px-4 py-2">Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-slate-500 px-4 py-2 rounded hover:bg-slate-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!authenticated && (
                        <>
                            <Link to="/login" className="bg-amber-500 px-4 py-2 rounded hover:bg-amber-700 transition">Login</Link>
                            <Link to="/register" className="bg-slate-500 px-4 py-2 rounded hover:bg-slate-700 transition">Register</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-4 bg-slate-800 p-4 rounded-lg">
                    <Link to="/" className="text-lg hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
                    {authenticated && (
                        <>
                            <Link to="/flights" className="text-lg hover:underline" onClick={() => setMenuOpen(false)}>Flights</Link>
                            <Link to="/dashboard" className="text-lg hover:underline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-slate-500 px-4 py-2 rounded hover:bg-slate-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!authenticated && (
                        <>
                            <Link to="/login" className="bg-amber-500 px-4 py-2 rounded hover:bg-amber-700 transition" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="bg-slate-500 px-4 py-2 rounded hover:bg-slate-700 transition" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
