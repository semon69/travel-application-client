import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [myCommunity, setMyCommunity] = useState([])
    const [allCommunity, setAllCommunity] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/communities')
            .then(res => res.json())
            .then(data => setAllCommunity(data))
    }, [])
    return (

        <div>
            <h1>Home</h1>
            <div>
                <h2>Other Communities</h2>
                <ul className='grid grid-cols-3 gap-5'>
                    {allCommunity.map((community) => (
                        <li className='border p-2' key={community._id}>
                            <h3>{community.name}</h3>
                            <p>{community.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;