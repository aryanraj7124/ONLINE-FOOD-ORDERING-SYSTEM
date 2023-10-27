
const {customers,Otp,reset,Order} = require('./models/User');

const express = require('express');
const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');
// const mysql = require('mysql');

// const sequelize = new Sequelize('p', 'root', 'root123', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connected to MySQL server');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to MySQL server:', error);
//   });

//   const customers = sequelize.define('customers', {
//     firstName: {
//       type: Sequelize.STRING,
//       allowNull: true
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: true,
//       unique: true
//     },
//     cpassword: {
//       type: Sequelize.STRING,
//       allowNull: true
//     }
//   });

//   sequelize.sync()
//   .then(() => {
//     console.log('Schema synchronized with database');
//   })
//   .catch((error) => {
//     console.error('Unable to synchronize schema with database:', error);
//   });
const cors = require('cors');

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  // // post data into actual db
// Create a route to handle POST requests to create a new user
// app.post('/users', (req, res) => {
//     const { firstName, email, cpassword } = req.body;
//     customers.create({ firstName, email, cpassword })
//       .then((customers) => {
//         res.status(201).json(customers);
//       })
//       .catch((error) => {
//         res.status(400).json({ error: error.message });
//       });
//   });


// // signup actaul
const bcrypt = require('bcryptjs');
app.post('/userpost', [
  // Validate the name field
  body('name').notEmpty().isLength({ max: 255 }),

  // Validate the email field
  body('email').notEmpty().isEmail(),

  // Validate the password field
  body('cpassword').notEmpty().isLength({ min: 6 }),

  // Validate the confirm password field
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.cpassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
], async  (req, res) => {
  var success=false;
  // Check if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

 // Hash the password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);

 

  // Insert the user data into the MySQL database
  const { name, email, cpassword  ,confirmPassword } = req.body;
 
  customers.create({ name, email, cpassword : hashedPassword ,confirmPassword })
  .then((customers) => {
    const token = jwt.sign(customers.id, JWT_SECRET);
    console.log(token);
    success=true;
            res.status(201).json({success,customers,token});
          })
          .catch((error) => {
           console.log("Error hai");
              });
 
});



// login actaul
 const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const JWT_SECRET = "Parasisgoodb$oi"

app.post('/login', async (req, res) => {
  var success = false ;
  const { email, cpassword } = req.body;

  // Find the user in the MySQL database
  const user = await customers.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Compare the password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
  if (!isValidPassword) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Create and send a JWT token as a response
  success=true;
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({success, token });
});


//reset
const OTP_SECRET = "MyOTPSecret";
const OTP_LENGTH = 6;
// Generate a random OTP
function generateOTP() {
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp; // giving otp as 6 characters
}
// Store the OTP in memory for testing purposes
let otpStore = {};


// Reset password endpoint
// app.post('/reset-password', async (req, res) => {
//   const { email } = req.body;

//   // Find the user in the MySQL database
//   const user = await customers.findOne({ where: { email: email } });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid email address' });
//   }

//   // Generate and store the OTP for the user
//   const otp = generateOTP();
//   otpStore[user.id] = otp;

//   // Create a JWT token containing the user ID and OTP
//   const token = jwt.sign({ id: user.id, otp: otp }, OTP_SECRET);

//   // Send the OTP to the user via email or SMS (not implemented here)
//   console.log(`OTP for user ${user.id}: ${otp}`);

//   // Return the JWT token to the client
//   res.json({ token });
// });

// Reset password endpoint - 2

// node mailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'parasraut821@gmail.com',
    pass: 'kgqpfvnbcnidople'
  }
});


app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  const otp = req.body.otp;
  // Find the user in the MySQL database
  const user = await customers.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  // Generate an OTP and sign it with a secret key
  const otpp = generateOTP();
  const otpToken = jwt.sign({ email: email, otpp: otpp }, OTP_SECRET);

  // Send the OTP to the user's email (or phone number, etc.)
  // ...

  // Return a response indicating success
  //res.json({ success: true, message: 'OTP sent successfully' });
     console.log(`OTP for user ${user.id}: ${otpp}`);
  
     //
     Otp.create({ email, otp : otpp})
     .then((Otp) => {
               success=true;
               res.status(201).json({success,Otp});
             })
             .catch((error) => {
              console.log("Error hai : ",error);
              return res.status(400).json({ success: false, message: 'User not found' });
             
                 });
                 const mailOptions = {
                  from: 'parasraut821@gmail.com',
                  to: email,
                  subject: 'Reset Password OTP',
                  text: `Your OTP is ${otpp} .
                  We Appreciate You Using Our Online Food Ordering Service.`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log('Error sending email: ', error);
                  } else {
                    console.log('Email sent: ', info.response);
                  }
                });
});


// trying
//post data into actual db
app.post('/confirmation',async (req,res)=>{
  // Insert the user data into the MySQL database
  const { email,newPassword,otp} = req.body;
 await reset.create({email,newPassword,otp})
  .then((reset) => {
    success=true;
            res.status(201).json({success,reset});
          })
          .catch((error) => {
           console.log("Error hai");
              });
  const user = await customers.findOne({ where: { email } });
 if (!user) {
  return res.status(400).json({ success: false, message: 'User not found' });
  }

    // // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  

  // // Update the user's password
  user.cpassword = hashedPassword;
  user.confirmPassword = newPassword ;
  await user.save();
  // // Delete the OTP record
 res.json({ success: true, message: 'Password reset successfully' });
});


/*  ************************* Food Items **************************** */ 
// get food data data 
/*  ************************* Food Items **************************** */ 
// get food data data 
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'p',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('*****************Successfully connected to the database!************8');
    connection.release();
  })
  .catch(error => {
    console.error('********************Error connecting to the database: ************', error);
  });

  app.get('/get', (req, res) => {
    let r;
    let c;
  
    pool.query('SELECT * FROM FoodDetails')
      .then(results => {
        console.log('Successfully fetched all products from the database!');
        r = JSON.parse(JSON.stringify(results[0]));
        global.items = r;
        return pool.query('SELECT * FROM FoodCategory'); // add a new query here
      })
      .then(results => {
        console.log('Successfully fetched all categories from the database!');
        c = JSON.parse(JSON.stringify(results[0]));
        global.items_category = c;
        res.send([global.items, global.items_category]);
      })
      .catch(error => {
        console.error('Error fetching data from the database: ', error);
        res.sendStatus(500);
      });
  });
  

app.get('/getdata', (req, res) => {
  pool.getConnection((err, connection) => {
      if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
      }
      connection.query('SELECT * FROM product', (err, result, fields) => {
          if (err) {
              console.log(err);
              res.status(500).send('Internal Server Error');
              connection.release();
              return;
          }

          const r = JSON.parse(JSON.stringify(result));
          global.item_details = r;
          console.log(r)

          connection.query('SELECT * FROM category', (err, result, fields) => {
              if (err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                  connection.release();
                  return;
              }

              const c = JSON.parse(JSON.stringify(result));
              global.item_category = c;
              console.log(c);

              res.send([global.Food_items, global.Food_items]);
console.log([global.Food_items, global.item_details])
              connection.release();
          });
      });
  });
});

// /* ****************************** ORDER BY USER **********************/



app.post('/myorders', async (req, res) => {
  try {
    const { userEmail, orderData, orderDate, customerId } = req.body;

    // Create a new order document
    const order = await Order.create({
      customerId,
      userEmail,
      orderData: JSON.stringify(orderData),
      orderDate
    });

    res.status(200).json({ message: 'Order saved successfully!', order: order.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving order details!' });
  }
});


//get data
app.post('/orders', (req, res) => {
  const userEmail = req.body.userEmail;
  const sql = 'SELECT * FROM orders WHERE userEmail = ?';
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving orders data');
      return;
    }
    
    connection.query(sql, [userEmail], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving orders data');
      } else {
        res.json(results);
      }
      
      connection.release();
    });
  });
});

app.post('/admin', (req, res) => {
  const userEmail = req.body.userEmail;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving orders data');
      return;
    }
    
    connection.query(`SELECT * FROM orders WHERE userEmail='${userEmail}'`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving orders data');
      } else {
        const p = JSON.parse(JSON.stringify(result)); // JSON must be capital
        res.send(p);
      }
      
      connection.release();
    });
  });
});


app.post('/getcustomers', async (req, res) => {
  const email = req.body.email;
  const sql = 'SELECT * FROM customers WHERE email = ?';

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute(sql, [email]);
    connection.release();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving customers data');
  }
});


  // Start the express app
app.listen(5000, () => {
    console.log('Server started on port 5000');
  });