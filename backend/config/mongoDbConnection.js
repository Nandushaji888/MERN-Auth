import mongoose from "mongoose";

const mongoDbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected');
      } catch (error) {
            throw new Error(error)
      }
}

export{mongoDbConnection} 