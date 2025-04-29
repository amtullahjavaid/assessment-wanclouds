import React, { useState, useRef, useEffect } from 'react';
import '../../styles/styles.css';

const ExportData = ({ users }) => {
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const dropdownRef = useRef(null);
  
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
  
  const generateCSV = () => {
    const headers = ['First Name', 'Last Name', 'Address', 'Company', 'Telephone'];
    const csvRows = [
      headers.join(','), 
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
    
    setShowFormatOptions(false);
  };

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
    
    setShowFormatOptions(false);
  };

  const toggleFormatOptions = () => {
    setShowFormatOptions(!showFormatOptions);
  };

  return (
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
  );
};

export default ExportData;