import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorsContext";
import { assets } from "../../assets/assets";
import { Appcontext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    DToken,
    dashdata,
    setDashdata,
    getDashdata,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(Appcontext);
  // console.log({dashdata , DToken})

  useEffect(() => {
    getDashdata();
  }, []);

  return (
    dashdata && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {currency} {dashdata.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashdata.appointments}
              </p>
              <p className="text-gray-400">Appointment</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashdata.patients}
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
            {dashdata.latestApp.map((item, idx) => (
              <div
                className="flex items-center px-6 gap-3 py-3 hover:bg-gray-100  "
                key={idx}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600 ">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-orange-600 border rounded p-2">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-primary border rounded   p-2">Completed</p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer "
                      src={assets.cancel_icon}
                      alt=""
                    />

                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer "
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
