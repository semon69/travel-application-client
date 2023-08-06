// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="text-white font-bold text-xl">Travel App</div>
            <div className="flex space-x-4">
                <Link to="/" className="text-white hover:text-gray-200">
                    Home
                </Link>
                <Link to="/login" className="text-white hover:text-gray-200">
                    Login
                </Link>
                <Link to="/signup" className="text-white hover:text-gray-200">
                    Signup
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
