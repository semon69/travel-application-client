import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()
    // const location = useLocation()
    // const from = location?.state?.from?.pathname || '/'
    const [show, setShow] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext)

    const onSubmit = data => {

        console.log(data.email, data.password)
        login(data.email, data.password)
            .then(result => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Success. Please Login Now',
                    showConfirmButton: false,
                    timer: 3000
                })
                navigate('/')
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err?.message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })

    };
    const handleShowPassword = () => {
        setShow(!show)
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-center font-bold text-4xl mt-10 mb-6'>Login Now</h1>
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

                        <input {...register("password", { required: true })} type={show ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" />


                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-gradient-to-r from-red-600 to-indigo-700 text-white" type="submit" value="Login" />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className='mt-4 text-center pb-4'><small>New to La Masia? <Link className='underline' to="/signup">Create an account</Link> </small></p>
            </div>
        </div>
    );
};

export default Login;