const pool = require('../config/dbconnect');

const getBookmarkedChildCards = (req, res) => {
  const { username } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).send({
        msg: 'Database connection error'
      });
    }
    connection.query(
      'SELECT * FROM bookmark WHERE username = ?;', [username],
      (err, result) => {
        connection.release();
        if (err) {
          console.error("Error fetching bookmarked child cards:", err);
          return res.status(500).send({
            msg: 'Error fetching bookmarked child cards'
          });
        }
        return res.status(200).json(result);
      }
    );
  });
};

const bookmarkChildCard = (req, res) => {
  const { username, childId } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).send({
        msg: 'Database connection error'
      });
    }
    connection.query(
      'INSERT INTO bookmark (username, childId) VALUES (?, ?);', [username, childId],
      (err, result) => {
        connection.release();
        if (err) {
          console.error("Error bookmarking child card:", err);
          return res.status(500).send({
            msg: 'Error bookmarking child card'
          });
        }
        return res.status(200).send({
          msg: 'Child card bookmarked successfully'
        });
      }
    );
  });
};

const unbookmarkChildCard = (req, res) => {
  const { username, childId } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).send({
        msg: 'Database connection error'
      });
    }
    connection.query(
      'DELETE FROM bookmark WHERE username = ? AND childId = ?;', [username, childId],
      (err, result) => {
        connection.release();
        if (err) {
          console.error("Error unbookmarking child card:", err);
          return res.status(500).send({
            msg: 'Error unbookmarking child card'
          });
        }
        return res.status(200).send({
          msg: 'Child card unbookmarked successfully'
        });
      }
    );
  });
};

module.exports = { getBookmarkedChildCards, bookmarkChildCard, unbookmarkChildCard };