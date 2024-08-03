import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ currentUser, onSave, onCancel }) => {
  const [user, setUser] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axios.put(`http://localhost:3001/users/${user.id}`, user)
        .then(() => onSave())
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3001/users', user)
        .then(() => onSave())
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>{user.id ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
