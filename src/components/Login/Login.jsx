import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const navigate = useNavigate()
    // const location = useLocation()
    // const from = location?.state?.from?.pathname || '/'
    const [show, setShow] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {login} = useContext(AuthContext)

    const onSubmit = data => {

        console.log(data.email, data.password)
        login(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate('/')
            })
            .catch(err => console.log(err))

    };
    const handleShowPassword = () => {
        setShow(!show)
    }

    return (
        <div className='w-1/3'>
            <div className="card shadow-2xl p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <div className='flex relative'>
                            <input {...register("password", { required: true })} type={show ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" />
                            <span onClick={handleShowPassword} className='cursor-pointer absolute right-3 top-3'><FaEye></FaEye></span>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn" type="submit" value="Login" />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className='mt-4'><small>New to La Masia? <Link to="/signup">Create an account</Link> </small></p>
            </div>
        </div>
    );
};

export default Login;