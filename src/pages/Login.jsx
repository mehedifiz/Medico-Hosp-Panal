import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
    const [state , setState ] = useState("Admin")
    return (
        <form className="min-h-[80vh] flex items-center">

            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border rounded-xl text-stone-700 text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto "><span className="text-primary">{state}</span> Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input className="border border-stone-300 rounded w-full p-2 mt-1" type="email" name="" id=""  required/>
                </div>
                <div  className="w-full">
                    <p>Password</p>
                    <input  className="border border-stone-300 rounded w-full p-2 mt-1" type="password" name="" id=""  required/>
                </div>
                <button className="bg-primary text-white w-full py-2 rounded">Login</button>
            </div>
            
        </form>
    );
};

export default Login;