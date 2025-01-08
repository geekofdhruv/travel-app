'use client'; // Ensure this component is treated as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import axios from 'axios';

const RegisterComponent = ({ heading }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Function to handle registration
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post("http://localhost:3000/register", {
                name,
                age,
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                console.log("registration successful, token saved :", response.data.token);
                router.push("/questions");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full lg:h-screen w-full">
            {/* Left side for the image */}
            <img 
                className="hidden lg:block lg:w-1/2 object-cover" src="/image1.jpg" alt="Placeholder" 
            />

            {/* Right side for the registration form */}
            <div className="w-1/2 flex flex-col justify-center items-center p-6 ">
                {/* Heading */}
                <h1 className="text-center text-[#242424] text-4xl font-bold mb-8">
                    {heading || 'Create an Account'}
                </h1>

                {/* Form Fields */}
                <form onSubmit={handleRegister} className="w-full max-w-md lg:max-w-lg flex flex-col gap-6 lg:gap-8" action='/register' method='post'>
                    {/* Name Input */}
                    <div>
                        <label>Name</label>
                        <input
                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 border-b-2 border-[#BDBDBD]  focus:outline-none focus:border-orange-400"
                            placeholder=""
                            required
                        />
                    </div>

                    {/* Age Input */}
                    <div className="relative w-full">
                        <label>Age</label>
                        <input
                            type="number" value={age} onChange={(e) => setAge(e.target.value)}
                            className="w-full h-12 border-b-2 border-[#BDBDBD]  focus:outline-none focus:border-orange-400"placeholder=""
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative w-full">
                        <label>
                            Email
                        </label>
                        <input
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 border-b-2 border-[#BDBDBD]  focus:outline-none focus:border-orange-400" placeholder=""
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative w-full">
                        <label>
                            Set Password
                        </label>
                        <input
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 border-b-2 border-[#BDBDBD]  focus:outline-none focus:border-orange-400"
                            placeholder=""
                            required
                        />
                    </div> 
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="h-12 bg-[#FE9052] rounded-[32px] text-white font-bold"
                    >SIGN UP
                    </button>
                </form>

                {/* Error Message Display */}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Log In link */}
                <div className="mt-8 text-center">
                    <span className="text-[#424242] text-sm lg:text-lg font-normal">Already have an account? </span>
                    <span 
                        onClick={() => router.push("/login")} 
                        className="text-[#FF5C01] text-sm lg:text-base font-bold underline cursor-pointer"
                    >
                        LOG IN
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
