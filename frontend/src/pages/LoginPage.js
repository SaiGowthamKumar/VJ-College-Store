import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';

export default function LoginPage(){
    const [username,setUserName]=useState('');
    const navigate = useNavigate();
    const [password,setPassword]=useState('');

    const onLogin=async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4001/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        if(response.ok){
            //console.log(response);
            localStorage.setItem("user","loggedIn");
            navigate("/");
        }else{
            alert('wrong credentials');
        }
    }

    return(
        <div className='register login'>
            <h1>Login Page</h1>
            <form onSubmit={onLogin} className='register-content'>
                <div className='input-field-container'>
                <label htmlFor='username'>UserName</label>
                <input id='username' placeholder='Enter UserName' type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className='input-field-container'>
                <label htmlFor='password'>Password</label>
                <input id="password" placeholder='Enter Password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button type='submit'>Login</button>
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}