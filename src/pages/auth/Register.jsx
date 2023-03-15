import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { register } from '../../actions/users';
import { Jumbotron } from '../../components/cards';
import { useAuth } from '../../context/auth';

const Register = () => {

  const user = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: 'raul',
    email: 'raulgust@gmail.com',
    password: '123456'
  });

  const { name, email, password } = form;

  const handleInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    register(name, email, password, navigate, user)
 
  }


  return (
    <div>
      <Jumbotron title="Register" />

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <input
                type="text"
                className='form-control m-4 p-2'
                name='name'
                value={name || ''}
                onChange={handleInputChange}
                autoFocus
                placeholder='Your name'
              />

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

export default Register