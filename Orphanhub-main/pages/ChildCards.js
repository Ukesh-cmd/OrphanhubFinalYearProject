import React, { useState } from 'react';

const ChildCard = ({ child, onEdit, onDelete }) => (
  <div className="child-card">
    <img src={child.picture} alt={`${child.name}'s Image`} className="child-card-image" />
    <h3 className="child-card-title">{child.name}</h3>
    <p className="child-card-description">Age: {child.age} | Gender: {child.gender}</p>
    <p className="child-card-description">Introduction: {child.introduction}</p>
    <p className="child-card-description">Personality: {child.personality}</p>
    <button className="edit-button" onClick={() => onEdit(child)}>Edit</button>
    <button className="delete-button" onClick={() => onDelete(child)}>Delete</button>
  </div>
);

const ChildCards = () => {
  const [childCards, setChildCards] = useState([
    { name: 'John Doe', age: 8, gender: 'Male', picture: 'john_picture.jpg', introduction: 'I love playing with toys!', personality: 'Playful' },
    { name: 'Jane Smith', age: 6, gender: 'Female', picture: 'jane_picture.jpg', introduction: 'I enjoy drawing and painting.', personality: 'Creative' },
  ]);

  const [editFormData, setEditFormData] = useState({
    name: '',
    age: 0,
    gender: '',
    picture: '',
    introduction: '',
    personality: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddChild = () => {
    const newChild = {
      name: editFormData.name,
      age: editFormData.age,
      gender: editFormData.gender,
      picture: editFormData.picture,
      introduction: editFormData.introduction,
      personality: editFormData.personality,
    };

    setChildCards([...childCards, newChild]);

    setEditFormData({
      name: '',
      age: 0,
      gender: '',
      picture: '',
      introduction: '',
      personality: '',
    });
  };

  const handleEditChild = () => {
    const updatedChildCards = [...childCards];

    if (editFormData.picture instanceof File) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updatedChildCards[editIndex] = { ...editFormData, picture: event.target.result };
        setChildCards(updatedChildCards);
        setIsEditing(false);
        setEditIndex(null);
        setEditFormData({
          name: '',
          age: 0,
          gender: '',
          picture: '',
          introduction: '',
          personality: '',
        });
      };
      reader.readAsDataURL(editFormData.picture);
    } else {
      updatedChildCards[editIndex] = { ...editFormData };
      setChildCards(updatedChildCards);
      setIsEditing(false);
      setEditIndex(null);
      setEditFormData({
        name: '',
        age: 0,
        gender: '',
        picture: '',
        introduction: '',
        personality: '',
      });
    }
  };

  const handleEditClick = (child) => {
    setIsEditing(true);
    setEditIndex(childCards.indexOf(child));

    setEditFormData({
      name: child.name,
      age: child.age,
      gender: child.gender,
      picture: child.picture,
      introduction: child.introduction,
      personality: child.personality,
    });
  };

  const handleDeleteChild = (child) => {
    const updatedChildCards = childCards.filter((c) => c !== child);
    setChildCards(updatedChildCards);
  };

  return (
    <div>
      <section>
        {childCards.map((child, index) => (
          <ChildCard key={index} child={child} onEdit={handleEditClick} onDelete={handleDeleteChild} />
        ))}
      </section>

      <section>
        {isEditing ? (
          <div>
            <h2>Edit Child Card</h2>
            <form id="edit-form" encType="multipart/form-data" onSubmit={handleEditChild}>
              <label htmlFor="edit-name">Name:</label>
              <input type="text" id="edit-name" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} required/>

              <label htmlFor="edit-age">Age:</label>
              <input type="number" id="edit-age" value={editFormData.age} onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })} required/>

              <label htmlFor="edit-gender">Gender:</label>
              <select id="edit-gender" value={editFormData.gender} onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label htmlFor="edit-picture">Child Picture</label>
              <input type="file" id="edit-picture" name="picture" accept="image/*" capture="user" required onChange={(e) => setEditFormData({ ...editFormData, picture: e.target.files[0] })}/>

              <label htmlFor="edit-introduction">Introduction:</label>
              <textarea id="edit-introduction" value={editFormData.introduction} onChange={(e) => setEditFormData({ ...editFormData, introduction: e.target.value })} required></textarea>

              <label htmlFor="edit-personality">Personality:</label>
              <textarea id="edit-personality" value={editFormData.personality} onChange={(e) => setEditFormData({ ...editFormData, personality: e.target.value })} required></textarea>

              <button type="button" id="edit-cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" id="edit-submit-button">Save Changes</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Add Child Card</h2>
            <form id="add-child-form" encType="multipart/form-data" onSubmit={handleAddChild}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} required/>

              <label htmlFor="age">Age:</label>
              <input type="number" id="age" value={editFormData.age} onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })} required/>

              <label htmlFor="gender">Gender:</label>
              <select id="gender" value={editFormData.gender} onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label htmlFor="picture">Child Picture</label>
              <input type="file" id="picture" name="picture" accept="image/*" capture="user" required onChange={(e) => setEditFormData({ ...editFormData, picture: e.target.files[0] })}/>

              <label htmlFor="introduction">Introduction:</label>
              <textarea id="introduction" value={editFormData.introduction} onChange={(e) => setEditFormData({ ...editFormData, introduction: e.target.value })} required/>

              <label htmlFor="personality">Personality:</label>
              <textarea id="personality" value={editFormData.personality} onChange={(e) => setEditFormData({ ...editFormData, personality: e.target.value })} required/>

              <button type="submit">Add</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChildCards;