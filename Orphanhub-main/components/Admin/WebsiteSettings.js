
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { baseURL } from '../../util/constant';

const WebsiteSettings = () => {
  const [donationGoal, setDonationGoal] = useState(5000);
  const [categories, setCategories] = useState([
    { name: 'Education', weight: 0.3 },
    { name: 'Health Facilities', weight: 0.2 },
    { name: 'Toys', weight: 0.1 },
    { name: 'Food', weight: 0.2 },
    { name: 'Clothes', weight: 0.2 },
  ]);
  const [totalDonated, setTotalDonated] = useState(0);

  const [allocationData, setAllocationData] = useState({});

  useEffect(() => {
    allocat();
  }, []);

  const allocat = async () => {
    try {
      const result = await axios(`${baseURL}/allocatedAmount`);
      setAllocationData(result.data);
    } catch (err) {
      console.log("fetch error", err);
    }
  };

  useEffect(() => {
    const fetchAllocationData = async () => {
      try {
        const response = await axios.get(`${baseURL}/alocateDonation`);
        setAllocationData(response.data);
      } catch (error) {
        console.error('Error fetching allocation data:', error);
      }
    };

    fetchAllocationData();
  }, []);

  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][key] = value;
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: '', weight: 0 }]);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/updateOrInsertCategories`, { categories });
      console.log('Categories saved successfully');
      
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  useEffect(() => {
    const fetchColumnNames = async () => {
      try {
        const response = await axios.get(`${baseURL}/getColumnNames`);
        const columnNames = response.data.columnNames;
        setCategories(columnNames.map((name) => ({ name, weight: 0 })));
      } catch (error) {
        console.error('Error Fetching Column Names:', error);
      }
    };
    fetchColumnNames();
  }, []);

  const handleDonationSuccess = (amount) => {
    setTotalDonated(totalDonated + amount);
  };

  const progressPercentage = (totalDonated / donationGoal) * 100;

  return (
    <section className="website-settings">
      <h3>Website Settings</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="donationGoal">Donation Goal:</label>
        <input
          type="number"
          id="donationGoal"
          value={donationGoal}
          onChange={(e) => setDonationGoal(Number(e.target.value))}
        />

        <h4>Categories:</h4>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Category Weight"
              step="0.01"
              min="0"
              max="1"
              value={category.weight}
              onChange={(e) => handleCategoryChange(index, 'weight', parseFloat(e.target.value))}
            />
            <button type="button" onClick={() => handleRemoveCategory(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>

        <button type="submit">Save Changes</button>
      </form>

      <div className="allocation-table">
          <h4>Previous Day Allocation</h4>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            {Array.isArray(allocationData)&& allocationData.length>0 ? (
            <tbody>
              {allocationData.map((allocation, index) => (
                <tr key={index}>
                  <td>{allocation.name}</td>
                  <td>${allocation.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>):(
              <tbody>
              
                <tr >
                  <td>No aocation data</td>
                  
                </tr>
             
            </tbody>
            )}
          </table>
        </div> 
        <style jsx>{`
    .allocation-table {
      width: 100%;
      overflow: auto;
    }
    
    .allocation-table table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .allocation-table th,
    .allocation-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .allocation-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    
    @media screen and (max-width: 600px) {
      .allocation-table table {
        display: block;
      }
    
      .allocation-table th,
      .allocation-table td {
        display: block;
        width: 100%;
        margin-bottom: 0.5rem;
      }
    
      .allocation-table th {
        font-weight: bold;
      }
    }    

    `}</style>
    </section>
  );
};

export default WebsiteSettings;