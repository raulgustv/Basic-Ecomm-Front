import { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { login } from '../../actions/users';

import { Jumbotron } from '../../components/cards';
import { useAuth } from '../../context/auth';

const Login = () => {
 
  const navigate = useNavigate();
  const location = useLocation();

  //auth context
  const user = useAuth();

  const [form, setForm] = useState({
    email: 'raulgust@gmail.com',
    password: '123456'
  });

  const { email, password } = form;
  

  const handleInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    login(email, password, navigate, user, location)
  }


  return (
    <div>
      <Jumbotron title="Login" />

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 offset-md-4">   

              <input
                type="email"
                className='form-control m-4 p-2'
                name='email'
                value={email}
                onChange={handleInputChange}
                placeholder='Your email'
              />

              <input
                type="password"
                className='form-control m-4 p-2'
                name='password'
                value={password}
                onChange={handleInputChange}
                placeholder='Your password'
              />

              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login