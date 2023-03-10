import React,{useState} from 'react'
import googleLogo from '../assets/google.png'
import googleLogo2 from '../assets/google(2).png'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { loginFailed, loginStart, loginSuccess } from '../redux/user/CurrentUserSlice'
import {useNavigate } from 'react-router-dom'
import {auth, provider} from '../firebase.js'
import { signInWithPopup } from 'firebase/auth'

export default function SignupCard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user , setUser] = useState({
    email: "",
    password: ""
  })
  const [signup, setSignup] = useState({
    email: "",
    name: "",
    password: ""
  })
  const [hover, sethover] = useState(false)

  function handleGoogleLogo(){
    const defaultGoogle = document.getElementById('default-google');
    const hoverGoogle = document.getElementById('hover-google');
    if(!hover){
      defaultGoogle.classList.add('hidden');
      hoverGoogle.classList.remove('hidden');
      sethover(true)
    }else{
      defaultGoogle.classList.remove('hidden');
      hoverGoogle.classList.add('hidden');
      sethover(false)
    }
    
  }
  //getting value of signup
  function getValueSignUp(){
    let email_value = document.getElementById('emailSignup').value;
    let name_value = document.getElementById('nameSignup').value;
    let password_value = document.getElementById('passwordSignup').value;
    setSignup({
      email: email_value,
      name: name_value,
      password: password_value
    })
    console.log(signup)
  }

  //getting the input values
  function getValue(){
    let email_value = document.getElementById('email').value;
    let password_value = document.getElementById('password').value;
    setUser({
      email: email_value,
      password: password_value
    })
    console.log(user)
  }

  //signup
  const handleSignup = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: "https://my-tube-server-git-master-syed-urwah.vercel.app/api/auth/signup",
        data: signup
      })
      console.log(response.data);
      setSignup("")
      alert("Now login")
    } catch (err) {
      console.log(err.response.data.message)
      setError(err.response.data.message)
      alert(error)
    }
    
  }

  //login
  async function handleLogin(e){
    e.preventDefault();
    dispatch(loginStart())
    try {
    const response = await axios({
      method: 'post',
      url: 'https://my-tube-server-git-master-syed-urwah.vercel.app/api/auth/login',
      headers: {
        'Content-Type':  'application/json'
      },
      credentials: 'include', 
      data: JSON.stringify(user)
    });

    let data = await response.data
    localStorage.setItem('auth-token', data.token)
    console.log(data)

     dispatch(loginSuccess(response.data.user));
     navigate('/');

    } catch (error) {
      dispatch(loginFailed(error.response.data))
    }
    
  }

  const handleGoogleLogin = async (e) =>{
      e.preventDefault()
      try {
        const googleResponse = await signInWithPopup(auth, provider);
        console.log(googleResponse.user)
        dispatch(loginStart())
        const res = await axios.post('https://my-tube-server-git-master-syed-urwah.vercel.app/api/auth/google', {
          name: googleResponse.user.displayName,
          email: googleResponse.user.email,
          img: googleResponse.user.photoURL
        })
        console.log(res);
        let data = await res.data
        localStorage.setItem('auth-token', data.token)
        dispatch(loginSuccess(data.user))
        navigate('/')
      } catch (error) {
        dispatch(loginFailed(error))
      }
     
  }

 

  return (

    <section className='bg-bg-main text-white min-h-[calc(100vh-64px)] mx-auto'>
        <form className='w-full flex flex-col justify-center items-center gap-3 pt-10'>
            <h2 className='text-4xl font-semibold'>Sign Up</h2>
            <button onClick={handleGoogleLogin} onMouseLeave={handleGoogleLogo} onMouseEnter={handleGoogleLogo} className='flex items-center border-2 border-solid border-[#30303d] rounded-xl py-2 gap-4 w-80 justify-center hover:bg-white hover:text-black'>
              <img id='hover-google' className='w-4 h-4 hidden' src={googleLogo2} alt="" /><img id='default-google' className='w-4 h-4' src={googleLogo} alt="" /><p>Continue with Google</p>
            </button>
            <hr className='border-y-white border-solid w-72 border-[0.5px]' />
            <div className="inputs flex flex-col gap-3">
              <input onChange={getValueSignUp} className='border-2 border-solid border-[#30303d] rounded-xl w-80 py-2 bg-inherit placeholder-white' type="email" placeholder='    Email' id='emailSignup'/>
              <input onChange={getValueSignUp} className='border-2 border-solid border-[#30303d] rounded-xl w-80 py-2 bg-inherit placeholder-white' placeholder='   Name' type="text" name="nameSignup" id="nameSignup" />
              <input onChange={getValueSignUp} className='border-2 border-solid border-[#30303d] rounded-xl w-80 py-2 bg-inherit placeholder-white' placeholder='   Password' type="password" name="passwordSignup" id="passwordSignup" />
            </div>
            <button onClick={handleSignup} className='border-2 border-solid border-[#30303d] rounded-xl py-2 gap-4 w-80 justify-center text-[#30303d] hover:text-white bg-yellow-400 hover:bg-red-600'>SignUp</button>
            <p>or</p>
            <h2 className='text-4xl font-semibold'>Sign In</h2>
            <div className="inputs flex flex-col gap-3">
              <input onChange={getValue} className='border-2 border-solid border-[#30303d] rounded-xl w-80 py-2 bg-inherit placeholder-white' placeholder='   Email' type="email" name="email" id="email" />
              <input onChange={getValue} className='border-2 border-solid border-[#30303d] rounded-xl w-80 py-2 bg-inherit placeholder-white' placeholder='   Password' type="password" name="password" id="password" />
            </div>

            <button onClick={handleLogin} className='border-2 border-solid border-[#30303d] rounded-xl py-2 gap-4 w-80 justify-center text-[#30303d] hover:text-white bg-yellow-400 hover:bg-red-600'>SignIn</button>
           
        </form>
    </section>
  )
}
