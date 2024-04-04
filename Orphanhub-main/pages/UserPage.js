import React, { useState,useEffect } from 'react';
import Navbar from './navbar';
import DonationForm from '../components/DonationForm';
import Typed from 'react-typed';
import DonationPage from './DonationPage';
import Link from 'next/link';
import Feeters from './feeters';

const UserPage = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationFormPosition, setDonationFormPosition] = useState({ x: 0, y: 0 });


  const handleWelcomeDonateClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Set the position of the DonationForm
    setDonationFormPosition({ x, y });
    setDonationFormPosition({ x: event.clientX, y: event.clientY });
    setShowDonationForm(true);
  };

  const handleDonationFormClose = () => {
    setShowDonationForm(false);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogout = () => {
 
    setIsLoggedIn(false);
  };
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
    return ( 
        <div className="maincontainer">
<Navbar/>
{showDonationForm && (
        <DonationForm
          onClose={handleDonationFormClose}
          position={donationFormPosition}
        />
      )}
          <div className="welcome-container">
            
  <div className="welcome-image-container">
    
    <img className="welcome-image" src="welcome_image.jpg" alt="Welcome to OrphanHub" />
    <div className="welcome-text">
      <h2>Welcome to OrphanHub</h2>
      
     
   
      <div
        className="custom-cursor"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
  </div>
  <Link href="/DonationPage">
  <button className="donate-buttons">Donate Now</button>
</Link>
  
    </div> 
    <div className='welcomeh1'><h1>BRIGHT FUTURE</h1></div>
    <div className='welcomeh11'><h1>FOR CHILDREN'S</h1></div>
    <h3 className="welcome-message">Your gateway to making a difference in children's lives</h3> 
    
</div>
<div class="goals-container">
  <div class="goal vision">
    <h2>
   A world where every child receives care, ensuring a brighter future for all</h2>
  </div>
  <div class="goal mission">
  <h3>Our Mission</h3>
  <p>Our mission is to provide orphans and vulnerable childrens with access to quality education, healthcare, and a nurturing environment, empowering them to break the cycle of poverty and reach their full potential. We strive to create sustainable solutions that address the unique needs of each child, working closely with communities to foster a sense of belonging and support. Through our  approach, we aim to inspire hope and transform lives, one child at a time.
      </p>
      <Link href="/ChildDetailPage">
            <button className="donate-buttons">Children's info</button>
          </Link>  
    </div>
</div>


<div className="welcome-container">
            
            <div className="welcome-image-container">
              
              <img className="welcome-image" src="sponsor_image.png" alt="Welcome to OrphanHub" />
              <div className="welcome-text">
                <h2>Your help will make a path for a Children's future</h2>
            </div>
            <Link href="/sponsor">
            <button className="donate-buttons">Sponsor Now</button>
          </Link>
            
              </div> 
           
              <h3 className="welcome-message"> Sponsor to make a difference in children's lives </h3> 
              
          </div>
          <div class="goals-container">
  <div class="goal vision">
    <h2>
   Adopting a Child is a very careful process and it will change a lot of children's future so they will be able to live with a parent figure.</h2>
  </div>
  <div class="goal mission">
  <h3>Our interest</h3>
  <p> Make those childrens be able to get good parents who will adopt them and take care of them.Make you be able to see the Children's detail and choose a child to adopt.
      </p>
      <Link href="/ChildDetailPage">
            <button className="donate-buttons">Children's info</button>
          </Link>
    </div>
</div>
<div className="welcome-container">
            
            <div className="welcome-image-container">
              
              <img className="welcome-image" src="orphanageadtoption.jpg" alt="Welcome to OrphanHub" />
              <div className="welcome-text">
                <h2>You will make a path for a Children's future</h2>
            </div>
            <Link href="/ChildDetailPage">
            <button className="donate-buttons">Children's info</button>
          </Link>
            
              </div> 
           
              <h3 className="welcome-message">Your gateway to adopt and change a children's live.</h3> 
              
          </div>
       <Feeters/>
        </div>
      );
    };
    
export default UserPage;
// export default UserPage;



// import React, { useState } from 'react';

// import ChildrenView from './ChildrenView';
// import ChildDetailPage from './ChildDetailPage';
// import { Link } from 'react-router-dom';

// const UserPage = ({ onLogout }) => {
//     const handleLogout = () => {
//         onLogout();
//     };

//     const [viewingChildId, setViewingChildId] = useState(null);
//     const [showChildrenView, setShowChildrenView] = useState(false);
//     const [showOtherSections, setShowOtherSections] = useState(true);

//     const handleViewChildDetails = (childId) => {
//         setViewingChildId(childId);
//         setShowOtherSections(false);
//     };

//     const handleCloseChildDetails = () => {
//         setViewingChildId(null);
//         setShowOtherSections(true);
//     };

//     const handleChildrenLinkClick = () => {
//         setShowChildrenView(true);
//     };

//     return ( <
//         div className = "maincontainer" >
//         <
//         header className = "navbar" >
//         <
//         div className = "logo" >
//         <
//         img src = "orphanage_logo.png"
//         alt = "OrphanageHub Logo" / >
//         <
//         h1 > OrphanHub < /h1> < /
//         div > <
//         ul className = "nav-links" >
//         <
//         li > < a href = '#Home' > Home < /a></li >
//         <
//         li > < a href = '#Events'
//         id = "Event" > Events < /a></li >
//         <
//         li > < a href = '#donation-section' > Donations < /a></li >
//         <
//         li > < Link to = "/childrens"
//         onClick = { handleChildrenLinkClick } > Childrens < /Link></li >
//         <
//         li > < a href = '#' > About Us < /a></li >
//         <
//         /ul> <
//         div className = "profile-container"
//         id = "profile-container" >
//         <
//         img src = "profilepic.jpg"
//         alt = "Profile Picture" / >
//         <
//         div className = "profile-menu"
//         id = "profile-menu" >
//         <
//         ul >
//         <
//         li > < a href = "#" > View Profile < /a></li >
//         <
//         li > < a href = "#"
//         id = "logout-link"
//         onClick = { handleLogout } > Logout < /a></li >
//         <
//         /ul> < /
//         div > <
//         /div> < /
//         header >

//         <
//         h2 > Welcome to OrphanHub < /h2>

//         <
//         DonationForm / >

//         {
//             showChildrenView && ( <
//                 ChildrenView onViewDetail = { handleViewChildDetails }
//                 />
//             )
//         }

//         {
//             viewingChildId !== null && ( <
//                 ChildDetailPage childId = { viewingChildId }
//                 onClose = { handleCloseChildDetails }
//                 />
//             )
//         }

//         {
//             showOtherSections && ( <
//                 section className = "Events" >
//                 <
//                 h3 > Event < /h3> <
//                 div class = "event-tabs" >
//                 <
//                 button id = "upcoming"
//                 class = "active" > Upcoming Events < /button> <
//                 button id = "past" > Past Events < /button> < /
//                 div > <
//                 div class = "event-list"
//                 id = "event-list" >

//                 <
//                 div class = "event" >
//                 <
//                 h4 > Summer Fun Day < /h4> <
//                 p > Date: Dec 15, 2023 < /p> <
//                 p > Time: 10: 00 AM - 4: 00 PM < /p> <
//                 p > Join us
//                 for a day of fun and activities
//                 for the children! < /p> <
//                 button class = "event-button" > Volunteer < /button> < /
//                 div > <
//                 div class = "event" >
//                 <
//                 h4 > Summer Holiday < /h4> <
//                 p > Date: Dec 22, 2023 < /p> <
//                 p > Time: 9: 00 AM - 5: 00 PM < /p> <
//                 p > Join us
//                 for a day of fun and activities
//                 for the children! < /p> <
//                 button class = "event-button" > Participate < /button> < /
//                 div > <
//                 div class = "event" > < h4 > Summer Meet Day < /h4> <
//                 p > Date: Dec 18, 2023 < /p> <
//                 p > Time: 10: 00 AM - 3: 00 PM < /p> <
//                 p > Join us
//                 for a day of meet and activities
//                 for the children! < /p> <
//                 button class = "event-button" > Participate < /button></div >
//                 <
//                 div class = "event" > Upcoming Event 2..in Dec 25 < /div>

//                 <
//                 div class = "event past-event" >
//                 <
//                 h4 > Annual Charity Gala < /h4> <
//                 p > Date: June 30, 2023 < /p> <
//                 p > Time: 6: 00 PM - 10: 00 PM < /p> <
//                 p > Thank you
//                 for your support in making our gala a success! < /p> < /
//                 div > <
//                 div class = "event past-event" > < h4 > Charity world < /h4> <
//                 p > Date: June 30, 2023 < /p> <
//                 p > Time: 4: 00 PM - 8: 00 PM < /p> <
//                 p > Thank you
//                 for your support in making our orphange a success! < /p></div >
//                 <
//                 div class = "event past-event" > Past Event 2 < /div> < /
//                 div > <
//                 /section>
//             )
//         }

//         <
//         section className = "donation-box" >
//         <
//         h3 > Support Us < /h3>  <
//         div class = "logos" >
//         <
//         img src = "orphanage_logo.png"
//         alt = "OrphanageHub Logo" / >
//         <
//         h1 > OrphanHub < /h1> <
//         div class = "statement" >
//         <
//         p >

//         "Transforming Lives, One Click at a Time:<br />
//         OrphanHub, Impacting Futures.
//         " < /
//         p > < /div > < /
//         div >

//         <
//         p > Your contribution can make a difference in the lives of these children.Help us create a better future
//         for them. < /p> <
//         button class = "donate-button" > Donate Now < /button> < /
//         section > <
//         /div>
//     );
// };
