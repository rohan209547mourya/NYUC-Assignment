import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

interface IRegistrationData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  chooseFile: File | undefined;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean | undefined>(false);
  const [registrationData, setRegistrationData] = useState<IRegistrationData>({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    chooseFile: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setRegistrationData((prevData) => ({
      ...prevData,
      chooseFile: file,
    }));
  };

  async function handleImageUpload(): Promise<string> {
    if (!registrationData.chooseFile) {
      throw new Error('No file selected');
    }

    const formData = new FormData();
    formData.append('file', registrationData.chooseFile as Blob);
    formData.append('upload_preset', 'ml_default');
  
    const res = await fetch('https://api.cloudinary.com/v1_1/dlku39g5z/image/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await res.json();
    if (!data.secure_url) {
      throw new Error('No secure URL received from upload');
    }

    return data.secure_url;
  }
  
  const handleRegistration = async (imageUrl: string) => {
    const response = await fetch('https://nyuc-assignment.onrender.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: registrationData.name,
        email: registrationData.email,
        mobile: registrationData.mobile,
        password: registrationData.password,
        imageUrl: imageUrl,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to register');
    }

    return await response.json();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
  
    try {
      if (registrationData.password !== registrationData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const imageUrl = await handleImageUpload();
      
      const registrationResponse = await handleRegistration(imageUrl);
      
      alert(registrationResponse.message);
      navigate('/auth/login');
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Registration Form
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Name"
            name="name"
            type="text"
            value={registrationData.name}
            required={true}
            placeholder="Enter your name"
            onChange={handleInputChange}
            id="name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={registrationData.email}
            id="email"
            required={true}
            placeholder="Enter your email address"
            onChange={handleInputChange}
          />
        </div>

        <Input
          type="text"
          name="mobile"
          id="mobile"
          value={registrationData.mobile}
          required={true}
          label="Mobile"
          placeholder="Enter your mobile number"
          onChange={handleInputChange}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="password"
            name="password"
            id="password"
            value={registrationData.password}
            required={true}
            label="Password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required={true}
            value={registrationData.confirmPassword}
            label="Confirm Password"
            placeholder="Re-enter password"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="file"
            className="text-sm font-medium text-gray-600 required"
          >
            Profile Image
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            name="file"
            id="file"
            required={true}
            accept="image/png"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500">Only PNG files are allowed.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;