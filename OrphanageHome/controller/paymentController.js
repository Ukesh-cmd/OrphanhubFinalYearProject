// const { validationResult } = require('express-validator');

// const { getConnection, pool } = require('../config/dbconnect');
// const { STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY } = process.env;
// const stripe = require('stripe')(STRIPE_SECRET_KEY)
const { sendMail } = require('../helpers/sendMail')
// const donation = (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try{
//         const { donorInfo, donationAmount, paymentMethodId } = req.body;
//         const paymentIntent = stripe.paymentIntents.create({
//             amount: donationAmount,
//             currency : 'usd',
            
//             // payment_method : tid,
//             // confirm:true,
//             // return_url: 'http://localhost:3000/DonationPage'
//             // payment_method_data: {
//             //     type:'card',
//             //     card: {
//             //         number: token.card_number,
//             //         exp_month: token.exp_month,
//             //         exp_year: token.exp_year,
//             //         cvc: token.cvc,
//             //     }
//             // }
//         });
//         const currentDate = new Date();
        

//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return res.status(400).send({
//                     msg: "connection error"
//                 });
//             }
            
//             connection.query(
//                 'INSERT INTO donor (fullName, email,amount, paymentId, time) VALUES (?,?,?,?,?)',
//                 [donorInfo.name, donorInfo.email , donationAmount,paymentIntent.id, currentDate], (err, result)=>{
                    
//                     if(err){
//                         connection.release();
//                         console.log(err);
//                     }
//                     console.log("success");
//                     // return res.status(200).send("sucess");
//                     // res.json({ client_secret: paymentIntent.STRIPE_PUBLISH_KEY });

                    // const mailSubject = 'Mail Verification';
                    
                    // const content = `<p>Hi ${donorInfo.name} ; Thank you for Rs${donationAmount} donation to our orphanage home. with paymentId: ${paymentMethodId}</p>`;

                    // sendMail(donorInfo.email, mailSubject, content)
                    //     .then(() => {
                    //         return res.status(200).send({ msg: 'Error sending verification email' });
                    //     })
                    //     .catch((error) => {
                    //              connection.release();
                    //             console.error(error);
                    //             return res.status(500).send({ msg: 'Error sending verification email' });
                    //     });
//                 }
//             )
//         })

//     }catch (error){
//         console.log(error)
//         res.status(500).json({error: "Payment failed"});

//     }
// }

// const sponsor = (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try{
//         const { sponsorInfo, donationAmount, childInfo } = req.body;
//         const paymentIntent = stripe.paymentIntents.create({
//             amount: donationAmount,
//             currency : 'usd',
//             // payment_method : tid,
//             // confirm:true,
//             // return_url: 'http://localhost:3000/DonationPage'
//             // payment_method_data: {
//             //     type:'card',
//             //     card: {
//             //         number: token.card_number,
//             //         exp_month: token.exp_month,
//             //         exp_year: token.exp_year,
//             //         cvc: token.cvc,
//             //     }
//             // }
//         });
//         const currentDate = new Date();
        

//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return res.status(400).send({
//                     msg: "connection error"
//                 });
//             }
            
//             connection.query(
//                 'INSERT INTO sponsor (sponsorName, childName ,amount, sponsorType, date, childId, sponsorId) VALUES (?,?,?,?,?)',
//                 [sponsorInfo.name, childInfo.name , sponsorAmount,sponsorType , currentDate, childInfo.childId, sponsorId], (err, result)=>{
//                     connection.release();
//                     if(err){
//                         console.log(err);
//                     }
//                     console.log("success");
//                     return res.status(200).send("sucess");
//                     // res.json({ client_secret: paymentIntent.STRIPE_PUBLISH_KEY });
//                 }
//             )
//         })

//     }catch (error){
//         console.log(error)
//         res.status(500).json({error: "Payment failed"});

//     }
// }


const { validationResult } = require('express-validator');
const { pool } = require('../config/dbconnect');
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

//Donation
const donation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { donorInfo, donationAmount, token } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: donationAmount,
            currency: 'usd',
            payment_method_data:{ 
                type : 'card',
                card:{
                    token: token.id,
            }
            },
            // automatic_payment_methods: true,
            confirm: true,
            return_url:'http://localhost:3000/DonationPage'
        });
        const currentDate = new Date();

        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(400).send({
                    msg: "connection error"
                });
            }

            connection.query(
                'INSERT INTO donor (fullName, email, amount, paymentId, time) VALUES (?,?,?,?,?)',
                [donorInfo.name, donorInfo.email, donationAmount, paymentIntent.id, currentDate],
                async (err, result) => {
                    // connection.release();
                    if (err) {
                        connection.release();
                        console.log(err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    console.log("Donation successful");
                    connection.query(
                        'INSERT INTO top_donors (donor_name, amount, date, period, donor_email) VALUES (?,?,?,?,?)',
                        [donorInfo.name, donationAmount, currentDate, "daily", donorInfo.email], 
                        async(err, result)=>{
                            if(err){
                                connection.release();
                                console.log(err);
                            }
                            connection.query(
                                'SELECT date from top_donors',async(err, result)=>{
                                    if(err){
                                        connection.release();
                                        console.log(err);
                                    }
                                    const date = result.date;
                                    const monthly= 'monthly';
                                    connection.query(
                                        `UPDATE top_donors set period = ? where DATE(date) != CURDATE()`, [monthly],
                                       async (err, result)=>{
                                            if(err){
                                                console.log(err);
                                            }

                                            const mailSubject = 'Donation amount Received';
                    
                                            const content = `<p>Hi ${donorInfo.name} ; Thank you for Rs${donationAmount} donation to our orphanage home. with paymentId: ${paymentIntent.id}</p>`;

                                            sendMail(donorInfo.email, mailSubject, content)
                                                .then(() => {
                                                    return res.status(200).send({ msg: 'Error sending verification email' });
                                                })
                                                .catch((error) => {
                                                        connection.release();
                                                        console.error(error);
                                                        return res.status(500).send({ msg: 'Error sending verification email' });
                                                });

                                        }
                                    )
                                }
                            )
                        }
                        )  
                }
            )
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Payment failed" });
    }
}



// const sponsor = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
        
//         const { sponsorInfo, sponsorAmount, id, name ,token } = req.body;
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: sponsorAmount,
//             currency: 'usd',
//             payment_method_data:{ 
//                 type : 'card',
//                 card:{
//                     token: token.id,
//             }
//             },
//             // automatic_payment_methods: true,
//             confirm: true,
//             return_url:'http://localhost:3000/sponso'
//         });
//         const currentDate = new Date();

//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return res.status(400).send({
//                     msg: "connection error"
//                 });
//             }
//             connection.query(
//                 `SELECT * FROM sponsor WHERE sponsorEmail = ?`,[sponsorInfo.email],
//                (err, result) =>{
//                     if(err){
//                         connection.release();
//                     }
//                     if(result.length > 0){
//                         connection.query(`UPDATE sponsor_child SET(amount, date) = (?,?) where sponsorEmail = ?`,
//                         [sponsorAmount, currentDate, sponsorInfo.email]),(err, rows)=>{
//                             if(err){
//                                 connection.release();
//                             }

//                             const mailSubject = 'Sponsor amount Received';
//                             const content = `<p>Dear ${sponsorInfo.name} ; Thank you for sponsoring the amount of $${sponsorAmount}  to ${childInfo.cname} of our orphanage home. with paymentId: ${paymentIntent.id}</p>`;

//                             sendMail(sponsorInfo.email, mailSubject, content)
//                                 .then(() => {
//                                      return res.status(200).send({ msg: 'Error sending verification email' });
//                                 })
//                                 .catch((error) => {
//                                     connection.release();
//                                     console.error(error);
//                                     return res.status(500).send({ msg: 'Error sending verification email' });
//                                 });
//                         }
//                     }
//                     else{
//                         connection.query(`INSERT INTO sponsor (sponsorName, sponsorEmail) VALUES (?,?)`,[sponsorInfo.name, sponsorAmount],
//                         (err, result) =>{
//                         connection.query(`INSERT INTO sponsor_child (sponsorName, sponsorId, sponsorEmail ,childName, childId, sponsorType, amount, date) VALUES(?,?,?,?,?,?,?,?)`,
//                         [sponsorInfo.name, sponsorInfo.id, sponsorInfo.email, name, id, sponsorInfo.type ,sponsorAmount, currentDate]),(err, rows)=>{
//                             if(err){
//                                 connection.release();
//                             }

//                             const mailSubject = 'Sponsor amount Received';
//                             const content = `<p>Dear ${sponsorInfo.name} ; Thank you for sponsoring the amount of $${sponsorAmount}  to ${childInfo.cname} of our orphanage home. with paymentId: ${paymentIntent.id}</p>`;

//                             sendMail(sponsorInfo.email, mailSubject, content)
//                                 .then(() => {
//                                      return res.status(200).send({ msg: 'Error sending verification email' });
//                                 })
//                                 .catch((error) => {
//                                     connection.release();
//                                     console.error(error);
//                                     return res.status(500).send({ msg: 'Error sending verification email' });
//                                 });
//                         }})
//                     }
//                 }
//             )   
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Payment failed" });
//     }
// }
const sponsor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { sponsorInfo, sponsorAmount, id, name, token } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: sponsorAmount,
            currency: 'usd',
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id,
                }
            },
            confirm: true,
            return_url: 'http://localhost:3000/sponso'
        });
        const currentDate = new Date();

        console.log(sponsorInfo, sponsorAmount, name);
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(400).send({
                    msg: "connection error"
                });
            }
            connection.query(
                'SELECT * FROM sponsor WHERE sponsorEmail = ?',
                [sponsorInfo.email],
                (err, result) => {
                    if (err) {
                        connection.release();
                    }
                    if (result.length > 0) {
                        connection.query(
                            'UPDATE sponsor_child SET amount = ?, date = ? WHERE sponsorEmail = ?',
                            [sponsorAmount, currentDate, sponsorInfo.email],
                            (err, rows) => {
                                if (err) {
                                    connection.release();
                                }

                                const mailSubject = 'Sponsor amount Received';
                                const content = `<p>Dear ${sponsorInfo.name}; Thank you for sponsoring the amount of $${sponsorAmount} to ${name} of our orphanage home. with paymentId: ${paymentIntent.id}</p>`;

                                sendMail(sponsorInfo.email, mailSubject, content)
                                    .then(() => {
                                        
                                        return res.status(200).send({ msg: 'Email sent successfully' });
                                    })
                                    .catch((error) => {
                                        connection.release();
                                        console.error(error);
                                        return res.status(500).send({ msg: 'Error sending verification email' });
                                    });
                            }
                        );
                    } else {
                        connection.query(
                            'INSERT INTO sponsor (sponsorName, sponsorEmail) VALUES (?, ?)',
                            [sponsorInfo.name, sponsorInfo.email],
                            (err, result) => {
                                if(err){
                                    connection.release(); 
                                }
                                connection.query(
                                    'INSERT INTO sponsor_child (sponsorName, sponsorId, sponsorEmaill, childName, childId, sponsorType, amount, startDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                                    [sponsorInfo.name, sponsorInfo.id, sponsorInfo.email, name, id, sponsorInfo.type, sponsorAmount, currentDate],
                                    (err, rows) => {
                                        if (err) {
                                            connection.release();
                                        }

                                        const mailSubject = 'Sponsor amount Received';
                                        const content = `<p>Dear ${sponsorInfo.name}; Thank you for sponsoring the 
                                        amount of $${sponsorAmount} to ${name} of our orphanage home. with paymentId: ${paymentIntent.id}</p>`;

                                        sendMail(sponsorInfo.email, mailSubject, content)
                                            .then(() => {
                                                
                                                return res.status(200).send({ msg: 'Email sent successfully' });
                                            })
                                            .catch((error) => {
                                                connection.release();
                                                console.error(error);
                                                return res.status(500).send({ msg: 'Error sending verification email' });
                                            });
                                    }
                                );
                            }
                        );
                    }
                }
            );

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Payment failed" });
    }
};


const reminderSponsor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT (sponsorName, sponsorEmail, sponsorType) from sponsor_child`,
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }
                 rows.map((key)=>{
                    if(key.sponsorType = 'Monthly'){
                        const mailSubject = 'Sponsor Reminder';
                        const content = `<p>Dear ${key.sponsorName} ; this is your weekly reminder of sponsor.</p>`;

                        sendMail(key.sponsorEmail, mailSubject, content);
                    }
                    else{
                        const mailSubject = 'Sponsor Reminder';
                        const content = `<p>Dear ${key.sponsorName} ; this is your Monthly reminder of sponsor.</p>`;

                        sendMail(key.sponsorEmail, mailSubject, content);
                    }

                 })
            }
        )
    });
}



module.exports= {donation, sponsor, reminderSponsor};


