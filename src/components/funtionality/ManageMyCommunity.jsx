import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import ManageMembers from './ManageMembers';
import { useParams } from 'react-router-dom';

const ManageMyCommunity = () => {
    const {communityId} = useParams()
    const [member, setMembers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/communities/${communityId}`)
        .then(res => res.json())
        .then(data => setMembers(data))
    }, [])
    console.log(member);
    return (
        <div className='max-w-7xl mx-auto'>
            <ManageMembers member={member}></ManageMembers>
            <CreatePost></CreatePost>
        </div>
    );
};

export default ManageMyCommunity;