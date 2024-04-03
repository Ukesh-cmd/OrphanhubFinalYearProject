const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');
const { sendMail } = require('../helpers/sendMail');
const fs = require('fs')
const { connect } = require('../routes/loginRoute');
const path = require('path');
const PDFDocument = require('pdfkit')



const adopter = (req, res) => {
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
        const {marriageCertificate, policeClerance, addoptionform, identificationProof} = req.files;
        // if(!marriageCertificate || ! policeClerance || !addoptionform || !identificationProof){
        //     return res.status(400).json({mas: "image not found"})
        // }
        const image1 = marriageCertificate ? fs.readFileSync(marriageCertificate[0].path):null;
        const image2 = policeClerance ? fs.readFileSync(policeClerance[0].path):null;
        const image3 = addoptionform ? fs.readFileSync(addoptionform[0].path):null;
        const image4 = identificationProof ? fs.readFileSync(identificationProof[0].path):null
        const name = req.body.name;
        connection.query(
            `INSERT into adopter (fullName, email, phoneNumber, occupation, maritalStatus,age, financialStability, address,  marrigeCertificate, policeClerance, addoptionform, identificationProof ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, [name,  req.body.email, req.body.phone, req.body.occupation, req.body.maritalStatus, req.body.age ,req.body.financialStability, req.body.address,  image1, image2, image3, image4], 
            (err, result) => {
                
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        msg: 'Error in adopter registration'
                    });
                }
                const adopterId = result.insertId;
                const adopterName = name;
                const adopterEmail = req.body.email;
                console.log(adopterName);

                
                return res.status(200).json({
                    adopterId : adopterId,
                    adopterName : adopterName,
                    adopterEmail: adopterEmail,
                    msg: "success",
                })
            }
        )

    })
}




const showAdopter = () => {
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(400).send({
                    msg: "connection error"
                });
            }
            connection.query(
                `SELECT * from adopter where adopterId = 34`,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err)
                     }
                    resolve(rows)
                
                }
            )
        });
    })
}

const cpdf = async()=>{
    try{
        const adopterData = await showAdopter();
        console.log(adopterData);
        const base641= Buffer.from(adopterData.marriageCertificate, 'binary').toString('base64');
        const imageUrl1 = base641 ? `data:image/${base641.includes('png') ? 'png' : 'jpeg'};base64,${base641}` : null;
        const base642= Buffer.from(adopterData.policeClerance, 'binary').toString('base64');
        const imageUrl2 = base642 ? `data:image/${base642.includes('png') ? 'png' : 'jpeg'};base64,${base642}` : null;
        const base643= Buffer.from(adopterData.identificationProof, 'binary').toString('base64');
        const imageUrl3 = base643 ? `data:image/${base643.includes('png') ? 'png' : 'jpeg'};base64,${base643}` : null;
        const base64= Buffer.from(adopterData.addoptionform, 'binary').toString('base64');
        const imageUrl = base64 ? `data:image/${base64.includes('png') ? 'png' : 'jpeg'};base64,${base64}` : null;
    const doc = new PDFDocument();
    const fileName = `${adopterData.fullName}.pdf`;
    const stream = fs.createWriteStream(fileName);
    doc.pipe(stream);

    doc.fontSize(20).text(`${adopterData.fullName} Data`, {align:'center'}).moveDown(1);
    adopterData.forEach
        (element => {
        doc.fontSize(12).text(`ID: ${element.adopterId} \n
            Name: ${element.fullName}\n
            Email: ${element.email}\n
            phone Number : ${element.phoneNumber}\n
            Age : ${element.age}\n
            Occupation: ${element.occupation}\n
            Address: ${element.address}\n`, {align: 'left'})

        doc.image(`    Marital Status: ${element.maritalStatus}\n
            Identification Proof : ${imageUrl}\n
            Marriage Certificate: ${imageUrl2}\n
            Police Clerance: ${imageUrl3}\n

              `,{align: 'left'}).moveDown(0.5)

    });
    doc.end();
    }catch(err){
        console.log(err);
    }
}
const pdfShow = (req, res)=>{
    const show = cpdf();
    return res.json(show);

}

const getAdopterById = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        const adopterId = req.params.id;

        connection.query(
            `SELECT * FROM adopter WHERE adopterId = ?`,
            [adopterId],
            (err, rows) => {
                connection.release();

                if (err) {
                    return res.status(500).json({
                        msg: 'Error in fetching data'
                    });
                }

                if (rows.length === 0) {
                    return res.status(404).json({
                        msg: 'Adopter not found'
                    });
                }
                
                const adopterData = rows.map((adopte) => {
                    
                    const imageUrl = getImageUrl(adopte.marriageCertificate);
                    const imageUrl1 = getImageUrl(adopte.policeClerance);
                    const imageUrl2 = getImageUrl(adopte.identificationProof);
                    const imageUrl3 = getImageUrl(adopte.addoptionform);
                    return {
                      fullName: adopte.fullName,
                      email: adopte.email,
                      phone: adopte.phoneNumber,
                      occupation: adopte.occupation,
                      age: adopte.age,
                      maritalStatus: adopte.maritalStatus,
                      financialStability: adopte.financialStability,
                      address: adopte.address,
                      image: imageUrl,
                      image1: imageUrl1,
                      image2: imageUrl2,
                      image3: imageUrl3,
                      // Add other properties as needed
                    };
                  });
                  res.setHeader('Content-Type','image/jpeg');
                    res.json(adopterData);

            }
        )
    });
}
const getImageUrl = (binaryImage) => {
    if (binaryImage) {
        const base64 = Buffer.from(binaryImage, 'binary').toString('base64');
        return `data:image/jpeg;base64,${base64}`;
    }
    return null;
}

const adoptChild = (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { adopterId, childId, childName, adopterName, adopterEmail } = req.body;
    console.log(adopterId);
    // Validate the request body
    if (!adopterId || !childId) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    // Save the adoption request to the MySQL database
    pool.getConnection((err, connection) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to connect to the database' });
        }
        const date = new Date();
        const sql = 'INSERT INTO adoption (childName, adopterName, adopterId, childId, reqstatus, date, adopterEmail) VALUES (?,?,?,?, ?, ?, ?)';
        const values = [childName,adopterName, adopterId, childId, 'Pending', date, adopterEmail];

        connection.query(sql, values, (err, result) => {
        

        if (err) {
            connection.release();
            console.log(err);
            return res.status(500).json({ error: 'Failed to save adoption request' });
        }

        //Send Email 
        const mailSubject = 'Adoption Request';
                    
        const content = `<p>Hello ${adopterName}, We recived your request to addopt a child name ${childName}.
                            We are reviewing your documents. We will send email about the update of your request. </p>`;

            sendMail(adopterEmail, mailSubject, content)
                .then(() => {
                    return res.status(200).send({ msg: 'Email sent' });
                })
                .catch((error) => {
                         connection.release();
                        console.error(error);
                        return res.status(500).send({ msg: 'Error sending verification email' });
                });
        

        
        });
  });
}

const adoptionRequest = (req, res) => {
    // Fetch adoption requests from the MySQL database
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to connect to the database' });
      }
  
      const sql = 'SELECT * FROM adoption';
      
      connection.query(sql, (err, result) => {
        connection.release();
  
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch adoption requests' });
        }
  
        // Return adoption requests as JSON response
        res.json(result);
      });
    });
}

const handleRequest = (req, res) => {
    const requestId = req.params.id;
    const { reqstatus } = req.body;
  
    console.log(reqstatus);
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to connect to the database' });
      }
      connection.query(`update adoption set reqstatus = ? where adoptionId = ?`, [reqstatus, requestId],
      (err, result) =>{
        
        if(err){
            
            if(err){
                connection.release();
                console.log(err);
            }
        } 
        if (result.changedRows > 0) {
            connection.query('SELECT * from adoption where adoptionId = ?', [requestId], 
            (err, result)=>{
                if(err){
                    connection.release();
                    console.log(err);
                }
                const adopterEmail = result[0].adopterEmail;
                const adopterName = result[0].adopterName;
                const childName= result[0].childName;
                if(reqstatus==='Approved'){
                    const mailSubject = 'Adoption Request Update';        
                    const content = `<p>Hello ${adopterName}, your request to addopt a child name ${childName}.
                               For further process please visit orphanHub.</p>`;
    
                    sendMail(adopterEmail, mailSubject, content)
                        .then(() => {
                            return res.status(200).send({ msg: 'Email sent' });
                        })
                        .catch((error) => {
                                connection.release();
                                console.error(error);
                                return res.status(500).send({ msg: 'Error sending verification email' });
                        });
                }
                if(reqstatus === 'Rejected'){
                    const mailSubject = 'Adoption Request Update';        
                    const content = `<p>Hello ${adopterName}, your request to addopt a child name ${childName}
                               has rejected for the following reasons. </p>`;
    
                    sendMail(adopterEmail, mailSubject, content)
                        .then(() => {
                            return res.status(200).send({ msg: 'Email sent' });
                        })
                        .catch((error) => {
                                connection.release();
                                console.error(error);
                                return res.status(500).send({ msg: 'Error sending verification email' });
                        });
                }
            })
        
            
          } else {
                console.error('No rows were updated.');
                return res.status(500).json({
                error: 'Failed to update adoption request',
            });
          }
      })
  
      });
    };

    const countAdoption = (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(400).send({
                    msg: "connection error"
                });
            }
            connection.query(
                `SELECT COUNT(*) AS count from adoption`,
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

module.exports ={ pdfShow,adopter, showAdopter, getAdopterById, adoptChild, adoptChild, adoptionRequest, handleRequest, countAdoption }




