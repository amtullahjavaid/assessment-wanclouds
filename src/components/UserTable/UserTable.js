import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';
import SearchFilter from './SearchFilter';
import ExportData from './ExportData';

const UserTable = () => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('all');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (searchTerm === '') return true;
      
      const term = searchTerm.toLowerCase();
      
      if (filterField === 'all') {
        return (
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.company.toLowerCase().includes(term) ||
          user.address.toLowerCase().includes(term) ||
          user.telephone.toLowerCase().includes(term)
        );
      }
      
      return user[filterField].toLowerCase().includes(term);
    });
  }, [users, searchTerm, filterField]);

  if (users.length === 0) {
    return <div className="no-users">No users found. Please add users from the form page.</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>User List</h2>
        <ExportData users={users} />
      </div>
      
      <SearchFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterField={filterField}
        onFilterChange={setFilterField}
      />
      
      {filteredUsers.length === 0 ? (
        <div className="no-results">No users match your search criteria</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.address}</td>
                <td>{user.company}</td>
                <td>{user.telephone}</td>
                <td>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="user-count">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
};

export default UserTable;