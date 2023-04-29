const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const  uuid = require('uuid');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const app = express()

const Port = 3000
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const connection = require('./database/index')

app.post('/register', (req, res) => {
  const { username, password, email, type } = req.body;

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      res.sendStatus(500);
      return;
    }

    // Insert the user's information into the MySQL database
    const query = 'INSERT INTO users (user_name, user_password, user_email,user_type) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, hash, email, type], (err, result) => {
      if (err) {
        console.error('Error inserting user into database: ' + err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
})


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Verify the username and password against the MySQL database
//   const query = 'SELECT * FROM Users WHERE User_Id = ?';
//   connection.query(query, [username], (err, result) => {
//     if (err) {
//       console.error('Error verifying username and password: ' + err);
//       res.sendStatus(500);
//       return;
//     }

//     if (result.length == 0) {
//       res.sendStatus(401);
//       return;
//     }

//     const user = result[0];

//     // Compare the password hash using bcrypt
//     bcrypt.compare(password, user.user_password, (err, result) => {
//       if (err) {
//         console.error('Error verifying username and passwords: ' + err);
//         res.sendStatus(500);
//         return;
//       }

//       if (!result) {
//         res.sendStatus(401);
//         return;
//       }

//       // Generate a JWT token
//       const token = jwt.sign({ username: user.User_Id }, 'my_secret_key');

//       res.json({ token });
//     });
//   });
// });


  // Create an API that requires authentication
app.get('/protected', (req, res) => {
  // Get the JWT token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  // Verify the JWT token
  jwt.verify(token, 'my_secret_key', (err, decoded) => {
    if (err) {
      console.error('Error verifying JWT token: ' + err);
      res.sendStatus(500);
      return;
    }

    res.json({ message: 'Authenticated user: ' + decoded.username });
  });
});

const secretKey = 'mysecretkey';

app.post('/loginn', (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user from the database based on the email
  const query = 'SELECT * FROM Users WHERE user_email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error retrieving user from database: ' + err);
      res.sendStatus(500);
      return;
    }

    // Check if the user exists and if the password is correct
    if (results.length === 0) {
      res.status(401).send({ message: 'Invalid email or password' });
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.user_password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords: ' + err);
        res.sendStatus(500);
        return;
      }

      if (!isMatch) {
        res.status(401).send({ message: 'Invalid email or password' });
        return;
      }

      // If the email and password are valid, generate a JWT and send it to the client
      const token = jwt.sign({ userId: user.User_Id }, secretKey, { expiresIn: '1h' });
      res.send({ token });
    });
  });
});

const CLIENT_ID = "258481515920-rvekh1dpr2hp2tjq9qamjcr6ui2t63r7.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04sl12Qp47j6-CgYIARAAGAQSNwF-L9IrrwEMvr2wjkyhWRS4SYwTbfmFc2lpsNq5096tngR_rRLx_zMqyeArVXMubUgBSvjmI0w";

const oAuth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "medb0748@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
});
app.post("/forget-password-email", async (req, res) => {
  const { email } = req.body;
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "medb0748@gmail.com",
    to: email,
    subject: "Reset Password Code",
    text: `Your reset password code is ${randomCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Could not send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});









            
app.listen(Port,()=>{console.log('listenning on port ,',Port);})