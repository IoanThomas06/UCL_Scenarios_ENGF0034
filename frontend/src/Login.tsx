import { useState } from 'react'
import './App.css'
import Layout from './Layout'


function Login() {

  return (
    <>
        <Layout>
            <h1> Login</h1>
            <br></br>
            <div className = "library">
                <img src="ucl_library.jpg" alt="book exchange" />
            </div>
        </Layout>  
    </>
  )
}

export default Login;