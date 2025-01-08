import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginComponent = ({ heading}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
       try {
            // Use POST method to send login data
            const response = await axios.post("http://localhost:3000/login", {
                username,
                password,
            });
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                console.log("Login successful, token saved");
                router.push("/");
                
            }

        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            {/* Left Side with Image */}
            <img 
                className="hidden lg:block lg:w-1/2 h-full object-cover" 
                src="/image1.jpg" 
                alt="Placeholder" 
            />

            {/* Right Side with Login Form */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-6">
                {/* Heading */}
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#242424] mb-8">
                    {heading || 'Welcome Back'}
                </h2>

                {/* Login Form */}
                <form className="w-full max-w-md lg:max-w-lg flex flex-col gap-6" onSubmit={handleLogin} >
                    {/* Username Input */}
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            className="w-full border-b-2 border-[#BDBDBD] focus:border-orange-500 focus:outline-none py-2 text-lg"
                            placeholder="Enter your email or username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="w-full border-b-2 border-[#BDBDBD] focus:border-orange-500 focus:outline-none py-2 text-lg"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Remember Me and Submit Button */}
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
                        {/* Remember Me Checkbox */}
                        <label className="flex items-center gap-2 text-[#757575]">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 accent-orange-500" 
                            />
                            Remember me
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-auto"
                    >
                        Log In
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-sm lg:text-base text-[#424242]">
                    No account yet?{' '}
                    <a href="/register" className="text-orange-500 font-bold underline">
                        Sign Up
                    </a>
                </p>

                {/* Error Message Display */}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default LoginComponent;
