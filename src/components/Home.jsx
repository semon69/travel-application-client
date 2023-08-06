import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const { age } = useContext(AuthContext)
    console.log(age);
    return (

        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;