const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Mongoose configuration
const connectDataBase = () => {
    const uri = process.env.ATLAS_URI;
    mongoose.connect(
        uri,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        (err) => {
            if (err) return console.log("Error: ", err);
            console.log(
                "MongoDB Connection -- Ready state is:",
                mongoose.connection.readyState
            );
        }
    );

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('MongoDb database connection enstablished successfully !');
    });
}

app.use(cors());
app.use(express.json());

connectDataBase();

//Use users routes in express
const usersRouter = require('./routes/users');
app.use('/users',usersRouter);

//Use scarpings routes in express
const scarpingsRouter = require('./routes/scrapings');
app.use('/scrapings',scarpingsRouter);


//Start Express Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


