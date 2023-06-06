import React from 'react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const [passwordEye, setPasswordEye] = useState(false)

    // handle password eye
    const handlePassword = () => {
        setPasswordEye(!passwordEye)
    }

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const registerUser = async (e) => {
        e.preventDefault();

        console.log('form submitted')
        
        const {username, email, password} = data

        try {
            const {data} = await axios.post('/register', {
                username, email, password
            })

            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success(`Registration succesfull. Welcome ${username}!`)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-white mb-8">Registration Page</h1>
            <div className="bg-amber-50 p-8 rounded-lg mx-auto">
                <p className="text-lg text-gray-800 mb-4">Welcome to our registration page!</p>
                <form onSubmit={registerUser}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="username" className="text-gray-800 text-lg">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="px-4 py-2 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username here"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="text-gray-800 text-lg">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="px-4 py-2 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email here"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col mb-4 relative">
                        <label htmlFor="password" className="text-gray-800 text-lg">Password</label>
                        <input
                            type={passwordEye === false ? 'password' : 'text'}
                            id="password"
                            className="px-4 py-2 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password here"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <div className='text-2xl absolute top-1/2 right-3 cursor-pointer'>
                            {passwordEye === false ? (<AiFillEyeInvisible
                                onClick={handlePassword}
                            />) : (
                                <AiFillEye onClick={handlePassword} />
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 py-2 px-6 bg-slate-600 text-white rounded-md shadow-md hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}

