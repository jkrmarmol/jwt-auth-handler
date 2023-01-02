import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login'
// import Register from './components/Register'
// import ProtectedRoutes from './ProtectedRoutes';
// import Products from './components/Products';
// import Dashboard from './components/Dashboard';
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Products = lazy(() => import('./components/Products'));
const NotFound = lazy(() => import('./components/NotFound'))

function App() {

  return (
    <div>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/products' element={<Products />}/>
              </Route>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/*' element={<NotFound />} />
          </Routes>
        </Suspense>
    </div>
  )
}

export default App
