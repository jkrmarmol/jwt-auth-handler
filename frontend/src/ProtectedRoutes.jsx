import React, {useState, useEffect} from 'react';
import {Outlet, Navigate, useLocation } from 'react-router-dom';
import Loading from './components/Loading';

function ProtectedRoutes() {
  const [valToken, setValToken] = useState();
  const location = useLocation()
  const validateToken = async () => {
    try {
      const validate = await fetch('/api/auth/protected', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (validate.statusText === 'OK') {
        setValToken(validate.statusText)
      }
      if (validate.statusText === 'Unauthorized') {
        setValToken(validate.statusText)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  return (
    valToken === 'Unauthorized' 
      ? <Navigate to='/login' state={{from: location}} replace /> 
      : valToken === 'OK' 
        ? <Outlet /> 
        : null
  )

}

export default ProtectedRoutes