import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from .env file
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || ""); // Token from localStorage
  const [doctors, setDoctors] = useState([]); // State to store doctors' data

  const [dashData , setDashData] = useState(false)  

  const [appointments , setAppointments] = useState([])

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
      toast.error(err.message);  
    }
  };
  const cencelAppoinment = async (appointmentId) => {
    // console.log({backendUrl , appointmentId })

    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cencel-appoinment",
        { appointmentId },
       { headers: { aToken } } 
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashboardData = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } } )
      if(data.success){
        console.log('Dashboard Data', data.dashData)
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);  
      
    }
  }

  const Changeavailablity = async(docId)=>{
    try {

        const {data} = await axios.post(backendUrl + '/api/admin/change-availablity' , {docId} , {
          headers:{aToken}
        })
        if(data.success){
          toast.success(data.message)
          getAllDoctors()
        }else{
          toast.error(data.message)
        }
      
      
    } catch (error) {
      toast.error(error.message); // Show error toast for unexpected issues
      
    }
  }

  const getAllAppointments =async()=>{
    try {
      const {data} = await axios.get(backendUrl +"/api/admin/appointments",{
        headers:{aToken}
      })

      if(data.success){
        console.log(data.appointments)
        setAppointments(data.appointments)
      }else{
      toast.error(data.message)

      }


    } catch (error) {

      toast.error(error.message)
      
    }
  }

 

  // Context value object
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    Changeavailablity,
    getAllAppointments,
    appointments,
    setAppointments,
    dashData,
    getDashboardData,
    cencelAppoinment
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
