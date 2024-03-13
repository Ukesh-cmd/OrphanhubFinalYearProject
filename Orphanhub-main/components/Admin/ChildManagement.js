
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChildCardMaker from '../ChildCardmaker';
import { baseURL } from '../../util/constant';
import moment from 'moment';
const ChildManagement = () => {
  const [childData, setChildData] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    childId: '',
    full_name: '',
    gender: '',
    hobbies: '',
    DOB: '',
    enrol_date: '',
    health: '',
    personality: '',
    image: '',
  });

  useEffect(() => {
    childManage();
  }, []);

  const childManage = async () => {
    try {
      const result = await axios(`${baseURL}/child/get`);
      console.log(result.data);
      setChildData(result.data);
    } catch (err) {
      console.log("fetch error", err);
    }
  };

 

  const handleAddEditChild = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      formDataObj.append('full_name', formData.full_name);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('hobbies', formData.hobbies);
      const DOB = moment(formData.DOB).format('YYYY-MM-DD');
      formDataObj.append('DOB', DOB);

      const enrol_date = moment(formData.enrol_date).format('YYYY-MM-DD');
      formDataObj.append('enrol_date', enrol_date);

      formDataObj.append('healthCondition', formData.healthCondition);
      formDataObj.append('personality', formData.personality);
      formDataObj.append('image', formData.image);

      let updatedData;
      if (formData.childId) {
        await axios.put(`${baseURL}/child/put/${formData.childId}`, formDataObj);
        updatedData = childData.map((c) =>
          c.childId === formData.childId ? { ...c, ...formData } : c
        );
      } else {
        const response = await axios.post(`${baseURL}/child/add`, formDataObj);
        const newChild = { ...formData, childId: response.data.childId };
        updatedData = [...childData, newChild];
      }

      setChildData(updatedData);
      setIsEditModalOpen(false);
      setFormData({
        childId: '',
        full_name: '',
        gender: '',
        hobbies: '',
        DOB: '',
        enrol_date: '',
        health: '',
        personality: '',
        image: '',
      });
    } catch (err) {
      console.error('Error saving child data:', err);
    }
  };
  
  const handleEditChild = (child) => {
    setFormData({ ...child });
    setIsEditModalOpen(true);
  };


  const handleDeleteChild = async (childId) => {
    const del = await axios.delete(`${baseURL}/child/delete/${childId}`);
    if (del.status === 200) {
      console.log("success");
    }
  };

 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };
  const [showBackButton, setShowBackButton] = useState(false);

  const handleViewDetails = (child) => {
    setSelectedChild(child);
    setShowBackButton(true);
  };

  const handleCloseChildCard = () => {
    setSelectedChild(child);
    setShowBackButton(false);
  };


  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <section className="child-management">
      <div className="child-management">
        {selectedChild ? (
          <div>
            <button onClick={() => setSelectedChild(null)}> &#8592;Back</button>
            <ChildCardMaker
              selectedChild={selectedChild}
              onBackButtonClick={() => setSelectedChild(null)}
              calculateAge={calculateAge}
            />
          </div>
        ) : (
          <div>
            <h3>Child Information Management</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Hobbies</th>
                  <th>DOB</th>
                  <th>Enrol Date</th>
                  <th>Age</th>
                  <th>Picture</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {childData.map((child, index) => (
                  <tr key={child.childId}>
                    <td>{index+1}</td>
                    <td>{child.childId}</td>
                    <td>{child.full_name}</td>
                    <td>{child.gender}</td>
                    <td>{child.hobbies}</td>
                    <td>{child.DOB}</td>
                    <td>{child.enrol_date}</td>
                    <td>{calculateAge(child.DOB)}</td>
                    <td>
                      <img src={child.image} alt={`Picture of ${child.name}`} />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleEditChild(child)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteChild(child.childId)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleViewDetails(child)}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button id="addRowBtn" onClick={() => setIsEditModalOpen(true)}>
              Add New Child
            </button>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <div className="edit-modal">
          <form onSubmit={handleAddEditChild} encType="multipart/form-data">
            <label htmlFor="edit-full_name">Name:</label>
            <input
              type="text"
              id="edit-full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            />

            <label htmlFor="edit-gender">Gender:</label>
            <input
              type="text"
              id="edit-gender "
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />

            <label htmlFor="edit-hobbies">Hobbies:</label>
            <input
              type="text"
              id="edit-hobbies"
              value={formData.hobbies}
              onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
            />

            <label htmlFor="edit-dateOfBirth">DOB:</label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD"
              id="edit-dateOfBirth"
              value={formData.DOB}
              onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
            />

            <label htmlFor="edit-enrollDate">Enrol Date:</label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD"
              id="edit-enrollDate"
              value={formData.enrol_date}
              onChange={(e) =>
                setFormData({ ...formData, enrol_date: e.target.value })}
            />

          <label htmlFor="edit-healthCondition">Health Conditions:</label>
                <select
                  id="edit-healthCondition"
                  name="health"
                  value={formData.health}
                  onChange={(e) =>
                    setFormData({ ...formData, health: e.target.value })}
                >
                  <option value="good">Good</option>
                  <option value="other">Other</option>
                </select>
                {formData.health === 'other' && (
                  <input
                    type="text"
                    name="health"
                    placeholder="Enter other health conditions"
                    onChange={(e) =>
                      setFormData({ ...formData, health: e.target.value })}
                  />
                )}

            <label htmlFor="edit-personality">Personality:</label>
            <input
              type="text"
              id="edit-personality"
              value={formData.personality}
              onChange={(e) =>
                setFormData({ ...formData, personality: e.target.value })}
            />

            <label htmlFor="edit-picture">Picture:</label>
            <input
              type="file"
              id="edit-picture"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              type="text"
              id="edit-picture"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })}
            />

            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ChildManagement;