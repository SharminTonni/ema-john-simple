import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
     const [show, setShow] = useState(false);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';



    const handleSignIn =(e)=>{
        e.preventDefault();
        const form = e.target;
        const email= form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(err=>{
            setError(err.message);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>

            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Your Email' id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? 'text' : 'password'} name="password" placeholder='Your password' id="" required />
                    <p onClick={()=>setShow(!show)}><small>
                            {
                                show ? 'hide password' : 'show password'
                            }
                        
                        </small></p>
                </div>

                <input className='btn-submit' type="submit" value="Login" />


            </form>

            <p style={{textAlign:'center'}}><small>New to Amazon? <Link to="/signup">Please Sign Up</Link></small></p>
        </div>
    );
};

export default Login;