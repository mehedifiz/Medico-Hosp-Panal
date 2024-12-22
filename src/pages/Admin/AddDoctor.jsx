import axios from "axios";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState("fsf");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=8802a8cd178d628a544af3c62782302a",
        formData
      );
      setDocImg(res.data.data.url); 
      console.log("Image URL:", res.data.data.url);  
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      email,
      password,
      experience,
      fees: Number(fees),
      about,
      speciality,
      degree,
      address: JSON.stringify({
        line1: address1,
        line2: address2,
      }),
      imageFile: docImg,
    };

    try {
      // if (!docImg) {
      //   return toast.error("Please upload an image.");
      // }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        doctorData,{ headers: { aToken }}
      );

      if (data.success) {
        toast.success(data.message || "Doctor added successfully!");
        setDocImg('')
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        // setSpeciality('')
        setDegree('')
        
        setFees('')
      } else {
        toast.error(data.message || "Failed to add doctor.");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("An error occurred while adding the doctor.");
    }
  };

  return (
    <form className="m-4 w-full" onSubmit={handleSubmit}>
      <p className="text-lg font-medium mb-3">Add Doctor</p>
      <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
        {/* Upload Section */}
        <div className="flex gap-4 mb-8 text-gray-50 items-center">
          <label htmlFor="doc-img">
            <img
              src={docImg || assets.upload_area}
              alt="Upload area"
              className="w-16 h-16 bg-gray-500 rounded-full cursor-pointer"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={handleImageUpload} />
          <p className="text-sm text-gray-600 mt-2">Upload doctor picture</p>
        </div>

        {/* Main Form Section */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* First Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Email</p>
              <input
                type="email"
                placeholder="Doctor Email"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Password</p>
              <input
                type="password"
                placeholder="Doctor Password"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Experience</p>
              <select
                required
                className="w-full bg-white p-2 border border-gray-300 rounded"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Fees</p>
              <input
                type="number"
                placeholder="Doctor Fees"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Speciality</p>
              <select
                required
                className="w-full bg-white p-2 border border-gray-300 rounded"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Education</p>
              <input
                type="text"
                placeholder="Doctor Education"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Doctor Address</p>
              <input
                type="text"
                placeholder="Doctor Address 1"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Doctor Address 2"
                required
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Textarea Section */}
        <div>
          <p className="text-sm font-semibold">About Doctor</p>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            required
            className="w-full p-2 border border-gray-300 rounded"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
