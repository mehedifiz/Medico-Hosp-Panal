import { createContext } from "react";

export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  const CalculateAge =(dob)=>{
    console.log(typeof parseInt(dob) )

    const today = new Date();
    const birthDate= new Date(parseInt(dob))
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;

  }
  const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const currency = "$"

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + month[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };
  const value = {
    CalculateAge,
    slotDateFormat,
    currency
  };

  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};

export default AppcontextProvider;
