import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";


const Loading = () => {

    const [count, setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();

    //console.log(location)

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000);

        //redirect
        count === 0 && navigate('/login', {
            state: location.pathname
        });

        //cleanup
        return () => {
            clearInterval(interval)
        }
    }, [count, navigate, location.pathname])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">                
                <div className="spinner-border" role="status">
                </div>
                <div className="d-flex justify-content-center align-items-center">Redirecting in... <span>{count}</span></div>
            </div>           

        </>

    )
}

export default Loading