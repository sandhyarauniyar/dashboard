import Button from '@mui/material/Button';
import './Header.css';
import AuthContext from '../store/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        authCtx.logout();
        alert('user logged out!');
    }

    return (
        <div className="header">
            {authCtx.isLoggedIn && <Button varient="contained" className="btn1" onClick={handleLogout}>Logout</Button>}
            {!authCtx.isLoggedIn && <Button varient="contained" className="btn" onClick={handleLogin}>LogIn</Button>}
        </div>
    )
}

export default Header;