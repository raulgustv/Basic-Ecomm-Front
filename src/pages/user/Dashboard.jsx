import { Jumbotron } from "../../components/cards"
import { UserMenu } from "../../components/nav";
import { useAuth } from "../../context/auth";


const Dashboard = () => {

  const [auth] = useAuth();
  const {user} = auth;

  return (
    <div>
      <Jumbotron title='Dashboard' subtitle={`Welcome ${user.name}`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              User information
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                {user.name}
              </li>

              <li className="list-group-item">
                {user.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard