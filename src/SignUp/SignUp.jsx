import React, { useContext, useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('')
    const {createUser} = useContext(AuthContext)
    const handleSubmit =e=>{
        e.preventDefault(); 

        const form= e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password, confirm);
        setError('');

        if(password !== confirm) {
            setError('Your password did not matched');
             return;
        }

        createUser(email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            form.reset();
        })
        .catch(err =>{
            console.log(err)
            setError(err.message)
        })

    }



    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>

        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Your Email' id="" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Your password' id="" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" name="confirm" placeholder='Your password' id="" required />
            </div>
            <p className='text-error'>{error}</p>
            <input className='btn-submit' type="submit" value="Sign Up" />


        </form>

        <p style={{textAlign:'center'}}><small>Already Have An Account? <Link to="/login">Please Login</Link></small></p>
       
    </div>
    );
};

export default SignUp;