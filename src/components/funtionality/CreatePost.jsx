import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const { user } = useContext(AuthContext)
    const owner = user?.email
    const { communityId } = useParams()

    const handleCreatePost = async (title, content, image) => {
        // Call your backend API to create a new post within the community
        const response = await fetch(`https://travel-application-server.vercel.app/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ owner: owner, title, content, communityId, image }),
        });

        const data = await response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
   
        handleCreatePost(title, content, image)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Create a post successfully',
            showConfirmButton: false,
            timer: 3000
        })
    };
    return (
        <div>
            <div className='w-full shadow-xl mx-52 p-10 space-y-7'>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='w-full'>
                        <label>Title:</label>
                        <br />
                        <input className="input input-bordered w-full max-w-xs" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='w-full'>
                        <label>Image:</label>
                        <br />
                        <input className="input input-bordered w-full max-w-xs" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className='w-full'>
                        <label>Content:</label>
                        <br />
                        <textarea className="textarea textarea-bordered" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <button className='btn' type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;