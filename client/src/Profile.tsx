import React, { useEffect, useState } from 'react';

interface UserData {
  imageUrl: string;
  name: string;
  email: string;
  mobile: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Fetching data from localStorage
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center">
            <img
              src={userData.imageUrl}
              alt={`${userData.name}'s avatar`}
              className="w-32 h-32 rounded-full shadow-md object-cover"
            />
          </div>
          <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
            {userData.name}
          </h2>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-700">{userData.email}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-600">Mobile:</span>
              <span className="text-gray-700">{userData.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
