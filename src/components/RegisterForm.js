import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import './RegisterForm.css';
import AuthContext from '../store/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [userData, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        date: dayjs('2014-08-18T21:11:54'),
        phoneNumber: ''
    });

    const handleDateChange = (newValue) => {
        setUser({ ...userData, ["date"]: newValue })
    };

    const handleChange = (event) => {
        setUser({ ...userData, [event.target.name]: event.target.value })
    }

    const updateUser = async () => {
        const url = `http://localhost:8080/updateDetails`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const user = await response.json();
                console.log("details updated");
                authCtx.login(user.accessToken);
                alert('User details updated');
                return user;
            }
            else {
                alert(response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }


    const Signup = async () => {
        const url = `http://localhost:8080/signup`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const user = await response.json();
                console.log("signed up!");
                authCtx.login(user.accessToken);
                alert('User signed In');
                navigate('/login');
                return user;
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
        console.log(userData);

        if (authCtx.isLoggedIn) {
            const user = await Signup();
            console.log(user);
            setUser({
                name: '',
                email: '',
                username: '',
                password: '',
                date: dayjs('2014-08-18T21:11:54'),
                phoneNumber: ''
            });
        }

        else {
            const user = updateUser();
            console.log(user);
        }
    }

    return (
        <div className="container">
            <div className="register-header">
                <h1>Register Form</h1>
                <h4>Please enter your details</h4>
            </div>
            <form onSubmit={handleSubmit} className="register-details">
                <TextField id="outlined-basic" label="Full Name" variant="outlined" name="name" value={userData.name} onChange={handleChange} required />
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} required />
                <TextField id="outlined-basic" label="Email" variant="outlined" required name="email" value={userData.email} onChange={handleChange} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker name="date" label="Date" inputFormat="MM/DD/YYYY" value={userData.date} onChange={handleDateChange} renderInput={(params) => <TextField {...params} />} required />
                </LocalizationProvider>
                <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={userData.username} onChange={handleChange} required disabled={authCtx.isLoggedIn} />
                <TextField id="outlined-basic" label="Password" variant="outlined" name="password" value={userData.password} onChange={handleChange} required />
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default RegisterForm;