import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';

const SignUp = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();
    const { createUser, profileUpdate, logOut } = useContext(AuthContext);

    // const navigate = useNavigate();
    const onSubmit = data => {
        reset()
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                profileUpdate(data.name, data.photoURL)
                    .then(() => {
                        const user = { name: data.name, email: loggedUser.email, image: data.photoURL }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(user)
                        })
                            .then(data => {
                                // console.log(data);
                                // Swal.fire({
                                //     position: 'top-end',
                                //     icon: 'success',
                                //     title: 'Sign Up Success',
                                //     showConfirmButton: false,
                                //     timer: 1500
                                // })
                                logOut()
                                    .then(() => { })
                                navigate('/login')
                            })
                            .then(err => console.log(err))
                    })
                    .catch(error => console.log(error))
            })
            .then(err => console.log(err))
    }
    return (
        <div className='max-w-5xl mx-auto my-9'>
            <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            className="input input-bordered"
                            placeholder='Confirm Password'
                            {...register("passwordConfirmation", {
                                required: "Please confirm password!",
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return password === value || "Passwords should match!";
                                    }
                                }
                            })}
                        />
                        {errors.passwordConfirmation && <p className="text-red-600">{errors.passwordConfirmation.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Photo URL</span>
                        </label>
                        <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-gradient-to-r from-red-600 to-indigo-700 text-white" type="submit" value="Sign Up" />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className='mt-4'><small>Already have an account <Link to="/login">Login</Link></small></p>
            </div>
        </div>
    );
};

export default SignUp;