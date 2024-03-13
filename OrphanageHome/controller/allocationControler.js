const { validationResult } = require('express-validator');

const { getConnection, pool } = require('../config/dbconnect');

const updateOrInsertCategories = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }

        const categories = req.body.categories;

        // Fetch all existing category names
        connection.query(
            'SELECT name FROM categories',
            (err, result) => {
                if (err) {
                    console.error(err);
                    connection.release();
                    return res.status(500).json({ msg: 'Error fetching categories' });
                }

                const existingCategories = result.map(row => row.name);

                categories.forEach(category => {
                    if (existingCategories.includes(category.name)) {
                        // Update existing category
                        connection.query(
                            'UPDATE categories SET weight = ? WHERE name = ?',
                            [category.weight, category.name],
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ msg: 'Error updating category' });
                                }
                            }
                        );
                    } else {
                        // Insert new category
                        connection.query(
                            'INSERT INTO categories (name, weight) VALUES (?, ?)',
                            [category.name, category.weight],
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ msg: 'Error inserting category' });
                                }
                            }
                        );
                    }
                });

                // Release connection after all queries are executed
                connection.release();
                return res.status(200).json({ msg: 'Categories updated/inserted successfully' });
            }
        );
    });
}

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
const allocateDonation = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({ msg: "connection error" });
        }

        //const currentDate = new Date().toISOString().split('T')[0];

        // if current date is past day
        connection.query(
            'select  sum(amount) as totalAmount from donor where time = CURDATE();',
            
            async (err, dailyDonors) => {
                if (err) {
                    console.log(err);
                    connection.release();
                    return res.status(500).send({ msg: 'Error in fetching data' });
                }

                if (dailyDonors.length !== 1) {
                    console.log('No donations for the current day');
                    connection.release();
                    return res.status(200).send({ msg: 'No donations for the current day' });
                }

                const totalDonationAmount = dailyDonors[0].totalAmount;
                console.log(totalDonationAmount);
              
                connection.query(
                    'SELECT name from allocatedonation',
                    async (err, data) => {
                        if (err) {
                            console.log(err);
                            connection.release();
                            return res.status(500).send({ msg: 'Error in fetching data' });
                        }

                        const columnName = data.map(row => row.name);

                        await connection.query('SELECT * FROM categories',(err, rows)=>{
                            if (!Array.isArray(rows)) {
                                console.log('Expected rows to be an array');
                                connection.release();
                                return res.status(500).send({ msg: 'Expected rows to be an array' });
                              }

                            const categories = rows.map(row => ({ name: row.name, weight: row.weight }));
 

                            const allocation = {};
                        let totalWeight = categories.reduce((acc, category) => acc + category.weight, 0);

                        categories.forEach((category) => {
                            allocation[category.name] = (totalDonationAmount * (category.weight / totalWeight));
                            
                        });
                        const allocateValues = Object.entries(allocation).map(([name, amount]) => [name, amount]);
                        
                        const insertQuery = `INSERT INTO \`allocatedonation\` (name, amount) VALUES ?`;

                        connection.query(insertQuery, [allocateValues], (error) => {
                        if (error) {
                            console.log(error);
                            connection.release();
                            return res.status(500).send({ msg: error });
                        }
                                            
                        connection.release();
                        // return res.status(200).send({ columnNameArray: columnNameArray, allocation: allocation });
                           
                    })    
                    });
                        
                        
                    }
                );
            }
        );
    });
};


const showAllocatedAmount = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(400).send({
                msg: "connection error"
            });
        }
        connection.query(
            `SELECT * from allocatedonation`,
            (err, rows) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        msg: 'Error in fetching data'
                    });
                 }
                 const alocat= rows.map((algo) => {
                    return {
                      name: algo.name,
                      amount : algo.amount,
                    };
                  });
                
                res.json(alocat)

            }
        )
    });
}

// const getCategories = async (req, res) => {
//     try {
//       const connection = await pool.getConnection();
//       const [rows] = await connection.query('SELECT * FROM categories');
//       connection.release();
//       res.status(200).json({ categories: rows });
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       res.status(500).json({ message: 'Error fetching categories' });
//     }
//   };
  
//   const updateCategories = async (req, res) => {
//     const { categories } = req.body;
  
//     try {
//       const connection = await pool.getConnection();
  
//       const [rows] = await connection.query('SELECT * FROM categories');
//       const existingCategories = rows.map(row => ({ id: row.id, name: row.name, weight: row.weight }));
  
//       const queries = categories.map((category) => {
//         const existingCategory = existingCategories.find(c => c.name === category.name);
//         if (existingCategory) {
//           if (existingCategory.weight !== category.weight) {
//             return connection.query('UPDATE categories SET weight = ? WHERE id = ?', [category.weight, existingCategory.id]);
//           }
//         } else {
//           return connection.query('INSERT INTO categories (name, weight) VALUES (?, ?)', [category.name, category.weight]);
//         }
//       });
  
//       await Promise.all(queries);
  
//       connection.release();
//       res.status(200).json({ message: 'Categories updated successfully' });
//     } catch (error) {
//       console.error('Error updating categories:', error);
//       res.status(500).json({ message: 'Error updating categories' });
//     }
//   };
 
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

                        // connection.query(
                        //     `insert into allocate (${check}) values (${amount})`,
                        //     (err) => {
                        //         if (err) {
                        //             //connection.release();
                        //             console.log(err);
                        //         }
                        //     }

                        // );
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