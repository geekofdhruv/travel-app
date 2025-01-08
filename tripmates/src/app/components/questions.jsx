'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import { jwtDecode } from 'jwt-decode';

const QuestionsList = ({ questions }) => {
    const [responses, setResponses] = useState(Array(questions.length).fill('')); 
    const router = useRouter(); 



    const handleChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value; 
        setResponses(newResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        try {
            
            const response = await axios.post("http://localhost:3000/questions", 
            {responses},{ 
                headers: {
                Authorization: `Bearer ${token}`, // Include token in Authorization header
              }
            }

            );
            console.log("Response saved successfully:", response.data);
            if (response.status === 200) {
                router.push("/"); 
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8">
            {questions.map((question, index) => (
                <div key={index} className="my-4">
                    <label className="block font-medium mb-2" htmlFor={`question_${index}`}>
                        {question.label}
                    </label>
                    <select
                        name={`response${index}`}
                        id={`question_${index}`}
                        className="w-full p-3 border rounded"
                        value={responses[index]}
                        onChange={(e) => handleChange(index, e.target.value)} 
                    > <option value="">Select</option>
                        {question.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <button 
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default QuestionsList;
