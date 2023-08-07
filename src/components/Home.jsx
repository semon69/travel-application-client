import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const owner = user?.email

    const [allCommunity, setAllCommunity] = useState([])
    const [posts, setPosts] = useState([])
    console.log(posts[0]?.posts);

    // get all posts
    useEffect(() => {
        fetch('https://travel-application-server.vercel.app/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    // get all communities
    useEffect(() => {
        fetch('https://travel-application-server.vercel.app/communities')
            .then(res => res.json())
            .then(data => setAllCommunity(data))
    }, [])

    // implement join in a community using community id. Send user or owner email to fixed api in backend. Without login no one can join in a community.
    const handleJoin = (communityId) => {
        if (user) {
            fetch(`https://travel-application-server.vercel.app/communities/${communityId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ owner }),
            })
                .then(res => res.json())
                .then(data => {

                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Join in this group',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                )
        }
        else {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Please Login First',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/login')
        }
    }

    return (

        <div className='space-y-10 max-w-7xl mx-auto my-10'>
            <div className='shadow-xl p-5'>
                <h2 className='text-center text-3xl font-bold text-gray-500'>Post of Random Specific Community</h2>
                <h1 className='text-center font-bold text-blue-500'>Group Name: {posts[0]?.title}</h1>
                <ul className='grid grid-cols-3 gap-5 my-4'>
                    {posts[0]?.posts ?

                        posts[0]?.posts.map((community) => (
                            <li className='border p-2' key={community._id}>
                                <div>
                                    <h3 className='font-bold'>{community.title}</h3>
                                    <img className='py-2' src={community?.image} alt="" />
                                    <p>{community.content}</p>
                                </div>
                            </li>
                        ))

                        :
                        <>
                            <p className='font-bold'>There is no post in this Community</p>
                        </>
                    }
                </ul>
            </div>
            <div className='shadow-xl p-5'>
                <h2 className='text-center font-bold text-3xl'>Other Communities</h2>
                <ul className='grid grid-cols-3 gap-5 my-5'>
                    {allCommunity.map((community) => (
                        <li className='border p-2 flex justify-between items-center' key={community._id}>
                            <div>
                                <h3 className='font-bold'>{community.name}</h3>
                                <p>{community.description}</p>
                            </div>
                            <div>
                                <button onClick={() => handleJoin(community._id)} title={community._id} className='btn'>Join</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;