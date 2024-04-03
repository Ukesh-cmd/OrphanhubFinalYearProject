const multer = require('multer')
const path = require('path')
const moment = require('moment')
const fs = require('fs')
const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');

const { upload } = require('../middleware/image')


const registerChild = (req, res) => {
    // console.log('Req File:', req.file);
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
        const dob = req.body.DOB;
        const dobDate = moment(dob);
        const formattedDOB = dobDate.format('YYYY-MM-DD');
        
        const imageBuffer = fs.readFileSync(req.file.path);

        // Log the file data to check if it's present
        console.log('Image Buffer:', imageBuffer);
        const image = imageBuffer;
        connection.query(
            `INSERT into child_detail (full_name, date_of_birth, gender, enrol_date, hobbies, health, image, personality) 
            VALUES (?,?,?,?,?,?,?,?)`, [req.body.full_name, formattedDOB, req.body.gender, req.body.enrol_date, req.body.hobbies, req.body.health, image, req.body.personality],
            (err, result) => {  
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in registration'
                    });
                }
                if (result && result.affectedRows > 0) {
                    console.log('Data inserted successfully');
                    console.log('Inserted rows:', result.affectedRows);
                    return res.status(200).send({
                        msg: 'child registered'
                    });
                  }
                return res.status(200).send({
                    msg: 'child registered'
                });
            }
        )

    })

}

const showChild = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from child_detail`,
            (err, data) => {
                
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                

                const childData = data.map((child) => {
                    const dobMoment = moment(child.date_of_birth);
                    const formattedDOB = dobMoment.format('YYYY-MM-DD');
              
                    const enrollMoment = moment(child.enrol_date); 
                    const formattedED = enrollMoment.format('YYYY-MM-DD'); 
                    const base64= Buffer.from(child.image, 'binary').toString('base64');
                    const imageUrl = `data:image/jpeg;base64,${base64}`;
                    return {
                      childId: child.childId,
                      full_name: child.full_name,
                      gender: child.gender,
                      health: child.Healtth,
                      DOB: formattedDOB,
                      address: child.address,
                      hobbies: child.hobbies,
                      health: child.health,
                      enrol_date: formattedED,
                      image: imageUrl
                      // Add other properties as needed
                    };
                  });
                res.setHeader('Content-Type','image/jpeg');
                res.json(childData)

            }
        )
    });
}
const getChildById = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from child_detail where childId = ?`, [req.params.id],
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

const updateChildDetail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        const dob = req.body.DOB;
        const dobDate = moment(dob);
        const formattedDOB = dobDate.format('YYYY-MM-DD');
        
        const imageBuffer = fs.readFileSync(req.file.path);

        // Log the file data to check if it's present
        console.log('Image Buffer:', imageBuffer);
        const image = imageBuffer;
        connection.query(
            `UPDATE  child_detail  SET full_name=?, date_of_birth=?, gender=?, enrol_date=?, hobbies=?, health=?, image=?, personality=? where childId=? 
            `, [req.body.full_name, formattedDOB, req.body.gender, req.body.enrol_date, req.body.hobbies, req.body.health, image, req.body.personality, req.params.id],
            (err, result) => {  
                connection.release();
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        msg: 'Error in registration'
                    });
                }
                if (result && result.affectedRows > 0) {
                    console.log('Data inserted successfully');
                    console.log('Inserted rows:', result.affectedRows);
                    return res.status(200).send({
                        msg: 'child registered'
                    });
                  }
                return res.status(200).send({
                    msg: 'child registered'
                });
            }
        )

    })
}

const deleteChild = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `DELETE from child_detail where childId = ?`, [req.params.id],
            (err, rows) => {

                connection.release();
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                return res.status(200).json({
                    data: rows
                })

            }
        )
    });
}

const countChild = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT COUNT(*) AS count from child_detail`,
            (err, rows) => {

                connection.release();
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                const totalcount = rows[0].count;
                return res.status(200).json(totalcount);

            }
        )
    });
}


module.exports = { registerChild, showChild, getChildById, updateChildDetail, deleteChild, searchChildren, getRecommendedChildren, countChild};