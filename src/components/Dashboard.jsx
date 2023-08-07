import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import CreateCommunity from './funtionality/CreateCommunity';
import CreatePost from './funtionality/CreatePost';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const owner = user?.email
    const [myCommunity, setMyCommunity] = useState([])
    const [otherCommunities, setOtherCommunities] = useState([]);
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

    // const handleCreatePost = async (title, content) => {
    //     // Call your backend API to create a new post within the community
    //     const response = await fetch(`http://localhost:5000/posts/${communityId}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ userId: 'USER_ID', title, content }), // Replace 'USER_ID' with the actual user ID
    //     });

    //     const data = await response.json();
    //     setCommunityPosts([...communityPosts, data]); // Update the list of community posts
    // };

    useEffect(() => {
        fetch(`http://localhost:5000/communities?owner=${owner}`)
            .then(res => res.json())
            .then(data => setMyCommunity(data))
    }, [])

    return (
        <div className='max-w-7xl mx-auto space-y-9 my-10'>
            <h2 className='text-5xl font-bold p-9'>Welcome back {user?.displayName} to your dashboard</h2>
            <div className='grid grid-cols-2'>
                <CreateCommunity onCreateCommunity={handleCreateCommunity}></CreateCommunity>
            </div>
            <div>
                <h2>My Communities</h2>
                <ul className='grid grid-cols-3 gap-5 my-4'>
                    {myCommunity.map((community) => (
                        <li className='border border-black p-2' key={community._id}>
                            <div>
                                <h3>{community.name}</h3>
                                <p>{community.description}</p>
                            </div>
                            <div>
                                <button className='btn'><Link to={`/communities/:${community._id}`}>Post</Link></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;