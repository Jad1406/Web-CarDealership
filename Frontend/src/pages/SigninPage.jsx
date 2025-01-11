import React, { useState } from 'react'
import '../css/signinPage.css'
import { Link, useNavigate  } from 'react-router-dom'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SigninPage = () => {

  const [formUsername, setFromUsername] = useState("");
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPhoneNumber, setFormPhoneNumber] = useState(0);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordCheck, setFormPasswordCheck] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (formPassword != formPasswordCheck) {
      console.log("Different Passwords");
    }else{
      submitData()
    }

    console.log("Username is: " + formUsername);
    console.log("First name is: " + formFirstName);
    console.log("Last name is: " + formLastName);
    console.log("Phone number is: " + formPhoneNumber);
    console.log("Email is: " + formEmail);
    console.log("Password is: " + formPassword);
    
  }

  const submitData=async ()=>{
        const formData = {
        first_name: formFirstName,
        last_name: formLastName,
        username: formUsername,
        user_email: formEmail,
        user_password: formPassword,
        user_phone: formPhoneNumber
      }
      console.log("Form Data: ", formData);


      try{

        let result = await fetch('http://localhost:9000/api/users',{   
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-type' : 'application/json'
          }
        })
        result = await result.json();
      
        if (result.message == 'Email already exists') {
          alert('Use another email')
        } else if (result.message == 'Database error') {
          alert("Make sure you're using a valid email address")
        }else if (result.message == 'Username already in use') {
          alert('Username already taken')
        }else{
          alert('User has been created successfully')
          localStorage.setItem('user_id', result.user_id);
          localStorage.setItem('username', result.username);
          navigate('/')
        }
      } catch (error) {
        
      }
  }

  return (
      <div id='container' className="container flex flex-column justify-center items-center bg-slate-300 min-w-full min-h-screen">
      
            <div className='w-4/12 rounded-lg shadow-sky-800 h-auto p-6 bg-white relative overflow-hidden'>
              <Link to={'/'}><button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back"><svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" class="stroke-blue-300"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path></svg></button></Link>
              
              <form action="" onSubmit={handleSubmit}  className='flex flex-col justify-between m-auto w-full mt-4 space-y-10'>
      
                <div class="flex flex-col justify-center items-center space-y-2">
                  <h2 class="text-2xl font-medium text-slate-700">Sign Up</h2>
                  <p class="text-slate-500">Join Us Today!</p>
                </div>
      
                <div id="inputs" className='space-y-3'>
                  <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Username" type="text" onBlur={(e) =>{setFromUsername(e.target.value)}}/>

                  <div id="firstAndLastName" className='flex flex-row justify-between gap-4'>
                    <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="First name" type="text" onBlur={(e) =>{setFormFirstName(e.target.value)}}/>
                    <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Last name" type="text" onBlur={(e) =>{setFormLastName(e.target.value)}}/>
                  </div>

                  <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Phone Number" type="integer" onBlur={(e) =>{setFormPhoneNumber(e.target.value)}}/>
                  <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Email or Username" type="text" onBlur={(e) =>{setFormEmail(e.target.value)}}/>
                  <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Password" type="password" onBlur={(e) =>{setFormPassword(e.target.value)}}/>
                  <input className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="text" required placeholder="Re-enter Password" type="password" onBlur={(e) =>{setFormPasswordCheck(e.target.value)}}/>
                </div>
      
                
      
                <div id="bottomPart" className='flex flex-row justify-between items-center'>
                  <p className='hover:text-blue-500 text-sky-700 hover:underline'>Have an account? <Link to={'/login_Page'}>Log in!</Link></p>
                  <button className='w-2/5 justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2' type='Submit'>Create Account</button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default SigninPage
