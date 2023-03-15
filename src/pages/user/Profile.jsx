import { Jumbotron } from "../../components/cards"
import ProfileForm from "../../components/forms/ProfileForm";
import { UserMenu } from "../../components/nav";
import { useAuth } from "../../context/auth";


const Profile = () => {

  const [auth] = useAuth();
  const {user} = auth;

  return (
    <div>
      <Jumbotron title='Dashboard' subtitle={`Welcome ${user.name}`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu user={user.name} />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              Profile
            </div>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile