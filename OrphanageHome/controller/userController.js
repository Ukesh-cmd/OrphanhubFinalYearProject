const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { sendMail } = require('../helpers/sendMail')
const randomstring = require('randomstring')

const jwt = require('jsonwebtoken');
const { JWT_SECRET_USER } = process.env

const { getConnection, pool } = require('../config/dbconnect');



const userRegister = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({ msg: "Database connection error" });
        }
        connection.query(
            `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`, [req.body.email],
            (err, result) => {
                if (err) {
                    connection.release();
                    return res.status(500).send({ msg: 'Error in query' });
                }
                if (result && result.length) {
                    connection.release();
                    return res.status(406).send({ msg: 'The email or password is already taken' });
                } else {
                    bcrypt.hash(req.body.password, 6, (err, hash) => {
                        if (err) {
                            connection.release();
                            return res.status(500).send({ msg: 'Hashing error' });
                        }
                        connection.query(
                            `INSERT INTO user (full_name, email, phone_number, address, password) VALUES (?, ?, ?, ?, ?)`, 
                            [req.body.name, req.body.email, req.body.phone_number, req.body.address, hash],
                            (err, result) => {
                                if (err) {
                                    connection.release();
                                    console.log(err);
                                    return res.status(500).send({ msg: 'Error in registration' });
                                }

                                const mailSubject = 'Mail Verification';
                                const randomToken = randomstring.generate();
                                const content = `<p>Hi ${req.body.full_name}, Please <a href="http://localhost:3005/mail-verification?token=${randomToken}">Verify</a> your Mail</p>`;

                                sendMail(req.body.email, mailSubject, content)
                                    .then(() => {
                                        connection.query(
                                            `UPDATE user SET token = ? WHERE email = ?`, [randomToken, req.body.email],
                                            (error, results) => {
                                                connection.release();
                                                if (error) {
                                                    console.error(error);
                                                    return res.status(400).send({ msg: 'Error updating token in the database' });
                                                }
                                                res.status(200).send({ msg: 'Verification email sent and token updated' });
                                            }
                                        );
                                    })
                                    .catch((error) => {
                                        connection.release();
                                        console.error(error);
                                        return res.status(500).send({ msg: 'Error sending verification email' });
                                    });
                            }
                        );
                    });
                }
            }
        );
    });
};

const userLogIn = (req, res) => {
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
            `SELECT userId, full_name, email, password FROM user WHERE email = ?;`, [req.body.email],
            async(err, result) => {
                connection.release();
                if (err) {
                    console.error("Database error: ", err)
                    return res.status(500).send({
                        msg: 'Database error'
                    });
                }

                if (!result.length) {
                    return res.status(401).send({
                        msg: 'Email or password is incorrect.'
                    });

                }

                const user = result[0];
                const storedHashedPassword = user.password;

                bcrypt.compare(req.body.password, storedHashedPassword,
                    (compareErr, passwordMatch) => {
                        if (compareErr || !passwordMatch) {
                            return res.status(401).send({
                                msg: 'Email or password is incorrect'
                            });
                        } else {
                            const token = generateToken(user.userId);

                            console.log('Login Successful');
                            return res.status(200).json({
                                msg: "Login Successful",
                                token,
                                user: result[0]
                            })
                        }
                    })

            }
        )
    })
};



const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET_USER, { expiresIn: '1h' });
}

const verifyMail = (req, res) => {
    var token = req.query.token;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send({
                msg: 'Database connection error'
            });
        }

        connection.query(`select * from user where token=? limit 1`, token, function(error, result, field) {
            if (error) {
                connection.release();
                console.log(error.message);
            }
            if (result.length > 0) {
                connection.query(`
            update user set token = null, is_verified = 1 where userId = '${result[0].id}'
            `);
                connection.release();
                return res.render('mail-verification', { message: 'Mail verified Seccessfully' })

            } else {
                connection.release();
                return res.render('404');
            }
        });
    });
};

const forgetPassword = (req, res) => {
    const errors = validationResult(req);
    console.log("forgetten");s

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    pool.getConnection((err, connection) => {
        var email = req.body.email;
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send({
                msg: 'Database connection error'
            });
        }
        connection.query(
            `SELECT * from user where email=? limit 1`, [email],
            function(error, result, fields){
                if(error){
                    connection.release();
                    return res.status(400).json({message:error});
                }
                if(result.length > 0){
                    let mailSubject = 'Reset Password';
                    const randomString = randomstring.generate();

                    let content = '<p>Hi, '+result[0].first_name+'\
                    please <a href="http://localhost:3005/reset-password?token='+randomString+'">Please click on below link to reset password</p>';

                    sendMail(email, mailSubject, content);
                    connection.query(
                        `INSERT INTO forget_password (email, token) VALUES(?,?)`,
                        [result[0].email, randomString],(err, result)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(result);
                            }
                        }
                    );
                    return res.status(200).send({
                        message:"Mail sent successfullyl"
                    })
                }
                return res.status(401).send({
                    message:"Email does not exist!"
                });
            }
        )
    })
}

const resetPasswordLoad = (req, res)=>{
    try {
        var token = req.query.token;
      
        if(token == undefined){
            res.render('404');
            console.log("not");
        }

        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Database error: ", err);
                return res.status(500).send({
                    msg: 'Database connection error'
                });
            }

            connection.query(
                `SELECT * FROM forget_password WHERE token = ? LIMIT 1`,
                [token],
                function(error, result, fields){
                    if(error){
                        connection.release();
                        console.log(error);
                    }
                    console.log("result from forgetpass"+result);
                    if(result !==undefined && result.length > 0){
                        
                        connection.query(
                            `SELECT * FROM user where email=? limit 1`, [result[0].email],
                            function(error, results, field){
                                if(error){
                                    connection.release();
                                    console.log(error);
                                }
                                

                                res.render('reset-password', {user:results[0]});
                            }
                        )
                    }
                    else
                        res.render('404');
                       
                }
            )
    })
    
    } catch (error) {
        console.log(error.message)
    }
}

const resetPassword=(req,res)=>{
    if(req.body.password != req.body.conform_password){
        res.render('reset-password', {error_message: 'Password not Matching', user:{id:req.body.user_id, email:req.body.email}});

    }

    bcrypt.hash(req.body.conform_password,10, (err, hash)=>{
        if(err){
            console.log(err);
        }
        pool.getConnection((err, connection)=>{
            connection.query(
                `DELETE FROM forget_password where email=?`,[req.body.email],
                (error, result)=>{
                    if(error)
                        connection.release();
                }
            );
            connection.query(
                `UPDATE user set password=? where userId=?`,[hash, req.body.user_id],
                (error, result)=>{
                    connection.release();
                }
            );
            res.render('message', {message:'Password reset successfully'})

        })
    })
}

const getUser = (req, res) =>{
    const authToken = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(authToken, JWT_SECRET_USER);

    pool.getConnection((err, connection)=>{
        connection.query(
            'SELECT * FROM user where userId=?', decode.id, 
            function(error, result, fields){
                if(error) throw error;

                return res.status(200).send({success:true, data:result[0], message:'Fetch succesful'});
            }
        )
    })
}

const showUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from user`,
            (err, data) => {
                
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                 }
                 const withoutPassword = data.map((user) => ({
                    id : user.userId,
                    full_name : user.full_name,
                    address : user.address,
                    email : user.email,
                    phone_number : user.phone_number,
                    password: undefined,
                 }))
                return res.json(withoutPassword)

            }
        )
    });
}

const countUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT COUNT(*) AS count from user`,
            (err, rows) => {

                connection.release();
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                const count = rows[0].count;
                return res.status(200).json(count);

            }
        )
    });
}


module.exports = {
    userRegister,
    userLogIn,
  
    verifyMail,
    getUser,
    forgetPassword,
    resetPasswordLoad,
    resetPassword,
    showUser,
    countUser
}