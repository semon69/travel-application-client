import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    const {  } = useContext(AuthContext)

    return (

        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;