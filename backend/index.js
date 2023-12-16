const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const connectToDatabase = require('./db');

(async () => {
  try {
    await connectToDatabase();

    app.use(cors({
      origin: 'http://localhost:3000', // Replace with your frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    }));

    app.get('/', (req, res) => {
      res.send('hello world');
      
    });

    app.use(express.json());
    app.use('/api/', require('./Routes/CreateUser'));
    app.use('/api/', require('./Routes/DisplayData'));
    app.use('/api/', require('./Routes/OrderData'));
    

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
