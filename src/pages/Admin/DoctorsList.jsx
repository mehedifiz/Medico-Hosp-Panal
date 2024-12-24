import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import Loading from "../../components/Loading";

const DoctorsList = () => {

    const {doctors , getAllDoctors , Changeavailablity,aToken} =useContext(AdminContext)
    
    useEffect( ()=>{
        
       
            getAllDoctors()
            // console.log()
         

    },[aToken])

    if(!doctors){
        return <Loading/>}

    


    return (
        <div className="m-5 max-h-[90vh] overflow-scroll">

            <h1 className="text-lg font-medium ">All Doctors</h1>

            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {
                    doctors.map((item , idx)=>(
                        <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={idx}>
                            <img className="bg-indigo-50 group-hover:bg-primary translate-all duration-500 " src={item.image} alt="" />
                            <div className="p-4">
                                <p  className="text-neutral-800 text-lg font-medium">{item.name}</p>
                                <p className=" text-zinc-600 text-sm">{item.speciality}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    <input onChange={()=> Changeavailablity(item._id)} type="checkbox" checked={item.available} />
                                    <p>Available</p>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>


            
        </div>
    );
};

export default DoctorsList;