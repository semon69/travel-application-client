import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-5xl font-bold p-9'>Welcome back {user?.displayName} to your dashboard</h2>
        </div>
    );
};

export default Dashboard;