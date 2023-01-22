import { Search as SearchIcon } from '@mui/icons-material';
import React from 'react';
import { useData } from '../../context/DataContext';
import './Navbar.scss';
export const Navbar = () => {
  const {onFilterUser } = useData();
  return (
    <nav className='navbar'>
      <div className='title'>
        <h1>Adminzz.</h1>
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='Search by Name, Email, Role' onChange={onFilterUser} />
        <SearchIcon className='search-icon' />
      </div>
    </nav>
  );
};
