import { NavLink } from "react-router-dom"

const AdminMenu = () => {
    return (
        <div>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Links</div>

            <ul className="list-group">
                <li>
                    <NavLink className='list-group-item' to='/dashboard/admin/category'>
                        Create Category
                    </NavLink>
                </li>

                <li>
                    <NavLink className='list-group-item' to='/dashboard/admin/product'>
                        Create Product
                    </NavLink>
                </li>

                <li>
                    <NavLink className='list-group-item' to='/dashboard/admin/products'>
                        See all products
                    </NavLink>
                </li>

                <li>
                    <NavLink className='list-group-item' to='/dashboard/admin/orders'>
                        Manage Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AdminMenu