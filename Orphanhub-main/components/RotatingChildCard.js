import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../util/constant';
import ChildCardMaker from './ChildCardMaker'; 
import BookmarkIcon from './BookmarkIcon'; 

const RotatingChildCards = () => {
  const [childrenData, setChildrenData] = useState([]);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [bookmarkedChildren, setBookmarkedChildren] = useState([]);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const result = await axios.get(`${baseURL}/child/get`);
        const processedData = result.data.map((child) => ({
            id: child.id,
            full_name: child.full_name,
            DOB: child.DOB,
            gender: child.gender,
            hobbies: child.hobbies,
            image : child.image
         
          }));
          
        setChildrenData(processedData);
      } catch (err) {
        console.log("fetch error", err);
      }
    };

    fetchChildrenData();
  }, [bookmarkedChildren]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChildIndex((prevIndex) => (prevIndex + 1) % childrenData.length);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, [childrenData]);

  const toggleBookmark = (childId) => {
    if (bookmarkedChildren.includes(childId)) {
      setBookmarkedChildren(bookmarkedChildren.filter(id => id !== childId));
    } else {
      setBookmarkedChildren([...bookmarkedChildren, childId]);
    }
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
    <div>
      {childrenData.length > 0 && (
        <div>
          <BookmarkIcon
            bookmarked={bookmarkedChildren.includes(childrenData[currentChildIndex].childId)}
            onClick={() => toggleBookmark(childrenData[currentChildIndex].childId)}
          />
        <ChildCardMaker
  key={childrenData[currentChildIndex].childId}
  selectedChild={childrenData[currentChildIndex]}
  calculateAge={calculateAge}
/>

        </div>
      )}
    </div>
  );
};

export default RotatingChildCards;