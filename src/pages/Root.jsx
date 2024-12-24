import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Root = () => {
    const navigate = useNavigate();

    useEffect(() => {

        navigate('/admin-dashboard')

    } 
     ,[])

    return (
        <div>
            df
        </div>
    );
};

export default Root;