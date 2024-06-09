require('dotenv').config();
const { connectDb } = require('./src/services/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const todoRoutes = require('./src/routes/todo');

const port = process.env.PORT || 3000;



app.use(express.json());
app.use(cors());
app.use(todoRoutes);

connectDb().catch(err => console.log(err));

app.listen(port,() => {
    console.log(`Le serveur est lancé ) : http://localhost:${port}`);
});


