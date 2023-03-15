import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Loading from '../nav/Loading';

const AdminRoute = () => {

    const [auth] = useAuth();
    const {user} = auth; 
    const [ok, setOk] = useState(false);

    //console.log(user)

    useEffect(() =>{
        if(auth?.token && user?.role === 1){
            setOk(true)
        }else{
            setOk(false)
        }
    }, [auth?.token, user?.role]);
    
  return ok ? <Outlet /> : <Loading />
}

export default AdminRoute;