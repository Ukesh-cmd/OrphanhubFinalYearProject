const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');




const registerStaff = (req, res) => {
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
            `INSERT into staff (fullName, date_of_birth, gender, join_date, email, phoneNumber) 
            VALUES (?,?,?,?,?,?)`, [req.body.fullName, req.body.DOB, req.body.gender, req.body.joinDate, req.body.email, req.body.phoneNumber],
            (err, result) => {

                connection.release();
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        msg: 'Error in registration'
                    });
                }
                return res.status(500).send({
                    msg: 'Staff registered'
                });
            }
        )

    })

}

const showStaff = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from staff`,
            (err, data) => {
                
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                return res.json(data)

            }
        )
    });
}

const staffAttendence = (req, res) => {
    let { staffId, attendence } = req.body;

    if (!staffId || attendence === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                msg: 'Database connection error',
            });
        }
        const date = new Date();
        attendence = attendence ? 1 : 0;
        const updateQuery = 'INSERT INTO staffattendence (staffId, date, status) VALUES (?,?,?)';
        connection.query(updateQuery, [staffId, date, attendence], (error, result) => {
            connection.release();

            if (error) {
                console.log(error);
                return res.status(500).json({
                    msg: 'Error updating checkbox state in the database',
                });
            }

            return res.status(200).json({
                msg: 'Checkbox state updated successfully',
            });
        });
    });
}
module.exports = { registerStaff, showStaff, staffAttendence }