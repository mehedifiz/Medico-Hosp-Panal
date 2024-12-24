import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorsContext';
import { AdminContext } from '../context/AdminContext';

const Root = () => {
    const navigate = useNavigate();
      
      const { aToken } = useContext(AdminContext);
    

    useEffect(() => {

      if(aToken){
        navigate('/admin-dashboard')
      } else{
        navigate('/doctor-dashboard')


      }

    } 
     ,[])

    return (
        <div>
            df
        </div>
    );
};

export default Root;