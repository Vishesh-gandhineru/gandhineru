"use client"

import { WORDPRESS_JWT_AUTH_TOKEN } from '@/app/utils/constants/endpoints';
import axios from 'axios';
import React, { useState } from 'react'

const LoginForm = () => {

    const initialUserLogin = {
        username : "",
        password : ""
    };

    const [userData , setUserData]= useState(initialUserLogin);

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const {username , password} = userData;
    axios.post(WORDPRESS_JWT_AUTH_TOKEN , {
        "username" : username,
        "password" : password
    }).then(res => {
        
        if (res.status === 200 ) {
            localStorage.setItem('user' , JSON.stringify(res.data))
        }

    }).catch(err => {
        console.log("login error" , err)
    }) 
  }

  const handleChange = (event)=> {

    setUserData(perv => {
        return {
            ...perv , 
            [event.target.name] : event.target.value ,
        }
    })
  }



  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username / Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        name='username'
        onChange={handleChange}
        placeholder="Username/ Email"
      />
    </div>
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        name='password'
        onChange={handleChange}
        placeholder="******************"
      />      
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login In
      </button>
      </div>
  </form>
  )
}

export default LoginForm