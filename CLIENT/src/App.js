import { Routes, Route, Link } from 'react-router-dom';
import "./App.css"

import "bootstrap/dist/css/bootstrap.min.css"

import Login from './components/login';
import Menu from "./components/menu";
import Home from './components/home';
import Customers from './components/customers';
import AuthUser from './components/login/AuthUser';

function App() {

  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Login />
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-4 col-lg-2">
        <Menu />
      </div>
        <div className="col-sm-12 col-md-8 col-lg-10 box">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
