// // src/components/UserTable/ExportData.js
// import React from 'react';

// const ExportData = ({ users }) => {
//   // Generate CSV data from users array
//   const generateCSV = () => {
//     const headers = ['First Name', 'Last Name', 'Address', 'Company', 'Telephone'];
//     const csvRows = [
//       headers.join(','), // Header row
//       ...users.map(user => [
//         `"${user.firstName}"`,
//         `"${user.lastName}"`,
//         `"${user.address}"`,
//         `"${user.company}"`,
//         `"${user.telephone}"`
//       ].join(','))
//     ];
    
//     return csvRows.join('\n');
//   };

//   // Export users as CSV
//   const exportCSV = () => {
//     const csvData = generateCSV();
//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Export users as JSON
//   const exportJSON = () => {
//     const data = JSON.stringify(users, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.json`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="export-container">
//       <h3>Export Data</h3>
//       <div className="export-buttons">
//         <button 
//           className="export-button csv"
//           onClick={exportCSV}
//           disabled={users.length === 0}
//         >
//           Export as CSV
//         </button>
//         <button 
//           className="export-button json"
//           onClick={exportJSON}
//           disabled={users.length === 0}
//         >
//           Export as JSON
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExportData;


// import React, { useState } from 'react';

// const ExportData = ({ users }) => {
//   // State to control the format selection dropdown visibility
//   const [showFormatOptions, setShowFormatOptions] = useState(false);
  
//   // Generate CSV data from users array
//   const generateCSV = () => {
//     const headers = ['First Name', 'Last Name', 'Address', 'Company', 'Telephone'];
//     const csvRows = [
//       headers.join(','), // Header row
//       ...users.map(user => [
//         `"${user.firstName}"`,
//         `"${user.lastName}"`,
//         `"${user.address}"`,
//         `"${user.company}"`,
//         `"${user.telephone}"`
//       ].join(','))
//     ];
    
//     return csvRows.join('\n');
//   };

//   // Export users as CSV
//   const exportCSV = () => {
//     const csvData = generateCSV();
//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     // Hide format options after export
//     setShowFormatOptions(false);
//   };

//   // Export users as JSON
//   const exportJSON = () => {
//     const data = JSON.stringify(users, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.json`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     // Hide format options after export
//     setShowFormatOptions(false);
//   };

//   // Toggle format selection dropdown
//   const toggleFormatOptions = () => {
//     setShowFormatOptions(!showFormatOptions);
//   };

//   return (
//     <div className="export-container">
//       <h3>Export Data</h3>
//       <div className="export-dropdown">
//         <button
//           className="export-button"
//           onClick={toggleFormatOptions}
//           disabled={users.length === 0}
//         >
//           Export Data
//         </button>
        
//         {showFormatOptions && (
//           <div className="format-options">
//             <button 
//               className="format-option csv"
//               onClick={exportCSV}
//             >
//               CSV Format
//             </button>
//             <button 
//               className="format-option json"
//               onClick={exportJSON}
//             >
//               JSON Format
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExportData;


import React, { useState, useRef, useEffect } from 'react';
import '../../styles/styles.css';

const ExportData = ({ users }) => {
  // State to control the format selection dropdown visibility
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFormatOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Generate CSV data from users array
  const generateCSV = () => {
    const headers = ['First Name', 'Last Name', 'Address', 'Company', 'Telephone'];
    const csvRows = [
      headers.join(','), // Header row
      ...users.map(user => [
        `"${user.firstName}"`,
        `"${user.lastName}"`,
        `"${user.address}"`,
        `"${user.company}"`,
        `"${user.telephone}"`
      ].join(','))
    ];
    
    return csvRows.join('\n');
  };

  // Export users as CSV
  const exportCSV = () => {
    const csvData = generateCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Hide format options after export
    setShowFormatOptions(false);
  };

  // Export users as JSON
  const exportJSON = () => {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `user_data_${new Date().toLocaleDateString()}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Hide format options after export
    setShowFormatOptions(false);
  };

  // Toggle format selection dropdown
  const toggleFormatOptions = () => {
    setShowFormatOptions(!showFormatOptions);
  };

  return (
    <div className="export-container">
      <h3 className="export-title">Export Data</h3>
      <div className="export-dropdown" ref={dropdownRef}>
        <button
          className={`export-button ${users.length === 0 ? 'disabled' : ''}`}
          onClick={toggleFormatOptions}
          disabled={users.length === 0}
        >
          <span className="export-icon">📤</span>
          Export Data
          <span className="dropdown-arrow">{showFormatOptions ? '▲' : '▼'}</span>
        </button>
        
        {showFormatOptions && (
          <div className="format-options-container">
            <div className="format-options">
              <button 
                className="format-option csv"
                onClick={exportCSV}
              >
                <span className="format-icon">📄</span>
                CSV Format
              </button>
              <button 
                className="format-option json"
                onClick={exportJSON}
              >
                <span className="format-icon">{ }</span>
                JSON Format
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportData;