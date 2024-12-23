import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DoctorContextProvider = (props) => {
  const [DToken, setDToken] = useState(
    localStorage.getItem("DToken") ? localStorage.getItem("DToken") : ""
  );
  const [appointments, setAppoiments] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const getAppointments = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { DToken } }
      );

      if (data.success) {
        setAppoiments(data.doctorappointments.reverse());
        console.log(data.doctorappointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading is false after fetching
    }
  };

  const completeAppointment = async (appointmentId) => {

    console.log(appointmentId)
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { DToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { DToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    DToken,
    setDToken,
    appointments,
    setAppoiments,
    getAppointments,
    completeAppointment,
    cancelAppointment, // Add cancelAppointment to the context
    loading, // Include loading in context
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
