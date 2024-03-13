// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseURL } from '../util/constant';
// import AdoptionForm from '../components/AdoptionForm';
// import BookmarkIcon from '../components/BookmarkIcon';
// import Feeters from './feeters';
// const ChildDetailPage = () => {
//   const [childData, setChildData] = useState([]);
//   const [selectedChildId, setSelectedChildId] = useState(null);
//   const [selectedChildName, setSelectedChildName] = useState(null);
//   const [showAdoptionForm, setShowAdoptionForm] = useState(false);
//   const [bookmarkedChildren, setBookmarkedChildren] = useState([]);
//   const [ageFilter, setAgeFilter] = useState('');
//   const [bookmarkedIds, setBookmarkedIds] = useState([]);
//   useEffect(() => {
//     childManage();
//   }, []);
  
//   const isBookmarked =  (childId) => {
   
//     return bookmarkedIds.includes(childId);
//   };
//   const toggleBookmark = (childId) => {
//     if (isBookmarked(childId)) {
//       unbookmarkChild(childId);
//     } else {
//       bookmarkChild(childId);
//     }
//   };

//   const bookmarkChild = async(childId) => {
//     setBookmarkedIds([...bookmarkedIds, childId]);
//     try{
//       const book = await axios.post(`${baseURL}/bookmark/add`)
//     }catch{
      
//     }
//   };

//   const unbookmarkChild = (childId) => {
//     setBookmarkedIds(bookmarkedIds.filter(id => id !== childId));
//   };
  
//   const childManage = async () => {
//     try {
//       const result = await axios.get(`${baseURL}/child/get`);
//       const processedData = result.data.map((child) => ({
//         ...child,
//         age: calculateAge(child.date_of_birth),
//         isBookmarked: bookmarkedChildren.includes(child.childId),
//         picture: child.picture || 'child_picture.jpg',
//         full_name: child.full_name, 
//       }));
//       setChildData(processedData);
//     } catch (err) {
//       console.log("fetch error", err);
//     }
//   };
  

//   const calculateAge = (dateOfBirth) => {
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const handleAdoptButtonClick = (childId, name) => {
//     setSelectedChildId(childId);
//     setSelectedChildName(name);
//     setShowAdoptionForm(true);
//   };

//   const handleBookmarkClick = (childId) => {
//     const updatedBookmarkedChildren = [...bookmarkedChildren];
//     const index = updatedBookmarkedChildren.indexOf(childId);
//     if (index !== -1) {
//       updatedBookmarkedChildren.splice(index, 1);
//     } else {
//       updatedBookmarkedChildren.push(childId);
//     }
//     setBookmarkedChildren(updatedBookmarkedChildren);
//   };
//   const ageOptions = Array.from({ length: 18 }, (_, i) => i + 1); 
//   const generateAgeOptions = () => {
    

//     const minAge = Math.min(...childData.map(child => calculateAge(child.date_of_birth)));
//     const maxAge = Math.max(...childData.map(child => calculateAge(child.date_of_birth)));
  
//     const options = [];
//     for (let age = minAge; age <= maxAge; age++) {
//       options.push({ value: age, label: `${age} years` });
//     }
//     options.push({ value: '', label: 'Show All' }); 
//     return options;
//   };
  
//   const handleAgeFilterChange = (event) => {
//     const value = event.target.value;
//     setAgeFilter(value);
//   };
//   ;

//   const filteredChildren = childData.filter(child => {
//     if (!ageFilter) {
//       return true;
//     }
//     const age = parseInt(ageFilter);
//     return child.age === age;
//   });

//   if (!childData) {
//     return (
//       <div id="loading">Loading...</div>
//     );
//   }

//   return (
//     <div className="child-detail-page">
//       <div className="filter-container">
//       <label htmlFor="age-filter">Filter by Age:</label>
//       <select value={ageFilter} onChange={handleAgeFilterChange}>
//   <option value="">All</option>
//   {ageOptions.map((option) => (
//     <option key={option} value={option}>
//       {option}
//     </option>
//   ))}
// </select>

//       </div>
//       <div className="child-card-container">
//         {filteredChildren.map((child) => (
//           <div className="child-card" key={child.childId}>
//             <div className="child-picture">
//               <img src={child.image} alt={`${child.full_name}'s Picture`} />
//             </div>
//             <div className="child-details">
//               <h2>Name: {child.full_name}</h2>
//               <p>Age: {calculateAge(child.DOB)}</p>
//               <p>Gender: {child.gender}</p>
//               <p>Hobbies: {child.hobbies}</p>
//               {child.healthConditions && <p>Health Conditions: {child.healthConditions}</p>}
//               {child.personality && <p>Personality: {child.personality}</p>}
//               <div className='bookmark-button'>
//   <BookmarkIcon bookmarked={isBookmarked(child.childId)} onClick={() => toggleBookmark(child.childId)} />
// </div>
//            <div className="child-buttons">
//                 <button onClick={() => handleAdoptButtonClick(child.childId, child.full_name)}>
//                   Adopt
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {showAdoptionForm && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <span className="close" onClick={() => setShowAdoptionForm(false)}>&times;</span>
//             <AdoptionForm onClose={() => setShowAdoptionForm(false)} childId = {selectedChildId} childName = {selectedChildName}/>
//           </div>
//         </div>
//       )}
// <Feeters/>
  
// <style jsx>{`
//   .modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .bookmark-button {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     cursor: pointer;
//     font-size: 1.5rem;
//   }
//   .bookmark-button svg {
//     width: 20px;
//     height: 20px;
//     fill: none;
//     stroke: currentColor;
//     stroke-width: 2;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     transition: fill 0.3s ease; /* Only transition fill color */
//   }
  
//   /* Modal Styles */
//   .modal {
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 5px;
//     animation: slide-up 0.3s ease;
//   }
  
//   /* Close Button Styles */
//   .close {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     cursor: pointer;
//   }
  
//   @keyframes slide-up {
//     from {
//       transform: translateY(100%);
//     }
//     to {
//       transform: translateY(0);
//     }
//   }



  
//   .
//   .child-detail-page {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     padding: 20px;
// }

// .child-card-container {
//     display: flex;
//     flex-wrap: wrap;
//     background: linear-gradient(to bottom, #f9f9f9, #eaeaea);
//     margin-left: 120px;
//     padding: 20px;
//     position: relative;
// }

// .child-card {
//     flex: 0 0 calc(33.33% - 20px); /* Adjusted width calculation */
//     margin-right: 20px; /* Added margin between cards */
//     margin-bottom: 20px;
//     border: 1px solid rgba(0, 128, 0, 0.5);
//     border-radius: 5px;
//     padding: 18px;
//     position: relative;
// }
  
//   .filter-container {
//     position: sticky;
//     top: 0;
//     padding: 10px;
//     background: linear-gradient(to bottom, #b3ffb3, #66ff66);
//     border-bottom: 1px solid #99cc99; 
//     z-index: 1; 
//     width: 100px;
//     border-radius: 5px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   }
  
//   .filter-label {
//     margin-bottom: 5px;
//     font-weight: bold;
//     color: #333;
//   }
  
//   .filter-input {
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 3px;
//   }
  
//   .filter-input::placeholder {
//     color: #999;
//   }
  
 
  
//   @media (max-width: 768px) {
//     .child-card {
//       flex-basis: 100%; /* Full width for smaller screens */
//       margin-right: 0;
//   }

//     .child-card-grid {
//       grid-template-columns: 1fr; /* One column for screens up to 768px */
//     }
//   }
// `}</style>
//     </div>
  
//   );
// };

// export default ChildDetailPage;


import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { baseURL } from '../util/constant';
import AdoptionForm from '../components/AdoptionForm';
import BookmarkIcon from '../components/BookmarkIcon';
import Feeters from './feeters';

const ChildDetailPage = () => {
  const [childData, setChildData] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [bookmarkedChildren, setBookmarkedChildren] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [healthConditionFilter, setHealthConditionFilter] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDisplay, setSearchTermDisplay] = useState('');
  


  const isBookmarked = (childId) => {
    return bookmarkedIds.includes(childId);
  };

  const toggleBookmark = (childId) => {
    if (isBookmarked(childId)) {
      unbookmarkChild(childId);
    } else {
      bookmarkChild(childId);
    }
  };

  const bookmarkChild = (childId) => {
    setBookmarkedIds([...bookmarkedIds, childId]);
  };

  const unbookmarkChild = (childId) => {
    setBookmarkedIds(bookmarkedIds.filter(id => id !== childId));
  };
  useEffect(() => {
    const childManage = async () => {
      try {
        let result;
        if (searchTerm) {
          result = await axios.get(`${baseURL}/child/search, { params: { searchTerm } }`);
        } else {
          result = await axios.get(`${baseURL}/child/get`);
        }
        const processedData = result.data.map((child) => {
       
          return {
            ...child,
            age: calculateAge(child.date_of_birth),
            isBookmarked: bookmarkedChildren.includes(child.childId),
            picture: child.picture || 'child_picture.jpg',
            full_name: child.full_name,
            healthConditions:child.healthConditions,
            showDetails: false, 
          };
        });
        
        
        setChildData(processedData);
      } catch (err) {
        console.log("fetch error", err);
      }
    };
    
  
    childManage();
  }, []); 

const searchCounts = new Map();


const incrementSearchCount = (childId) => {
  const count = searchCounts.get(childId) || 0;
  searchCounts.set(childId, count + 1);
};


const getTopSearches = () => {
  const sortedSearches = [...searchCounts.entries()].sort((a, b) => b[1] - a[1]);
  return sortedSearches.slice(0, 3).map(([childId, count]) => ({ childId, count }));
};

incrementSearchCount('1');


const topSearches = getTopSearches();
console.log('Top 3 most searched children:', topSearches);


  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAdoptButtonClick = (childId) => {
    setSelectedChildId(childId);
    setShowAdoptionForm(true);
    setShowNotification(true);
  };

  const handleBookmarkClick = (childId) => {
    const updatedBookmarkedChildren = [...bookmarkedChildren];
    const index = updatedBookmarkedChildren.indexOf(childId);
    if (index !== -1) {
      updatedBookmarkedChildren.splice(index, 1);
    } else {
      updatedBookmarkedChildren.push(childId);
    }
    setBookmarkedChildren(updatedBookmarkedChildren);
  };

  const ageOptions = Array.from({ length: 18 }, (_, i) => i + 1);

  const handleAgeFilterChange = (event) => {
    const value = event.target.value;
    setAgeFilter(value);
  };
  
  const handleGenderFilterChange = (event) => {
    const value = event.target.value;
    setGenderFilter(value);
  };
 
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };
  
  
  const handleHealthConditionFilterChange = (event) => {
    const value = event.target.value;
    setHealthConditionFilter(value);
  };
  const handleViewDetailsClick = (childId) => {
    setChildData((prevState) =>
      prevState.map((child) =>
        child.childId === childId ? { ...child, showDetails: !child.showDetails } : child
      )
    );
  };
  
  const filteredChildren = childData.filter(child => {
    const isAgeMatch = !ageFilter || calculateAge(child.DOB) === parseInt(ageFilter);
    const isGenderMatch = !genderFilter || child.gender.toLowerCase() === genderFilter.toLowerCase();
    const isHealthConditionMatch = !healthConditionFilter || child.healthConditions.toLowerCase() === healthConditionFilter.toLowerCase();
    const isSearchMatch = !searchTerm || child.full_name.toLowerCase().startsWith(searchTerm.toLowerCase());
    return isAgeMatch && isGenderMatch && isHealthConditionMatch && isSearchMatch;
  });
  const filterContainerRef = useRef(null);

  const handleScroll = () => {
    if (childContainerRef.current && childContainerRef.current.scrollTop > 0) {
      filterContainerRef.current.classList.add('sticky');
    } else {
      filterContainerRef.current.classList.remove('sticky');
    }
  };

  if (!childData) {
    return (
      <div id="loading">Loading...</div>
    );
  }

  return (
    <div className="child-detail-page">
      <div className="filter-container"ref={filterContainerRef}>
        <label htmlFor="age-filter">Filter by Age:</label>
        <select value={ageFilter} onChange={handleAgeFilterChange}>
          <option value="">All</option>
          {ageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="gender-filter">Filter by Gender:</label>
        <select value={genderFilter} onChange={handleGenderFilterChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="health-condition-filter">Filter by Health Condition:</label>
        <select value={healthConditionFilter} onChange={handleHealthConditionFilterChange}>
          <option value="">All</option>
          <option value="good">Good</option>
          <option value="other">Other</option>
        </select>
        <div className="search-container">
        <input
    id="searchTerm"
    type="text"
    placeholder="🔍Search by name..."
    value={searchTerm}
    onChange={handleSearchChange}
  />

</div>
      </div>
      <div className="child-card-container"onScroll={handleScroll}>
        {filteredChildren.map((child) => (
          <div className="child-card" key={child.childId}>
            <div className="child-picture">
              <img src={child.picture} alt={`${child.name}'s Picture`} />
            </div>
            <div className="child-details">
              <h2>Name: {child.full_name}</h2>
              <p>Age: {calculateAge(child.DOB)}</p>
              <p>Gender: {child.gender}</p>
              <p>Hobbies: {child.hobbies}</p>
              {child.showDetails && (
                <div className="additional-details">
                <p>Health Conditions: {child.healthConditions}</p>
                  <p>Personality: {child.additional_details}</p>
                </div>
              )}
                   <div className='bookmark-button'>
                <BookmarkIcon bookmarked={isBookmarked(child.childId)} onClick={() => toggleBookmark(child.childId)} />
              </div>
              <div className="child-buttons">
                <button onClick={() => handleAdoptButtonClick(child.childId)}>
                  Adopt
                </button>
                <button onClick={() => handleViewDetailsClick(child.childId)}>
                  {child.showDetails ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showAdoptionForm && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setShowAdoptionForm(false)}>&times;</span>
            <AdoptionForm onClose={() => setShowAdoptionForm(false)} />
          </div>
        </div>
      )}
      {showNotification && (
        <div className="notification">Adoption request in process...</div>
      )}
      <Feeters />

<style jsx>{`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bookmark-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .bookmark-button svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: fill 0.3s ease; /* Only transition fill color */
  }
  

  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    animation: slide-up 0.3s ease;
  }
  
  /* Close Button Styles */
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }



  
  
  child-detail-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    height: calc(100vh - 60px); /* Adjust the height to take up the whole screen except for the top bar */
  }
  
  .child-card-container {
    display: flex;
    flex-wrap: wrap;
    background: linear-gradient(to bottom, #f9f9f9, #eaeaea);
    padding: 20px;
    flex: 1; /* Make the child container take up the remaining space */
    overflow-y: auto; /* Add vertical scrollbar if needed */
  }
  
  .child-card {
    flex: 0 0 calc(33.33% - 20px); /* Adjusted width calculation for 3 cards per row */
    margin-right: 20px; /* Added margin between cards */
    margin-bottom: 20px;
    border: 1px solid rgba(0, 128, 0, 0.5);
    border-radius: 5px;
    padding: 18px;
    position: relative;
  }
  
  .filter-container {
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap; 
    gap: 10px; 
    position: sticky;
    top: 0;
    padding: 10px;
    background: linear-gradient(to bottom, #b3ffb3, #66ff66);
    border-bottom: 1px solid #99cc99;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
  }
  
  .filter-container.sticky {
  
      display: flex; 
      flex-direction: row; /* Display items in a row */
      align-items: center; /* Align items to the center vertically */
      gap: 10px; 
      position: sticky;
      top: 0;
      left:0;
      padding: 10px;
      background: linear-gradient(to bottom, #b3ffb3, #66ff66);
      border-right: 1px solid #99cc99; /* Add a right border instead of bottom */
      z-index: 1;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-right: 20px;
    }
    
  }

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 7px;
  width: 80%;
  margin: 7px;
}

.search-container input[type="text"] {
  flex-grow: 0.8;
  border: none;
  outline: none;
  font-size: 15px;
}

.search-icon {
  margin-right: 8px;
  font-size: 20px;
}

.filter-label {
  display: block; /* Display labels as block elements */
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}


.filter-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.filter-input::placeholder {
  color: #999;
}

@media (max-width: 768px) {
  .child-card-container {
    width: 100%;
    margin-left: 0;
  }

  .child-card {
    flex-basis: 100%; /* Full width for smaller screens */
    margin-right: 0;
  }

  .child-card-grid {
    grid-template-columns: 1fr; /* One column for screens up to 768px */
  }

  .filter-container {
    width: 100%;
    margin-right: 0;
  }
}
 
  
`}</style>
    </div>
  
  );
};

export default ChildDetailPage;