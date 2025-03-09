import { useState } from 'react'
import './App.css'
import Layout from './Layout'


function Home() {

  return (
    <>
        <Layout>
            <h1> UCL Book Exchange </h1>
            <p> UCL Book Exchange is the best way for UCL students to exchange pre-owned boooks</p>
            <br></br>
            <div className = "library">
                <img src="ucl_library.jpg" alt="book exchange" />
            </div>

        </Layout>  
    </>
  )
}

export default Home;
