import axios from 'axios';
import toast from 'react-hot-toast';

export const register = async (name, email, password, navigate, user) => {

    console.log(user)
    const [auth, setAuth] = user;

    try {
        const {data} = await axios.post(`/register`, {
            name,
            email,
            password
        });

        if(data?.error){
            return toast.error(data.error)
        }

        toast.success('Registration complete');

        localStorage.setItem('auth', JSON.stringify(data))

        setAuth({
            ...auth,
            token: data.token,
            user: data.user
        });

        navigate('/')

        console.log(data)
    } catch (error) {
        console.log(error);
    }

}

export const login = async(email, password, navigate, user, location) =>{   

    //console.log(user)
    const [auth, setAuth] = user;

    try {
        const {data} = await axios.post(`/login`, {
            email,
            password
        });

        if(data?.error){
            return toast.error(data?.error)
        }

        localStorage.setItem('auth', JSON.stringify(data))

        setAuth({
            ...auth,
            token: data.token,
            user: data.user
        });

        navigate(location.state || (data?.user?.role === 1 ? `/dashboard/admin` : '/'))
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (values) =>{
    try {

        const {data} = await axios.put('/profile', values);

        return data;        
        
    } catch (error) {
        console.log(error)
    }
}