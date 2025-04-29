// import React from 'react';

// const Header = () => {
//   return (
//     <header className="header">
//       <h1>User Management System</h1>
//     </header>
//   );
// };

// export default Header;


// src/components/Layout/Header.js
import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  return (
    <header className="header">
      <h1>User Management System</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;