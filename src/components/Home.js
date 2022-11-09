import RegisterForm from './RegisterForm';
import Header from './Header';
import AuthContext from '../store/context';
import { useContext } from 'react';

const Home = () => {
    const authCtx = useContext(AuthContext);
    return (
        <div>
            <Header />
            <RegisterForm />
        </div>
    );
}

export default Home;