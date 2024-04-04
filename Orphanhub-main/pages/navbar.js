// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const Navbar = ({ onLogout }) => {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const handleProfileClick = () => {
//     setShowProfileMenu(!showProfileMenu); // Toggle the profile menu visibility
//   };

//   const handleMenuClick = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const [sparkles, setSparkles] = useState([]);

//   useEffect(() => {
//     const createSparkle = () => {
//       return {
//         left: `${Math.random() * 100}%`,
//         top: `${Math.random() * 100}%`,
//       };
//     };

//     const newSparkles = Array.from({ length: 10 }, createSparkle);
//     setSparkles(newSparkles);
//   }, []); 
//   return (
//     <div>
//       <header className={`navbar ${isMenuOpen ? 'open' : ''}`}>
//         <div className="logo">
//           <img src="orphanage_logo.png" alt="OrphanageHub Logo" />
//           <Link href="/UserPage">
//             <h1>OrphanHub</h1>
//             <div className="sparkles-container">
//               {sparkles.map((sparkle, index) => (
//                 <div
//                   key={index}
//                   className="sparkle"
//                   style={{ right:sparkle.right, left: sparkle.left, top: sparkle.top ,bottom:sparkle.top}}
//                 ></div>
//               ))}
//             </div>
//           </Link>
//         </div>
//         <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
//           <li>
//             <Link href="/UserPage">
//               <div className={router.pathname === '/UserPage' ? 'activelink' : ''}>Home</div>
//             </Link>
//           </li>
//           <li>
//             <Link href="/DonationPage">
//               <div className={router.pathname === '/DonationPage' ? 'activelink' : ''}>Donation</div>
//             </Link>
//           </li>
//           <li>
//             <Link href="/sponsor">
//               <div className={router.pathname === '/sponsor' ? 'activelink' : ''}>Sponsor</div>
//             </Link>
//           </li>
//           <li>
//             <Link href="/ChildDetailPage">
//               <div className={router.pathname === '/aboutus' ? 'activelink' : ''}>Childrens</div>
//             </Link>
//           </li>
//           <div className="profile-container" onClick={handleProfileClick}>
//             <img src="profilepic.jpg" alt="Profile Picture" />
//             {showProfileMenu && (
//               <div className="profile-menu">
//                 <ul>
//                   <li>
//                     <a href="#">View Profile</a>
//                   </li>
//                   <li>
//                     <a href="/" onClick={onLogout}>Logout</a>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </ul>
//       </header>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaDonate } from 'react-icons/fa';
import { FaChild } from 'react-icons/fa';
const Navbar = ({ onLogout }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu); // Toggle the profile menu visibility
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [sparkles, setSparkles] = useState([]);
  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      
      
    }
  };

  useEffect(() => {
    const createSparkle = () => {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      };
    };

    const newSparkles = Array.from({ length: 10 }, createSparkle);
    setSparkles(newSparkles);
  }, []); 
  return (
    <div>
      <header className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src="orphanage_logo.png" alt="OrphanageHub Logo" />
          <Link href="/UserPage">
            <h1>OrphanHub</h1>
            <div className="sparkles-container">
              {sparkles.map((sparkle, index) => (
                <div
                  key={index}
                  className="sparkle"
                  style={{ right:sparkle.right, left: sparkle.left, top: sparkle.top ,bottom:sparkle.top}}
                ></div>
              ))}
            </div>
          </Link>
        </div>
       
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li >
    <Link href="/UserPage">
      <div className={router.pathname === '/UserPage' ? 'activelink' : ''}>
      <FaHome />
        <span>Home</span>
      </div>
    </Link>
  </li>
  <li >
    <Link href="/DonationPage">
      <div className={router.pathname === '/DonationPage' ? 'activelink' : ''}>
      <FaDonate />
        <span>Donation</span>
      </div>
    </Link>
  </li>
  <li >
    <Link href="/sponsor">
      <div className={router.pathname === '/sponsor' ? 'activelink' : ''}>
       
        <span> <FaHandHoldingHeart />Sponsor</span>
      </div>
    </Link>
          </li>
          <li >
            <Link href="/ChildDetailPage">
              <div className={router.pathname === '/aboutus' ? 'activelink' : ''}>  <FaChild /><FaChild />
        <span>Childrens</span></div>
            </Link>
          </li>
          <div className="profile-container" onClick={handleProfileClick}>
            <img src="profilepic.jpg" alt="Profile Picture" />
            {showProfileMenu && (
              <div className="profile-menu">
              <ul>
                <li>
                  <Link href="/ViewProfilePage">
                 <div className={router.pathname === '/ViewProfilePage' ? 'activelink' : ''}>View Profile</div>
                  </Link>
                </li>
                <li>
            
                    <a href="/" onClick={onLogout(logout)}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
