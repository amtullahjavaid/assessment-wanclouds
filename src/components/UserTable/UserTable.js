// src/components/UserTable/UserTable.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';

const UserTable = () => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  if (users.length === 0) {
    return <div className="no-users">No users found. Please add users from the form page.</div>;
  }

  return (
    <div className="table-container">
      <h2>User List</h2>
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
          {users.map((user) => (
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
    </div>
  );
};

export default UserTable;