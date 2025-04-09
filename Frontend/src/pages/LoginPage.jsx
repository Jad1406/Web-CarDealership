import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import '../css/loginPage.css'
import { Link,Navigate,useNavigate } from 'react-router-dom'



const LoginPage = () => {

  //Creating constant using useState to get the data later
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  //Getting the data is valid
  function handleSubmit(e){
    e.preventDefault();
    console.log("Username= " + username);
    console.log("Password= "+ password);

    submitData();
  }

  const submitData = async()=>{
    const formData={
      username: username,
      user_password: password
    }

    let result = await fetch('http://localhost:9000/api/users/login',{
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type' : 'application/json'
      }
    })

    result = await result.json();

    if (result.message == 'Invalid username or password') {
      alert('Username or password is invalid');
    }

    if (result.message == 'Logged in successfully') {
      alert('logged in successfully');
      localStorage.setItem('user_id', result.user_id);
      localStorage.setItem('username', result.username);
      navigate('/');
    }

    if (result.message == 'Logged in as admin') {
      alert('logged in successfully');
      localStorage.setItem('user_id', result.user_id);
      localStorage.setItem('username', result.username);
      navigate('/');
    }
  }
  
  
  
  return (
    <div id='container' className="container flex flex-column justify-center items-center bg-slate-300 min-w-full min-h-screen">

      <div className='w-4/12 rounded-lg shadow-sky-800 h-auto p-6 bg-white relative overflow-hidden'>
        <Link to={'/'}><button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back"><svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" class="stroke-blue-300"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path></svg></button></Link>
        
        <form action="" className='flex flex-col justify-between m-auto w-full mt-4 space-y-14'>

          <div class="flex flex-col justify-center items-center space-y-2">
            <h2 class="text-2xl font-medium text-slate-700">Login</h2>
            <p class="text-slate-500">Welcome Back!</p>
          </div>

          <div id="inputs" className='space-y-3'>
            <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Email or Username" type="text" onChange={(e) =>{setUsername(e.target.value)}}/>
            <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Password" type="password" onChange={(e) =>{setPassword(e.target.value)}}/>
            <p className='hover:underline hover:text-sky-400'><Link to={'/Recover_Account'}>Forgot password?</Link></p>
          </div>

          

          <div id="bottomPart" className='flex flex-row justify-between items-center'>
            <p className='hover:text-blue-500 text-sky-700 hover:underline'>No account? <Link to={'/Signin_Page'}>Create One!</Link></p>
            <button className='w-2/5 justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2' type='Submit' onClick={handleSubmit}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
