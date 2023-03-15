import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import SearchForm from '../forms/SearchForm';
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge } from 'antd';


const Menu = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const navigate = useNavigate();

    const { user } = auth;

    const logout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        navigate('/login')
    }

    return (
        <>
            <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
                <li className="nav-item">
                    <NavLink className='nav-link' to='/'>
                        HOME
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className='nav-link' to='/shop'>
                        SHOP
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className='nav-link' to='/cart'>
                        <Badge count={cart?.length >= 1 ? cart?.length : 0} showZero style={{backgroundColor: '#52c41a'}}>
                            <ShoppingCartOutlined style={{
                                fontSize: '20px',
                                color: '#0d6efd'
                                
                            }} />
                        </Badge>
                    </NavLink>
                </li>

                <div className="mt-2">
                    <SearchForm />
                </div>


                {!auth?.user ? (
                    <>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/login'>
                                LOGIN
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/register'>
                                REGISTER
                            </NavLink>
                        </li>
                    </>
                ) : (

                    <div className="dropdown">

                        <li><p className="nav-link pointer dropdown-toggle" data-bs-toggle='dropdown'>
                            {auth?.user?.name}
                        </p>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to={`/dashboard/${user.role === 1 ? 'admin' : ''}`}>
                                        Dashboard
                                    </NavLink>
                                </li>

                                <li className="nav-item pointer">
                                    <p className='nav-link' onClick={logout}>
                                        LOGOUT
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </div>
                )}
            </ul>
        </>
    )
}

export default Menu