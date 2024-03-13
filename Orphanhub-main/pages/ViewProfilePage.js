import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Feeters from './feeters';
import { baseURL } from '../util/constant';

function ViewProfilePage({ username }) {
  const [bookmarkedChildCards, setBookmarkedChildCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchBookmarkedChildCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/bookmarks/get`);
        setBookmarkedChildCards(response.data);
      } catch (error) {
        setError('Error retrieving bookmarked child cards. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedChildCards();
  }, [username]);

  return (
    <div>
     
      <h1>View Profile Page</h1>
      <h2>Bookmarked Child Cards</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {bookmarkedChildCards.length > 0 ? (
        <div>
          {bookmarkedChildCards.map((child) => (
            <div key={child.childId}>
              <p>{child.name}</p>
              <p>Age: {child.age}</p>
              <p>Hobbies: {child.hobbies}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarked child cards.</p>
      )}
      <Feeters />
    </div>
  );
}

export default ViewProfilePage;