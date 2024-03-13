import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Typed from 'react-typed';
import Feeters from './feeters';
import Link from 'next/link';
import UserSponsorship from './UserSponsership';
import { baseURL } from '../util/constant';
import axios from 'axios';
const Sponsor = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
 
  
  useEffect(() => {
   
    fetchChildren();
  }, [router.pathname]);

  const fetchChildren = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(`${baseURL}/child/get `);
      if (!response.ok) {
        throw new Error('Failed to fetch children data');
      }
      console.log(response.data);
      setChildren(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  const renderChildrenTable = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>   </tr>
        </thead>
        <tbody>
          {children.map((child) => (
            <tr key={child.childId}>
              <td>{child.name}</td>
              <td>{child.age}</td>
              <td>{child.gender}</td>
          
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      
      <div className="goals-container">
        <div className="goal vision">
          <h2>Your sponsorship ensures a brighter future for orphaned and vulnerable children.</h2>
        </div>
        <div className="goal mission">
          <h3>Our Mission</h3>
          <div className="typed-container">
            <p>
              Our mission is to provide orphans and vulnerable children with access to quality education, healthcare,{' '}
              <Typed
                strings={[
                  'and a nurturing environment, empowering them to break the cycle of poverty and reach their full potential. We strive to create sustainable solutions that address the unique needs of each child, working closely with communities to foster a sense of belonging and support.'
                ]}
                typeSpeed={9}
                backSpeed={0}
                loop={false}
                onComplete={handleTypingComplete} // Call the handler when typing completes
              />
            </p>
          </div>
        </div>
      </div>
      <h3>Recommended Children</h3>
      <UserSponsorship/>
    
       
      
 <Feeters />
    </div>
   
  );
};

export default Sponsor;
