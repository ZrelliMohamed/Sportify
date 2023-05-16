const express = require('express');
const router = express.Router();
const connection = require('../database/index');
const io = require('socket.io')(); // initialize socket.io

router.get('/messages/:sender_id/:receiver_id', (req, res) => {
  const { sender_id, receiver_id } = req.params;

  const getMessages = (sender_id, receiver_id) => {
    const sql = 'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY id ASC';
    connection.query(sql, [sender_id, receiver_id, receiver_id, sender_id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
        return;
      }

      res.send(results);
    });
  };

  getMessages(sender_id, receiver_id);
});

router.post('/sendMessage', (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  const saveMessage = (sender_id, receiver_id, message) => {
    const sql = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
    connection.query(sql, [sender_id, receiver_id, message], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
        return;
      }

      io.to(receiver_id).emit('newMessage', { sender_id, message });

      res.json(results); 
    });
  };

  saveMessage(sender_id, receiver_id, message);
});

router.get('/conversations/:user_id', (req, res) => {
  const user_id = req.params.user_id;


  const getConversations = (user_id) => {
    const sql = `
      SELECT DISTINCT IF(sender_id = ?, receiver_id, sender_id) as conversation_partner_id
      FROM messages
      WHERE sender_id = ? OR receiver_id = ?
      ORDER BY conversation_partner_id ASC
    `;
    connection.query(sql, [user_id, user_id, user_id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
        return;
      }
  
      const promises = results.map((result) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users WHERE User_Id = ?';
          connection.query(sql, [result.conversation_partner_id], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              const partner = results[0];
              const sql = 'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY id DESC LIMIT 1';
              connection.query(sql, [user_id, partner.User_Id, partner.User_Id, user_id], (error, results, fields) => {
                if (error) {
                  reject(error);
                } else {
                  if (results.length > 0) {
                    partner.last_message = results[0].message;
                  }
                  resolve(partner);
                }
              });
            }
          });
        });
      });
  
      Promise.all(promises)
        .then((results) => {
          res.send(results);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Internal server error');
        });
    });
  };
  
  getConversations(user_id);
});

module.exports = router;