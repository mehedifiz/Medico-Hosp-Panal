import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from .env file
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || ""); // Token from localStorage
  const [doctors, setDoctors] = useState([]); // State to store doctors' data

  // Function to fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } =  await axios.post(backendUrl + '/api/admin/all-doctors' , {},{
        headers: {aToken}
      })

      if (data.success) {
        setDoctors(data.doctors); // Set doctors in state
        console.log(data.doctors); // Log data for debugging
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (err) {
      toast.error(err.message); // Show error toast for unexpected issues
    }
  };

  // Context value object
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
