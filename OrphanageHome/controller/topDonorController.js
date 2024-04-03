const express = require('express');
const router = express.Router();
const { pool } = require('../config/dbconnect');


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