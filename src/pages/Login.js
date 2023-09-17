import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useContext(AuthContext);
  const { id } = useParams();
  let Navigate = useNavigate();

  useEffect(() => {
    if (id) {
        console.log(`http://localhost:3001/perso/email/${id}`)
      axios.get(`http://localhost:3001/perso/email/${id}`).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // Set the username to the email obtained from the API response
          setUsername(response.data.email); // Change this line
        }
      });
    }
  }, [id]); // Make sure to include id in the dependency array

  const login = () => {
    const data = { email: username, password: password };
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        console.log(response.data.username);
        Navigate('/');
      }
    });
  };

  return (
    <div className='loginContainer'>
      <input
        type='text'
        placeholder='Username...'
        value={username} 
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type='password'
        placeholder='Password...'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
