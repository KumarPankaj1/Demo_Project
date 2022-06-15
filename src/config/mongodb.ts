import mongoose , {connect,set} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function connection(){
    return connect(<string>process.env.MONGODB_URL)

   .then(()=>{
    set("debug",true)
       console.log("connection is succesful")
    })
   .catch((err:Error)=>{
       console.log(err)
    });
}
   
export default connection;