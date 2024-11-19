import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLoading, setIsloading] = useState(false); // Use only `boolean` for better state management
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true); // Disable button after form submission starts

    if (!loginData.email || !loginData.password) {
      alert('Please fill all the fields');
      setIsloading(false); // Re-enable button if validation fails
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      alert('Login successful!');
      localStorage.setItem('data', JSON.stringify(data.user)); // Save user data
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    } finally {
      setIsloading(false); // Re-enable the button
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>

        <Input
          label="Email"
          name="email"
          type="email"
          value={loginData.email}
          required={true}
          placeholder="Enter your email address"
          onChange={handleInputChange}
          id="email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          required={true}
          placeholder="Enter your password"
          onChange={handleInputChange}
          id="password"
        />

        <button
          type="submit"
          disabled={isLoading} // Disable button while `isLoading` is true
          className={`w-full py-3 font-semibold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default Login;
