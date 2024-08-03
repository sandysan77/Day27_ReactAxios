import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  };

  const handleSave = () => {
    setIsEditing(false);
    setCurrentUser(null);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {isEditing ? (
        <UserForm currentUser={currentUser} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <UserList onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
