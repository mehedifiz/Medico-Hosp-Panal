import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorsContext";
import { Appcontext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, DToken , updateProfile } =
    useContext(DoctorContext);

  const { currency } = useContext(Appcontext);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getProfileData();
  }, [DToken]);

  if (!profileData) {
    return <Loading />;
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Doctor Image */}
        <div className="w-full md:w-1/3">
          <img
            className="w-full bg-primary bg-primary/80 h-auto rounded-lg object-cover shadow-md"
            src={profileData.image || ""}
            alt={profileData.name}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 border border-gray-200 bg-white p-6 rounded-lg">
          {/* Name */}
          <h1 className="text-3xl font-semibold text-gray-800">
            
              {profileData.name}
             
          </h1>

          {/* Degree and Speciality */}
          <p className="mt-2 text-lg text-gray-600">
            {profileData.degree} - {profileData.speciality}
          </p>

          {/* Experience and Fee */}
          <div className="flex items-center gap-3 mt-4">
            <button className="py-1 px-3 bg-primary text-white text-xs rounded-full">
                
                {profileData.experience} Years Experience
              
            </button>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Fee:</span> {currency} 
              {edit ? (
                <input
                  type="number"
                  className="border rounded-lg p-1"
                  value={profileData.fees}
                  onChange={(e) => handleInputChange("fees", e.target.value)}
                />
              ) : (
                profileData.fees
              )}
            </p>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800">About:</h2>
            <p className="text-gray-600 text-sm mt-2">
              { profileData.about}
            </p>
          </div>

           {/* Address Section */}
           <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Address:</h2>
              <div className="text-gray-600 text-sm mt-2">
                {edit ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Line 1"
                      value={profileData.address.line1}
                      onChange={(e) => setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))}
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Line 2"
                      value={profileData.address.line2}
                      onChange={(e) => setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))}
                      className="p-2 border rounded"
                    />
                  </div>
                ) : (
                  <div>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </div>
                )}
              </div>
            </div>

          {/* Availability */}
          <div className="mt-6 flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={(e) =>
                handleInputChange("available", e.target.checked)
              }
              className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              disabled={!edit}
            />
            <label className="text-gray-600">Available for Appointments</label>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            {edit ? (
              <button
                onClick={() => updateProfile()} 
                className="py-2 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="py-2 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition"
              >
                Edit Profile
              </button>
            )}
            {edit && (
              <button
                onClick={() => setEdit(false)}
                className="py-2 px-6 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
