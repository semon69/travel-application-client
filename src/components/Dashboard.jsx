import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import CreateCommunity from './funtionality/CreateCommunity';
import CreatePost from './funtionality/CreatePost';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const owner = user?.email
    const [myCommunity, setMyCommunity] = useState([])

    // handle create community function and send as prop in CreateCommunity component
    const handleCreateCommunity = async (name, description) => {
        // Call your backend API to create a new community
        const response = await fetch('https://travel-application-server.vercel.app/communities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, owner }),
        });

        const data = await response.json();
    };

    // fetch communities data based on user or owner available in dashboard
    useEffect(() => {
        fetch(`https://travel-application-server.vercel.app/communities?owner=${owner}`)
            .then(res => res.json())
            .then(data => setMyCommunity(data))
    }, [])

    return (
        <div className='max-w-7xl mx-auto space-y-9 my-10'>
            <h2 className='text-5xl font-bold p-9'>Welcome back {user?.displayName} to your dashboard</h2>
            <div className='grid grid-cols-2'>
                <CreateCommunity onCreateCommunity={handleCreateCommunity}></CreateCommunity>
            </div>
            <div className='shadow-xl p-5'>
                <h2 className='text-3xl font-bold text-center my-4'>My Communities</h2>
                <ul className='grid grid-cols-3 gap-5 my-4'>
                    {myCommunity.map((community) => (
                        <li className='border border-black p-4' key={community._id}>
                            <div>
                                <h3 className='font-bold'>{community.name}</h3>
                                <p className='py-3'>{community.description}</p>
                            </div>
                            <div>
                                <button className='btn'><Link to={`/communities/${community._id}`}>Manage This Community</Link></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;