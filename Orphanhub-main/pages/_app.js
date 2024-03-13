// import { useRouter } from 'next/router';
// import Navbar from './navbar';
// import '../styles/global.css';
// import AdminPanel from '../components/Admin/AdminPanel';
// import DonationPage from './DonationPage';
// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   const routesWithNavbar = ['/home', '/DonationPage', '/sponsor','/ChildDetailPage'];

//   return (
//     <div>
//       {routesWithNavbar.includes(router.pathname) && <Navbar />} 
//       <Component {...pageProps} />
//     </div>
//   );
// }

// export default MyApp;


// import { useRouter } from 'next/router';
// import Navbar from './navbar';
// import '../styles/global.css';
// import AdminPanel from '../components/Admin/AdminPanel';
// import DonationPage from './DonationPage';
// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   const routesWithNavbar = ['/home', '/DonationPage', '/sponsor','/ChildDetailPage','/ViewProfilePage'];

//   return (
//     <div>
//       {routesWithNavbar.includes(router.pathname) && <Navbar />} 
//       <Component {...pageProps} />
//     </div>
//   );
// }

// export default MyApp;

import { useRouter } from 'next/router';
import Navbar from './navbar';
import '../styles/global.css';
import AdminPanel from '../components/Admin/AdminPanel';
import DonationPage from './DonationPage';
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const routesWithNavbar = ['/home', '/DonationPage', '/sponsor','/ChildDetailPage','/ViewProfilePage'];

  return (
    <div>
      {routesWithNavbar.includes(router.pathname) && <Navbar />} 
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
