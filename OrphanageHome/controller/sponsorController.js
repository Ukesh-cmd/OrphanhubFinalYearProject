const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');






const showSponsor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from sponsor`,
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                 }
                 const sponsorData = rows.map((sponsor) => {
                    return {
                      id: sponsor.sponsorId,
                      name: sponsor.sponsorName,
                      email: sponsor.sponsorEmail,
                      phone: sponsor.phone,
                 
                      // Add other properties as needed
                    };
                  });
                  res.json(sponsorData)

            }
        )
    });
}

const showSponsorChild = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from sponsor_child`,
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                 }
                 const sponsorData = rows.map((sponsor) => {
                    return {
                      id: sponsor.sid,
                      sname: sponsor.sponsorName,
                      email: sponsor.sponsorEmaill,
                      childName: sponsor.childName,
                      sponsorId : sponsor.sponsorId,
                      childId: sponsor.childId,
                      amount: sponsor.amount,
                      date : sponsor.startDate
                 
                      // Add other properties as needed
                    };
                  });
                  res.json(sponsorData)

            }
        )
    });
}

const getSponSorById = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from donor where id = ?`, [req.params.id],
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }

            }
        )
    });
}



const deleteSponsor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `DELETE from donor where id = ?`, [req.params.id],
            (err, rows) => {

                connection.release();
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                return res.json({
                    data: rows
                })

            }
        )
    });
}
const topDonor = (req, res)=>{
    
}

module.exports = { getSponSorById, showSponsor, deleteSponsor, showSponsorChild };