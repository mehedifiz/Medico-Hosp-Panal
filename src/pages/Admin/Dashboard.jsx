import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { Appcontext } from "../../context/AppContext";

const Dashboard = () => {
  const { backendUrl, dashData, aToken, getDashboardData, cencelAppoinment } =
    useContext(AdminContext);
    const{slotDateFormat}   = useContext(Appcontext)

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointment</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 ">
            {dashData.latestAppointments.map((item, idx) => (
              <div className="flex items-center px-6 gap-3 py-3 hover:bg-gray-100  " key={idx}>
                <img className="rounded-full w-10" src={item.docData.image} alt="" />

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600 ">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-sm font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cencelAppoinment(item._id)}
                    src={assets.cancel_icon}
                    alt=""
                    className="w-14 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
