import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import CreateCommunity from './funtionality/CreateCommunity';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const owner = user?.email
    const handleCreateCommunity = async (name, description) => {
        // Call your backend API to create a new community
        const response = await fetch('http://localhost:5000/communities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, owner }),
        });

        const data = await response.json();
        // Update the list of other communities
        setOtherCommunities([...otherCommunities, data]);
    };
    return (
        <div>
            <h2 className='text-5xl font-bold p-9'>Welcome back {user?.displayName} to your dashboard</h2>
            <CreateCommunity onCreateCommunity={handleCreateCommunity}></CreateCommunity>
        </div>
    );
};

export default Dashboard;