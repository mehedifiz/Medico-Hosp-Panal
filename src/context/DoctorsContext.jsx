import { createContext, useState } from "react";

export const DoctorContext = createContext();

const backendUrl= import.meta.env.VITE_BACKEND_URL;



const DoctorContextProvider = (props) => {



  const [DToken , setDToken] = useState(localStorage.getItem("DToken") ? localStorage.getItem("DToken") : "")

  const value = {
    DToken ,setDToken
  };

  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
