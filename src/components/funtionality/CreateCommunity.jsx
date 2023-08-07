import React, { useState } from 'react';

const CreateCommunity = ({onCreateCommunity}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateCommunity(name, description);
        e.target.reset()
    };
    return (
        <div className='w-[800px] shadow-xl mx-52 p-10 space-y-7'>
            <h2>Create a New Community</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='w-full'>
                    <label>Name:</label>
                    <br />
                    <input className="input input-bordered w-full max-w-xs" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='w-full'>
                    <label>Description:</label>
                    <br />
                    <textarea className="textarea textarea-bordered" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className='btn' type="submit">Create Community</button>
            </form>
        </div>
    );
};

export default CreateCommunity;