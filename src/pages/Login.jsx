import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorsContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);

  const { setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        console.log("Admin login");
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("DToken", data.token);
          setDToken(data.token);
          console.log(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
 
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border rounded-xl text-stone-700 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto ">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-stone-300 rounded w-full p-2 mt-1"
            type="email"
            name=""
            id=""
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-stone-300 rounded w-full p-2 mt-1"
            type="password"
            name=""
            id=""
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded">
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login ? 
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here 
            </span>
          </p>
        ) : (
          <p>
            Admin Login ? 
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here 
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
