import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";

const Navber = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate(); // Initialize navigate using useNavigate hook

  const Logout = () => {
    navigate("/"); // Navigate to the home route
    if (aToken) {
      setAToken(""); // Clear token in context
      localStorage.removeItem("aToken"); // Remove token from local storage
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        <p className="border px-2.5 pt-0.5 rounded-full border-gray-600 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={Logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navber;
