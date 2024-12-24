import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorsContext";

const Sideber = () => {

    const {aToken} = useContext(AdminContext)
    const {DToken} = useContext(DoctorContext)
    return (
        <div className="min-h-screen bg-white border-r">

                {aToken && <ul className="text-indigo-950 mt-5 ">
                    <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink >
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` } to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/doctor-list'} >
                        <img src={assets.people_icon} alt="" />
                        <p>Doctor List</p>
                    </NavLink>
                </ul> }


                {DToken && <ul className="text-indigo-950 mt-5 ">
                    <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink >
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/doctor-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>
                     
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''}` }  to={'/doctor-profile'} >
                        <img src={assets.people_icon} alt="" />
                        <p className="hidden md:block">Profile</p>
                    </NavLink>
                </ul> }


            
        </div>
    );
};

export default Sideber;