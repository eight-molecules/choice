import React from 'react';
import logo from './logo.svg';
import './App.css';
import { children } from 'cheerio/dist/commonjs/api/traversing';

const App = ({ children }) => {
  return (
    <div className='w-full h-full bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200'>
    {children}
    </div>
  );
}

export default App;
