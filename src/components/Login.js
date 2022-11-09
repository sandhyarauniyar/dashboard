import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';
import './Login.css';
import { useState } from "react";
import AuthContext from '../store/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const Login = async () => {
        const url = `http://localhost:8080/login`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            console.log(response);
            if (response.ok) {
                const user = await response.json();
                console.log("Logged In!");
                console.log(user);
                authCtx.login(user.accessToken);
                alert('User Logged In');
            }
            else {
                alert(response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        console.log(loginData);
        const user = await Login();
        setLoginData({
            username: '',
            password: ''
        });
    }

    return (<div>
        <Header />
        <div className="login-outer">
            <div className="form-header">
                <h1> Login Form</h1>
                <h4>Please enter your login details</h4>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={loginData.username} onChange={handleChange} required />
                <TextField id="outlined-basic" label="Password" variant="outlined" name="password" value={loginData.password} onChange={handleChange} required />
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            {!authCtx.isLoggedIn && <div className="register-link"><a href='/'>Register here</a></div>}
            {authCtx.isLoggedIn && <div className="register-link"><a href='/dashboard'>Dashboard here</a></div>}
        </div>
    </div>);
}

export default Login;