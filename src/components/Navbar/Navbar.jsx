import { Search as SearchIcon } from '@mui/icons-material';
import React from 'react';
import './Navbar.scss';
export const Navbar = ({ handleFilter }) => {
  return (
    <nav className='navbar'>
      <div className='title'>
        <h1>Adminzz.</h1>
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='Search by Name, Email, Role' onChange={handleFilter} />
        <SearchIcon className='search-icon' />
      </div>
    </nav>
  );
};
