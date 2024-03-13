import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ChildManagement from './ChildManagement';
import UserManagement from './UserManagement';
import AdoptionRequests from './AdoptionRequests';
import WebsiteSettings from './WebsiteSettings';
import DonorManagement from  './DonorManagement';
import SponsorManagement from './SponsorManagement';
import { useRouter,Redirect } from 'next/router';
import Link from 'next/link';
const AdminPanel = () => {
  const { isAdmin, checkAdminStatus } = useAuth();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      await checkAdminStatus();
    };
  
    fetchAdminStatus();
  }, [checkAdminStatus]);
  
  if (!isAdmin) {
    
    return <Redirect to="/MainPage" />;
  }

 
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/child-management">Child Management</Link></li>
          <li><Link to="/admin/user-management">User Management</Link></li>
          <li><Link to="/admin/adoption-requests">Adoption Requests</Link></li>
          <li><Link to="/admin/donor-management">Donor Management</Link></li>
          <li><Link to="/admin/sponsor-management">Sponsor Management</Link></li>
          <li><Link to="/admin/website-settings">Budget</Link></li>
          
        </ul>
      </nav>

      {isAdmin && (
        <>
          <AdminDashboard />
          <ChildManagement />
          <UserManagement />
          <AdoptionRequests />
          <DonorManagement />
          <SponsorManagement />
          <WebsiteSettings />
        </>
      )}
    </>
  );
};

export default AdminPanel;
