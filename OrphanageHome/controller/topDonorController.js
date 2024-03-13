const express = require('express');
const router = express.Router();
const { pool } = require('../config/dbconnect');

// const updateTopDonors = async(period, date){
  // try{
  //   pool.getConnection((err, connection) =>{
  //     connection.query(`SELECT`)
  //   })
  // }
// }
// const updateTopDonors = async (period, date) => {
//   try {
//     const connection = await pool.getConnection();
    
//     let quer = `
//       SELECT donor_email as email, SUM(amount) as totalAmount
//       FROM donor
//       WHERE donationDate = ?`;

//     if (period === 'daily') {
//       quer += ' AND DATE(donationDate) = ?';
//     } else if (period === 'monthly') {
//       quer += ' AND MONTH(donationDate) = MONTH(?) AND YEAR(donationDate) = YEAR(?)';
//     }

//     quer += ' GROUP BY donor_email ORDER BY totalAmount DESC LIMIT 3';

//     const [rows] = await connection.query(quer, [date, date, date]);

 
//     const currentDate = new Date().toISOString().split('T')[0];
//     await connection.query('DELETE FROM top_donors WHERE period = ? AND date = ?', [period, date]);
//     await connection.query('INSERT INTO top_donors (period, date, donor_name, amount) VALUES ?', [rows.map(donor => [period, currentDate, donor.fullName, donor.totalAmount])]);

//     connection.release();
//   } catch (error) {
//     console.error(`Error updating top ${period} donors:`, error);
//   }
// };

// // router.get('/topDonors/daily', async (req, res) => {
// //   const { date } = req.query;
// //   try {
// //     await updateTopDonors('daily', date);
// //     res.json({ success: true });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to update top daily donors' });
// //   }
// // });
const daily = async (req, res) => {
    // const { date } = req.query;
    // try {
    //   await updateTopDonors('daily', date);
    //   res.json({ success: true });
    // } catch (error) {
    //   res.status(500).json({ error: 'Failed to update top daily donors' });
    // }
    try{
      pool.getConnection((err, connection) =>{
        connection.query(`
        SELECT donor_name, donor_email, totalAmount, rank() OVER (order by totalAmount desc) as donationRank FROM(
          select  donor_name, donor_email, sum(amount) as totalAmount from top_donors where period= 'daily' group by donor_email, 
        donor_name
        ) as ranked;`, 
        async(err, rows)=>{
            connection.release();
            if(err){
              console.log(err);
            }
            const donor = rows.map((user) => ({
              full_name : user.donor_name,
              amount : user.totalAmount
           }))
          return res.json(donor)
            // return res.status(200).json({
            //   data:rows
            // })

        })
      })
    }catch(err){
      console.log(err);
    }
  }

// // router.get('/topDonors/monthly', async (req, res) => {
// //   const { date } = req.query;
// //   try {
// //     await updateTopDonors('monthly', date);
// //     res.json({ success: true });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to update top monthly donors' });
// //   }
// // });

const monthly = async (req, res) => {
  try{
    pool.getConnection((err, connection) =>{
      connection.query(`
      SELECT donor_name, donor_email, totalAmount, rank() OVER (order by totalAmount desc) as donationRank FROM(
        select  donor_name, donor_email, sum(amount) as totalAmount from top_donors  group by donor_email, 
      donor_name
      ) as ranked;`, 
      async(err, rows)=>{
          connection.release();
          if(err){
            console.log(err);
          }
          console.log(rows);
          const donor = rows.map((user) => ({
            full_name : user.donor_name,
            amount : user.totalAmount
         }))
        return res.json(donor)
      })
    })
  }catch(err){
    console.log(err);
  }

}


module.exports = {
   
   monthly,
   daily
};