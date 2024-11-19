import { NavLink } from "react-router-dom";

const App = () => {
    return (
        <div className="App flex items-center justify-center min-h-screen ">
            <div className="flex flex-col items-center p-8 space-y-4 bg-white rounded-lg shadow-2xl transform transition hover:scale-105">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome</h1>
                <p className="text-gray-500 mb-6 text-center">Please select an option below to get started</p>
                
                <NavLink
                    to="/auth/login"
                    className="w-full py-3 px-6 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/auth/register"
                    className="w-full py-3 px-6 text-center text-white bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    Register
                </NavLink>
            </div>
        </div>
    );
};

export default App;
