const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');




const donor = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `INSERT into donor (fullName, email, phoneNumber ) 
            VALUES (?,?,?)`, [req.body.fullName,  req.body.email, req.body.phoneNumber], 
            (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        msg: 'Error in registration'
                    });
                }
                return res.status(500).send({
                    msg: 'child registered'
                });
            }
        )

    })
}

const showDonor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from donor`,
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                 }

                 const donorData = rows.map((donor) => {
                    return {
                      id: donor.id,
                      name: donor.fullName,
                      email: donor.email,
                      amount: donor.amount,
                    
                      date: donor.time,
                      pid: donor.paymentId,
                      
                      // Add other properties as needed
                    };
                  });
               
                res.json(donorData)


              

            }
        )
    });
}


const getDonor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from donor`,
            (err, rows) => {
                connection.release();
                if (err) {
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

const getDonorById = (req, res) => {
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
                return res.json({
                    data: rows
                })

            }
        )
    });
}



const deleteDonor = (req, res) => {
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


const donationAmount = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT SUM(amount) AS totaldonation from donor`,
            (err, rows) => {

                connection.release();
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                const amountdonation = rows[0].totaldonation || 0;
                return res.status(200).json(amountdonation);

            }
        )
    });
}

module.exports = { donor, getDonorById, showDonor, deleteDonor, donationAmount };