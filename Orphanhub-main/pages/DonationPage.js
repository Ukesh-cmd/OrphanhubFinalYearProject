// import React, { useState, useEffect } from 'react';
// import DonationForm from '../components/DonationForm';
// import { useRouter } from 'next/router';
// import Navbar from './navbar';
// import Typed from 'react-typed';
// import Link from 'next/link';

// const DonationPage = () => {
//   const [showDonationForm, setShowDonationForm] = useState(false);
//   const [typingComplete, setTypingComplete] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (router.pathname === '/DonationPage') {
//       setShowDonationForm(true);
//     } else {
//       setShowDonationForm(false);
//     }
//   }, [router.pathname]);

//   const handleTypingComplete = () => {
//     setTypingComplete(true);
//   };

//   const handleDonationFormClose = () => {
//     setShowDonationForm(false);
//   };

//   return (
//     <div>
     
//       <div className="goals-container">
//         <div className="goal vision">
//           <h2>Your Donation ensures a brighter future for the Orphans.</h2>
//         </div>
//         <div className="goal mission">
//           <h3>Our Mission</h3>
//           <div className="typed-container">
//             <p>Our mission is to provide orphans and vulnerable childrens with access to quality education, healthcare, 
//             <Typed
//               strings={[
//                 'and a nurturing environment, empowering them to break the cycle of poverty and reach their full potential. We strive to create sustainable solutions that address the unique needs of each child, working closely with communities to foster a sense of belonging and support.'
//               ]}
//               typeSpeed={9}
//               backSpeed={1}
//               loop={false}
//               onComplete={handleTypingComplete} // Call the handler when typing completes
//             /></p>
//           </div>
//         </div>
//       </div>
//       {showDonationForm && (
//         <DonationForm
//           onClose={handleDonationFormClose}
//         />
//       )}
//         <section className="donation-box">
//             <h3>Support Us</h3>
//             <div className="logos">
//               <img src="orphanage_logo.png" alt="OrphanageHub Logo" />
//               <h1>OrphanHub</h1>
//               <div className="statement">
//                 <p>"Transforming Lives, One Click at a Time:<br />
//                 OrphanHub, Impacting Futures."</p>
//               </div>
//             </div>

//             <p>Your contribution can make a difference in the lives of these children. Help us create a better future for them.</p>
//             <Link href="/DonationPage">
//   <button className="donate-button">Donate Now</button>
// </Link>

//           </section>
//     </div>
//   );
// };

// export default DonationPage;


import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { useRouter } from 'next/router';
import Typed from 'react-typed';
import axios from 'axios'; 
import Feeters from './feeters';
import { baseURL } from '../util/constant';

const DonationPage = () => {
  const [topDonorsDaily, setTopDonorsDaily] = useState([]);
  const [topDonorsMonthly, setTopDonorsMonthly] = useState([]);

  useEffect(()=>{
    topDonorD();
  },[]);

  const topDonorD = async()=>{
    try{
      const result = await axios.get(`${baseURL}/daily`);
      console.log(result);
      setTopDonorsDaily(result.data);
    }catch(err){console.log(err)}
  }

  useEffect(()=>{
    topDonorM();
  },[]);

  const topDonorM = async()=>{
    try{
      const result = await axios.get(`${baseURL}/monthly`);
      setTopDonorsMonthly(result.data);
    }catch(err){console.log(err)}
  }
  
  // useEffect(() => {
  //   const fetchTopDonors = async () => {
  //     try {
  //       const today = new Date().toLocaleDateString();
  //       const thisMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  //       const dailyResponse = await axios.get('http://localhost:3005/api/daily', {
  //         params: { date: today },
  //       });

  //       const monthlyResponse = await axios.get('http://localhost:3005/api/monthly', {
  //         params: { date: thisMonth },
  //       });

  //       setTopDonorsDaily(dailyResponse.data);
  //       setTopDonorsMonthly(monthlyResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching top donors:', error);
  //     }
  //   };

  //   fetchTopDonors();
  // }, []);

  // const handlePaymentSuccess = async (donorInfo, donationAmount) => {
  //   try {
  //     const response = await axios.post('http://localhost:3005/api/payment/process', {
  //       fullName: donorInfo.name,
  //       email: donorInfo.email,
  //       amount: donationAmount,
  //       cardNumber: donorInfo.cardNumber,
  //       expMonth: donorInfo.expMonth,
  //       expYear: donorInfo.expYear,
  //       cvc: donorInfo.cvc,
  //     });

  //     if (response.status === 200) {
  //       fetchTopDonors(); 
  //       console.log('Donation successful!');
  //     } else {
  //       console.log('Failed to process donation.');
  //     }
  //   } catch (error) {
  //     console.error('Error processing donation:', error);
      
  //     console.error('Error fetching top donors:', error.response);
  //   }
  // };
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/DonationPage') {
      setShowDonationForm(true);
    } else {
      setShowDonationForm(false);
    }
  }, [router.pathname]);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  const handleDonationFormClose = () => {
    setShowDonationForm(false);
  };


  return (
    <div>
      <div className="goals-container">
        <div className="goal vision">
          <h2>Your Donation ensures a brighter future for the Orphans.</h2>
        </div>
        <div className="goal mission">
          <h3>Our Mission</h3>
          <div className="typed-container">
            <p>Our mission is to provide orphans and vulnerable children with access to quality education, healthcare, 
            <Typed
              strings={[
                'and a nurturing environment, empowering them to break the cycle of poverty and reach their full potential. We strive to create sustainable solutions that address the unique needs of each child, working closely with communities to foster a sense of belonging and support.'
              ]}
              typeSpeed={9}
              backSpeed={1}
              loop={false}
              onComplete={handleTypingComplete}
            /></p>
          </div>
        </div>
      </div>
      {showDonationForm && (
        <DonationForm
          onClose={handleDonationFormClose}
          // onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    <div className="top-donors">
        <h3>Top Donors of the Day</h3>
        <table className="top-donors-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Donated Amount</th>
            </tr>
          </thead>
          <tbody>
            {topDonorsDaily.map((donor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{donor.full_name}</td>
                <td>{donor.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="top-donors">
        <h3>Top Donors of the Month</h3>
        <table className="top-donors-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Donated Amount</th>
            </tr>
          </thead>
          <tbody>
            {topDonorsMonthly.map((donor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{donor.full_name}</td>
                <td>{donor.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Feeters/>
    </div>
  );
};

export default DonationPage;
