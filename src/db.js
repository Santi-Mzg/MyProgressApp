import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:Lr10LkToYbew1E4x@cluster0.v6qeh5x.mongodb.net/");
    console.log(">>> DB is connected");
  } catch(error) {
    console.log(error);
  }   
};


