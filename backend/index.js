const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
const connection = require('./database/index');
const { getAll, add } = require('./controllers/user');


// products Routes 
/************************************************ */
const productsRouter = require('./controllers/products');
app.use('/products', productsRouter);
/************************************************* */

// review Routes 
/************************************************ */
const reviewRouter = require('./routes/review');
app.use('/review', reviewRouter);
/************************************************* */

app.get('/api/users/getAll',(req,res)=>{
  getAll((err,result)=>{
      if(err){
          res.status(500).json(err)
      }
      else {
          res.status(200).json(result)
      }
  })
})
// *****************************************
// Assuming you already have the required imports and server setup code

// GET endpoint to retrieve all coach users
app.get('/users/coaches', (req, res) => {
  connection.query('SELECT * FROM users WHERE user_type = ?', ['coach'], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Failed to retrieve coaches.' });
    }

    // Return the list of coach users
    res.status(200).json({ coaches: results });
  });
});
// ******************************************
app.post('/coaches', (req, res) => {
  const { user_name, user_email,user_password, user_img, user_gender, user_preference } = req.body;
  const user_type = 'coach';
  const sql = 'INSERT INTO users (user_name, user_email,user_password, user_img, user_type, user_gender, user_preference) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [user_name, user_email,user_password, user_img, user_type, user_gender, user_preference], (error, results) => {
    if (error) {
      console.error('Error adding coach to database:', error);
      res.status(500).send('Error adding coach to database');
    } else {
      const newCoach = { User_Id: results.insertId, user_name, user_email, user_img, user_type, user_gender, user_preference };
      res.status(201).json(newCoach);
    }
  });
});
// *****************************************
app.delete('/coaches/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE User_Id = ? AND user_type = "coach"';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error deleting coach from database:', error);
      res.status(500).send('Error deleting coach from database');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Coach not found');
    } else {
      res.status(200).send('Coach deleted successfully');
    }
  });
});
// *****************************************
app.post('/users', (req, res) => {
  // Extract user data from the request body
  const { user_name, user_email, user_password, user_img, user_type, user_heigth, user_gender, user_weight, user_goal, user_preference, User_preview } = req.body;

  // Create a new user object
  const newUser = {
    user_name,
    user_email,
    user_password,
    user_img,
    user_type,
    user_heigth,
    user_gender,
    user_weight,
    user_goal,
    user_preference,
    User_preview
  };

  // Perform the database query
  connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Failed to create user.' });
    }

    // Return a success response
    res.status(201).json({ message: 'User created successfully.', user: { User_Id: results.insertId, ...newUser } });
  });
});


// ***************************************
app.get('/cloudinarySignature', (req, res) => {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: 'dqjdflymg',
    api_key: '989539197932947',
    api_secret: 'UnQIrPrmBNNA8ln3-u4ya2L9yuA'
  });

  const generateSignature = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      folder: 'assets',
      timestamp: timestamp,
      overwrite: true // set to true if you want to overwrite an image with the same name
    };
    const signature = cloudinary.utils.api_sign_request(params, cloudinary.config().api_secret);
    return {
      timestamp: timestamp,
      signature: signature
    };
  };

  const signature = generateSignature();
  res.json(signature);
});
// *****************************************
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  const updateValues = Object.values(updateFields);
  const updateKeys = Object.keys(updateFields);

  const checkUserQuery = `SELECT * FROM users WHERE User_Id = ?`;
  const checkUserValues = [id];

  connection.query(checkUserQuery, checkUserValues, (err, results, fields) => {
    if (err) {
      console.error('Error checking if user exists: ' + err);
      res.sendStatus(500);
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const updateUserQuery = `UPDATE users SET ${updateKeys.map(key => `${key}=?`).join(',')} WHERE User_Id=?`;
    const values = [...updateValues, id];

    connection.query(updateUserQuery, values, (err, results, fields) => {
      if (err) {
        console.error('Error updating user: ' + err);
        res.sendStatus(500);
        return;
      }

      const getUserQuery = `SELECT * FROM users WHERE User_Id = ?`;

      connection.query(getUserQuery, checkUserValues, (err, results, fields) => {
        if (err) {
          console.error('Error retrieving updated user: ' + err);
          res.sendStatus(500);
          return;
        }

        res.status(200).json(results[0]);
      });
    });
  });
});
// ***********************************
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE User_Id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).send('Error retrieving user data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    const user = results[0];
    res.send(user);
  });
});

app.post('/updateHeight', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const height = req.body.height;
  console.log(email,height);

  const updateQuery = 'UPDATE Users SET user_heigth = ? WHERE user_email = ?';
  connection.query(updateQuery, [height, email], (err, result) => {
    if (err) {
      
      res.status(500).json({ error: 'Error updating user height' });
    } else {
      res.json(result);
    }
  });
});
app.post('/gender', (req, res) => {
  const { email, gender } = req.body;
  const updateQuery = 'UPDATE Users SET user_gender = ? WHERE user_email = ?';
  connection.query(updateQuery, [gender, email], (err, result) => {
    if (err) {
    
      res.sendStatus(err);
    } else {
      res.json(result);
    }
  });
});
app.post('/weight', (req, res) => {
  const { email, weight } = req.body;
  const updateQuery = 'UPDATE Users SET user_weight = ? WHERE user_email = ?';
  connection.query(updateQuery, [weight, email], (err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(result);
    }
  });
});
app.post('/goal', (req, res) => {
  const { email, goal } = req.body;
  const updateQuery = 'UPDATE Users SET user_goal = ? WHERE user_email = ?';
  connection.query(updateQuery, [goal, email], (err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(result);
    }
  });
});
app.post('/register', (req, res) => {
  const { username, password, email, type } = req.body;
  const query = 'SELECT * FROM users WHERE user_email = ?';
  connection.query(query, [email], (err, rows) => {
    if (err) {
      res.sendStatus(err);
      return;
    }
    if (rows.length > 0) {
      res.status(400).send('Email address already in use');
      return;
    }
    if (!password) {
      res.status(400).send('Password is required');
      return;
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.sendStatus(err);
        return;
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
    
          res.sendStatus(err);
          return;
        }
        const insertQuery = 'INSERT INTO Users (user_name, user_password, user_email, user_type) VALUES (?, ?, ?, "user")';
        connection.query(insertQuery, [username, hash, email], (err, result) => {
          if (err) {
            res.sendStatus(err);
          } else {
            res.sendStatus(200);
      
          }
        });
      });
    });
  });
});





app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }
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
  const query = 'SELECT * FROM Users WHERE user_email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error retrieving user from database: ' + err);
      res.sendStatus(500);
      return;
    }
    if (results.length === 0) {
      console.log(results,"res");
      res.status(401).send({ message: 'Invalid email or password' });
      return; // Add this line to return from the function
    }

    const user = results[0];
    console.log(results[0],'the user');
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
      const token = jwt.sign({ userId: user.User_Id }, secretKey, { expiresIn: '1h' });
      res.send({ token,User_Id:results[0].User_Id });
    });
  });
});


// const CLIENT_ID = "988516806806-s1ivhmqc8lhtu8ven9bc4ih5aoic2nae.apps.googleusercontent.com"
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = "1//04yvUFqGAVTstCgYIARAAGAQSNwF-L9IrpfDiE01R-cSw7jh-LBxQIehsf6qKe1xVzyNCChHmYqHpbq9frAakrQ75QzOMYiyEMuo";
// const oAuth2Client = new OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "alihajri1312@gmail.com",
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: oAuth2Client.getAccessToken(),
//   },
// });
// const verificationCodeMap = new Map();


app.post("/forget-password-email", async (req, res) => {
  const { email } = req.body;

  // Retrieve all users from the database
  getAll((err, users) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // Check if the requested email is present in the list of users
      const user = users.find((user) => user.user_email === email);
      if (!user) {
        res.status(400).send("Email not found");
        return;
      }

      // Generate verification code and send email
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const mailOptions = {
        from: "alihajri1312@gmail.com",
        to: email,
        subject: "Reset Password Code",
        text: `Your reset password code is ${verificationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json("Email sent successfully");
          verificationCodeMap.set(email, verificationCode);
          console.log("Verification code for", email, "is", verificationCode);
        }
      });
    }
  });
});




app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  console.log("email:", email);
  console.log("code:",typeof(Number(code)));
  const verificationCode = verificationCodeMap.get(email);
  console.log("verificationCode:",typeof(verificationCode) );
  if (verificationCode == Number(code)) {
    res.status(200).json("Code verified successfully");
  } else {
    res.status(400).json("Invalid code");
  }
});





app.put('/change-password', (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const sql = 'UPDATE Users SET user_password = ? WHERE user_email = ?'

  connection.query(sql, [hash, email], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json('Could not update password');
    } else if (result.affectedRows === 0) {
      res.status(404).json('User not found')
    } else {
      res.json('Password updated successfully')
    }
  });
});
app.use(express.json());

app.post('/admin/login', (req, res) => {
  const { user_name, user_password } = req.body;

  connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ? AND user_type = ?', [user_name, user_password, 'admin'], (error, results) => {
    if (error) {
      console.error('Failed to fetch user:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = results[0];
    const token = jwt.sign({ userId: user.User_Id }, 'secret');
    res.json({ token });
  });
});
app.post('/admin/create', (req, res) => {
  const userData = {
    user_name: 'admin',
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_img: null,
    user_type: 'admin',
    user_heigth:null,
    user_gender: null,
    user_weight: null,
    user_goal: null,
    user_preference: null,
    User_preview: null
  };

  connection.query('INSERT INTO users SET ?', userData, (error, results) => {
    if (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log('User created successfully:', results);
    res.status(200).json({ message: 'User created successfully' });
  });
});
app.get('/exercices', (req, res) => {
  const sql = 'SELECT * FROM `spotify`.`exercices`';

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.put('/exercices/:id', (req, res) => {
  const { id } = req.params;
  const { exercice_image, exercice_name, exercice_description, exercice_sets, exercice_calories } = req.body;
  const sql = `UPDATE \`spotify\`.\`exercices\`
               SET \`exercice_image\` = '${exercice_image}', \`exercice_name\` = '${exercice_name}', \`exercice_description\` = '${exercice_description}', \`exercice_sets\` = '${exercice_sets}', \`exercice_calories\` = '${exercice_calories}'
               WHERE \`exercice_id\` = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.delete('/exercices/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM \`spotify\`.\`exercices\` WHERE \`exercice_id\` = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
            
app.listen(Port,()=>{console.log('listenning on port ,',Port);})