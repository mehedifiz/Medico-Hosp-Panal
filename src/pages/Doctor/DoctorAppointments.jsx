import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorsContext";
import Loading from "../../components/Loading";
import { Appcontext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    appointments,
    getAppointments,
    loading,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { CalculateAge, slotDateFormat, currency } = useContext(Appcontext);

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] ga-1 py-3 px-6 border-b">
          <p className="max-sm:hidden">#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments?.length > 0 ? (
          appointments.map((item, idx) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5     max-sm:text-base  sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-3 border-b "
              key={idx}
            >
              <p className="max-sm:hidden">{idx + 1}</p>

              <div>
                <img
                  className="w-8 rounded-full inline border border-primary "
                  src={item.userData?.image}
                /> 
                <p>{item.userData?.name || "N/A"}</p>
              </div>
              <div>
                <p className=" text-xs inline border border-primary px-2 rounded-full text-center ">
                  {item.payment ? "Online" : "CASH"}
                </p>
              </div>
              <div>
                <p className="max-sm:hidden">
                  {CalculateAge(item.userData.dob)}
                </p>
              </div>

              <p>
                {slotDateFormat(item.slotDate)} ,{item.slotTime}
              </p>
              <p>
                {currency} {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-orange-600 border rounded p-2">Cancelled</p>
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
          ))
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
