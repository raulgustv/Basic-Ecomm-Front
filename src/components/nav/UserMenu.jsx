import { NavLink } from "react-router-dom"

const AdminMenu = () => {


    return (
        <div>
            <div className="p-3 mt-2 mb-2 h4 bg-light">User Menu</div>

            <ul className="list-group">
                <li>
                    <NavLink className='list-group-item' to='/dashboard/user/profile'>
                        Update Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink className='list-group-item' to='/dashboard/user/orders'>
                        Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AdminMenu