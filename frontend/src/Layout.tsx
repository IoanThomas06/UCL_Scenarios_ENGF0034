import { useState } from 'react'
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css"


interface LayoutProps {
    children?: React.ReactNode;
  }

function Layout({ children }: LayoutProps) {
    return (
      <>
        <Navbar />
        <div className = "content">
            {children}
        </div>
        <Footer />
      </>
    );
  }
export default Layout;
