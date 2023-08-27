import React, {useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setAuthState } = useContext(AuthContext)
    let Navigate = useNavigate()

    const login = () => {
        const data = { email: username, password: password }
        axios.post('http://localhost:3001/auth/login', data).then((response) => {
            if(response.data.error){
                alert(response.data.error)
            } else {
                localStorage.setItem('accessToken', response.data.token)
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                    })
                console.log(response.data.username)
                Navigate('/')
            }
        })
    }
  return (
    <div className='loginContainer'>
        <input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value)}}/>
        <input type="password" placeholder="Password..." onChange={(event) => {setPassword(event.target.value)}} />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login