import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Database connected successfully!'); 
})
.catch(err => {
  console.log('Could not connect to database!', err);
});

app.use(express.json());


// middleware to handle errors in baackend
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server issue!';
  return res.status(statusCode)
  .json(
      {
          success: false,
          statusCode,
          message,
      }
  );
});







