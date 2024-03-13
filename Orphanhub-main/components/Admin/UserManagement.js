// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../util/constant';

const UserManagement = () => {

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    userManage();
  },[])

  const userManage = async() =>{
    try{
      const result = await axios(`${baseURL}/user/get `);
      console.log(result.data);
      setUserData(result.data);
    }catch(err){
      console.log("fetch error");
    }
  }
  // Dummy data
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user' },
    { id: 2, username: 'jane_doe', email: 'jane@example.com', role: 'user' },
  
  ]);

  const handleViewDetails = (user) => {
    console.log('View Details:', user);
  };

  const handleEditUser = (user) => {
    console.log('Edit User:', user);
  };

  const handleDeleteUser = (user) => {
    console.log('Delete User:', user);
  };

  return (
    <section className="user-management">
      <h3>User Management</h3>

      <table className="dashboard-table">
        <thead>
          <tr>
          <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
        {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name} </td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button type="button" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
              </td>
              <td>
                <button type="button" onClick={() => handleDeleteUser(user)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleViewDetails(user)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserManagement;
