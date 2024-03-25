
import mongoose from "mongoose";

const connectToDB = () => mongoose
.connect(process.env.DB_URI,{
})
.then((conn)=>{
    console.log(`Database connected successfully ${conn.connection.host}`)
})
.catch((err)=>{
    console.log(`Error connecting to db ${err} `);
})


export default connectToDB;