const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getConnection, pool } = require('../config/dbconnect');

const register = async(req, res) => {

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({
                msg: 'Database connection error'
            });
        }
        connection.query(
            `SELECT * FROM admin_data WHERE LOWER(email) = LOWER(?)`, [req.body.email],
            (err, result) => {
                if (err) {
                    connection.release();
                    return res.status(500).send({
                        msg: 'Error in query'
                    });
                }
                if (result && result.length) {
                    connection.release();
                    return res.status(406).send({
                        msg: 'This email is already taken'
                    });
                } else {
                    bcrypt.hash(req.body.password, 6, (err, hash) => {
                        if (err) {
                            connection.release();
                            return res.status(500).send({
                                msg: 'hashing error'

                            });
                        }
                        connection.query(
                            `INSERT into admin_data (name, email, address, password)
                                VALUES (?, ?, ?, ?)`, [req.body.name, req.body.email, req.body.address, hash],
                            (err, result) => {
                                connection.release();
                                if (err) {
                                    return res.status(500).send({
                                        msg: 'error in registration'
                                    });
                                }
                                return res.status(200).send({
                                    msg: 'User has been registered'
                                })
                            }
                        )
                    });
                }
            }
        )
    })
}





const logIn = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Database connection error: ", err);
            return res.status(500).send({ msg: "Database connection error" })
        }
        connection.query(
            `SELECT id, email, password FROM admin_data WHERE email = ?;`, [req.body.email],
            async(err, result) => {
                connection.release();
                if (err) {
                    console.error("database error: ", err);
                    return res.status(500).send({ msg: "Database error" });
                }
                if (!result.length) {
                    return res.status(401).send({ msg: "Email or password is incorrect" })
                }
                const admin = result[0];
                const storedHashedPassword = admin.password;

                bcrypt.compare(req.body.password, storedHashedPassword,
                    (compareErr, passwordMatch) => {
                        if (compareErr || !passwordMatch) {
                            return res.status(401).send({ msg: "Email or Password is incorrecr" })

                        } else {
                            const token = generateToken(admin.id);
                            console.log("Login Successful");
                            return res.status(200).json({
                                msg: "Login Successful",
                                token,
                                admin: result[0]
                            });
                        }
                    });
            }
        )
    })


};

const generateToken = (adminId) => {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '1h' });
};




module.exports = {
    register,
    logIn
}