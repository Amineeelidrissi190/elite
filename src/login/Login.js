import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import notfound from "../fitness/notfound.png";
import ScrollAnimation from '../ScrollAnimation';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

export default function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [texth, setTexth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const texth1 = "Start your fitness journey now!";
    const interval = setInterval(() => {
      if (texth.length < texth1.length) {
        setTexth((prevTexth) => prevTexth + texth1[prevTexth.length]);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [texth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login', login, { withCredentials: true })
      .then((response) => {
        const token = response.data.token.access_token;
        const user = JSON.stringify(response.data.user);
        console.log(user)
        props.setData(response.data.user);
        navigate('/');
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "you connected successfully",
          showConfirmButton: true,
        });
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          setError("Token has expired. Please login again.");
          Swal.fire({
            icon: 'error',
            title: 'Session expired',
            text: "Token has expired. Please login again.",
            showConfirmButton: true,
          });
          logout();
        } else {
          setLogin({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.log('Error object:', error); // Log the entire error object for debugging
        if (error.response) {
          if (error.response.status === 401) {
            setError('Authentication failed');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Authentication failed',
              showConfirmButton: true,
            });
          } else {
            setError('An error occurred. Please try again.');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred. Please try again.',
              showConfirmButton: true,
            });
          }
        } else if (error.request) {
          console.log('Error request:', error.request); // Log the request made for debugging
          setError('No response received from the server. Please try again.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No response received from the server. Please try again.',
            showConfirmButton: true,
          });
        } else {
          console.log('Error message:', error.message); // Log the error message for debugging
          setError('An unexpected error occurred. Please try again.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            showConfirmButton: true,
          });
        }
      });
  };
  
  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/auth/logout");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <ScrollAnimation>
      <div className='w-full min-h-screen flex md:flex-row flex-col-reverse py-10 items-center justify-center space-x-0'>
        <div className='md:w-1/2 w-full flex items-center  justify-center'>
          <div style={{ animation: 'slideInFromLeft 1s ease-out' }} className='max-w-md w-full bg-gradient-to-b from-red-700 to-black rounded-xl shadow-2xl overflow-hidden p-8 space-y-8'>
            <h2 style={{ animation: 'appear 2s ease-out' }} className='text-center text-2xl font-bold w-full text-white'>{texth}</h2>
            <p style={{ animation: 'appear 3s ease-out' }} className='text-center text-gray-200'>Sign in to your account</p>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='relative'>
                <input
                  placeholder='Email'
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                  }}
                  className='peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-red-700'
                  name='email'
                  type='email'
                  value={login.email}
                  required
                />
                <label
                  className='absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-700 peer-focus:text-sm'
                  htmlFor='email'
                >
                  Email address
                </label>
              </div>
              <div className='relative'>
                <input
                  placeholder='Password'
                  onPaste={(event) => { event.preventDefault(); }}
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value });
                  }}
                  className='peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-red-700'
                  name='password'
                  type='password'
                  value={login.password}
                  required
                />
                <label
                  className='absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-700 peer-focus:text-sm'
                  htmlFor='password'
                >
                  Password
                </label>
              </div>
              <div className='flex items-center justify-between'>
              </div>
              <button className='w-full py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md shadow-lg text-white font-semibold transition duration-200' type='submit'>
                Sign In
              </button>
              {error && <p className="text-red-700 text-center md:text-base text-sm">{error}</p>}
            </form>
            <div className='text-center text-gray-300'>
              Don't have an account? <Link className='text-red-300 hover:underline' to='/join'>Sign up</Link>
            </div>
          </div>
        </div>
        <div className='md:w-2/6 w-1/2'>
          <img src={notfound} alt="Not Found" className='' />
        </div>
      </div>
    </ScrollAnimation>
  );
}
