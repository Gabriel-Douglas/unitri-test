import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthUser from './AuthUser'

import './index.css'
import './signin.css'

import { BsFillDoorOpenFill } from "react-icons/bs";

const Login = () => {

    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [hiddenalert, setHiddenalert] = useState(true)
    const [loginmessage, setLoginmessage] = useState('')

    const submitForm = () => {
        http.post('/login', { email: email, password: password }).then((res) => {
            setToken(res.data.user, res.data.access_token);
        })
            .catch(error => {
                setHiddenalert(false)
                setLoginmessage(error.response.data.error)
            })
    }

    return (<div>
        <form className="m-5">
            <div className='card p-4'>
                <Link to="/" className='d-flex align-items-center mb-3 link-dark text-decoration-none'>
                    <BsFillDoorOpenFill size='72' className='mb-1' />
                    <span className="h1">Login</span>
                </Link>

                <div className="form-floating pb-1">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                    <label>Email address</label>
                </div>
                <div className="form-floating pb-5">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="button" onClick={submitForm}>Login</button>
            </div>
        </form>

        <div className="alert alert-danger m-5" role="alert" hidden={hiddenalert}>
            <strong>{loginmessage}</strong>
        </div>
        
    </div>
    )
}

export default Login