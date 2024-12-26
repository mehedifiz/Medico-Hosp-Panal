import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorsContext";
import { Appcontext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, DToken } =
    useContext(DoctorContext);

  const { currency, backendUrl } = useContext(Appcontext);
  const[edit ,setEdit] = useState(false)

  useEffect(() => {
    getProfileData();
  }, [DToken]);

  if (!profileData) {
    return <Loading />;
  }

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Doctor Image */}
          <div className="w-full md:w-1/3">
            <img
              className="w-full bg-primary  bg-primary/80 h-auto rounded-lg object-cover shadow-md"
              src={profileData.image || ""}
              alt={profileData.name}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 border border-gray-200 bg-white p-6 rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800">
              {profileData.name}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <button className="py-1 px-3 bg-primary text-white text-xs rounded-full">
                {profileData.experience} Years Experience
              </button>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Fee:</span> {currency}{" "}
                {profileData.fees}
              </p>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">About:</h2>
              <p className="text-gray-600 text-sm mt-2">
                {profileData.about || "Information not available."}
              </p>
            </div>

            {/* Address Section */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Address:</h2>
              <div className="text-gray-600 text-sm mt-2">
                <p>{profileData.address.line1}</p>
                <p>{profileData.address.line2}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                readOnly
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="text-gray-600">Available for Appointments</label>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button className="py-2 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
