import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleLogOut =() =>{
        logOut()
        .then(result=>{}).catch(err =>{console.log(err)})
    }
    return (
        <nav className="header">
            <img src={logo} alt="" />

            <div>
                <Link to="/">Shop</Link> 
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                {
                    user && <span style={{color:'white', marginLeft:'8px'}}>{user.email} <button style={{marginLeft:'8px'}} onClick={handleLogOut}>Sign Out</button> </span>
                }
            </div>
        </nav>
    );
};

export default Header;