import Navber from "./components/Navber";
import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Sideber from "./components/Sideber";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Root from "./pages/Root";
import { DoctorContext } from "./context/DoctorsContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
 

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { DToken } = useContext(DoctorContext);
  return  aToken || DToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navber />

      <div className="flex items-start ">
        <Sideber />

        <Routes>

          {/* admin routes */}
          <Route path="/" element={<Root/>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/doctor-list" element={<DoctorsList />}></Route>

          <Route path="/doctor-dashboard" element={<DoctorDashboard />}></Route>
          <Route path="/doctor-appointments" element={<DoctorAppointments />}></Route>
          <Route path="/doctor-profile" element={<DoctorProfile />}></Route>

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
