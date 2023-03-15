import { Jumbotron } from "../../components/cards";
import { AdminMenu } from "../../components/nav";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  
  const [auth] = useAuth();
  const {user} = auth;

  //console.log(user)


  return (
    <div>
      <Jumbotron  title='Admin Dashboard' subtitle={`Welcome ${user.name}`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              Admin Information
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                {user.name}
              </li>

              <li className="list-group-item">
                {user.email}
              </li>

              <li className="list-group-item">
                Admin
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard