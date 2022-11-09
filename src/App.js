import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import data from "./data";
import { AuthContextProvider } from './store/context';
import AuthContext from '../src/store/context';
import { useContext } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<ProtectedRoute />} ></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
