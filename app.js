require('dotenv').config();
const { connectDb } = require('./src/services/mongoose');

const express = require('express');
const todoRoutes = require('./src/routes/todo');
const app = express();
const port = process.env.PORT || 3000;

connectDb().catch(err => console.log(err));

app.use(express.json());
app.use(todoRoutes);


app.listen(port,() => {
    console.log(`Le serveur est lancé ) : http://localhost:${port}`);
});


