import express , {Request,Response} from 'express';

// require('dotenv').config();
import dotenv from 'dotenv/config';
// dotenv.config({ path: "../environment/.env"})
// console.log(process.cwd());
dotenv;

import connection from './config/mongodb';
import * as Router from './routes/index';
const app = express();
app.use(express.json()); 
// console.log(process.env.PORT);

const port = 4000;
connection();

app.use('/', Router.userRoute.default);

app.listen(port,():void => {
   console.log("listen to server");
   
});
