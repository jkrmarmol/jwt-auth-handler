import React, { useState} from 'react'
import { useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({username: '', password: ''});
  const onChangeLogin = ({target}) => {
    const {name, value} = target;
    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const onSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const loginAccount = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });
      if (loginAccount.ok) {
        const loginAcc = await loginAccount.json();
        if (loginAcc.token) {
          navigate('/dashboard');
          localStorage.setItem('token', loginAcc.token)
        } else {
          console.log(loginAcc)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitLogin}>
        <input type='text' name='username' value={login.username} onChange={onChangeLogin}/>
        <br />
        <input type='password' name='password' value={login.password} onChange={onChangeLogin}/>
        <br />
        <input type='submit'/>
      </form>
    </div>
  )
}

export default Login