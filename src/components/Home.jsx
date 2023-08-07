import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    const owner = user?.email
    
    const [allCommunity, setAllCommunity] = useState([])
    const [posts, setPosts] = useState([])
    console.log(posts);
    // const [dbUser, setDbUser] = useState([])

    // const userId = dbUser.find(us => us.owner == user?.email) 
    // console.log(userId);

    // useEffect(()=> {
    //     fetch('http://localhost:5000/users')
    //     .then(res => res.json())
    //     .then(data => setDbUser(data))
    // }, [])

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

    const handleJoin = (communityId) => {
        fetch(`http://localhost:5000/communities/${communityId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({owner}),
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    return (

        <div className='space-y-10'>
            <div>
                <h2>All Post</h2>
                <ul className='grid grid-cols-3 gap-5'>
                    {posts.map((community) => (
                        <li className='border p-2' key={community._id}>
                            <div>
                                <h3>{community.title}</h3>
                                <p>{community.content}</p>
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
                                <button onClick={()=> handleJoin(community._id)} title={community._id} className='btn'>Join</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;