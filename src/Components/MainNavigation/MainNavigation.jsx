import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import './mainnavigation.css';

function MainNavigation() {
    return (
        <div className='main-layout'>
            <NavBar />
            <main className='main-content'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default MainNavigation;