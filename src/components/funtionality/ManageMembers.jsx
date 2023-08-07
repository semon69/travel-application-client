import React, { useEffect } from 'react';

const ManageMembers = ({ member }) => {

    return (
        <div className=''>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            member.map(mem =>
                                <>
                                    <tr key={mem._id}>
                                        
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={mem?.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{mem?.name}</div>
                                                  
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            
                                            <br />
                                            <span className="badge badge-ghost">{mem?.email}</span>
                                        </td>
                                        <td className='btn'>Delete</td>
                                        
                                    </tr>
                                </>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageMembers;