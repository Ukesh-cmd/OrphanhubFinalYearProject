import Link from 'next/link';
import { useState,useEffect } from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import ChildManagement from '../components/Admin/ChildManagement';
import UserManagement from '../components/Admin/UserManagement';
import AdoptionRequests from '../components/Admin/AdoptionRequests';
import WebsiteSettings from '../components/Admin/WebsiteSettings';
import DonorManagement from '../components/Admin/DonorManagement';
import SponsorManagement from '../components/Admin/SponsorManagement'
import { useRouter } from 'next/router';
const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
      
  }, [router.pathname]);
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'child-management':
        return <ChildManagement />;
      case 'user-management':
        return <UserManagement />;
      case 'adoption-requests':
        return <AdoptionRequests />;
      case 'donor-management':
        return <DonorManagement />
      case 'sponsor-management':
        return <SponsorManagement />
      case 'website-settings':
        return <WebsiteSettings />;
      default:
        return null;
    }
  };

  return (
    <div id="admincontainer">
      <style jsx>{`
        #admincontainer {
          position: relative;
          display: flex;
          height: 100vh;
        }
      }
      
      #admincontainer::before,
      #admincontainer::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 10px;
        background: linear-gradient(to right, #75a2fc, #363236, #80ccef, #4e6f86, #6288e1, #7bafed, #92a3f8);
        z-index: -1;
        animation: neonGlow 2s infinite alternate;
        filter: blur(5px); /* Add a blur effect for a neon-like appearance */
      }
    
      @keyframes neonGlow {
        0% {
          box-shadow: 0 0 10px #75a2fc, 0 0 20px #363236, 0 0 30px #80ccef, 0 0 40px #4e6f86, 0 0 50px #6288e1, 0 0 60px #7bafed, 0 0 70px #92a3f8;
        }
        100% {
          box-shadow: 0 0 20px #75a2fc, 0 0 40px #363236, 0 0 60px #80ccef, 0 0 80px #4e6f86, 0 0 100px #6288e1, 0 0 120px #7bafed, 0 0 140px #92a3f8;
        }
      }
        .container {
          border: 1px solid #ccc; /* Add border to the container */
          display: flex;
          width: 100%; /* Adjust width if needed */
          background-color:gray;
          
        }

        .sidebar {
          width: ${isSidebarOpen ? '250px' : '0px'};
          height: 100vh;
          background: linear-gradient(to right, #0c2555,#75a2fc, #80ccef, #6288e1, #090e23);
          transition: width 0.3s;
          overflow: hidden;
          color: white;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 20px 0;
           
        }
        .sidebar li {
          margin-bottom: 10px;
          color: white;
          background-color: #333;
        }
        .sidebar a {
          text-decoration: none;
          color: white;
        }
        .sidebar .active {
          background-color: lightblue;
          font-weight: bold;
          color:black;
        }
        .content {
          flex:1;
          position: relative;
          padding: 20px;
          overflow-y: auto;
          position: relative;
          z-index: 0;
        }
        
        .content::before,
        .content::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          background: linear-gradient(to right, #75a2fc, #80ccef, #6288e1);
          animation: neonGlow 2s infinite alternate;
        }
        
        .content::before {
          top: -20px;
          bottom: -20px;
          border-radius: 10px;
        }
        
        .content::after {
          top: -20px;
          bottom: -20px;
          border-radius: 10px;
        }
        .toggle-button {
          position: absolute;
          top: 50%; 
          right: 0;
         transform: translate(0, -50%); 
        
         
          height: 30px; /* Adjust height as needed */
        }
        .toggle-bar {
          width: 30px;/* Adjust width as needed */
          height: 3px;
          background-color: black;
          transition: transform 0.3s;
          color:black;
        }
        .toggle-bar.middle {
          margin: 5px 0;
          color:black;
        }
       sidebar.selectedoption.active{
        background-colr:lightblue;
       }
       
        .sidebar .selected {
          background-color: #e0e0e0; /* Add your selected color here */
          font-weight: bold; /* Optionally make the text bold */
        }
        .adminlogo {
          display: flex;
          align-items: center;  
          margin-left: 0.2em;
      }
      
      .adminlogo h1 {
        font-size: 2em;
        margin-top: 0.7em;
        color: purple; /* Use a bluish color for the neon effect */
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff, 0 0 60px #fff, 0 0 70px #fff; /* Use a white glow effect */
      box-shadow: 14px 5px 20px rgba(14, 9, 9, 0.1);
      }
.adminlogo img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0px;
}


      `}</style>
            
      <div className="sidebar">
      <div className="adminlogo">
          <img src="orphanage_logo.png" alt="OrphanageHub Logo" />
         
            <h1>OrphanHub</h1>
          
            </div>
        <ul>
        <li onClick={() => handleOptionClick('dashboard')}>
  <div className={selectedOption === 'dashboard' ? 'active' : ''}>Dashboard</div>
</li>

          <li onClick={() => handleOptionClick('child-management')}>
            <div className={selectedOption === 'child-management' ? 'active' : ''}>Child Management</div>
          </li>
          <li onClick={() => handleOptionClick('user-management')}>
            <div className={selectedOption === 'user-management' ? 'active' : ''}>User Management</div>
          </li>
          <li onClick={() => handleOptionClick('adoption-requests')}>
            <div className={selectedOption === 'adoption-requests' ? 'active' : ''}>Adoption Requests</div>
          </li>
          <li onClick={() => handleOptionClick('donor-management')}>
            <div className={selectedOption === 'donor-management' ? 'active' : ''}>Donor Management</div>
          </li>
          <li onClick={() => handleOptionClick('sponsor-management')}>
            <div className={selectedOption === 'sponsor-management' ? 'active' : ''}>sponsor Management</div>
          </li>
          <li onClick={() => handleOptionClick('website-settings')}>
            <div className={selectedOption === 'website-settings' ? 'active' : ''}>Budget</div>
          </li>
        </ul>
      </div>
      <div className="content">
        {renderSelectedComponent()}
      </div>
      <button onClick={toggleSidebar}>
        <div className="toggle-bar top" />
        <div className="toggle-bar middle" />
        <div className="toggle-bar bottom" />
      </button>
    </div>
  );
};

export default AdminPage;
