import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    
    const [allCommunity, setAllCommunity] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        fetch('http://localhost:5000/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
    },[])

    useEffect(() => {

        fetch('http://localhost:5000/communities')
            .then(res => res.json())
            .then(data => setAllCommunity(data))
    }, [])
    
    return (

        <div>
            <div>
                <h2>All Post</h2>
                <ul className='grid grid-cols-3 gap-5'>
                    {posts.map((community) => (
                        <li className='border p-2' key={community._id}>
                            <div>
                                <h3>{community.title}</h3>
                                <p>{community.content}</p>
                            </div>
                            <div>
                                <p>Join</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Other Communities</h2>
                <ul className='grid grid-cols-3 gap-5'>
                    {allCommunity.map((community) => (
                        <li className='border p-2' key={community._id}>
                            <div>
                                <h3>{community.name}</h3>
                                <p>{community.description}</p>
                            </div>
                            <div>
                                <p>Join</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;