import {useState} from 'react';

export default function RegisterPage(){
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');

    const onRegister=async (e)=>{
        e.preventDefault();
        const res = await fetch('http://localhost:4001/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        })
        if(res.status===200){
            alert('Registration Successful!');
        }else{
            alert('Unsuccessful Registration. Try again later!!');
        }
    }

    return(
        <div className='register login'>
            <h1>Register Page</h1>
            <form className='register-content' onSubmit={onRegister}>
                <div className='input-field-container'>
                <label htmlFor='username'>UserName</label>
                <input id='username' placeholder='Enter UserName' type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className='input-field-container'>
                <label htmlFor='password'>Password</label>
                <input id="password" placeholder='Enter Password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button type="submit">Register</button>
            </form>
            <a href='/'>Return Home</a>
        </div>
    )
}