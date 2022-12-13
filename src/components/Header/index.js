import React from 'react';
import NavBar from '../NavBar';
import './Header.css';


const Logo = () => {
    return <img className='logo' src='/Images/logo.svg' alt='logo'  />
}

const Header = () => {
    return(
        <header className='header'>
            <Logo />
            <NavBar />
        </header>
    )
}

export default Header;