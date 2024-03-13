
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { sendMail } = require('../helpers/sendMail')
const randomstring = require('randomstring')

const jwt = require('jsonwebtoken');
const { JWT_SECRET_USER, JWT_SECRET } = process.env

const { getConnection, pool } = require('../config/dbconnect');

const login = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send({
                msg: 'Database connection error'
            });
        }
        
        connection.query(
            `SELECT userid, email, password FROM user WHERE email = ?;`, [req.body.email],
            async (err, userResult) => {
                if (err) {
                    connection.release();
                    console.error("Database error: ", err)
                    return res.status(500).send({ msg: 'Database error' });
                }
    
                if (userResult.length > 0) {
                    const user = userResult[0];
                    const storedHashedPassword = user.password;
    
                    bcrypt.compare(req.body.password, storedHashedPassword, (compareErr, passwordMatch) => {
                        if (compareErr || !passwordMatch) {
                            connection.release();
                            return res.status(400).send({ msg: 'Email or password is incorrect' });
                        }
    
                        const token = generateToken1(user.id);
                        console.log('User Login Successful');
                        connection.release();
                        return res.status(200).json({
                            msg: "User Login Successful",
                            token,
                            user: user,
                            role: "user"
                        });
                    });
                } else {
                    connection.query(
                        `SELECT id, email, password FROM admin_data WHERE email = ?;`, [req.body.email],
                        async (err, adminResult) => {
                            connection.release();
                            if (err) {
                                console.error("Database error: ", err);
                                return res.status(500).send({ msg: "Database error" });
                            }
                            
                            if (adminResult.length > 0) {
                                const admin = adminResult[0];
                                const storedHashedPassword = admin.password;
    
                                bcrypt.compare(req.body.password, storedHashedPassword, (compareErr, passwordMatch) => {
                                    if (compareErr || !passwordMatch) {
                                        return res.status(401).send({ msg: "Email or Password is incorrect" });
                                    }
    
                                    const token = generateToken(admin.id);
                                    console.log("Admin Login Successful", admin);
                                    return res.status(200).json({
                                        msg: "Admin Login Successful",
                                        token,
                                        admin: admin,
                                        role: "admin"
                                    });
                                });
                            } else {
                                return res.status(400).send({ msg: "Email or password is incorrect" });
                            }
                        }
                    );
                }
            }
        );
    });
    
};

const generateToken = (adminId) => {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '1h' });
};
const generateToken1 = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET_USER, { expiresIn: '1h' });
};

module.exports = {
    login
}