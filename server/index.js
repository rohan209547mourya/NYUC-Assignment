const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/UserRoute');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;



// middleware calls
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);

const mongoUri = "mongodb+srv://rohanmourya671:rohan9899@taskplannerclustor.3mryuzl.mongodb.net/nyuc?retryWrites=true&w=majority";


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Error connecting to MongoDB:', err));



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
