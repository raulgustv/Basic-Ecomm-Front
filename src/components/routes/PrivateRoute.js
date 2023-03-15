import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
//import axios from 'axios';
import { useAuth } from '../../context/auth';
import Loading from '../nav/Loading';

const PrivateRoute = () => {

    const [auth] = useAuth();
    const [ok, setOk] = useState(false);

    //console.log(auth)

    // useEffect(() =>{
    //     const authCheck = async() =>{
    //         const {data} = await axios.get(`${process.env.REACT_APP_API}/auth-check`,{
    //             headers: {
    //                 Authorization: auth?.token
    //             }
    //         });

    //         if(data.ok){
    //             setOk(true)
    //         }else{
    //             setOk(false)
    //         }
    //     };
    //     authCheck();
    // }, [auth?.token])

    useEffect(() =>{
        if(auth?.token){
            setOk(true)
        }else{
            setOk(false)
        }
    }, [auth?.token]);
    
  return ok ? <Outlet /> : <Loading />
}

export default PrivateRoute;