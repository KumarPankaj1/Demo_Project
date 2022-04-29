import express , {NextFunction, Request,Response} from 'express';
import path from 'path';
import dotenv from 'dotenv/config';
dotenv;
import connection from './config/mongodb';
import * as Router from './routes/index';
const app = express();
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../uploads/public')));

const port = process.env.PORT;
connection();

app.use('/', Router.userRoute.default);

app.listen(port,():void => {
   console.log("listen to server");
   
});


// dotenv.config({ path: "../environment/.env"})
// console.log(process.cwd());
// require('dotenv').config();
