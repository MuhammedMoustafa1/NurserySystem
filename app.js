const express  = require('express');
const mongoose = require('mongoose');
const teacherRoute = require('./Routes/teacherRoute');
const childRoute = require('./Routes/childRoute');
const classRoute = require('./Routes/classRoute');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const loginRoutes = require('./Routes/authentication');
const authMW = require('./MildWwares/authenticationMW');
// default function for create server
const port = process.env.PORT || 8080;
const server = express();

mongoose
        .connect("mongodb://127.0.0.1:27017/nurserySystem")
        .then( () => {
            console.log("MongoDB is connected......");
            server.listen(port , ()=> {
            console.log("I am listen on port : " + port);
        })
        })
        .catch( (error) => {
            console.log("MongDB fails to connect and the issue is ..." + error)
        });


        
/* ******************* Structure *******************/

server.use(morgan('dev'));

server.use(cors());
// server.get('/nurse/' , (request , response) => {
//     response.json({data: 'nurserr'});
// });
/********************end Points Routs****************************/
server.use(express.json());
server.use(loginRoutes);
server.use(authMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);



// Not Found
server.use((request , response , next)=>{
    response.status(404).json({data:"Not Found"});
});

// Error MW
server.use((error, request ,response ,next)=>{
    response.status(500).json({data:`Error mW ${error}`});
});






