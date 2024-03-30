const express  = require('express');
const mongoose = require('mongoose');
const teacherRoute = require('./Routes/teacherRoute');
const childRoute = require('./Routes/childRoute');
const classRoute = require('./Routes/classRoute');
const morgan = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const loginRoutes = require('./Routes/authentication');
const authMW = require('./MildWwares/authenticationMW');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nursery System API',
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:8080/"
            }
        ]
    },
    apis:['./Routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);



const storage = multer.diskStorage({
     destination:(req , file , cb) => {
        console.log(path.join(__dirname  , 'images'));
         cb(null , path.join(__dirname  , 'images'));
     },
     filename:(req, file, cb)=> { 
        cb(null ,new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname);
     }
});

const fileFilter = (req , file , cb) => {
    if (file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"  ||
    file.mimetype == "image/png"||
    file.mimetype == "image/jpeg")
        cb(null , true);
    else
        cb(null , false);    
}
// default function for create server
const port = process.env.PORT || 8080;
const server = express();

mongoose
        .connect(process.env.DBURL)
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
server.use("/images" , express.static(path.join(__dirname  , 'images')));
server.use(multer({storage , fileFilter}).single('image'));
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended : true}));

server.use(morgan('dev'));

server.use(cors());
// server.get('/nurse/' , (request , response) => {
//     response.json({data: 'nurserr'});
// });
/********************end Points Routs****************************/
server.use(express.json());
 
 server.use('/api-docs', swaggerUi.serve , swaggerUi.setup(swaggerSpec));
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






