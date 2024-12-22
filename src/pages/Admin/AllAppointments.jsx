import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import Loading from "../../components/Loading";
import { Appcontext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const { getAllAppointments, appointments, aToken, backendUrl } =
    useContext(AdminContext);
  const { CalculateAge, slotDateFormat, currency } = useContext(Appcontext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  if (!appointments || appointments.length === 0) {
    return <Loading />;
  }

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

  return (
    <div className="w-full max-w-6xl mt-6 mx-auto">
      <p className="mb-6 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 border-b bg-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 border-b"
          >
            <p className="max-sm:hidden">{idx + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item?.userData?.image}
                alt="Patient"
                className="w-8 h-8 rounded-full"
              />
              <p>{item?.userData?.name}</p>
            </div>
            <p className="max-sm:hidden">{CalculateAge(item?.userData?.dob)}</p>
            <p>
              {slotDateFormat(item?.slotDate)}, {item?.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                src={item?.docData?.image}
                alt="Patient"
                className="w-8 h-8 bg-gray-200 rounded-full"
              />
              <p>{item?.docData?.name}</p>
            </div>
            <p>
              {" "}
              {currency}
              {item.amount}
            </p>
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
  );
};

export default AllAppointments;
