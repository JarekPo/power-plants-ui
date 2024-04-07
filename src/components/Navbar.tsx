import React from 'react';

import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav className='flex flex-row space-x-2 p-1 m-1 items-center'>
      <img src={logo} alt='logo' style={{width: '50px'}} />
      <div className='text-3xl font-bold text-veryDarkGreen'>Power Plants</div>
    </nav>
  );
};

export default Navbar;
