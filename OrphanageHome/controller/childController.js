

const searchChildren = async (req, res) => {
    const search = req.query.search;
    if (!search) {
      return res.status(400).json({
        msg: "Search parameter is missing"
      });
    }
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({
          msg: "Database connection error"
        });
      }
  
     
      const query = "SELECT * FROM child_detail WHERE full_name ILIKE ? OR full_name ILIKE ?";
      const searchTermStartsWith = `${search}%`;
      const searchTermIncludes = `%${search}%`;
  
      connection.query(query, [searchTermStartsWith, searchTermIncludes], (error, results) => {
        connection.release(); 
        if (error) {
          console.log(error);
          return res.status(500).json({
            msg: "Error executing the query"
          });
        }
  
        return res.status(200).json({
          results: results
        });
      });
    });
  };

const getRecommendedChildren = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({
                msg: "Database connection error"
            });
        }

        const ageCriteria = 5;
        const currentDate = new Date();
        const birthDateCriteria = new Date(currentDate.getFullYear() - ageCriteria, currentDate.getMonth(), currentDate.getDate());

        connection.query(
            `SELECT *, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age FROM child_detail WHERE date_of_birth < ?`,
            [birthDateCriteria],
            (error, results) => {
                connection.release(); 

                if (error) {
                    return res.status(500).json({
                        msg: "Error executing the query"
                    });
                }

                return res.status(200).json({
                    results: results
                });
            }
        );
    });
}


module.exports = {  searchChildren, getRecommendedChildren};