const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');

const addFields =  (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        const columnName = req.body.columnName;

        connection.query(
            `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='allocate'`,
            (err, result) =>{
                const checkColumnName = result.map(row => row.COLUMN_NAME);
                if(checkColumnName.includes(columnName)){
                    return res.status(400).json({msg:"Already exist"});
                }
                else{
                    connection.query(
                        `ALTER TABLE temp_allocate ADD COLUMN ${columnName} DOUBLE(12, 4)`,
                        (err, columns)=>{
                            connection.release();
                            if(err){
                                return res.status(400).json({msg:"error exist"});
                            }
                            return res.status(200).json({msg:"Added successfully"});
                        })
                }
            }
        )
    });
}

const totalDonationDay = (total) => {
    try{
        pool.getConnection((err, connection) =>{
            const currentDate = new Date().toISOString().split('T')[0];
            
          connection.query(`
            select  sum(amount) as totalAmount from donor where time = CURDATE() , 
          `, 
          async(err, rows)=>{
              connection.release();
              if(err){
                console.log(err);
              }
             total = rows[0].totalAmount; 
             return toral  
          })
        })
      }catch(err){
        console.log(err);
      }
}


 
const updateCat = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * FROM allocatedonation`,
            (err, rows) => {
                if (err) {
                    connection.release();
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                }

                const check = rows.map(row => row.name);
                const amount = rows.map(row => row.amount);

                connection.query(
                    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='allocate'`,
                    (err, result) => {
                        if (err) {
                           //connection.release();
                            console.log(err);
                            return res.status(500).send({
                                msg: 'Error in fetching column names'
                            });
                        }

                        const checkColumnName = result.map(row => row.COLUMN_NAME);

                        check.forEach((category, index) => {
                            if (checkColumnName.includes(category)) {
                                //If the column already exists, update the data
                                connection.query(
                                    `UPDATE allocate SET ${category} = ${amount[index]}`, 
                                    (err) => {
                                    if (err) {
                                        //connection.release();
                                        console.log(err);
                                    }
                                });
                                console.log('exist');
                            } else {
                                // If the column doesn't exist, add the column and insert the data
                                connection.query(
                                    `ALTER TABLE allocate ADD COLUMN \`${category}\` DOUBLE`,
                                    (err) => {
                                        if (err) {
                                            //connection.release();
                                            console.log(err);
                                        } else {
                                            connection.query(
                                                `UPDATE allocate SET ${category} = ${amount[index]}`,
                                                (err) => {
                                                    if (err) {
                                                        //connection.release();
                                                        console.log(err);
                                                    }
                                                }

                                            );
                                        }
                                    }
                                );
                            }
                        });

                    
                    }
                );
                connection.release();
                console.log("done");
            }
        );
    });
};


module.exports = {
    addFields,
    allocateDonation,
    updateOrInsertCategories,
    showAllocatedAmount, 
    updateCat
}