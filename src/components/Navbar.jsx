// src/components/Navbar.js
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 px-10 py-4">
            <div className="text-white font-bold text-xl">Travel App</div>
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-gray-200">
                    Home
                </Link>
                <div className='flex justify-between items-center gap-3'>
                    {
                        user ?
                            <>
                                <Link to="/dashboard" className="text-white hover:text-gray-200 ">
                                    Dashboard
                                </Link>
                                <p className="btn">
                                    Logout
                                </p>
                                <img className='w-14 h-14 rounded-full' src={user?.photoURL} alt="" />
                            </>
                            :
                            <>
                                <Link to="/login" className="text-white hover:text-gray-200">
                                    Login
                                </Link>
                                <Link to="/signup" className="text-white hover:text-gray-200">
                                    Signup
                                </Link>
                            </>
                    }
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
