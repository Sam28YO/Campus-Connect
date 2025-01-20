import { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/hello', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponseMessage('Sign-up successful!');
    } catch (error) {
      setResponseMessage('Try again.');
    }
  };

  return (
    <div>
    <Header/>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Create an Account</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sign up to get started and enjoy our services!
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="block text-sm font-medium text-gray-600 mb-1">Name</h1>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2" placeholder="Name"/>
          </div>
          <div>
            <h1 className="block text-sm font-medium text-gray-600 mb-1">Email</h1>
            <input type="email" id="email" name="email" value={formData.email}onChange={handleInputChange} required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2"placeholder="EMAIL"/>
          </div>
          <div>
            <h1 className="block text-sm font-medium text-gray-600 mb-1">Password</h1>
            <input type="password" id="password"name="password" value={formData.password} onChange={handleInputChange} required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 px-4 py-2" placeholder="enter password"/>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300">Sign Up</button>
        </form>
        {responseMessage && (<p className="mt-4 text-center text-sm font-medium text-red-500">{responseMessage}
          </p>)}
        
      </div>
    </div>
    <Footer/>
    </div>
  );
}
